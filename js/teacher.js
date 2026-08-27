/* Teacher dashboard: load a unit, set the reading level, choose the works in scope. */

import { state, save, applyCurriculum, clearCurriculum, toggleArtwork, PRESET_UNITS } from './state.js';
import { ARTWORKS } from '../data/artworks.js';
import { t, bandLabel, topicLabel, artById, localizeAll, localizeArt, localizeUnit } from './i18n.js';
import { suggestArtworkIds } from '../data/curriculum.js';
import { getRosieReply } from './rosie.js';
import { artMedia } from './artframe.js';
import { el, mountBandPicker, renderContextBar } from './app.js';

export function renderTeacher() {
  renderPresets();
  renderParsed();
  renderBandSection();
  renderScope();
  renderActivity();
  wireTeacher();
}

/* ── 1 · curriculum ──────────────────────────────────────────────────── */

function renderPresets() {
  el('presets').innerHTML = PRESET_UNITS.map(localizeUnit).map((u) => `
    <button class="preset" data-preset="${u.id}" aria-pressed="${state.curriculum?.id === u.id}">
      <strong>${u.title}</strong>
      <span>${u.subtitle}</span>
      <span class="band">${t('teacher.suggested')}: ${bandLabel(u.suggestedBand)}</span>
    </button>`).join('');
}

function renderParsed() {
  const cur = state.curriculum;
  el('parsed').hidden = !cur;
  if (!cur) return;

  el('topicchips').innerHTML = cur.focusTopics.map((topic, i) => `
    <span class="topicchip ${topic.kind === 'skill' ? 'skill' : ''}">
      ${topicLabel(topic)}
      <span class="why" title="${topic.matchedTerms.join(', ')}">${topic.matchedTerms.length}×</span>
      <button class="x" data-drop="${i}" aria-label="${topicLabel(topic)}">×</button>
    </span>`).join('') || `<span class="muted small">${t('teacher.noTopics')}</span>`;
}

/* ── 2 · reading level ───────────────────────────────────────────────── */

function renderBandSection() {
  mountBandPicker(el('bandpicker-teacher'), () => { renderBandSection(); renderContextBar(); });

  // Show the teacher what the level actually does, using a work their unit covers.
  const art = artById(state.enabledArtworkIds[0]) || localizeArt(ARTWORKS[0]);
  const reply = getRosieReply('Why does this painting matter?', {
    artwork: art, gradeBand: state.gradeBand, curriculum: state.curriculum, forceTopic: 'symbolism',
  });
  el('band-preview').innerHTML = `
    <span class="lbl">${t('teacher.sample')} · ${bandLabel(state.gradeBand)} · ${art.title}</span>
    ${reply.text}`;
}

/* ── 3 · artwork scope ───────────────────────────────────────────────── */

function renderScope() {
  const cur = state.curriculum;
  const suggested = new Set(cur ? suggestArtworkIds(cur.focusTopics) : []);
  const on = new Set(state.enabledArtworkIds);

  el('scope-note').textContent = cur
    ? `${t('teacher.scoped')} (${suggested.size}/${ARTWORKS.length})`
    : t('teacher.s3sub');

  el('scope-grid').innerHTML = ARTWORKS.map((a) => `
    <button class="scopecard" data-scope="${a.id}" aria-pressed="${on.has(a.id)}">
      ${suggested.has(a.id) ? `<span class="badge">${t('teacher.suggested')}</span>` : ''}
      <span class="check" aria-hidden="true">✓</span>
      <span class="sframe">${artMedia(a, 'thumbnail')}</span>
      <span class="st">${a.title}</span>
      <span class="sa">${a.artist}, ${a.year}</span>
    </button>`).join('');
}

/* ── class activity ──────────────────────────────────────────────────── */

function renderActivity() {
  const rows = [];
  state.quizResults.slice(0, 8).forEach((r) => {
    const art = artById(r.artworkId);
    const pct = r.total ? Math.round((r.score / r.total) * 100) : 100;
    rows.push(`<div class="actrow">
      <span class="who">${r.studentName || state.user?.name || 'Student'}</span>
      <span class="what">${t('nav.quiz')} · ${art ? art.title : '—'} · ${r.gradeBand}</span>
      <span class="score ${pct >= 75 ? 'good' : 'mid'}">${r.score}/${r.total}</span>
    </div>`);
  });
  state.chats.filter((c) => c.messages.length).slice(0, 4).forEach((c) => {
    const art = artById(c.artworkId);
    const q = c.messages.find((m) => m.role === 'user');
    rows.push(`<div class="actrow">
      <span class="who">${state.user?.name || 'Student'}</span>
      <span class="what">${t('teacher.asked')} ${art ? art.title : '—'}${q ? ': “' + q.text.slice(0, 40) + '”' : ''}</span>
      <span class="score">${c.messages.filter((m) => m.role === 'user').length} Qs</span>
    </div>`);
  });
  el('activity').innerHTML = rows.length ? rows.join('')
    : `<div class="emptystate">${t('teacher.noActivity')}</div>`;
}

/* ── wiring ──────────────────────────────────────────────────────────── */

let teacherWired = false;
function wireTeacher() {
  el('presets').onclick = (e) => {
    const btn = e.target.closest('[data-preset]');
    if (!btn) return;
    const unit = localizeUnit(PRESET_UNITS.find((u) => u.id === btn.dataset.preset));
    applyCurriculum({ id: unit.id, title: unit.title, rawText: unit.text, band: unit.suggestedBand });
    renderTeacher();
    renderContextBar();
  };

  el('topicchips').onclick = (e) => {
    const x = e.target.closest('[data-drop]');
    if (!x) return;
    state.curriculum.focusTopics.splice(Number(x.dataset.drop), 1);
    save();
    renderTeacher();
    renderContextBar();
  };

  el('scope-grid').onclick = (e) => {
    const card = e.target.closest('[data-scope]');
    if (!card) return;
    toggleArtwork(card.dataset.scope);
    renderScope();
    renderBandSection();
  };

  if (teacherWired) return;
  teacherWired = true;

  el('btn-parse').addEventListener('click', () => {
    const text = el('unit-text').value.trim();
    if (!text) { el('unit-text').focus(); return; }
    applyCurriculum({ id: 'custom', title: el('unit-title').value.trim() || 'My unit', rawText: text });
    renderTeacher();
    renderContextBar();
  });

  el('btn-upload').addEventListener('click', () => el('file-input').click());

  el('file-input').addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    el('unit-text').value = text;
    el('unit-title').value = el('unit-title').value || file.name.replace(/\.(txt|md)$/i, '');
    el('paste-block').open = true;
    applyCurriculum({ id: 'custom', title: el('unit-title').value, rawText: text });
    renderTeacher();
    renderContextBar();
    e.target.value = '';
  });

  el('btn-clear-curriculum').addEventListener('click', () => {
    clearCurriculum();
    renderTeacher();
    renderContextBar();
  });
}
