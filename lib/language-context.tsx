"use client"

import i18n from "i18next"
import { initReactI18next, useTranslation } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// ─── Translation resources ────────────────────────────────────────────────────
// Keys missing from a language automatically fall back to English.

const en: Record<string, string> = {
  "nav.home": "Home",
  "nav.laptop": "Laptop Guide",
  "nav.learn": "Learn English",
  "nav.camps": "Summer Camps",
  "nav.cv": "CV Builder",
  "home.title": "Welcome to Laois",
  "home.subtitle": "Your guide to life in Ireland",
  "home.info.title": "General Information",
  "home.info.text": "Welcome to Laois. This guide helps you understand daily life and services available to you.",
  "home.download.title": "Welcome Booklets",
  "home.download.text": "Download our comprehensive welcome guides with essential information for life in Laois.",
  "home.download.en": "Download English Booklet",
  "home.download.ar": "Download Arabic Booklet",
  "home.health.title": "Healthcare",
  "home.health.text": "Visit a GP for treatment. In emergencies call 112 or 999.",
  "home.learn.title": "Learn English",
  "home.learn.text": "Learning English is important for work and daily life.",
  "home.learn.btn": "Start Learning",
  "home.adapt.title": "How to Adapt",
  "home.adapt.1": "Meet your neighbors",
  "home.adapt.2": "Use local apps",
  "home.adapt.3": "Practice English daily",
  "home.adapt.4": "Respect the laws",
  "home.laptop.title": "Computer Use",
  "home.laptop.text": "Turning on the computer, using browser, and typing with keyboard.",
  "home.contact.title": "Contact Us",
  "home.contact.text": "Contact local support centers if you need help.",
  "laptop.title": "Laptop Guide",
  "laptop.intro": "These HP ProBook G7 laptops have been prepared for families in Mountmellick.",
  "laptop.login.title": "Login Details",
  "laptop.login.username": "Username",
  "laptop.login.password": "Password",
  "laptop.step1.title": "1. Turning On the Laptop",
  "laptop.step1.1": "Open the laptop screen.",
  "laptop.step1.2": "Press the power button (usually above the keyboard).",
  "laptop.step1.3": "Wait for the screen to turn on.",
  "laptop.step2.title": "2. Logging In",
  "laptop.step2.1": "Type the username: Admin",
  "laptop.step2.2": "Type the password: laptopuser",
  "laptop.step2.3": "Press Enter",
  "laptop.step3.title": "3. Connecting to WiFi",
  "laptop.step3.1": "Click the WiFi icon (bottom right corner).",
  "laptop.step3.2": "Select your home network.",
  "laptop.step3.3": "Enter your WiFi password.",
  "laptop.step3.4": "Click Connect.",
  "laptop.step4.title": "4. Using the Laptop",
  "laptop.step4.1": "Use the touchpad or mouse to move the cursor.",
  "laptop.step4.2": "Click to open apps.",
  "laptop.step4.3": "Open a browser (like Chrome or Edge) to use the internet.",
  "laptop.step5.title": "5. Charging the Laptop",
  "laptop.step5.1": "Plug in the charger to the laptop.",
  "laptop.step5.2": "Connect it to a wall socket.",
  "laptop.step5.3": "You will see a battery icon charging.",
  "laptop.step6.title": "6. Important Information",
  "laptop.step6.1": "These are not company laptops.",
  "laptop.step6.2": "No IT support is provided.",
  "laptop.step6.3": "Keep your laptop safe and clean.",
  "laptop.step7.title": "7. Need Help?",
  "laptop.step7.text": "Please contact local community support services if you need assistance.",
  "learn.title": "English Learning Resources",
  "learn.subtitle": "Online resources to help you learn English from home",
  "learn.resources": "Resources",
  "learn.platform": "Learning Platform",
  "learn.intro": "There is a great Padlet resource with multiple useful links.",
  "learn.padlet": "Open Padlet Resources",
  "learn.downloads": "Download ESOL Documents",
  "learn.en.doc": "Download English Document",
  "learn.ar.doc": "Download Arabic Document",
  "learn.platform.title": "Transparent Language Online",
  "learn.platform.text": "Access interactive language learning platform:",
  "learn.platform.btn": "Open Platform",
  "learn.websites": "Websites",
  "learn.apps": "Apps",
  "learn.podcasts": "Podcasts",
  "learn.youtube": "YouTube",
  "learn.british.council": "British Council - Learn English Online",
  "learn.british.council.desc": "A brilliant website for all levels with listening, reading, writing, and speaking resources.",
  "learn.bbc": "BBC Learning English",
  "learn.bbc.desc": "The BBC's Learning English websites have lots of resources for all levels.",
  "learn.breaking.news": "Breaking News English",
  "learn.breaking.news.desc": "Free site with ready-to-use ESL lessons and graded news articles.",
  "learn.duolingo": "Duolingo",
  "learn.duolingo.desc": "A very well-known app with many languages to choose from.",
  "learn.memrise": "Memrise",
  "learn.memrise.desc": "Another good app with many languages to choose from.",
  "learn.grammar.app": "Learn English Grammar",
  "learn.grammar.app.desc": "British Council app for practicing grammar at all levels.",
  "learn.6min": "6-Minute English",
  "learn.6min.desc": "BBC podcast for B1/B2 learners.",
  "learn.vocabulary": "Learning English Vocabulary",
  "learn.vocabulary.desc": "BBC podcast for A2+ learners.",
  "learn.business": "Business English Podcast",
  "learn.business.desc": "English language for business situations.",
  "learn.scenarios": "Conversation Scenarios",
  "learn.scenarios.desc": "Practise real conversations for everyday life in Portlaoise — booking a GP, enrolling at school, using the bus, and more.",
  "learn.scenarios.browse": "Browse Conversation Scenarios",
  "scenarios.title": "Conversation Scenarios",
  "scenarios.subtitle": "Real-life conversations to help you feel confident in everyday situations in Portlaoise, Ireland. Tap a scenario to read and practise.",
  "scenarios.back": "Back",
  "scenarios.tips": "Useful Tips for this Situation",
  "scenarios.level": "Level",
  "camps.title": "Summer Camps",
  "camps.subtitle": "Find the best camps for children and young people",
  "camps.filter.all": "All Types",
  "camps.filter.sport": "Sport",
  "camps.filter.outdoor": "Outdoor",
  "camps.filter.creative": "Creative",
  "camps.location": "Location",
  "camps.map": "View Map",
  "theme.light": "Light",
  "theme.dark": "Dark",
  "lang.switch": "العربية",
}

const ar: Record<string, string> = {
  "nav.home": "الرئيسية",
  "nav.laptop": "دليل الحاسوب",
  "nav.learn": "تعلم الإنجليزية",
  "nav.camps": "مخيمات الصيف",
  "nav.cv": "بناء السيرة الذاتية",
  "home.title": "مرحباً بكم في لاويس",
  "home.subtitle": "دليلكم للحياة في أيرلندا",
  "home.info.title": "معلومات عامة",
  "home.info.text": "مرحباً بكم في لاويس. هذا الدليل يساعدكم على فهم الحياة اليومية والخدمات المتوفرة.",
  "home.download.title": "كتيبات الترحيب",
  "home.download.text": "حمّل أدلة الترحيب الشاملة مع المعلومات الأساسية للحياة في لاويس.",
  "home.download.en": "تحميل الكتيب الإنجليزي",
  "home.download.ar": "تحميل الكتيب العربي",
  "home.health.title": "الرعاية الصحية",
  "home.health.text": "زوروا الطبيب العام للعلاج. في الحالات الطارئة اتصلوا بـ 112 أو 999.",
  "home.learn.title": "تعلم الإنجليزية",
  "home.learn.text": "تعلم اللغة الإنجليزية مهم للعمل والحياة اليومية.",
  "home.learn.btn": "ابدأ التعلم",
  "home.adapt.title": "كيف تتأقلم",
  "home.adapt.1": "تعرف على جيرانك",
  "home.adapt.2": "استخدم التطبيقات المحلية",
  "home.adapt.3": "تدرب على الإنجليزية يومياً",
  "home.adapt.4": "احترم القوانين",
  "home.laptop.title": "استخدام الحاسوب",
  "home.laptop.text": "تشغيل الحاسوب، استخدام المتصفح، والكتابة باستخدام لوحة المفاتيح.",
  "home.contact.title": "اتصل بنا",
  "home.contact.text": "تواصل مع مراكز الدعم المحلي عند الحاجة.",
  "laptop.title": "دليل استخدام اللابتوب",
  "laptop.intro": "تم إعداد أجهزة HP ProBook G7 لاستخدام العائلات في ماونتمليك.",
  "laptop.login.title": "تفاصيل تسجيل الدخول",
  "laptop.login.username": "اسم المستخدم",
  "laptop.login.password": "كلمة المرور",
  "laptop.step1.title": "1. تشغيل الجهاز",
  "laptop.step1.1": "افتح شاشة اللابتوب.",
  "laptop.step1.2": "اضغط على زر التشغيل (فوق لوحة المفاتيح).",
  "laptop.step1.3": "انتظر حتى تفتح الشاشة.",
  "laptop.step2.title": "2. تسجيل الدخول",
  "laptop.step2.1": "اكتب اسم المستخدم: Admin",
  "laptop.step2.2": "اكتب كلمة المرور: laptopuser",
  "laptop.step2.3": "اضغط Enter",
  "laptop.step3.title": "3. الاتصال بالإنترنت (WiFi)",
  "laptop.step3.1": "اضغط على رمز الواي فاي أسفل الشاشة.",
  "laptop.step3.2": "اختر شبكة الإنترنت الخاصة بك.",
  "laptop.step3.3": "أدخل كلمة المرور.",
  "laptop.step3.4": "اضغط اتصال.",
  "laptop.step4.title": "4. استخدام الجهاز",
  "laptop.step4.1": "استخدم لوحة اللمس لتحريك المؤشر.",
  "laptop.step4.2": "اضغط لفتح البرامج.",
  "laptop.step4.3": "افتح المتصفح لاستخدام الإنترنت.",
  "laptop.step5.title": "5. شحن الجهاز",
  "laptop.step5.1": "قم بتوصيل الشاحن بالجهاز.",
  "laptop.step5.2": "وصله بالكهرباء.",
  "laptop.step5.3": "سترى رمز البطارية يشحن.",
  "laptop.step6.title": "6. معلومات مهمة",
  "laptop.step6.1": "هذه الأجهزة ليست أجهزة رسمية للشركة.",
  "laptop.step6.2": "لا يوجد دعم تقني.",
  "laptop.step6.3": "حافظ على الجهاز نظيف وآمن.",
  "laptop.step7.title": "7. هل تحتاج مساعدة؟",
  "laptop.step7.text": "يرجى التواصل مع خدمات الدعم المحلية.",
  "learn.title": "موارد تعلم اللغة الإنجليزية",
  "learn.subtitle": "موارد عبر الإنترنت لمساعدتك على تعلم الإنجليزية من المنزل",
  "learn.resources": "الموارد",
  "learn.platform": "منصة التعلم",
  "learn.intro": "هناك مورد رائع يحتوي على روابط مفيدة.",
  "learn.padlet": "افتح موارد Padlet",
  "learn.downloads": "تحميل ملفات ESOL",
  "learn.en.doc": "تحميل الملف الإنجليزي",
  "learn.ar.doc": "تحميل الملف العربي",
  "learn.platform.title": "منصة تعلم اللغة",
  "learn.platform.text": "استخدم المنصة التفاعلية لتعلم اللغة:",
  "learn.platform.btn": "افتح المنصة",
  "learn.websites": "مواقع إلكترونية",
  "learn.apps": "تطبيقات",
  "learn.podcasts": "بودكاست",
  "learn.youtube": "يوتيوب",
  "learn.british.council": "المجلس الثقافي البريطاني - تعلم الإنجليزية",
  "learn.british.council.desc": "موقع رائع لجميع المستويات مع موارد الاستماع والقراءة والكتابة والتحدث.",
  "learn.bbc": "BBC تعلم الإنجليزية",
  "learn.bbc.desc": "مواقع BBC لتعلم الإنجليزية تحتوي على الكثير من الموارد لجميع المستويات.",
  "learn.breaking.news": "Breaking News English",
  "learn.breaking.news.desc": "موقع مجاني مع دروس جاهزة ومقالات إخبارية متدرجة.",
  "learn.duolingo": "دوولينجو",
  "learn.duolingo.desc": "تطبيق مشهور جداً مع العديد من اللغات للاختيار من بينها.",
  "learn.memrise": "Memrise",
  "learn.memrise.desc": "تطبيق جيد آخر مع العديد من اللغات للاختيار من بينها.",
  "learn.grammar.app": "تعلم قواعد الإنجليزية",
  "learn.grammar.app.desc": "تطبيق المجلس الثقافي البريطاني لممارسة القواعد في جميع المستويات.",
  "learn.6min": "الإنجليزية في 6 دقائق",
  "learn.6min.desc": "بودكاست BBC للمتعلمين B1/B2.",
  "learn.vocabulary": "تعلم المفردات الإنجليزية",
  "learn.vocabulary.desc": "بودكاست BBC للمتعلمين A2+.",
  "learn.business": "بودكاست الإنجليزية للأعمال",
  "learn.business.desc": "اللغة الإنجليزية لمواقف العمل.",
  "learn.scenarios": "سيناريوهات المحادثة",
  "learn.scenarios.desc": "تدرب على محادثات حقيقية للحياة اليومية في بورتلاويس — حجز موعد مع الطبيب، المدرسة، وأكثر.",
  "learn.scenarios.browse": "استعرض سيناريوهات المحادثة",
  "scenarios.title": "سيناريوهات المحادثة",
  "scenarios.subtitle": "محادثات حقيقية لمساعدتك على الشعور بالثقة في المواقف اليومية في بورتلاويس، أيرلندا.",
  "scenarios.back": "رجوع",
  "scenarios.tips": "نصائح مفيدة لهذا الموقف",
  "scenarios.level": "المستوى",
  "camps.title": "مخيمات الصيف",
  "camps.subtitle": "اعثر على أفضل المخيمات للأطفال والشباب",
  "camps.filter.all": "كل الأنواع",
  "camps.filter.sport": "رياضة",
  "camps.filter.outdoor": "أنشطة خارجية",
  "camps.filter.creative": "إبداعي",
  "camps.location": "الموقع",
  "camps.map": "عرض الخريطة",
  "theme.light": "فاتح",
  "theme.dark": "داكن",
  "lang.switch": "English",
}

// Helper to build a minimal translation for a language with just nav + key UI
function minimal(nav: {
  home: string; laptop: string; learn: string; camps: string; cv: string
  learnBtn: string; healthTitle: string; healthText: string
  learnTitle: string; learnSubtitle: string; scenarios: string
  scenariosDesc: string; scenariosBrowse: string
  scenariosModalTitle: string; scenariosModalSubtitle: string
  scenariosBack: string; scenariosTips: string
  campsTitle: string; campsSubtitle: string
}): Record<string, string> {
  return {
    "nav.home": nav.home,
    "nav.laptop": nav.laptop,
    "nav.learn": nav.learn,
    "nav.camps": nav.camps,
    "nav.cv": nav.cv,
    "home.learn.btn": nav.learnBtn,
    "home.health.title": nav.healthTitle,
    "home.health.text": nav.healthText,
    "learn.title": nav.learnTitle,
    "learn.subtitle": nav.learnSubtitle,
    "learn.scenarios": nav.scenarios,
    "learn.scenarios.desc": nav.scenariosDesc,
    "learn.scenarios.browse": nav.scenariosBrowse,
    "scenarios.title": nav.scenariosModalTitle,
    "scenarios.subtitle": nav.scenariosModalSubtitle,
    "scenarios.back": nav.scenariosBack,
    "scenarios.tips": nav.scenariosTips,
    "camps.title": nav.campsTitle,
    "camps.subtitle": nav.campsSubtitle,
  }
}

const uk = minimal({
  home: "Головна", laptop: "Посібник по ноутбуку", learn: "Вчити англійську",
  camps: "Літні табори", cv: "Створити резюме", learnBtn: "Почати навчання",
  healthTitle: "Охорона здоров'я", healthText: "Відвідайте лікаря. У надзвичайних ситуаціях телефонуйте 112 або 999.",
  learnTitle: "Ресурси для вивчення англійської", learnSubtitle: "Онлайн-ресурси для вивчення англійської вдома",
  scenarios: "Розмовні сценарії", scenariosDesc: "Практикуйте реальні розмови для повсякденного життя в Портлаойш.",
  scenariosBrowse: "Переглянути сценарії розмов", scenariosModalTitle: "Розмовні сценарії",
  scenariosModalSubtitle: "Реальні розмови для впевненості в повсякденних ситуаціях у Портлаойш, Ірландія.",
  scenariosBack: "Назад", scenariosTips: "Корисні поради для цієї ситуації",
  campsTitle: "Літні табори", campsSubtitle: "Знайдіть найкращі табори для дітей та молоді",
})

const pl = minimal({
  home: "Strona główna", laptop: "Przewodnik po laptopie", learn: "Nauka angielskiego",
  camps: "Obozy letnie", cv: "Kreator CV", learnBtn: "Zacznij naukę",
  healthTitle: "Opieka zdrowotna", healthText: "Odwiedź lekarza. W nagłych przypadkach zadzwoń 112 lub 999.",
  learnTitle: "Zasoby do nauki angielskiego", learnSubtitle: "Zasoby online do nauki angielskiego w domu",
  scenarios: "Scenariusze rozmów", scenariosDesc: "Ćwicz prawdziwe rozmowy z życia codziennego w Portlaoise.",
  scenariosBrowse: "Przeglądaj scenariusze rozmów", scenariosModalTitle: "Scenariusze rozmów",
  scenariosModalSubtitle: "Prawdziwe rozmowy, aby poczuć się pewnie w codziennych sytuacjach w Portlaoise, Irlandia.",
  scenariosBack: "Wróć", scenariosTips: "Przydatne wskazówki do tej sytuacji",
  campsTitle: "Obozy letnie", campsSubtitle: "Znajdź najlepsze obozy dla dzieci i młodzieży",
})

const ro = minimal({
  home: "Acasă", laptop: "Ghid laptop", learn: "Învățați engleza",
  camps: "Tabere de vară", cv: "Creator CV", learnBtn: "Începeți să învățați",
  healthTitle: "Asistență medicală", healthText: "Vizitați un medic. În urgențe sunați la 112 sau 999.",
  learnTitle: "Resurse pentru engleza", learnSubtitle: "Resurse online pentru a învăța engleza acasă",
  scenarios: "Scenarii de conversație", scenariosDesc: "Exersați conversații reale pentru viața de zi cu zi în Portlaoise.",
  scenariosBrowse: "Răsfoiți scenariile de conversație", scenariosModalTitle: "Scenarii de conversație",
  scenariosModalSubtitle: "Conversații reale pentru a vă simți încrezători în situații cotidiene din Portlaoise, Irlanda.",
  scenariosBack: "Înapoi", scenariosTips: "Sfaturi utile pentru această situație",
  campsTitle: "Tabere de vară", campsSubtitle: "Găsiți cele mai bune tabere pentru copii și tineri",
})

const fr = minimal({
  home: "Accueil", laptop: "Guide ordinateur", learn: "Apprendre l'anglais",
  camps: "Camps d'été", cv: "Créer un CV", learnBtn: "Commencer à apprendre",
  healthTitle: "Santé", healthText: "Consultez un médecin. En urgence appelez le 112 ou 999.",
  learnTitle: "Ressources pour apprendre l'anglais", learnSubtitle: "Ressources en ligne pour apprendre l'anglais à la maison",
  scenarios: "Scénarios de conversation", scenariosDesc: "Pratiquez de vraies conversations pour la vie quotidienne à Portlaoise.",
  scenariosBrowse: "Parcourir les scénarios de conversation", scenariosModalTitle: "Scénarios de conversation",
  scenariosModalSubtitle: "Vraies conversations pour vous sentir en confiance dans des situations quotidiennes à Portlaoise, Irlande.",
  scenariosBack: "Retour", scenariosTips: "Conseils utiles pour cette situation",
  campsTitle: "Camps d'été", campsSubtitle: "Trouvez les meilleurs camps pour enfants et jeunes",
})

const es = minimal({
  home: "Inicio", laptop: "Guía del portátil", learn: "Aprender inglés",
  camps: "Campamentos de verano", cv: "Crear CV", learnBtn: "Empezar a aprender",
  healthTitle: "Atención médica", healthText: "Visita a un médico. En emergencias llama al 112 o 999.",
  learnTitle: "Recursos para aprender inglés", learnSubtitle: "Recursos en línea para aprender inglés en casa",
  scenarios: "Escenarios de conversación", scenariosDesc: "Practica conversaciones reales para la vida diaria en Portlaoise.",
  scenariosBrowse: "Ver escenarios de conversación", scenariosModalTitle: "Escenarios de conversación",
  scenariosModalSubtitle: "Conversaciones reales para sentirte seguro en situaciones cotidianas en Portlaoise, Irlanda.",
  scenariosBack: "Volver", scenariosTips: "Consejos útiles para esta situación",
  campsTitle: "Campamentos de verano", campsSubtitle: "Encuentra los mejores campamentos para niños y jóvenes",
})

const de = minimal({
  home: "Startseite", laptop: "Laptop-Anleitung", learn: "Englisch lernen",
  camps: "Sommerlager", cv: "Lebenslauf erstellen", learnBtn: "Jetzt lernen",
  healthTitle: "Gesundheitsversorgung", healthText: "Besuchen Sie einen Arzt. Im Notfall rufen Sie 112 oder 999 an.",
  learnTitle: "Ressourcen zum Englischlernen", learnSubtitle: "Online-Ressourcen zum Englischlernen zu Hause",
  scenarios: "Gesprächsszenarien", scenariosDesc: "Üben Sie echte Gespräche für den Alltag in Portlaoise.",
  scenariosBrowse: "Gesprächsszenarien durchsuchen", scenariosModalTitle: "Gesprächsszenarien",
  scenariosModalSubtitle: "Echte Gespräche für mehr Sicherheit im Alltag in Portlaoise, Irland.",
  scenariosBack: "Zurück", scenariosTips: "Hilfreiche Tipps für diese Situation",
  campsTitle: "Sommerlager", campsSubtitle: "Finde die besten Lager für Kinder und Jugendliche",
})

const it = minimal({
  home: "Home", laptop: "Guida al laptop", learn: "Imparare l'inglese",
  camps: "Campi estivi", cv: "Crea CV", learnBtn: "Inizia ad imparare",
  healthTitle: "Assistenza sanitaria", healthText: "Visita un medico. In emergenza chiama il 112 o il 999.",
  learnTitle: "Risorse per imparare l'inglese", learnSubtitle: "Risorse online per imparare l'inglese a casa",
  scenarios: "Scenari di conversazione", scenariosDesc: "Pratica conversazioni reali per la vita quotidiana a Portlaoise.",
  scenariosBrowse: "Sfoglia scenari di conversazione", scenariosModalTitle: "Scenari di conversazione",
  scenariosModalSubtitle: "Conversazioni reali per sentirti a tuo agio in situazioni quotidiane a Portlaoise, Irlanda.",
  scenariosBack: "Indietro", scenariosTips: "Suggerimenti utili per questa situazione",
  campsTitle: "Campi estivi", campsSubtitle: "Trova i migliori campi per bambini e giovani",
})

const pt = minimal({
  home: "Início", laptop: "Guia do laptop", learn: "Aprender inglês",
  camps: "Campos de verão", cv: "Criar CV", learnBtn: "Começar a aprender",
  healthTitle: "Cuidados de saúde", healthText: "Visite um médico. Em emergências ligue 112 ou 999.",
  learnTitle: "Recursos para aprender inglês", learnSubtitle: "Recursos online para aprender inglês em casa",
  scenarios: "Cenários de conversa", scenariosDesc: "Pratique conversas reais para a vida quotidiana em Portlaoise.",
  scenariosBrowse: "Ver cenários de conversa", scenariosModalTitle: "Cenários de conversa",
  scenariosModalSubtitle: "Conversas reais para se sentir confiante em situações do dia-a-dia em Portlaoise, Irlanda.",
  scenariosBack: "Voltar", scenariosTips: "Dicas úteis para esta situação",
  campsTitle: "Campos de verão", campsSubtitle: "Encontre os melhores campos para crianças e jovens",
})

const ru = minimal({
  home: "Главная", laptop: "Руководство по ноутбуку", learn: "Учить английский",
  camps: "Летние лагеря", cv: "Создать резюме", learnBtn: "Начать обучение",
  healthTitle: "Здравоохранение", healthText: "Обратитесь к врачу. В экстренных случаях звоните 112 или 999.",
  learnTitle: "Ресурсы для изучения английского", learnSubtitle: "Онлайн-ресурсы для изучения английского дома",
  scenarios: "Разговорные сценарии", scenariosDesc: "Практикуйте реальные разговоры для повседневной жизни в Портлаойш.",
  scenariosBrowse: "Просмотр разговорных сценариев", scenariosModalTitle: "Разговорные сценарии",
  scenariosModalSubtitle: "Реальные разговоры для уверенности в повседневных ситуациях в Портлаойш, Ирландия.",
  scenariosBack: "Назад", scenariosTips: "Полезные советы для этой ситуации",
  campsTitle: "Летние лагеря", campsSubtitle: "Найдите лучшие лагеря для детей и молодежи",
})

// Kurdish (Kurmanji)
const ku = minimal({
  home: "Mal", laptop: "Rêbera Laptopê", learn: "Îngilîzî Fêr Bibe",
  camps: "Kampên Havînê", cv: "CV Çêke", learnBtn: "Dest Pê Bike",
  healthTitle: "Tenduristî", healthText: "Bijîşkek bixwaze. Di rewşên acil de 112 an 999 bang bike.",
  learnTitle: "Çavkaniyên Fêrbûna Îngilîzî", learnSubtitle: "Çavkaniyên înternetê ji bo fêrbûna Îngilîzî li malê",
  scenarios: "Senaryoyên Gotûbêjê", scenariosDesc: "Gotûbêjên rastîn ji bo jiyana rojane li Portlaoise.",
  scenariosBrowse: "Senaryoyên Gotûbêjê Bibîne", scenariosModalTitle: "Senaryoyên Gotûbêjê",
  scenariosModalSubtitle: "Gotûbêjên rastîn ji bo rewşên rojane li Portlaoise, Îrlanda.",
  scenariosBack: "Vegerê", scenariosTips: "Şîretên bikêr ji bo vê rewşê",
  campsTitle: "Kampên Havînê", campsSubtitle: "Çêtirîn kampên ji bo zarok û ciwanan bibîne",
})

// Pashto (Afghan)
const ps = minimal({
  home: "کور", laptop: "د لیپ ټاپ لارښود", learn: "انګلیسي زده کړئ",
  camps: "د دوبي کیمپونه", cv: "د CV جوړول", learnBtn: "زده کړه پیل کړئ",
  healthTitle: "روغتیا پاملرنه", healthText: "ډاکتر وګورئ. بیړني حالت کې ۱۱۲ یا ۹۹۹ ته زنګ ووهئ.",
  learnTitle: "د انګلیسي زده کړې سرچینې", learnSubtitle: "د انګلیسي د کور نه زده کولو لپاره آنلاین سرچینې",
  scenarios: "د خبرو سیناریوګانې", scenariosDesc: "د پورتلاویس ورځني ژوند لپاره ریښتیني خبرې وکړئ.",
  scenariosBrowse: "د خبرو سیناریوګانې وګورئ", scenariosModalTitle: "د خبرو سیناریوګانې",
  scenariosModalSubtitle: "د پورتلاویس، آیرلنډ ورځنیو حالاتو کې د باور لپاره ریښتیني خبرې.",
  scenariosBack: "بیرته", scenariosTips: "د دې حالت لپاره ګټورې لارښوونې",
  campsTitle: "د دوبي کیمپونه", campsSubtitle: "د ماشومانو او ځوانانو لپاره غوره کیمپونه ومومئ",
})

// Dari / Persian (also spoken widely in Afghanistan)
const fa = minimal({
  home: "خانه", laptop: "راهنمای لپ‌تاپ", learn: "یادگیری انگلیسی",
  camps: "کمپ‌های تابستانی", cv: "ساخت رزومه", learnBtn: "شروع یادگیری",
  healthTitle: "مراقبت‌های بهداشتی", healthText: "به پزشک مراجعه کنید. در موارد اضطراری با ۱۱۲ یا ۹۹۹ تماس بگیرید.",
  learnTitle: "منابع یادگیری انگلیسی", learnSubtitle: "منابع آنلاین برای یادگیری انگلیسی در خانه",
  scenarios: "سناریوهای مکالمه", scenariosDesc: "مکالمات واقعی برای زندگی روزمره در پورتلاویش.",
  scenariosBrowse: "مرور سناریوهای مکالمه", scenariosModalTitle: "سناریوهای مکالمه",
  scenariosModalSubtitle: "مکالمات واقعی برای اعتماد در موقعیت‌های روزمره در پورتلاویش، ایرلند.",
  scenariosBack: "بازگشت", scenariosTips: "نکات مفید برای این موقعیت",
  campsTitle: "کمپ‌های تابستانی", campsSubtitle: "بهترین کمپ‌ها برای کودکان و جوانان را پیدا کنید",
})

// Khmer (Cambodian)
const km = minimal({
  home: "ទំព័រដើម", laptop: "មគ្គុទ្ទេសន៍កុំព្យូទ័រ", learn: "រៀនភាសាអង់គ្លេស",
  camps: "ជំរំរដូវក្តៅ", cv: "បង្កើត CV", learnBtn: "ចាប់ផ្តើមរៀន",
  healthTitle: "ការថែទាំសុខភាព", healthText: "ទៅជួបគ្រូពេទ្យ។ ក្នុងករណីបន្ទាន់ ទូរស័ព្ទ 112 ឬ 999។",
  learnTitle: "ធនធានសម្រាប់រៀនភាសាអង់គ្លេស", learnSubtitle: "ធនធានអនឡាញដើម្បីរៀនភាសាអង់គ្លេសនៅផ្ទះ",
  scenarios: "ស្គ្រីបការសន្ទនា", scenariosDesc: "ហ្វឹកហ្វឺនការសន្ទនាពិតប្រាកដសម្រាប់ជីវិតប្រចាំថ្ងៃនៅ Portlaoise។",
  scenariosBrowse: "មើលស្គ្រីបការសន្ទនា", scenariosModalTitle: "ស្គ្រីបការសន្ទនា",
  scenariosModalSubtitle: "ការសន្ទនាពិតប្រាកដសម្រាប់ស្ថានការណ៍ប្រចាំថ្ងៃនៅ Portlaoise ប្រទេសអៀរឡង់។",
  scenariosBack: "ត្រលប់", scenariosTips: "គន្លឹះមានប្រយោជន៍សម្រាប់ស្ថានការណ៍នេះ",
  campsTitle: "ជំរំរដូវក្តៅ", campsSubtitle: "ស្វែងរកជំរំល្អបំផុតសម្រាប់កុមារ និងយុវជន",
})

// Somali
const so = minimal({
  home: "Bogga Hore", laptop: "Tilmaamaha Kombiyuutarka", learn: "Baranaha Ingiriisiga",
  camps: "Xarumaha Xagaaga", cv: "Samee CV", learnBtn: "Bilow Barasho",
  healthTitle: "Daryeelka Caafimaadka", healthText: "Booqo dhakhtar. Xaaladaha degdegga ah wac 112 ama 999.",
  learnTitle: "Kheyraadka Baranaha Ingiriisiga", learnSubtitle: "Kheyraadka internet-ka ee baranaha Ingiriisiga guriga",
  scenarios: "Xaaladaha Sheekada", scenariosDesc: "Ku celceli sheekooyin dhab ah xaaladaha nolosha Portlaoise.",
  scenariosBrowse: "Eeg Xaaladaha Sheekada", scenariosModalTitle: "Xaaladaha Sheekada",
  scenariosModalSubtitle: "Sheekooyin dhab ah ee ku kalsoonaanshaha xaaladaha maalinlaha ah Portlaoise, Ireland.",
  scenariosBack: "Dib u noqo", scenariosTips: "Talooyin waxtar leh xaaladdan",
  campsTitle: "Xarumaha Xagaaga", campsSubtitle: "Hel xarumaha ugu wanaagsan caruurta iyo dhalinyarada",
})

// Tigrinya
const ti = minimal({
  home: "መበገሲ ገጽ", laptop: "መምርሒ ላፕቶፕ", learn: "እንግሊዝኛ ምምሃር",
  camps: "ናይ ቀውዒ ካምፓት", cv: "CV ምፍጣር", learnBtn: "ምምሃር ጀምር",
  healthTitle: "ጥዕና ክንክን", healthText: "ዶክተር ርኸብ። ናብ ህጹጽ 112 ወይ 999 ደውል።",
  learnTitle: "ሪሶርሳት ናይ እንግሊዝኛ ምምሃር", learnSubtitle: "ካብ ገዛ እንግሊዝኛ ምምሃር ንምሕጋዝ ናይ ኢንተርኔት ሪሶርሳት",
  scenarios: "ናይ ዘረባ ሲናርዮታት", scenariosDesc: "ናይ ቀጻሊ ዕለታዊ ህይወት ዘረባ ምልምማድ ኣብ Portlaoise።",
  scenariosBrowse: "ናይ ዘረባ ሲናርዮታት ርኸብ", scenariosModalTitle: "ናይ ዘረባ ሲናርዮታት",
  scenariosModalSubtitle: "ኣብ ፖርትለዊስ፡ ኣየርላንድ ዕለታዊ ኩነታት ምዕምማን ናይ ዘረባ ሓቅ።",
  scenariosBack: "ምለስ", scenariosTips: "ንዚ ኩነት ዝጠቕሙ ምኽርታት",
  campsTitle: "ናይ ቀውዒ ካምፓት", campsSubtitle: "ንደቂ ስድራ ዝሰማዕ ዝበለጸ ካምፓት ርኸብ",
})

// Amharic
const am = minimal({
  home: "መነሻ ገጽ", laptop: "የላፕቶፕ መምሪያ", learn: "እንግሊዝኛ ተማር",
  camps: "የበጋ ካምፖች", cv: "CV ፍጠር", learnBtn: "መማር ጀምር",
  healthTitle: "የጤና አገልግሎት", healthText: "ሐኪም ሂድ። ድንገተኛ ሁኔታ ሲፈጠር 112 ወይም 999 ደውል።",
  learnTitle: "የእንግሊዝኛ ትምህርት ምንጮች", learnSubtitle: "ከቤት ሆኖ እንግሊዝኛ ለመማር የኢንተርኔት ምንጮች",
  scenarios: "የውይይት ሁኔታዎች", scenariosDesc: "በፖርትሌዊስ ዕለታዊ ህይወት ውስጥ እውነተኛ ንግግሮችን ተለማምድ።",
  scenariosBrowse: "የውይይት ሁኔታዎች ተመልከት", scenariosModalTitle: "የውይይት ሁኔታዎች",
  scenariosModalSubtitle: "በፖርትሌዊስ፣ አየርላንድ ዕለታዊ ሁኔታዎች ውስጥ ዕምነት ለማዳበር እውነተኛ ንግግሮች።",
  scenariosBack: "ተመለስ", scenariosTips: "ለዚህ ሁኔታ ጠቃሚ ምክሮች",
  campsTitle: "የበጋ ካምፖች", campsSubtitle: "ለልጆች እና ወጣቶች ምርጥ ካምፖች አግኝ",
})

// Chinese Simplified
const zh = minimal({
  home: "主页", laptop: "笔记本电脑指南", learn: "学英语",
  camps: "夏令营", cv: "创建简历", learnBtn: "开始学习",
  healthTitle: "医疗保健", healthText: "就诊医生。紧急情况请拨打112或999。",
  learnTitle: "英语学习资源", learnSubtitle: "在家学习英语的在线资源",
  scenarios: "对话场景", scenariosDesc: "练习波特莱西日常生活中的真实对话。",
  scenariosBrowse: "浏览对话场景", scenariosModalTitle: "对话场景",
  scenariosModalSubtitle: "在爱尔兰波特莱西日常情境中建立信心的真实对话。",
  scenariosBack: "返回", scenariosTips: "此情境的实用提示",
  campsTitle: "夏令营", campsSubtitle: "为儿童和青少年找到最好的营地",
})

// Turkish
const tr = minimal({
  home: "Ana Sayfa", laptop: "Dizüstü Bilgisayar Rehberi", learn: "İngilizce Öğren",
  camps: "Yaz Kampları", cv: "CV Oluştur", learnBtn: "Öğrenmeye Başla",
  healthTitle: "Sağlık Hizmetleri", healthText: "Bir doktora gidin. Acil durumlarda 112 veya 999'u arayın.",
  learnTitle: "İngilizce Öğrenme Kaynakları", learnSubtitle: "Evden İngilizce öğrenmek için çevrimiçi kaynaklar",
  scenarios: "Konuşma Senaryoları", scenariosDesc: "Portlaoise'deki günlük yaşam için gerçek konuşmalar pratiği yapın.",
  scenariosBrowse: "Konuşma Senaryolarına Göz At", scenariosModalTitle: "Konuşma Senaryoları",
  scenariosModalSubtitle: "İrlanda, Portlaoise'deki günlük durumlarda kendinizi rahat hissettirmek için gerçek konuşmalar.",
  scenariosBack: "Geri", scenariosTips: "Bu durum için yararlı ipuçları",
  campsTitle: "Yaz Kampları", campsSubtitle: "Çocuklar ve gençler için en iyi kampları bulun",
})

// Bengali
const bn = minimal({
  home: "হোম", laptop: "ল্যাপটপ গাইড", learn: "ইংরেজি শিখুন",
  camps: "গ্রীষ্মকালীন ক্যাম্প", cv: "CV তৈরি করুন", learnBtn: "শেখা শুরু করুন",
  healthTitle: "স্বাস্থ্যসেবা", healthText: "ডাক্তারের কাছে যান। জরুরি অবস্থায় ১১২ বা ৯৯৯ কল করুন।",
  learnTitle: "ইংরেজি শেখার সম্পদ", learnSubtitle: "বাড়ি থেকে ইংরেজি শেখার অনলাইন সম্পদ",
  scenarios: "কথোপকথনের দৃশ্য", scenariosDesc: "পোর্টলাওইসে দৈনন্দিন জীবনের জন্য বাস্তব কথোপকথন অনুশীলন করুন।",
  scenariosBrowse: "কথোপকথনের দৃশ্য দেখুন", scenariosModalTitle: "কথোপকথনের দৃশ্য",
  scenariosModalSubtitle: "আয়ারল্যান্ডের পোর্টলাওইসে দৈনন্দিন পরিস্থিতিতে আত্মবিশ্বাসী হওয়ার জন্য বাস্তব কথোপকথন।",
  scenariosBack: "ফিরে যান", scenariosTips: "এই পরিস্থিতির জন্য দরকারী টিপস",
  campsTitle: "গ্রীষ্মকালীন ক্যাম্প", campsSubtitle: "শিশু ও তরুণদের জন্য সেরা ক্যাম্প খুঁজুন",
})

// Hindi
const hi = minimal({
  home: "होम", laptop: "लैपटॉप गाइड", learn: "अंग्रेजी सीखें",
  camps: "ग्रीष्मकालीन शिविर", cv: "CV बनाएं", learnBtn: "सीखना शुरू करें",
  healthTitle: "स्वास्थ्य सेवा", healthText: "डॉक्टर के पास जाएं। आपातकाल में 112 या 999 पर कॉल करें।",
  learnTitle: "अंग्रेजी सीखने के संसाधन", learnSubtitle: "घर से अंग्रेजी सीखने के लिए ऑनलाइन संसाधन",
  scenarios: "वार्तालाप परिदृश्य", scenariosDesc: "पोर्टलाओइस में दैनिक जीवन के लिए वास्तविक बातचीत का अभ्यास करें।",
  scenariosBrowse: "वार्तालाप परिदृश्य देखें", scenariosModalTitle: "वार्तालाप परिदृश्य",
  scenariosModalSubtitle: "आयरलैंड के पोर्टलाओइस में रोज़मर्रा की स्थितियों में आत्मविश्वास के लिए वास्तविक बातचीत।",
  scenariosBack: "वापस", scenariosTips: "इस स्थिति के लिए उपयोगी सुझाव",
  campsTitle: "ग्रीष्मकालीन शिविर", campsSubtitle: "बच्चों और युवाओं के लिए सर्वश्रेष्ठ शिविर खोजें",
})

// Swahili
const sw = minimal({
  home: "Ukurasa wa Nyumbani", laptop: "Mwongozo wa Laptop", learn: "Jifunze Kiingereza",
  camps: "Kambi za Majira ya Joto", cv: "Tengeneza CV", learnBtn: "Anza Kujifunza",
  healthTitle: "Huduma za Afya", healthText: "Tembelea daktari. Dharura piga simu 112 au 999.",
  learnTitle: "Rasilimali za Kujifunza Kiingereza", learnSubtitle: "Rasilimali za mtandaoni za kujifunza Kiingereza nyumbani",
  scenarios: "Hali za Mazungumzo", scenariosDesc: "Fanya mazoezi ya mazungumzo ya kweli kwa maisha ya kila siku Portlaoise.",
  scenariosBrowse: "Angalia Hali za Mazungumzo", scenariosModalTitle: "Hali za Mazungumzo",
  scenariosModalSubtitle: "Mazungumzo ya kweli kwa ujasiri katika hali za kila siku Portlaoise, Ireland.",
  scenariosBack: "Rudi", scenariosTips: "Vidokezo vya manufaa kwa hali hii",
  campsTitle: "Kambi za Majira ya Joto", campsSubtitle: "Pata kambi bora kwa watoto na vijana",
})

// Initialize i18next once (client-side singleton)
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en:  { translation: en },
        ar:  { translation: ar },
        uk:  { translation: uk },
        pl:  { translation: pl },
        ro:  { translation: ro },
        fr:  { translation: fr },
        es:  { translation: es },
        de:  { translation: de },
        it:  { translation: it },
        pt:  { translation: pt },
        ru:  { translation: ru },
        ku:  { translation: ku },
        ps:  { translation: ps },
        fa:  { translation: fa },
        km:  { translation: km },
        so:  { translation: so },
        ti:  { translation: ti },
        am:  { translation: am },
        zh:  { translation: zh },
        tr:  { translation: tr },
        bn:  { translation: bn },
        hi:  { translation: hi },
        sw:  { translation: sw },
      },
      fallbackLng: "en",
      interpolation: { escapeValue: false },
      detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] },
    })
}

// ─── RTL language codes ───────────────────────────────────────────────────────
const RTL_LANGS = new Set(["ar", "fa", "ur", "he", "yi", "ps", "ku"])

// ─── Context ──────────────────────────────────────────────────────────────────
interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { t: i18nT, i18n: i18nInstance } = useTranslation()
  const [language, setLanguageState] = useState<string>(i18nInstance.language || "en")

  const setLanguage = (lang: string) => {
    i18nInstance.changeLanguage(lang)
    setLanguageState(lang)
  }

  useEffect(() => {
    const handler = (lng: string) => setLanguageState(lng)
    i18nInstance.on("languageChanged", handler)
    return () => i18nInstance.off("languageChanged", handler)
  }, [i18nInstance])

  const t = (key: string): string => i18nT(key)
  const isRTL = RTL_LANGS.has(language.split("-")[0])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider")
  return context
}
