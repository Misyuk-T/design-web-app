import type {
  Discipline,
  Project,
  Service,
  SiteContent,
  SiteSettings,
} from "@/lib/types";
import type { Locale } from "@/lib/locale-shared";

export type { Locale } from "@/lib/locale-shared";

type LocalizedProject = Pick<
  Project,
  "title" | "location" | "summary" | "body" | "role"
>;

const UK_PROJECTS: Record<string, LocalizedProject> = {
  "villa-solveig": {
    title: "Вілла Solveig",
    location: "Ютландія, Данія",
    summary:
      "Невисокий будинок із дерева та вапна, вписаний у прибережний схил і спроєктований так, щоб іти за сонцем — від ранкової кухні до вечірньої вітальні.",
    body:
      "Вілла Solveig тихо стоїть серед дюнних трав. Її довгий одноповерховий об’єм змінюється лише там, де дах піднімається, впускаючи північне світло у житлові простори. Ми проєктували будинок зсередини назовні — почали зі щоденного руху сонця та повільних сімейних ритуалів ранку й вечора, а потім огорнули його необробленим деревом і вапняною штукатуркою, що з часом посивіють і стануть частиною узбережжя.\n\nStudio Kova вела проєкт від першого ескізу до останнього кріплення: архітектура, інтер’єр, повний комплект робочих креслень і візуалізації, завдяки яким родина змогла відчути будинок ще за рік до його появи. Дуб, вапно й чорнена сталь повторюються в усьому просторі, тому будівля читається як єдина матеріальна думка, а не набір кімнат.\n\nУ результаті будинок здається не поставленим, а знайденим — фрагментом ландшафту, якому надали рівно стільки форми, щоб у ньому можна було жити.",
    role: "Архітектура · Інтер’єр · Документація · Візуалізація",
  },
  "apartment-lindengade": {
    title: "Апартаменти Lindengade",
    location: "Копенгаген, Данія",
    summary:
      "Квартиру XIX століття очистили до самої структури й зібрали наново навколо теплої штукатурки, дуба та однієї довгої візуальної осі.",
    body:
      "Втомлену квартиру на верхньому поверсі в старому місті перетворили на спокійний і щедрий дім. Ми прибрали століття нашарувань, повернули первісний об’єм і проклали вздовж нього вісь дубових меблів — стіну, що непомітно вміщує кухню, бібліотеку та сховища, необхідні невеликій квартирі.\n\nСтіни оздоблено вапняною штукатуркою кольору невибіленого льону, підлогу — широкими дошками відновленого дуба. Усе зайве прибрали, щоб відчувалися світло й кілька справді важливих речей, які залишили господарі.\n\nМи спроєктували інтер’єр, підготували креслення столярних виробів і створили візуалізації, що спрямовували кожне рішення щодо матеріалу й тону.",
    role: "Дизайн інтер’єру · Креслення столярних виробів · Візуалізація",
  },
  "northlight-pavilion": {
    title: "Павільйон Northlight",
    location: "Осло, Норвегія",
    summary:
      "Невеликий садовий павільйон із керамічним друкованим склепінням, яке повністю прототипували, налаштували й виготовили у студії.",
    body:
      "Павільйон Northlight, створений для приватного саду, перевіряє, наскільки далеко власне виробництво може провести дизайн. Його затінювальне склепіння зібране з надрукованих у глині елементів, кожен із яких сформовано так, щоб відводити дощ і протягом дня малювати на підлозі рухому решітку тіней.\n\nМи змоделювали геометрію, надрукували й випалили серію прототипів, щоб точно вирішити вузол і допуски, а потім виготовили фінальний комплект деталей на власному обладнанні студії. Жодна частина об’єкта не пройшла через постачальника, поруч із яким ми не могли б стояти.\n\nЦе невелика будівля, але найчіткіше формулювання нашого методу: ідея, яку накреслили, перевірили й виготовили під одним дахом.",
    role: "3D-друк · Прототипування · Архітектура",
  },
  "harbour-house-visualization": {
    title: "Harbour House",
    location: "Лісабон, Португалія",
    summary:
      "Повний набір фотореалістичних зображень для конкурсного проєкту портового будинку — атмосферу вирішили задовго до початку будівництва.",
    body:
      "Harbour House — серія фотореалістичних візуалізацій для іншої архітектурної практики: спочатку вони підтримали конкурсну пропозицію, а згодом допомагали замовнику під час будівництва. У брифі атмосфера була важливішою за ефектність: тепле післяобіднє світло на вибілених вапном стінах і особливий синій колір Тежу на середньому плані.\n\nМи зібрали сцену з моделі архітектора й розвивали матеріали, освітлення та постановку, доки кожен кадр не став схожим на фотографію вже існуючого місця. Зображення виконали свою роботу — проєкт переміг, а студія продовжила супровід реалізації.\n\nЦе наша послуга візуалізації як самостійний продукт: стримана, точна й вірна дизайну, який вона представляє.",
    role: "3D-візуалізація · Артдирекція",
  },
  "meridian-documentation-set": {
    title: "Документація Meridian",
    location: "Львів, Україна",
    summary:
      "Повний комплект дозвільної та робочої документації, що чисто й без втрат перевів концепцію на будівельний майданчик.",
    body:
      "Для багатофункціональної будівлі, спроєктованої іншою командою, Studio Kova підготувала повну технічну документацію — креслення, відомості та специфікації, які перетворюють задум на проєкт, придатний до погодження й будівництва.\n\nСпираючись на концепцію, ми вирішили конструктивні деталі, скоординували розділи та передали дозвільний і робочий комплект, достатньо точний для розрахунку вартості й реалізації без двозначностей. Це уважна, терпляча робота — саме тут багато сильних проєктів непомітно губляться або, навпаки, рятуються.\n\nМи ставимося до неї так само серйозно, як до будь-якого фасаду: креслення — це дизайн, зроблений довговічним.",
    role: "Креслення · Робоча документація · Координація",
  },
  "atelier-morgen": {
    title: "Ательє Morgen",
    location: "Орхус, Данія",
    summary:
      "Робоча студія й галерея для керамістки — одна спокійна кімната з верхнім світлом, спроєктована й задокументована від початку до кінця.",
    body:
      "Ательє Morgen — невелика майстерня й галерея для керамістки у дворі терасного будинку XIX століття. Завданням була одна тиха кімната з верхнім світлом — місце для роботи й показу, тепле взимку та прохолодне довгим північним літом.\n\nМи спроєктували компактний дерев’яний об’єм із верхнім рядом вікон, що рівномірно омиває робочу стіну північним світлом, литою вапняною підлогою та вбудованими дубовими полицями, розрахованими під власні роботи майстрині. Studio Kova провела проєкт від концепції через повну робочу документацію до майданчика.\n\nСтриманість і була всім дизайном: одна палітра матеріалів, одне джерело світла й нічого, що змагалося б із роботами всередині.",
    role: "Архітектура · Інтер’єр · Документація",
  },
};

const UK_SERVICES: Record<Discipline, Pick<Service, "title" | "description">> = {
  architecture: {
    title: "Архітектура",
    description:
      "Будинки й виважені споруди, сформовані світлом, пропорцією та місцем. Від першого об’єму до деталей, завдяки яким поріг здається неминучим.",
  },
  interiors: {
    title: "Інтер’єр і 3D-дизайн",
    description:
      "Інтер’єри як єдина атмосфера — матеріали, столярні вироби й меблі вирішуються разом, щоб кімната звучала як одна спокійна думка.",
  },
  visualization: {
    title: "3D-візуалізація",
    description:
      "Фотореалістичні зображення, що перевіряють простір до його появи: світло, матеріал і настрій, передані стримано — для замовників і партнерів.",
  },
  drafting: {
    title: "Креслення й документація",
    description:
      "Точні робочі креслення та проєктна документація. Непомітна дисципліна, що переносить задум зі студії на майданчик без втрат.",
  },
  printing: {
    title: "3D-друк і виготовлення",
    description:
      "Власне прототипування, макети й друковані об’єкти. Ми скорочуємо відстань між кресленням і фізичною річчю, яку можна взяти в руки й оцінити.",
  },
};

const UK_SETTINGS: Pick<
  SiteSettings,
  "tagline" | "heroStatement" | "heroSub" | "aboutStatement" | "location"
> = {
  tagline: "Одна студія — від першого ескізу до виготовленого об’єкта.",
  heroStatement:
    "Одна студія для архітектури, інтер’єрів і всього, що потрібно для їх втілення.",
  heroSub:
    "Ми ведемо проєкт від початку до кінця — концепція, дизайн, візуалізація, документація й виготовлення — однією командою та однією стриманою мовою матеріалів.",
  aboutStatement:
    "Studio Kova — невелика досвідчена практика, що поєднує архітектуру, інтер’єр і 3D-дизайн, фотореалістичну візуалізацію, 3D-друк та проєктну документацію. Ми віримо, що простір виходить цілісним, коли одна команда тримає його від першої лінії до останнього кріплення — тоді між ідеєю та зробленою річчю нічого не губиться. Наша робота свідомо тиха: теплі матеріали, чесні пропорції та світло як повноцінний будівельний матеріал.",
  location: "Копенгаген, Данія",
};

const UK_PROCESS = [
  {
    title: "Концепція",
    description:
      "Починаємо з місця, світла й життя, яке має вмістити простір. Перші рухи малюємо від руки — пропорція та намір перед деталлю.",
  },
  {
    title: "Дизайн",
    description:
      "План, розріз і матеріал вирішуємо разом. Архітектура та інтер’єр стають одним безперервним жестом без передачі між дисциплінами.",
  },
  {
    title: "Візуалізація",
    description:
      "Фотореалістичні зображення перевіряють атмосферу до будівництва: як ранок лягає на стіну, як старіє матеріал, що відчуває людина в кімнаті.",
  },
  {
    title: "Документація",
    description:
      "Концепція стає придатною до реалізації. Точні креслення й документація переносять дизайн зі студії на майданчик без втрат.",
  },
  {
    title: "Виготовлення",
    description:
      "Коли цього потребує деталь, ми прототипуємо й друкуємо у студії — макети, кріплення та об’єкти, замикаючи коло між кресленням і річчю.",
  },
] as const;

const SAFE_STATS: Record<
  Locale,
  { label: string; value: string }[]
> = {
  uk: [
    { label: "Інтегрована практика", value: "01" },
    { label: "Напрямів у студії", value: "05" },
    { label: "Безперервний процес", value: "A—Z" },
  ],
  en: [
    { label: "Integrated practice", value: "01" },
    { label: "Disciplines in-house", value: "05" },
    { label: "Continuous process", value: "A—Z" },
  ],
};

export const disciplineLabels: Record<
  Locale,
  Record<Discipline, string>
> = {
  uk: {
    architecture: "Архітектура",
    interiors: "Дизайн інтер’єру",
    visualization: "3D-візуалізація",
    printing: "3D-друк",
    drafting: "Документація",
  },
  en: {
    architecture: "Architecture",
    interiors: "Interior design",
    visualization: "3D visualization",
    printing: "3D printing",
    drafting: "Documentation",
  },
};

export const commonCopy = {
  uk: {
    skip: "Перейти до вмісту",
    header: {
      primary: "Головна навігація",
      studio: "Студія",
      disciplines: "Напрями",
      work: "Вибрані роботи",
      process: "Процес",
      start: "Почати проєкт",
      menu: "Меню",
      close: "Закрити",
      navigation: "Навігація",
      mobileNavigation: "Мобільна навігація",
      commissions: "Нові проєкти",
    },
    footer: {
      description:
        "Архітектура, інтер’єри, візуалізація, документація й виготовлення як одна безперервна практика.",
      navigate: "Навігація",
      elsewhere: "Соцмережі",
      contact: "Контакт",
      location: "Копенгаген, Данія",
      independent: "Незалежна мультидисциплінарна практика",
      privacy: "Приватність",
    },
    hero: {
      based: "Базуємось у",
      takingOn: "Приймаємо",
      commissions: "вибрані нові проєкти",
      explore: "Дивитися вибрані роботи",
      scroll: "Гортайте",
    },
    studio: {
      label: "Студія",
      title: "Простір стає цілісним, коли одна думка тримає все.",
      alt: "Спокійний інтер’єр Studio Kova, сформований м’яким денним світлом",
      throughline: "Наша наскрізна лінія",
    },
    disciplines: {
      label: "Напрями",
      title: "Одна практика. П’ять способів створювати.",
      lead:
        "Ми тримаємо дизайн, зображення, деталь і виготовлення достатньо близько, щоб вони впливали одне на одне. Робота рухається вперед, не втрачаючи початкового наміру.",
    },
    selected: {
      label: "Вибрані роботи",
      title: "Простори, сформовані до останньої деталі.",
      all: "Усі проєкти",
    },
    process: {
      label: "Процес",
      title: "Найкоротший шлях — безперервна лінія.",
      lead:
        "Одна досвідчена команда залишається з проєктом від першого запитання до деталі, якої ви торкаєтесь.",
    },
    capabilities: {
      label: "Для партнерів",
      title: "Наші спеціалізовані послуги працюють і окремо.",
      lead:
        "Той самий погляд і технічна точність — як сфокусоване продовження вашої команди.",
      notes: {
        visualization: "Для архітекторів, девелоперів і студій",
        printing: "Макети, прототипи й друковані об’єкти",
        drafting: "Дозвільна та робоча документація",
      },
      question: "Потрібна точна пара рук для окремої частини роботи?",
      discuss: "Обговорити співпрацю",
    },
    contact: {
      label: "Почати проєкт",
      title: "Принесіть нам перше запитання.",
      lead:
        "Щороку ми беремо обмежену кількість архітектурних, інтер’єрних і спеціалізованих співпраць.",
      booking: "Відкриті до вибраних нових проєктів",
      studio: "Студія",
      brief: "Заповнити короткий бриф",
    },
    projects: {
      metadataTitle: "Вибрані проєкти",
      metadataDescription:
        "Нові роботи Studio Kova в архітектурі, інтер’єрі, візуалізації, адитивному виробництві та документації.",
      archive: "Архів проєктів",
      title: "Роботи, проведені від початку до кінця.",
      lead:
        "Будівлі, інтер’єри, зображення, креслення й виготовлені об’єкти однієї безперервної студії.",
      projects: "Проєкти",
      years: "Роки",
      disciplines: "Напрями",
      five: "П’ять",
      base: "База",
      copenhagen: "Копенгаген",
      all: "Усі проєкти",
    },
    project: {
      archive: "Архів проєктів",
      year: "Рік",
      location: "Місце",
      category: "Категорія",
      scope: "Обсяг робіт",
      story: "Історія проєкту",
      more: "Інші проєкти",
      previous: "Попередній",
      next: "Наступний",
    },
  },
  en: {
    skip: "Skip to content",
    header: {
      primary: "Primary",
      studio: "Studio",
      disciplines: "Disciplines",
      work: "Selected work",
      process: "Process",
      start: "Start a project",
      menu: "Menu",
      close: "Close",
      navigation: "Navigation",
      mobileNavigation: "Mobile navigation",
      commissions: "New commissions",
    },
    footer: {
      description:
        "Architecture, interiors, visualization, documentation, and fabrication held as one continuous practice.",
      navigate: "Navigate",
      elsewhere: "Elsewhere",
      contact: "Contact",
      location: "Copenhagen, DK",
      independent: "Independent multidisciplinary practice",
      privacy: "Privacy",
    },
    hero: {
      based: "Based in",
      takingOn: "Taking on",
      commissions: "selected new commissions",
      explore: "Explore selected work",
      scroll: "Scroll",
    },
    studio: {
      label: "Studio",
      title: "Spaces feel complete when one mind holds the whole.",
      alt: "A calm Studio Kova interior shaped by soft daylight",
      throughline: "Our throughline",
    },
    disciplines: {
      label: "Disciplines",
      title: "One practice. Five ways of making.",
      lead:
        "We keep design, image, detail, and fabrication close enough to inform one another. The work moves forward without losing its original intent.",
    },
    selected: {
      label: "Selected work",
      title: "Places shaped all the way through.",
      all: "View all projects",
    },
    process: {
      label: "Process",
      title: "The shortest distance is a continuous line.",
      lead:
        "One senior team stays with the project from its first question to the detail you touch.",
    },
    capabilities: {
      label: "For collaborators",
      title: "Our specialist work can stand on its own.",
      lead:
        "The same eye and technical rigor, offered as a focused extension of your own team.",
      notes: {
        visualization: "For architects, developers & studios",
        printing: "Models, prototypes & printed objects",
        drafting: "Permit & construction documentation",
      },
      question: "Need a precise pair of hands on one part of the work?",
      discuss: "Discuss a collaboration",
    },
    contact: {
      label: "Start a project",
      title: "Bring us the first question.",
      lead:
        "We take on a small number of architecture, interior, and specialist collaborations each year.",
      booking: "Open to selected new commissions",
      studio: "Studio",
      brief: "Complete the short brief",
    },
    projects: {
      metadataTitle: "Selected Projects",
      metadataDescription:
        "Recent work across architecture, interiors, visualization, additive fabrication, and documentation by Studio Kova.",
      archive: "Project archive",
      title: "Work held end to end.",
      lead:
        "Buildings, interiors, images, drawings, and made objects by one continuous studio.",
      projects: "Projects",
      years: "Years",
      disciplines: "Disciplines",
      five: "Five",
      base: "Base",
      copenhagen: "Copenhagen",
      all: "All projects",
    },
    project: {
      archive: "Project archive",
      year: "Year",
      location: "Location",
      category: "Category",
      scope: "Scope",
      story: "Project story",
      more: "More projects",
      previous: "Previous",
      next: "Next",
    },
  },
} as const;

export function getCommonCopy(locale: Locale) {
  return commonCopy[locale];
}

export function localizeContent(
  content: SiteContent,
  locale: Locale,
): SiteContent {
  if (locale === "en") {
    return {
      ...content,
      settings: {
        ...content.settings,
        stats: SAFE_STATS.en,
      },
    };
  }

  return {
    settings: {
      ...content.settings,
      ...UK_SETTINGS,
      stats: SAFE_STATS.uk,
      processSteps: content.settings.processSteps.map((step, index) => ({
        ...step,
        ...(UK_PROCESS[index] ?? {}),
      })),
    },
    services: content.services.map((service) => ({
      ...service,
      ...UK_SERVICES[service.key],
    })),
    projects: content.projects.map((project) => ({
      ...project,
      ...(UK_PROJECTS[project.slug] ?? {}),
    })),
  };
}
