import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ConceptMotionShell } from "@/components/concepts/ConceptMotionShell";
import { MotionTicker } from "@/components/concepts/MotionTicker";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { VariantSwitch } from "@/components/layout/VariantSwitch";
import { disciplineLabels, type Locale } from "@/lib/i18n";
import { getLocale, getLocalizedContent } from "@/lib/locale";
import styles from "./v2.module.css";

const V2_COPY = {
  uk: {
    metadataTitle: "Безперервна практика / Концепт 02",
    metadataDescription:
      "Експериментальний редакційний концепт Studio Kova з живим індексом проєктів, матрицею напрямів і безперервним процесом.",
    available: "Відкриті до вибраних проєктів на 2026",
    navLabel: "Навігація концепту два",
    index: "Індекс",
    system: "Система",
    enquire: "Звернутися",
    versions: "Версії дизайну",
    independent: "Незалежна мультидисциплінарна практика",
    build: "Будуємо",
    between: "між",
    scales: "масштабами",
    heroLead:
      "Ми працюємо у продуктивній напрузі між кімнатою й деталлю, зображенням і кресленням, пропозицією та самою річчю.",
    browse: "Переглянути індекс",
    facadeAlt: "Білий архітектурний фасад на тлі відкритого неба",
    cabinAlt: "Дерев’яний прибережний будинок на скелястому березі",
    fieldRecord: "Польовий запис 001",
    continuous: "Одна безперервна лінія від концепції до втіленого об’єкта.",
    rail: "SK–02 / Безперервна практика",
    railScroll: "Гортайте, щоб прочитати індекс",
    tickerLabel: "Стрічка напрямів студії",
    play: "Відтворити",
    pause: "Пауза",
    position: "Позиція",
    building: "Будівля — не послідовність результатів.",
    itIsOne: "Це одне",
    decision: "безперервне рішення.",
    proposition:
      "Studio Kova тримає архітектуру, інтер’єри, візуалізацію, документацію й виготовлення в активному діалозі. Матеріал може змінити креслення. Макет може переписати план. Зображення може показати, що світло неправильне.",
    propositionSecond:
      "Робота стає точнішою, бо кожен масштаб залишається доступним для перегляду.",
    model: "Модель безперервної практики",
    observe: "Спостерігати",
    observeNote: "Місце, світло, використання",
    translate: "Перекладати",
    translateNote: "План, зображення, макет",
    return: "Повертатися",
    returnNote: "Перевіряти реальністю",
    projectIndex: "Індекс проєктів",
    records: "записів",
    current: "Актуальне / вибране",
    indexLead:
      "Будинки, кімнати, зображення й об’єкти. Читайте список або дозвольте зображенням його перервати.",
    operating: "Операційна система",
    fiveDisciplines: "05 напрямів",
    instruments: "Різні інструменти.",
    oneScore: "Одна партитура.",
    systemLead:
      "П’ять спеціалізованих можливостей перетинаються, а не чекають у черзі. Матриця робить ці перетини видимими.",
    matrixHeaders: ["Код", "Напрям", "Концепція", "Дизайн", "Деталь", "Реалізація"],
    primary: "Основна участь",
    feedback: "Зворотний зв’язок між етапами",
    cells:
      "Комірки — не графік. Вони показують, де працює кожна оптика.",
    fieldNotes: "Польові нотатки",
    fieldMeta: "Матеріал / світло / допуск",
    evidence: "Спочатку докази, потім упевненість.",
    evidenceLead:
      "Ми тестуємо рано: зображення, фрагменти, друковані вузли й деталі в масштабі, де вони вже можуть сказати щось корисне.",
    pavilionAlt: "Дослідження архітектурного павільйону",
    test: "Тест A.17",
    testNote: "Керамічне склепіння / щільність тіні",
    studioAlt: "Дослідження студії та галереї з верхнім світлом",
    study: "Дослідження 06",
    studyNote: "Північне світло / робоча стіна",
    interiorAlt: "Дослідження матеріалів теплого інтер’єру",
    palette: "Палітра 02",
    paletteNote: "Вапно / дуб / відбите світло",
    annotationA: "Прототипуйте, доки не стане тихо.",
    annotationB: "Масштаб 1:1 змінює все.",
    sequence: "Послідовність",
    nonlinear: "Свідомо нелінійна",
    fiveMoves: "П’ять рухів.",
    noHandoff: "Без передачі.",
    processLead:
      "Послідовність має порядок, але робота рухається петлями. Виготовлення впливає на дизайн, візуалізація перевіряє концепцію, документація захищає намір.",
    reality: "Перевірка реальністю",
    realityNote:
      "Кожен рух може повернути проєкт назад із кращою інформацією.",
    contact: "Контакт",
    response: "Відповідаємо протягом 2 робочих днів",
    bring: "Принесіть нам ділянку, кімнату, ідею.",
    start: "Почніть",
    somewhere: "з будь-чого.",
    previous: "Попередній концепт — 01",
  },
  en: {
    metadataTitle: "Continuous Practice / Concept 02",
    metadataDescription:
      "An experimental editorial Studio Kova concept built around a living project index, a discipline matrix, and a continuous process.",
    available: "Available for selected 2026 commissions",
    navLabel: "Concept two navigation",
    index: "Index",
    system: "System",
    enquire: "Enquire",
    versions: "Design versions",
    independent: "Independent multidisciplinary practice",
    build: "Build",
    between: "Between",
    scales: "Scales",
    heroLead:
      "We work in the productive tension between a room and a detail, an image and a drawing, a proposition and the thing itself.",
    browse: "Browse the index",
    facadeAlt: "White architectural facade seen against open sky",
    cabinAlt: "Timber coastal cabin set on a rocky shoreline",
    fieldRecord: "Field record 001",
    continuous: "One continuous line from concept to made object.",
    rail: "SK–02 / Continuous practice",
    railScroll: "Scroll to read the index",
    tickerLabel: "Studio disciplines ticker",
    play: "Play",
    pause: "Pause",
    position: "Position",
    building: "A building is not a sequence of deliverables.",
    itIsOne: "It is one",
    decision: "continuous decision.",
    proposition:
      "Studio Kova keeps architecture, interiors, visualization, documentation, and making in active conversation. A material can change a drawing. A model can rewrite the plan. An image can reveal that the light is wrong.",
    propositionSecond:
      "The work becomes more exact because every scale remains available for revision.",
    model: "Continuous practice model",
    observe: "Observe",
    observeNote: "Site, light, use",
    translate: "Translate",
    translateNote: "Plan, image, model",
    return: "Return",
    returnNote: "Test against reality",
    projectIndex: "Project index",
    records: "records",
    current: "Current / selected",
    indexLead:
      "Houses, rooms, images, and objects. Read the list or let the images interrupt it.",
    operating: "Operating system",
    fiveDisciplines: "05 disciplines",
    instruments: "Different instruments.",
    oneScore: "One score.",
    systemLead:
      "Five specialist capabilities overlap instead of waiting in line. The matrix makes those overlaps visible.",
    matrixHeaders: ["Code", "Discipline", "Concept", "Design", "Detail", "Delivery"],
    primary: "Primary involvement",
    feedback: "Feedback across phases",
    cells: "The cells are not a schedule. They show where each lens acts.",
    fieldNotes: "Field notes",
    fieldMeta: "Material / light / tolerance",
    evidence: "Evidence before certainty.",
    evidenceLead:
      "We make tests early: images, fragments, printed joints, and details at the scale where they can tell us something useful.",
    pavilionAlt: "Architectural pavilion study",
    test: "Test A.17",
    testNote: "Ceramic vault / shadow density",
    studioAlt: "Top-lit studio and gallery study",
    study: "Study 06",
    studyNote: "Northlight / working wall",
    interiorAlt: "Warm interior material study",
    palette: "Palette 02",
    paletteNote: "Lime / oak / reflected light",
    annotationA: "Prototype until quiet.",
    annotationB: "1:1 changes everything.",
    sequence: "Sequence",
    nonlinear: "Non-linear by design",
    fiveMoves: "Five moves.",
    noHandoff: "No hand-off.",
    processLead:
      "The sequence has an order, but the work loops. Making informs design; visualization challenges concept; documentation protects intent.",
    reality: "Reality check",
    realityNote:
      "Every move can send the project back with better information.",
    contact: "Contact",
    response: "Response within 2 working days",
    bring: "Bring us a site, a room, an idea.",
    start: "Start",
    somewhere: "somewhere.",
    previous: "Previous concept — 01",
  },
} as const satisfies Record<Locale, object>;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = V2_COPY[locale];
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    robots: { index: false, follow: false },
  };
}

const disciplineShort = [
  "ARC",
  "INT",
  "VIS",
  "DOC",
  "OBJ",
] as const;

export default async function VersionTwoPage() {
  const { locale, content } = await getLocalizedContent();
  const { settings, services, projects } = content;
  const selected = projects.slice(0, 6);
  const copy = V2_COPY[locale];

  return (
    <ConceptMotionShell
      className={styles.shell}
      page="v2"
      progressClassName={styles.readingProgress}
    >
      <header className={styles.header}>
        <Link href="/v2" className={styles.wordmark}>
          Studio Kova
          <span>CPH / 55.67° N</span>
        </Link>

        <div className={styles.headerSignal}>
          <span />
          {copy.available}
        </div>

        <nav className={styles.nav} aria-label={copy.navLabel}>
          <a href="#index">{copy.index}</a>
          <a href="#system">{copy.system}</a>
          <a href="#contact">{copy.enquire}</a>
        </nav>

        <div className={styles.headerTools}>
          <VariantSwitch locale={locale} />
          <LanguageSwitch locale={locale} />
        </div>
      </header>

      <div>
        <section className={styles.hero} aria-labelledby="v2-title">
          <div className={styles.heroGrid} aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} />
            ))}
          </div>

          <div className={styles.heroHeading}>
            <p>{copy.independent}</p>
            <h1 id="v2-title">
              <span>{copy.build}</span>
              <span>{copy.between}</span>
              <span>{copy.scales}</span>
            </h1>
          </div>

          <div className={styles.heroIntro} data-motion="up">
            <p>
              {copy.heroLead}
            </p>
            <a href="#index">
              {copy.browse} <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className={styles.collage} data-motion="up">
            <figure className={styles.collagePrimary}>
              <Image
                src="/images/project-4.jpg"
                alt={copy.facadeAlt}
                fill
                sizes="(max-width: 767px) 72vw, 28vw"
                preload
              />
              <figcaption>
                <span>Harbour House</span>
                <span>VIS / 2024</span>
              </figcaption>
            </figure>

            <figure className={styles.collageSecondary}>
              <Image
                src="/images/project-1.jpg"
                alt={copy.cabinAlt}
                fill
                sizes="(max-width: 767px) 48vw, 17vw"
              />
              <figcaption>{copy.fieldRecord}</figcaption>
            </figure>

            <div className={styles.collageCard}>
              <span>01—05</span>
              <p>{copy.continuous}</p>
              <span className={styles.cardArrow} aria-hidden="true">
                ↘
              </span>
            </div>
          </div>

          <div className={styles.heroStamp} aria-hidden="true">
            <span>K</span>
            <span>02</span>
          </div>

          <div className={styles.heroRail} aria-hidden="true">
            <span>{copy.rail}</span>
            <span>{copy.railScroll}</span>
          </div>
        </section>

        <MotionTicker
          className={styles.ticker}
          controlClassName={styles.motionControl}
          label={copy.tickerLabel}
          playLabel={copy.play}
          pauseLabel={copy.pause}
        >
          {services.concat(services).map((service, index) => (
            <span key={`${service.id}-${index}`}>
              {service.title}
              <i aria-hidden="true">●</i>
            </span>
          ))}
        </MotionTicker>

        <section
          className={styles.proposition}
          aria-labelledby="v2-proposition-title"
        >
          <div className={styles.sectionLabel}>
            <span>001</span>
            <span>{copy.position}</span>
            <span>2026</span>
          </div>
          <p className={styles.propositionLead} data-motion="up">
            {copy.building}
          </p>
          <div className={styles.propositionBody} data-motion="up">
            <h2 id="v2-proposition-title">
              {copy.itIsOne}
              <em>{copy.decision}</em>
            </h2>
            <div>
              <p>
                {copy.proposition}
              </p>
              <p>
                {copy.propositionSecond}
              </p>
            </div>
          </div>

          <div className={styles.methodDiagram} aria-label={copy.model}>
            <div>
              <span>01</span>
              <strong>{copy.observe}</strong>
              <p>{copy.observeNote}</p>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>02</span>
              <strong>{copy.translate}</strong>
              <p>{copy.translateNote}</p>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>03</span>
              <strong>{copy.return}</strong>
              <p>{copy.returnNote}</p>
            </div>
            <b aria-hidden="true">↶</b>
          </div>
        </section>

        <section className={styles.index} id="index" aria-labelledby="index-title">
          <div className={styles.sectionLabel}>
            <span>002</span>
            <span>{copy.projectIndex}</span>
            <span>
              {String(selected.length).padStart(2, "0")} {copy.records}
            </span>
          </div>

          <div className={styles.indexHeading}>
            <h2 id="index-title">{copy.current}</h2>
            <p>{copy.indexLead}</p>
          </div>

          <div className={styles.projectTable} role="list">
            {selected.map((project, index) => {
              const previewImages =
                project.images.length > 0
                  ? project.images.slice(0, 3)
                  : [project.coverImage];

              return (
                <Link
                  href={`/projects/${project.slug}`}
                  className={styles.projectRow}
                  key={project.id}
                  role="listitem"
                >
                  <span className={styles.projectNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.projectName}>{project.title}</span>
                  <span className={styles.projectDiscipline}>
                    {disciplineLabels[locale][project.discipline]}
                  </span>
                  <span className={styles.projectLocation}>
                    {project.location}
                  </span>
                  <span className={styles.projectYear}>{project.year}</span>
                  <span className={styles.projectSummary}>
                    {project.summary}
                  </span>
                  <span className={styles.projectThumb}>
                    {previewImages.map((image, imageIndex) => (
                      <Image
                        key={`${image}-${imageIndex}`}
                        src={image}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 38vw, 18vw"
                      />
                    ))}
                  </span>
                  <span className={styles.rowArrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className={styles.system} id="system" aria-labelledby="system-title">
          <div className={styles.systemIntro}>
            <div className={styles.sectionLabel}>
              <span>003</span>
              <span>{copy.operating}</span>
              <span>{copy.fiveDisciplines}</span>
            </div>
            <h2 id="system-title">
              {copy.instruments}
              <span>{copy.oneScore}</span>
            </h2>
            <p>
              {copy.systemLead}
            </p>
          </div>

          <div className={styles.matrix}>
            <div className={styles.matrixHeader} aria-hidden="true">
              {copy.matrixHeaders.map((header) => (
                <span key={header}>{header}</span>
              ))}
            </div>
            {services.map((service, index) => (
              <article className={styles.matrixRow} key={service.id}>
                <span className={styles.matrixCode}>
                  {disciplineShort[index] ?? service.number}
                </span>
                <div className={styles.matrixCopy}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <div className={styles.matrixCells} aria-hidden="true">
                  {Array.from({ length: 4 }, (_, cellIndex) => (
                    <span
                      className={
                        cellIndex <= Math.min(3, index + 1) &&
                        cellIndex >= Math.max(0, index - 2)
                          ? styles.activeCell
                          : undefined
                      }
                      key={cellIndex}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.matrixLegend}>
            <span>
              <i />
              {copy.primary}
            </span>
            <span>
              <i />
              {copy.feedback}
            </span>
            <p>{copy.cells}</p>
          </div>
        </section>

        <section className={styles.fieldNotes} aria-labelledby="notes-title">
          <div className={styles.sectionLabel}>
            <span>004</span>
            <span>{copy.fieldNotes}</span>
            <span>{copy.fieldMeta}</span>
          </div>

          <div className={styles.notesHeading}>
            <h2 id="notes-title">{copy.evidence}</h2>
            <p>{copy.evidenceLead}</p>
          </div>

          <div className={styles.notesCanvas}>
            <figure className={styles.noteA}>
              <Image
                src="/images/project-3.jpg"
                alt={copy.pavilionAlt}
                fill
                sizes="(max-width: 767px) 78vw, 34vw"
              />
              <figcaption>
                <span>{copy.test}</span>
                <span>{copy.testNote}</span>
              </figcaption>
            </figure>
            <figure className={styles.noteB}>
              <Image
                src="/images/project-6.jpg"
                alt={copy.studioAlt}
                fill
                sizes="(max-width: 767px) 56vw, 22vw"
              />
              <figcaption>
                <span>{copy.study}</span>
                <span>{copy.studyNote}</span>
              </figcaption>
            </figure>
            <figure className={styles.noteC}>
              <Image
                src="/images/project-2.jpg"
                alt={copy.interiorAlt}
                fill
                sizes="(max-width: 767px) 62vw, 25vw"
              />
              <figcaption>
                <span>{copy.palette}</span>
                <span>{copy.paletteNote}</span>
              </figcaption>
            </figure>
            <div className={styles.annotationA}>{copy.annotationA}</div>
            <div className={styles.annotationB}>{copy.annotationB}</div>
            <div className={styles.notesRuler} aria-hidden="true">
              <span>0</span>
              <i />
              <span>250</span>
              <i />
              <span>500 mm</span>
            </div>
          </div>
        </section>

        <section className={styles.process} aria-labelledby="v2-process-title">
          <div className={styles.sectionLabel}>
            <span>005</span>
            <span>{copy.sequence}</span>
            <span>{copy.nonlinear}</span>
          </div>

          <div className={styles.processLead}>
            <h2 id="v2-process-title">
              {copy.fiveMoves}
              <span>{copy.noHandoff}</span>
            </h2>
            <p>
              {copy.processLead}
            </p>
          </div>

          <ol className={styles.processGrid}>
            {settings.processSteps.slice(0, 5).map((step, index) => (
              <li key={step.number}>
                <div className={styles.processTop}>
                  <span>{step.number}</span>
                  <span>{disciplineShort[index]}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className={styles.processGlyph} aria-hidden="true">
                  <span />
                  <span />
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.processLoop} aria-hidden="true">
            <span>{copy.reality}</span>
            <i />
            <strong>↶</strong>
            <p>{copy.realityNote}</p>
          </div>
        </section>

        <section
          className={styles.contact}
          id="contact"
          aria-labelledby="v2-contact-title"
        >
          <div className={styles.contactTop}>
            <span>006 / {copy.contact}</span>
            <span>{settings.location}</span>
            <span>{copy.response}</span>
          </div>
          <p className={styles.contactPrompt}>{copy.bring}</p>
          <h2 id="v2-contact-title" data-motion="up">
            {copy.start}
            <span>{copy.somewhere}</span>
          </h2>
          <a href={`mailto:${settings.email}`} className={styles.email}>
            <span>{settings.email}</span>
            <span aria-hidden="true">↗</span>
          </a>

          <div className={styles.contactCrosshair} aria-hidden="true">
            <span />
            <span />
            <strong>K</strong>
          </div>

          <footer className={styles.footer}>
            <div>
              {settings.social.map((social) => (
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
            <span>© {new Date().getFullYear()} Studio Kova</span>
            <Link href="/v1">{copy.previous}</Link>
          </footer>
        </section>
      </div>
    </ConceptMotionShell>
  );
}
