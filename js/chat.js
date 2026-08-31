/* Student chat view. */

import { state, save, enabledArtworks, startChat, activeChat, addMessage } from './state.js';
import { t, bandLabel, artById, localizeAll } from './i18n.js';
import { getRosieReply, getFillReply, starterFor } from './rosie.js';
import { artMedia } from './artframe.js';
import { el } from './app.js';

let thinking = false;

function currentArtwork() {
  const chat = activeChat();
  return artById(chat?.artworkId) || localizeAll(enabledArtworks())[0];
}

function ctx(artwork) {
  return { artwork, gradeBand: state.gradeBand, curriculum: state.curriculum };
}

/** Open a work, resuming an existing conversation about it where one exists. */
export function openArtwork(artworkId, chatId) {
  if (chatId && state.chats.some((c) => c.id === chatId)) {
    state.activeChatId = chatId;
  } else {
    const existing = state.chats.find((c) => c.artworkId === artworkId);
    if (existing) state.activeChatId = existing.id;
    else startChat(artworkId);
  }
  save();
}

export function renderChat() {
  const works = localizeAll(enabledArtworks());
  if (!activeChat() || !works.some((w) => w.id === activeChat().artworkId)) {
    openArtwork(works[0].id);
  }

  // The reading level is now chosen on a step of its own, which means a
  // conversation can be re-entered at a level it was not written for. Catch
  // that here: the whole thread re-levels in place, with nothing retyped.
  const chat = activeChat();
  if (chat && chat.gradeBand !== state.gradeBand) relevelChat();

  renderHeader();
  renderThread();
  wireChat();
}

function renderHeader() {
  const a = currentArtwork();
  el('artwork-header').innerHTML = `<span class="frame">${artMedia(a, 'full')}</span>`;
}

/* ── thread ──────────────────────────────────────────────────────────── */

function bandTag(m) {
  return `<span class="bandtag"><span class="dot"></span>${bandLabel(m.band) || m.band}${
    m.bridged ? ` · <span class="bridge">${t('chat.linked')}</span>` : ''}</span>`;
}

function renderThread() {
  const chat = activeChat();
  const box = el('thread');
  if (!chat) return;

  if (!chat.messages.length) {
    const a = currentArtwork();
    box.innerHTML = `<div class="empty-thread">
      Ask Rosie anything about <em>${a.title}</em> — or tap one of the questions below.
    </div>`;
    return;
  }

  box.innerHTML = chat.messages.map((m) => m.role === 'user'
    ? `<div class="msg user"><span class="av">${initials()}</span>
         <div><div class="bubble">${bubbleText(m)}</div></div></div>`
    : `<div class="msg rosie"><span class="av">R</span>
         <div><div class="bubble">${bubbleText(m)}</div>${bandTag(m)}</div></div>`
  ).join('');
  box.scrollTop = box.scrollHeight;
}

/* A mad lib is one bubble that changes state in place: Rosie's sentence with a
   live blank in it; then the student's words in the blank; then Rosie carrying
   on right after them. Everything else is plain text. */
function bubbleText(m) {
  const ml = m.madlib;
  if (!ml) return escape(m.text);
  if (ml.answer == null) {
    return `${escape(ml.before)}<input class="fillin" type="text" autocomplete="off" spellcheck="false"
      size="${Math.max(8, t('chat.fillHint').length)}" placeholder="${escape(t('chat.fillHint'))}"
      aria-label="${escape(t('chat.fillHint'))}">${escape(ml.after)}`;
  }
  const tail = ml.continuation == null
    ? ` <span class="typing inline"><span></span><span></span><span></span></span>`
    : ` ${escape(ml.continuation)}`;
  return `${escape(ml.before)}<mark>${escape(ml.answer)}</mark>${escape(ml.after)}${tail}`;
}

const escape = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const initials = () => (state.user?.name || 'You').split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

/* ── asking ──────────────────────────────────────────────────────────── */

function ask(question, forceTopic) {
  if (thinking) return;
  const chat = activeChat();
  const a = currentArtwork();
  addMessage(chat.id, 'user', question);
  renderThread();

  // A brief pause reads as consideration rather than lookup. It is cosmetic.
  thinking = true;
  showTyping();

  setTimeout(() => {
    const reply = getRosieReply(question, { ...ctx(a), forceTopic });
    addMessage(chat.id, 'rosie', reply.text, {
      topic: reply.topic, band: reply.band, bridged: reply.bridged, sourceQuestion: question,
    });
    thinking = false;
    document.getElementById('typing')?.remove();
    renderThread();
  }, 420);
}

/* ── mad lib ──────────────────────────────────────────────────────────────
   Rosie posts a sentence with a blank the student types straight into. On
   Enter the words settle into the sentence and Rosie keeps writing right after
   them, in the same bubble. Nothing goes through the composer, nothing new
   appears on screen: one bubble, three states. */

const openMadlib = () => activeChat()?.messages.find((m) => m.madlib && m.madlib.answer == null) || null;

/* The stored text is the flat sentence, so history and search see prose. */
const madlibText = (ml) =>
  `${ml.before}${ml.answer ?? '______'}${ml.after}${ml.continuation ? ' ' + ml.continuation : ''}`;

function startMadlib() {
  if (thinking) return;
  if (openMadlib()) { el('thread').querySelector('.fillin')?.focus(); return; }
  const chat = activeChat();
  const a = currentArtwork();
  const n = chat.messages.filter((m) => m.madlib).length;
  const s = starterFor(a, state.gradeBand, n);
  const madlib = { ...s, n, answer: null, continuation: null };
  addMessage(chat.id, 'rosie', madlibText(madlib), { madlib, band: state.gradeBand, bridged: false });
  renderThread();
  el('thread').querySelector('.fillin')?.focus();
}

function finishMadlib(answer) {
  const m = openMadlib();
  if (!m || thinking) return;
  const a = currentArtwork();
  m.madlib.answer = answer;
  m.text = madlibText(m.madlib);
  save();
  renderThread();

  // Same cosmetic pause as a question, but the dots sit inside the sentence.
  thinking = true;
  setTimeout(() => {
    const reply = getFillReply(m.madlib, ctx(a));
    Object.assign(m, { topic: reply.topic, band: reply.band, bridged: reply.bridged });
    m.madlib.continuation = reply.text;
    m.text = madlibText(m.madlib);
    thinking = false;
    save();
    renderThread();
    el('composer-input').focus();
  }, 420);
}

function showTyping() {
  const box = el('thread');
  box.insertAdjacentHTML('beforeend',
    `<div class="msg rosie" id="typing"><span class="av">R</span>
      <div class="bubble"><span class="typing"><span></span><span></span><span></span></span></div></div>`);
  box.scrollTop = box.scrollHeight;
}

/**
 * Re-answer every question in the thread at the current reading level.
 *
 * This is the feature the whole project exists to demonstrate: the student does
 * not retype anything, and the entire conversation re-levels in place.
 */
export function relevelChat() {
  const chat = activeChat();
  if (!chat) return;
  const a = artById(chat.artworkId);
  let changed = 0;
  chat.messages = chat.messages.map((m) => {
    if (m.role !== 'rosie') return m;
    // Mad libs re-level both halves -- Rosie's sentence and her continuation --
    // and leave the student's own words exactly as typed.
    if (m.madlib) {
      const ml = { ...m.madlib, ...starterFor(a, state.gradeBand, m.madlib.n) };
      let meta = { band: state.gradeBand };
      if (ml.answer != null && ml.continuation != null) {
        const r = getFillReply(ml, ctx(a));
        ml.continuation = r.text;
        meta = { band: r.band, bridged: r.bridged, topic: r.topic };
      }
      changed++;
      return { ...m, ...meta, madlib: ml, text: madlibText(ml) };
    }
    if (!m.sourceQuestion) return m;
    const r = getRosieReply(m.sourceQuestion, { ...ctx(a), forceTopic: m.topic || undefined });
    changed++;
    return { ...m, text: r.text, band: r.band, bridged: r.bridged, topic: r.topic };
  });
  chat.gradeBand = state.gradeBand;
  save();
  renderThread();
  return changed;
}

/* ── wiring ──────────────────────────────────────────────────────────── */

let chatWired = false;
function wireChat() {
  // No band picker here any more -- the level is settled before the chat opens,
  // and renderChat() re-levels the thread if it changed while away.

  if (chatWired) return;
  chatWired = true;

  el('composer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = el('composer-input');
    const q = input.value.trim();
    if (!q) return;
    input.value = '';
    ask(q);
  });

  el('btn-fill').addEventListener('click', startMadlib);

  // The blank lives inside the thread. Enter commits it; the field grows with
  // the words so the sentence never looks like a form.
  el('thread').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || !e.target.classList.contains('fillin')) return;
    e.preventDefault();
    const v = e.target.value.trim();
    if (v) finishMadlib(v);
  });
  el('thread').addEventListener('input', (e) => {
    if (e.target.classList.contains('fillin')) e.target.size = Math.max(8, e.target.value.length + 1);
  });
}
