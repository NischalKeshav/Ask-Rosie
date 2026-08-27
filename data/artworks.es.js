/* Ask Rosie — contenido de las obras en español.
 *
 * Mirrors the shape of ARTWORKS in data/artworks.js, keyed by the same ids.
 * Only the language-bearing fields appear here: `palette`, `motif`, `themes`,
 * `mediaId` and `year` are language-neutral and stay in the English file.
 *
 * The grade-band voice guide is the same one artworks.js documents, held in
 * Spanish rather than translated literally:
 *
 *   K-2   frases cortas, sustantivos concretos, una idea, termina preguntándose en voz alta
 *   3-5   añade contexto, estira el vocabulario un poco, invita a comparar
 *   6-8   causa y efecto, nombra los términos y los define sobre la marcha
 *   9-12  análisis, cita evidencia, reconoce que hay interpretaciones en disputa
 *
 * A missing work here falls back to English rather than breaking — see
 * localizeArt() in js/i18n.js.
 */

export const ART_ES = {

  /* ── Rosie the Riveter ─────────────────────────────────────────────── */
  rosie: {
    title: 'Rosie la Remachadora',
    medium: 'Óleo sobre lienzo',
    blurb: 'Una soldadora almuerza en su descanso, con la pistola remachadora sobre el regazo y la bota apoyada sobre un ejemplar de Mein Kampf.',
    facts: [
      'Publicada en la portada de The Saturday Evening Post el 29 de mayo de 1943, el fin de semana del Memorial Day.',
      'Rockwell tomó prestada la pose del Profeta Isaías de Miguel Ángel, en el techo de la Capilla Sixtina.',
      'Su lonchera lleva estarcido el nombre «Rosie».',
      'El libro bajo su bota es Mein Kampf, de Adolf Hitler.',
      'Lleva un botón de donante de sangre de la Cruz Roja, un prendedor de «V de Victoria», uno de las Blue Star Mothers y un premio de producción Army-Navy E.',
      'Vendida en Sotheby’s en 2002 por casi 5 millones de dólares. Crystal Bridges la registró en 2007 (2007.178) y anunció la adquisición públicamente en junio de 2009.',
    ],
    suggestions: [
      { q: '¿Qué está pisando?', topic: 'symbolism' },
      { q: '¿Por qué se ve tan fuerte?', topic: 'technique' },
      { q: '¿Qué estaba pasando cuando se pintó esto?', topic: 'context' },
      { q: '¿Quién pintó esto?', topic: 'artist' },
      { q: '¿Qué son todos los prendedores de su overol?', topic: 'subject' },
      { q: '¿Cómo se supone que te haga sentir?', topic: 'feeling' },
    ],
    topics: {
      subject: {
        'K-2': 'Una mujer fuerte se sentó a comer su almuerzo. Tiene una herramienta grande sobre el regazo que se llama pistola remachadora. La usó toda la mañana para ayudar a construir aviones. Su cara se ve orgullosa y un poco cansada. ¿Qué crees que tenía su sándwich?',
        '3-5': 'Es una mujer que está tomando su descanso en la fábrica. La herramienta pesada que tiene sobre el regazo es una pistola remachadora: los remachadores la usaban para atravesar las piezas de los aviones con sujetadores de metal. Está comiendo un sándwich, con las gafas de protección subidas sobre la frente, y se ve completamente segura de sí misma.',
        '6-8': 'Rockwell pinta a una soldadora a mitad de su descanso. Casi cada objeto está trabajando: la pistola remachadora sobre el regazo identifica su oficio, las gafas en la frente indican que acaba de parar, y cada insignia prendida en su overol registra un acto distinto de servicio durante la guerra: donación de sangre, apoyo a los bonos de guerra, un hijo en el ejército.',
        '9-12': 'La composición es un retrato del trabajo presentado en el lenguaje visual del monumento. Rockwell representa a una obrera industrial con la escala, la frontalidad y el punto de vista bajo que se reservaban convencionalmente a los héroes masculinos. Los atributos acumulados —pistola remachadora, gafas, insignias de servicio, lonchera— funcionan menos como detalle realista que como un programa iconográfico: cada objeto afirma una contribución distinta al esfuerzo de guerra.',
      },
      artist: {
        'K-2': 'Norman Rockwell era un artista al que le encantaba pintar personas que contaban historias. Sus dibujos salían en la portada de una revista, así que muchísimas familias los veían. Le gustaba esconder detalles graciosos para que tú los encontraras.',
        '3-5': 'Norman Rockwell fue probablemente el ilustrador más famoso de Estados Unidos en su época. Pintaba portadas para The Saturday Evening Post, una revista que llegaba cada semana a millones de hogares. Era conocido por llenar sus cuadros de pequeños detalles que premian mirar con calma.',
        '6-8': 'Rockwell fue el ilustrador popular más conocido de Estados Unidos. Trabajar para The Saturday Evening Post le daba un público de millones, un alcance más parecido al de la televisión que al de un museo. Ese contexto comercial importa: hacía imágenes pensadas para entenderse al instante por un público enorme y general, y eso moldeó lo directa y legible que tenía que ser su manera de narrar.',
        '9-12': 'Rockwell ocupó una posición en disputa: dominante en lo comercial y despachado por la crítica durante buena parte de su carrera como sentimental antes que como pintor serio. La reevaluación se ha centrado justamente en obras como esta, donde su fluidez con la convención visual de masas se convierte en una herramienta para defender una posición social. La pregunta que vale la pena sostener: ¿la accesibilidad de su lenguaje limita la complejidad de la obra, o es precisamente la fuente de su fuerza persuasiva?',
      },
      context: {
        'K-2': 'Esto se pintó hace mucho tiempo, durante una guerra muy grande. Muchos hombres se fueron lejos a pelear. Las mujeres entraron a trabajar construyendo aviones y barcos. Este cuadro les da las gracias.',
        '3-5': 'Rockwell pintó esto en 1943, en plena Segunda Guerra Mundial. Con millones de hombres sirviendo en el extranjero, las fábricas estadounidenses necesitaban trabajadores, y las mujeres tomaron empleos que casi siempre habían sido de hombres: soldar, remachar, construir bombarderos. Este cuadro salió el fin de semana del Memorial Day.',
        '6-8': 'En 1943 Estados Unidos llevaba dos años en la Segunda Guerra Mundial y enfrentaba una escasez grave de mano de obra. Alrededor de seis millones de mujeres entraron al trabajo remunerado durante la guerra, muchas en la industria pesada. El gobierno las reclutaba activamente con carteles, películas e imágenes de revistas. La portada de Rockwell apareció el 29 de mayo de 1943 y se convirtió en una de las imágenes más difundidas de esa campaña.',
        '9-12': 'El cuadro se inscribe en un aparato coordinado de propaganda bélica: la Oficina de Información de Guerra, la publicidad corporativa y la prensa popular trabajando en conjunto para normalizar el trabajo industrial femenino como una necesidad patriótica temporal. Ese encuadre traía una fecha de caducidad incorporada, y la desmovilización de posguerra expulsó a gran número de esas trabajadoras del empleo industrial. Leer la imagen históricamente exige sostener ambos hechos: amplió genuinamente el vocabulario visual de lo que se podía mostrar haciendo a una mujer, y lo hizo dentro de una retórica de emergencia que daba por supuesto el regreso al orden anterior.',
      },
      symbolism: {
        'K-2': 'Mira debajo de su bota. Ahí abajo hay un libro, ¡y ella lo está pisando! Ese libro era del líder contra el que estaban peleando. Pisarlo quiere decir que no le tiene miedo.',
        '3-5': 'El libro aplastado bajo su zapato es Mein Kampf, escrito por Adolf Hitler. Rockwell lo puso ahí a propósito: ella está pisando literalmente las ideas del enemigo. Detrás de su cabeza, la bandera estadounidense ondea como un resplandor. Cada prendedor de su overol representa algo que ella ha hecho para ayudar.',
        '6-8': 'El simbolismo es deliberado y está apilado en capas. Mein Kampf bajo su bota convierte su descanso en un acto de desafío. La bandera detrás de su cabeza está colocada como un halo, y toma prestada la gramática visual de la pintura religiosa para volver sagrado su servicio. Su pose viene del Profeta Isaías de Miguel Ángel: Rockwell cita la Capilla Sixtina para darle a una obrera de fábrica la autoridad de un profeta.',
        '9-12': 'Hay tres sistemas simbólicos superpuestos. Primero, lo profano: Mein Kampf pisoteado, un gesto de desprecio físico. Segundo, lo sagrado: la bandera dispuesta como halo, importando la convención hagiográfica. Tercero, lo clásico: la pose prestada de Isaías, que le concede la monumentalidad de la profecía del Alto Renacimiento mientras masculiniza discretamente sus proporciones. La tensión del cuadro nace de que Rockwell le pide a una sola figura ser al mismo tiempo una trabajadora común en su hora de almuerzo y un ícono nacional, y las costuras de esa doble exigencia se ven en lo poco que el cuerpo se parece al rostro.',
      },
      technique: {
        'K-2': 'El artista usó pintura gruesa para que sus brazos se vean fuertes y redondos. Usó rojo, azul y dorado, los mismos colores de la bandera. Su cara está clara, como si le brillara una luz encima.',
        '3-5': 'Rockwell construyó la figura con colores cálidos y sólidos: el overol azul mezclilla contra una bandera roja y dorada. La ilumina de frente, así que la cara y los brazos atrapan la luz y el fondo queda suave. La pintura en sus manos y antebrazos es espesa y texturada, y eso hace que se vean poderosos.',
        '6-8': 'Rockwell exagera la escala para dejar clara su idea: los antebrazos, las manos y los hombros están pintados mucho más grandes que la cabeza, de modo que el cuerpo se lee como monumental mientras el rostro sigue siendo cercano y específico. La iluminación frontal aplana la bandera y la convierte en un telón cálido que empuja la figura hacia adelante. La paleta se restringe a rojo, azul y dorado: los colores de la bandera cumpliendo también la función de esquema compositivo.',
        '9-12': 'La estrategia formal es una incoherencia controlada. La cabeza está pintada del natural con fidelidad de retrato, mientras que la musculatura es inventada e inflada hasta una proporción miguelangelesca. Ese desajuste no es un fallo, sino el mecanismo por el cual la imagen funciona a la vez como semejanza individual y como símbolo colectivo. La iluminación frontal, casi sin sombras, y la compresión de la bandera en un campo cromático plano son decisiones ilustrativas antes que naturalistas, calibradas para leerse a la distancia de un quiosco y en el tamaño de una portada de revista.',
      },
      feeling: {
        'K-2': 'Se ve orgullosa. Se ve como alguien que sabe que hace bien su trabajo. ¿Hay algo que a ti se te dé muy bien?',
        '3-5': 'La mayoría de la gente dice que se ve segura: relajada pero completamente convencida. Rockwell quería que quien la mirara sintiera admiración, no lástima. ¿Qué te dice su expresión sobre cómo se siente con su trabajo?',
        '6-8': 'El cuadro está diseñado para producir admiración, y vale la pena notar ese diseño en lugar de solo aceptar la emoción. Su postura relajada y su mirada firme comunican competencia; la escala monumental comunica importancia. ¿La lees como una persona real o como un símbolo? ¿Puede ser las dos cosas a la vez?',
        '9-12': 'La respuesta afectiva que la imagen solicita —orgullo, tranquilidad, una especie de reverencia laica— es un resultado diseñado, y merece ser interrogado. El cuadro le pide a su público de 1943 que se sienta en paz con un cambio social genuinamente desestabilizador. Considera lo que esa tranquilidad cuesta en exactitud: el ícono seguro deja poco espacio al agotamiento, la discriminación y la precariedad que caracterizaron buena parte del trabajo industrial femenino real durante la guerra.',
      },
    },
  },

  /* ── Kindred Spirits ───────────────────────────────────────────────── */
  kindred: {
    title: 'Almas gemelas',
    medium: 'Óleo sobre lienzo',
    blurb: 'Dos amigos están de pie sobre una cornisa rocosa, sobre un desfiladero de los Catskill, empequeñecidos por los árboles y el agua que cae.',
    facts: [
      'Pintado en 1849; óleo sobre lienzo, 116,8 × 91,4 cm.',
      'Las dos figuras son el pintor Thomas Cole y el poeta William Cullen Bryant.',
      'Encargado por el coleccionista Jonathan Sturges como regalo para Bryant tras la muerte de Cole en febrero de 1848.',
      'Sturges le pidió a Durand que «asociara a nuestro amigo fallecido y a usted mismo como almas gemelas».',
      'El escenario combina el desfiladero de Kaaterskill con una vista de las cataratas de Kaaterskill: dos lugares reales fundidos en una escena inventada.',
      'Vendido en subasta en 2005 a Alice Walton por 35 millones de dólares, entonces un récord para una pintura estadounidense.',
    ],
    suggestions: [
      { q: '¿Quiénes son los dos hombres?', topic: 'subject' },
      { q: '¿Por qué las personas son tan pequeñas?', topic: 'symbolism' },
      { q: '¿Por qué se hizo este cuadro?', topic: 'context' },
      { q: '¿Es un lugar real?', topic: 'technique' },
      { q: '¿Cómo hizo el artista que las cosas se vean lejanas?', topic: 'technique' },
      { q: '¿Qué se siente al ver este cuadro?', topic: 'feeling' },
    ],
    topics: {
      subject: {
        'K-2': 'Dos amigos están parados sobre una roca grande, muy alto sobre un arroyo. Alrededor crecen árboles altísimos. Uno de los amigos señala algo. ¿Puedes encontrar la cascada?',
        '3-5': 'Dos hombres están juntos sobre una cornisa rocosa en las montañas, muy por encima de un arroyo que corre rápido. Uno señala hacia el paisaje. Árboles enormes los enmarcan por los dos lados, y a lo lejos se alcanza a ver una cascada que cae por las rocas.',
        '6-8': 'Dos figuras ocupan un saliente rocoso sobre un desfiladero boscoso. Son el pintor Thomas Cole y el poeta William Cullen Bryant, y Durand los ha hecho deliberadamente pequeños: los árboles, los acantilados y el agua que cae los rodean y los desbordan. La vista viaja desde las figuras hacia el fondo del desfiladero, hasta una cascada lejana y un resplandor de luz más allá.',
        '9-12': 'Durand construye una cornisa a modo de escenario sobre la cual dos figuras identificables actúan como espectadores sustitutos que median nuestro acceso al paisaje. Los árboles que enmarcan funcionan como repoussoir, el desfiladero retrocede a través de capas atmosféricas cuidadosamente graduadas y la composición se resuelve en una lejanía luminosa. La escala diminuta de las figuras es el argumento: la presencia humana se admite en este paisaje como contemplación, no como dominio.',
      },
      artist: {
        'K-2': 'A Asher Durand le encantaban los árboles. Salía a dibujar árboles de verdad durante horas para poder pintarlos exactamente bien.',
        '3-5': 'Asher B. Durand fue uno de los principales pintores de paisaje de su tiempo en Estados Unidos. Creía que los artistas debían estudiar la naturaleza directamente, y pasaba largas temporadas al aire libre haciendo dibujos detallados de árboles y rocas concretos antes de pintarlos.',
        '6-8': 'Durand fue una figura central de la Escuela del Río Hudson, el primer movimiento paisajístico estadounidense claramente identificable. Argumentó por escrito que los pintores jóvenes debían estudiar la naturaleza de primera mano en vez de copiar a los maestros europeos, una posición con matices nacionalistas evidentes sobre una América que desarrollaba su propia tradición artística a partir de su propia tierra.',
        '9-12': 'Las «Cartas sobre la pintura de paisaje» de Durand articularon un programa de estudio directo de la naturaleza que situaba a la pintura paisajística estadounidense como un proyecto a la vez espiritual y nacionalista. Su precisión botánica no es observación neutral: sostiene la afirmación de que la naturaleza salvaje americana es un tema legítimo y distintivamente nacional, a la altura de las ambiciones que antes satisfacía la pintura de historia europea.',
      },
      context: {
        'K-2': 'Este cuadro fue un regalo. Un señor quiso darle a su amigo algo para recordar a alguien que los dos querían y que se había muerto.',
        '3-5': 'El pintor Thomas Cole murió de repente en 1848. Su amigo William Cullen Bryant, que era poeta, dio un discurso en su honor. Un coleccionista llamado Jonathan Sturges se conmovió tanto que le pidió a Durand que pintara juntos a los dos amigos, y le regaló el cuadro a Bryant.',
        '6-8': 'Esto es un memorial. Thomas Cole, fundador de la Escuela del Río Hudson, murió en febrero de 1848. Bryant pronunció su oración fúnebre. El coleccionista Jonathan Sturges le encargó a Durand que pintara juntos a Cole y a Bryant, escribiendo que quería verlos asociados «como almas gemelas», y le entregó la obra terminada a Bryant.',
        '9-12': 'El cuadro opera como retrato conmemorativo disfrazado de paisaje, producido justo cuando la Escuela del Río Hudson consolidaba su propia mitología. La muerte de Cole abrió una cuestión de sucesión, y Durand —que heredó su lugar como figura principal del movimiento— pinta aquí a su predecesor dentro del paisaje como presencia permanente. El título viene de Keats, y ese préstamo romántico transatlántico forma parte de la reivindicación que se está haciendo.',
      },
      symbolism: {
        'K-2': 'Los dos amigos son muy pequeños y los árboles son muy grandes. Eso hace que la naturaleza se vea enorme e importante.',
        '3-5': 'Durand hizo pequeños a los hombres a propósito. Parados bajo esos árboles gigantes, junto a ese desfiladero profundo, se ven diminutos, y eso te dice que la naturaleza es poderosa y merece respeto. La luz del fondo hace que la escena se sienta tranquila, casi sagrada.',
        '6-8': 'La relación de escala carga el significado. Dos figuras humanas pequeñas dentro de un entorno natural inmenso, con luz brillando a lo lejos, toma prestado el lenguaje visual de lo sublime: la idea romántica de que la naturaleza vasta produce asombro mezclado con la conciencia de tu propia pequeñez. Para Durand y su círculo, la naturaleza salvaje era el lugar donde uno se encontraba con algo parecido a lo divino.',
        '9-12': 'Lo sublime aquí está cuidadosamente domesticado. Durand le concede a la naturaleza una escala abrumadora, pero coloca a sus figuras a salvo sobre una plataforma de observación, convirtiendo el terror potencial en contemplación. La luz lejana funciona como significante convencional de trascendencia. Vale la pena señalar lo que el cuadro excluye: esta naturaleza supuestamente intacta se pinta durante un periodo de colonización agresiva y despojo indígena, y el vacío del paisaje es una construcción, no un registro.',
      },
      technique: {
        'K-2': '¡Mira cuántos verdes distintos hay! El artista pintó cada hojita. Las cosas lejanas se ven suaves y azules.',
        '3-5': 'Durand pintó las hojas y la corteza de cerca, con pinceladas diminutas y cuidadosas, así que casi se pueden identificar los tipos de árbol. Las cosas lejanas están pintadas más suaves y más azules: así es como los artistas hacen que la distancia se sienta real.',
        '6-8': 'Durand combina la precisión botánica en el primer plano con la perspectiva atmosférica en el fondo: a medida que el desfiladero retrocede, los colores se enfrían hacia el azul, baja el contraste y los bordes se suavizan. Los árboles que enmarcan a ambos lados actúan como un arco de proscenio, y toda la composición canaliza la mirada hacia la lejanía iluminada.',
        '9-12': 'El cuadro reconcilia dos sistemas pictóricos en competencia: la representación empírica, casi científica, del follaje de primer plano derivada del estudio al aire libre, y la armazón compositiva idealizante heredada de Claudio de Lorena. Durand los armoniza mediante una recesión tonal graduada y una luz cálida unificadora. El resultado se lee como hecho observado sin dejar de ser una construcción enteramente sintética: el desfiladero de Kaaterskill y las cataratas de Kaaterskill son lugares distintos, fundidos aquí en un paisaje que no existe.',
      },
      feeling: {
        'K-2': 'Se siente silencioso, como el bosque muy temprano en la mañana. ¿Te gustaría pararte sobre esa roca?',
        '3-5': 'A la mayoría de la gente este cuadro le parece tranquilo: la luz es suave, los amigos están calmados y todo se siente quieto. Pero también es un poco triste, porque se hizo para recordar a alguien que murió.',
        '6-8': 'El cuadro sostiene dos estados de ánimo a la vez: serenidad en la luz y en la quietud, y elegía en su propósito de memorial. Durand te pide sentir asombro ante el paisaje y duelo por un amigo en una misma mirada.',
        '9-12': 'El registro afectivo es el consuelo: el duelo metabolizado a través de la permanencia natural. El paisaje sobrevive a las figuras que contiene, que es exactamente el consuelo que exige un encargo conmemorativo. Que ese consuelo se lea como ganado o como una convención romántica aplicada por encargo dependerá de cuánto crédito le des a la sinceridad de las afirmaciones espirituales del movimiento sobre la naturaleza salvaje.',
      },
    },
  },

  /* ── George Washington ─────────────────────────────────────────────── */
  washington: {
    title: 'Retrato de George Washington (el retrato Constable-Hamilton)',
    medium: 'Óleo sobre lienzo',
    blurb: 'El primer presidente, pintado del natural, con el negro sobrio de un civil y no con el uniforme de un general.',
    facts: [
      'Pintado en 1797, el año en que Washington dejó el cargo tras rechazar un tercer mandato.',
      'Gilbert Stuart pintó a Washington del natural y luego produjo muchas versiones para distintos clientes.',
      'El retrato Athenaeum de Washington, que Stuart dejó inacabado, es la imagen que aparece en el billete de un dólar.',
      'Washington aparece de negro civil, no de uniforme militar: una decisión deliberada.',
      'Las dentaduras postizas de Washington, célebres por lo mal que le quedaban, alteraban la forma de su boca y de la parte baja del rostro.',
    ],
    suggestions: [
      { q: '¿Quién es este?', topic: 'subject' },
      { q: '¿Por qué no lleva uniforme?', topic: 'symbolism' },
      { q: '¿Qué estaba pasando en 1797?', topic: 'context' },
      { q: '¿Por qué su piel se ve tan real?', topic: 'technique' },
      { q: '¿Es este el cuadro del billete de un dólar?', topic: 'artist' },
      { q: '¿Parece un rey?', topic: 'feeling' },
    ],
    topics: {
      subject: {
        'K-2': 'Este es George Washington. Fue el primer presidente de Estados Unidos. Lleva ropa negra y te está mirando directamente a ti. ¿Se ve amable o serio?',
        '3-5': 'Este es un retrato de George Washington, el primer presidente de Estados Unidos, pintado en 1797. Está vestido con ropa negra sencilla y girado ligeramente hacia nosotros. Su expresión es calmada y seria: no sonríe, pero tampoco parece severo.',
        '6-8': 'Stuart pinta a Washington en 1797, el año en que dejó la presidencia. Fíjate en lo que no lleva puesto: ni uniforme militar, ni medallas, ni espada. Va vestido como un caballero cualquiera, de negro civil. Para un hombre que había comandado el Ejército Continental, esa ausencia es lo más importante del cuadro.',
        '9-12': 'El retrato es un ejercicio de contención calibrada. Stuart despoja a Washington de los atributos del mando militar y lo presenta con ropa civil sin adornos, construyendo una imagen de autoridad que deriva del carácter y de la renuncia voluntaria antes que de la fuerza o del cargo. El giro de tres cuartos y la mirada directa establecen cercanía sin familiaridad: una fórmula visual para un líder republicano que no debe parecer ni monárquico ni vulgar.',
      },
      artist: {
        'K-2': 'Gilbert Stuart era muy bueno pintando caras. ¡Pintó a George Washington tantas veces que su retrato terminó en el billete de un dólar!',
        '3-5': 'Gilbert Stuart era el retratista más solicitado de Estados Unidos. Pintó a Washington del natural y después hizo muchas copias para distintos clientes: así se ganaba la vida. Uno de sus retratos inacabados de Washington se convirtió en la imagen del billete de un dólar.',
        '6-8': 'Stuart se formó en Londres y trajo de vuelta a los nuevos Estados Unidos un estilo de retrato británico sofisticado. Pintó a Washington del natural y luego produjo decenas de réplicas para satisfacer la demanda: básicamente dirigía un negocio de retratos. Su cabeza inacabada de Washington, la del Athenaeum, se convirtió —y sigue siendo— en la imagen más reproducida de cualquier estadounidense.',
        '9-12': 'La práctica de Stuart se sitúa en el cruce entre el arte y los primeros medios de masas. Formado con Benjamin West en Londres, importó un vocabulario de Gran Manera y luego lo industrializó, replicando sus efigies de Washington para un mercado ávido de la imagen del fundador. Esa producción en serie es históricamente significativa por sí misma: Stuart estandarizó de hecho la identidad visual de la nación estadounidense, y la versión del billete de un dólar significa que su pincelada sigue circulando, literalmente, hasta hoy.',
      },
      context: {
        'K-2': 'Hace mucho tiempo, Estados Unidos era un país nuevecito. George Washington estaba a cargo. Cuando llegó el momento de dejar de estar a cargo, decidió irse a su casa, a su granja.',
        '3-5': 'Estados Unidos tenía apenas unos veinte años cuando se pintó esto. Washington acababa de terminar su tiempo como presidente. Podría haberse quedado en el poder, pero decidió retirarse e irse a casa, algo que sorprendió a mucha gente en el mundo, porque los líderes no solían renunciar al poder por voluntad propia.',
        '6-8': 'En 1797 Washington se negó a buscar un tercer mandato y volvió a la vida privada en Mount Vernon. Esa decisión estableció el traspaso pacífico del poder como norma estadounidense, y fue realmente insólita: se dice que el rey Jorge III comentó que, si Washington renunciaba al poder, sería el hombre más grande del mundo. Este retrato se pintó en ese momento, y su ropa civil es un comentario directo sobre ello.',
        '9-12': 'El retrato pertenece a un proyecto iconográfico deliberado de distinguir el liderazgo republicano de la monarquía. Washington y sus contemporáneos eran muy conscientes del modelo de Cincinato —el general romano que volvió a su arado— y lo cultivaron. La imagen debe leerse contra el registro histórico completo, incluido el hecho de que el hombre representado como ejemplo de la libertad mantenía esclavizadas a más de cien personas en Mount Vernon. Sostener ambas cosas no es revisionismo: es la condición mínima para leer el cuadro con exactitud.',
      },
      symbolism: {
        'K-2': 'Lleva ropa normal, no un uniforme del ejército. Eso quiere decir que quería verse como una persona común, no como un rey.',
        '3-5': 'El traje negro sencillo es un mensaje. Washington había sido general y podría haberse vestido como héroe militar o como rey. En vez de eso eligió ropa común, mostrando que en Estados Unidos el líder es solo un ciudadano que sirve un tiempo y después se va a casa.',
        '6-8': 'La ausencia de símbolos es el símbolo. Ni corona, ni uniforme, ni espada, ni trono: se ha retirado cada marcador convencional del poder europeo. Lo que queda es un rostro y un abrigo negro liso, sosteniendo que la autoridad legítima en una república viene del consentimiento de los ciudadanos y no del rango heredado ni de la fuerza militar.',
        '9-12': 'Stuart despliega una retórica de la negación: la autoridad significada mediante el rechazo ostensible de los atributos tradicionales de la autoridad. El fondo oscuro sin adornos y el traje civil se leen como modestia, mientras que la escala, la seguridad de la ejecución y la herencia compositiva de la Gran Manera suministran discretamente la gravedad que habrían aportado las insignias omitidas. Es una maniobra sofisticada: el cuadro reclama humildad usando el aparato formal del retrato aristocrático, y esa contradicción se corresponde exactamente con las contradicciones de la joven república.',
      },
      technique: {
        'K-2': 'Mira sus mejillas: están rosadas, como piel de verdad. El resto del cuadro es oscuro, así que tus ojos van directo a su cara.',
        '3-5': 'Stuart era famoso por pintar piel que parece viva. Superponía colores delgados y luminosos para que las mejillas y la nariz se vieran cálidas y reales. El fondo es oscuro y liso para que nada te distraiga del rostro.',
        '6-8': 'Stuart construía los tonos de la piel en capas translúcidas, dejando que la luz atravesara la pintura y rebotara: por eso la piel parece iluminada desde dentro y no coloreada en la superficie. Mantiene el fondo como un campo oscuro e indefinido y la ropa resuelta a grandes rasgos, concentrando todo el trabajo detallado en la cabeza. Tu atención no tiene a dónde más ir.',
        '9-12': 'La firma técnica de Stuart es una pintura de carnaciones a base de veladuras que aprovecha las propiedades ópticas de las capas finas de óleo para simular la dispersión subcutánea de la piel. La economía en el resto es estratégica: el abrigo se despacha con pinceladas amplias y fluidas y el fondo es un vacío modulado, estableciendo una jerarquía de acabado que dirige la atención con un control casi total. La parte baja del rostro, algo abultada, registra las dentaduras mal ajustadas de Washington: un pasaje donde la observación empírica se resiste al programa idealizante del resto del cuadro.',
      },
      feeling: {
        'K-2': 'Se ve calmado y serio, como alguien en quien puedes confiar. ¿En quién confías tú?',
        '3-5': 'La gente suele describirlo como alguien firme y confiable, alguien que hará lo que dice. Stuart quería que el país nuevo se sintiera seguro al mirar a su primer líder.',
        '6-8': 'La emoción buscada es la confianza en la estabilidad. Todo —la mirada a nivel, la pose quieta, la ausencia de dramatismo— está dispuesto para que una forma de gobierno no probada se sienta sólida y permanente. Pregúntate si esa firmeza se lee como carácter genuino o como una construcción cuidadosa de imagen.',
        '9-12': 'El retrato fabrica tranquilidad para un experimento político que tenía todas las razones para sentirse precario. Su planitud emocional es una virtud del diseño: una imagen de liderazgo que no promete sorpresas. La mirada moderna se complica por dos siglos de reverencia acumulada y por conocimientos que el cuadro suprime, y la pregunta crítica interesante es si la contención de Stuart sigue funcionando de manera persuasiva una vez que sabes cuánto está diseñada para dejar fuera.',
      },
    },
  },

  /* ── Jimson Weed / White Flower No. 1 ──────────────────────────────── */
  jimson: {
    title: 'Estramonio / Flor blanca n.º 1',
    medium: 'Óleo sobre lienzo',
    blurb: 'Una sola flor blanca, ampliada hasta que sus curvas llenan el lienzo y dejan de leerse como una flor.',
    facts: [
      'Pintado en 1932; óleo sobre lienzo.',
      'Representa una sola flor de estramonio, enormemente ampliada.',
      'Vendido en subasta por 44,4 millones de dólares, entonces un récord para una obra de una artista mujer.',
      'Una composición posterior y emparentada, de 1936, muestra cuatro flores y pertenece al Museo de Arte de Indianápolis.',
      'El estramonio es una planta común y tóxica que crecía alrededor de la casa de O’Keeffe en Nuevo México.',
    ],
    suggestions: [
      { q: '¿De qué es este dibujo?', topic: 'subject' },
      { q: '¿Por qué la pintó tan grande?', topic: 'symbolism' },
      { q: '¿De verdad es todo blanco?', topic: 'technique' },
      { q: '¿Quién fue Georgia O’Keeffe?', topic: 'artist' },
      { q: '¿Esto es arte abstracto?', topic: 'subject' },
      { q: '¿Qué te hace sentir?', topic: 'feeling' },
    ],
    topics: {
      subject: {
        'K-2': 'Esta es una sola flor, pintada muy pero muy grande. ¡Llena todo el cuadro! El centro da vueltas como un remolino. ¿A qué te recuerda esa forma?',
        '3-5': 'Esta es una sola flor blanca —una flor de estramonio— pintada tan grande que ocupa el lienzo entero. O’Keeffe se acercó tanto que los pétalos se curvan y se salen por los bordes, y no alcanzas a ver la planta de la que creció.',
        '6-8': 'O’Keeffe aísla una flor de estramonio y la amplía más allá del punto en que se reconoce normalmente. No hay tallo, ni fondo, ni ninguna pista del tamaño real de la planta. Los pétalos giran en espiral desde un centro verde hacia afuera, y el recorte en los bordes sugiere que la flor continúa fuera del marco.',
        '9-12': 'El cuadro opera en el umbral entre representación y abstracción. Al eliminar las pistas de escala —sin tallo, sin suelo, sin objeto de comparación—, O’Keeffe desprende la forma del hecho botánico y la deja funcionar como curva, ritmo y gradación tonal puramente organizados. El recorte es decisivo: le niega al espectador un objeto completo e insiste en que la forma excede su contenedor.',
      },
      artist: {
        'K-2': 'Georgia O’Keeffe fue una artista a la que le encantaban las flores y el desierto. Pintaba las cosas muy grandes para que la gente de verdad las mirara.',
        '3-5': 'Georgia O’Keeffe fue una de las artistas estadounidenses más importantes del siglo XX. Vivió buena parte de su vida en Nuevo México y pintó flores, huesos y paisajes del desierto. Decía que pintaba las flores en grande porque nadie se toma el tiempo de mirar una pequeña.',
        '6-8': 'O’Keeffe fue una figura central del modernismo estadounidense. Explicó sus flores ampliadas sin rodeos: una flor es pequeña, la gente anda ocupada, así que la pintaría lo bastante grande como para que incluso alguien apurado se sobresaltara y mirara. Pasó décadas en Nuevo México, y las formas y la luz del desierto marcaron profundamente su obra.',
        '9-12': 'La carrera de O’Keeffe fue encuadrada insistentemente a través de su género, y ella pasó buena parte de esa carrera resistiéndose a ese encuadre. Críticos de su círculo —incluido su marido, el fotógrafo Alfred Stieglitz, que promovía su trabajo— leyeron sus cuadros de flores como anatomía femenina cifrada, una interpretación que ella rechazó rotunda y repetidamente. La historia de la recepción es inseparable de la obra: a estos cuadros se les ha hecho significar cosas que su autora negaba, lo que plantea preguntas vivas sobre la intención autoral frente a la libertad interpretativa.',
      },
      context: {
        'K-2': 'Pintó esto hace mucho tiempo, cuando muchos artistas estaban probando maneras nuevecitas de pintar.',
        '3-5': 'Esto se pintó en 1932, en una época en que los artistas estadounidenses experimentaban con ideas nuevas sobre lo que podía ser un cuadro. En vez de contar historias, muchos querían explorar la forma, el color y la emoción.',
        '6-8': 'Para 1932 el modernismo estadounidense ya estaba bien asentado, y los artistas se alejaban de la narración para acercarse a la forma misma. O’Keeffe pertenecía a un círculo en torno al fotógrafo Alfred Stieglitz que sostenía que el arte estadounidense debía ser moderno, abstracto y arraigado en temas propios en vez de imitar a Europa.',
        '9-12': 'La obra surge del proyecto del círculo de Stieglitz de construir un modernismo estadounidense propio, capaz de reclamar una sofisticación formal equiparable a la de las vanguardias europeas mientras se nutría de una tierra y una luz específicamente americanas. La posición de O’Keeffe dentro de ese proyecto estaba doblemente cargada: era esencial para sus reivindicaciones y, al mismo tiempo, quedaba sujeta a un aparato crítico que leía su obra desde una lente de género que ella consideraba reduccionista e inexacta.',
      },
      symbolism: {
        'K-2': 'Hacer que algo pequeño se vea enorme es una forma de decir: esto importa. Míralo.',
        '3-5': 'El tamaño es el mensaje. Al hacer enorme la flor de una hierba común, O’Keeffe está diciendo que las cosas corrientes merecen toda tu atención. No estaba pintando una planta rara ni elegante: el estramonio crecía silvestre alrededor de su casa.',
        '6-8': 'La elección del tema pesa. El estramonio es una planta común de orilla de camino y además es venenosa. O’Keeffe le concede a esta planta poco glamorosa, incluso peligrosa, la escala monumental que suele reservarse a personas importantes o a grandes paisajes, y eso obliga a reconsiderar qué merece atención.',
        '9-12': 'La ampliación sostiene un argumento sobre la atención como valor en sí mismo. La razón declarada por O’Keeffe —que la escala puede obligar a mirar a un espectador distraído— sitúa el cuadro como correctivo de la desatención moderna. La persistente lectura sexualizada de estas formas sigue en disputa: descartarla del todo ignora una tradición interpretativa sustancial, y aceptarla sin crítica pasa por encima del relato explícito y repetido de la artista sobre su propia intención. La posición productiva es tratar esa brecha como el problema crítico vivo de la obra en lugar de zanjarla.',
      },
      technique: {
        'K-2': 'Las partes blancas no son solo blancas. Mira de cerca: hay verde, gris y un poquito de amarillo escondidos en los pétalos.',
        '3-5': 'O’Keeffe mezcla sus colores con tanta suavidad que casi no se ven las pinceladas. Los pétalos parecen blancos desde lejos, pero de cerca guardan verdes pálidos, grises y cremas que hacen girar las curvas en el espacio.',
        '6-8': 'La superficie es deliberadamente lisa, con la pincelada apagada para que nada interrumpa la forma. Lo que parece blanco es en realidad una gama estrecha de casi blancos —crema, verde pálido, gris suave— y esos cambios mínimos son los que hacen que los pétalos se lean como volúmenes curvos y no como formas planas. La composición en espiral tira de la mirada hacia el centro verde.',
        '9-12': 'O’Keeffe consigue el volumen con un rango de valores extremadamente comprimido, modelando la forma con tonos apenas separados en vez de fuertes contrastes de claroscuro. La factura suprimida —sin gesto visible, sin empaste— borra la evidencia de la mano de la artista y deja que la forma se presente como si se hubiera generado sola. En lo compositivo, la espiral es un vórtice controlado que lleva la mirada al acento cromático de la garganta verde, la única nota saturada en un campo por lo demás desaturado.',
      },
      feeling: {
        'K-2': 'Se siente suave y silencioso, como algo que se está abriendo. ¿A ti te da calma?',
        '3-5': 'A mucha gente le parece a la vez tranquilo y un poco extraño: tranquilo por los colores suaves, extraño porque una flor así de grande se siente casi como otro mundo.',
        '6-8': 'El cuadro produce una mezcla de serenidad y desorientación. La paleta suave y la superficie lisa se sienten calmadas, pero la pérdida de escala desestabiliza de verdad: no puedes situarte respecto al objeto. Esa combinación es central para la manera en que la obra sostiene tu atención.',
        '9-12': 'La experiencia afectiva depende de una ambigüedad sostenida entre intimidad y monumentalidad. Al espectador se le coloca imposiblemente cerca de algo imposiblemente grande, una contradicción espacial que genera una inquietud callada bajo la aparente tranquilidad. El cuadro premia la mirada prolongada precisamente porque nunca se resuelve en una lectura estable de qué es, o de qué tamaño es, la cosa que tienes delante.',
      },
    },
  },

  /* ── The Lantern Bearers ───────────────────────────────────────────── */
  lantern: {
    title: 'Los portadores de faroles',
    medium: 'Óleo sobre lienzo montado sobre tabla',
    blurb: 'Figuras disfrazadas se agrupan en el crepúsculo azul, cada una acunando un farol de papel que brilla por dentro.',
    facts: [
      'Pintado en 1908 como ilustración para una revista.',
      'Parrish construía el color superponiendo veladuras transparentes finas sobre un fondo blanco.',
      'El azul intenso asociado a su obra llegó a conocerse como «azul Parrish».',
      'Solía fotografiar modelos y construir escenarios en miniatura como referencia.',
    ],
    suggestions: [
      { q: '¿Cómo logró que brillara así?', topic: 'technique' },
      { q: '¿Qué está pasando en este cuadro?', topic: 'subject' },
      { q: '¿Por qué todo es tan azul?', topic: 'technique' },
      { q: '¿Quién fue Maxfield Parrish?', topic: 'artist' },
      { q: '¿Qué significan los faroles?', topic: 'symbolism' },
      { q: '¿Parece un lugar real?', topic: 'feeling' },
    ],
    topics: {
      subject: {
        'K-2': 'Unas personas con disfraces graciosos sostienen faroles redondos que brillan como lunitas. A su alrededor está oscureciendo. ¿Cuántos faroles puedes contar?',
        '3-5': 'Un grupo de figuras disfrazadas está muy junto bajo la luz azul del atardecer. Cada una sostiene un farol redondo de papel, y los faroles brillan cálidos y dorados contra todo ese azul frío. Sus caras están iluminadas desde abajo por la luz que llevan.',
        '6-8': 'Parrish agrupa a unos artistas disfrazados en pleno crepúsculo, cada uno con un farol de papel encendido. El cuadro se construye sobre un solo contraste: fuentes de luz cálida y dorada contra un entorno azul violáceo saturado. Cada rostro está iluminado desde abajo por su propio farol, lo que da a las figuras una cualidad irreal, teatral.',
        '9-12': 'La composición es en esencia un estudio de iluminación controlada. Parrish distribuye fuentes de luz cálida discretas sobre un campo frío y profundamente saturado, usando cada farol a la vez como acento compositivo y como recurso de modelado para la figura que lo lleva. Los personajes disfrazados son menos protagonistas que armazones para el problema lumínico: el verdadero tema del cuadro es el comportamiento del resplandor cálido dentro de una atmósfera azul.',
      },
      artist: {
        'K-2': 'Maxfield Parrish hacía dibujos para revistas y libros. Le encantaba pintar la luz que brilla y un azul muy especial.',
        '3-5': 'Maxfield Parrish fue uno de los ilustradores estadounidenses más populares de todos los tiempos. Sus imágenes aparecían en revistas, carteles y calendarios que colgaban en millones de casas. Era famoso por un tono de azul luminoso que la gente empezó a llamar «azul Parrish».',
        '6-8': 'Parrish tuvo un éxito comercial enorme y llegaba al público por revistas, anuncios y láminas producidas en masa, no por galerías. Desarrolló un método técnico propio y una paleta tan reconocible que su azul terminó llevando su nombre. Además trabajaba a partir de fotografías y de pequeños escenarios que construía, en vez de pintar solo de imaginación.',
        '9-12': 'Parrish ejemplifica al ilustrador de comienzos del siglo XX cuyo alcance cultural superó ampliamente su prestigio crítico. Sus imágenes circularon mediante reproducción masiva a una escala que ningún pintor de galería podía igualar, y su procedimiento técnico —veladuras, referencia fotográfica, maquetas construidas— se parecía más a una metodología de producción que a las nociones románticas de espontaneidad artística. El desdén crítico que sufrió, y la posterior reevaluación de la ilustración como campo legítimo, corre paralelo a la trayectoria de la reputación de Rockwell.',
      },
      context: {
        'K-2': 'Hace mucho, antes de la televisión, la gente miraba dibujos en las revistas para divertirse. Este era uno de esos dibujos.',
        '3-5': 'Esto se pintó en 1908 para una revista. En esa época, las revistas eran como la mayoría de la gente veía arte: no había televisión ni internet, así que una ilustración bonita era algo que las familias esperaban cada semana.',
        '6-8': 'En 1908 las revistas ilustradas eran un medio de masas dominante. Los avances en impresión a color hicieron que por primera vez la obra de un pintor pudiera reproducirse a todo color y llegar a millones de hogares. Esa tecnología creó tanto el mercado como las restricciones dentro de las cuales trabajaba Parrish: sus imágenes tenían que sobrevivir al proceso de impresión y leerse con claridad al tamaño de una página.',
        '9-12': 'La obra se sitúa en la convergencia de un cambio tecnológico y un mercado: la reproducción en cuatricromía por semitonos volvió comercialmente viable la ilustración a color de gran tirada, generando un alcance sin precedentes para quienes supieran trabajar dentro de sus límites. La saturación alta y el contraste de bordes duros de Parrish son en parte una acomodación a ese proceso —una paleta diseñada para sobrevivir a la reproducción—, lo que complica cualquier lectura de su color como elección puramente expresiva.',
      },
      symbolism: {
        'K-2': 'Cada persona lleva su propia lucecita en la oscuridad. Es una idea bonita para pensar.',
        '3-5': 'Figuras que llevan luz a través de la oscuridad es una idea antigua y poderosa: sugiere esperanza, o guía, o conocimiento. Parrish le da a cada persona su propia luz en vez de una lámpara grande para todos, y eso lo hace sentir más personal.',
        '6-8': 'El motivo de los portadores que llevan luces individuales por la oscuridad invita a lecturas simbólicas evidentes: esperanza, ilustración, guía. Parrish mantiene esas asociaciones disponibles sin comprometerse con ninguna. Los disfraces sitúan la escena fuera de la vida corriente, en un espacio más cercano al teatro o a la fábula que a una historia concreta.',
        '9-12': 'La imagen negocia con un simbolismo deliberadamente sin anclar. Las figuras portadoras de luz cargan una fuerte tradición alegórica en el arte occidental, y Parrish activa esa resonancia mientras retiene cualquier relato que fijaría su significado. Esta ambigüedad es tan funcional en lo comercial como motivada en lo artístico: una imagen que sugiere trascendencia sin especificarla sirve mejor a un público masivo que otra que exigiría un saber literario particular.',
      },
      technique: {
        'K-2': '¡El azul es azulísimo! Y los faroles parecen estar brillando de verdad. ¿Cómo se pinta la luz?',
        '3-5': 'Parrish no mezcló un azul y lo puso encima sin más. Aplicó capas de color muy finas y transparentes, una por una, dejando que el lienzo blanco de abajo devolviera la luz a través de ellas. Por eso los colores parecen brillar en vez de quedarse planos.',
        '6-8': 'Parrish trabajaba con veladuras: aplicaba capas finas y transparentes de óleo sobre un fondo blanco, dejando secar cada una antes de la siguiente. La luz atraviesa las capas, rebota en el blanco de abajo y regresa a tu ojo, lo que produce una luminosidad que la pintura opaca mezclada no puede igualar. A eso sumó un contraste estricto de cálido y frío: la luz dorada de los faroles contra el azul saturado, los dos puntos más alejados del círculo cromático.',
        '9-12': 'El procedimiento técnico es casi renacentista: veladuras transparentes sucesivas sobre un fondo blanco brillante, aprovechando la superposición sustractiva para que el color percibido sea producto de la luz atravesando la película dos veces. El resultado es una intensidad cromática fundamentalmente distinta de la pintura opaca directa. Parrish la refuerza ópticamente con una estructura de complementarios rigurosa, y su claridad de forma, de bordes duros y casi fotográfica, procede de trabajar sobre referencia fotográfica proyectada o calcada, un método que compartió con pocos pintores de ambición comparable.',
      },
      feeling: {
        'K-2': 'Se siente mágico, como un sueño o un cuento. ¿Te gustaría estar ahí?',
        '3-5': 'Casi todo el mundo lo describe como mágico o de ensueño. Los faroles encendidos y el azul profundo del atardecer hacen que parezca una escena de cuento de hadas más que un lugar real.',
        '6-8': 'La sensación es de encantamiento, producida a propósito mediante la temperatura del color, una iluminación insólita y unos disfraces que borran cualquier idea de tiempo o lugar concretos. Ten en cuenta que esto era una ilustración comercial: Parrish estaba fabricando un estado de ánimo que hiciera que la gente quisiera conservar y colgar la imagen.',
        '9-12': 'El objetivo afectivo es una especie de asombro estetizado, y está fabricado con considerable precisión. La ausencia de especificidad narrativa, la iluminación teatral y la saturación hiperreal se combinan en una imagen placentera sin ser exigente. Si eso constituye una limitación o un logro es exactamente la pregunta que mantuvo a la ilustración fuera del canon crítico durante casi todo el siglo XX.',
      },
    },
  },

  /* ── The Reader ────────────────────────────────────────────────────── */
  reader: {
    title: 'La lectora',
    medium: 'Óleo sobre lienzo',
    blurb: 'Una mujer absorta en un libro, pintada con trazos sueltos y visibles que se niegan a ordenarse.',
    facts: [
      'Pintado en 1877, el año en que Cassatt se unió al círculo impresionista en París.',
      'Cassatt era estadounidense, nacida en Pensilvania, y pasó casi toda su carrera en Francia.',
      'Fue una de las poquísimas mujeres —y la única estadounidense— que expuso con los impresionistas franceses.',
      'A las mujeres se les prohibía la entrada a muchas academias oficiales de arte y a pintar muchos temas públicos.',
    ],
    suggestions: [
      { q: '¿Por qué no nos está mirando?', topic: 'symbolism' },
      { q: '¿Qué es el impresionismo?', topic: 'technique' },
      { q: '¿Quién fue Mary Cassatt?', topic: 'artist' },
      { q: '¿Por qué el cuadro es tan suelto y áspero?', topic: 'technique' },
      { q: '¿Cómo era la vida de las mujeres en 1877?', topic: 'context' },
      { q: '¿Qué se siente al ver este cuadro?', topic: 'feeling' },
    ],
    topics: {
      subject: {
        'K-2': 'Una mujer está leyendo un libro. No nos mira para nada: solo mira su libro. ¿De qué crees que trata la historia?',
        '3-5': 'Una mujer está sentada leyendo, completamente absorta. No mira hacia quien observa ni posa para nosotros. Cassatt la captó en un momento privado y corriente, como si por casualidad hubiéramos mirado y la viéramos a media página.',
        '6-8': 'Una mujer lee, con toda su atención dentro del libro. No está posando ni reconoce al espectador, algo que se aparta notablemente de la convención del retrato, donde la retratada suele presentarse para ser mirada. Aquí el sujeto está haciendo algo, y nosotros somos secundarios.',
        '9-12': 'El cuadro retiene la mirada recíproca que estructura el retrato femenino convencional. La retratada aparece en un estado de interioridad activa, absorta en trabajo intelectual, y al espectador se le sitúa como observador de una actividad y no como destinatario de una exhibición. Esa reorientación de la relación entre sujeto y espectador es la jugada formal y política central del cuadro.',
      },
      artist: {
        'K-2': 'Mary Cassatt fue una artista estadounidense que se fue muy lejos, a Francia, a pintar. Pintó muchos cuadros de mujeres y niños haciendo cosas de todos los días.',
        '3-5': 'Mary Cassatt nació en Pensilvania pero vivió casi toda su vida en Francia. Se hizo amiga de los impresionistas franceses y la invitaron a exponer sus cuadros junto a los de ellos: fue la única mujer estadounidense a la que se lo pidieron. Pintaba sobre todo a mujeres y niños en momentos corrientes.',
        '6-8': 'Cassatt fue la única mujer estadounidense que expuso con los impresionistas franceses. Enfrentó barreras institucionales reales: las mujeres quedaban excluidas de muchas academias y de los cafés y espacios públicos donde los artistas hombres trabajaban y hacían contactos. Esas restricciones explican en parte sus temas: los interiores domésticos y la vida de las mujeres eran los espacios que ella sí podía observar de cerca.',
        '9-12': 'La posición de Cassatt estaba limitada estructuralmente de maneras que moldearon su práctica. Excluida de las clases de modelo del natural, de la cultura de café que constituía la academia informal de los impresionistas y de la esfera pública en general, desarrolló una obra centrada en el interior doméstico. Leer ese enfoque como mera preferencia se pierde lo esencial: era el terreno disponible para ella, y lo convirtió en un tema serio en vez de en una limitación, lo cual es en sí mismo un argumento sobre qué merece ser pintado.',
      },
      context: {
        'K-2': 'Cuando se pintó esto, algunas personas creían que las mujeres no debían ser artistas. Mary Cassatt lo fue de todos modos.',
        '3-5': 'En 1877, las mujeres tenían muchas menos opciones que ahora. No podían votar, la mayoría de las escuelas de arte no las aceptaban, y a mucha gente le parecía raro ver a una mujer leyendo en serio. Cassatt pintó igual a una mujer metida de lleno en un libro.',
        '6-8': 'En 1877, las mujeres francesas y estadounidenses no podían votar, tenían acceso restringido a la educación superior y estaban en gran medida excluidas de la formación artística profesional. Los debates sobre si las mujeres debían siquiera educarse seguían abiertos. Pintar a una mujer leyendo con verdadera concentración era, en ese clima, un argumento en voz baja.',
        '9-12': 'El cuadro entra en una disputa decimonónica en curso sobre la capacidad intelectual de las mujeres y su acceso a la educación. Las representaciones de mujeres leyendo en ese periodo solían codificar la actividad como decorativa, moralmente instructiva o levemente peligrosa. La versión de Cassatt resiste las tres y presenta la lectura como un trabajo cognitivo absorbente y sin nada de extraordinario. La política opera mediante el rechazo de la convención dominante y no mediante una declaración explícita.',
      },
      symbolism: {
        'K-2': 'El libro es importante. Muestra que ella tiene sus propios pensamientos y su propio mundo.',
        '3-5': 'El libro representa tener una mente propia. Cassatt está mostrando que esta mujer tiene una vida interior: pensamientos e intereses que le pertenecen a ella y no a quien la esté mirando.',
        '6-8': 'El libro funciona como afirmación de autonomía intelectual. Como la mujer está absorta y no posando, el cuadro insiste en que ella existe para sus propios fines y no para el disfrute del espectador: una afirmación poco común sobre un sujeto femenino en 1877.',
        '9-12': 'El libro opera como el mecanismo por el cual a la retratada se le concede subjetividad en lugar de estatuto de objeto. Su ensimismamiento le cierra al espectador el acceso a su interioridad mientras confirma que existe: vemos que está pensando y no podemos ver qué piensa. Esa retención estructural es la fuente de la fuerza callada del cuadro, e invierte la convención dominante del retrato femenino de la época.',
      },
      technique: {
        'K-2': '¡Se ven las pinceladas! La artista no las alisó. Parece rápido, como si hubiera pintado deprisa.',
        '3-5': 'Cassatt dejó sus pinceladas a la vista en vez de difuminarlas. De cerca se ve suelto, casi sin terminar, pero si te alejas todo se une. Esa era una manera nueva y polémica de pintar en aquel momento.',
        '6-8': 'La pincelada visible y sin fundir es característica del impresionismo, y fue realmente polémica. La formación académica exigía una superficie lisa y acabada que ocultara el acto de pintar. Dejar los trazos a la vista declara que un cuadro está hecho de pintura: una afirmación sobre honestidad e inmediatez que la crítica leyó al principio como incompetencia.',
        '9-12': 'La factura conservada ejecuta el argumento impresionista de que un cuadro debe reconocer su propia construcción material en vez de simular una ventana. Cassatt resuelve la figura con trazos amplios y direccionales que describen la forma con economía sin llegar nunca al acabado académico. La tensión entre esa ejecución suelta y la especificidad psicológica del ensimismamiento de la retratada es donde el cuadro genera su interés: la superficie es informal, la observación no.',
      },
      feeling: {
        'K-2': 'Se siente tranquilo y silencioso, como una biblioteca. ¿Tienes un lugar donde te guste leer?',
        '3-5': 'Se siente apacible y privado. Como ella no nos mira, da la sensación de que deberíamos quedarnos callados y no interrumpirla.',
        '6-8': 'El cuadro produce una sensación de distancia respetuosa. Su ensimismamiento crea un límite que no podemos cruzar, y esa inaccesibilidad es lo que hace que se sienta como una persona real y no como un motivo decorativo.',
        '9-12': 'La experiencia afectiva es la de un acceso incumplido. Al espectador se le concede proximidad pero se le niega reconocimiento, lo que produce una incomodidad sutil que va a contrapelo de la tranquilidad que suele suministrar el retrato convencional. Esa retención es el logro del cuadro: convierte un momento doméstico corriente en la afirmación de que esta persona no está disponible para ser consumida.',
      },
    },
  },

  /* ── Excavation at Night ───────────────────────────────────────────── */
  excavation: {
    title: 'Excavación de noche',
    medium: 'Óleo sobre lienzo',
    blurb: 'Un pozo enorme abierto en pleno Nueva York, trabajado durante la noche bajo luz artificial.',
    facts: [
      'Pintado en 1908, parte de una serie que Bellows hizo sobre la excavación de la estación de Pensilvania en Nueva York.',
      'La excavación retiró volúmenes enormes de roca madre de Manhattan para construir la estación y sus túneles ferroviarios.',
      'Bellows perteneció a la Escuela Ashcan, artistas que pintaban la vida urbana contemporánea en todas sus formas.',
      'Trabajaba con atmósferas oscuras cortadas por trazos brillantes aplicados con aspereza.',
    ],
    suggestions: [
      { q: '¿Qué están construyendo?', topic: 'context' },
      { q: '¿Por qué está tan oscuro?', topic: 'technique' },
      { q: '¿Dónde están los trabajadores?', topic: 'symbolism' },
      { q: '¿Qué es la Escuela Ashcan?', topic: 'artist' },
      { q: '¿Por qué pintar una obra en construcción?', topic: 'artist' },
      { q: '¿Qué se siente al ver este cuadro?', topic: 'feeling' },
    ],
    topics: {
      subject: {
        'K-2': 'Este es un hoyo gigante en el suelo de una ciudad grande. Hay gente trabajando dentro aunque sea de noche. Las luces brillan en la oscuridad. ¿Qué crees que están construyendo?',
        '3-5': 'Se ha cavado un pozo enorme en pleno Nueva York, y los trabajadores siguen ahí abajo de noche. Las luces brillan en la oscuridad y sube vapor o humo. Los edificios del borde se ven pequeños comparados con el tamaño del hoyo.',
        '6-8': 'Bellows muestra la excavación de la estación de Pensilvania —un pozo enorme abierto en la roca madre de Manhattan— trabajada después del anochecer. Las luces artificiales perforan una atmósfera humosa y casi negra. La relación de escala es lo importante: la excavación empequeñece a los edificios y reduce a los trabajadores a marcas diminutas.',
        '9-12': 'El cuadro representa la excavación industrial como un acontecimiento nocturno y casi geológico. Bellows organiza la composición en torno a un vacío y no a una masa, e ilumina la escena con fuentes artificiales dispersas que no llegan a resolver el espacio. Las figuras humanas quedan subordinadas a la escala de la operación y se registran como incidentes de pintura antes que como sujetos individualizados: una decisión compositiva que carga el argumento del cuadro sobre el trabajo industrial.',
      },
      artist: {
        'K-2': 'A George Bellows le gustaba pintar la vida real de la ciudad: calles llenas, multitudes y hasta peleas de boxeo. Pintaba cosas que otros artistas creían demasiado desordenadas.',
        '3-5': 'George Bellows pintó las partes de la vida urbana que la mayoría de los artistas ignoraba: calles atestadas, gente trabajadora, combates de boxeo, obras en construcción. Usaba colores oscuros con trazos rápidos y brillantes que hacen que todo parezca en movimiento.',
        '6-8': 'Bellows estuvo asociado a Robert Henri y a la Escuela Ashcan, un grupo que sostenía que la vida estadounidense contemporánea —incluida su crudeza y su caos— era el tema propio de la pintura. Su técnica acompañaba esa posición: atmósferas oscuras cortadas por trazos ásperos y vigorosos que transmiten movimiento y energía en vez de pulcritud.',
        '9-12': 'Bellows trabajó dentro del programa de realismo urbano contemporáneo de la Escuela Ashcan, que planteaba una reivindicación implícitamente democrática sobre los temas: que los barrios obreros y los emplazamientos industriales eran tan dignos de pintura seria como el paisaje o el retrato. Su ejecución, caracterizada por fondos tonales oscuros atravesados por pinceladas brillantes y cargadas, era inseparable de ese argumento: la aspereza afirmaba autenticidad frente al acabado académico.',
      },
      context: {
        'K-2': 'Hace mucho tiempo, las ciudades cambiaban muy rápido. La gente cavaba hoyos enormes para construir estaciones de tren bajo tierra.',
        '3-5': 'En 1908, Nueva York se estaba reconstruyendo a una velocidad increíble. Para crear la estación de Pensilvania y sus túneles de tren, los trabajadores tuvieron que volar y excavar una cantidad gigantesca de roca sólida en pleno centro de la ciudad, y el trabajo continuaba a todas horas.',
        '6-8': 'La excavación de la estación de Pensilvania fue uno de los mayores proyectos de construcción de su época y exigió retirar cantidades enormes de roca madre de Manhattan para levantar una terminal y unos túneles bajo el río Hudson. Funcionaba de forma continua, también de noche. Esta era la realidad física detrás de la abstracción llamada «industrialización»: miles de obreros, condiciones peligrosas y una ciudad reorganizándose a sí misma.',
        '9-12': 'La excavación pertenece a un periodo de transformación infraestructural intensa impulsado por la inmigración, la consolidación ferroviaria y la concentración de capital. La operación ininterrumpida fue posible gracias a la luz eléctrica, que extendió la jornada industrial y alteró las condiciones del trabajo urbano. Bellows documenta no solo una obra, sino un régimen temporal nuevo —el trabajo desacoplado de la luz del día— y el coste humano de ese arreglo está implícito en cada figura que se traga la oscuridad.',
      },
      symbolism: {
        'K-2': 'El hoyo es enorme y las personas son diminutas. Eso muestra lo grandes y poderosas que eran las máquinas y el trabajo.',
        '3-5': 'Bellows hizo pequeños a los trabajadores y enorme al pozo. Eso te dice algo: el proyecto era tan grande que las personas que lo hacían casi desaparecen dentro de él.',
        '6-8': 'El contraste de escala carga el significado. Al reducir a los trabajadores a marcas pequeñas dentro de una excavación abrumadora, Bellows sugiere que el progreso industrial consume a los individuos que lo producen. La oscuridad lo refuerza: literalmente cuesta encontrar a las personas en el cuadro.',
        '9-12': 'El cuadro escenifica la industrialización como un sublime de tipo netamente moderno: el asombro antes reservado a las montañas y las tormentas, redirigido hacia una devastación hecha por manos humanas. Donde las figuras de Durand contemplan una naturaleza inmensa desde una posición segura, las de Bellows están dentro de la inmensidad y están siendo usadas por ella. La negativa a individualizar a los trabajadores no es indiferencia sino argumento: el sistema no los distingue entre sí, y el cuadro tampoco.',
      },
      technique: {
        'K-2': 'Casi todo el cuadro es muy oscuro. Y luego hay puntos brillantes de amarillo. Tus ojos van directo a las partes brillantes.',
        '3-5': 'Bellows pintó casi todo el lienzo con marrones y grises oscuros, y después añadió unos pocos trazos amarillo-blancos para las luces. Como hay tan poco color brillante, el poco que hay se siente intenso, como luces de verdad en oscuridad de verdad.',
        '6-8': 'Bellows parte de un fondo tonal oscuro y reserva la pintura más clara y más cargada para las fuentes de luz artificial. Ese contraste extremo de valores, junto a una pincelada suelta y rápida, produce una sensación de atmósfera y movimiento. Los bordes se disuelven en humo y oscuridad, así que el ojo tiene que esforzarse para leer el espacio, lo cual imita la experiencia real de asomarse a un pozo mal iluminado.',
        '9-12': 'La estructura tonal es en esencia un método de fondo oscuro: primero se establece un campo de tonalidad baja y luego se inserta empaste de valor alto para las fuentes de luz. El rango de valores resultante queda comprimido en el extremo oscuro y bruscamente extendido en el claro, produciendo intensidad óptica a partir de muy poca pintura brillante. Los bordes deliberadamente sin resolver y los pasajes casi ilegibles son una estrategia representacional: el cuadro reproduce la dificultad perceptiva de la escena en lugar de aclarársela al espectador por comodidad.',
      },
      feeling: {
        'K-2': 'Se siente un poco temible y muy grande. ¿Te gustaría trabajar ahí abajo de noche?',
        '3-5': 'Se siente pesado y algo inquietante: oscuro, humeante y enorme. Pero también emocionante, porque se nota que están construyendo algo gigantesco.',
        '6-8': 'El cuadro sostiene a la vez el asombro y la inquietud. Hay verdadera grandeza en la escala de la empresa y verdadera crudeza en la oscuridad, el humo y la pequeñez de los trabajadores. Bellows no te dice cuál sentir, y esa ambivalencia es deliberada.',
        '9-12': 'El registro afectivo queda sin resolver por diseño: Bellows ni celebra el logro industrial ni lo denuncia sin más. El cuadro sostiene la admiración por la escala de la capacidad humana junto al desasosiego por su coste, y le niega al espectador una posición cómoda. Esa negativa es más exigente de lo que sería un tratamiento triunfalista o puramente crítico, y es lo que impide que el cuadro funcione como propaganda en cualquiera de las dos direcciones.',
      },
    },
  },

  /* ── Professor Benjamin Howard Rand ────────────────────────────────── */
  rand: {
    title: 'El profesor Benjamin Howard Rand',
    medium: 'Óleo sobre lienzo',
    blurb: 'Un profesor de química en su escritorio desordenado, captado a media reflexión y no posando para la posteridad.',
    facts: [
      'Pintado en 1874. Rand era profesor de química en el Jefferson Medical College de Filadelfia.',
      'Eakins estudió anatomía junto a estudiantes de medicina y diseccionó cadáveres para entender el cuerpo.',
      'Más tarde se le obligó a renunciar a un puesto docente por su insistencia en usar modelos completamente desnudos en clases mixtas.',
      'En el escritorio hay un microscopio, papeles y libros: las herramientas de trabajo de un científico.',
    ],
    suggestions: [
      { q: '¿Quién es este hombre?', topic: 'subject' },
      { q: '¿Qué son todas las cosas de su escritorio?', topic: 'symbolism' },
      { q: '¿Por qué la habitación está tan oscura?', topic: 'technique' },
      { q: '¿Quién fue Thomas Eakins?', topic: 'artist' },
      { q: '¿Por qué no se ve elegante?', topic: 'symbolism' },
      { q: '¿En qué está pensando?', topic: 'feeling' },
    ],
    topics: {
      subject: {
        'K-2': 'Un señor está sentado en su escritorio con sus libros y papeles. Tiene una mano cerca de la cara, como si estuviera pensando mucho. ¡Hay un gato en su escritorio! ¿Puedes encontrarlo?',
        '3-5': 'Un profesor está sentado en un escritorio desordenado, lleno de libros, papeles e instrumentos científicos. Apoya una mano cerca de la cara mientras piensa. No sonríe para nosotros ni se sienta muy derecho: Eakins lo pintó en plena faena.',
        '6-8': 'Eakins pinta al profesor Benjamin Rand, químico, en su escritorio de trabajo y no en un entorno formal. El escritorio está genuinamente desordenado: libros, papeles, un microscopio. La postura de Rand no está posada y su atención va hacia dentro. El cuadro documenta a una persona en el acto de pensar en vez de presentar la imagen pública de un hombre distinguido.',
        '9-12': 'El retrato traslada a su modelo desde el espacio ceremonial abstracto del retrato académico a un entorno de trabajo específico y materialmente denso. Eakins rechaza la idealización: el desorden del escritorio se registra en lugar de ordenarse, la pose es de transición y no de reposo, y la iluminación es despareja. La dignidad del retratado se hace derivar del trabajo intelectual demostrado y no de las convenciones del retrato de estatus.',
      },
      artist: {
        'K-2': 'Thomas Eakins quería pintar a las personas exactamente como se veían de verdad. Hasta estudió cómo funciona el cuerpo para hacerlo bien.',
        '3-5': 'Thomas Eakins creía que el arte debía ser veraz. Estudió anatomía con estudiantes de medicina para entender exactamente cómo está hecho el cuerpo. A algunas personas sus cuadros les parecían demasiado honestos y poco halagadores.',
        '6-8': 'Eakins persiguió la exactitud con un rigor poco común: estudió anatomía junto a estudiantes de medicina y diseccionó cadáveres. Trataba la pintura como una forma de investigación. Ese compromiso lo convirtió en un maestro exigente y acabó costándole su puesto: se le obligó a renunciar por su insistencia en usar modelos completamente desnudos en clases donde había mujeres.',
        '9-12': 'El realismo de Eakins fue metodológico antes que estilístico, fundado en la disección anatómica, el cálculo de perspectiva y el estudio fotográfico. Trataba la disciplina de la observación como una posición ética, lo que lo puso en conflicto directo con el decoro que se esperaba del retrato de la Edad Dorada y con las instituciones que lo empleaban. Su renuncia forzada por la práctica en la clase de modelo del natural ilustra hasta qué punto sus compromisos epistemológicos y las convenciones sociales de su entorno eran genuinamente incompatibles.',
      },
      context: {
        'K-2': 'Cuando se pintó esto, la gente estaba aprendiendo muchísimas cosas nuevas sobre la ciencia. Este señor era profesor de ciencias.',
        '3-5': 'Esto se pintó en 1874, cuando la ciencia cambiaba rápido y ciudades como Filadelfia tenían escuelas de medicina importantes. Rand enseñaba química a futuros médicos. Eakins lo pintó como alguien cuyo trabajo importaba.',
        '6-8': 'En 1874, la medicina y la ciencia estadounidenses se profesionalizaban a gran velocidad, y Filadelfia era un centro importante de educación médica. Rand enseñaba química en el Jefferson Medical College. La decisión de Eakins de mostrar a un científico rodeado de sus instrumentos refleja un periodo en el que la investigación empírica ganaba autoridad cultural.',
        '9-12': 'El retrato registra el prestigio creciente de la ciencia empírica dentro de la cultura profesional estadounidense. El propio método de trabajo de Eakins —estudio anatómico, análisis óptico y perspectivo— participa de la misma epistemología que representa su modelo, de modo que el cuadro es, en un sentido real, un científico pintado por un pintor que opera científicamente. La alineación entre tema y método es el rasgo más interesante del retrato y su afirmación implícita sobre para qué sirve la pintura.',
      },
      symbolism: {
        'K-2': 'Sus libros y herramientas muestran lo que hace. Si alguien te pintara a ti, ¿qué te gustaría tener en tu escritorio?',
        '3-5': 'Los objetos del escritorio te dicen quién es: libros, papeles y un microscopio significan que estudia y enseña ciencia. Eakins no necesitó un fondo elegante; las herramientas hacen el trabajo de explicar al hombre.',
        '6-8': 'El desorden es caracterización. En vez de rodear a Rand de símbolos de rango, Eakins lo rodea de los instrumentos reales de su oficio. El mensaje es que la identidad viene de lo que uno hace, y el desorden deliberado insiste en que este es un escritorio de trabajo de verdad y no un montaje.',
        '9-12': 'Eakins sustituye los atributos tradicionales de estatus por un inventario de práctica profesional. El desorden cumple una función retórica: un escritorio ordenado señalaría exhibición, mientras que uno genuinamente revuelto señala uso, y así autentifica el trabajo intelectual del modelo como algo en curso y no como algo conmemorado. El gesto pensativo y sin resolver completa el argumento: se representa al hombre a mitad de proceso, lo cual afirma que lo que lo constituye es el pensamiento y no el logro.',
      },
      technique: {
        'K-2': 'La habitación está oscura, pero su cara y sus manos están iluminadas. Así es como el artista te dice dónde mirar.',
        '3-5': 'Eakins usó sombras profundas en casi todo el cuadro y dejó que la luz cayera sobre la cara, las manos y los papeles del profesor. Todo lo que quiere que notes está iluminado; todo lo demás se hunde en lo oscuro.',
        '6-8': 'Eakins emplea una estructura fuerte de oscuro a claro: deja que la habitación caiga en sombra profunda y concentra la luz en el rostro, las manos y la superficie del escritorio. La ejecución es precisa y controlada, con atención cuidadosa a cómo se comporta la luz sobre materiales distintos: tela, papel, metal, piel. Nada queda generalizado.',
        '9-12': 'La organización tonal deriva del precedente barroco español, en particular del modelado de sombra profunda que Eakins absorbió estudiando a Velázquez y a Ribera en Madrid. La despliega de manera analítica y no dramática: la iluminación se distribuye según lo que requiere atención visual, y la representación diferenciada de las superficies —cómo se comporta la luz sobre el papel frente al metal pulido frente a la carne— refleja la misma disciplina investigadora que gobernaba su estudio anatómico.',
      },
      feeling: {
        'K-2': 'Se ve serio y ocupado, como si estuviera en medio de un problema difícil. ¿Tú alguna vez piensas así de fuerte?',
        '3-5': 'Se ve absorto y un poco cansado, como una persona real a mitad de un día largo de trabajo y no como alguien posando para una foto.',
        '6-8': 'El cuadro produce una sensación de respeto callado más que de admiración por el estatus. Rand se ve cansado y realmente ocupado, y esa normalidad es lo que lo hace creíble. Eakins te pide valorar el trabajo en vez de impresionarte con el hombre.',
        '9-12': 'El tono emocional es deliberadamente poco dramático, y eso ya era en sí una desviación. Al negarse a halagar, Eakins produce un retrato que se lee como evidencia y no como homenaje, y el efecto resultante está más cerca del reconocimiento que de la reverencia. A sus contemporáneos esa cualidad solía disgustarles —su negativa a idealizar dañó sus encargos—, lo cual recuerda con utilidad que la honestidad que hoy admiramos era, en su momento, un pasivo profesional.',
      },
    },
  },

};
