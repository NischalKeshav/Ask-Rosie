/* Curriculum parsing.
 *
 * A teacher pastes in a unit plan or a set of standards. We match it against a
 * lexicon of terms tied to the theme tags used in artworks.js, then rank the
 * collection by how well each work overlaps the detected focus.
 *
 * This is keyword matching, not comprehension. It is deliberately transparent:
 * every detected topic reports the words that triggered it, so a teacher can see
 * why a topic appeared and remove it if the match was wrong.
 */

import { ARTWORKS } from './artworks.js';

/** theme slug -> { label, terms } */
export const TOPIC_LEXICON = {
  wwii: { label: 'World War II', terms: ['world war ii', 'world war 2', 'world war two', 'second world war', 'wwii', 'ww2', 'home front', 'homefront', 'pearl harbor', 'axis', 'allies', 'hitler', 'nazi', 'war effort', 'rationing', 'victory garden', 'segunda guerra mundial', 'ii guerra mundial', 'frente interno', 'frente doméstico', 'nazi', 'hitler', 'aliados', 'racionamiento', 'esfuerzo de guerra', 'pearl harbor'] },
  labor: { label: 'Labor & Work', terms: ['labor', 'labour', 'worker', 'workers', 'workforce', 'factory', 'factories', 'union', 'wages', 'employment', 'job', 'jobs', 'occupation', 'trade', 'trabajo', 'trabajador', 'trabajadores', 'obrero', 'obreros', 'fábrica', 'fabricas', 'fábricas', 'sindicato', 'salario', 'salarios', 'empleo', 'oficio', 'mano de obra'] },
  'gender-roles': { label: 'Gender Roles', terms: ['gender', 'women', 'woman', 'womens', "women's", 'female', 'feminism', 'feminist', 'suffrage', 'equality', 'girls', 'roles of women', 'género', 'genero', 'roles de género', 'mujer', 'mujeres', 'femenino', 'feminismo', 'sufragio', 'igualdad', 'niñas'] },
  propaganda: { label: 'Propaganda & Persuasion', terms: ['propaganda', 'persuasion', 'persuasive', 'advertising', 'advertisement', 'poster', 'campaign', 'messaging', 'rhetoric', 'media literacy', 'bias', 'propaganda', 'persuasión', 'persuasion', 'persuasivo', 'publicidad', 'anuncio', 'cartel', 'carteles', 'campaña', 'retórica', 'retorica', 'sesgo', 'alfabetización mediática'] },
  symbolism: { label: 'Symbolism', terms: ['symbol', 'symbols', 'symbolism', 'symbolic', 'metaphor', 'allegory', 'iconography', 'meaning', 'represents', 'stands for', 'símbolo', 'simbolo', 'símbolos', 'simbolismo', 'simbólico', 'metáfora', 'alegoría', 'iconografía', 'significado', 'representa'] },
  industrialization: { label: 'Industrialization', terms: ['industrial', 'industrialization', 'industrialisation', 'machine', 'machinery', 'manufacturing', 'construction', 'infrastructure', 'railroad', 'urbanization', 'progress era', 'gilded age', 'industrial', 'industrialización', 'industrializacion', 'máquina', 'maquinaria', 'manufactura', 'construcción', 'infraestructura', 'ferrocarril', 'urbanización'] },
  landscape: { label: 'Landscape', terms: ['landscape', 'scenery', 'wilderness', 'mountains', 'terrain', 'environment', 'geography', 'land', 'paisaje', 'paisajes', 'naturaleza salvaje', 'montañas', 'terreno', 'geografía', 'tierra'] },
  nature: { label: 'Nature & Environment', terms: ['nature', 'natural world', 'ecology', 'conservation', 'environmental', 'plants', 'botany', 'outdoors', 'naturaleza', 'medioambiente', 'medio ambiente', 'ecología', 'conservación', 'plantas', 'botánica', 'aire libre'] },
  romanticism: { label: 'Romanticism', terms: ['romantic', 'romanticism', 'sublime', 'transcendental', 'transcendentalism', 'emerson', 'thoreau', 'romántico', 'romanticismo', 'sublime', 'trascendentalismo'] },
  'hudson-river-school': { label: 'Hudson River School', terms: ['hudson river school', 'hudson river', 'thomas cole', 'durand', 'catskill', 'escuela del río hudson', 'río hudson', 'thomas cole', 'durand'] },
  'westward-expansion': { label: 'Westward Expansion', terms: ['westward', 'manifest destiny', 'frontier', 'expansion', 'settlement', 'pioneers', 'territory', 'expansión hacia el oeste', 'destino manifiesto', 'frontera', 'expansión', 'colonización', 'pioneros', 'territorio'] },
  'early-republic': { label: 'Early Republic', terms: ['early republic', 'founding', 'founders', 'constitution', 'federalist', 'washington', 'jefferson', 'new nation', '1790s', 'primera república', 'fundación', 'fundadores', 'constitución', 'federalista', 'washington', 'jefferson', 'nueva nación'] },
  'american-revolution': { label: 'American Revolution', terms: ['revolution', 'revolutionary war', 'independence', 'declaration of independence', 'continental army', 'colonies', 'colonial', 'revolución', 'revolución estadounidense', 'guerra de independencia', 'independencia', 'ejército continental', 'colonias', 'colonial'] },
  government: { label: 'Government & Civics', terms: ['government', 'civics', 'democracy', 'republic', 'president', 'presidency', 'power', 'citizenship', 'election', 'vote', 'voting', 'gobierno', 'civismo', 'democracia', 'república', 'presidente', 'presidencia', 'poder', 'ciudadanía', 'elección', 'voto', 'votar'] },
  power: { label: 'Power & Authority', terms: ['power', 'authority', 'leadership', 'leader', 'monarchy', 'king', 'rule', 'control', 'poder', 'autoridad', 'liderazgo', 'líder', 'monarquía', 'rey', 'gobernar', 'control'] },
  portraiture: { label: 'Portraiture', terms: ['portrait', 'portraits', 'portraiture', 'self-portrait', 'likeness', 'sitter', 'retrato', 'retratos', 'retratística', 'autorretrato', 'modelo'] },
  modernism: { label: 'Modernism', terms: ['modernism', 'modernist', 'modern art', 'avant-garde', 'abstraction movement', '20th century art', 'modernismo', 'modernista', 'arte moderno', 'vanguardia', 'siglo xx'] },
  abstraction: { label: 'Abstraction', terms: ['abstract', 'abstraction', 'non-representational', 'nonobjective', 'shape and form', 'abstracto', 'abstracción', 'no figurativo', 'forma y figura'] },
  impressionism: { label: 'Impressionism', terms: ['impressionism', 'impressionist', 'monet', 'degas', 'renoir', 'plein air', 'impresionismo', 'impresionista', 'monet', 'degas', 'renoir', 'pintura al aire libre'] },
  realism: { label: 'Realism', terms: ['realism', 'realist', 'naturalism', 'observation from life', 'true to life', 'realismo', 'realista', 'naturalismo', 'del natural', 'fiel a la realidad'] },
  'ashcan-school': { label: 'Ashcan School', terms: ['ashcan', 'ash can', 'robert henri', 'the eight', 'urban realism', 'escuela ashcan', 'robert henri', 'realismo urbano'] },
  'urban-life': { label: 'Urban Life', terms: ['urban', 'city', 'cities', 'immigration', 'tenement', 'street life', 'new york', 'urbano', 'ciudad', 'ciudades', 'inmigración', 'inquilinato', 'vida callejera', 'nueva york'] },
  'color-theory': { label: 'Color Theory', terms: ['color', 'colour', 'palette', 'hue', 'complementary', 'warm and cool', 'color wheel', 'value', 'saturation', 'teoría del color', 'color', 'colores', 'paleta', 'complementarios', 'tono', 'matiz'] },
  light: { label: 'Light & Shadow', terms: ['light', 'shadow', 'chiaroscuro', 'illumination', 'contrast', 'highlight', 'glow', 'luz', 'sombra', 'iluminación', 'claroscuro', 'resplandor', 'brillo'] },
  scale: { label: 'Scale & Proportion', terms: ['scale', 'proportion', 'size', 'magnification', 'enlarged', 'monumental', 'escala', 'proporción', 'tamaño', 'monumental', 'ampliación'] },
  illustration: { label: 'Illustration', terms: ['illustration', 'illustrator', 'magazine', 'commercial art', 'graphic', 'print media', 'ilustración', 'ilustrador', 'revista', 'portada', 'arte comercial'] },
  science: { label: 'Science & Medicine', terms: ['science', 'scientific', 'medicine', 'medical', 'anatomy', 'chemistry', 'biology', 'laboratory', 'experiment', 'ciencia', 'científico', 'medicina', 'médico', 'química', 'anatomía', 'laboratorio', 'microscopio'] },
  observation: { label: 'Observation & Inquiry', kind: 'skill', terms: ['observation', 'observe', 'evidence', 'inquiry', 'analysis', 'close looking', 'close reading', 'critical thinking', 'observación', 'observar', 'evidencia', 'indagación', 'análisis', 'mirar de cerca', 'pensamiento crítico'] },
  education: { label: 'Education & Schooling', kind: 'skill', terms: ['history of education', 'schooling', 'academy', 'university', 'classroom instruction', 'pedagogy', 'educación', 'escuela', 'enseñanza', 'aprendizaje', 'currículo', 'estudiante', 'profesor', 'docente'] },
  literacy: { label: 'Reading & Literacy', terms: ['literacy', 'reading', 'reader', 'books', 'text', 'literature', 'novel', 'poetry', 'alfabetización', 'lectura', 'leer', 'libro', 'libros', 'educación lectora'] },
  women: { label: 'Women’s History', terms: ['women in history', "women's history", 'womens history', 'women artists', 'female artists', 'mujeres', 'mujer', 'artistas mujeres', 'historia de las mujeres'] },
  'domestic-life': { label: 'Domestic Life', terms: ['domestic', 'home life', 'household', 'family', 'private sphere', 'interior', 'vida doméstica', 'doméstico', 'hogar', 'casa', 'familia', 'maternidad'] },
  friendship: { label: 'Friendship & Memory', terms: ['friendship', 'friends', 'memorial', 'memory', 'mourning', 'grief', 'tribute', 'elegy', 'amistad', 'amigo', 'amigos', 'compañerismo'] },
  imagination: { label: 'Imagination & Fantasy', terms: ['imagination', 'fantasy', 'fairy tale', 'myth', 'dream', 'storytelling', 'make-believe', 'imaginación', 'fantasía', 'cuento', 'ensueño', 'magia'] },
};

/** Ready-made units so a demo never depends on someone typing a paragraph. */
export const PRESET_UNITS = [
  {
    id: 'wwii-home-front',
    title: 'The WWII Home Front',
    subtitle: 'Labor, propaganda, and changing roles, 1941–1945',
    suggestedBand: '6-8',
    text: `Unit 4: The American Home Front in World War II

Essential question: How did total war reshape daily life and work in the United States?

Students will examine how the war effort mobilized civilians, with particular attention to
women entering industrial labor in factories and shipyards. We will analyze wartime propaganda
posters and magazine imagery as persuasive texts, asking who produced them, for what audience,
and toward what end. Students will evaluate how gender roles shifted during the war and what
happened to those changes afterward.

Key vocabulary: home front, rationing, war effort, propaganda, mobilization, riveter.
Skills: analyzing visual primary sources for bias and purpose; using symbols as evidence.`,
  },
  {
    id: 'symbolism-portraiture',
    title: 'Reading Symbols in American Portraits',
    subtitle: 'How pictures argue about power and identity',
    suggestedBand: '9-12',
    text: `Unit 2: Symbolism, Power, and the American Portrait

Essential question: How do portraits make arguments about authority and identity?

Students will study portraiture from the early republic through the modern era, treating
symbolism and iconography as evidence. We will examine how clothing, objects, setting, and pose
communicate claims about power, and how the deliberate absence of traditional symbols can itself
be a rhetorical strategy. Connections to government and civics: how a new republic constructed a
visual language of leadership distinct from monarchy.

Skills: iconographic analysis, sourcing, evaluating competing interpretations of the same image.`,
  },
  {
    id: 'land-and-light',
    title: 'Land, Light, and the American Landscape',
    subtitle: 'Nature, Romanticism, and the 19th century',
    suggestedBand: '3-5',
    text: `Unit 1: Looking at the American Land

Big idea: Artists show us how they feel about nature by how they paint it.

Students will look closely at landscape paintings and describe what they see. We will talk about
how artists use light and color to make a place feel calm, exciting, or scary. Students will
learn how painters make things look far away, and will compare a peaceful wilderness scene with a
busy construction site in a city.

Vocabulary: landscape, foreground, background, scale, light, shadow.
Skills: close looking, describing evidence, comparing two artworks.`,
  },
  {
    id: 'industry-and-labor',
    title: 'Industry, Labor, and the Changing City',
    subtitle: 'Work and urban growth, 1870–1945',
    suggestedBand: '6-8',
    text: `Unit 6: Industrialization and the American Worker

Essential question: What did rapid industrial growth cost the people who built it?

Students will investigate urban construction, factory labor, and the conditions of working life
during a period of intense industrialization and immigration. We will analyze how artists chose
to depict workers — whether as individuals or as anonymous figures — and what those choices argue.
Connections to civics: labor organizing, wages, and workplace safety.

Skills: analyzing artistic choices as arguments; comparing depictions of labor across eras.`,
  },
];

const norm = (s) => ' ' + String(s).toLowerCase().replace(/[^a-z0-9\s'’]/g, ' ').replace(/\s+/g, ' ') + ' ';

/**
 * Scan text for lexicon terms.
 * Returns topics sorted by strength, each carrying the terms that matched so a
 * teacher can see exactly why it was detected.
 */
export function parseCurriculum(rawText) {
  const hay = norm(rawText);
  const found = [];

  for (const [slug, { label, terms }] of Object.entries(TOPIC_LEXICON)) {
    const hits = [];
    let score = 0;
    for (const term of terms) {
      // word-boundary-ish match: term padded with spaces inside the padded haystack
      const needle = ' ' + term.toLowerCase() + ' ';
      let idx = hay.indexOf(needle);
      let count = 0;
      while (idx !== -1) {
        count++;
        idx = hay.indexOf(needle, idx + 1);
      }
      // also catch simple plural/possessive forms
      if (count === 0 && hay.includes(' ' + term.toLowerCase() + 's ')) count = 1;
      if (count > 0) {
        hits.push(term);
        // multi-word terms are far less likely to be coincidental, so weight them up
        score += count * (term.includes(' ') ? 3 : 1);
      }
    }
    if (hits.length) found.push({ slug, label, kind: TOPIC_LEXICON[slug].kind || 'content', score, matchedTerms: hits });
  }

  found.sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));
  return found.slice(0, 10);
}

/**
 * Rank artworks by overlap with the detected focus topics.
 *
 * Weighting uses each topic's own match score rather than its rank position. That
 * distinction matters: a unit that says "World War II" nine times and mentions
 * "analysis" once should not treat those signals as comparable. Every work is
 * returned, including zero-scoring ones, so a teacher can still switch them on.
 */
export function rankArtworks(focusTopics) {
  // Skill topics describe how students should look, not what they should look at,
  // so they inform Rosie's framing but barely move artwork selection.
  const weights = new Map(
    focusTopics.map((t) => [t.slug, t.kind === 'skill' ? t.score * 0.35 : t.score])
  );
  return ARTWORKS
    .map((art) => {
      const matched = art.themes.filter((th) => weights.has(th));
      const score = matched.reduce((s, th) => s + weights.get(th), 0);
      return { artwork: art, score, matchedThemes: matched };
    })
    .sort((a, b) => b.score - a.score || a.artwork.title.localeCompare(b.artwork.title));
}

/**
 * Works a teacher should probably switch on.
 *
 * Threshold is relative to the strongest match rather than absolute, so a tightly
 * focused unit yields a short list and a broad one yields a longer list. Always
 * returns at least `min` works so the class is never left with an empty gallery.
 */
export function suggestArtworkIds(focusTopics, min = 3) {
  const ranked = rankArtworks(focusTopics).filter((r) => r.score > 0);
  if (!ranked.length) return ARTWORKS.slice(0, min).map((a) => a.id);
  const top = ranked[0].score;
  const strong = ranked.filter((r) => r.score >= top * 0.4);
  return (strong.length >= min ? strong : ranked.slice(0, min)).map((r) => r.artwork.id);
}
