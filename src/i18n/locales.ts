export type Language = "fr" | "de" | "it" | "en" | "pt" | "es" | "sq" | "ar";

export const languageNames: Record<Language, string> = {
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  en: "English",
  pt: "Português",
  es: "Español",
  sq: "Shqip",
  ar: "العربية",
};

export const rtlLanguages: Language[] = ["ar"];

type TranslationKeys = {
  // General
  dashboardTitle: string;
  dashboardSubtitle: string;
  access: string;
  readMore: string;
  guideButton: string;
  lastUpdated: string;
  close: string;
  send: string;
  typeMessage: string;

  // Pillars
  adminTitle: string;
  adminDesc: string;
  jobsTitle: string;
  jobsDesc: string;
  socialTitle: string;
  socialDesc: string;
  newsTitle: string;
  newsDesc: string;

  // Admin links
  jobRoom: string;
  eServices: string;
  unemploymentFund: string;

  // Job links
  jobPlatforms: string;
  cvTools: string;
  freePhoto: string;

  // Social links
  cantonalServices: string;
  healthInsurance: string;
  housingAid: string;
  hospiceGeneral: string;
  csrVaud: string;
  sozialdienstBern: string;
  sozialdienstZurich: string;
  sozialdienstBasel: string;
  sozialdienstTicino: string;

  // Chatbot
  chatbotTitle: string;
  orpAdvisor: string;
  benefitsAdvisor: string;
  socialAssistant: string;
  orpWelcome: string;
  benefitsWelcome: string;
  socialWelcome: string;

  // News
  sourceORP: string;
  sourceSECO: string;
  sourceCanton: string;
};

export const translations: Record<Language, TranslationKeys> = {
  fr: {
    dashboardTitle: "Tableau de bord du chercheur d'emploi",
    dashboardSubtitle: "Votre assistant pour la recherche d'emploi en Suisse",
    access: "Accéder",
    readMore: "Lire plus",
    guideButton: "🎯 Découvrir le guide interactif",
    lastUpdated: "Dernière mise à jour",
    close: "Fermer",
    send: "Envoyer",
    typeMessage: "Tapez votre message...",

    adminTitle: "Mon Administration",
    adminDesc: "Gérez vos démarches administratives liées au chômage",
    jobsTitle: "Recherche d'emploi & Outils",
    jobsDesc: "Trouvez un emploi et créez votre CV professionnel",
    socialTitle: "Aide Sociale & Soutien",
    socialDesc: "Accédez aux aides sociales et au soutien disponible",
    newsTitle: "Actualités & Mesures ORP",
    newsDesc: "Restez informé des dernières mesures et actualités",

    jobRoom: "Job-Room",
    eServices: "E-Services",
    unemploymentFund: "Caisse de Chômage",

    jobPlatforms: "Plateformes d'emploi",
    cvTools: "Outils CV",
    freePhoto: "Photo gratuite",

    cantonalServices: "Services sociaux cantonaux",
    healthInsurance: "Subventions assurance-maladie",
    housingAid: "Aide au logement",
    hospiceGeneral: "Hospice Général (GE)",
    csrVaud: "CSR (Vaud)",
    sozialdienstBern: "Sozialdienst (Berne)",
    sozialdienstZurich: "Sozialdienst (Zurich)",
    sozialdienstBasel: "Sozialhilfe (Bâle)",
    sozialdienstTicino: "Servizio sociale (Tessin)",

    chatbotTitle: "Assistant virtuel",
    orpAdvisor: "Conseiller ORP",
    benefitsAdvisor: "Conseiller Caisse",
    socialAssistant: "Assistant Social",
    orpWelcome: "Bonjour ! Je suis votre conseiller ORP. Je peux vous aider avec la LACI, vos obligations et vos quotas de recherche.",
    benefitsWelcome: "Bonjour ! Je suis votre conseiller Caisse. Je peux vous aider avec les indemnités, le gain intermédiaire et les délais.",
    socialWelcome: "Bonjour ! Je suis votre assistant social. Je peux vous aider avec les démarches d'aide sociale.",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "Canton",
  },
  de: {
    dashboardTitle: "Dashboard für Stellensuchende",
    dashboardSubtitle: "Ihr Assistent für die Jobsuche in der Schweiz",
    access: "Zugriff",
    readMore: "Mehr lesen",
    guideButton: "🎯 Interaktiven Leitfaden entdecken",
    lastUpdated: "Zuletzt aktualisiert",
    close: "Schliessen",
    send: "Senden",
    typeMessage: "Nachricht eingeben...",

    adminTitle: "Meine Verwaltung",
    adminDesc: "Verwalten Sie Ihre administrativen Schritte zur Arbeitslosigkeit",
    jobsTitle: "Jobsuche & Tools",
    jobsDesc: "Finden Sie eine Stelle und erstellen Sie Ihren professionellen Lebenslauf",
    socialTitle: "Sozialhilfe & Unterstützung",
    socialDesc: "Zugang zu Sozialhilfe und verfügbarer Unterstützung",
    newsTitle: "Neuigkeiten & RAV-Massnahmen",
    newsDesc: "Bleiben Sie über die neuesten Massnahmen und Nachrichten informiert",

    jobRoom: "Job-Room",
    eServices: "E-Services",
    unemploymentFund: "Arbeitslosenkasse",

    jobPlatforms: "Jobplattformen",
    cvTools: "Lebenslauf-Tools",
    freePhoto: "Kostenloses Foto",

    cantonalServices: "Kantonale Sozialdienste",
    healthInsurance: "Krankenkassen-Subventionen",
    housingAid: "Wohnhilfe",
    hospiceGeneral: "Hospice Général (GE)",
    csrVaud: "CSR (Waadt)",

    chatbotTitle: "Virtueller Assistent",
    orpAdvisor: "RAV-Berater",
    benefitsAdvisor: "Kassenberater",
    socialAssistant: "Sozialassistent",
    orpWelcome: "Guten Tag! Ich bin Ihr RAV-Berater. Ich kann Ihnen bei AVIG, Pflichten und Suchquoten helfen.",
    benefitsWelcome: "Guten Tag! Ich bin Ihr Kassenberater. Ich kann Ihnen bei Entschädigungen, Zwischenverdienst und Fristen helfen.",
    socialWelcome: "Guten Tag! Ich bin Ihr Sozialassistent. Ich kann Ihnen bei Sozialhilfeverfahren helfen.",

    sourceORP: "RAV",
    sourceSECO: "SECO",
    sourceCanton: "Kanton",
  },
  it: {
    dashboardTitle: "Dashboard per chi cerca lavoro",
    dashboardSubtitle: "Il vostro assistente per la ricerca di lavoro in Svizzera",
    access: "Accedi",
    readMore: "Leggi di più",
    guideButton: "🎯 Scopri la guida interattiva",
    lastUpdated: "Ultimo aggiornamento",
    close: "Chiudi",
    send: "Invia",
    typeMessage: "Scrivi un messaggio...",

    adminTitle: "La mia amministrazione",
    adminDesc: "Gestisci le tue pratiche amministrative legate alla disoccupazione",
    jobsTitle: "Ricerca di lavoro & Strumenti",
    jobsDesc: "Trova un lavoro e crea il tuo CV professionale",
    socialTitle: "Aiuto Sociale & Sostegno",
    socialDesc: "Accedi agli aiuti sociali e al sostegno disponibile",
    newsTitle: "Novità & Misure URC",
    newsDesc: "Rimani informato sulle ultime misure e novità",

    jobRoom: "Job-Room",
    eServices: "E-Services",
    unemploymentFund: "Cassa di disoccupazione",

    jobPlatforms: "Piattaforme di lavoro",
    cvTools: "Strumenti CV",
    freePhoto: "Foto gratuita",

    cantonalServices: "Servizi sociali cantonali",
    healthInsurance: "Sussidi assicurazione malattia",
    housingAid: "Aiuto alloggio",
    hospiceGeneral: "Hospice Général (GE)",
    csrVaud: "CSR (Vaud)",

    chatbotTitle: "Assistente virtuale",
    orpAdvisor: "Consulente URC",
    benefitsAdvisor: "Consulente Cassa",
    socialAssistant: "Assistente Sociale",
    orpWelcome: "Buongiorno! Sono il vostro consulente URC. Posso aiutarvi con la LADI, gli obblighi e le quote di ricerca.",
    benefitsWelcome: "Buongiorno! Sono il vostro consulente Cassa. Posso aiutarvi con le indennità, il guadagno intermedio e le scadenze.",
    socialWelcome: "Buongiorno! Sono il vostro assistente sociale. Posso aiutarvi con le procedure di aiuto sociale.",

    sourceORP: "URC",
    sourceSECO: "SECO",
    sourceCanton: "Cantone",
  },
  en: {
    dashboardTitle: "Job Seeker Dashboard",
    dashboardSubtitle: "Your assistant for job searching in Switzerland",
    access: "Access",
    readMore: "Read more",
    guideButton: "🎯 Discover the interactive guide",
    lastUpdated: "Last updated",
    close: "Close",
    send: "Send",
    typeMessage: "Type your message...",

    adminTitle: "My Administration",
    adminDesc: "Manage your administrative steps related to unemployment",
    jobsTitle: "Job Search & Tools",
    jobsDesc: "Find a job and create your professional CV",
    socialTitle: "Social Support & Aid",
    socialDesc: "Access available social aid and support",
    newsTitle: "News & ORP Measures",
    newsDesc: "Stay informed about the latest measures and news",

    jobRoom: "Job-Room",
    eServices: "E-Services",
    unemploymentFund: "Unemployment Fund",

    jobPlatforms: "Job platforms",
    cvTools: "CV Tools",
    freePhoto: "Free Photo",

    cantonalServices: "Cantonal Social Services",
    healthInsurance: "Health insurance subsidies",
    housingAid: "Housing aid",
    hospiceGeneral: "Hospice Général (GE)",
    csrVaud: "CSR (Vaud)",

    chatbotTitle: "Virtual Assistant",
    orpAdvisor: "ORP Advisor",
    benefitsAdvisor: "Benefits Advisor",
    socialAssistant: "Social Assistant",
    orpWelcome: "Hello! I'm your ORP advisor. I can help you with LACI law, assignments, and search quotas.",
    benefitsWelcome: "Hello! I'm your Benefits advisor. I can help you with indemnities, interim earnings, and deadlines.",
    socialWelcome: "Hello! I'm your Social assistant. I can help you with social aid procedures.",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "Canton",
  },
  pt: {
    dashboardTitle: "Painel do Candidato a Emprego",
    dashboardSubtitle: "Seu assistente para a procura de emprego na Suíça",
    access: "Acessar",
    readMore: "Ler mais",
    guideButton: "🎯 Descubra o guia interativo",
    lastUpdated: "Última atualização",
    close: "Fechar",
    send: "Enviar",
    typeMessage: "Digite sua mensagem...",

    adminTitle: "Minha Administração",
    adminDesc: "Gerencie seus trâmites administrativos relacionados ao desemprego",
    jobsTitle: "Procura de Emprego & Ferramentas",
    jobsDesc: "Encontre um emprego e crie seu CV profissional",
    socialTitle: "Apoio Social & Assistência",
    socialDesc: "Acesse as ajudas sociais e o apoio disponível",
    newsTitle: "Notícias & Medidas ORP",
    newsDesc: "Fique informado sobre as últimas medidas e notícias",

    jobRoom: "Job-Room",
    eServices: "E-Services",
    unemploymentFund: "Caixa de Desemprego",

    jobPlatforms: "Plataformas de emprego",
    cvTools: "Ferramentas CV",
    freePhoto: "Foto gratuita",

    cantonalServices: "Serviços sociais cantonais",
    healthInsurance: "Subsídios de seguro de saúde",
    housingAid: "Ajuda habitacional",
    hospiceGeneral: "Hospice Général (GE)",
    csrVaud: "CSR (Vaud)",

    chatbotTitle: "Assistente Virtual",
    orpAdvisor: "Conselheiro ORP",
    benefitsAdvisor: "Conselheiro Caixa",
    socialAssistant: "Assistente Social",
    orpWelcome: "Olá! Sou seu conselheiro ORP. Posso ajudá-lo com a LACI, obrigações e cotas de pesquisa.",
    benefitsWelcome: "Olá! Sou seu conselheiro Caixa. Posso ajudá-lo com indemnizações, ganho intermediário e prazos.",
    socialWelcome: "Olá! Sou seu assistente social. Posso ajudá-lo com os procedimentos de ajuda social.",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "Cantão",
  },
  es: {
    dashboardTitle: "Panel del Buscador de Empleo",
    dashboardSubtitle: "Su asistente para la búsqueda de empleo en Suiza",
    access: "Acceder",
    readMore: "Leer más",
    guideButton: "🎯 Descubrir la guía interactiva",
    lastUpdated: "Última actualización",
    close: "Cerrar",
    send: "Enviar",
    typeMessage: "Escriba su mensaje...",

    adminTitle: "Mi Administración",
    adminDesc: "Gestione sus trámites administrativos relacionados con el desempleo",
    jobsTitle: "Búsqueda de Empleo & Herramientas",
    jobsDesc: "Encuentre un empleo y cree su CV profesional",
    socialTitle: "Ayuda Social & Apoyo",
    socialDesc: "Acceda a las ayudas sociales y al apoyo disponible",
    newsTitle: "Noticias & Medidas ORP",
    newsDesc: "Manténgase informado sobre las últimas medidas y noticias",

    jobRoom: "Job-Room",
    eServices: "E-Services",
    unemploymentFund: "Caja de Desempleo",

    jobPlatforms: "Plataformas de empleo",
    cvTools: "Herramientas CV",
    freePhoto: "Foto gratuita",

    cantonalServices: "Servicios sociales cantonales",
    healthInsurance: "Subsidios de seguro médico",
    housingAid: "Ayuda para vivienda",
    hospiceGeneral: "Hospice Général (GE)",
    csrVaud: "CSR (Vaud)",

    chatbotTitle: "Asistente Virtual",
    orpAdvisor: "Consejero ORP",
    benefitsAdvisor: "Consejero Caja",
    socialAssistant: "Asistente Social",
    orpWelcome: "¡Hola! Soy su consejero ORP. Puedo ayudarle con la LACI, obligaciones y cuotas de búsqueda.",
    benefitsWelcome: "¡Hola! Soy su consejero Caja. Puedo ayudarle con indemnizaciones, ganancia intermedia y plazos.",
    socialWelcome: "¡Hola! Soy su asistente social. Puedo ayudarle con los procedimientos de ayuda social.",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "Cantón",
  },
  sq: {
    dashboardTitle: "Paneli i Kërkuesit të Punës",
    dashboardSubtitle: "Asistenti juaj për kërkimin e punës në Zvicër",
    access: "Qasuni",
    readMore: "Lexo më shumë",
    guideButton: "🎯 Zbuloni udhëzuesin interaktiv",
    lastUpdated: "Përditësimi i fundit",
    close: "Mbyll",
    send: "Dërgo",
    typeMessage: "Shkruani mesazhin tuaj...",

    adminTitle: "Administrata Ime",
    adminDesc: "Menaxhoni hapat tuaj administrativë lidhur me papunësinë",
    jobsTitle: "Kërkimi i Punës & Mjete",
    jobsDesc: "Gjeni një punë dhe krijoni CV-në tuaj profesionale",
    socialTitle: "Ndihma Sociale & Mbështetja",
    socialDesc: "Qasuni në ndihmat sociale dhe mbështetjen e disponueshme",
    newsTitle: "Lajme & Masa ORP",
    newsDesc: "Qëndroni të informuar mbi masat dhe lajmet e fundit",

    jobRoom: "Job-Room",
    eServices: "E-Services",
    unemploymentFund: "Arka e Papunësisë",

    jobPlatforms: "Platformat e punës",
    cvTools: "Mjetet CV",
    freePhoto: "Foto falas",

    cantonalServices: "Shërbimet sociale kantonale",
    healthInsurance: "Subvencionet e sigurimit shëndetësor",
    housingAid: "Ndihma për strehim",
    hospiceGeneral: "Hospice Général (GE)",
    csrVaud: "CSR (Vaud)",

    chatbotTitle: "Asistenti Virtual",
    orpAdvisor: "Këshilltar ORP",
    benefitsAdvisor: "Këshilltar Arke",
    socialAssistant: "Asistent Social",
    orpWelcome: "Përshëndetje! Jam këshilltari juaj ORP. Mund t'ju ndihmoj me LACI, detyrimet dhe kuotat e kërkimit.",
    benefitsWelcome: "Përshëndetje! Jam këshilltari juaj i Arkës. Mund t'ju ndihmoj me dëmshpërblimet, fitimin e ndërmjetëm dhe afatet.",
    socialWelcome: "Përshëndetje! Jam asistenti juaj social. Mund t'ju ndihmoj me procedurat e ndihmës sociale.",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "Kantoni",
  },
  ar: {
    dashboardTitle: "لوحة تحكم الباحث عن عمل",
    dashboardSubtitle: "مساعدك للبحث عن عمل في سويسرا",
    access: "الوصول",
    readMore: "اقرأ المزيد",
    guideButton: "🎯 اكتشف الدليل التفاعلي",
    lastUpdated: "آخر تحديث",
    close: "إغلاق",
    send: "إرسال",
    typeMessage: "اكتب رسالتك...",

    adminTitle: "إدارتي",
    adminDesc: "إدارة إجراءاتك الإدارية المتعلقة بالبطالة",
    jobsTitle: "البحث عن عمل والأدوات",
    jobsDesc: "ابحث عن وظيفة وأنشئ سيرتك الذاتية المهنية",
    socialTitle: "المساعدة الاجتماعية والدعم",
    socialDesc: "الوصول إلى المساعدات الاجتماعية والدعم المتاح",
    newsTitle: "الأخبار وإجراءات ORP",
    newsDesc: "ابقَ على اطلاع بآخر الإجراءات والأخبار",

    jobRoom: "Job-Room",
    eServices: "الخدمات الإلكترونية",
    unemploymentFund: "صندوق البطالة",

    jobPlatforms: "منصات التوظيف",
    cvTools: "أدوات السيرة الذاتية",
    freePhoto: "صورة مجانية",

    cantonalServices: "الخدمات الاجتماعية الكانتونية",
    healthInsurance: "إعانات التأمين الصحي",
    housingAid: "المساعدة في السكن",
    hospiceGeneral: "Hospice Général (جنيف)",
    csrVaud: "CSR (فو)",

    chatbotTitle: "المساعد الافتراضي",
    orpAdvisor: "مستشار ORP",
    benefitsAdvisor: "مستشار الصندوق",
    socialAssistant: "مساعد اجتماعي",
    orpWelcome: "مرحباً! أنا مستشار ORP الخاص بك. يمكنني مساعدتك في قانون LACI والالتزامات وحصص البحث.",
    benefitsWelcome: "مرحباً! أنا مستشار الصندوق الخاص بك. يمكنني مساعدتك في التعويضات والأرباح المؤقتة والمواعيد النهائية.",
    socialWelcome: "مرحباً! أنا مساعدك الاجتماعي. يمكنني مساعدتك في إجراءات المساعدة الاجتماعية.",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "الكانتون",
  },
};
