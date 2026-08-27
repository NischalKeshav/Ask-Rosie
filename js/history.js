/* Saved conversations and quiz results for the signed-in user. */

import { state, deleteChat } from './state.js';
import { t, bandLabel, artById, curLang } from './i18n.js';
import { el } from './app.js';

/* Relative time. Spanish puts the preposition first ("hace 5 min"), English
   puts it last ("5 min ago"), so the unit is built and then placed. */
const when = (ts) => {
  const es = curLang() === 'es';
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 1) return es ? 'ahora mismo' : 'just now';

  let unit;
  if (mins < 60) unit = `${mins} min`;
  else {
    const hrs = Math.round(mins / 60);
    if (hrs < 24) unit = es ? `${hrs} ${hrs === 1 ? 'hora' : 'horas'}`
                            : `${hrs} ${hrs === 1 ? 'hour' : 'hours'}`;
    else {
      const days = Math.round(hrs / 24);
      unit = es ? `${days} ${days === 1 ? 'día' : 'días'}`
                : `${days} ${days === 1 ? 'day' : 'days'}`;
    }
  }
  return es ? `hace ${unit}` : `${unit} ago`;
};

export function renderHistory() {
  const list = el('historylist');
  const chats = state.chats.filter((c) => c.messages.length);

  list.innerHTML = chats.length ? chats.map((c) => {
    const art = artById(c.artworkId);
    const first = c.messages.find((m) => m.role === 'user');
    return `<div class="histrow">
      <div class="hmeta">
        <div class="ht">${art ? art.title : '—'}</div>
        <div class="hs">${c.messages.length} ${t('hist.messages')} · ${c.gradeBand} · ${when(c.ts)}${
          first ? ' · “' + first.text.slice(0, 46) + (first.text.length > 46 ? '…' : '') + '”' : ''}</div>
      </div>
      <button class="btn small hbtn" data-resume="${c.id}">${t('hist.resume')}</button>
      <button class="btn small ghost hbtn" data-del="${c.id}" aria-label="${t('hist.a11yDelete')}">✕</button>
    </div>`;
  }).join('') : `<div class="emptystate">${t('hist.noChats')}</div>`;

  list.onclick = (e) => {
    const resume = e.target.closest('[data-resume]');
    if (resume) {
      const chat = state.chats.find((c) => c.id === resume.dataset.resume);
      if (chat) window.dispatchEvent(new CustomEvent('chat:open', {
        detail: { artworkId: chat.artworkId, chatId: chat.id },
      }));
      return;
    }
    const del = e.target.closest('[data-del]');
    if (del) { deleteChat(del.dataset.del); renderHistory(); }
  };

  const qh = el('quizhistory');
  const mine = state.quizResults.filter((r) => !r.seeded);
  qh.innerHTML = mine.length ? mine.map((r) => {
    const art = artById(r.artworkId);
    const pct = r.total ? Math.round((r.score / r.total) * 100) : 100;
    return `<div class="histrow">
      <div class="hmeta">
        <div class="ht">${art ? art.title : '—'}</div>
        <div class="hs">${r.gradeBand} · ${when(r.ts)}</div>
      </div>
      <span class="score ${pct >= 75 ? 'good' : 'mid'}">${r.score}/${r.total}</span>
    </div>`;
  }).join('') : `<div class="emptystate">${t('hist.noQuizzes')}</div>`;
}
