/* Router, shared chrome, and boot. */

import { state, save, reset } from './state.js';
import { ARTWORKS, GRADE_BANDS } from '../data/artworks.js';
import { t, bandLabel, topicLabel, artById, localizeArt, curLang, otherLang, langLabel, setLang, applyLang } from './i18n.js';
import { getRosieReply } from './rosie.js';
import { renderChat, openArtwork, closeGallery, relevelChat } from './chat.js';
import { renderTeacher } from './teacher.js';
import { startQuiz, renderQuiz } from './quiz.js';
import { renderHistory } from './history.js';
import { mountAuth, renderUserChip } from './auth.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const el = (id) => document.getElementById(id);

/* Views that need the grade-band / curriculum strip visible above them.
 * Chat is deliberately absent: it runs as a bare surface with no app chrome,
 * and its reading level is settled before it opens. */
const CONTEXT_VIEWS = new Set(['quiz', 'teacher']);

/* Chat hides the top bar too -- nothing above the conversation. */
const BARE_VIEWS = new Set(['chat']);

let current = 'landing';

export function navigate(view) {
  // The gallery never opens on an unchosen reading level.
  if (view === 'chat' && !state.bandChosen) view = 'level';

  closeGallery();   // never leave the chat's menu hanging open behind a view switch

  current = view;
  $$('.view').forEach((v) => v.classList.remove('active'));
  const target = el('view-' + view);
  if (target) target.classList.add('active');

  $$('.navbtn').forEach((b) => b.classList.toggle('active', b.dataset.nav === view));
  el('topnav').hidden = view === 'landing' || view === 'signin' || view === 'level';
  el('topbar').hidden = BARE_VIEWS.has(view);
  el('contextbar').hidden = !CONTEXT_VIEWS.has(view);
  document.body.classList.toggle('bare', BARE_VIEWS.has(view));

  if (view === 'level') renderLevel();
  if (view === 'chat') renderChat();
  if (view === 'teacher') renderTeacher();
  if (view === 'quiz') renderQuiz();
  if (view === 'history') renderHistory();

  renderContextBar();
  window.scrollTo({ top: 0, behavior: 'instant' });
  location.hash = view === 'landing' ? '' : '#' + view;
}

export function currentView() { return current; }

/* ── grade band pickers ──────────────────────────────────────────────── */

/** Builds a band picker into `host`. Every picker on the page stays in sync. */
export function mountBandPicker(host, onChange, opts = {}) {
  if (!host) return;
  host.innerHTML = GRADE_BANDS.map((b) => `
    <button type="button" data-band="${b}" aria-pressed="${b === state.gradeBand}"
            title="${bandLabel(b)}">${opts.full
              ? `<strong>${b}</strong><span>${bandLabel(b)}</span>`
              : b}</button>`).join('');
  host.onclick = (e) => {
    const btn = e.target.closest('[data-band]');
    if (!btn) return;
    setGradeBand(btn.dataset.band);
    onChange?.(state.gradeBand);
  };
}

export function setGradeBand(band) {
  if (!GRADE_BANDS.includes(band) || band === state.gradeBand) return;
  state.gradeBand = band;
  state.bandChosen = true;   // a deliberate pick anywhere settles the question
  save();
  syncBandPickers();
}

export function syncBandPickers() {
  $$('.bandpicker button').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.band === state.gradeBand));
  });
}

/* ── reading level ───────────────────────────────────────────────────────
   A step of its own rather than a control inside the chat: the level is a
   decision made once, and the conversation stays uncluttered because of it. */

export function renderLevel() {
  mountBandPicker(el('bandpicker-level'), renderLevel, { full: true });

  const art = artById(state.enabledArtworkIds[0]) || localizeArt(ARTWORKS[0]);
  const reply = getRosieReply('Why does this painting matter?', {
    artwork: art, gradeBand: state.gradeBand, curriculum: state.curriculum, forceTopic: 'symbolism',
  });
  el('level-preview').innerHTML =
    `<span class="lbl">${t('level.sample')} · ${bandLabel(state.gradeBand)}</span>${reply.text}`;
}

/* ── context bar ─────────────────────────────────────────────────────── */

export function renderContextBar() {
  const cur = state.curriculum;
  const label = el('ctx-curriculum');
  if (label) {
    label.textContent = cur ? cur.title : t('ctx.none');
    label.classList.toggle('empty', !cur);
  }
  const topics = el('ctx-topics');
  if (topics) {
    const list = (cur?.focusTopics || []).filter((t) => t.kind !== 'skill').slice(0, 4);
    topics.innerHTML = list.map((x) => `<span class="minichip">${topicLabel(x)}</span>`).join('');
  }
  syncBandPickers();
}

/* ── language ────────────────────────────────────────────────────────────
   Switching language re-labels the static markup and then re-renders whatever
   view is open. Rosie's existing answers are regenerated rather than left in
   the previous language: relevelChat() already rewrites a whole thread from
   its stored questions, and it reads the localized artwork, so calling it is
   all a translation needs. */

function renderLangButton() {
  const btn = el('lang-current');
  if (btn) btn.textContent = otherLang().toUpperCase();
  const host = el('lang-toggle');
  if (host) host.title = `${t('a11y.lang')} — ${langLabel(otherLang())}`;
}

function toggleLang() {
  if (!setLang(otherLang())) return;
  applyLang();
  renderLangButton();
  renderUserChip();
  if (current === 'chat') relevelChat();
  navigate(current);
}

/* ── theme ───────────────────────────────────────────────────────────── */

/* Cream is the default art direction, not a response to the OS setting -- the
 * editorial palette is built on paper. Dark is offered as a preference, and is
 * the same three colours inverted. */
function applyTheme() {
  if (state.theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');
}

function cycleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  save();
  applyTheme();
}

/* ── boot ────────────────────────────────────────────────────────────── */

function boot() {
  applyTheme();
  applyLang();
  renderLangButton();
  mountBandPicker(el('bandpicker'), () => {
    if (current === 'chat') renderChat();
    if (current === 'teacher') renderTeacher();
  });
  mountAuth();
  renderUserChip();

  el('brand-home').onclick = () => navigate(state.user ? 'chat' : 'landing');
  el('theme-toggle').onclick = cycleTheme;
  el('lang-toggle').onclick = toggleLang;

  el('btn-level-continue').onclick = () => {
    state.bandChosen = true;
    save();
    navigate('chat');
  };
  el('btn-level-back').onclick = () => navigate(state.user ? 'teacher' : 'landing');

  // The chat's only two chrome controls, both living inside the view itself.
  el('chat-exit').onclick = () => navigate(state.user?.role === 'teacher' ? 'teacher' : 'landing');
  el('btn-change-band').onclick = () => navigate('level');

  document.addEventListener('click', (e) => {
    const nav = e.target.closest('[data-nav]');
    if (nav) { navigate(nav.dataset.nav); return; }
    const door = e.target.closest('[data-door]');
    if (door) { window.dispatchEvent(new CustomEvent('auth:open', { detail: door.dataset.door })); }
  });

  el('btn-reset').onclick = () => {
    if (confirm(t('hist.resetConfirm'))) {
      reset();
      location.hash = '';
      location.reload();
    }
  };

  window.addEventListener('quiz:start', (e) => {
    startQuiz(e.detail.artworkId);
    navigate('quiz');
  });
  window.addEventListener('chat:open', (e) => {
    openArtwork(e.detail.artworkId, e.detail.chatId);
    navigate('chat');
  });
  window.addEventListener('nav', (e) => navigate(e.detail));

  const hash = location.hash.replace('#', '');
  const valid = ['chat', 'teacher', 'quiz', 'history', 'level'];
  if (state.user && valid.includes(hash)) navigate(hash);
  else if (state.user) navigate('chat');   // redirects to 'level' on a first visit
  else navigate('landing');
}

document.addEventListener('DOMContentLoaded', boot);
