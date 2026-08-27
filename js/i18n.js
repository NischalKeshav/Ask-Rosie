/* Language layer.
 *
 * The design rule here is that only this file knows a second language exists.
 * Everything downstream — rosie.js, the views, the quiz — reads an artwork
 * object and a set of strings, and never asks which language it is holding.
 *
 * `localizeArt()` is what makes that work: it returns the artwork with its
 * Spanish title, blurb, facts, suggestions and talking points merged over the
 * English ones. The reply engine then generates Spanish without a single
 * language check, because the data it reads is already Spanish.
 */

import { state, save } from './state.js';
import { UI, BAND_LABELS, ROSIE, TOPIC_LABELS, UNITS, LANGS, LANG_LABELS } from '../data/i18n.js';
import { ART_ES } from '../data/artworks.es.js';
import { ARTWORK_BY_ID } from '../data/artworks.js';

export function curLang() {
  return LANGS.includes(state.lang) ? state.lang : 'en';
}

export function otherLang() {
  return curLang() === 'en' ? 'es' : 'en';
}

export function langLabel(l) { return LANG_LABELS[l] || l; }

/** A UI string. Falls back to English, then to the key, so nothing renders blank. */
export function t(key) {
  const l = curLang();
  return (UI[l] && UI[l][key]) || UI.en[key] || key;
}

/** Grade band label — "Grades 6–8" / "Grados 6.º–8.º". */
export function bandLabel(band) {
  return (BAND_LABELS[curLang()] || BAND_LABELS.en)[band] || band;
}

/** A preset unit in the current language, body text included. */
export function localizeUnit(unit) {
  const es = curLang() === 'es' ? UNITS.es?.[unit.id] : null;
  return es ? { ...unit, ...es } : unit;
}

/** A focus-topic label. Falls back to whatever the parser stored (English). */
export function topicLabel(topic) {
  const map = TOPIC_LABELS[curLang()];
  return (map && map[topic.slug]) || topic.label;
}

/** Rosie's connective tissue, or null when the English source should be used. */
export function rosieGlue() { return ROSIE[curLang()] || null; }

/**
 * An artwork in the current language.
 *
 * Merged field by field rather than replaced wholesale: `palette`, `motif`,
 * `mediaId`, `themes` and `id` are language-neutral and must survive, and a
 * work that has not been translated yet degrades to English rather than to a
 * half-empty object.
 */
export function localizeArt(artwork) {
  if (!artwork) return artwork;
  const es = curLang() === 'es' ? ART_ES[artwork.id] : null;
  if (!es) return artwork;
  return {
    ...artwork,
    title:       es.title       || artwork.title,
    medium:      es.medium      || artwork.medium,
    blurb:       es.blurb       || artwork.blurb,
    facts:       es.facts       || artwork.facts,
    suggestions: es.suggestions || artwork.suggestions,
    topics:      es.topics      || artwork.topics,
  };
}

export function setLang(next) {
  if (!LANGS.includes(next) || next === curLang()) return false;
  state.lang = next;
  save();
  document.documentElement.lang = next;
  return true;
}

/**
 * Rewrite the static markup.
 *
 * Views built from template strings re-render on their own; this covers the
 * text that only ever appears in index.html. Attributes are handled separately
 * because a placeholder and a label are not text nodes.
 */
export function applyLang() {
  document.documentElement.lang = curLang();
  document.querySelectorAll('[data-i18n]').forEach((n) => {
    n.textContent = t(n.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((n) => {
    n.placeholder = t(n.dataset.i18nPh);
  });
  document.querySelectorAll('[data-i18n-label]').forEach((n) => {
    const s = t(n.dataset.i18nLabel);
    n.setAttribute('aria-label', s);
    if (n.hasAttribute('title')) n.setAttribute('title', s);
  });
}

/** An artwork by id, already in the current language. */
export function artById(id) { return localizeArt(ARTWORK_BY_ID[id]); }

/** A list of artworks, already in the current language. */
export function localizeAll(list) { return (list || []).map(localizeArt); }
