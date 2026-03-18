/**
 * EJP — Spanish / English language toggle
 * Usage: add data-i18n="key" to any translatable element.
 *        add data-i18n-placeholder="key" to inputs that need a translated placeholder.
 * The Español/English button must have class="js-lang-toggle".
 * Language preference is persisted in localStorage under "ejp_lang".
 */
(function () {
  var STORAGE_KEY = 'ejp_lang';

  // Spanish translations only — English is captured live from the DOM on first load.
  var es = {
    // ── Shared header ─────────────────────────────────────────────
    'header-tagline':        'Un Programa del Fondo de Capacitación y Empleo de 1199SEIU',
    'nav-job-seekers':       'Para Buscadores de Empleo',
    'nav-employers':         'Para Empleadores',
    'nav-about':             'Acerca de',
    'nav-events':            'Eventos',
    'nav-contact':           'Contacto',
    'nav-mytef':             'Mi TEF',
    'logo-sub':              'Empleo y Colocación Laboral',
    // ── Shared footer ─────────────────────────────────────────────
    'footer-brand-sub':      'Empleo y Colocación Laboral',
    'footer-funds':          'Fondos 1199SEIU',
    'footer-privacy':        'Política de Privacidad',
    'footer-terms':          'Términos de Uso',
    'footer-a11y':           'Accesibilidad',
    'footer-copy':           '© 2026 Fondo de Capacitación y Empleo 1199SEIU. Todos los derechos reservados.',
    // ── MyTEF modal (injected by nav.js) ──────────────────────────
    'mytef-modal-title':     'Portal Mi TEF',
    'mytef-modal-body':      'Accede a tus registros de capacitación, inscripciones, solicitudes, currículum y estado de reembolsos — todo en el portal seguro myTEF.',
    'mytef-modal-li-1':      'Inscríbete en clases y programas de capacitación',
    'mytef-modal-li-2':      'Solicita oportunidades de avance profesional',
    'mytef-modal-li-3':      'Sube y administra tu currículum',
    'mytef-modal-li-4':      'Consulta reembolsos de matrícula y gastos',
    'mytef-modal-cta':       'Ir al Portal Mi TEF →',
    'mytef-modal-footnote':  'Serás llevado al portal seguro de miembros de 1199SEIU TEF para iniciar sesión.',
    // ── index.html ────────────────────────────────────────────────
    'index-hero-kicker':     '1199SEIU Fondo de Capacitación y Empleo',
    'index-hero-h1-1':       'Más Que',
    'index-hero-h1-2':       'Solo un Trabajo.',
    'index-hero-subtitle':   'Construimos carreras.',
    'index-hero-deck':       'EJP es tu socio a largo plazo en la construcción de una carrera duradera — con servicios personalizados, orientación experta y una red que ha apoyado a la fuerza laboral de Nueva York por décadas.',
    'index-hero-btn-primary':   'Encontrar Servicios de Carrera →',
    'index-hero-btn-secondary': 'Contratar Candidatos Calificados',
    'index-cpt-strong':      '¿Completando tu capacitación CPT?',
    'index-cpt-span':        'Tu equipo de servicios de carrera está listo para ayudarte a encontrar empleo.',
    'index-cpt-btn':         'Empieza Aquí →',
    'index-returning-body':  'Qué bueno verte de nuevo. EJP está aquí cuando estés listo — ya sea para conocer más sobre tus beneficios sindicales o mantenerte conectado con lo que está pasando.',
    'index-returning-btn1':  'Conoce los Beneficios de Membresía →',
    'index-returning-btn2':  'Mantente en Contacto',
    'index-services-kicker': 'Lo Que Hacemos',
    'index-services-h2':     'Tres Pilares. Una Misión.',
    'index-services-intro':  'EJP reúne servicios de carrera, alianzas con empleadores y capacitación laboral bajo un mismo techo — conectando personas con propósito en el sistema de salud de Nueva York.',
    'index-svc-1-h3':        'Servicios y Apoyo de Carrera',
    'index-svc-1-p':         'Ayuda con currículum, asesoramiento de carrera, preparación para entrevistas y talleres — orientación personalizada para ayudarte a tener éxito.',
    'index-svc-1-link':      'Para Buscadores de Empleo →',
    'index-svc-2-h3':        'Alianzas con Empleadores',
    'index-svc-2-p':         'Trabajamos con empleadores del sector salud en Nueva York para entender sus necesidades de personal y conectarlos con candidatos calificados.',
    'index-svc-2-link':      'Para Empleadores →',
    'index-svc-3-h3':        'Ruta de Capacitación a Carrera',
    'index-svc-3-p':         'Desde la capacitación CPT hasta la colocación, apoyamos el camino completo desde la educación hasta el empleo significativo en salud.',
    'index-svc-3-link':      'Más Información →',
    'index-about-h2':        'Acerca de EJP',
    'index-about-mission-h3':  'Misión y Visión',
    'index-about-mission-p':   'EJP es tu socio a largo plazo en empleo en el sector salud. Apoyamos a los buscadores de empleo con servicios de carrera, preparación y orientación — y conectamos a los empleadores con candidatos motivados y calificados de nuestra red.',
    'index-about-approach-h3': 'Nuestro Enfoque',
    'index-about-approach-p':  'Creemos en la colaboración, el empoderamiento, la innovación y el impacto. Cada servicio que ofrecemos está diseñado para ayudar a los buscadores de empleo a prepararse, crecer y prosperar en la fuerza laboral de salud de Nueva York.',
    'index-about-stories-h3':  'Historias de Éxito',
    'index-pillar-1-h4':     'Colaborar',
    'index-pillar-1-p':      'Asociándonos con empleadores, programas de capacitación y sistemas de apoyo sindical',
    'index-pillar-2-h4':     'Empoderar',
    'index-pillar-2-p':      'Dando a los buscadores de empleo las herramientas, preparación y confianza para triunfar',
    'index-pillar-3-h4':     'Innovar',
    'index-pillar-3-p':      'Modernizando la colocación de la fuerza laboral en salud a través de la tecnología',
    'index-pillar-4-h4':     'Impacto',
    'index-pillar-4-p':      'Resultados medibles — colocaciones, retención, crecimiento profesional',
    'index-events-kicker':   'Eventos',
    'index-events-h2':       'Encuéntranos en Persona',
    'index-events-intro':    'Conéctate con los consejeros de carrera de EJP y empleadores en próximos eventos.',
    'index-evt-1-h3':        'Feria de Carrera de Primavera',
    'index-evt-1-p':         'Fecha por confirmar — Lugar por confirmar',
    'index-evt-2-h3':        'Evento de Contratación en Salud',
    'index-evt-2-p':         'Fecha por confirmar — Lugar por confirmar',
    'index-evt-3-h3':        'Graduación CPT y Colocación',
    'index-evt-3-p':         'Fecha por confirmar — Lugar por confirmar',
    'index-evt-4-h3':        'Taller de Currículum',
    'index-evt-4-p':         'Fecha por confirmar — Lugar por confirmar',
    'index-events-btn':      'Ver Todos los Eventos →',
    'index-contact-h2':      'Contacto / Obtener Ayuda',
    'index-contact-intro':   'Estamos aquí para ayudar. Comunícate con el equipo adecuado.',
    'index-contact-1-h3':    'Consultas de Buscadores de Empleo',
    'index-contact-1-p':     'Preguntas sobre servicios de carrera, ayuda con currículum o cómo empezar',
    'index-contact-1-btn':   'Contactar Servicios de Carrera',
    'index-contact-2-h3':    'Consultas de Empleadores',
    'index-contact-2-p':     'Interesado en contratar o asociarse con EJP',
    'index-contact-2-btn':   'Contactar Relaciones con Empleadores',
    'index-contact-3-h3':    'Consultas de Alianzas',
    'index-contact-3-p':     'Conviértete en una organización comunitaria o socio proveedor',
    'index-contact-3-btn':   'Contactar Alianzas',
    // ── job-seekers.html ──────────────────────────────────────────
    'js-hero-h1':            'Construyendo la Fuerza Laboral de Salud del Mañana',
    'js-hero-p':             'Como parte del Fondo de Capacitación y Empleo de 1199SEIU, EJP proporciona a los buscadores de empleo recursos y apoyo para construir una carrera en el sector salud.',
    'js-kicker-get-started': 'Comenzar',
    'js-wizard-h2':          '¿Cómo Podemos Ayudarte?',
    'js-wizard-intro':       'Selecciona la opción que mejor describe lo que buscas.',
    'js-wizard-jobs-h3':     'Estoy Buscando Trabajo',
    'js-wizard-jobs-p':      'Explora puestos de salud disponibles y envía tu currículum a empleadores en toda Nueva York.',
    'js-wizard-support-h3':  'Busco Apoyo de Carrera',
    'js-wizard-support-p':   'Accede a asesoramiento de carrera, ayuda con currículum, preparación para entrevistas, programas de capacitación y más.',
    'js-wizard-back':        '← Atrás',
    'js-wizard-member-h3':   'Soy Miembro del Sindicato',
    'js-wizard-member-sub':  'Incluyendo graduados de CPT',
    'js-wizard-member-p':    'Conéctate con un consejero de carrera que puede ayudar con colocación, asesoramiento y más.',
    'js-wizard-member-btn':  'Obtener Apoyo de Carrera →',
    'js-wizard-nonmember-h3':  'No Soy Miembro del Sindicato',
    'js-wizard-nonmember-p':   'Conoce los beneficios de la membresía en 1199SEIU y cómo acceder a los servicios de carrera.',
    'js-wizard-nonmember-btn': 'Más Información →',
    'js-wizard-browse-h3':   'Explorar Puestos Disponibles',
    'js-wizard-browse-p':    'Busca vacantes de salud y envía tu currículum directamente a los empleadores.',
    'js-wizard-browse-btn':  'Ver Empleos →',
    'js-form-member-h3':     'Te conectamos con los servicios de carrera',
    'js-form-member-p':      'Completa el formulario y un consejero de carrera te contactará en 2 días hábiles para empezar.',
    'js-label-first-name':   'Nombre',
    'js-label-last-name':    'Apellido',
    'js-label-email':        'Correo Electrónico',
    'js-label-phone':        'Teléfono',
    'js-label-member-status':  'Estado de Membresía',
    'js-radio-active-member':  'Miembro Activo del Sindicato',
    'js-radio-cpt-grad':       'Graduado de CPT',
    'js-label-support-type':   '¿Qué tipo de apoyo buscas?',
    'js-checkbox-resume':      'Ayuda con Currículum',
    'js-checkbox-counseling':  'Asesoramiento de Carrera',
    'js-checkbox-interview':   'Preparación para Entrevistas',
    'js-checkbox-placement':   'Colocación / Emparejamiento de Empleo',
    'js-checkbox-workshop':    'Taller / Capacitación',
    'js-btn-connect':          'Conectarme con un Consejero →',
    'js-form-nonmember-h3':    'Estás en el lugar correcto',
    'js-form-nonmember-p':     'Deja tu correo y te enviaremos información sobre cómo acceder a los servicios de carrera — no necesitas membresía para comenzar.',
    'js-label-what-brought':   '¿Qué te trajo aquí?',
    'js-opt-select-one':       '-- Selecciona una opción --',
    'js-opt-looking-job':      'Estoy buscando un empleo en salud',
    'js-opt-training':         'Quiero explorar programas de capacitación',
    'js-opt-heard':            'Escuché sobre 1199SEIU y quiero saber más',
    'js-opt-other':            'Otro',
    'js-btn-send-info':        'Enviarme Más Información →',
    'js-btn-skip':             'Saltar — solo mostrarme lo disponible →',
    'js-benefits-kicker':      'Por qué unirse a 1199SEIU',
    'js-benefits-h2':          'Servicios de Carrera que Te Distinguen',
    'js-benefits-intro':       'Los miembros del sindicato y graduados de CPT tienen acceso a una suite completa de apoyo profesional — desde asesoramiento individual hasta colocación laboral y más.',
    'js-svc-resume-h3':        'Ayuda con Currículum',
    'js-svc-resume-p':         'Obtén ayuda para crear un currículum profesional que destaque tu capacitación, experiencia y fortalezas.',
    'js-svc-counseling-h3':    'Asesoramiento de Carrera',
    'js-svc-counseling-p':     'Trabaja con un consejero dedicado para identificar tus metas, explorar opciones y construir un plan.',
    'js-svc-interview-h3':     'Preparación para Entrevistas',
    'js-svc-interview-p':      'Practica entrevistas, recibe retroalimentación y desarrolla la confianza para causar una buena impresión.',
    'js-svc-workshops-h3':     'Talleres y Desarrollo de Habilidades',
    'js-svc-workshops-p':      'Únete a sesiones grupales sobre estrategias de búsqueda de empleo, desarrollo profesional y preparación laboral.',
    'js-svc-placement-h3':     'Apoyo de Colocación',
    'js-svc-placement-p':      'Conéctate con empleadores que buscan profesionales de salud calificados a través de nuestra red.',
    'js-svc-security-h3':      'Fondo de Seguridad Laboral',
    'js-svc-security-p':       'Si has sido despedido, accede a asistencia de reempleo y servicios de carrera prioritarios.',
    'js-member-btn-login':     'Ya eres miembro? Inicia sesión en MyTEF →',
    'js-member-btn-join':      '¿No eres miembro? Aprende cómo unirte →',
    'js-mytef-h2':             'Portal MyTEF',
    'js-mytef-intro':          'Tu centro de capacitación y empleo — gestiona tus herramientas de desarrollo profesional en un solo lugar.',
    'js-mytef-f1-h3':          'Inscríbete en Clases',
    'js-mytef-f1-p':           'Explora e inscríbete en programas de capacitación disponibles',
    'js-mytef-f2-h3':          'Solicita Programas',
    'js-mytef-f2-p':           'Envía solicitudes para oportunidades de avance profesional',
    'js-mytef-f3-h3':          'Sube tu Currículum',
    'js-mytef-f3-p':           'Mantén tu currículum en archivo para emparejamiento con empleadores',
    'js-mytef-f4-h3':          'Consulta Reembolsos',
    'js-mytef-f4-p':           'Verifica el estado de tus reembolsos de matrícula y gastos',
    'js-mytef-login-btn':      'Iniciar Sesión en el Portal MyTEF →',
    // ── employers.html ────────────────────────────────────────────
    'emp-hero-h1':           'Encuentra Personal de Salud Calificado',
    'emp-hero-p':            'Cada año, miles de neoyorquinos eligen el sector salud no porque sea un trabajo, sino porque es una vocación. EJP te conecta con candidatos calificados, motivados, verificados y listos para cubrir tus vacantes.',
    'emp-why-h2':            'Por Qué Asociarte con EJP',
    'emp-why-intro':         'Trabajamos con empleadores del sector salud en Nueva York para entender sus necesidades específicas de personal y conectarlos con candidatos calificados de nuestra red.',
    'emp-svc-cpt-h3':        'Candidatos Capacitados en CPT',
    'emp-svc-cpt-p':         'Accede a una cartera de graduados capacitados en 10 ocupaciones de salud — desde enfermería y salud aliada hasta roles técnicos y administrativos.',
    'emp-svc-screened-h3':   'Pre-Seleccionados y Preparados',
    'emp-svc-screened-p':    'Nuestros candidatos han completado capacitación, recibido asesoramiento de carrera y están listos para trabajar. No son solicitantes sin experiencia — son profesionales motivados.',
    'emp-svc-partner-h3':    'Alianza Continua',
    'emp-svc-partner-p':     'EJP no es un servicio de una sola vez. Construimos relaciones duraderas con empleadores para apoyar las necesidades continuas de personal y desarrollo de la fuerza laboral.',
    'emp-how-h2':            'Cómo Trabajar con Nosotros',
    'emp-vacancies-h3':      'Enviar Vacantes de Empleo',
    'emp-vacancies-p':       'Publica tus vacantes directamente a nuestro grupo de candidatos calificados. Te conectaremos con profesionales capacitados en CPT.',
    'emp-vacancies-btn':     'Enviar una Vacante →',
    'emp-partner-h3':        'Convertirte en Proveedor Asociado',
    'emp-partner-p':         'Únete a nuestra red de empleadores del sector salud comprometidos con el desarrollo de la fuerza laboral y la contratación comunitaria.',
    'emp-partner-link':      'Solicitar ser Socio →',
    'emp-events-h3':         'Asistir a Eventos de Contratación',
    'emp-events-p':          'Conoce candidatos calificados en persona en nuestras ferias de carrera y eventos de contratación en toda Nueva York.',
    'emp-events-link':       'Ver Próximos Eventos →',
    'emp-contact-h3':        'Contactar Relaciones con Empleadores',
    'emp-contact-p':         '¿Tienes preguntas sobre asociarte con EJP? Nuestro equipo de relaciones con empleadores está aquí para ayudar.',
    'emp-contact-link':      'Ponerse en Contacto →',
    'emp-stats-h2':          'En Números',
    'emp-stat-1-h3':         'Candidatos Capacitados',
    'emp-stat-1-p':          'Participantes de CPT listos para carreras en salud',
    'emp-stat-2-h3':         'Ocupaciones',
    'emp-stat-2-p':          'En enfermería, técnica y salud aliada',
    'emp-stat-3-h3':         'Tasa de Colocación',
    'emp-stat-3-p':          'Dato por confirmar',
    'emp-stat-4-h3':         'Empleadores Asociados',
    'emp-stat-4-p':          'Dato por confirmar',
    'emp-vacancy-modal-h2':  'Cuéntanos sobre tu Vacante',
    'emp-vacancy-modal-p':   'Envía los detalles de tu vacante y nuestro equipo de relaciones con empleadores te contactará en 48 horas.',
    'emp-label-org':         'Nombre de la Organización',
    'emp-label-your-name':   'Tu Nombre',
    'emp-label-job-title':   'Título del Puesto / Tu Rol',
    'emp-label-work-email':  'Correo de Trabajo',
    'emp-label-phone':       'Teléfono',
    'emp-label-role-type':   'Tipo de Puesto Necesario',
    'emp-opt-select':        '-- Seleccionar --',
    'emp-label-openings':    'Número de Vacantes',
    'emp-label-notes':       'Notas Adicionales',
    'emp-checkbox-hiring':   '¿Interesado en asistir a un evento de contratación?',
    'emp-btn-submit':        'Enviar Vacante →',
    'emp-contact-modal-h2':  'Contactar Relaciones con Empleadores',
    'emp-contact-modal-p':   '¿Tienes una pregunta sobre asociarte con EJP? Te responderemos en 2 días hábiles.',
    'emp-label-first':       'Nombre',
    'emp-label-last':        'Apellido',
    'emp-label-org2':        'Organización',
    'emp-label-message':     '¿Cómo podemos ayudar?',
    'emp-btn-send':          'Enviar Mensaje →',
    'emp-placeholder-name':  'Nombre y apellido',
    // ── events.html ───────────────────────────────────────────────
    'evt-hero-h1':           'Eventos y Ferias de Carrera',
    'evt-hero-p':            'Conoce a los consejeros de carrera de EJP y a los empleadores del sector salud en persona. Desde ferias de carrera hasta talleres de currículum, nuestros eventos están diseñados para ayudarte a dar el siguiente paso.',
    'evt-kicker':            'Próximos',
    'evt-h2':                'Próximos Eventos',
    'evt-intro':             'Conéctate con empleadores y consejeros de carrera en nuestros próximos eventos en Nueva York.',
    'evt-month-jun':         'Jun',
    'evt-month-jul-1':       'Jul',
    'evt-month-jul-2':       'Jul',
    'evt-month-aug':         'Ago',
    'evt-1-h3':              'Feria de Carrera de Primavera 2026',
    'evt-1-p':               'Conoce empleadores del sector salud que contratan en enfermería, salud aliada y roles administrativos. Trae tu currículum y viste profesionalmente — entrevistas en el momento disponibles.',
    'evt-1-btn':             'Registrarse →',
    'evt-2-h3':              'Evento de Contratación en Salud',
    'evt-2-p':               'Un evento de contratación enfocado con empleadores asociados que buscan activamente candidatos capacitados en CPT. Se recomienda pre-registro.',
    'evt-2-btn':             'Registrarse →',
    'evt-3-h3':              'Taller de Currículum y Entrevistas',
    'evt-3-p':               'Únete a nuestros consejeros de carrera para un taller práctico sobre mejores prácticas de currículum, técnicas de entrevista y cómo destacarte ante empleadores del sector salud.',
    'evt-3-btn':             'RSVP →',
    'evt-4-h3':              'Ceremonia de Graduación y Colocación CPT',
    'evt-4-p':               'Celebra a los últimos graduados de CPT mientras hacen la transición a carreras en salud. Incluye networking con empleadores y anuncios de colocación.',
    'evt-4-btn':             'Más Información →',
    'evt-disclaimer':        'Detalles de registro próximamente. Las fechas y lugares están sujetos a cambios.',
    'evt-expect-h2':         'Qué Esperar en Nuestros Eventos',
    'evt-expect-intro':      'Ya seas graduado de CPT, miembro del sindicato o nuevo en el sector salud — nuestros eventos están diseñados para ayudarte a conectar, prepararte y avanzar.',
    'evt-exp-1-h3':          'Conoce Empleadores',
    'evt-exp-1-p':           'Conéctate directamente con organizaciones de salud que contratan en toda Nueva York. Muchas de nuestras ferias de carrera incluyen entrevistas en el momento.',
    'evt-exp-2-h3':          'Obtén Apoyo de Carrera',
    'evt-exp-2-p':           'Nuestros consejeros de carrera asisten a cada evento para ofrecer revisiones de currículum, orientación y apoyo individual.',
    'evt-exp-3-h3':          'Construye tu Red',
    'evt-exp-3-p':           'Conoce a otros buscadores de empleo, aprende de quienes ya han conseguido trabajo y forma parte de una comunidad comprometida con tu éxito.',
    'evt-employer-h2':       '¿Eres un Empleador?',
    'evt-employer-p':        'Participa en nuestras ferias de carrera y eventos de contratación para conocer candidatos calificados capacitados en CPT.',
    'evt-employer-btn':      'Asóciate con EJP →',
    'evt-modal-h2':          'Registrarse para Este Evento',
    'evt-label-first':       'Nombre',
    'evt-label-last':        'Apellido',
    'evt-label-email':       'Correo Electrónico',
    'evt-label-phone':       'Teléfono',
    'evt-label-member-q':    '¿Eres miembro del sindicato?',
    'evt-radio-yes-member':  'Sí — miembro de 1199SEIU',
    'evt-radio-yes-cpt':     'Sí — graduado de CPT',
    'evt-radio-no':          'No — aún no soy miembro',
    'evt-radio-not-sure':    'No estoy seguro/a',
    'evt-label-occupation':  '¿En qué ocupación estás interesado/a?',
    'evt-opt-select':        '-- Selecciona una opción --',
    'evt-opt-figuring':      'Aún lo estoy decidiendo',
    'evt-btn-register':      'Completar Registro →',
    // ── why-join.html ─────────────────────────────────────────────
    'wj-hero-h1':            '¿Por Qué Unirse a 1199SEIU?',
    'wj-hero-p':             'El sector salud no es solo un trabajo — es una vocación. Como miembro del sindicato, obtienes el apoyo de carrera, capacitación y recursos para convertir esa vocación en una carrera duradera.',
    'wj-benefits-kicker':    'Beneficios de membresía',
    'wj-benefits-h2':        'Lo Que Obtienes como Miembro del Sindicato',
    'wj-benefits-intro':     'Los miembros de 1199SEIU y los graduados de CPT tienen acceso a una suite completa de servicios de carrera a través del Fondo de Capacitación y Empleo.',
    'wj-svc-counseling-h3':  'Asesoramiento de Carrera Dedicado',
    'wj-svc-counseling-p':   'Trabaja uno a uno con un consejero experimentado que te ayuda a establecer metas, explorar opciones y construir un plan para tu carrera.',
    'wj-svc-resume-h3':      'Apoyo con Currículum y Entrevistas',
    'wj-svc-resume-p':       'Obtén ayuda profesional para crear tu currículum y prepararte para entrevistas para causar una buena impresión.',
    'wj-svc-placement-h3':   'Colocación y Emparejamiento Laboral',
    'wj-svc-placement-p':    'Conéctate con empleadores del sector salud que buscan candidatos calificados a través de la red de empleadores de EJP.',
    'wj-svc-training-h3':    'Capacitación y Desarrollo de Habilidades',
    'wj-svc-training-p':     'Accede a talleres, programas de desarrollo profesional y capacitación para el avance de carrera a través del Fondo.',
    'wj-svc-mytef-h3':       'Acceso al Portal MyTEF',
    'wj-svc-mytef-p':        'Gestiona tu desarrollo profesional en un solo lugar — inscríbete en clases, sube tu currículum, solicita programas y más.',
    'wj-svc-security-h3':    'Fondo de Seguridad Laboral',
    'wj-svc-security-p':     'Si alguna vez eres despedido, accede a asistencia de reempleo y servicios de carrera prioritarios para retomar el camino.',
    'wj-healthcare-kicker':  'La oportunidad',
    'wj-healthcare-h2':      '¿Por Qué el Sector Salud?',
    'wj-healthcare-intro':   'La industria de salud de Nueva York es uno de los sectores más grandes y de más rápido crecimiento del estado.',
    'wj-hc-1-h3':            'Demanda Creciente',
    'wj-hc-1-p':             'Se proyecta que los empleos en salud crezcan significativamente en los próximos años, con miles de nuevas posiciones abriéndose en Nueva York.',
    'wj-hc-2-h3':            'Trabajo Significativo',
    'wj-hc-2-p':             'Las carreras en salud ofrecen la oportunidad de hacer una diferencia real en la vida de las personas todos los días — es un trabajo que importa.',
    'wj-hc-3-h3':            'Avance Profesional',
    'wj-hc-3-p':             'Con la capacitación y el apoyo adecuados, el sector salud ofrece caminos claros de crecimiento — desde puestos de nivel inicial hasta posiciones especializadas.',
    'wj-hc-4-h3':            'Estabilidad y Beneficios',
    'wj-hc-4-p':             'Los empleos sindicales en salud ofrecen salarios competitivos, beneficios integrales y seguridad laboral que otras industrias no pueden igualar.',
    'wj-newsletter-h2':      'Mantente Conectado',
    'wj-newsletter-p':       '¿No listo para unirte todavía? Suscríbete a nuestro boletín para recibir actualizaciones sobre carreras en salud, eventos y oportunidades.',
    'wj-newsletter-btn':     'Suscribirse',
    'wj-newsletter-disclaimer': 'Respetamos tu privacidad. Cancela la suscripción en cualquier momento.',
    'wj-cta-h2':             '¿Listo para Dar el Siguiente Paso?',
    'wj-cta-p':              'Ya sea que estés buscando trabajo o quieras construir una carrera a largo plazo, EJP está aquí para ayudar.',
    'wj-cta-btn-primary':    'Explorar Servicios de Carrera →',
    'wj-cta-btn-secondary':  'Ver Empleos Disponibles →',
    'wj-placeholder-first':  'Nombre',
    'wj-placeholder-email':  'Tu correo electrónico',
    // ── thank-you.html ────────────────────────────────────────────
    'ty-h1':                 'Todo Listo',
    'ty-p1':                 'Gracias por comunicarte. Un miembro del equipo de EJP te dará seguimiento en 2 días hábiles.',
    'ty-card-1-h3':          'Ver Empleos Disponibles',
    'ty-card-1-p':           'Explora las vacantes actuales en empleadores asociados de 1199SEIU.',
    'ty-card-2-h3':          'Ver Próximos Eventos',
    'ty-card-2-p':           'Ferias de carrera, talleres y eventos de contratación cerca de ti.',
    'ty-card-3-h3':          'Conoce los Beneficios de Membresía',
    'ty-card-3-p':           'Ve todos los beneficios disponibles para los miembros de 1199SEIU.',
    'ty-disclaimer':         'Si enviaste un registro de evento, recibirás un correo de confirmación más cerca de la fecha del evento.',
  };

  // Captured English strings (populated from DOM before first translation).
  var _en = {};
  var _enPh = {};

  function capture() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!_en[key]) _en[key] = el.textContent;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (!_enPh[key]) _enPh[key] = el.placeholder;
    });
  }

  function applyTranslations(lang) {
    var isEs = lang === 'es';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = isEs ? es[key] : _en[key];
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = isEs ? es[key] : _enPh[key];
      if (val !== undefined) el.placeholder = val;
    });

    // Update <html lang> for screen readers
    document.documentElement.lang = lang;

    // Toggle button label
    document.querySelectorAll('.js-lang-toggle').forEach(function (btn) {
      btn.textContent = isEs ? 'English' : 'Español';
    });
  }

  function getLang() {
    try { return localStorage.getItem('ejp_lang') || 'en'; } catch (e) { return 'en'; }
  }

  function init() {
    capture();
    var lang = getLang();
    if (lang === 'es') applyTranslations('es');

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.js-lang-toggle');
      if (!btn) return;
      e.preventDefault();
      var next = getLang() === 'es' ? 'en' : 'es';
      try { localStorage.setItem('ejp_lang', next); } catch (e) {}
      applyTranslations(next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
