/* Mock sign-in. Name and role only, stored in localStorage.
 * There is no server and no credential -- the demo is honest about this in the UI. */

import { state, save, applyCurriculum, seedDemoData, PRESET_UNITS } from './state.js';
import { el, navigate } from './app.js';
import { t, localizeUnit } from './i18n.js';

let pendingRole = 'student';

export function mountAuth() {
  window.addEventListener('auth:open', (e) => openSignin(e.detail));

  el('signin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = el('signin-name').value.trim();
    if (!name) return;
    const code = el('signin-code').value.trim().toUpperCase();

    state.user = { name, role: pendingRole, classCode: code || null };
    save();

    // A class code of DEMO drops the session straight into a configured classroom,
    // so the demo can open on a warm state instead of an empty one.
    if (code === 'DEMO' && !state.curriculum) {
      const unit = localizeUnit(PRESET_UNITS[0]);
      applyCurriculum({ id: unit.id, title: unit.title, rawText: unit.text, band: unit.suggestedBand });
      seedDemoData();
    }

    renderUserChip();
    // Teachers set the level on their dashboard; students are asked for it directly.
    navigate(pendingRole === 'teacher' ? 'teacher' : 'chat');
  });

  el('userchip').addEventListener('click', () => {
    if (confirm(t('signin.signout'))) {
      state.user = null;
      save();
      renderUserChip();
      navigate('landing');
    }
  });
}

function openSignin(role) {
  pendingRole = role === 'teacher' ? 'teacher' : 'student';
  el('signin-title').textContent = t(pendingRole === 'teacher' ? 'signin.teacher' : 'signin.student');
  el('signin-sub').textContent = t(pendingRole === 'teacher' ? 'signin.subTeacher' : 'signin.subStudent');
  el('signin-code-field').hidden = false;
  el('signin-name').value = state.user?.name || '';
  el('signin-name').placeholder = t(pendingRole === 'teacher' ? 'signin.namePhTeacher' : 'signin.namePhStudent');
  navigate('signin');
  setTimeout(() => el('signin-name').focus(), 40);
}

export function renderUserChip() {
  const chip = el('userchip');
  if (!state.user) { chip.hidden = true; return; }
  const initials = state.user.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  chip.hidden = false;
  chip.innerHTML = `<span class="avatar">${initials}</span>
    <span>${state.user.name}</span>
    <span class="role">${t(state.user.role === 'teacher' ? 'nav.teacher' : 'role.student')}</span>`;
  chip.title = `${t('signin.signedInAs')} ${state.user.name} (${t('nav.' + (state.user.role === 'teacher' ? 'teacher' : 'chat'))})`;
}
