/* Quiz mode. Questions are drawn from the current work's pool, filtered to the
 * class reading level and biased toward the teacher's focus topics. */

import { state, recordQuiz, enabledArtworks } from './state.js';
import { t, bandLabel, artById, localizeAll } from './i18n.js';
import { sharedThemes } from './rosie.js';
import { artMedia } from './artframe.js';
import { el } from './app.js';

const LENGTH = 4;

let session = null;

/** Which talking-point topics the loaded unit cares about, for question weighting. */
function hotTopics(artwork) {
  const affinity = {
    wwii: 'context', labor: 'context', industrialization: 'context', 'early-republic': 'context',
    'american-revolution': 'context', 'urban-life': 'context', 'westward-expansion': 'context',
    symbolism: 'symbolism', power: 'symbolism', propaganda: 'symbolism', government: 'symbolism',
    'gender-roles': 'symbolism', scale: 'symbolism',
    'color-theory': 'technique', light: 'technique', realism: 'technique', abstraction: 'technique',
    impressionism: 'technique', modernism: 'artist', illustration: 'artist',
    'hudson-river-school': 'artist', 'ashcan-school': 'artist',
  };
  return new Set(sharedThemes(artwork, state.curriculum).map((t) => affinity[t.slug]).filter(Boolean));
}

/* Stable hash, so a given question always shuffles the same way. A quiz whose
 * options jump around between re-renders would be unusable. */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/**
 * Permute a question's options and remap the correct index.
 *
 * The source data lists the correct answer first in every question, which is
 * fine for authoring and fatal for a quiz -- without this, clicking the top
 * option every time scores 100%.
 */
function shuffleOptions(q, seed) {
  if (q.type !== 'mc') return q;
  const order = q.options.map((_, i) => i);
  let h = hash(seed);
  for (let i = order.length - 1; i > 0; i--) {
    h = (Math.imul(h, 48271) + 11) >>> 0;
    const j = h % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    answer: order.indexOf(q.answer),
  };
}

function buildQuestions(artwork) {
  const band = state.gradeBand;
  const pool = artwork.quiz.filter((q) => q.bands.includes(band));
  const hot = hotTopics(artwork);
  // Curriculum-relevant questions first, then the rest, order otherwise stable.
  const ranked = [...pool].sort((a, b) => Number(hot.has(b.topic)) - Number(hot.has(a.topic)));
  return ranked
    .slice(0, Math.min(LENGTH, ranked.length))
    .map((q) => shuffleOptions(q, artwork.id + '|' + q.question));
}

export function startQuiz(artworkId) {
  const artwork = artById(artworkId) || localizeAll(enabledArtworks())[0];
  session = {
    artwork,
    band: state.gradeBand,
    questions: buildQuestions(artwork),
    index: 0,
    score: 0,        // correct multiple-choice answers
    graded: 0,       // multiple-choice questions seen
    written: 0,      // open questions answered (not machine-graded)
    answered: false,
    lastCorrect: null,
    done: false,
  };
}

export function renderQuiz() {
  const host = el('quizwrap');

  if (!session) {
    const works = localizeAll(enabledArtworks());
    host.innerHTML = `
      <h2>${t('quiz.pick')}</h2>
      <p class="muted">${t('quiz.writtenFor')} ${bandLabel(state.gradeBand)}${
        state.curriculum ? ` and weighted toward “${state.curriculum.title}”` : ''}.</p>
      <div class="scope-grid">${works.map((a) => `
        <button class="scopecard" data-pick="${a.id}" aria-pressed="true">
          <span class="sframe">${artMedia(a, 'thumbnail')}</span>
          <span class="st">${a.title}</span>
          <span class="sa">${a.artist}, ${a.year}</span>
        </button>`).join('')}</div>`;
    host.onclick = (e) => {
      const b = e.target.closest('[data-pick]');
      if (!b) return;
      startQuiz(b.dataset.pick);
      renderQuiz();
    };
    return;
  }

  if (session.done) return renderResult(host);

  // The band may have changed since the session started; rebuild rather than
  // showing questions written for a different reading level.
  if (session.band !== state.gradeBand) {
    startQuiz(session.artwork.id);
  }

  const q = session.questions[session.index];
  if (!q) { session.done = true; return renderResult(host); }

  const pct = (session.index / session.questions.length) * 100;
  host.innerHTML = `
    <div class="quiz-head">
      <span class="frame">${artMedia(session.artwork, 'preview')}</span>
      <div>
        <h2>${session.artwork.title}</h2>
        <p class="muted small" style="margin:0">${bandLabel(session.band)}${
          state.curriculum ? ' · ' + state.curriculum.title : ''}</p>
      </div>
    </div>
    <div class="quiz-progress"><i style="width:${pct}%"></i></div>
    <div class="qcount">${t('quiz.question')} ${session.index + 1} ${t('quiz.of')} ${session.questions.length}</div>
    <div class="qtext">${q.question}</div>
    ${q.type === 'mc' ? renderMC(q) : renderOpen(q)}
    <div id="feedback"></div>
    <div class="row" style="margin-top:1.2rem">
      <button class="btn primary" id="q-next" ${session.answered ? '' : 'disabled'}>
        ${session.index + 1 === session.questions.length ? 'See results' : 'Next question'}
      </button>
      <button class="btn ghost" data-nav="chat">${t('quiz.back')}</button>
    </div>`;

  host.onclick = onQuizClick;
  if (session.answered) showFeedback(q);
}

function renderMC(q) {
  return `<div class="options">${q.options.map((o, i) =>
    `<button class="option" data-opt="${i}" ${session.answered ? 'disabled' : ''}>${o}</button>`
  ).join('')}</div>`;
}

function renderOpen(q) {
  return `<div class="openanswer">
    <label class="sr-only" for="open-input">${t('quiz.yourAnswer')}</label>
    <textarea id="open-input" placeholder="Write what you think…" ${session.answered ? 'disabled' : ''}></textarea>
    <div class="row" style="margin-top:.6rem">
      <button class="btn" id="q-submit" ${session.answered ? 'disabled' : ''}>${t('quiz.submit')}</button>
    </div>
  </div>`;
}

function onQuizClick(e) {
  const q = session.questions[session.index];

  const opt = e.target.closest('[data-opt]');
  if (opt && !session.answered) {
    const chosen = Number(opt.dataset.opt);
    session.answered = true;
    session.lastCorrect = chosen === q.answer;
    session.graded++;
    if (session.lastCorrect) session.score++;
    document.querySelectorAll('.option').forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add('correct');
      else if (i === chosen) b.classList.add('wrong');
    });
    el('q-next').disabled = false;
    showFeedback(q);
    return;
  }

  if (e.target.closest('#q-submit') && !session.answered) {
    const text = el('open-input').value.trim();
    session.answered = true;
    // Open questions are self-assessed against a model answer. Nothing here can
    // judge a written response, so these deliberately do not affect the score --
    // counting them would turn "wrote enough characters" into "was right".
    session.lastCorrect = text.length >= 15;
    session.written++;
    el('open-input').disabled = true;
    e.target.closest('#q-submit').disabled = true;
    el('q-next').disabled = false;
    showFeedback(q);
    return;
  }

  if (e.target.closest('#q-next')) {
    session.index++;
    session.answered = false;
    session.lastCorrect = null;
    if (session.index >= session.questions.length) session.done = true;
    renderQuiz();
  }
}

function showFeedback(q) {
  const box = el('feedback');
  if (!box) return;
  if (q.type === 'mc') {
    box.innerHTML = `<div class="feedback">
      <div class="who">Rosie</div>
      <p><strong>${session.lastCorrect ? 'That’s it.' : 'Not quite.'}</strong> ${q.explanation}</p>
    </div>`;
  } else {
    box.innerHTML = `<div class="feedback">
      <div class="who">Rosie</div>
      <p>${session.lastCorrect
        ? 'Good — you gave that real thought. Compare yours with mine:'
        : 'Try to say a little more next time. Here’s how I’d answer:'}</p>
      <div class="model">${q.model}</div>
      <p class="muted small" style="margin:.6rem 0 0">${t('quiz.notGraded')}</p>
    </div>`;
  }
}

function renderResult(host) {
  const { score, graded, written, artwork, band } = session;
  const total = graded || 1;
  const pct = Math.round((score / total) * 100);

  recordQuiz({
    artworkId: artwork.id, gradeBand: band, score, total: graded, written,
    studentName: state.user?.name || 'You',
  });

  const line = !graded ? 'All written answers on this one — compare yours with Rosie’s.'
    : pct === 100 ? 'Every one. You were really looking.'
    : pct >= 75 ? 'Strong work — you caught most of it.'
    : pct >= 50 ? 'A solid start. Some of these take a second look.'
    : 'Worth going back to the painting. Let’s talk it through.';

  host.innerHTML = `
    <div class="quiz-result">
      <div class="scoreball">${score}/${graded}<small>${bandLabel(band)}</small></div>
      <h2>${line}</h2>
      <p class="muted">${artwork.title} · ${artwork.artist}</p>
      ${written ? `<p class="muted small">Plus ${written} written ${written === 1 ? 'answer' : 'answers'}, which Rosie doesn’t grade — you compared them with hers yourself.</p>` : ''}
      <div class="row" style="justify-content:center;margin-top:1.4rem">
        <button class="btn primary" id="q-discuss">${t('quiz.discuss')}</button>
        <button class="btn" id="q-again">${t('quiz.again')}</button>
      </div>
    </div>`;

  host.onclick = (e) => {
    if (e.target.closest('#q-discuss')) {
      const id = artwork.id;
      session = null;
      window.dispatchEvent(new CustomEvent('chat:open', { detail: { artworkId: id } }));
    }
    if (e.target.closest('#q-again')) { session = null; renderQuiz(); }
  };
}
