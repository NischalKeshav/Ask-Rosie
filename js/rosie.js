/* Rosie's response engine.
 *
 * ── Swapping in a real model ──────────────────────────────────────────────
 * Everything that generates language funnels through getRosieReply(). To move
 * this demo onto a live Claude call, replace that one function's body with a
 * fetch to a backend proxy and pass `buildSystemPrompt(ctx)` as the system
 * prompt. Every call site already awaits it, so nothing else has to change.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { TOPIC_LEXICON } from '../data/curriculum.js';
import { rosieGlue, curLang, topicLabel } from './i18n.js';

/* Which topic is the student actually asking about?
 * Ordered most-specific first — `symbolism` has to beat `subject` on a question
 * like "why is she stepping on a book", which contains cues for both. */
/* Order matters: first match wins, so specific cues must precede generic ones.
 * `feeling` sits above `technique` because "how does it make you FEEL" would
 * otherwise be captured by the generic "how does..." technique pattern, and
 * `technique` sits above `symbolism` so "why does she look so strong" routes to
 * how-it-was-painted rather than to what-it-means. */
const INTENT_RULES = [
  { topic: 'artist', patterns: [/who (painted|made|created|did)/, /\bartist\b/, /who was\b/, /\bpainter\b/, /about (the )?(artist|painter)/, /\b(school|movement)\b/, /dollar bill/, /why paint\b/, /\billustrator\b/] },
  { topic: 'feeling', patterns: [/\bfeel(s|ing)?\b/, /\bmood\b/, /\bemotion/, /\bsad\b|\bhappy\b|\bscary\b|\bcalm\b|\bpeaceful\b/, /do you (like|think)/, /what do you think/, /\bopinion\b/, /make you feel/, /does (he|she|it|they) look\b(?! (so )?(real|far|bright|glow|strong|big|rough|loose))/, /thinking about/, /\blook like a\b/] },
  { topic: 'context', patterns: [/\bwhen\b/, /what year/, /what was happening/, /\bhistory\b/, /historical/, /back then/, /at the time/, /\bera\b/, /what was life like/, /\bwar\b/, /\b1[6789]\d\d\b/, /\b19[0-9]\d\b/, /what are they building/] },
  { topic: 'technique', patterns: [/\bhow (did|does|do)\b/, /\bcolor|colour\b/, /brush/, /\blight\b/, /\bshadow\b/, /\btechnique\b/, /\bstyle\b/, /look(s)? (so )?(real|far|bright|glow|strong|big|rough|loose)/, /\bglow/, /\bdark\b/, /perspective/, /\breal place\b/, /\bpaint(ed)? (it|this|that)\b/, /so (blue|dark|bright|big|loose|rough)/, /\bimpressionism\b/, /\babstract\b/, /\b(white|blue|red|green|gold|golden|black)\b/, /\bfar away\b/, /\ball white\b/] },
  { topic: 'symbolism', patterns: [/\bwhy\b/, /\bmean(s|ing)?\b/, /\bsymbol/, /stand(s)? for/, /represent/, /\bmessage\b/, /stepping on/, /\bunder (her|his|the)\b/, /point of/, /trying to say/, /\bsignificance\b/] },
  { topic: 'subject', patterns: [/what (is|are|do|does|am|can) (i|we|you|it|this|that|she|he|they)/, /\bwhat'?s\b/, /what is (happening|going on)/, /\bsee\b/, /\bwho is\b/, /\bshow(n|ing)?\b/, /\bwearing\b/, /\bholding\b/, /\bdoing\b/, /\bwhere\b/, /how many/, /\bcount\b/, /\bwho are\b/, /what (is|are) all\b/, /\bpins?\b/, /\bstuff\b/, /what kind of\b/] },
];

/* Spanish cues, in the same order and with the same specific-before-generic
 * logic as the English set above. Accents are optional in every pattern —
 * students type "quien pinto esto" as often as "¿quién pintó esto?", and a
 * router that only understands the accented form is a router that fails the
 * people it was added for.
 *
 * These are appended to the English rules rather than swapped in, so a
 * bilingual classroom can type in either language at any setting. */
const INTENT_RULES_ES = [
  { topic: 'artist', patterns: [/qui[eé]n (la |lo |las |los )?(pint[oó]|hizo|cre[oó]|realiz[oó])/, /\bartista\b/, /\bpintor(a)?\b/, /qui[eé]n (fue|era)\b/, /\bilustrador(a)?\b/, /\b(escuela|movimiento)\b/, /billete de (un )?d[oó]lar/, /por qu[eé] pint/] },
  { topic: 'feeling', patterns: [/\bsent(ir|imiento|ir[ií]a)\b/, /te hace sentir/, /\bse siente\b/, /qu[eé] se siente/, /(^|[^a-z])[aá]nimo\b/, /\bemoci[oó]n/, /\btriste\b|\bfeliz\b|\bmiedo\b|\bcalma\b|\btranquil/, /qu[eé] (piensas|opinas)/, /\bopini[oó]n\b/, /te gusta\b/, /parece un[ao]? /, /\bpensando\b/] },
  { topic: 'context', patterns: [/\bcu[aá]ndo\b/, /qu[eé] a[nñ]o/, /qu[eé] estaba pasando/, /\bhistoria\b/, /\bhist[oó]ric/, /en (esa|aquella) [eé]poca/, /(^|[^a-z])[eé]poca\b/, /c[oó]mo era la vida/, /\bguerra\b/, /\b1[6789]\d\d\b/, /\b19[0-9]\d\b/, /qu[eé] (est[aá]n |están )?constru/] },
  { topic: 'technique', patterns: [/c[oó]mo (lo |la |se )?(pint|hizo|logr|consigui)/, /\bcolor(es)?\b/, /\bpincel/, /\bluz\b/, /\bsombra/, /\bt[eé]cnica\b/, /\bestilo\b/, /se ve(n)? (tan |muy )?(real|fuerte|grande|brillante|lejos|lejan|oscur|[aá]sper|suelt)/, /\bbrilla/, /\boscur[oa]\b/, /perspectiva/, /lugar real/, /\bimpresionismo\b/, /\babstract[oa]\b/, /\b(blanc[oa]|azul|roj[oa]|verde|dorad[oa]|negr[oa])\b/, /\blejos\b/, /tan (azul|oscuro|brillante|grande|suelto)/] },
  { topic: 'symbolism', patterns: [/\bpor qu[eé](?![a-z])/, /\bsignifica(do|n)?\b/, /\bs[ií]mbolo/, /simboliza/, /\brepresenta/, /\bmensaje\b/, /\bpisando\b/, /(debajo|bajo) de (su|la|el)\b/, /quiere decir/, /\bsentido de\b/] },
  { topic: 'subject', patterns: [/qu[eé] (es|son|hay|est[aá]|est[aá]n|ves|muestra)/, /qu[eé] est[aá] pasando/, /qui[eé]n(es)? (es|son)\b/, /\bves\b/, /\bmuestra\b/, /\bllev(a|an) puesto\b/, /\bsostiene\b/, /\bhaciendo\b/, /\bd[oó]nde\b/, /cu[aá]nt[oa]s\b/, /\bcuenta\b/, /\bprendedor(es)?\b/, /\bcosas\b/, /qu[eé] tipo de\b/, /de qu[eé] es\b/] },
];

const GREETING = /^\s*(hi|hey|hello|yo|howdy|good (morning|afternoon|evening)|hola|buenas|buenos d[ií]as|buenas tardes)\b/i;
const THANKS = /\b(thanks|thank you|ty|appreciate|gracias)\b/i;
const META = /(what can i ask|what should i ask|help|what do you know|who are you|what are you|qu[eé] puedo preguntar|qui[eé]n eres|ayuda)/i;

/* Both rule sets are consulted, English first, because the two are checked in
 * the same priority order and a question in one language cannot match the
 * other's cues by accident. */
export function detectIntent(question) {
  const q = String(question).toLowerCase();
  for (let i = 0; i < INTENT_RULES.length; i++) {
    if (INTENT_RULES[i].patterns.some((p) => p.test(q))) return INTENT_RULES[i].topic;
    if (INTENT_RULES_ES[i].patterns.some((p) => p.test(q))) return INTENT_RULES_ES[i].topic;
  }
  return null;
}

/* Rosie's voice changes with the audience, not just her vocabulary. */
const OPENERS = {
  'K-2': ['Ooh, good question!', 'I love that you noticed that.', 'Great eyes!', 'Let’s look together.'],
  '3-5': ['Good question — let’s look closely.', 'That’s worth noticing.', 'Nice catch.', 'Here’s what I see.'],
  '6-8': ['Good question.', 'Let’s dig into that.', 'That’s the right thing to be asking.', 'Here’s what’s going on.'],
  '9-12': ['Worth unpacking.', 'Good question — there’s a lot here.', 'Let’s take that seriously.', 'That gets at something real.'],
};

const CLOSERS = {
  'K-2': ['What else do you notice?', 'What do you think?', 'Want to look at another part?'],
  '3-5': ['What else stands out to you?', 'Does that match what you expected?', 'What would you ask next?'],
  '6-8': ['What’s your read on it?', 'Does that change how you see the painting?', 'What would you want evidence for?'],
  '9-12': ['Where would you push back on that?', 'What would complicate this reading?', 'What evidence would settle it?'],
};

/* Deterministic pick, so the same question in the same context always produces the
 * same answer. A demo that shifts under you is a demo that loses the room. */
function pick(list, seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return list[h % list.length];
}

/**
 * Themes the artwork and the loaded curriculum genuinely share.
 * Skill topics are excluded — "close looking" is not a content bridge.
 */
export function sharedThemes(artwork, curriculum) {
  if (!curriculum || !curriculum.focusTopics?.length) return [];
  return curriculum.focusTopics
    .filter((t) => t.kind !== 'skill' && artwork.themes.includes(t.slug))
    .sort((a, b) => b.score - a.score);
}

const BRIDGE_TEMPLATES = {
  'K-2': (labels) => `Your class is learning about ${labels}. This painting is a great place to see it!`,
  '3-5': (labels) => `This connects to what your class is studying: ${labels}.`,
  '6-8': (labels) => `Worth connecting back to your unit — this is a direct example of ${labels}.`,
  '9-12': (labels) => `This bears directly on your unit’s focus on ${labels}, and would work well as evidence in that discussion.`,
};

function listLabels(themes, max = 2) {
  // Labels keep their own casing -- lowercasing turns "World War II" into "world war ii".
  // topicLabel() resolves them in the current language rather than using the
  // English label the parser stored when the unit was analysed.
  const labels = themes.slice(0, max).map((x) => topicLabel(x));
  if (labels.length === 0) return '';
  if (labels.length === 1) return labels[0];
  const and = curLang() === 'es' ? ' y ' : ' and ';
  return labels.slice(0, -1).join(', ') + and + labels[labels.length - 1];
}

/**
 * Suggested question chips for an artwork, reordered so anything touching the
 * teacher's focus topics floats to the front.
 */
export function suggestionsFor(artwork, curriculum) {
  const shared = sharedThemes(artwork, curriculum);
  if (!shared.length) return artwork.suggestions.map((s) => ({ ...s, relevant: false }));

  // A topic is "covered" by whichever artwork talking point most naturally hosts it.
  const topicAffinity = {
    wwii: 'context', labor: 'context', industrialization: 'context', 'early-republic': 'context',
    'american-revolution': 'context', 'urban-life': 'context', 'westward-expansion': 'context',
    symbolism: 'symbolism', power: 'symbolism', propaganda: 'symbolism', government: 'symbolism',
    'gender-roles': 'symbolism', scale: 'symbolism', friendship: 'context',
    'color-theory': 'technique', light: 'technique', realism: 'technique', abstraction: 'technique',
    impressionism: 'technique', 'hudson-river-school': 'artist', 'ashcan-school': 'artist',
    modernism: 'artist', illustration: 'artist', romanticism: 'feeling', imagination: 'feeling',
    women: 'artist', literacy: 'subject', 'domestic-life': 'subject', science: 'subject',
    nature: 'subject', landscape: 'subject', portraiture: 'subject', education: 'context',
  };
  const hot = new Set(shared.map((t) => topicAffinity[t.slug]).filter(Boolean));

  return artwork.suggestions
    .map((s) => ({ ...s, relevant: hot.has(s.topic) }))
    .sort((a, b) => Number(b.relevant) - Number(a.relevant));
}

/**
 * Compose Rosie's reply.
 *
 * @param {string} question
 * @param {{artwork: object, gradeBand: string, curriculum: object|null, forceTopic?: string}} ctx
 *        `forceTopic` skips intent detection. Suggestion chips pass it, since a
 *        chip already knows what it is asking about.
 * @returns {{text: string, topic: string|null, band: string, bridged: boolean}}
 */
export function getRosieReply(question, ctx) {
  const { artwork, gradeBand, curriculum, forceTopic } = ctx;
  const band = gradeBand;
  const q = String(question || '').trim();
  const seed = q.toLowerCase() + '|' + artwork.id + '|' + band;

  // Conversational turns that aren't about the artwork.
  const glue = rosieGlue();

  if (GREETING.test(q) && q.length < 30) {
    return {
      text: glue
        ? `${glue.greeting[band]} Estamos viendo ${artwork.title}, de ${artwork.artist} (${artwork.year}).`
        : band === 'K-2'
          ? `Hi! I’m Rosie. We’re looking at ${artwork.title} by ${artwork.artist}. Ask me anything you notice!`
          : `Hi! I’m Rosie. Right now we’re looking at ${artwork.title}, painted by ${artwork.artist} in ${artwork.year}. Ask me anything about it.`,
      topic: null, band, bridged: false,
    };
  }
  if (THANKS.test(q) && q.length < 30) {
    const list = glue ? glue.thanks : ['Any time!', 'Happy to.', 'That’s what I’m here for.'];
    return { text: pick(list, seed), topic: null, band, bridged: false };
  }
  if (META.test(q)) {
    const s = suggestionsFor(artwork, curriculum).slice(0, 3).map((x) => `“${x.q}”`).join(', ');
    return {
      text: glue
        ? `${glue.metaA} ${artwork.title}: ${glue.metaB} ${s}.`
        : `I’m Rosie, and I can talk about anything in ${artwork.title} — what’s in it, who made it, what was happening at the time, how it was painted, and what it might mean. You could try ${s}.`,
      topic: null, band, bridged: false,
    };
  }

  const topic = forceTopic && artwork.topics[forceTopic] ? forceTopic : detectIntent(q);

  if (!topic) {
    const joiner = glue ? ' o ' : ' or ';
    const s = suggestionsFor(artwork, curriculum).slice(0, 2).map((x) => `“${x.q}”`).join(joiner);
    return {
      text: glue
        ? `${glue.fallbackA} ${artwork.title}. ${glue.fallbackB} ${s}.`
        : band === 'K-2'
          ? `Hmm, I’m not sure about that one! But I know a lot about this painting. Want to try ${s}?`
          : `I’m not certain how to answer that one from what I know about this painting. I’d do better with something like ${s} — or ask about the artist, the history, or how it was made.`,
      topic: null, band, bridged: false,
    };
  }

  const body = artwork.topics[topic][band];
  const shared = sharedThemes(artwork, curriculum);
  const parts = [];

  parts.push(pick((glue?.openers || OPENERS)[band], seed));
  parts.push(body);

  let bridged = false;
  if (shared.length) {
    // The youngest band gets one topic, not two: "Propaganda & Persuasion" is not
    // a phrase a second grader can use, and stacking two makes it worse.
    const maxTopics = band === 'K-2' ? 1 : 2;
    parts.push((glue?.bridges || BRIDGE_TEMPLATES)[band](listLabels(shared, maxTopics)));
    bridged = true;
  }
  parts.push(pick((glue?.closers || CLOSERS)[band], seed + topic));

  return { text: parts.join(' '), topic, band, bridged };
}

/**
 * The system prompt a live model would receive. Unused by the scripted engine —
 * it exists so the swap to a real API is a matter of wiring, not redesign.
 */
export function buildSystemPrompt(ctx) {
  const { artwork, gradeBand, curriculum } = ctx;
  const voice = {
    'K-2': 'Use short sentences and concrete nouns. One idea at a time. End by wondering aloud.',
    '3-5': 'Add context and stretch vocabulary lightly. Invite comparison.',
    '6-8': 'Explain cause and effect. Name terms and define them inline.',
    '9-12': 'Analyze. Cite evidence. Acknowledge where interpretations are contested.',
  }[gradeBand];

  return [
    `You are Rosie, a guide at the Crystal Bridges Museum of American Art. You are talking with a student about "${artwork.title}" by ${artwork.artist} (${artwork.year}).`,
    `Reading level: ${gradeBand}. ${voice}`,
    `Verified facts about this work:\n${artwork.facts.map((f) => '- ' + f).join('\n')}`,
    curriculum?.focusTopics?.length
      ? `The class is studying: ${curriculum.title}. Focus topics: ${curriculum.focusTopics.map((t) => t.label).join(', ')}. Connect your answers to these where it is honest to do so — never force a connection that isn't there.`
      : 'No curriculum has been loaded. Answer generally.',
    'Never invent facts about the artwork. If you do not know, say so and offer what you do know.',
  ].join('\n\n');
}

export { TOPIC_LEXICON };
