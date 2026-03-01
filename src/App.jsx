import { useState, useEffect, useRef } from "react";

/* ═══════════ DYNAMIC COLOR PALETTES (per-language identity) ═══════════ */

const PALETTES = {
  fr: {
    primary: "#1565C0", primaryL: "#2E86DE", primaryD: "#0D47A1", primaryGlow: "rgba(21,101,192,.12)",
    navActive: "#1565C0", darkPrimary: "#1565C0", darkPrimaryL: "#2E86DE",
    accent: "#C07B1F", accentL: "#D99A3E", accentD: "#9A6218", accentGlow: "rgba(192,123,31,.1)",
    highlight: "#939598", highlightD: "#6b6d70",
    dark: "#0C1220", navy: "#0F1A2E", navyL: "#162240",
    heroFrom: "#1565C0", heroTo: "#0D2B4E",
    grey: "#9EA3A8", greyL: "#C5C9CE", greyD: "#6B7280",
    warmCream: "#FFF8ED", cream: "#FAFBFC", white: "#FFFFFF", offWhite: "#F5F6F8",
    text: "#1A1F2E", textM: "#4A5568", textL: "#718096",
    logoBars: "#939598", logoShape: "#0d4a87", logoAccent: "#939598",
  },
  kr: {
    primary: "#00209f", primaryL: "#1A44CC", primaryD: "#001A80", primaryGlow: "rgba(0,32,159,.12)",
    navActive: "#d21034", darkPrimary: "#f0a500", darkPrimaryL: "#ffb82e",
    accent: "#A8102A", accentL: "#CC2244", accentD: "#8B1A2A", accentGlow: "rgba(168,16,42,.1)",
    highlight: "#f0a500", highlightD: "#016a16",
    dark: "#0A1230", navy: "#0D1A44", navyL: "#122050",
    heroFrom: "#00209f", heroTo: "#0A1230",
    grey: "#9EA3A8", greyL: "#C5C9CE", greyD: "#6B7280",
    warmCream: "#FFF8ED", cream: "#FAFBFC", white: "#FFFFFF", offWhite: "#F5F6F8",
    text: "#1A1F2E", textM: "#4A5568", textL: "#718096",
    logoBars: "#00209f", logoShape: "#d21034", logoAccent: "#f0a500",
  },
  en: {
    primary: "#00875A", primaryL: "#2AAA78", primaryD: "#006644", primaryGlow: "rgba(0,135,90,.12)",
    navActive: "#2d2926", darkPrimary: "#00875A", darkPrimaryL: "#2AAA78",
    accent: "#B8860B", accentL: "#D4A020", accentD: "#8A6508", accentGlow: "rgba(184,134,11,.1)",
    highlight: "#ffb81c", highlightD: "#b88310",
    dark: "#0A1E14", navy: "#0E2820", navyL: "#14352A",
    heroFrom: "#00875A", heroTo: "#0A1E14",
    grey: "#9EA3A8", greyL: "#C5C9CE", greyD: "#6B7280",
    warmCream: "#FFF8ED", cream: "#FAFBFC", white: "#FFFFFF", offWhite: "#F5F6F8",
    text: "#1A1F2E", textM: "#4A5568", textL: "#718096",
    logoBars: "#007749", logoShape: "#2d2926", logoAccent: "#ffb81c",
  },
  ln: {
    primary: "#007fff", primaryL: "#3399ff", primaryD: "#005599", primaryGlow: "rgba(0,127,255,.12)",
    navActive: "#ce1021", darkPrimary: "#007fff", darkPrimaryL: "#3399ff",
    accent: "#f7d618", accentL: "#f9e04a", accentD: "#c4aa10", accentGlow: "rgba(247,214,24,.1)",
    highlight: "#f7d618", highlightD: "#b89e10",
    dark: "#0A142E", navy: "#0E1E42", navyL: "#142850",
    heroFrom: "#007fff", heroTo: "#0A142E",
    grey: "#9EA3A8", greyL: "#C5C9CE", greyD: "#6B7280",
    warmCream: "#FFF8ED", cream: "#FAFBFC", white: "#FFFFFF", offWhite: "#F5F6F8",
    text: "#1A1F2E", textM: "#4A5568", textL: "#718096",
    logoBars: "#007fff", logoShape: "#ce1021", logoAccent: "#f7d618",
  },
};


/* ═══════════ TRANSLATIONS ═══════════ */
const T = {
fr: {
  nav: { home:"Accueil", about:"À propos", aboutShcn:"SHCN", project:"Projet", summary:"Sommaire", governance:"Gouvernance", board:"Conseil", ambassadors:"Ambassadeurs", partners:"Partenaires", media:"Médias", contact:"Contact" },
  hero: {
    tag: "Logement abordable · Inclusif · Durable",
    h1: ["Bâtir et habiter","un logis abordable,","sécuritaire et durable"],
    desc: "La SHCN a été créée pour répondre directement aux questions de discrimination et de racisme liées à l'accès au logement pour les personnes issues des communautés noires. Nous ne voulons pas seulement bâtir des maisons — nous voulons bâtir des communautés.",
    cta: "Découvrir notre mission"
  },
  mission: {
    tag: "Notre raison d'être",
    title: "Mission, vision et valeurs",
    mission: "Développer des solutions d'habitation collective durables pour les individus et les communautés noires afin de créer des milieux de vie de qualité, abordables et sécuritaires.",
    visionLabel: "Notre vision",
    vision: "Être la référence en habitation et créer un avenir où tous les individus des communautés noires ont accès à un logis qui favorise l'épanouissement personnel et social.",
    valuesLabel: "Nos valeurs",
    v1: "La quête de la qualité et l'excellence dans nos projets",
    v2: "Agir dans l'intérêt commun de manière responsable et éthique",
    v3: "Respect, confiance mutuelle et ouverture",
    philosophy: "Un projet « par » la communauté, non « pour » la communauté."
  },
  about: {
    tag: "À propos de la SHCN",
    title: "Plus qu'un développeur immobilier",
    p1: "La SHCN est un acteur clé du logement communautaire qui se distingue par une approche intégrée et innovante, combinant constructions neuves et rénovations, avec un engagement ferme envers le Net Zéro, l'inclusion et la justice sociale.",
    p2: "L'organisme développe des projets qui vont au-delà du simple accès au logement. Son modèle repose sur la création de milieux de vie complets et durables, où les infrastructures résidentielles sont pensées en fonction des besoins des communautés.",
    pillars: [
      { t:"Habitation durable", d:"Constructions écoénergétiques, panneaux solaires, toits verts et bornes de recharge pour une mobilité durable." },
      { t:"Transformation sociale", d:"Gouvernance participative, logements adaptés aux familles, aînés et personnes à mobilité réduite." },
      { t:"Modèle économique", d:"Partenariats stratégiques avec municipalités, investisseurs d'impact et acteurs institutionnels." }
    ],
    quote: "La SHCN incarne une vision militante et communautaire visant à stabiliser les familles noires grâce à des logements salubres et abordables — ce qui a un impact direct sur la réussite scolaire des enfants et la stabilité sociale."
  },
  project: {
    tag: "Le projet Saint-Michel",
    title: "Bâtir des communautés, pas des ghettos",
    subtitle: "Un projet unique et inclusif au cœur du quartier Saint-Michel",
    features: [
      "Accompagné par Bâtir son quartier, au cœur d'un quartier parmi les plus défavorisés au Canada",
      "Logements sociaux et abordables avec mixité sociale et socio-économique",
      "CPE (Centre de la petite enfance), épicerie et complexe sportif au rez-de-chaussée",
      "Épicerie répondant au désert alimentaire local en facilitant l'accès à des produits frais",
      "Jardin communautaire sur le toit avec Vivre Saint-Michel en santé",
      "Salons communautaires à chaque étage pour favoriser le vivre-ensemble",
      "76 % de logements familiaux — 2, 3 et 4 chambres à coucher",
      "Processus accéléré grâce aux pouvoirs exceptionnels de la Loi 31"
    ],
    quote: "On veut des Noirs, des Blancs, des immigrants — que cela reflète le quartier.",
    partnersTag: "Nos appuis",
    partnersTitle: "Appuis d'acteurs reconnus",
    partners: ["Ville de Montréal","SCHL / CMHC","SHQ","Bâtir son quartier","INTERLOGE","CTLC","Fonds FTQ","Arrondissement VSP","Caisse d'économie solidaire","FOHM"]
  },
  summary: {
    tag: "Sommaire exécutif",
    title: "Une initiative novatrice et nécessaire",
    p1: "Fondée en février 2023 par Neil Armand et Evens Abellard, la SHCN est née du constat que les communautés noires sont les moins bien logées au Québec — une réalité documentée depuis 1988.",
    p2: "L'organisme se consacre à résoudre la problématique d'accès au logement pour les personnes issues des communautés noires ainsi qu'aux familles qui vivent de la discrimination au Canada.",
    stat: "Les personnes noires paient en moyenne 16 % de plus que les personnes blanches pour des logements comparables.",
    goals: [
      { t:"Répondre à la demande", d:"Répondre à la demande croissante de logements abordables et sociaux au Québec." },
      { t:"Logements de qualité", d:"Offrir des logements de qualité aux familles qui font face à de la discrimination." },
      { t:"Inclusion sociale", d:"Favoriser l'inclusion sociale et l'égalité des chances en matière de logement." },
      { t:"Modèle reproductible", d:"Créer un modèle durable servant d'inspiration pour d'autres projets au Canada." }
    ]
  },
  board: {
    tag: "Conseil d'administration",
    title: "Leadership représentatif et engagé",
    desc: "Un conseil d'administration majoritairement composé de personnes noires, représentant les principales organisations noires de Montréal — assurant une gestion représentative et communautaire.",
    foundersTag: "Cofondateurs",
    founders: [
      { name:"Neil Armand", role:"Cofondateur et Directeur des Initiatives Stratégiques" },
      { name:"Evens Abellard", role:"Cofondateur" }
    ],
    members: [
      { role:"Présidente du C.A.", name:"Mme Marjorie Villefranche", org:"Maison d'Haïti", desc:"Engagée depuis plus de 30 ans en faveur de l'équité et de la justice sociale." },
      { role:"Vice-Président", name:"M. Allen Alexandre", org:"Centre culturel Afro-canadien de Montréal", desc:"Ancien conseiller politique fédéral, transformateur social et fondateur du CCAM." },
      { role:"Trésorier", name:"Édouard Staco", org:"Sommet Jeunes Afro — SDESJ", desc:"Réseau novateur contribuant à l'essor économique et social du Québec." },
      { role:"Secrétaire", name:"M. Alix Adrien", org:"Conseil des Éducateurs Noirs du Québec", desc:"Soutient l'amélioration continue du système d'éducation du Québec." }
    ]
  },
  ambassadors: {
    tag: "Ambassadeurs",
    title: "Des alliés de valeur",
    members: [
      { name:"Louis-Edgar Jean-François", role:"PDG du Groupe 3737", desc:"Expérience inégalée dans la croissance organisationnelle, le financement et les partenariats stratégiques. Le Groupe 3737 est l'un des groupes communautaires à la croissance la plus rapide au Canada." },
      { name:"Laurent Lévesque", role:"Directeur général du Groupe UTILE", desc:"Référence en matière de logement abordable étudiant au Canada. Son expertise est précieuse pour accélérer nos solutions de logement social." }
    ]
  },
  media: {
    tag: "Dans les médias",
    title: "Reconnaissance et couverture",
    award: { t:"Prix François-Saillant 2024", d:"Décerné par la Caisse d'économie solidaire et le FRAPRU pour reconnaître l'action collective pour faire du droit au logement une réalité au Québec." },
    items: [
      { src:"Radio-Canada · Le 15-18", t:"Mobilisation des communautés noires pour construire des logements abordables" },
      { src:"Le Média des Nouveaux Canadiens", t:"Une Société d'habitation des communautés noires voit le jour à Montréal" },
      { src:"Est Média Montréal", t:"Un second projet résidentiel accéléré grâce aux pouvoirs exceptionnels" },
      { src:"CTLC", t:"Les communautés noires au cœur du renouveau du logement communautaire" },
      { src:"NEOQUÉBEC Radio", t:"Entrevue avec Neil Armand, cofondateur et Dir. des initiatives stratégiques de la SHCN" },
      { src:"FRAPRU", t:"Communiqué : Prix François-Saillant décerné à la SHCN" }
    ]
  },
  contact: {
    tag: "Contactez-nous",
    title: "La communication est essentielle",
    desc: "Notre organisme se consacre au développement de logements abordables et à l'amélioration des conditions d'habitation dans les communautés noires. N'hésitez pas à nous contacter.",
    phone:"+1 438 833-3421", email:"info@shcn.ca",
    address:"3737 boul. Crémazie Est, 3e étage, Montréal (QC) H1Z 2K4",
    hours:"Tous les jours · 8 h – 17 h",
    fN:"Nom", fE:"Courriel", fM:"Message", fB:"Envoyer", fH:"Racontez-nous — nous sommes là pour vous aider."
  },
  footer: {
    full:"SOCIÉTÉ D'HABITATION DES COMMUNAUTÉS NOIRES",
    en:"BLACK COMMUNITY HOUSING SOCIETY (BCHS)",
    tagline:"Bâtir et habiter un logis abordable, sécuritaire et durable",
    nl:"Abonnez-vous à notre infolettre", nlP:"Votre courriel", nlB:"S'abonner",
    copy:"© 2026 SHCN. Tous droits réservés."
  }
},
en: {
  nav: { home:"Home", about:"About", aboutShcn:"BCHS", project:"Project", summary:"Summary", governance:"Governance", board:"Board", ambassadors:"Ambassadors", partners:"Partners", media:"Media", contact:"Contact" },
  hero: {
    tag: "Affordable · Inclusive · Sustainable Housing",
    h1: ["Building and living in","affordable, safe,","and sustainable housing"],
    desc: "The BCHS was created to directly address discrimination and racism in housing access for individuals from Black communities. We don't just want to build houses — we want to build communities.",
    cta: "Discover our mission"
  },
  mission: {
    tag: "Our purpose",
    title: "Mission, vision and values",
    mission: "To develop sustainable collective housing solutions for individuals and Black communities, creating quality, affordable, and safe living environments.",
    visionLabel: "Our vision",
    vision: "To be the benchmark in housing and create a future where all individuals in Black communities have access to housing that fosters personal and social fulfillment.",
    valuesLabel: "Our values",
    v1: "Pursuit of quality and excellence in our projects",
    v2: "Acting in the common interest, responsibly and ethically",
    v3: "Respect, mutual trust, and openness",
    philosophy: "A project \"by\" the community, not \"for\" the community."
  },
  about: {
    tag: "About BCHS",
    title: "More than a real estate developer",
    p1: "The BCHS is a key community housing organization distinguished by an integrated, innovative approach combining new construction and renovations, with a firm commitment to Net Zero, inclusion, and social justice.",
    p2: "The organization develops projects that go beyond simple housing access — creating complete, sustainable living environments designed around community needs.",
    pillars: [
      { t:"Sustainable housing", d:"Energy-efficient construction, solar panels, green roofs, and EV charging for sustainable mobility." },
      { t:"Social transformation", d:"Participatory governance, housing for families, seniors, and persons with reduced mobility." },
      { t:"Economic model", d:"Strategic partnerships with municipalities, impact investors, and institutional stakeholders." }
    ],
    quote: "BCHS embodies a community-driven, activist vision aimed at stabilizing Black families through safe, affordable housing — directly impacting children's academic success and social stability."
  },
  project: {
    tag: "The Saint-Michel Project",
    title: "Building communities, not ghettos",
    subtitle: "A unique and inclusive project in the heart of Saint-Michel",
    features: [
      "Supported by Bâtir son quartier, in the heart of one of Canada's most disadvantaged neighbourhoods",
      "Social and affordable housing with social and socio-economic diversity",
      "Early childhood centre (CPE), grocery store, and sports complex on the ground floor",
      "Grocery store addressing the local food desert with access to fresh, affordable products",
      "Rooftop community garden with Vivre Saint-Michel en santé",
      "Communal living rooms on every floor to foster togetherness",
      "76% family-sized units — 2, 3, and 4 bedrooms",
      "Fast-tracked approval through exceptional powers under Bill 31"
    ],
    quote: "We want Black, white, immigrant residents — reflecting the neighbourhood.",
    partnersTag: "Our supporters",
    partnersTitle: "Recognized housing stakeholders",
    partners: ["City of Montreal","CMHC","SHQ","Bâtir son quartier","INTERLOGE","CHTC","FTQ Fund","VSP Borough","Caisse d'économie solidaire","FOHM"]
  },
  summary: {
    tag: "Executive Summary",
    title: "An innovative and necessary initiative",
    p1: "Founded in February 2023 by Neil Armand and Evens Abellard, the BCHS was born from the finding that Black communities are the worst-housed in Quebec — a reality documented since 1988.",
    p2: "The organization is dedicated to solving housing access issues for individuals from Black communities and families experiencing discrimination in Canada.",
    stat: "Black tenants pay on average 16% more than white tenants for comparable housing.",
    goals: [
      { t:"Meet demand", d:"Respond to the growing demand for affordable and social housing in Quebec." },
      { t:"Quality housing", d:"Provide quality housing to families facing discrimination." },
      { t:"Social inclusion", d:"Promote social inclusion and equal opportunity in housing." },
      { t:"Scalable model", d:"Create a sustainable model to inspire similar projects across Canada." }
    ]
  },
  board: {
    tag: "Board of Directors",
    title: "Representative and committed leadership",
    desc: "A board of directors with a majority of Black members, representing Montreal's major Black organizations — ensuring representative, community-led governance.",
    foundersTag: "Co-founders",
    founders: [
      { name:"Neil Armand", role:"Co-founder & Director of Strategic Initiatives" },
      { name:"Evens Abellard", role:"Co-founder" }
    ],
    members: [
      { role:"Board Chair", name:"Ms. Marjorie Villefranche", org:"Maison d'Haïti", desc:"Committed for over 30 years to equity and social justice." },
      { role:"Vice-Chair", name:"Mr. Allen Alexandre", org:"Afro-Canadian Cultural Centre of Montreal", desc:"Former federal political advisor, social transformer, and CCAM founder." },
      { role:"Treasurer", name:"Édouard Staco", org:"Sommet Jeunes Afro — SDESJ", desc:"Innovative network contributing to Quebec's economic and social development." },
      { role:"Secretary", name:"Mr. Alix Adrien", org:"Quebec Board of Black Educators", desc:"Supports continuous improvement of Quebec's education system." }
    ]
  },
  ambassadors: {
    tag: "Ambassadors",
    title: "Valued allies",
    members: [
      { name:"Louis-Edgar Jean-François", role:"CEO, Groupe 3737", desc:"Unmatched experience in organizational growth, financing, and strategic partnerships. Groupe 3737 is one of Canada's fastest-growing community groups." },
      { name:"Laurent Lévesque", role:"CEO, Groupe UTILE", desc:"Benchmark in student affordable housing in Canada. His expertise is invaluable in advancing our social housing solutions." }
    ]
  },
  media: {
    tag: "In the media",
    title: "Recognition and coverage",
    award: { t:"Prix François-Saillant 2024", d:"Awarded by the Caisse d'économie solidaire and FRAPRU to recognize collective action advancing the right to housing in Quebec." },
    items: [
      { src:"Radio-Canada · Le 15-18", t:"Black community mobilization for affordable housing" },
      { src:"Le Média des Nouveaux Canadiens", t:"A Black Community Housing Society launches in Montreal" },
      { src:"Est Média Montréal", t:"A second residential project fast-tracked through exceptional powers" },
      { src:"CHTC", t:"Black communities at the heart of community housing renewal" },
      { src:"NEOQUÉBEC Radio", t:"Interview with Neil Armand, BCHS co-founder and Dir. of Strategic Initiatives" },
      { src:"FRAPRU", t:"Press release: Prix François-Saillant awarded to BCHS" }
    ]
  },
  contact: {
    tag: "Contact us",
    title: "Communication is key",
    desc: "Our organization is dedicated to developing affordable housing and improving living conditions in Black communities. Don't hesitate to reach out.",
    phone:"+1 438 833-3421", email:"info@shcn.ca",
    address:"3737 Crémazie Blvd East, 3rd floor, Montréal (QC) H1Z 2K4",
    hours:"Every day · 8 AM – 5 PM",
    fN:"Name", fE:"Email", fM:"Message", fB:"Send", fH:"Tell us your story — we're here to help."
  },
  footer: {
    full:"BLACK COMMUNITY HOUSING SOCIETY (BCHS)",
    en:"SOCIÉTÉ D'HABITATION DES COMMUNAUTÉS NOIRES",
    tagline:"Building and living in affordable, safe, and sustainable housing",
    nl:"Subscribe to our newsletter", nlP:"Your email", nlB:"Subscribe",
    copy:"© 2026 BCHS. All rights reserved."
  }
},
kr: {
  nav: { home:"Akèy", about:"Sou nou", aboutShcn:"SHCN", project:"Pwojè", summary:"Rezime", governance:"Gouvènans", board:"Konsèy", ambassadors:"Anbasadè", partners:"Patnè", media:"Medya", contact:"Kontakte nou" },
  hero: {
    tag: "Lojman abòdab · Enklizif · Dirab",
    h1: ["Bati e rete nan","yon kay abòdab,","an sekirite e dirab"],
    desc: "SHCN te kreye pou reponn dirèkteman kesyon diskriminasyon ak rasis ki gen rapò ak aksè nan lojman pou moun ki soti nan kominote nwa yo. Nou pa vle sèlman bati kay — nou vle bati kominote.",
    cta: "Dekouvri misyon nou"
  },
  mission: {
    tag: "Rezon nou egziste",
    title: "Misyon, vizyon ak valè",
    mission: "Devlope solisyon lojman kolektif ki dirab pou moun ak kominote nwa yo pou kreye espas lavi ki gen kalite, abòdab e an sekirite.",
    visionLabel: "Vizyon nou",
    vision: "Vin referans nan lojman e kreye yon avni kote tout moun nan kominote nwa yo gen aksè nan yon kay ki ankouraje epanouisman pèsonèl ak sosyal.",
    valuesLabel: "Valè nou yo",
    v1: "Rechèch kalite ak ekselans nan pwojè nou yo",
    v2: "Aji nan enterè komen yon fason responsab e etik",
    v3: "Respè, konfyans mityèl ak ouvèti",
    philosophy: "Yon pwojè « pa » kominote a, pa « pou » kominote a."
  },
  about: {
    tag: "Sou SHCN",
    title: "Plis pase yon devlopè imobilye",
    p1: "SHCN se yon aktè kle nan lojman kominotè ki distenge tèt li pa yon apwòch entegre e inovatè, ki konbine konstriksyon nèf ak renovasyon, avèk yon angajman fèm anvè Net Zewo, enklizyon ak jistis sosyal.",
    p2: "Òganis la devlope pwojè ki ale pi lwen pase senp aksè nan lojman — li kreye anviwònman lavi konplè e dirab ki konsevwa selon bezwen kominote yo.",
    pillars: [
      { t:"Lojman dirab", d:"Konstriksyon ekoenèjetik avanse, pano solè, do vèt ak bòn rechaj elektrik." },
      { t:"Transfòmasyon sosyal", d:"Gouvènans patisipatif, lojman adapte pou fanmi, granmoun ak moun ki gen andikap." },
      { t:"Modèl ekonomik", d:"Patenarya estratejik ak minisipalite, envestisè enpak ak aktè enstitisyonèl." }
    ],
    quote: "SHCN enkane yon vizyon militan e kominotè ki vize estabilize fanmi nwa yo gras a lojman ki pwòp e abòdab — sa ki gen enpak dirèk sou siksè lekòl timoun yo ak estabilite sosyal."
  },
  project: {
    tag: "Pwojè Saint-Michel",
    title: "Bati kominote, pa geto",
    subtitle: "Yon pwojè inik e enklizif nan kè katye Saint-Michel",
    features: [
      "Akonpaye pa Bâtir son quartier, nan kè youn nan katye ki pi defavorize nan Kanada",
      "Lojman sosyal ak abòdab avèk miksite sosyal ak sosyo-ekonomik",
      "CPE, makèt ak konplèks espòtif nan premye etaj",
      "Makèt ki reponn reyalite dezè alimantè lokal la pou fasilite aksè a pwodui fre",
      "Jaden kominotè sou do kay la avèk Vivre Saint-Michel en santé",
      "Salon kominotè nan chak etaj pou ankouraje viv ansanm",
      "76 % lojman familyal — 2, 3 ak 4 chanm a kouche",
      "Pwosesis akselere gras a pouvwa eksepsyonèl Lwa 31"
    ],
    quote: "Nou vle moun Nwa, moun Blan, imigran — pou sa reflete katye a.",
    partnersTag: "Sipò nou yo",
    partnersTitle: "Aktè rekonèt nan lojman",
    partners: ["Vil Monreyal","SCHL","SHQ","Bâtir son quartier","INTERLOGE","CTLC","Fon FTQ","Awondisman VSP","Caisse d'économie solidaire","FOHM"]
  },
  summary: {
    tag: "Rezime egzekitif",
    title: "Yon inisyativ inovatè e nesesè",
    p1: "Fonde nan mwa fevriye 2023 pa Neil Armand ak Evens Abellard, SHCN te fèt sou konsta ke kominote nwa yo se kominote ki pi mal loje nan Kebèk — yon reyalite ki dokimante depi 1988.",
    p2: "Òganis la konsantre sou rezoud pwoblèm aksè nan lojman pou moun ki soti nan kominote nwa yo ak fanmi ki viv diskriminasyon nan Kanada.",
    stat: "Moun nwa yo peye an mwayèn 16 % plis pase moun blan yo pou lojman konparab.",
    goals: [
      { t:"Reponn demand lan", d:"Reponn demand kap grandi pou lojman abòdab ak sosyal nan Kebèk." },
      { t:"Lojman kalite", d:"Ofri lojman kalite pou fanmi ki fè fas a diskriminasyon." },
      { t:"Enklizyon sosyal", d:"Ankouraje enklizyon sosyal ak egalite chans nan lojman." },
      { t:"Modèl repwodiktib", d:"Kreye yon modèl dirab ki sèvi enspirasyon pou lòt pwojè nan Kanada." }
    ]
  },
  board: {
    tag: "Konsèy administrasyon",
    title: "Lidèchip ki reprezantatif e angaje",
    desc: "Yon konsèy administrasyon ki majorite moun nwa, ki reprezante prensipal òganizasyon nwa Monreyal yo.",
    foundersTag: "Kofondatè",
    founders: [
      { name:"Neil Armand", role:"Kofondatè e Direktè Inisyativ Estratejik" },
      { name:"Evens Abellard", role:"Kofondatè" }
    ],
    members: [
      { role:"Prezidant C.A.", name:"Mme Marjorie Villefranche", org:"Maison d'Haïti", desc:"Angaje depi plis pase 30 an pou ekite ak jistis sosyal." },
      { role:"Vis-Prezidan", name:"M. Allen Alexandre", org:"CCAM", desc:"Ansyen konseye politik federal, transfòmatè sosyal ak fondatè CCAM." },
      { role:"Trezorye", name:"Édouard Staco", org:"Sommet Jeunes Afro — SDESJ", desc:"Rezo inovatè ki kontribye nan esò ekonomik ak sosyal Kebèk." },
      { role:"Sekretè", name:"M. Alix Adrien", org:"QBBE", desc:"Ankouraje amelyorasyon kontini sistèm edikasyon Kebèk." }
    ]
  },
  ambassadors: {
    tag: "Anbasadè",
    title: "Alye ki gen valè",
    members: [
      { name:"Louis-Edgar Jean-François", role:"PDG Groupe 3737", desc:"Eksperyans san parèy nan kwasans òganizasyonèl, finansman ak patenarya estratejik." },
      { name:"Laurent Lévesque", role:"DG Groupe UTILE", desc:"Referans nan lojman abòdab etidyan nan Kanada." }
    ]
  },
  media: {
    tag: "Nan medya yo",
    title: "Rekonesans ak kouvèti",
    award: { t:"Pri François-Saillant 2024", d:"Dekène pa Caisse d'économie solidaire ak FRAPRU pou rekonèt aksyon kolektif pou fè dwa lojman yon reyalite nan Kebèk." },
    items: [
      { src:"Radio-Canada · Le 15-18", t:"Mobilizasyon kominote nwa yo pou bati lojman abòdab" },
      { src:"Le Média des Nouveaux Canadiens", t:"Yon Sosyete abitasyon kominote nwa wè jou nan Monreyal" },
      { src:"Est Média Montréal", t:"Yon dezyèm pwojè rezidansyèl akselere gras a pouvwa eksepsyonèl" },
      { src:"CTLC", t:"Kominote nwa yo nan kè renouvèlman lojman kominotè" },
      { src:"NEOQUÉBEC Radio", t:"Entrevyou avèk Neil Armand, kofondatè SHCN" },
      { src:"FRAPRU", t:"Kominike: Pri François-Saillant dekène a SHCN" }
    ]
  },
  contact: {
    tag: "Kontakte nou",
    title: "Kominikasyon se kle a",
    desc: "Òganis nou an konsantre sou devlopman lojman abòdab ak amelyorasyon kondisyon abitasyon nan kominote nwa yo.",
    phone:"+1 438 833-3421", email:"info@shcn.ca",
    address:"3737 boul. Crémazie Est, 3e étage, Montréal (QC) H1Z 2K4",
    hours:"Chak jou · 8 h – 17 h",
    fN:"Non", fE:"Imèl", fM:"Mesaj", fB:"Voye", fH:"Rakonte nou — nou la pou ede w."
  },
  footer: {
    full:"SOSYETE ABITASYON KOMINOTE NWA YO",
    en:"BLACK COMMUNITY HOUSING SOCIETY (BCHS)",
    tagline:"Bati e rete nan yon kay abòdab, an sekirite e dirab",
    nl:"Abòne nan bilten nou an", nlP:"Imèl ou", nlB:"Abòne",
    copy:"© 2026 SHCN. Tout dwa rezève."
  }
},
ln: {
  nav: { home:"Ndako", about:"Mpo na biso", aboutShcn:"SHCN", project:"Mosala", summary:"Mokuse", governance:"Boyangeli", board:"Likita", ambassadors:"Baambasadè", partners:"Baninga", media:"Ba médias", contact:"Benga biso" },
  hero: {
    tag: "Ndako ya ntalo moke · Ya bato nyonso · Ya libela",
    h1: ["Kotonga mpe kofanda na","ndako ya ntalo moke,","ya kimya mpe ya libela"],
    desc: "SHCN esalemaki mpo na koyanola na mituna ya bokeseni mpe ya bosembo oyo etali kozwa ndako mpo na bato ya mposo ya moindo. Tolingi kotonga te kaka bandako — tolingi kotonga bituka.",
    cta: "Koyeba mosala na biso"
  },
  mission: {
    tag: "Ntina na biso",
    title: "Mosala, emoneli mpe motuya",
    mission: "Kobimisa mayele ya ndako ya lisangá oyo ekoumela mpo na bato mpe bituka ya bato ya mposo ya moindo mpo na kokela bisika ya bomoi ya malamu, ya ntalo moke mpe ya kimya.",
    visionLabel: "Emoneli na biso",
    vision: "Kozala ndakisa na ndako mpe kokela mikolo oyo bato nyonso ya bituka ya bato ya mposo ya moindo bakozwa ndako oyo ekolendisa bokoli na bango.",
    valuesLabel: "Motuya na biso",
    v1: "Koluka malamu mpe bokoni na misala na biso",
    v2: "Kosala mpo na bolamu ya bato nyonso na ndenge ya bosembo",
    v3: "Limemia, elikya mpe bofungoli",
    philosophy: "Mosala « na » biso ya bituka, kasi « mpo na » biso ya bituka te."
  },
  about: {
    tag: "Mpo na SHCN",
    title: "Koleka moto ya kotonga bandako",
    p1: "SHCN ezali mokambi monene ya ndako ya lisangá oyo emibongolaka na nzela ya sika, esangisaka botongoli ya sika na bobongisi, na bokangami makasi na Net Zéro, boyokani mpe sembo ya bato.",
    p2: "Etongeli yango ebimisaka misala oyo elekaka kozwa ndako kaka — ekokela bisika ya bomoi mobimba mpe ya libela oyo etongamá na ndenge ya bosenga ya bituka.",
    pillars: [
      { t:"Ndako ya libela", d:"Botongoli ya makasi na énergie, mwinda ya moi, mitó ya matiti mpe bisika ya kochaje motuka ya kuwa." },
      { t:"Mbongwana ya bato", d:"Boyangeli ya lisanganeli, ndako oyo ebongi mpo na mabota, bankɔkɔ mpe bato oyo bazali na bokono." },
      { t:"Modèle ya mbongo", d:"Boyokani ya makasi na bingumba, batii ya mbongo mpe bakambi ya etongeli." }
    ],
    quote: "SHCN ezali emoneli ya bitumba mpe ya lisangá oyo elingi kostabilize mabota ya bato ya mposo ya moindo na nzela ya ndako ya malamu — oyo ezali na enpak ya solo na boyekoli ya bana mpe na kimya ya lisangá."
  },
  project: {
    tag: "Mosala ya Saint-Michel",
    title: "Kotonga bituka, kasi geto te",
    subtitle: "Mosala ya ndenge moko mpe ya bato nyonso na kati ya kartye Saint-Michel",
    features: [
      "Esungamaka na Bâtir son quartier, na kati ya kartye moko ya bobola mingi na Canada",
      "Ndako ya lisungi mpe ya ntalo moke na bokeseni ya bato mpe ya mbongo",
      "CPE, magazini mpe esika ya masano na etaje ya liboso",
      "Magazini oyo eyanolaka na mokakatano ya esobe ya bilei ya esika yango",
      "Elanga ya lisangá na likolo ya ndako na boyokani na Vivre Saint-Michel en santé",
      "Bisika ya kofanda elongo na etaje nyonso mpo na kofanda malamu elongo",
      "76 % ya bandako ya mabota — bisika 2, 3 mpe 4 ya kolala",
      "Bokambi ya noki na nzela ya nguya ya kokamwa ya Mobeko 31"
    ],
    quote: "Tolingi bato ya mposo ya moindo, bato ya mpembe, bato ya bikólo — mpo yango emonisa kartye.",
    partnersTag: "Lisungi na biso",
    partnersTitle: "Bakambi bayebani na ndako",
    partners: ["Engumba Montréal","SCHL","SHQ","Bâtir son quartier","INTERLOGE","CTLC","Fonds FTQ","Arrondissement VSP","Caisse d'économie solidaire","FOHM"]
  },
  summary: {
    tag: "Mokuse ya bokambi",
    title: "Likanisi ya sika mpe ya ntina",
    p1: "Esalemaki na sanza ya mibale 2023 na Neil Armand mpe Evens Abellard, SHCN ebimaki na koyeba ete bituka ya bato ya mposo ya moindo ezali na ndako mabe mingi na Québec — likambo oyo eyebanaki banda 1988.",
    p2: "Etongeli emipesi na kosilisa mokakatano ya kozwa ndako mpo na bato ya mposo ya moindo mpe mabota oyo ezali koyoka bokeseni na Canada.",
    stat: "Bato ya mposo ya moindo bafutaka 16 % koleka bato ya mposo ya pembe mpo na ndako oyo ekokani.",
    goals: [
      { t:"Koyanola na bosenga", d:"Koyanola na bosenga oyo ezali kokola ya ndako ya ntalo moke na Québec." },
      { t:"Ndako ya malamu", d:"Kopesa ndako ya malamu na mabota oyo ezali kokutana na bokeseni." },
      { t:"Boyokani ya bato", d:"Kolendisa boyokani ya bato mpe bonsomi ndenge moko na ndako." },
      { t:"Ndakisa ya kozongela", d:"Kokela ndakisa ya libela oyo ekopesa likanisi na misala mosusu na Canada." }
    ]
  },
  board: {
    tag: "Likita ya bokambi",
    title: "Bokambi oyo ezali ndakisa mpe emipesi",
    desc: "Likita ya bokambi oyo bato mingi bazali ya mposo ya moindo, bakambi ya bitongeli monene ya bato ya mposo ya moindo na Montréal.",
    foundersTag: "Bakeli",
    founders: [
      { name:"Neil Armand", role:"Mokeli mpe Mokambi ya Mikano ya Makasi" },
      { name:"Evens Abellard", role:"Mokeli" }
    ],
    members: [
      { role:"Mokambi ya C.A.", name:"Mme Marjorie Villefranche", org:"Maison d'Haïti", desc:"Amipesi banda mibu 30 mpo na bosembo." },
      { role:"Mokambi mibale", name:"M. Allen Alexandre", org:"CCAM", desc:"Mopesi toli ya politiki ya kala, mobongoli ya bato mpe mokeli ya CCAM." },
      { role:"Mobateli mbongo", name:"Édouard Staco", org:"SDESJ", desc:"Réseau ya sika oyo esalisaka na bokoli ya Québec." },
      { role:"Mokomi", name:"M. Alix Adrien", org:"QBBE", desc:"Alendisaka bobongisi ya kelasi ya Québec." }
    ]
  },
  ambassadors: {
    tag: "Baambasadè",
    title: "Baninga ya motuya",
    members: [
      { name:"Louis-Edgar Jean-François", role:"PDG Groupe 3737", desc:"Boyebi na bokoli, mbongo mpe boyokani ya makasi." },
      { name:"Laurent Lévesque", role:"DG Groupe UTILE", desc:"Ndakisa na ndako ya ntalo moke mpo na bayekoli na Canada." }
    ]
  },
  media: {
    tag: "Na ba médias",
    title: "Boyebani mpe bansango",
    award: { t:"Mbano François-Saillant 2024", d:"Epesami na Caisse d'économie solidaire mpe FRAPRU mpo na koyebisa mosala ya lisangá mpo na lotomo ya ndako na Québec." },
    items: [
      { src:"Radio-Canada · Le 15-18", t:"Lisangani ya bituka mpo na ndako ya ntalo moke" },
      { src:"Le Média des Nouveaux Canadiens", t:"Etongeli ya ndako ya bituka ya bato ya mposo ya moindo ebimi na Montréal" },
      { src:"Est Média Montréal", t:"Mosala ya mibale ya ndako ya noki na nzela ya nguya ya kokamwa" },
      { src:"CTLC", t:"Bituka ya bato ya mposo ya moindo na kati ya bobongisi ya ndako" },
      { src:"NEOQUÉBEC Radio", t:"Masolo na Neil Armand, mokeli ya SHCN" },
      { src:"FRAPRU", t:"Nsango: Mbano François-Saillant epesami na SHCN" }
    ]
  },
  contact: {
    tag: "Benga biso",
    title: "Kosolola ezali na ntina",
    desc: "Etongeli na biso emipesi na kobimisa ndako ya ntalo moke mpe kobongisa makambo ya kofanda na bituka ya bato ya mposo ya moindo.",
    phone:"+1 438 833-3421", email:"info@shcn.ca",
    address:"3737 boul. Crémazie Est, 3e étage, Montréal (QC) H1Z 2K4",
    hours:"Mikolo nyonso · 8 h – 17 h",
    fN:"Nkómbo", fE:"Imɛli", fM:"Nsango", fB:"Tinda", fH:"Yebisá biso — tozali awa mpo na kosalisa yo."
  },
  footer: {
    full:"ETONGELI YA NDAKO YA BITUKA YA BATO YA MPOSO YA MOINDO",
    en:"BLACK COMMUNITY HOUSING SOCIETY (BCHS)",
    tagline:"Kotonga mpe kofanda na ndako ya ntalo moke, ya kimya mpe ya libela",
    nl:"Komikoma na nsango na biso", nlP:"Imɛli na yo", nlB:"Komikoma",
    copy:"© 2026 SHCN. Makoki nyonso ebatelami."
  }
}
};

const LANGS = [
  { code:"fr", label:"Français", flag:"FR" },
  { code:"kr", label:"Kreyòl", flag:"KR" },
  { code:"en", label:"English", flag:"EN" },
  { code:"ln", label:"Lingála", flag:"LN" }
];

/* ═══════════ LANGUAGE COLORS (from logo variants) ═══════════
   bars  = top/bottom bar color → borders
   shape = main shape color → letter color
   accent = small square → hover color
   ═════════════════════════════════════════════════════════════ */
const LANG_COLORS = {
  fr: { bars:"#939598", shape:"#0d4a87", accent:"#939598" },
  kr: { bars:"#00209f", shape:"#d21034", accent:"#016a16" },
  en: { bars:"#007749", shape:"#2d2926", accent:"#ffb81c" },
  ln: { bars:"#007fff", shape:"#ce1021", accent:"#f7d618" },
};

/* ═══════════ SVG ICONS ═══════════ */
const Icon = {
  arrow: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  phone: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  mail: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  pin: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  menu: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>,
  close: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  award: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  check: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  fb: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  li: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
};

/* ═══════════ GEOMETRIC PATTERN (African-inspired) ═══════════ */
const KentePattern = ({ color = "#1565C0", opacity = 0.04, size = 40 }) => (
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity,pointerEvents:"none"}} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={`kp-${color.replace("#","")}`} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width={size/2} height={size/2} fill="none" stroke={color} strokeWidth=".5"/>
        <rect x={size/2} y={size/2} width={size/2} height={size/2} fill="none" stroke={color} strokeWidth=".5"/>
        <line x1="0" y1="0" x2={size/2} y2={size/2} stroke={color} strokeWidth=".5"/>
        <line x1={size/2} y1="0" x2={size} y2={size/2} stroke={color} strokeWidth=".5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#kp-${color.replace("#","")})`}/>
  </svg>
);

/* ═══════════ COMPONENT ═══════════ */
export default function SHCN() {
  const [lang, setLang] = useState("fr");
  const [scrolled, setScrolled] = useState(false);
  const [mobNav, setMobNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const t = T[lang];
  const p = PALETTES[lang];

  const LOGO_PATHS = { fr:"/logos/SHCN-FR.png", kr:"/logos/SHCN-KR.png", en:"/logos/SHCN-EN.png", ln:"/logos/SHCN-LN.png" };
  const Logo = ({ size = 36 }) => (
    <img src={LOGO_PATHS[lang]} alt={lang==="en"?"BCHS":"SHCN"} style={{height:size,width:"auto",display:"block"}}/>
  );

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 60);
      const secs = ["home","mission","about","project","summary","board","ambassadors","media","contact"];
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && el.getBoundingClientRect().top < 200) { setActiveSection(secs[i]); break; }
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobNav(false); };

  const [openDrop, setOpenDrop] = useState(null);
  const [hoveredLang, setHoveredLang] = useState(null);
  const [mobLangOpen, setMobLangOpen] = useState(false);
  const lc = LANG_COLORS[lang];

  const navGroups = [
    { id:"home", l:t.nav.home },
    { id:"about", l:t.nav.about, children: [
      { id:"about", l:t.nav.aboutShcn },
      { id:"project", l:t.nav.project },
      { id:"summary", l:t.nav.summary }
    ]},
    { id:"board", l:t.nav.governance, children: [
      { id:"board", l:t.nav.board },
      { id:"ambassadors", l:t.nav.ambassadors },
      { id:"partners", l:t.nav.partners }
    ]},
    { id:"media", l:t.nav.media },
    { id:"contact", l:t.nav.contact }
  ];

  // Flat list for mobile menu
  const allSections = [
    { id:"home", l:t.nav.home }, { id:"about", l:t.nav.aboutShcn }, { id:"project", l:t.nav.project },
    { id:"summary", l:t.nav.summary }, { id:"board", l:t.nav.board }, { id:"ambassadors", l:t.nav.ambassadors },
    { id:"partners", l:t.nav.partners }, { id:"media", l:t.nav.media }, { id:"contact", l:t.nav.contact }
  ];

  const Tag = ({ children, light }) => (
    <div style={{display:"inline-flex",alignItems:"center",gap:8,fontSize:".68rem",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:light?p.darkPrimaryL:p.accent,marginBottom:"1.5rem"}}>
      <span style={{width:24,height:2,background:light?p.darkPrimaryL:p.accent,borderRadius:1}}/>
      {children}
    </div>
  );

  const Heading = ({ children, light }) => (
    <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.12,color:light?"#fff":p.text,marginBottom:"1rem"}}>{children}</h2>
  );

  const s = { // shared styles
    sec: { padding:"5.5rem 2rem" },
    wrap: { maxWidth:1180, margin:"0 auto" },
    grid2: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem" },
  };

  return (
    <div style={{fontFamily:"'Libre Franklin',system-ui,sans-serif",color:p.text,background:p.cream,overflowX:"hidden",WebkitFontSmoothing:"antialiased",transition:"all .5s ease"}}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Libre+Franklin:wght@300;400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        ::selection{background:${p.primary};color:#fff;}
        body{overflow-x:hidden;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .hero-em{background:linear-gradient(180deg, ${p.highlight}, ${p.highlightD});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .fi{animation:fadeIn .8s ease both} .fi1{animation:fadeIn .8s ease .15s both} .fi2{animation:fadeIn .8s ease .3s both}
        .pf{font-family:'Playfair Display',Georgia,serif}
        a{text-decoration:none;color:inherit;}
        @media(max-width:960px){
          .g2{grid-template-columns:1fr!important}
          .g4{grid-template-columns:1fr 1fr!important}
          .hm{display:none!important}
          .sp{padding:4rem 1.5rem!important}
        }
        @media(min-width:961px){.sm{display:none!important}}
        @media(max-width:600px){.g4{grid-template-columns:1fr!important}}
      `}</style>

      {/* ─── COMPACT NAV ─── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:110,
        background:"rgba(255,255,255,.97)",
        backdropFilter:"blur(14px) saturate(1.6)",
        borderBottom:`1px solid ${p.primary}10`,
        transition:"all .4s cubic-bezier(.16,1,.3,1)"
      }}>
        <div style={{maxWidth:1180,margin:"0 auto",padding:"0 2rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          {/* Logo */}
          <a onClick={()=>scrollTo("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
            <Logo size={32}/>
            <span className="pf" style={{fontSize:"1.2rem",fontWeight:800,color:p.primary,letterSpacing:".02em",lineHeight:1,transition:"color .4s"}}>{lang==="en"?"BCHS":"SHCN"}</span>
          </a>

          {/* Center: Nav Links */}
          <div className="hm" style={{display:"flex",alignItems:"center",gap:"1.25rem"}}>
            {navGroups.map(g=> g.children ? (
              <div key={g.id} style={{position:"relative"}} onMouseEnter={()=>setOpenDrop(g.id)} onMouseLeave={()=>setOpenDrop(null)}>
                <a onClick={()=>scrollTo(g.id)} style={{
                  cursor:"pointer",fontSize:".68rem",fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",
                  color:g.children.some(c=>c.id===activeSection)?p.navActive:p.textL,
                  transition:"color .3s",display:"flex",alignItems:"center",gap:3
                }}>
                  {g.l}
                  <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{opacity:.4}}><polyline points="6 9 12 15 18 9"/></svg>
                </a>
                {openDrop===g.id && (
                  <div style={{position:"absolute",top:"100%",left:"-12px",paddingTop:6,zIndex:50}}>
                    <div style={{background:"rgba(255,255,255,.98)",backdropFilter:"blur(16px)",border:`1px solid ${p.primary}10`,boxShadow:"0 8px 30px rgba(0,0,0,.08)",padding:"6px 0",minWidth:170,borderRadius:4}}>
                      {g.children.map(c=>(
                        <a key={c.id} onClick={()=>{scrollTo(c.id);setOpenDrop(null)}} style={{
                          display:"block",padding:"7px 16px",fontSize:".7rem",fontWeight:activeSection===c.id?600:500,
                          color:activeSection===c.id?p.navActive:p.textM,
                          cursor:"pointer",transition:"all .2s",letterSpacing:".03em"
                        }}
                          onMouseEnter={e=>e.target.style.background=`${p.primary}0D`}
                          onMouseLeave={e=>e.target.style.background="transparent"}
                        >{c.l}</a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a key={g.id} onClick={()=>scrollTo(g.id)} style={{
                cursor:"pointer",fontSize:".68rem",fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",
                color:activeSection===g.id?p.navActive:p.textL,
                transition:"color .3s"
              }}>{g.l}</a>
            ))}
          </div>

          {/* Right: Lang switcher + CTA */}
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div className="hm" style={{display:"flex",alignItems:"center",gap:3}}>
              {LANGS.map(l=>{
                const lCol = LANG_COLORS[l.code];
                const isActive = lang===l.code;
                const isHov = hoveredLang===l.code;
                return (
                  <div key={l.code} style={{position:"relative"}}>
                    <button
                      onClick={()=>setLang(l.code)}
                      onMouseEnter={()=>setHoveredLang(l.code)}
                      onMouseLeave={()=>setHoveredLang(null)}
                      style={{
                        width:24,height:24,
                        background:isActive?`${lCol.bars}18`:isHov?lCol.accent:"transparent",
                        border:`1.5px solid ${isActive?`${lCol.bars}50`:lCol.bars}`,
                        cursor:"pointer",
                        display:"flex",alignItems:"center",justifyContent:"center",
                        borderRadius:3,
                        opacity:isActive?0.5:1,
                        transition:"all .25s",
                      }}>
                      <span style={{
                        fontFamily:"'Libre Franklin',system-ui,sans-serif",
                        fontSize:8,fontWeight:800,
                        letterSpacing:".03em",
                        color:lCol.shape,
                      }}>{l.flag}</span>
                    </button>
                    {isHov && !isActive && (
                      <div style={{
                        position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",
                        marginTop:6,padding:"4px 10px",
                        background:p.dark,color:"#fff",
                        fontSize:".6rem",fontWeight:600,letterSpacing:".04em",
                        whiteSpace:"nowrap",borderRadius:3,
                        pointerEvents:"none",animation:"fadeIn .15s ease",
                        zIndex:60
                      }}>
                        {l.label}
                        <div style={{position:"absolute",top:-3,left:"50%",transform:"translateX(-50%) rotate(45deg)",width:6,height:6,background:p.dark}}/>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <button className="hm" onClick={()=>scrollTo("contact")} style={{
              padding:"6px 16px",background:p.navActive,color:"#fff",border:"none",cursor:"pointer",
              fontSize:".62rem",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",
              fontFamily:"inherit",borderRadius:3,transition:"all .3s",marginLeft:4
            }}>{t.nav.contact}</button>
            <div className="sm" style={{display:"flex",alignItems:"center",gap:8}}>
              {/* Mobile lang dropdown */}
              <div style={{position:"relative"}}>
                <button onClick={()=>setMobLangOpen(!mobLangOpen)} style={{
                  display:"flex",alignItems:"center",gap:4,padding:"4px 8px",
                  background:`${LANG_COLORS[lang].bars}15`,
                  border:`1.5px solid ${LANG_COLORS[lang].bars}`,
                  borderRadius:3,cursor:"pointer",fontFamily:"inherit"
                }}>
                  <span style={{fontSize:9,fontWeight:800,color:LANG_COLORS[lang].shape,letterSpacing:".03em"}}>{lang.toUpperCase()}</span>
                  <svg width="8" height="8" fill="none" stroke={LANG_COLORS[lang].shape} strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {mobLangOpen && (
                  <div style={{
                    position:"absolute",top:"100%",right:0,marginTop:6,
                    background:"rgba(255,255,255,.98)",backdropFilter:"blur(16px)",
                    border:`1px solid ${p.primary}10`,boxShadow:"0 8px 24px rgba(0,0,0,.1)",
                    borderRadius:4,padding:"4px 0",minWidth:130,zIndex:60
                  }}>
                    {LANGS.map(l=>{
                      const lCol = LANG_COLORS[l.code];
                      const isActive = lang===l.code;
                      return (
                        <button key={l.code} onClick={()=>{setLang(l.code);setMobLangOpen(false)}} style={{
                          display:"flex",alignItems:"center",gap:8,width:"100%",
                          padding:"8px 14px",background:isActive?`${lCol.bars}12`:"transparent",
                          border:"none",cursor:"pointer",fontFamily:"inherit",
                          transition:"background .2s"
                        }}>
                          <span style={{
                            width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",
                            border:`1.5px solid ${lCol.bars}`,borderRadius:2,
                            background:isActive?`${lCol.bars}20`:"transparent"
                          }}>
                            <span style={{fontSize:7,fontWeight:800,color:lCol.shape}}>{l.flag}</span>
                          </span>
                          <span style={{fontSize:".72rem",fontWeight:isActive?700:500,color:isActive?lCol.shape:p.textM}}>{l.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* Hamburger */}
              <button onClick={()=>setMobNav(true)} style={{background:"none",border:"none",cursor:"pointer",color:p.text}}>{Icon.menu}</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobNav && (
        <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(12,18,32,.97)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"5rem 2rem 3rem",animation:"fadeIn .3s ease"}}>
          <button onClick={()=>setMobNav(false)} style={{position:"absolute",top:20,right:20,background:"none",border:"none",color:"#fff",cursor:"pointer"}}>{Icon.close}</button>
          {/* Language switcher at top */}
          <div style={{display:"flex",gap:8}}>
            {LANGS.map(l=>{
              const lCol = LANG_COLORS[l.code];
              return (
                <button key={l.code} onClick={()=>{setLang(l.code);setMobNav(false)}} style={{
                  padding:"8px 16px",fontSize:".78rem",fontWeight:lang===l.code?700:400,
                  background:lang===l.code?`${lCol.bars}25`:"rgba(255,255,255,.06)",
                  color:lang===l.code?lCol.shape:"rgba(255,255,255,.6)",
                  border:lang===l.code?`2px solid ${lCol.bars}`:"2px solid transparent",
                  cursor:"pointer",fontFamily:"inherit",borderRadius:3,transition:"all .3s"
                }}>{l.label}</button>
              );
            })}
          </div>
          {/* Nav links center */}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"1.25rem"}}>
            <a onClick={()=>scrollTo("home")} className="pf" style={{fontSize:"1.6rem",color:"#fff",cursor:"pointer"}}>{t.nav.home}</a>
            {/* About group */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:".6rem"}}>
              <a onClick={()=>scrollTo("about")} className="pf" style={{fontSize:"1.6rem",color:"#fff",cursor:"pointer"}}>{t.nav.about}</a>
              <div style={{display:"flex",gap:12}}>
                <a onClick={()=>scrollTo("project")} style={{fontSize:".8rem",fontWeight:500,color:"rgba(255,255,255,.45)",cursor:"pointer",letterSpacing:".04em"}}>{t.nav.project}</a>
                <span style={{color:"rgba(255,255,255,.15)"}}>·</span>
                <a onClick={()=>scrollTo("summary")} style={{fontSize:".8rem",fontWeight:500,color:"rgba(255,255,255,.45)",cursor:"pointer",letterSpacing:".04em"}}>{t.nav.summary}</a>
              </div>
            </div>
            {/* Board group */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:".6rem"}}>
              <a onClick={()=>scrollTo("board")} className="pf" style={{fontSize:"1.6rem",color:"#fff",cursor:"pointer"}}>{t.nav.board}</a>
              <a onClick={()=>scrollTo("ambassadors")} style={{fontSize:".8rem",fontWeight:500,color:"rgba(255,255,255,.45)",cursor:"pointer",letterSpacing:".04em"}}>{t.nav.ambassadors}</a>
            </div>
            <a onClick={()=>scrollTo("media")} className="pf" style={{fontSize:"1.6rem",color:"#fff",cursor:"pointer"}}>{t.nav.media}</a>
            <a onClick={()=>scrollTo("contact")} className="pf" style={{fontSize:"1.6rem",color:"#fff",cursor:"pointer"}}>{t.nav.contact}</a>
          </div>
          {/* Social icons at bottom */}
          <div style={{display:"flex",gap:16,alignItems:"center"}}>
            <a href="https://www.facebook.com/p/Soci%C3%A9t%C3%A9-dhabitation-des-communaut%C3%A9s-noires-SHCN-61560044163035/" target="_blank" rel="noopener noreferrer" style={{width:44,height:44,background:`${p.darkPrimary}28`,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,color:p.darkPrimaryL}}>{Icon.fb}</a>
            <a href="https://www.linkedin.com/company/soci%C3%A9t%C3%A9-d-habitation-des-communaut%C3%A9s-noires" target="_blank" rel="noopener noreferrer" style={{width:44,height:44,background:`${p.darkPrimary}28`,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,color:p.darkPrimaryL}}>{Icon.li}</a>
          </div>
        </div>
      )}

      {/* ─── HERO ─── */}
      <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",background:`linear-gradient(150deg, ${p.heroFrom} 0%, ${p.heroTo} 50%, ${p.dark} 100%)`,overflow:"hidden",transition:"background .6s"}}>
        <div style={{position:"absolute",inset:0}}>
          <div style={{position:"absolute",top:"10%",left:"5%",width:400,height:400,borderRadius:"50%",background:`radial-gradient(circle, ${p.darkPrimary+"20"} 0%, transparent 70%)`,filter:"blur(60px)"}}/>
          <div style={{position:"absolute",bottom:"15%",right:"10%",width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle, ${p.darkPrimary+"20"} 0%, transparent 70%)`,filter:"blur(50px)"}}/>
          <KentePattern color="#fff" opacity={0.02} size={50}/>
        </div>
        <div style={{...s.wrap,padding:"8rem 2rem 6rem",position:"relative",zIndex:1,width:"100%"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,fontSize:".68rem",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:p.highlight,marginBottom:"1.5rem"}}>
            <span style={{width:24,height:2,background:p.highlight,borderRadius:1}}/>
            {t.hero.tag}
          </div>
          <h1 className="pf fi1" style={{fontSize:"clamp(2.4rem,5.5vw,4.2rem)",fontWeight:800,lineHeight:1.08,color:"#fff",marginBottom:"2rem",maxWidth:750}}>
            {t.hero.h1[0]}<br/>
            <em className="hero-em" style={{fontStyle:"italic"}}>{t.hero.h1[1]}</em><br/>
            {t.hero.h1[2]}
          </h1>
          <p className="fi2" style={{fontSize:"1.05rem",lineHeight:1.85,color:"rgba(255,255,255,.55)",maxWidth:560,marginBottom:"2.75rem"}}>{t.hero.desc}</p>
          <button className="fi2" onClick={()=>scrollTo("mission")} style={{
            display:"inline-flex",alignItems:"center",gap:10,padding:"1rem 2.25rem",
            background:p.primary,color:"#fff",border:"none",cursor:"pointer",
            fontSize:".78rem",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",
            fontFamily:"inherit",transition:"all .35s"
          }}>
            {t.hero.cta} {Icon.arrow}
          </button>
          {/* Philosophy badge */}
          <div className="fi2 hm" style={{position:"absolute",bottom:"6rem",right:"2rem",maxWidth:320,background:`linear-gradient(180deg, ${p.highlight}50, ${p.highlightD}50)`,border:`1px solid ${p.highlight}60`,backdropFilter:"blur(10px)",padding:"1.5rem 1.75rem"}}>
            <p className="pf" style={{fontSize:"1.1rem",fontWeight:600,fontStyle:"italic",lineHeight:1.45,color:"rgba(255,255,255,.9)"}}>{t.mission.philosophy}</p>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section id="mission" className="sp" style={{...s.sec,background:p.white}}>
        <div style={s.wrap}>
          <Tag>{t.mission.tag}</Tag>
          <Heading>{t.mission.title}</Heading>
          <p style={{fontSize:"1.1rem",lineHeight:1.85,color:p.textM,maxWidth:680,marginBottom:"3rem"}}>{t.mission.mission}</p>
          <div className="g2" style={s.grid2}>
            {/* Vision */}
            <div style={{background:p.offWhite,padding:"2.5rem",borderLeft:`4px solid ${p.primary}`,position:"relative",overflow:"hidden"}}>
              <KentePattern color={p.primary} opacity={0.03} size={35}/>
              <div style={{position:"relative"}}>
                <h3 className="pf" style={{fontSize:"1.25rem",fontWeight:700,color:p.primary,marginBottom:".75rem"}}>{t.mission.visionLabel}</h3>
                <p style={{fontSize:".95rem",lineHeight:1.85,color:p.textM}}>{t.mission.vision}</p>
              </div>
            </div>
            {/* Values */}
            <div style={{background:p.warmCream,padding:"2.5rem",borderLeft:`4px solid ${p.accent}`,position:"relative",overflow:"hidden"}}>
              <KentePattern color={p.accent} opacity={0.03} size={35}/>
              <div style={{position:"relative"}}>
                <h3 className="pf" style={{fontSize:"1.25rem",fontWeight:700,color:p.accentD,marginBottom:"1rem"}}>{t.mission.valuesLabel}</h3>
                {[t.mission.v1, t.mission.v2, t.mission.v3].map((v,i)=>(
                  <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:".6rem"}}>
                    <span style={{color:p.accent,marginTop:3,flexShrink:0}}>{Icon.check}</span>
                    <p style={{fontSize:".92rem",lineHeight:1.75,color:p.textM}}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="sp" style={{...s.sec,background:p.cream}}>
        <div style={s.wrap}>
          <Tag>{t.about.tag}</Tag>
          <Heading>{t.about.title}</Heading>
          <div className="g2" style={{...s.grid2,marginTop:"2rem",alignItems:"start"}}>
            <div>
              <p style={{fontSize:"1rem",lineHeight:1.9,color:p.textM,marginBottom:"1.25rem"}}>{t.about.p1}</p>
              <p style={{fontSize:"1rem",lineHeight:1.9,color:p.textM,marginBottom:"2rem"}}>{t.about.p2}</p>
              {t.about.pillars.map((p,i)=>(
                <div key={i} style={{display:"flex",gap:16,marginBottom:"1.35rem",alignItems:"flex-start"}}>
                  <div style={{width:42,height:42,minWidth:42,background:i===0?p.primaryGlow:i===1?p.accentGlow:`rgba(158,163,168,.1)`,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4}}>
                    <span style={{width:10,height:10,borderRadius:2,background:i===0?p.primary:i===1?p.accent:p.grey}}/>
                  </div>
                  <div>
                    <h4 className="pf" style={{fontSize:"1rem",fontWeight:700,marginBottom:".2rem"}}>{p.t}</h4>
                    <p style={{fontSize:".88rem",lineHeight:1.75,color:p.textL}}>{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:`linear-gradient(155deg, ${p.navy}, ${p.dark})`,padding:"2.5rem",position:"relative",overflow:"hidden"}}>
              <KentePattern color={p.darkPrimaryL} opacity={0.04} size={30}/>
              <div style={{position:"relative"}}>
                <div className="pf" style={{fontSize:"5rem",lineHeight:1,color:`${p.darkPrimary}33`,marginBottom:"-1rem"}}>"</div>
                <p className="pf" style={{fontSize:"1.2rem",fontStyle:"italic",lineHeight:1.65,color:"rgba(255,255,255,.85)"}}>{t.about.quote}</p>
                <div style={{width:40,height:3,background:p.darkPrimary,marginTop:"1.5rem",borderRadius:2}}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROJECT ─── */}
      <section id="project" className="sp" style={{...s.sec,background:p.dark,position:"relative",overflow:"hidden"}}>
        <KentePattern color={p.darkPrimary} opacity={0.025} size={45}/>
        <div style={{...s.wrap,position:"relative"}}>
          <Tag light>{t.project.tag}</Tag>
          <Heading light>{t.project.title}</Heading>
          <p className="pf" style={{fontSize:"1.15rem",fontStyle:"italic",color:p.darkPrimaryL,marginBottom:"2.5rem",maxWidth:500}}>{t.project.subtitle}</p>
          <div className="g2" style={{...s.grid2,alignItems:"start"}}>
            <div>
              {t.project.features.map((f,i)=>(
                <div key={i} style={{display:"flex",gap:14,marginBottom:"1rem",alignItems:"flex-start"}}>
                  <span style={{width:8,height:8,minWidth:8,background:p.darkPrimary,borderRadius:"50%",marginTop:6}}/>
                  <p style={{fontSize:".92rem",lineHeight:1.8,color:"rgba(255,255,255,.6)"}}>{f}</p>
                </div>
              ))}
              <div style={{background:`${p.darkPrimary}15`,borderLeft:`3px solid ${p.darkPrimary}`,padding:"1.25rem 1.5rem",marginTop:"1.5rem"}}>
                <p className="pf" style={{fontSize:"1.05rem",fontStyle:"italic",color:p.darkPrimaryL,lineHeight:1.5}}>{t.project.quote}</p>
              </div>
            </div>
            <div style={{background:"rgba(255,255,255,.03)",border:`1px solid ${p.darkPrimary}20`,padding:"2rem"}}>
              <Tag light>{t.project.partnersTag}</Tag>
              <h3 className="pf" style={{fontSize:"1.2rem",fontWeight:700,color:"#fff",marginBottom:"1.5rem"}}>{t.project.partnersTitle}</h3>
              <div className="g4" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {t.project.partners.map((p,i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,.04)",padding:"10px 12px",fontSize:".78rem",fontWeight:500,color:"rgba(255,255,255,.55)"}}>{p}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SUMMARY ─── */}
      <section id="summary" className="sp" style={{...s.sec,background:p.white}}>
        <div style={s.wrap}>
          <Tag>{t.summary.tag}</Tag>
          <Heading>{t.summary.title}</Heading>
          <div className="g2" style={{...s.grid2,marginTop:"2rem",alignItems:"start"}}>
            <div>
              <p style={{fontSize:"1rem",lineHeight:1.9,color:p.textM,marginBottom:"1.25rem"}}>{t.summary.p1}</p>
              <p style={{fontSize:"1rem",lineHeight:1.9,color:p.textM,marginBottom:"2rem"}}>{t.summary.p2}</p>
              <div style={{background:p.dark,padding:"2rem",position:"relative",overflow:"hidden"}}>
                <KentePattern color={p.darkPrimaryL} opacity={0.04} size={30}/>
                <p className="pf" style={{fontSize:"1.1rem",fontStyle:"italic",lineHeight:1.55,color:p.darkPrimaryL,position:"relative"}}>{t.summary.stat}</p>
              </div>
            </div>
            <div style={{display:"grid",gap:"1rem"}}>
              {t.summary.goals.map((g,i)=>(
                <div key={i} style={{padding:"1.5rem",background:p.offWhite,borderLeft:`3px solid ${i%2===0?p.primary:p.accent}`}}>
                  <h4 className="pf" style={{fontSize:"1rem",fontWeight:700,marginBottom:".3rem"}}>{g.t}</h4>
                  <p style={{fontSize:".88rem",lineHeight:1.75,color:p.textL}}>{g.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOARD ─── */}
      <section id="board" className="sp" style={{...s.sec,background:p.dark,position:"relative",overflow:"hidden"}}>
        <KentePattern color={p.darkPrimary} opacity={0.02} size={50}/>
        <div style={{...s.wrap,position:"relative"}}>
          <Tag light>{t.board.tag}</Tag>
          <Heading light>{t.board.title}</Heading>
          <p style={{fontSize:".95rem",lineHeight:1.75,color:"rgba(255,255,255,.45)",maxWidth:580,marginBottom:"1.5rem"}}>{t.board.desc}</p>
          {/* Founders */}
          <div style={{display:"flex",gap:"1rem",marginBottom:"2.5rem",flexWrap:"wrap"}}>
            {t.board.founders.map((f,i)=>(
              <div key={i} style={{background:`${p.darkPrimary}15`,border:`1px solid ${p.darkPrimary}28`,padding:"1rem 1.5rem",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:10,height:10,background:p.darkPrimary,borderRadius:"50%"}}/>
                <div>
                  <div className="pf" style={{fontSize:"1.1rem",fontWeight:700,color:"#fff"}}>{f.name}</div>
                  <div style={{fontSize:".7rem",fontWeight:600,color:p.darkPrimaryL,letterSpacing:".04em"}}>{f.role}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Members */}
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem"}}>
            {t.board.members.map((m,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.02)",border:`1px solid ${p.darkPrimary}1A`,padding:"1.75rem",borderTop:`3px solid ${p.darkPrimary}`}}>
                <div style={{fontSize:".6rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:p.darkPrimaryL,marginBottom:".4rem"}}>{m.role}</div>
                <div className="pf" style={{fontSize:"1.25rem",fontWeight:700,color:"#fff",marginBottom:".35rem"}}>{m.name}</div>
                <div style={{fontSize:".8rem",fontWeight:600,color:p.darkPrimaryL,marginBottom:".5rem"}}>{m.org}</div>
                <p style={{fontSize:".84rem",lineHeight:1.7,color:"rgba(255,255,255,.4)"}}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AMBASSADORS ─── */}
      <section id="ambassadors" className="sp" style={{...s.sec,background:p.cream}}>
        <div style={s.wrap}>
          <Tag>{t.ambassadors.tag}</Tag>
          <Heading>{t.ambassadors.title}</Heading>
          <div className="g2" style={{...s.grid2,marginTop:"2rem"}}>
            {t.ambassadors.members.map((m,i)=>(
              <div key={i} style={{background:p.white,padding:"2.25rem",border:`1px solid ${p.primary}10`,position:"relative",overflow:"hidden"}}>
                <div className="pf" style={{position:"absolute",top:4,right:16,fontSize:"5rem",color:`${p.accent}10`,lineHeight:1}}>"</div>
                <div className="pf" style={{fontSize:"1.3rem",fontWeight:700,marginBottom:".25rem"}}>{m.name}</div>
                <div style={{fontSize:".75rem",fontWeight:600,color:p.primary,letterSpacing:".06em",textTransform:"uppercase",marginBottom:"1rem"}}>{m.role}</div>
                <p style={{fontSize:".9rem",lineHeight:1.85,color:p.textM}}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MEDIA ─── */}
      <section id="media" className="sp" style={{...s.sec,background:p.white}}>
        <div style={s.wrap}>
          <Tag>{t.media.tag}</Tag>
          <Heading>{t.media.title}</Heading>
          {/* Award */}
          <div style={{background:`linear-gradient(135deg, ${p.navy}, ${p.dark})`,padding:"2rem 2.5rem",marginTop:"2rem",marginBottom:"2rem",display:"flex",gap:20,alignItems:"center",flexWrap:"wrap",position:"relative",overflow:"hidden"}}>
            <KentePattern color="#D4A020" opacity={0.04} size={28}/>
            <div style={{color:"#D4A020",position:"relative"}}>{Icon.award}</div>
            <div style={{position:"relative"}}>
              <h3 className="pf" style={{fontSize:"1.25rem",fontWeight:700,color:"#D4A020",marginBottom:".35rem"}}>{t.media.award.t}</h3>
              <p style={{fontSize:".88rem",lineHeight:1.7,color:"rgba(255,255,255,.5)",maxWidth:560}}>{t.media.award.d}</p>
            </div>
          </div>
          {/* Articles */}
          <div style={{display:"grid",gap:8}}>
            {t.media.items.map((a,i)=>(
              <div key={i} style={{background:p.offWhite,padding:"1rem 1.5rem",display:"flex",gap:16,alignItems:"center",borderLeft:`3px solid ${i%2===0?p.primary:p.accent}`}}>
                <span style={{fontSize:".68rem",fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",color:p.primary,minWidth:160}}>{a.src}</span>
                <span style={{fontSize:".88rem",color:p.textM,lineHeight:1.4}}>{a.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="sp" style={{...s.sec,background:p.navy,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0}}>
          <div style={{position:"absolute",bottom:"10%",left:"5%",width:350,height:350,borderRadius:"50%",background:`radial-gradient(circle, ${p.darkPrimary+"20"} 0%, transparent 70%)`,filter:"blur(60px)"}}/>
          <KentePattern color="#fff" opacity={0.015} size={45}/>
        </div>
        <div style={{...s.wrap,position:"relative"}}>
          <Tag light>{t.contact.tag}</Tag>
          <Heading light>{t.contact.title}</Heading>
          <p style={{fontSize:"1rem",lineHeight:1.8,color:"rgba(255,255,255,.45)",maxWidth:560,marginBottom:"2.5rem"}}>{t.contact.desc}</p>
          <div className="g2" style={{...s.grid2,alignItems:"start"}}>
            <div style={{display:"grid",gap:"1.35rem"}}>
              {[[Icon.phone,t.contact.phone],[Icon.mail,t.contact.email],[Icon.pin,t.contact.address],[Icon.clock,t.contact.hours]].map(([ic,txt],i)=>(
                <div key={i} style={{display:"flex",gap:14,alignItems:"center"}}>
                  <div style={{width:40,height:40,minWidth:40,background:`${p.darkPrimary}20`,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,color:p.darkPrimaryL}}>{ic}</div>
                  <span style={{fontSize:".9rem",color:"rgba(255,255,255,.65)"}}>{txt}</span>
                </div>
              ))}
              <div style={{display:"flex",gap:10,marginTop:".5rem"}}>
                <a href="https://www.facebook.com/p/Soci%C3%A9t%C3%A9-dhabitation-des-communaut%C3%A9s-noires-SHCN-61560044163035/" target="_blank" rel="noopener noreferrer" style={{width:40,height:40,background:`${p.darkPrimary}20`,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,color:p.darkPrimaryL,cursor:"pointer"}}>{Icon.fb}</a>
                <a href="https://www.linkedin.com/company/soci%C3%A9t%C3%A9-d-habitation-des-communaut%C3%A9s-noires" target="_blank" rel="noopener noreferrer" style={{width:40,height:40,background:`${p.darkPrimary}20`,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,color:p.darkPrimaryL,cursor:"pointer"}}>{Icon.li}</a>
              </div>
            </div>
            <div>
              <p style={{fontSize:".82rem",color:"rgba(255,255,255,.3)",marginBottom:"1rem"}}>{t.contact.fH}</p>
              <div style={{display:"grid",gap:10}}>
                <input placeholder={t.contact.fN} style={{width:"100%",padding:"12px 14px",background:"rgba(255,255,255,.04)",border:`1px solid ${p.darkPrimary}28`,color:"#fff",fontSize:".88rem",fontFamily:"inherit",outline:"none",borderRadius:3}}/>
                <input placeholder={t.contact.fE} type="email" style={{width:"100%",padding:"12px 14px",background:"rgba(255,255,255,.04)",border:`1px solid ${p.darkPrimary}28`,color:"#fff",fontSize:".88rem",fontFamily:"inherit",outline:"none",borderRadius:3}}/>
                <textarea placeholder={t.contact.fM} rows={4} style={{width:"100%",padding:"12px 14px",background:"rgba(255,255,255,.04)",border:`1px solid ${p.darkPrimary}28`,color:"#fff",fontSize:".88rem",fontFamily:"inherit",outline:"none",resize:"vertical",borderRadius:3}}/>
                <button style={{width:"100%",padding:"14px",background:p.darkPrimary,color:"#fff",border:"none",cursor:"pointer",fontSize:".78rem",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",fontFamily:"inherit",borderRadius:3,transition:"background .3s"}}>{t.contact.fB}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{background:p.dark,padding:"3rem 2rem 1.25rem"}}>
        <div style={s.wrap}>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1.3fr .7fr",gap:"3rem",alignItems:"start",marginBottom:"2rem"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:".85rem"}}>
                <Logo size={28}/>
                <span className="pf" style={{fontSize:"1.4rem",fontWeight:800,color:p.darkPrimary}}>{lang==="en"?"BCHS":"SHCN"}</span>
              </div>
              <p style={{fontSize:".65rem",fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",color:"rgba(255,255,255,.2)",marginBottom:".15rem"}}>{t.footer.full}</p>
              <p style={{fontSize:".6rem",fontWeight:500,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.12)"}}>{t.footer.en}</p>
              <p style={{fontSize:".85rem",lineHeight:1.6,color:"rgba(255,255,255,.3)",marginTop:".75rem",maxWidth:380}}>{t.footer.tagline}</p>
              <div style={{display:"flex",gap:12,marginTop:"1rem"}}>
                <a href="https://www.facebook.com/p/Soci%C3%A9t%C3%A9-dhabitation-des-communaut%C3%A9s-noires-SHCN-61560044163035/" target="_blank" rel="noopener noreferrer" style={{color:"rgba(255,255,255,.25)",cursor:"pointer"}}>{Icon.fb}</a>
                <a href="https://www.linkedin.com/company/soci%C3%A9t%C3%A9-d-habitation-des-communaut%C3%A9s-noires" target="_blank" rel="noopener noreferrer" style={{color:"rgba(255,255,255,.25)",cursor:"pointer"}}>{Icon.li}</a>
              </div>
            </div>
            <div>
              <h4 style={{fontSize:".82rem",fontWeight:600,color:"rgba(255,255,255,.7)",marginBottom:".75rem"}}>{t.footer.nl}</h4>
              <div style={{display:"flex"}}>
                <input placeholder={t.footer.nlP} style={{flex:1,padding:"10px 12px",background:"rgba(255,255,255,.04)",border:`1px solid ${p.darkPrimary}28`,borderRight:"none",color:"#fff",fontSize:".8rem",fontFamily:"inherit",outline:"none"}}/>
                <button style={{padding:"10px 16px",background:p.darkPrimary,color:"#fff",border:"none",fontSize:".7rem",fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>{t.footer.nlB}</button>
              </div>
              <div style={{fontSize:".75rem",color:"rgba(255,255,255,.2)",marginTop:".85rem"}}>
                <span>+1 438 833-3421</span><span style={{margin:"0 .75rem"}}>·</span><span>info@shcn.ca</span>
              </div>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:"1rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <p style={{fontSize:".68rem",color:"rgba(255,255,255,.18)"}}>{t.footer.copy}</p>
            <div style={{display:"flex",gap:3}}>
              {LANGS.map(l=>{
                const lCol = LANG_COLORS[l.code];
                return (
                  <button key={l.code} onClick={()=>setLang(l.code)} style={{
                    padding:"3px 7px",fontSize:".58rem",fontWeight:lang===l.code?700:400,
                    background:lang===l.code?`${lCol.bars}30`:"transparent",
                    color:lang===l.code?lCol.shape:"rgba(255,255,255,.18)",
                    border:lang===l.code?`1px solid ${lCol.bars}50`:"1px solid transparent",
                    cursor:"pointer",fontFamily:"inherit",borderRadius:2,transition:"all .3s"
                  }}>{l.flag}</button>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
