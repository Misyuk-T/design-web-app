import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ConceptMotionShell } from "@/components/concepts/ConceptMotionShell";
import { MotionTicker } from "@/components/concepts/MotionTicker";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { disciplineLabels, type Locale } from "@/lib/i18n";
import { getLocale, getLocalizedContent } from "@/lib/locale";
import styles from "./v1.module.css";

const V1_COPY = {
  uk: {
    metadataTitle: "Просторові історії / Концепт 01",
    metadataDescription:
      "Кінематографічний концепт Studio Kova: архітектура, інтер’єри, візуалізація, документація й виготовлення як одна просторова історія.",
    navLabel: "Навігація концепту один",
    work: "Роботи",
    practice: "Практика",
    contact: "Контакт",
    versions: "Версії дизайну",
    original: "Оригінал",
    heroAlt: "Скульптурні бетонні об’єми під відкритим блакитним небом",
    copenhagen: "Копенгаген",
    independent: "Незалежна практика",
    kicker: "Архітектура / Інтер’єри / Об’єкти",
    heroTitle: "Простір, зібраний",
    heroTitleAccent: "в одних руках.",
    heroLead:
      "Одна студія веде ідею від першої лінії до останнього кріплення — не втрачаючи атмосфери між ними.",
    enter: "Увійти в роботи",
    idea: "Ідея",
    matter: "Матерія",
    tickerLabel: "Стрічка філософії студії",
    ticker: "Одна лінія від концепції до втіленого об’єкта",
    play: "Відтворити",
    pause: "Пауза",
    premise: "Передумова",
    continuity: "Практика безперервності",
    nothing: "Ніщо",
    handed: "не передається далі.",
    studioAlt: "Тихий інтер’єр Studio Kova у теплому денному світлі",
    materialStudy: "Дослідження матеріалу 04",
    daylight: "Денне світло / вапно / дуб",
    image: "Зображення",
    detail: "Деталь",
    manifesto:
      "Ми ставимося до архітектури як до довгої витримки: кожне рішення залишає слід, а кожна дисципліна змінює наступний крок.",
    sameRoom:
      "Креслення, зображення й виготовлена деталь залишаються в одній кімнаті достатньо довго, щоб стати однією ідеєю.",
    materialRegister: "Реєстр матеріалів",
    lime: "Вапно",
    oak: "Дуб",
    steel: "Сталь",
    selected: "Вибрані роботи",
    fourPlaces: "Чотири місця.",
    fourAtmospheres: "Чотири атмосфери.",
    workLead:
      "Коротке дослідження контексту, матеріалу й світла. Кожен проєкт утримується від першої пропозиції до найменшої деталі.",
    viewCase: "Про проєкт",
    philosophy: "Філософія студії",
    drawing: "Креслення не передує виготовленню.",
    making: "Це виготовлення",
    anotherScale: "в іншому масштабі.",
    sharedTable:
      "Макети, зображення, документи й збудовані об’єкти лежать на одному столі.",
    thePractice: "Практика",
    fiveLenses: "П’ять оптик.",
    oneView: "Одна точка зору.",
    disciplineLead:
      "Різні способи роботи залишаються достатньо близько, щоб ставити одне одному запитання. Результат — менше перекладу й більше точності.",
    unbroken: "Нерозривна лінія",
    projectMoves: "Проєкт рухається",
    withoutHands: "не змінюючи рук.",
    processLabels: ["Слухати", "Окреслити", "Тестувати", "Уточнити", "Зробити"],
    feedback: "Зворотний зв’язок",
    feedbackNote: "Кожен етап може переглянути попередній.",
    commissions: "Нові проєкти",
    place: "Маєте місце на думці?",
    firstLine: "Проведімо першу лінію.",
    bring: "Принесіть",
    bringItems: [
      "Ділянку або наявне приміщення",
      "Проблему, яку справді варто вирішити",
      "Орієнтовний горизонт реалізації",
    ],
    footerConcept: "Концепт 01 / Просторові історії",
    next: "Наступний концепт — V2",
  },
  en: {
    metadataTitle: "Spatial Stories / Concept 01",
    metadataDescription:
      "A cinematic Studio Kova concept: architecture, interiors, visualization, documentation, and making held as one spatial story.",
    navLabel: "Concept one navigation",
    work: "Work",
    practice: "Practice",
    contact: "Contact",
    versions: "Design versions",
    original: "Original",
    heroAlt: "Sculptural concrete volumes beneath an open blue sky",
    copenhagen: "Copenhagen",
    independent: "Independent practice",
    kicker: "Architecture / Interiors / Objects",
    heroTitle: "Space, held",
    heroTitleAccent: "in one hand.",
    heroLead:
      "One studio carries the idea from the first line to the final fitting—without losing the atmosphere in between.",
    enter: "Enter the work",
    idea: "Idea",
    matter: "Matter",
    tickerLabel: "Studio philosophy ticker",
    ticker: "One line from concept to made object",
    play: "Play",
    pause: "Pause",
    premise: "The premise",
    continuity: "A practice of continuity",
    nothing: "Nothing",
    handed: "is handed off.",
    studioAlt: "A quiet Studio Kova interior shaped by warm daylight",
    materialStudy: "Material study 04",
    daylight: "Daylight / lime / oak",
    image: "Image",
    detail: "Detail",
    manifesto:
      "We treat architecture as a long exposure: every decision leaves a trace, and every discipline changes what comes next.",
    sameRoom:
      "The drawing, the image, and the made detail stay in the same room long enough to become one idea.",
    materialRegister: "Material register",
    lime: "Lime",
    oak: "Oak",
    steel: "Steel",
    selected: "Selected work",
    fourPlaces: "Four places.",
    fourAtmospheres: "Four atmospheres.",
    workLead:
      "Scroll through a compact study in context, material, and light. Each project is held from its first proposition to its smallest detail.",
    viewCase: "View case",
    philosophy: "Studio philosophy",
    drawing: "Drawing is not before making.",
    making: "It is making",
    anotherScale: "at another scale.",
    sharedTable:
      "Models, images, documents, and built work share the same table.",
    thePractice: "The practice",
    fiveLenses: "Five lenses.",
    oneView: "One point of view.",
    disciplineLead:
      "Different modes of work stay close enough to challenge one another. The result is less translation and more precision.",
    unbroken: "The unbroken line",
    projectMoves: "A project moves",
    withoutHands: "without changing hands.",
    processLabels: ["Listen", "Frame", "Test", "Resolve", "Make"],
    feedback: "Feedback loop",
    feedbackNote: "Every phase can revise the one before it.",
    commissions: "New commissions",
    place: "Have a place in mind?",
    firstLine: "Let’s draw the first line.",
    bring: "Bring",
    bringItems: [
      "A site or existing room",
      "The problem worth solving",
      "A rough horizon for making",
    ],
    footerConcept: "Concept 01 / Spatial stories",
    next: "Next concept — V2",
  },
} as const satisfies Record<Locale, object>;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = V1_COPY[locale];
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    robots: { index: false, follow: false },
  };
}

const disciplinePreviewImages = [
  "/images/project-1.jpg",
  "/images/project-2.jpg",
  "/images/project-4.jpg",
  "/images/project-5.jpg",
  "/images/project-3.jpg",
] as const;

export default async function VersionOnePage() {
  const { locale, content } = await getLocalizedContent();
  const { settings, services, projects } = content;
  const featured = projects.filter((project) => project.featured).slice(0, 4);
  const process = settings.processSteps.slice(0, 5);
  const copy = V1_COPY[locale];

  return (
    <ConceptMotionShell
      className={styles.shell}
      page="v1"
      progressClassName={styles.readingProgress}
    >
      <header className={styles.header}>
        <Link href="/v1" className={styles.wordmark} aria-label="Studio Kova v1">
          Kova<span>®</span>
        </Link>

        <nav className={styles.nav} aria-label={copy.navLabel}>
          <a href="#work">{copy.work}</a>
          <a href="#practice">{copy.practice}</a>
          <a href="#contact">{copy.contact}</a>
        </nav>

        <div className={styles.headerTools}>
          <nav className={styles.versions} aria-label={copy.versions}>
            <Link href="/">{copy.original}</Link>
            <span aria-current="page">V1</span>
            <Link href="/v2">V2</Link>
          </nav>
          <LanguageSwitch locale={locale} inverse />
        </div>
      </header>

      <div>
        <section className={styles.hero} aria-labelledby="v1-title">
          <Image
            src="/images/hero.jpg"
            alt={copy.heroAlt}
            fill
            sizes="100vw"
            preload
            className={styles.heroImage}
          />
          <div className={styles.heroWash} />

          <div className={styles.heroIndex}>
            <span>55° 40′ N</span>
            <span>{copy.copenhagen}</span>
            <span>{copy.independent}</span>
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.kicker} data-motion="fade">
              {copy.kicker}
            </p>
            <h1 id="v1-title">
              {copy.heroTitle}
              <span>{copy.heroTitleAccent}</span>
            </h1>
            <div className={styles.heroBottom}>
              <p>
                {copy.heroLead}
              </p>
              <a href="#work" className={styles.roundLink}>
                <span>{copy.enter}</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={styles.heroAxis} aria-hidden="true">
            <span />
            <span>{copy.idea}</span>
            <span>{copy.matter}</span>
          </div>

          <div className={styles.heroNumber} aria-hidden="true">
            01
          </div>
        </section>

        <MotionTicker
          className={styles.marquee}
          controlClassName={styles.motionControl}
          label={copy.tickerLabel}
          playLabel={copy.play}
          pauseLabel={copy.pause}
        >
          <span>{copy.ticker}</span>
          <span>{copy.ticker}</span>
          <span>{copy.ticker}</span>
        </MotionTicker>

        <section className={styles.manifesto} id="practice">
          <div className={styles.sectionIndex}>
            <span>01</span>
            <span>{copy.premise}</span>
          </div>

          <div className={styles.manifestoLead} data-motion="up">
            <p className={styles.sideNote}>{copy.continuity}</p>
            <h2>
              {copy.nothing}
              <span>{copy.handed}</span>
            </h2>
          </div>

          <div className={styles.manifestoGrid}>
            <figure className={styles.manifestoImage}>
              <Image
                src="/images/studio.jpg"
                alt={copy.studioAlt}
                fill
                sizes="(max-width: 767px) 92vw, 42vw"
              />
              <figcaption>
                {copy.materialStudy}
                <span>{copy.daylight}</span>
              </figcaption>
            </figure>

            <div className={styles.continuitySeal} aria-hidden="true">
              <span>{copy.idea}</span>
              <span>{copy.image}</span>
              <strong>K</strong>
              <span>{copy.detail}</span>
              <span>{copy.matter}</span>
            </div>

            <div className={styles.manifestoText} data-motion="up">
              <p className={styles.manifestoStatement}>
                {copy.manifesto}
              </p>
              <p>
                {settings.aboutStatement.split(". ").slice(0, 2).join(". ")}.
                {" "}
                {copy.sameRoom}
              </p>
              <div className={styles.stats}>
                {settings.stats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <div
                className={styles.materialStrip}
                aria-label={copy.materialRegister}
              >
                <span>
                  <i className={styles.materialLime} />
                  {copy.lime}
                </span>
                <span>
                  <i className={styles.materialOak} />
                  {copy.oak}
                </span>
                <span>
                  <i className={styles.materialSteel} />
                  {copy.steel}
                </span>
                <span>{copy.materialRegister} / 01</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.work} id="work" aria-labelledby="work-title">
          <div className={styles.workIntro} data-motion="up">
            <div className={styles.sectionIndex}>
              <span>02</span>
              <span>{copy.selected}</span>
            </div>
            <h2 id="work-title">
              {copy.fourPlaces}
              <span>{copy.fourAtmospheres}</span>
            </h2>
            <p>
              {copy.workLead}
            </p>
          </div>

          <div className={styles.projectStack}>
            {featured.map((project, index) => (
              <article
                className={styles.projectFrame}
                style={{ "--card-index": index } as React.CSSProperties}
                key={project.id}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className={styles.projectLink}
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 94vw"
                    className={styles.projectImage}
                  />
                  <span className={styles.projectShade} />
                  <span className={styles.projectTopline}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{disciplineLabels[locale][project.discipline]}</span>
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </span>
                  <span className={styles.projectTitle}>
                    {project.title}
                    <span aria-hidden="true">↗</span>
                  </span>
                  <span className={styles.projectRole}>{project.role}</span>
                  <span className={styles.projectSummary}>
                    {project.summary}
                  </span>
                  <span className={styles.projectView} aria-hidden="true">
                    {copy.viewCase}
                    <span>↗</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.interlude} aria-label={copy.philosophy}>
          <div className={styles.orbit} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p>{copy.drawing}</p>
          <h2>
            {copy.making}
            <span>{copy.anotherScale}</span>
          </h2>
          <p className={styles.interludeNote}>
            {copy.sharedTable}
          </p>
          <div className={styles.interludeScale} aria-hidden="true">
            <span>1:500</span>
            <span>1:50</span>
            <span>1:1</span>
          </div>
        </section>

        <section className={styles.disciplines} aria-labelledby="discipline-title">
          <div className={styles.sectionIndex}>
            <span>03</span>
            <span>{copy.thePractice}</span>
          </div>

          <div className={styles.disciplineHeading} data-motion="up">
            <h2 id="discipline-title">
              {copy.fiveLenses}
              <span>{copy.oneView}</span>
            </h2>
            <p>
              {copy.disciplineLead}
            </p>
          </div>

          <ol className={styles.disciplineList}>
            {services.map((service, index) => (
              <li key={service.id}>
                <span className={styles.disciplineNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className={styles.disciplinePreview} aria-hidden="true">
                  <Image
                    src={disciplinePreviewImages[index]}
                    alt=""
                    fill
                    sizes="12rem"
                  />
                </span>
                <span className={styles.disciplineMark} aria-hidden="true">
                  +
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.processHeader} data-motion="up">
            <div className={styles.sectionIndex}>
              <span>04</span>
              <span>{copy.unbroken}</span>
            </div>
            <h2 id="process-title">
              {copy.projectMoves}
              <span>{copy.withoutHands}</span>
            </h2>
          </div>

          <ol className={styles.processTrack}>
            {process.map((step, index) => (
              <li key={step.number}>
                <div className={styles.processNode}>
                  <span>{step.number}</span>
                </div>
                <p className={styles.processVerb}>
                  {copy.processLabels[index]}
                </p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>

          <div className={styles.feedbackLoop} aria-hidden="true">
            <span />
            <p>
              {copy.feedback}
              <em>{copy.feedbackNote}</em>
            </p>
            <strong>↶</strong>
          </div>
        </section>

        <section
          className={styles.contact}
          id="contact"
          aria-labelledby="v1-contact-title"
        >
          <Image
            src="/images/project-5.jpg"
            alt=""
            fill
            sizes="100vw"
            className={styles.contactImage}
          />
          <div className={styles.contactWash} />
          <div className={styles.contactMeta}>
            <span>{copy.commissions}</span>
            <span>{settings.location}</span>
          </div>
          <div className={styles.contactCopy} data-motion="up">
            <p>{copy.place}</p>
            <h2 id="v1-contact-title">{copy.firstLine}</h2>
            <a href={`mailto:${settings.email}`}>
              {settings.email}
              <span aria-hidden="true">↗</span>
            </a>
            <div className={styles.briefPrompt}>
              <span>{copy.bring}</span>
              {copy.bringItems.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <footer className={styles.footer}>
            <span>© {new Date().getFullYear()} Studio Kova</span>
            <span>{copy.footerConcept}</span>
            <Link href="/v2">{copy.next}</Link>
          </footer>
        </section>
      </div>
    </ConceptMotionShell>
  );
}
