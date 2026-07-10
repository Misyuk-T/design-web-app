import type { Discipline } from "@/lib/types";
import { getContent } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { Placeholder } from "@/components/ui/Placeholder";
import { LinkButton } from "@/components/ui/LinkButton";

// The three discrete offerings surfaced to trade / collaborators, in the order
// they should read (visualization → printing → drafting). Copy is drawn from
// the matching getContent() services; only these disciplines appear here.
const TRADE_KEYS: Discipline[] = ["visualization", "printing", "drafting"];

// Short, quiet support lines — who each capability is for, framed as craft not
// price list. Keyed by discipline so they stay aligned with the CMS services.
const TRADE_MICROCOPY: Record<string, string> = {
  visualization: "For architects, developers & studios",
  printing: "Models, prototypes & printed objects",
  drafting: "Permit & construction documentation",
};

/**
 * Capabilities / Trade — band 05 (ux-spec §5). A quieter `ivory` band that
 * surfaces the studio's discrete technical services for collaborators:
 * photoreal 3D visualization, 3D printing / models, and drafting &
 * documentation. Restrained editorial list, hairline-separated rows, one
 * aspect-square plate per offering. Copy comes from getContent().
 */
export default async function Capabilities() {
  const { services, projects } = await getContent();

  // Map a discipline to a representative cover plate from the project set, so
  // thumbnails stay content-driven. Falls back to a neutral texture plate.
  const plateFor = (key: Discipline): string =>
    projects.find((p) => p.discipline === key)?.coverImage ??
    projects.find((p) => p.disciplines?.includes(key))?.coverImage ??
    "/images/texture.svg";

  const offerings = TRADE_KEYS.map((key) => services.find((s) => s.key === key))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((service, index) => ({
      service,
      index,
      plate: plateFor(service.key),
      note: TRADE_MICROCOPY[service.key] ?? "",
    }));

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="bg-ivory py-24 md:py-32"
    >
      <Container>
        {/* Band header — asymmetric: label + serif headline, then a lead line. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <SectionLabel number="05">Capabilities</SectionLabel>
            <h2
              id="capabilities-heading"
              className="mt-6 font-serif text-[length:clamp(2rem,4vw,3.5rem)] font-light leading-[1.08] tracking-[-0.015em] text-ink"
            >
              Services offered to the trade.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-[length:clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-stone">
              Three of our disciplines stand on their own. We take them on for
              other architects, developers, and studios — the same rigor and
              restraint we bring to our own work, offered as discrete craft
              rather than a menu.
            </p>
          </div>
        </div>

        {/* Editorial list of trade offerings — hairline-separated rows. */}
        <ul className="mt-16 md:mt-24">
          {offerings.map(({ service, index, plate, note }) => (
            <li key={service.id}>
              <Hairline />
              <article className="grid grid-cols-1 items-start gap-8 py-10 md:grid-cols-12 md:gap-10 md:py-14">
                {/* Plate */}
                <div className="md:col-span-3">
                  <Placeholder src={plate} aspect="1/1" />
                </div>

                {/* Number + serif title */}
                <div className="md:col-span-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-serif text-[length:clamp(1.5rem,2.5vw,2.25rem)] font-normal leading-tight text-ink">
                    {service.title}
                  </h3>
                  {note ? (
                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-stone">
                      {note}
                    </p>
                  ) : null}
                </div>

                {/* Description */}
                <div className="md:col-span-5">
                  <p className="text-base leading-relaxed text-stone">
                    {service.description}
                  </p>
                </div>
              </article>
            </li>
          ))}
          <li aria-hidden="true">
            <Hairline />
          </li>
        </ul>

        {/* Quiet close — collaboration invitation, no price-list tone. */}
        <div className="mt-14 flex flex-col gap-6 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[52ch] text-base leading-relaxed text-stone">
            Working on something that needs one of these in isolation? We are
            glad to collaborate.
          </p>
          <LinkButton href="/#contact" withArrow>
            Enquire
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
