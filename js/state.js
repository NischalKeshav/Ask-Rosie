/* Single source of truth. Every view reads from this object; nothing keeps a copy.
 * Persisted to localStorage on every mutation. */

import { ARTWORKS } from '../data/artworks.js';
import { PRESET_UNITS, parseCurriculum, suggestArtworkIds } from '../data/curriculum.js';

const KEY = 'askrosie.classroom.v1';

const blank = () => ({
  user: null,              // { name, role: 'teacher'|'student', classCode }
  gradeBand: '6-8',
  curriculum: null,        // { id, title, rawText, focusTopics[], }
  enabledArtworkIds: ARTWORKS.map((a) => a.id),
  chats: [],               // [{ id, artworkId, gradeBand, title, messages[], ts }]
  activeChatId: null,
  quizResults: [],         // [{ id, artworkId, gradeBand, score, total, ts, studentName }]
  theme: 'auto',
  lang: 'en',              // 'en' | 'es'
  bandChosen: false,       // the reading level step is shown once, then remembered
  seeded: false,
});

export const state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    const parsed = JSON.parse(raw);
    // Merge onto a fresh object so a shape change in a new version cannot crash the app.
    return { ...blank(), ...parsed };
  } catch {
    return blank();
  }
}

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* private browsing or quota — the demo still works, it just will not persist */
  }
  window.dispatchEvent(new CustomEvent('state:change'));
}

export function reset() {
  Object.assign(state, blank());
  localStorage.removeItem(KEY);
  save();
}

/** Load a preset unit or a teacher's pasted text as the active curriculum. */
export function applyCurriculum({ id, title, rawText, band }) {
  const focusTopics = parseCurriculum(rawText);
  state.curriculum = { id: id || 'custom', title: title || 'Untitled unit', rawText, focusTopics };
  // Applying a unit that carries a suggested band IS a band decision --
  // otherwise a teacher who loads a preset gets bounced to the level step.
  if (band) { state.gradeBand = band; state.bandChosen = true; }
  const suggested = suggestArtworkIds(focusTopics);
  if (suggested.length) state.enabledArtworkIds = suggested;
  save();
  return { focusTopics, suggested };
}

export function clearCurriculum() {
  state.curriculum = null;
  state.enabledArtworkIds = ARTWORKS.map((a) => a.id);
  save();
}

export function enabledArtworks() {
  const set = new Set(state.enabledArtworkIds);
  const list = ARTWORKS.filter((a) => set.has(a.id));
  return list.length ? list : ARTWORKS; // never strand a student with an empty gallery
}

export function toggleArtwork(id) {
  const i = state.enabledArtworkIds.indexOf(id);
  if (i === -1) state.enabledArtworkIds.push(id);
  else if (state.enabledArtworkIds.length > 1) state.enabledArtworkIds.splice(i, 1);
  save();
}

/* ── chats ────────────────────────────────────────────────────────────── */

let idSeq = Date.now();
const nextId = () => String(idSeq++);

export function startChat(artworkId) {
  const chat = {
    id: nextId(),
    artworkId,
    gradeBand: state.gradeBand,
    messages: [],
    ts: Date.now(),
  };
  state.chats.unshift(chat);
  state.activeChatId = chat.id;
  save();
  return chat;
}

export function activeChat() {
  return state.chats.find((c) => c.id === state.activeChatId) || null;
}

export function addMessage(chatId, role, text, meta = {}) {
  const chat = state.chats.find((c) => c.id === chatId);
  if (!chat) return;
  chat.messages.push({ role, text, ts: Date.now(), ...meta });
  chat.ts = Date.now();
  save();
}

export function deleteChat(id) {
  state.chats = state.chats.filter((c) => c.id !== id);
  if (state.activeChatId === id) state.activeChatId = state.chats[0]?.id || null;
  save();
}

export function recordQuiz(result) {
  state.quizResults.unshift({ id: nextId(), ts: Date.now(), ...result });
  save();
}

/**
 * Plausible class data so the teacher dashboard is never an empty shell on a
 * first run. Seeds once, and only alongside a curriculum the teacher has loaded.
 */
export function seedDemoData() {
  if (state.seeded) return;
  const names = ['Maya R.', 'Dev P.', 'Aisha K.', 'Jonah T.', 'Elena M.', 'Sam W.'];
  const pool = state.enabledArtworkIds.length ? state.enabledArtworkIds : ARTWORKS.map((a) => a.id);
  const scores = [4, 3, 4, 2, 3, 4];
  names.forEach((studentName, i) => {
    state.quizResults.push({
      id: nextId(),
      artworkId: pool[i % pool.length],
      gradeBand: state.gradeBand,
      score: scores[i],
      total: 4,
      studentName,
      ts: Date.now() - (i + 1) * 3600_000,
      seeded: true,
    });
  });
  state.seeded = true;
  save();
}

export { PRESET_UNITS };
