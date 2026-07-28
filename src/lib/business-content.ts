import type { Discipline } from "@/lib/types";
import type { Locale } from "@/lib/locale-shared";
import { localizedPath } from "@/lib/locale-shared";

export const SITE_URL = "https://studiokova.com";

type ServiceOffer = {
  eyebrow: string;
  promise: string;
  audience: string;
  deliverables: string[];
  goodFit: string[];
  startingPoint: string;
};

type ProjectProof = {
  status: string;
  disclosure: string;
  clientType: string;
  stage: string;
  scale: string;
  timeframe: string;
  challenge: string;
  outcome: string;
  credits: string;
  verified: boolean;
};

const SERVICE_OFFERS: Record<Locale, Record<Discipline, ServiceOffer>> = {
  uk: {
    architecture: {
      eyebrow: "Повний цикл",
      promise:
        "Від перевірки потенціалу місця до узгодженої проєктної документації та супроводу реалізації.",
      audience:
        "Приватні будинки, невеликі житлові об’єкти, студії та простори з чіткою авторською задачею.",
      deliverables: [
        "аналіз ділянки, обмежень і сценаріїв",
        "концепція, плани, розрізи та об’єм",
        "матеріальна й просторова система",
        "координація візуалізації та документації",
        "пакет для наступної стадії реалізації",
      ],
      goodFit: [
        "потрібна одна відповідальна дизайн-лінія",
        "рішення треба перевіряти до будівництва",
        "цінуєте матеріальність, пропорцію та спокійну архітектуру",
      ],
      startingPoint:
        "Починаємо з ділянки або приміщення, задачі, географії та бажаного горизонту реалізації.",
    },
    interiors: {
      eyebrow: "Простір під ключ",
      promise:
        "Інтер’єр, у якому планування, світло, матеріали, меблі й деталі вирішуються як одна система.",
      audience:
        "Квартири, будинки, boutique hospitality, невеликі комерційні та творчі простори.",
      deliverables: [
        "просторовий сценарій і планувальні варіанти",
        "концепція матеріалів, світла й кольору",
        "вбудовані меблі та ключові деталі",
        "візуалізації для прийняття рішень",
        "робочі креслення узгодженого обсягу",
      ],
      goodFit: [
        "потрібна цілісність замість набору декораторських рішень",
        "важлива точність меблів і вузлів",
        "хочете бачити простір до реалізації",
      ],
      startingPoint:
        "Надішліть план, фото наявного простору, приблизну площу та список того, що має змінитися.",
    },
    visualization: {
      eyebrow: "Для студій і девелоперів",
      promise:
        "Фотореалістичні зображення, які не прикрашають слабке рішення, а допомагають перевірити й точно представити сильне.",
      audience:
        "Архітектори, дизайн-студії, девелопери, конкурси та клієнтські презентації.",
      deliverables: [
        "art direction і погодження камер",
        "матеріали, світло та атмосфера",
        "серія still images узгодженого формату",
        "контрольні прев’ю та раунди правок",
        "фінальні файли для digital або print",
      ],
      goodFit: [
        "є модель або креслення, але бракує атмосфери",
        "зображення мають точно зберегти авторський задум",
        "потрібна надійна зовнішня visualisation-команда",
      ],
      startingPoint:
        "Починаємо з моделі, креслень, референсів, переліку кадрів і дати фінальної подачі.",
    },
    printing: {
      eyebrow: "Фізична перевірка",
      promise:
        "Макети й прототипи, які дають побачити геометрію, допуски та характер об’єкта до фінального виготовлення.",
      audience:
        "Архітектурні макети, тестові вузли, невеликі об’єкти, кріплення та дослідні серії.",
      deliverables: [
        "підготовка або перевірка 3D-моделі",
        "вибір масштабу, матеріалу й технології",
        "тестовий друк або prototype sprint",
        "ітерації критичних вузлів",
        "фінальний макет чи мала серія",
      ],
      goodFit: [
        "деталь складно оцінити лише на екрані",
        "потрібно швидко перевірити кілька варіантів",
        "фізичний прототип має вплинути на дизайн",
      ],
      startingPoint:
        "Надішліть модель або ескіз, габарити, бажаний матеріал і те, яке рішення має підтвердити прототип.",
    },
    drafting: {
      eyebrow: "Технічний партнер",
      promise:
        "Креслення та координація, що роблять задум зрозумілим для кошторису, погодження й будівельного майданчика.",
      audience:
        "Архітектори, інтер’єрні студії, девелопери та проєкти, яким потрібна додаткова технічна спроможність.",
      deliverables: [
        "аудит наявного концепту й вихідних даних",
        "узгоджений перелік креслень",
        "плани, розгортки, деталі та специфікації",
        "координація критичних перетинів",
        "передача й ревізія комплекту",
      ],
      goodFit: [
        "сильна концепція потребує точного buildable set",
        "внутрішній команді бракує ресурсу на документацію",
        "потрібна контрольована передача між дизайном і реалізацією",
      ],
      startingPoint:
        "Потрібні наявні креслення, стадія, юрисдикція, очікуваний склад комплекту та дедлайн.",
    },
  },
  en: {
    architecture: {
      eyebrow: "Full service",
      promise:
        "From testing the potential of a place to coordinated design documentation and support through delivery.",
      audience:
        "Private houses, small residential projects, studios, and spaces with a clear architectural ambition.",
      deliverables: [
        "site, constraint, and scenario review",
        "concept, plans, sections, and massing",
        "material and spatial system",
        "visualization and documentation coordination",
        "a clear package for the next delivery stage",
      ],
      goodFit: [
        "you need one accountable design line",
        "decisions should be tested before construction",
        "you value materiality, proportion, and quiet architecture",
      ],
      startingPoint:
        "We begin with the site or space, the problem, its geography, and the intended horizon for making.",
    },
    interiors: {
      eyebrow: "Space end to end",
      promise:
        "Interiors where plan, light, material, joinery, and detail are resolved as one system.",
      audience:
        "Apartments, houses, boutique hospitality, and small commercial or creative spaces.",
      deliverables: [
        "spatial brief and layout options",
        "material, light, and colour concept",
        "joinery and key details",
        "visualizations for decision-making",
        "working drawings for the agreed scope",
      ],
      goodFit: [
        "you want coherence rather than decoration",
        "joinery and construction detail matter",
        "you need to see the space before delivery",
      ],
      startingPoint:
        "Send a plan, existing-space photographs, approximate area, and the list of things that need to change.",
    },
    visualization: {
      eyebrow: "For studios and developers",
      promise:
        "Photoreal images that do more than decorate: they test a design and present it without losing its intent.",
      audience:
        "Architects, design studios, developers, competitions, and client presentations.",
      deliverables: [
        "art direction and camera agreement",
        "material, lighting, and atmosphere development",
        "an agreed series of still images",
        "review previews and revision rounds",
        "final files for digital or print",
      ],
      goodFit: [
        "the model exists but the atmosphere does not",
        "the architect’s intent must remain intact",
        "you need a dependable external visualization team",
      ],
      startingPoint:
        "We begin with the model, drawings, references, shot list, and final delivery date.",
    },
    printing: {
      eyebrow: "Physical testing",
      promise:
        "Models and prototypes that expose geometry, tolerance, and character before final fabrication.",
      audience:
        "Architectural models, test details, small objects, fittings, and research series.",
      deliverables: [
        "3D model preparation or review",
        "scale, material, and process selection",
        "test print or prototype sprint",
        "critical-detail iterations",
        "final model or short run",
      ],
      goodFit: [
        "a detail cannot be judged on screen alone",
        "several variants need rapid testing",
        "the physical prototype should influence the design",
      ],
      startingPoint:
        "Send a model or sketch, dimensions, preferred material, and the decision the prototype needs to answer.",
    },
    drafting: {
      eyebrow: "Technical partner",
      promise:
        "Drawings and coordination that make intent legible for pricing, approvals, and the construction site.",
      audience:
        "Architects, interior studios, developers, and teams needing additional technical capacity.",
      deliverables: [
        "review of concept and source information",
        "an agreed drawing register",
        "plans, elevations, details, and schedules",
        "coordination of critical interfaces",
        "package handover and revision",
      ],
      goodFit: [
        "a strong concept needs a precise buildable set",
        "the internal team lacks documentation capacity",
        "the handoff from design to delivery needs control",
      ],
      startingPoint:
        "We need the existing set, project stage, jurisdiction, expected drawing package, and deadline.",
    },
  },
};

const PROJECT_PROOF: Record<Locale, Record<string, ProjectProof>> = {
  uk: {},
  en: {},
};

const MOCK_PROOF: Record<Locale, ProjectProof> = {
  uk: {
    status: "Концептуальний кейс",
    disclosure:
      "Демонстраційний матеріал. Реальні статус, клієнт, метрики й credits будуть підключені з адмінки після перевірки.",
    clientType: "Mock-профіль клієнта",
    stage: "Концепція / демонстрація",
    scale: "Буде додано",
    timeframe: "Буде додано",
    challenge:
      "Цей блок зарезервований для реальної задачі, обмежень і контексту проєкту.",
    outcome:
      "Цей блок зарезервований для перевіреного результату, а не рекламного твердження.",
    credits: "Команда, партнери, фотограф і права на зображення — після audit.",
    verified: false,
  },
  en: {
    status: "Concept case",
    disclosure:
      "Demonstration content. Real status, client, metrics, and credits will be connected from the CMS after verification.",
    clientType: "Mock client profile",
    stage: "Concept / demonstration",
    scale: "To be added",
    timeframe: "To be added",
    challenge:
      "Reserved for the real project problem, constraints, and context.",
    outcome:
      "Reserved for a verified outcome rather than a marketing claim.",
    credits: "Team, collaborators, photographer, and image rights after audit.",
    verified: false,
  },
};

export const BUSINESS_COPY = {
  uk: {
    paths: {
      label: "Два формати співпраці",
      title: "Одна практика. Два чіткі шляхи входу.",
      lead:
        "Не змушуємо приватного клієнта й професійну команду шукати потрібне між однаковими абзацами.",
      items: [
        {
          number: "01",
          title: "Будинок або інтер’єр",
          description:
            "Цілісний процес для приватних клієнтів і невеликих девелоперських проєктів — від першої перевірки до документації.",
          href: "/services#private",
          cta: "Дивитися повний цикл",
        },
        {
          number: "02",
          title: "Підтримка професійної команди",
          description:
            "Візуалізація, документація та прототипування як сфокусоване продовження архітектурної студії чи девелопера.",
          href: "/services#partners",
          cta: "Дивитися B2B-послуги",
        },
      ],
    },
    market: {
      label: "База й географія",
      title: "Базуємось у Копенгагені. Працюємо там, де можемо відповідати за результат.",
      body:
        "Концепцію, інтер’єр, візуалізацію й технічну підтримку можемо вести дистанційно. Архітектурну документацію та погодження беремо лише після перевірки юрисдикції й ролі локального ліцензованого партнера.",
      note:
        "Це mock-позиціонування. Реальні ринки, юридична особа та професійні повноваження мають бути підтверджені перед запуском.",
    },
    team: {
      label: "Люди й відповідальність",
      title: "Клієнт має знати, хто тримає проєкт.",
      lead:
        "Структура команди готова до адмінки. Імена, досвід, освіта, memberships і фото не вигадуємо — вони з’являться після credential audit.",
      roles: [
        {
          title: "Керівництво практикою",
          focus: "Відносини з клієнтом, creative direction і ключові рішення.",
        },
        {
          title: "Архітектура та інтер’єр",
          focus: "Просторова концепція, матеріали, світло й координація дизайну.",
        },
        {
          title: "Візуалізація та технічна реалізація",
          focus: "Зображення, креслення, прототипи й контроль передачі задуму.",
        },
      ],
      pending: "Профіль очікує підтверджених даних",
    },
    proof: {
      label: "Стандарт доказу",
      title: "Красивої історії недостатньо.",
      lead:
        "Після підключення адмінки кожен кейс матиме однаковий доказовий каркас.",
      items: [
        "реальний статус: built, in progress, concept або visualization-only",
        "клієнт чи тип клієнта та дозвіл на публікацію",
        "масштаб, строки, роль Studio Kova й склад deliverables",
        "задача, обмеження та перевірений результат",
        "credits, партнери, фотограф і права на зображення",
      ],
    },
    services: {
      label: "Послуги",
      title: "Не список навичок, а зрозумілі формати результату.",
      lead:
        "Кожна послуга пояснює, для кого вона, що входить у роботу й з якими даними можна почати.",
      privateTitle: "Для приватних клієнтів і невеликих девелоперів",
      partnersTitle: "Для архітектурних студій і професійних команд",
      details: "Деталі послуги",
      discuss: "Обговорити задачу",
    },
    studioPage: {
      metadataTitle: "Студія",
      metadataDescription:
        "Studio Kova — структура практики, географія, принципи відповідальності та команда.",
      title: "Спокійна робота. Чітко, хто відповідає.",
      lead:
        "Ми поєднуємо дизайн і технічне продовження, але не ховаємо межі компетенції за красивою мовою.",
    },
    servicesPage: {
      metadataTitle: "Послуги",
      metadataDescription:
        "Архітектура, інтер’єри, візуалізація, документація й прототипування Studio Kova.",
    },
    contactPage: {
      metadataTitle: "Почати проєкт",
      metadataDescription:
        "Короткий кваліфікаційний бриф для нового проєкту або професійної співпраці зі Studio Kova.",
      label: "Проєктний бриф",
      title: "Дайте нам достатньо контексту для змістовної першої відповіді.",
      lead:
        "Форма нічого не зберігає: вона формує структурований лист у вашій поштовій програмі. Пізніше цей самий контракт підключимо до CRM.",
    },
    privacyPage: {
      metadataTitle: "Приватність",
      title: "Приватність без дрібного шрифту.",
      intro:
        "Поточна mock-версія сайту не зберігає дані brief-форми на сервері й не підключає сторонню аналітику.",
      sections: [
        {
          title: "Контакт",
          body:
            "Після відправлення брифу відкривається ваша поштова програма. Дані передаються лише тоді, коли ви самостійно надсилаєте лист.",
        },
        {
          title: "Мова",
          body:
            "Сайт зберігає технічний cookie вибору мови на вашому пристрої. Він не використовується для реклами.",
        },
        {
          title: "Аналітика",
          body:
            "Події конверсії мають підготовлені назви, але жоден сторонній сервіс аналітики зараз не отримує даних.",
        },
        {
          title: "Перед публічним запуском",
          body:
            "Юридична особа, адреса контролера, строки зберігання, підрядники та контакт із питань приватності мають бути заповнені підтвердженими даними.",
        },
      ],
    },
    faq: {
      label: "Перед стартом",
      title: "Питання, які краще узгодити одразу.",
      items: [
        {
          question: "З якої стадії можна звертатися?",
          answer:
            "Від ділянки або першої ідеї до вже готової концепції, якій потрібна візуалізація, документація чи фізичний прототип.",
        },
        {
          question: "Чи працюєте ви дистанційно?",
          answer:
            "Так — для концепції, інтер’єру, візуалізації та технічної підтримки. Архітектурна відповідальність залежить від країни й локальних партнерів.",
        },
        {
          question: "Чи можна замовити одну послугу?",
          answer:
            "Так. Візуалізація, документація та прототипування доступні як окремі B2B-пакети.",
        },
        {
          question: "Чи є мінімальний бюджет?",
          answer:
            "Реальні діапазони будуть додані після комерційного audit. У брифі вже є поле бюджету, щоб не витрачати час обох сторін.",
        },
        {
          question: "Що відбувається після брифу?",
          answer:
            "Ми перевіряємо відповідність задачі, географії та графіка, ставимо уточнювальні питання й лише тоді пропонуємо формат першого платного етапу.",
        },
      ],
    },
    project: {
      status: "Статус",
      client: "Клієнт",
      stage: "Стадія",
      scale: "Масштаб",
      timeframe: "Термін",
      challenge: "Задача й обмеження",
      outcome: "Результат",
      credits: "Credits",
      similar: "Обговорити подібний проєкт",
      mockLabel: "Демо-контент",
    },
  },
  en: {
    paths: {
      label: "Two ways to work together",
      title: "One practice. Two clear entry points.",
      lead:
        "A private client and a professional team should not have to search through the same paragraphs.",
      items: [
        {
          number: "01",
          title: "A house or interior",
          description:
            "A continuous process for private clients and small developments, from first feasibility to documentation.",
          href: "/services#private",
          cta: "Explore full service",
        },
        {
          number: "02",
          title: "Professional team support",
          description:
            "Visualization, documentation, and prototyping as a focused extension of an architecture studio or developer.",
          href: "/services#partners",
          cta: "Explore B2B services",
        },
      ],
    },
    market: {
      label: "Base and geography",
      title: "Based in Copenhagen. Working where we can be accountable for the result.",
      body:
        "Concept, interiors, visualization, and technical support can be delivered remotely. Architectural documentation and approvals begin only after the jurisdiction and role of a locally licensed partner are clear.",
      note:
        "Mock positioning. Markets, legal entity, and professional credentials must be verified before launch.",
    },
    team: {
      label: "People and accountability",
      title: "A client should know who holds the project.",
      lead:
        "The team structure is ready for the CMS. Names, experience, education, memberships, and portraits are not invented; they follow a credential audit.",
      roles: [
        {
          title: "Practice direction",
          focus: "Client relationship, creative direction, and key decisions.",
        },
        {
          title: "Architecture and interiors",
          focus: "Spatial concept, material, light, and design coordination.",
        },
        {
          title: "Visualization and technical delivery",
          focus: "Images, drawings, prototypes, and control of design handover.",
        },
      ],
      pending: "Profile awaiting verified information",
    },
    proof: {
      label: "Proof standard",
      title: "A beautiful story is not enough.",
      lead:
        "Once the CMS is connected, every case will follow the same evidence structure.",
      items: [
        "real status: built, in progress, concept, or visualization-only",
        "client or client type and publication permission",
        "scale, timeline, Studio Kova role, and deliverables",
        "problem, constraints, and verified outcome",
        "credits, collaborators, photographer, and image rights",
      ],
    },
    services: {
      label: "Services",
      title: "Not a list of skills, but clear formats of delivery.",
      lead:
        "Each service explains who it is for, what the work includes, and what information starts the conversation.",
      privateTitle: "For private clients and small developers",
      partnersTitle: "For architecture studios and professional teams",
      details: "Service details",
      discuss: "Discuss the brief",
    },
    studioPage: {
      metadataTitle: "Studio",
      metadataDescription:
        "Studio Kova’s practice structure, geography, accountability, and team.",
      title: "Quiet work needs clear accountability.",
      lead:
        "We combine design with technical follow-through without hiding the limits of responsibility behind beautiful language.",
    },
    servicesPage: {
      metadataTitle: "Services",
      metadataDescription:
        "Architecture, interiors, visualization, documentation, and prototyping by Studio Kova.",
    },
    contactPage: {
      metadataTitle: "Start a project",
      metadataDescription:
        "A short qualification brief for a new project or professional collaboration with Studio Kova.",
      label: "Project brief",
      title: "Give us enough context for a useful first response.",
      lead:
        "The form stores nothing: it prepares a structured email in your mail app. The same data contract can later connect to a CRM.",
    },
    privacyPage: {
      metadataTitle: "Privacy",
      title: "Privacy without the small print.",
      intro:
        "This mock version stores no brief-form data on the server and sends no data to third-party analytics.",
      sections: [
        {
          title: "Contact",
          body:
            "Submitting the brief opens your email application. Data is only transferred when you choose to send the email.",
        },
        {
          title: "Language",
          body:
            "The site stores a technical language-preference cookie on your device. It is not used for advertising.",
        },
        {
          title: "Analytics",
          body:
            "Conversion event names are prepared, but no third-party analytics service currently receives data.",
        },
        {
          title: "Before public launch",
          body:
            "Legal entity, controller address, retention periods, processors, and a privacy contact must be completed with verified information.",
        },
      ],
    },
    faq: {
      label: "Before we begin",
      title: "Questions worth aligning early.",
      items: [
        {
          question: "At what stage can we begin?",
          answer:
            "From a site or first idea to an existing concept that needs visualization, documentation, or a physical prototype.",
        },
        {
          question: "Do you work remotely?",
          answer:
            "Yes for concept, interiors, visualization, and technical support. Architectural responsibility depends on country and local partners.",
        },
        {
          question: "Can we commission one service?",
          answer:
            "Yes. Visualization, documentation, and prototyping are available as focused B2B packages.",
        },
        {
          question: "Is there a minimum budget?",
          answer:
            "Real ranges will follow a commercial audit. The brief already asks for a budget range so neither side loses time.",
        },
        {
          question: "What happens after the brief?",
          answer:
            "We check fit, geography, and capacity, ask any necessary questions, and then propose the shape of a first paid stage.",
        },
      ],
    },
    project: {
      status: "Status",
      client: "Client",
      stage: "Stage",
      scale: "Scale",
      timeframe: "Timeframe",
      challenge: "Problem and constraints",
      outcome: "Outcome",
      credits: "Credits",
      similar: "Discuss a similar project",
      mockLabel: "Demo content",
    },
  },
} as const;

export function getBusinessCopy(locale: Locale) {
  return BUSINESS_COPY[locale];
}

export function getServiceOffer(locale: Locale, discipline: Discipline) {
  return SERVICE_OFFERS[locale][discipline];
}

export function getProjectProof(locale: Locale, slug: string) {
  return PROJECT_PROOF[locale][slug] ?? MOCK_PROOF[locale];
}

export function localizedAlternates(path: string, locale: Locale) {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      uk: localizedPath("uk", path),
      en: localizedPath("en", path),
      "x-default": localizedPath("uk", path),
    },
  };
}
