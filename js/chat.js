/* Student chat view. */

import { state, save, enabledArtworks, startChat, activeChat, addMessage } from './state.js';
import { t, bandLabel, artById, localizeAll } from './i18n.js';
import { getRosieReply, suggestionsFor, sharedThemes } from './rosie.js';
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

  renderGallery(works);
  renderHeader();
  renderThread();
  renderChips();
  wireChat();
}

/* ── gallery ─────────────────────────────────────────────────────────── */

function renderGallery(works) {
  const cur = state.curriculum;
  el('gallery-sub').textContent = cur
    ? `${works.length} ${t('chat.chosenFor')} ${cur.title}`
    : `${works.length} ${t('chat.works')} · ${t('chat.noUnit')}`;

  // The level is shown, not editable -- changing it is a trip back to its own step.
  el('gallery-band').textContent = bandLabel(state.gradeBand);

  // The trigger carries the current work, so the menu can stay shut.
  el('gallery-current').textContent = artById(activeChat()?.artworkId)?.title || t('chat.choose');

  const active = activeChat()?.artworkId;
  el('gallery-list').innerHTML = works.map((a) => {
    const hot = sharedThemes(a, cur).slice(0, 2);
    return `<button class="artcard" data-art="${a.id}" aria-current="${a.id === active}">
      <span class="thumb">${artMedia(a, 'thumbnail')}</span>
      <span class="meta">
        <span class="t">${a.title}</span>
        <span class="a">${a.artist}, ${a.year}</span>
        <span class="tags">${hot.map((t) => `<span class="tag hot">${t.label}</span>`).join('')}</span>
      </span>
    </button>`;
  }).join('');
}

function renderHeader() {
  const a = currentArtwork();
  el('artwork-header').innerHTML = `
    <span class="frame">${artMedia(a, 'full')}</span>
    <span class="info">
      <h2>${a.title}</h2>
      ${a.cbObject ? `<p class="source">${t('chat.source')}
        <a href="https://crystalbridges.emuseum.com/objects/${a.cbObject}"
           target="_blank" rel="noopener noreferrer">Crystal Bridges Museum of American Art</a>.
        ${t('chat.sourceTail')}</p>` : ''}
    </span>`;
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
         <div><div class="bubble">${escape(m.text)}</div></div></div>`
    : `<div class="msg rosie"><span class="av">R</span>
         <div><div class="bubble">${escape(m.text)}</div>${bandTag(m)}</div></div>`
  ).join('');
  box.scrollTop = box.scrollHeight;
}

const escape = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const initials = () => (state.user?.name || 'You').split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

function renderChips() {
  const a = currentArtwork();
  const list = suggestionsFor(a, state.curriculum);
  el('chips').innerHTML = list.map((s) => `
    <button class="chip ${s.relevant ? 'relevant' : ''}" data-chip="${s.topic}"
            title="${s.relevant ? 'Connects to your class unit' : ''}">${s.q}</button>`).join('');
}

/* ── asking ──────────────────────────────────────────────────────────── */

function ask(question, forceTopic) {
  if (thinking) return;
  const chat = activeChat();
  const a = currentArtwork();
  addMessage(chat.id, 'user', question);
  renderThread();

  // A brief pause reads as consideration rather than lookup. It is cosmetic.
  thinking = true;
  const box = el('thread');
  box.insertAdjacentHTML('beforeend',
    `<div class="msg rosie" id="typing"><span class="av">R</span>
      <div class="bubble"><span class="typing"><span></span><span></span><span></span></span></div></div>`);
  box.scrollTop = box.scrollHeight;

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
    if (m.role !== 'rosie' || !m.sourceQuestion) return m;
    const r = getRosieReply(m.sourceQuestion, { ...ctx(a), forceTopic: m.topic || undefined });
    changed++;
    return { ...m, text: r.text, band: r.band, bridged: r.bridged, topic: r.topic };
  });
  chat.gradeBand = state.gradeBand;
  save();
  renderThread();
  return changed;
}

/* ── the gallery menu ────────────────────────────────────────────────────
   The gallery used to be a permanent column. It is a menu now: the chat is the
   only thing on screen until a student asks for the list. */

let galleryOpen = false;

function setGallery(open) {
  galleryOpen = open;
  el('gallery-panel').hidden = !open;
  el('gallery-trigger').setAttribute('aria-expanded', String(open));
}

export function closeGallery({ refocus = false } = {}) {
  if (!galleryOpen) return;
  setGallery(false);
  if (refocus) el('gallery-trigger').focus();
}

function toggleGallery() {
  if (galleryOpen) { closeGallery(); return; }
  setGallery(true);
  // Land on the work already open, so the list starts where the student is.
  el('gallery-list').querySelector('[aria-current="true"]')?.focus();
}

/* ── wiring ──────────────────────────────────────────────────────────── */

let chatWired = false;
function wireChat() {
  // No band picker here any more -- the level is settled before the chat opens,
  // and renderChat() re-levels the thread if it changed while away.

  el('gallery-list').onclick = (e) => {
    const card = e.target.closest('[data-art]');
    if (!card) return;
    openArtwork(card.dataset.art);
    closeGallery();
    renderChat();
  };

  el('chips').onclick = (e) => {
    const chip = e.target.closest('[data-chip]');
    if (!chip) return;
    ask(chip.textContent.trim(), chip.dataset.chip);
  };

  if (chatWired) return;
  chatWired = true;

  el('gallery-trigger').addEventListener('click', toggleGallery);

  // Anywhere outside the menu shuts it, as does Escape -- which also puts focus
  // back on the trigger, so keyboard users are not dropped at the top of the page.
  document.addEventListener('click', (e) => {
    if (!galleryOpen) return;
    if (!e.target.closest('#gallerymenu')) closeGallery();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryOpen) closeGallery({ refocus: true });
  });

  el('composer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = el('composer-input');
    const q = input.value.trim();
    if (!q) return;
    input.value = '';
    ask(q);
  });

  el('btn-quiz-this').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('quiz:start', { detail: { artworkId: currentArtwork().id } }));
  });

  el('btn-new-chat').addEventListener('click', () => {
    startChat(currentArtwork().id);
    renderChat();
    el('composer-input').focus();
  });
}
