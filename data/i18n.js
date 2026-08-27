/* Ask Rosie — interface strings.
 *
 * One table, two languages. English is the source of truth: every key must
 * exist in `en`, and a missing `es` value falls back to the English rather than
 * rendering a key name at a student.
 *
 * Artwork content — titles, blurbs, facts, and all 196 grade-banded talking
 * points — is NOT here. It lives in data/artworks.es.js, because that is the
 * file a translator with an art-history background works in, and this is the
 * file a translator with a UI background works in. They are different jobs.
 */

export const LANGS = ['en', 'es'];

export const LANG_LABELS = { en: 'English', es: 'Español' };

export const UI = {
  en: {
    'skip':                 'Skip to main content',
    'brand.edition':        'Classroom Edition',
    'nav.chat':             'Explore',
    'nav.quiz':             'Quiz',
    'nav.teacher':          'Teacher',
    'nav.history':          'History',
    'role.student':         'Student',
    'a11y.home':            'Ask Rosie home',
    'a11y.main':            'Main',
    'a11y.theme':           'Toggle dark mode',
    'a11y.lang':            'Switch language',
    'a11y.band':            'Grade band',

    'ctx.level':            'Reading level',
    'ctx.unit':             'Class unit',
    'ctx.none':             'None loaded',

    'landing.eyebrow':      'Crystal Bridges Museum of American Art',
    'landing.h1a':          'Hi, I’m Rosie.',
    'landing.h1b':          'Let’s talk about art —',
    'landing.h1em':         'your way',
    'landing.lede':         'The same painting means something different to a second grader and a senior. Tell me who I’m talking to and what your class is studying, and I’ll meet you there.',
    'landing.spec1k':       'Edition',
    'landing.spec1v':       'Classroom',
    'landing.spec2k':       'Reading levels',
    'landing.spec2v':       'Grades 2 through 12',
    'landing.spec3k':       'Input',
    'landing.spec3v':       'Your own unit plan or standards',
    'landing.doors':        'Choose a door',
    'door.teacher.eyebrow': 'For educators',
    'door.teacher.title':   'I’m a teacher',
    'door.teacher.desc':    'Load your unit, set a reading level, choose which works your class explores.',
    'door.student.eyebrow': 'For students',
    'door.student.title':   'I’m a student',
    'door.student.desc':    'Jump straight into the gallery and start asking questions.',
    'landing.note':         'A prototype exploring how a museum companion app could adapt to a classroom. Not affiliated with Crystal Bridges.',

    'signin.title':         'Sign in',
    'signin.teacher':       'Teacher sign-in',
    'signin.student':       'Student sign-in',
    'signin.subTeacher':    'Set up your class, then share the code with students.',
    'signin.subStudent':    'Enter the code your teacher gave you to load their unit.',
    'signin.name':          'Your name',
    'signin.namePhTeacher': 'e.g. Ms. Alvarez',
    'signin.namePhStudent': 'e.g. Maya R.',
    'signin.code':          'Class code',
    'signin.hint1':         'Try',
    'signin.hint2':         'to load a sample WWII unit.',
    'signin.continue':      'Continue',
    'signin.back':          'Back',
    'signin.disclaimer':    'This is a demo. Your name and settings are stored only in this browser — there is no server and no real account.',
    'signin.signout':       'Sign out? Your chats stay in this browser.',
    'signin.signedInAs':    'Signed in as',

    'level.eyebrow':        'Before we start',
    'level.title':          'How should Rosie talk to you?',
    'level.lede':           'Every answer is written from scratch for the level you pick. Choose the one that fits your class — you can change it later from the gallery.',
    'level.sample':         'This is how Rosie would answer',
    'level.enter':          'Enter the gallery',
    'level.back':           'Back',

    'chat.gallery':         'Gallery',
    'chat.leave':           'Leave the gallery',
    'chat.choose':          'Choose a work',
    'chat.change':          'Change',
    'chat.works':           'works',
    'chat.noUnit':          'no unit loaded',
    'chat.chosenFor':       'works chosen for',
    'chat.askLabel':        'Ask Rosie a question',
    'chat.askPh':           'Ask Rosie about this painting…',
    'chat.ask':             'Ask',
    'chat.quizThis':        'Quiz me on this work',
    'chat.newChat':         'Start a new conversation',
    'chat.a11yThread':      'Conversation with Rosie',
    'chat.a11ySuggest':     'Suggested questions',
    'chat.a11yWorks':       'Artworks in this class',
    'chat.emptyA':          'Ask Rosie anything about',
    'chat.emptyB':          '— or tap one of the questions below.',
    'chat.linked':          'linked to your unit',
    'chat.source':          'Collection of the',
    'chat.sourceTail':      'Image served from the museum’s collection site.',

    'teacher.s1':           'Load your curriculum',
    'teacher.s1sub':        'Paste a unit plan or standards. Rosie scans it for focus topics and suggests which works fit.',
    'teacher.paste':        'Or paste your own unit',
    'teacher.unitTitle':    'Unit title',
    'teacher.unitTitlePh':  'Unit title (e.g. Unit 4: The Home Front)',
    'teacher.unitText':     'Curriculum text',
    'teacher.unitTextPh':   'Paste your unit description, essential questions, vocabulary, or standards here…',
    'teacher.analyze':      'Analyze unit',
    'teacher.upload':       'Upload a .txt file',
    'teacher.a11yUpload':   'Upload a curriculum text file',
    'teacher.detected':     'Detected focus topics',
    'teacher.detectedSub':  'Rosie will steer answers toward these. Remove any that don’t fit — this is keyword matching, not comprehension.',
    'teacher.clearUnit':    'Clear this unit',
    'teacher.noTopics':     'No topics detected in that text.',
    'teacher.s2':           'Set the reading level',
    'teacher.s2sub':        'Every answer Rosie gives is rewritten for this band.',
    'teacher.sample':       'Sample answer',
    'teacher.s3':           'Choose which works your class explores',
    'teacher.s3sub':        'All works are available. Load a unit above and Rosie will suggest a focused set.',
    'teacher.scoped':       'Rosie will suggest the works that match your unit.',
    'teacher.suggested':    'suggested',
    'teacher.activity':     'Class activity',
    'teacher.activitySub':  'Quiz results and conversations from this class.',
    'teacher.noActivity':   'No class activity yet.',
    'teacher.asked':        'Asked about',

    'quiz.pick':            'Pick a work to be quizzed on',
    'quiz.writtenFor':      'Questions are written for',
    'quiz.question':        'Question',
    'quiz.of':              'of',
    'quiz.next':            'Next question',
    'quiz.finish':          'See results',
    'quiz.submit':          'Submit answer',
    'quiz.back':            'Back to Rosie',
    'quiz.yourAnswer':      'Your answer',
    'quiz.discuss':         'Discuss this with Rosie',
    'quiz.again':           'Try another work',
    'quiz.notGraded':       'Open questions aren’t auto-graded — compare your answer and decide for yourself.',

    'hist.chats':           'Your conversations',
    'hist.chatsSub':        'Saved in this browser only. Signing in is what makes them persist across sessions.',
    'hist.quizzes':         'Your quiz results',
    'hist.resume':          'Resume',
    'hist.a11yDelete':      'Delete conversation',
    'hist.noChats':         'No conversations yet. Head to Explore and ask Rosie something.',
    'hist.noQuizzes':       'No quizzes taken yet.',
    'hist.messages':        'messages',
    'hist.reset':           'Reset demo',
    'hist.resetSub':        'Clears everything stored in this browser and returns to the start.',
    'hist.resetBtn':        'Reset all demo data',
    'hist.resetConfirm':    'Clear all demo data stored in this browser?',
    'hist.ago':             'ago',
    'hist.today':           'today',
    'hist.yesterday':       'yesterday',
    'hist.days':            'days',
  },

  es: {
    'skip':                 'Saltar al contenido principal',
    'brand.edition':        'Edición para el aula',
    'nav.chat':             'Explorar',
    'nav.quiz':             'Examen',
    'nav.teacher':          'Docente',
    'nav.history':          'Historial',
    'role.student':         'Estudiante',
    'a11y.home':            'Inicio de Ask Rosie',
    'a11y.main':            'Principal',
    'a11y.theme':           'Cambiar a modo oscuro',
    'a11y.lang':            'Cambiar de idioma',
    'a11y.band':            'Nivel de grado',

    'ctx.level':            'Nivel de lectura',
    'ctx.unit':             'Unidad de clase',
    'ctx.none':             'Ninguna cargada',

    'landing.eyebrow':      'Crystal Bridges Museum of American Art',
    'landing.h1a':          'Hola, soy Rosie.',
    'landing.h1b':          'Hablemos de arte —',
    'landing.h1em':         'a tu manera',
    'landing.lede':         'El mismo cuadro significa algo distinto para alguien de segundo grado y para alguien de último año. Dime con quién estoy hablando y qué está estudiando tu clase, y me acercaré a ti.',
    'landing.spec1k':       'Edición',
    'landing.spec1v':       'Aula',
    'landing.spec2k':       'Niveles de lectura',
    'landing.spec2v':       'De 2.º a 12.º grado',
    'landing.spec3k':       'Entrada',
    'landing.spec3v':       'Tu propio plan de unidad o estándares',
    'landing.doors':        'Elige una puerta',
    'door.teacher.eyebrow': 'Para docentes',
    'door.teacher.title':   'Soy docente',
    'door.teacher.desc':    'Carga tu unidad, elige un nivel de lectura y decide qué obras explora tu clase.',
    'door.student.eyebrow': 'Para estudiantes',
    'door.student.title':   'Soy estudiante',
    'door.student.desc':    'Entra directo a la galería y empieza a hacer preguntas.',
    'landing.note':         'Un prototipo que explora cómo una aplicación de museo podría adaptarse a un aula. No está afiliado a Crystal Bridges.',

    'signin.title':         'Iniciar sesión',
    'signin.teacher':       'Acceso para docentes',
    'signin.student':       'Acceso para estudiantes',
    'signin.subTeacher':    'Configura tu clase y luego comparte el código con tus estudiantes.',
    'signin.subStudent':    'Escribe el código que te dio tu docente para cargar su unidad.',
    'signin.name':          'Tu nombre',
    'signin.namePhTeacher': 'p. ej. Sra. Álvarez',
    'signin.namePhStudent': 'p. ej. Maya R.',
    'signin.code':          'Código de clase',
    'signin.hint1':         'Prueba con',
    'signin.hint2':         'para cargar una unidad de ejemplo sobre la Segunda Guerra Mundial.',
    'signin.continue':      'Continuar',
    'signin.back':          'Atrás',
    'signin.disclaimer':    'Esto es una demostración. Tu nombre y tus ajustes se guardan solo en este navegador: no hay servidor ni cuenta real.',
    'signin.signout':       '¿Cerrar sesión? Tus conversaciones seguirán en este navegador.',
    'signin.signedInAs':    'Sesión iniciada como',

    'level.eyebrow':        'Antes de empezar',
    'level.title':          '¿Cómo debería hablarte Rosie?',
    'level.lede':           'Cada respuesta se escribe desde cero para el nivel que elijas. Escoge el que corresponda a tu clase; puedes cambiarlo después desde la galería.',
    'level.sample':         'Así respondería Rosie',
    'level.enter':          'Entrar a la galería',
    'level.back':           'Atrás',

    'chat.gallery':         'Galería',
    'chat.leave':           'Salir de la galería',
    'chat.choose':          'Elige una obra',
    'chat.change':          'Cambiar',
    'chat.works':           'obras',
    'chat.noUnit':          'sin unidad cargada',
    'chat.chosenFor':       'obras elegidas para',
    'chat.askLabel':        'Hazle una pregunta a Rosie',
    'chat.askPh':           'Pregúntale a Rosie sobre este cuadro…',
    'chat.ask':             'Preguntar',
    'chat.quizThis':        'Examíname sobre esta obra',
    'chat.newChat':         'Empezar otra conversación',
    'chat.a11yThread':      'Conversación con Rosie',
    'chat.a11ySuggest':     'Preguntas sugeridas',
    'chat.a11yWorks':       'Obras de esta clase',
    'chat.emptyA':          'Pregúntale a Rosie lo que quieras sobre',
    'chat.emptyB':          '— o toca una de las preguntas de abajo.',
    'chat.linked':          'conectado con tu unidad',
    'chat.source':          'Colección del',
    'chat.sourceTail':      'Imagen servida desde el sitio de la colección del museo.',

    'teacher.s1':           'Carga tu currículo',
    'teacher.s1sub':        'Pega un plan de unidad o unos estándares. Rosie los revisa en busca de temas centrales y sugiere qué obras encajan.',
    'teacher.paste':        'O pega tu propia unidad',
    'teacher.unitTitle':    'Título de la unidad',
    'teacher.unitTitlePh':  'Título de la unidad (p. ej. Unidad 4: El frente interno)',
    'teacher.unitText':     'Texto del currículo',
    'teacher.unitTextPh':   'Pega aquí la descripción de tu unidad, las preguntas esenciales, el vocabulario o los estándares…',
    'teacher.analyze':      'Analizar unidad',
    'teacher.upload':       'Subir un archivo .txt',
    'teacher.a11yUpload':   'Subir un archivo de texto con el currículo',
    'teacher.detected':     'Temas centrales detectados',
    'teacher.detectedSub':  'Rosie orientará sus respuestas hacia estos temas. Quita los que no encajen: esto es coincidencia de palabras clave, no comprensión.',
    'teacher.clearUnit':    'Borrar esta unidad',
    'teacher.noTopics':     'No se detectaron temas en ese texto.',
    'teacher.s2':           'Elige el nivel de lectura',
    'teacher.s2sub':        'Cada respuesta de Rosie se reescribe para este nivel.',
    'teacher.sample':       'Respuesta de ejemplo',
    'teacher.s3':           'Elige qué obras explora tu clase',
    'teacher.s3sub':        'Todas las obras están disponibles. Carga una unidad arriba y Rosie sugerirá un conjunto más enfocado.',
    'teacher.scoped':       'Rosie sugerirá las obras que coinciden con tu unidad.',
    'teacher.suggested':    'sugerida',
    'teacher.activity':     'Actividad de la clase',
    'teacher.activitySub':  'Resultados de exámenes y conversaciones de esta clase.',
    'teacher.noActivity':   'Todavía no hay actividad en la clase.',
    'teacher.asked':        'Preguntó sobre',

    'quiz.pick':            'Elige una obra para el examen',
    'quiz.writtenFor':      'Las preguntas están escritas para',
    'quiz.question':        'Pregunta',
    'quiz.of':              'de',
    'quiz.next':            'Siguiente pregunta',
    'quiz.finish':          'Ver resultados',
    'quiz.submit':          'Enviar respuesta',
    'quiz.back':            'Volver con Rosie',
    'quiz.yourAnswer':      'Tu respuesta',
    'quiz.discuss':         'Comentar esto con Rosie',
    'quiz.again':           'Probar con otra obra',
    'quiz.notGraded':       'Las preguntas abiertas no se califican automáticamente: compara tu respuesta y decide por ti mismo.',

    'hist.chats':           'Tus conversaciones',
    'hist.chatsSub':        'Se guardan solo en este navegador. Iniciar sesión es lo que hace que se conserven entre sesiones.',
    'hist.quizzes':         'Tus resultados de exámenes',
    'hist.resume':          'Reanudar',
    'hist.a11yDelete':      'Eliminar conversación',
    'hist.noChats':         'Todavía no hay conversaciones. Ve a Explorar y pregúntale algo a Rosie.',
    'hist.noQuizzes':       'Todavía no has hecho ningún examen.',
    'hist.messages':        'mensajes',
    'hist.reset':           'Reiniciar la demostración',
    'hist.resetSub':        'Borra todo lo guardado en este navegador y vuelve al inicio.',
    'hist.resetBtn':        'Borrar todos los datos de la demostración',
    'hist.resetConfirm':    '¿Borrar todos los datos de la demostración guardados en este navegador?',
    'hist.ago':             'atrás',
    'hist.today':           'hoy',
    'hist.yesterday':       'ayer',
    'hist.days':            'días',
  },
};

/* Grade band labels read differently in Spanish — "K-2" is not a Spanish
   convention, so the bands are named by their grade numbers. */
export const BAND_LABELS = {
  en: { 'K-2': 'Grades K–2', '3-5': 'Grades 3–5', '6-8': 'Grades 6–8', '9-12': 'Grades 9–12' },
  es: { 'K-2': 'Grados K–2', '3-5': 'Grados 3.º–5.º', '6-8': 'Grados 6.º–8.º', '9-12': 'Grados 9.º–12.º' },
};

/* ── Rosie's glue ────────────────────────────────────────────────────────
   The connective tissue around a talking point: how she opens, how she hands
   the turn back, and how she ties an answer to the teacher's unit. */
export const ROSIE = {
  en: null,   // rosie.js carries the English inline; null means "use the source"
  es: {
    openers: {
      'K-2':  ['¡Uy, qué buena pregunta!', 'Me encanta que te fijaras en eso.', '¡Qué buen ojo!', 'Miremos juntos.'],
      '3-5':  ['Buena pregunta: miremos de cerca.', 'Eso vale la pena notarlo.', 'Buena observación.', 'Esto es lo que veo yo.'],
      '6-8':  ['Buena pregunta.', 'Vamos a profundizar en eso.', 'Eso es justo lo que hay que preguntarse.', 'Esto es lo que está pasando.'],
      '9-12': ['Vale la pena desmenuzarlo.', 'Buena pregunta: aquí hay mucho.', 'Tomémoslo en serio.', 'Eso apunta a algo real.'],
    },
    closers: {
      'K-2':  ['¿Qué más notas?', '¿Tú qué piensas?', '¿Quieres mirar otra parte?'],
      '3-5':  ['¿Qué más te llama la atención?', '¿Coincide con lo que esperabas?', '¿Qué preguntarías ahora?'],
      '6-8':  ['¿Cómo lo interpretas tú?', '¿Eso cambia cómo ves el cuadro?', '¿De qué querrías tener pruebas?'],
      '9-12': ['¿Dónde discreparías con eso?', '¿Qué complicaría esta lectura?', '¿Qué evidencia lo resolvería?'],
    },
    bridges: {
      'K-2':  (l) => `Tu clase está aprendiendo sobre ${l}. ¡Este cuadro es un gran lugar para verlo!`,
      '3-5':  (l) => `Esto se conecta con lo que estudia tu clase: ${l}.`,
      '6-8':  (l) => `Vale la pena conectarlo con tu unidad: este es un ejemplo directo de ${l}.`,
      '9-12': (l) => `Esto incide directamente en el enfoque de tu unidad sobre ${l}, y funcionaría bien como evidencia en esa discusión.`,
    },
    greeting: {
      'K-2':  '¡Hola! Soy Rosie. ¿Qué quieres mirar?',
      '3-5':  '¡Hola! Soy Rosie. Pregúntame lo que quieras sobre esta obra.',
      '6-8':  'Hola, soy Rosie. ¿Por dónde quieres empezar con esta obra?',
      '9-12': 'Hola, soy Rosie. Pregunta lo que quieras: contexto, técnica, significado, lo que sea.',
    },
    thanks: ['¡Cuando quieras!', 'Con gusto.', 'Para eso estoy aquí.'],
    metaA:  'Soy Rosie, y puedo hablar de todo lo que hay en',
    metaB:  'qué aparece, quién la hizo, qué estaba pasando en esa época, cómo se pintó y qué puede significar. Podrías probar con',
    fallbackA: 'No estoy segura de haber entendido eso, pero puedo hablar de',
    fallbackB: 'Prueba con',
  },
};

/* Focus-topic labels, keyed by the slug in data/curriculum.js. Looked up at
   render time rather than baked into a parsed curriculum, so switching language
   re-labels a unit that was analysed in the other one. */
export const TOPIC_LABELS = {
  es: {
    'wwii': 'Segunda Guerra Mundial',
    'labor': 'Trabajo y oficios',
    'gender-roles': 'Roles de género',
    'propaganda': 'Propaganda y persuasión',
    'symbolism': 'Simbolismo',
    'industrialization': 'Industrialización',
    'landscape': 'Paisaje',
    'nature': 'Naturaleza y medioambiente',
    'romanticism': 'Romanticismo',
    'hudson-river-school': 'Escuela del Río Hudson',
    'westward-expansion': 'Expansión hacia el Oeste',
    'early-republic': 'Primera República',
    'american-revolution': 'Revolución estadounidense',
    'government': 'Gobierno y civismo',
    'power': 'Poder y autoridad',
    'portraiture': 'Retrato',
    'modernism': 'Modernismo',
    'abstraction': 'Abstracción',
    'impressionism': 'Impresionismo',
    'realism': 'Realismo',
    'ashcan-school': 'Escuela Ashcan',
    'urban-life': 'Vida urbana',
    'women': 'Mujeres en la historia',
    'literacy': 'Alfabetización y lectura',
    'domestic-life': 'Vida doméstica',
    'science': 'Ciencia y medicina',
    'education': 'Educación',
    'friendship': 'Amistad',
    'imagination': 'Imaginación',
    'illustration': 'Ilustración',
    'color-theory': 'Teoría del color',
    'light': 'Luz y sombra',
    'scale': 'Escala y proporción',
    'observation': 'Observación detenida',
  },
};

/* Preset unit plans in Spanish, keyed by the id in data/curriculum.js.
   The body text is translated too, not just the label: it is what the parser
   actually reads, and TOPIC_LEXICON now carries Spanish terms alongside the
   English ones, so a Spanish unit detects the same focus topics. */
export const UNITS = {
  es: {
    'wwii-home-front': {
      title: 'El frente interno en la Segunda Guerra Mundial',
      subtitle: 'Trabajo, propaganda y roles cambiantes, 1941-1945',
      text: `Unidad 4: El frente interno estadounidense en la Segunda Guerra Mundial

Pregunta esencial: ¿cómo transformó la guerra total la vida diaria y el trabajo en Estados Unidos?

Los estudiantes examinarán cómo el esfuerzo de guerra movilizó a la población civil, con atención
particular a las mujeres que entraron al trabajo industrial en fábricas y astilleros. Analizaremos
los carteles de propaganda y las imágenes de revistas de la guerra como textos persuasivos,
preguntándonos quién los produjo, para qué público y con qué fin. Los estudiantes evaluarán cómo
cambiaron los roles de género durante la guerra y qué ocurrió después con esos cambios.

Vocabulario clave: frente interno, racionamiento, esfuerzo de guerra, propaganda, movilización, remachadora.
Destrezas: analizar fuentes primarias visuales buscando sesgo e intención; usar símbolos como evidencia.`,
    },
    'symbolism-portraiture': {
      title: 'Leer símbolos en el retrato estadounidense',
      subtitle: 'Cómo las imágenes argumentan sobre el poder y la identidad',
      text: `Unidad 2: Simbolismo, poder y el retrato estadounidense

Pregunta esencial: ¿cómo construyen los retratos argumentos sobre la autoridad y la identidad?

Los estudiantes estudiarán el retrato desde la primera república hasta la era moderna, tratando el
simbolismo y la iconografía como evidencia. Examinaremos cómo la ropa, los objetos, el entorno y la
pose comunican afirmaciones sobre el poder, y cómo la ausencia deliberada de los símbolos
tradicionales puede ser en sí misma una estrategia retórica. Conexiones con gobierno y civismo: cómo
una república nueva construyó un lenguaje visual de liderazgo distinto del de la monarquía.

Destrezas: análisis iconográfico, uso de fuentes, evaluación de interpretaciones en competencia sobre una misma imagen.`,
    },
    'land-and-light': {
      title: 'Tierra, luz y el paisaje estadounidense',
      subtitle: 'Naturaleza, romanticismo y el siglo XIX',
      text: `Unidad 1: Mirar la tierra estadounidense

Idea central: los artistas nos muestran lo que sienten por la naturaleza según cómo la pintan.

Los estudiantes mirarán con atención cuadros de paisaje y describirán lo que ven. Hablaremos de cómo
los artistas usan la luz y el color para que un lugar se sienta tranquilo, emocionante o temible. Los
estudiantes aprenderán cómo los pintores hacen que las cosas se vean lejos, y compararán una escena
apacible de naturaleza con una obra en construcción ajetreada en una ciudad.

Vocabulario: paisaje, primer plano, fondo, escala, luz, sombra.
Destrezas: observación detenida, describir evidencia, comparar dos obras de arte.`,
    },
    'industry-and-labor': {
      title: 'Industria, trabajo y la ciudad cambiante',
      subtitle: 'Trabajo y crecimiento urbano, 1870-1945',
      text: `Unidad 6: La industrialización y el trabajador estadounidense

Pregunta esencial: ¿qué les costó el crecimiento industrial acelerado a las personas que lo construyeron?

Los estudiantes investigarán la construcción urbana, el trabajo en las fábricas y las condiciones de
vida laboral durante un periodo de industrialización e inmigración intensas. Analizaremos cómo los
artistas eligieron representar a los obreros —como individuos o como figuras anónimas— y qué
argumentan esas decisiones. Conexiones con civismo: organización sindical, salarios y seguridad laboral.

Destrezas: analizar las decisiones artísticas como argumentos; comparar representaciones del trabajo entre épocas.`,
    },
  },
};
