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
  chooseAdvisor: string;
  changeAdvisor: string;
  typing: string;
  quickActionDeadlines: string;
  quickActionCV: string;
  quickActionGain: string;
  orpDesc: string;
  benefitsDesc: string;
  socialAssistantDesc: string;

  // News
  sourceORP: string;
  sourceSECO: string;
  sourceCanton: string;

  // Reviews
  reviewsTitle: string;
  leaveReview: string;
  yourName: string;
  yourRating: string;
  yourComment: string;
  submitReview: string;
  chatbotCTA: string;
  chatbotTooltip: string;

  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroPlaceholder: string;
  heroWelcome: string;
  quickCalcIndemnites: string;
  quickDelaisRecherche: string;
  quickFormation: string;
  quickContester: string;
  legalDisclaimer: string;
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
    chooseAdvisor: "Choisissez votre conseiller",
    changeAdvisor: "Changer de conseiller",
    typing: "En train d'écrire...",
    quickActionDeadlines: "Quels sont mes délais ce mois ?",
    quickActionCV: "Aidez-moi pour mon CV",
    quickActionGain: "Comment déclarer un gain intermédiaire ?",
    orpDesc: "LACI, obligations, quotas de recherche",
    benefitsDesc: "Indemnités, gain intermédiaire, délais",
    socialAssistantDesc: "Démarches d'aide sociale",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "Canton",
    reviewsTitle: "Avis & Témoignages",
    leaveReview: "Laisser un avis",
    yourName: "Votre nom",
    yourRating: "Votre note",
    yourComment: "Votre commentaire",
    submitReview: "Envoyer",
    chatbotCTA: "Besoin d'aide ?",
    chatbotTooltip: "Posez vos questions sur l'ORP ici !",
    heroTitle: "Votre assistant expert ORP, Caisse & Aide Sociale",
    heroSubtitle: "Obtenez des réponses immédiates sur vos droits au chômage, vos indemnités de Caisse et les mesures d'aide sociale. Posez votre question ci-dessous.",
    heroPlaceholder: "Posez votre question sur l'ORP, la Caisse ou l'aide sociale ici...",
    heroWelcome: "Bonjour ! Je suis votre assistant virtuel spécialisé. Je peux vous aider à naviguer entre vos obligations ORP, vos versements de Caisse de chômage et vos droits à l'aide sociale. Posez-moi votre question !",
    quickCalcIndemnites: "Calcul des indemnités",
    quickDelaisRecherche: "Recherches d'emploi",
    quickFormation: "Aide sociale subsidiaire",
    quickContester: "Contester une décision",
    legalDisclaimer: "Avertissement : Les réponses sont générées par IA à titre informatif. Elles ne remplacent pas les décisions officielles de l'ORP, de la Caisse de chômage ou des services sociaux compétents.",
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
    sozialdienstBern: "Sozialdienst (Bern)",
    sozialdienstZurich: "Sozialdienst (Zürich)",
    sozialdienstBasel: "Sozialhilfe (Basel)",
    sozialdienstTicino: "Sozialdienst (Tessin)",

    chatbotTitle: "Virtueller Assistent",
    orpAdvisor: "RAV-Berater",
    benefitsAdvisor: "Kassenberater",
    socialAssistant: "Sozialassistent",
    orpWelcome: "Guten Tag! Ich bin Ihr RAV-Berater. Ich kann Ihnen bei AVIG, Pflichten und Suchquoten helfen.",
    benefitsWelcome: "Guten Tag! Ich bin Ihr Kassenberater. Ich kann Ihnen bei Entschädigungen, Zwischenverdienst und Fristen helfen.",
    socialWelcome: "Guten Tag! Ich bin Ihr Sozialassistent. Ich kann Ihnen bei Sozialhilfeverfahren helfen.",
    chooseAdvisor: "Wählen Sie Ihren Berater",
    changeAdvisor: "Berater wechseln",
    typing: "Schreibt...",
    quickActionDeadlines: "Welche Fristen habe ich diesen Monat?",
    quickActionCV: "Helfen Sie mir mit meinem Lebenslauf",
    quickActionGain: "Wie melde ich einen Zwischenverdienst?",
    orpDesc: "AVIG, Pflichten, Suchquoten",
    benefitsDesc: "Entschädigungen, Zwischenverdienst, Fristen",
    socialAssistantDesc: "Sozialhilfeverfahren",

    sourceORP: "RAV",
    sourceSECO: "SECO",
    sourceCanton: "Kanton",
    reviewsTitle: "Bewertungen & Erfahrungsberichte",
    leaveReview: "Bewertung abgeben",
    yourName: "Ihr Name",
    yourRating: "Ihre Bewertung",
    yourComment: "Ihr Kommentar",
    submitReview: "Absenden",
    chatbotCTA: "Brauchen Sie Hilfe?",
    chatbotTooltip: "Stellen Sie hier Ihre Fragen zum RAV!",
    heroTitle: "Ihr Experten-Assistent für RAV, Kasse & Sozialhilfe",
    heroSubtitle: "Erhalten Sie sofortige Antworten zu Ihren Rechten bei Arbeitslosigkeit, Kassenentschädigungen und Sozialhilfemassnahmen. Stellen Sie Ihre Frage unten.",
    heroPlaceholder: "Stellen Sie Ihre Frage zum RAV, zur Kasse oder zur Sozialhilfe hier...",
    heroWelcome: "Guten Tag! Ich bin Ihr spezialisierter virtueller Assistent. Ich kann Ihnen helfen, zwischen Ihren RAV-Pflichten, Kassenleistungen und Sozialhilferechten zu navigieren. Stellen Sie mir Ihre Frage!",
    quickCalcIndemnites: "Berechnung der Entschädigungen",
    quickDelaisRecherche: "Stellensuche",
    quickFormation: "Subsidiäre Sozialhilfe",
    quickContester: "Entscheid anfechten",
    legalDisclaimer: "Hinweis: Die Antworten werden durch KI zu Informationszwecken generiert. Sie ersetzen nicht die offiziellen Entscheide des RAV, der Arbeitslosenkasse oder der zuständigen Sozialdienste.",
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
    sozialdienstBern: "Servizio sociale (Berna)",
    sozialdienstZurich: "Servizio sociale (Zurigo)",
    sozialdienstBasel: "Assistenza sociale (Basilea)",
    sozialdienstTicino: "Servizio sociale (Ticino)",

    chatbotTitle: "Assistente virtuale",
    orpAdvisor: "Consulente URC",
    benefitsAdvisor: "Consulente Cassa",
    socialAssistant: "Assistente Sociale",
    orpWelcome: "Buongiorno! Sono il vostro consulente URC. Posso aiutarvi con la LADI, gli obblighi e le quote di ricerca.",
    benefitsWelcome: "Buongiorno! Sono il vostro consulente Cassa. Posso aiutarvi con le indennità, il guadagno intermedio e le scadenze.",
    socialWelcome: "Buongiorno! Sono il vostro assistente sociale. Posso aiutarvi con le procedure di aiuto sociale.",
    chooseAdvisor: "Scegliete il vostro consulente",
    changeAdvisor: "Cambia consulente",
    typing: "Sta scrivendo...",
    quickActionDeadlines: "Quali sono le mie scadenze questo mese?",
    quickActionCV: "Aiutatemi con il mio CV",
    quickActionGain: "Come dichiarare un guadagno intermedio?",
    orpDesc: "LADI, obblighi, quote di ricerca",
    benefitsDesc: "Indennità, guadagno intermedio, scadenze",
    socialAssistantDesc: "Procedure di aiuto sociale",

    sourceORP: "URC",
    sourceSECO: "SECO",
    sourceCanton: "Cantone",
    reviewsTitle: "Recensioni & Testimonianze",
    leaveReview: "Lascia una recensione",
    yourName: "Il tuo nome",
    yourRating: "La tua valutazione",
    yourComment: "Il tuo commento",
    submitReview: "Invia",
    chatbotCTA: "Hai bisogno di aiuto?",
    chatbotTooltip: "Fai le tue domande sull'URC qui!",
    heroTitle: "Il vostro assistente esperto URC, Cassa & Aiuto Sociale",
    heroSubtitle: "Ottenete risposte immediate sui vostri diritti alla disoccupazione, le indennità della Cassa e le misure di aiuto sociale. Ponete la vostra domanda qui sotto.",
    heroPlaceholder: "Ponete la vostra domanda sull'URC, la Cassa o l'aiuto sociale qui...",
    heroWelcome: "Buongiorno! Sono il vostro assistente virtuale specializzato. Posso aiutarvi a navigare tra i vostri obblighi URC, i versamenti della Cassa di disoccupazione e i vostri diritti all'aiuto sociale.",
    quickCalcIndemnites: "Calcolo delle indennità",
    quickDelaisRecherche: "Ricerca di lavoro",
    quickFormation: "Aiuto sociale sussidiario",
    quickContester: "Contestare una decisione",
    legalDisclaimer: "Avvertenza: Le risposte sono generate dall'IA a scopo informativo. Non sostituiscono le decisioni ufficiali dell'URC, della Cassa di disoccupazione o dei servizi sociali competenti.",
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
    sozialdienstBern: "Social Services (Bern)",
    sozialdienstZurich: "Social Services (Zürich)",
    sozialdienstBasel: "Social Services (Basel)",
    sozialdienstTicino: "Social Services (Ticino)",

    chatbotTitle: "Virtual Assistant",
    orpAdvisor: "ORP Advisor",
    benefitsAdvisor: "Benefits Advisor",
    socialAssistant: "Social Assistant",
    orpWelcome: "Hello! I'm your ORP advisor. I can help you with LACI law, assignments, and search quotas.",
    benefitsWelcome: "Hello! I'm your Benefits advisor. I can help you with indemnities, interim earnings, and deadlines.",
    socialWelcome: "Hello! I'm your Social assistant. I can help you with social aid procedures.",
    chooseAdvisor: "Choose your advisor",
    changeAdvisor: "Change advisor",
    typing: "Typing...",
    quickActionDeadlines: "What are my deadlines this month?",
    quickActionCV: "Help me with my CV",
    quickActionGain: "How to declare interim earnings?",
    orpDesc: "LACI law, obligations, search quotas",
    benefitsDesc: "Indemnities, interim earnings, deadlines",
    socialAssistantDesc: "Social aid procedures",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "Canton",
    reviewsTitle: "Reviews & Testimonials",
    leaveReview: "Leave a review",
    yourName: "Your name",
    yourRating: "Your rating",
    yourComment: "Your comment",
    submitReview: "Submit",
    chatbotCTA: "Need help?",
    chatbotTooltip: "Ask your questions about the PES here!",
    heroTitle: "Your Expert ORP & Social Assistant",
    heroSubtitle: "Get immediate answers about your rights, benefits, and reintegration measures. Ask your question below.",
    heroPlaceholder: "Ask your question about unemployment or your rights here...",
    heroWelcome: "Hello! I'm your virtual assistant specialized in the Swiss social system. I can help you understand your rights at the ORP, calculate your benefits, or guide you through your procedures. Ask me your question!",
    quickCalcIndemnites: "Calculate benefits",
    quickDelaisRecherche: "Search deadlines",
    quickFormation: "Training measures",
    quickContester: "Contest a decision",
    legalDisclaimer: "Disclaimer: Responses are AI-generated for informational purposes only and do not replace official decisions from the ORP or the Unemployment Fund.",
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
    sozialdienstBern: "Serviços sociais (Berna)",
    sozialdienstZurich: "Serviços sociais (Zurique)",
    sozialdienstBasel: "Serviços sociais (Basileia)",
    sozialdienstTicino: "Serviços sociais (Ticino)",

    chatbotTitle: "Assistente Virtual",
    orpAdvisor: "Conselheiro ORP",
    benefitsAdvisor: "Conselheiro Caixa",
    socialAssistant: "Assistente Social",
    orpWelcome: "Olá! Sou seu conselheiro ORP. Posso ajudá-lo com a LACI, obrigações e cotas de pesquisa.",
    benefitsWelcome: "Olá! Sou seu conselheiro Caixa. Posso ajudá-lo com indemnizações, ganho intermediário e prazos.",
    socialWelcome: "Olá! Sou seu assistente social. Posso ajudá-lo com os procedimentos de ajuda social.",
    chooseAdvisor: "Escolha o seu conselheiro",
    changeAdvisor: "Mudar de conselheiro",
    typing: "A escrever...",
    quickActionDeadlines: "Quais são os meus prazos este mês?",
    quickActionCV: "Ajude-me com o meu CV",
    quickActionGain: "Como declarar um ganho intermediário?",
    orpDesc: "LACI, obrigações, cotas de pesquisa",
    benefitsDesc: "Indemnizações, ganho intermediário, prazos",
    socialAssistantDesc: "Procedimentos de ajuda social",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "Cantão",
    reviewsTitle: "Avaliações & Testemunhos",
    leaveReview: "Deixar uma avaliação",
    yourName: "Seu nome",
    yourRating: "Sua nota",
    yourComment: "Seu comentário",
    submitReview: "Enviar",
    chatbotCTA: "Precisa de ajuda?",
    chatbotTooltip: "Faça suas perguntas sobre o ORP aqui!",
    heroTitle: "Seu Assistente Especialista ORP & Social",
    heroSubtitle: "Obtenha respostas imediatas sobre seus direitos, indemnizações e medidas de reinserção. Faça sua pergunta abaixo.",
    heroPlaceholder: "Faça sua pergunta sobre desemprego ou seus direitos aqui...",
    heroWelcome: "Olá! Sou seu assistente virtual especializado no sistema social suíço. Posso ajudá-lo a entender seus direitos no ORP, calcular suas indemnizações ou orientá-lo em seus procedimentos.",
    quickCalcIndemnites: "Cálculo das indemnizações",
    quickDelaisRecherche: "Prazos de pesquisa",
    quickFormation: "Medidas de formação",
    quickContester: "Contestar uma decisão",
    legalDisclaimer: "Aviso: As respostas são geradas por IA a título informativo e não substituem as decisões oficiais do ORP ou da Caixa de Desemprego.",
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
    sozialdienstBern: "Servicios sociales (Berna)",
    sozialdienstZurich: "Servicios sociales (Zúrich)",
    sozialdienstBasel: "Servicios sociales (Basilea)",
    sozialdienstTicino: "Servicios sociales (Tesino)",

    chatbotTitle: "Asistente Virtual",
    orpAdvisor: "Consejero ORP",
    benefitsAdvisor: "Consejero Caja",
    socialAssistant: "Asistente Social",
    orpWelcome: "¡Hola! Soy su consejero ORP. Puedo ayudarle con la LACI, obligaciones y cuotas de búsqueda.",
    benefitsWelcome: "¡Hola! Soy su consejero Caja. Puedo ayudarle con indemnizaciones, ganancia intermedia y plazos.",
    socialWelcome: "¡Hola! Soy su asistente social. Puedo ayudarle con los procedimientos de ayuda social.",
    chooseAdvisor: "Elija su consejero",
    changeAdvisor: "Cambiar de consejero",
    typing: "Escribiendo...",
    quickActionDeadlines: "¿Cuáles son mis plazos este mes?",
    quickActionCV: "Ayúdeme con mi CV",
    quickActionGain: "¿Cómo declarar una ganancia intermedia?",
    orpDesc: "LACI, obligaciones, cuotas de búsqueda",
    benefitsDesc: "Indemnizaciones, ganancia intermedia, plazos",
    socialAssistantDesc: "Procedimientos de ayuda social",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "Cantón",
    reviewsTitle: "Opiniones & Testimonios",
    leaveReview: "Dejar una opinión",
    yourName: "Su nombre",
    yourRating: "Su calificación",
    yourComment: "Su comentario",
    submitReview: "Enviar",
    chatbotCTA: "¿Necesita ayuda?",
    chatbotTooltip: "¡Haga sus preguntas sobre la ORP aquí!",
    heroTitle: "Su Asistente Experto ORP & Social",
    heroSubtitle: "Obtenga respuestas inmediatas sobre sus derechos, indemnizaciones y medidas de reinserción. Haga su pregunta a continuación.",
    heroPlaceholder: "Haga su pregunta sobre el desempleo o sus derechos aquí...",
    heroWelcome: "¡Hola! Soy su asistente virtual especializado en el sistema social suizo. Puedo ayudarle a comprender sus derechos en la ORP, calcular sus indemnizaciones o guiarle en sus trámites.",
    quickCalcIndemnites: "Cálculo de indemnizaciones",
    quickDelaisRecherche: "Plazos de búsqueda",
    quickFormation: "Medidas de formación",
    quickContester: "Impugnar una decisión",
    legalDisclaimer: "Aviso: Las respuestas son generadas por IA con fines informativos y no sustituyen las decisiones oficiales de la ORP o de la Caja de Desempleo.",
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
    sozialdienstBern: "Shërbimet sociale (Bernë)",
    sozialdienstZurich: "Shërbimet sociale (Cyrih)",
    sozialdienstBasel: "Shërbimet sociale (Bazel)",
    sozialdienstTicino: "Shërbimet sociale (Tiçino)",

    chatbotTitle: "Asistenti Virtual",
    orpAdvisor: "Këshilltar ORP",
    benefitsAdvisor: "Këshilltar Arke",
    socialAssistant: "Asistent Social",
    orpWelcome: "Përshëndetje! Jam këshilltari juaj ORP. Mund t'ju ndihmoj me LACI, detyrimet dhe kuotat e kërkimit.",
    benefitsWelcome: "Përshëndetje! Jam këshilltari juaj i Arkës. Mund t'ju ndihmoj me dëmshpërblimet, fitimin e ndërmjetëm dhe afatet.",
    socialWelcome: "Përshëndetje! Jam asistenti juaj social. Mund t'ju ndihmoj me procedurat e ndihmës sociale.",
    chooseAdvisor: "Zgjidhni këshilltarin tuaj",
    changeAdvisor: "Ndryshoni këshilltarin",
    typing: "Duke shkruar...",
    quickActionDeadlines: "Cilat janë afatet e mia këtë muaj?",
    quickActionCV: "Më ndihmoni me CV-në time",
    quickActionGain: "Si të deklaroj një fitim të ndërmjetëm?",
    orpDesc: "LACI, detyrimet, kuotat e kërkimit",
    benefitsDesc: "Dëmshpërblimet, fitimi i ndërmjetëm, afatet",
    socialAssistantDesc: "Procedurat e ndihmës sociale",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "Kantoni",
    reviewsTitle: "Vlerësime & Dëshmi",
    leaveReview: "Lini një vlerësim",
    yourName: "Emri juaj",
    yourRating: "Vlerësimi juaj",
    yourComment: "Komenti juaj",
    submitReview: "Dërgo",
    chatbotCTA: "Keni nevojë për ndihmë?",
    chatbotTooltip: "Bëni pyetjet tuaja për ORP këtu!",
    heroTitle: "Asistenti juaj ekspert ORP & Social",
    heroSubtitle: "Merrni përgjigje të menjëhershme mbi të drejtat tuaja, dëmshpërblimet dhe masat e riintegrimit. Bëni pyetjen tuaj më poshtë.",
    heroPlaceholder: "Bëni pyetjen tuaj për papunësinë ose të drejtat tuaja këtu...",
    heroWelcome: "Përshëndetje! Jam asistenti juaj virtual i specializuar në sistemin social zviceran. Mund t'ju ndihmoj të kuptoni të drejtat tuaja në ORP, të llogarisni dëmshpërblimet ose t'ju udhëzoj në procedurat tuaja.",
    quickCalcIndemnites: "Llogaritja e dëmshpërblimeve",
    quickDelaisRecherche: "Afatet e kërkimit",
    quickFormation: "Masat e formimit",
    quickContester: "Kontestoni një vendim",
    legalDisclaimer: "Paralajmërim: Përgjigjet janë gjeneruar nga IA për qëllime informative dhe nuk zëvendësojnë vendimet zyrtare të ORP ose Arkës së Papunësisë.",
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
    sozialdienstBern: "الخدمات الاجتماعية (برن)",
    sozialdienstZurich: "الخدمات الاجتماعية (زيورخ)",
    sozialdienstBasel: "الخدمات الاجتماعية (بازل)",
    sozialdienstTicino: "الخدمات الاجتماعية (تيتشينو)",

    chatbotTitle: "المساعد الافتراضي",
    orpAdvisor: "مستشار ORP",
    benefitsAdvisor: "مستشار الصندوق",
    socialAssistant: "مساعد اجتماعي",
    orpWelcome: "مرحباً! أنا مستشار ORP الخاص بك. يمكنني مساعدتك في قانون LACI والالتزامات وحصص البحث.",
    benefitsWelcome: "مرحباً! أنا مستشار الصندوق الخاص بك. يمكنني مساعدتك في التعويضات والأرباح المؤقتة والمواعيد النهائية.",
    socialWelcome: "مرحباً! أنا مساعدك الاجتماعي. يمكنني مساعدتك في إجراءات المساعدة الاجتماعية.",
    chooseAdvisor: "اختر مستشارك",
    changeAdvisor: "تغيير المستشار",
    typing: "يكتب...",
    quickActionDeadlines: "ما هي مواعيدي النهائية هذا الشهر؟",
    quickActionCV: "ساعدني في سيرتي الذاتية",
    quickActionGain: "كيف أعلن عن أرباح مؤقتة؟",
    orpDesc: "قانون LACI، الالتزامات، حصص البحث",
    benefitsDesc: "التعويضات، الأرباح المؤقتة، المواعيد النهائية",
    socialAssistantDesc: "إجراءات المساعدة الاجتماعية",

    sourceORP: "ORP",
    sourceSECO: "SECO",
    sourceCanton: "الكانتون",
    reviewsTitle: "التقييمات والشهادات",
    leaveReview: "اترك تقييماً",
    yourName: "اسمك",
    yourRating: "تقييمك",
    yourComment: "تعليقك",
    submitReview: "إرسال",
    chatbotCTA: "هل تحتاج مساعدة؟",
    chatbotTooltip: "!اطرح أسئلتك حول مكتب العمل هنا",
    heroTitle: "مساعدك الخبير في ORP والشؤون الاجتماعية",
    heroSubtitle: "احصل على إجابات فورية حول حقوقك وتعويضاتك وإجراءات إعادة الإدماج. اطرح سؤالك أدناه.",
    heroPlaceholder: "اطرح سؤالك حول البطالة أو حقوقك هنا...",
    heroWelcome: "مرحباً! أنا مساعدك الافتراضي المتخصص في النظام الاجتماعي السويسري. يمكنني مساعدتك في فهم حقوقك في ORP، حساب تعويضاتك أو إرشادك في إجراءاتك.",
    quickCalcIndemnites: "حساب التعويضات",
    quickDelaisRecherche: "مواعيد البحث",
    quickFormation: "تدابير التكوين",
    quickContester: "الطعن في قرار",
    legalDisclaimer: "تنبيه: يتم إنشاء الإجابات بواسطة الذكاء الاصطناعي لأغراض إعلامية فقط ولا تحل محل القرارات الرسمية لـ ORP أو صندوق البطالة.",
  },
};
