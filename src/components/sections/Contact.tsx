import { getContent } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";

/**
 * Contact / CTA — the closing invitation (ux-spec §5, §4.1 "Contact CTA").
 *
 * An unhurried, unnumbered book-end that mirrors the Hero: a small uppercase
 * label, a light serif closing line, and the studio email rendered large in
 * Display M serif as a quiet `mailto:` affordance — no button chrome, no form,
 * no network dependency (PRD FR-C2). A hairline-framed meta strip carries the
 * studio locale and social links to close the page. Copy is drawn from
 * getContent() siteSettings.
 */
export default async function Contact() {
  const { settings } = await getContent();
  const { studioName, email, location, tagline, social } = settings;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 border-t border-rule py-24 md:py-32"
    >
      <Container>
        <SectionLabel>Get in touch</SectionLabel>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-14 md:grid-cols-12">
          {/* Serif closing line — the real section heading (NFR-A5). */}
          <h2
            id="contact-heading"
            className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.08] tracking-[-0.015em] text-ink md:col-span-7"
          >
            Let&rsquo;s begin the conversation.
          </h2>

          {/* Quiet supporting line — invitation, not a pitch. */}
          <div className="md:col-span-4 md:col-start-9">
            <p className="max-w-[46ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-stone">
              Tell us about the place you have in mind. We take on a small number
              of projects each year, and we read every note ourselves.
            </p>
          </div>
        </div>

        {/* The email, rendered large as a bare mailto link (ux-spec §4.1). */}
        <div className="mt-16 md:mt-20">
          <a
            href={`mailto:${email}`}
            className="group inline-block font-serif text-[clamp(1.5rem,4vw,2.75rem)] font-normal leading-tight tracking-[-0.01em] text-ink underline decoration-[1px] decoration-oat underline-offset-[8px] transition-[text-decoration-color] duration-[var(--dur)] ease-quiet hover:decoration-clay"
          >
            {email}
          </a>
        </div>

        {/* Hairline-framed close: locale + socials. No boxes, no shadows. */}
        <div className="mt-16 md:mt-24">
          <Hairline />
          <div className="flex flex-col gap-8 py-10 md:flex-row md:items-baseline md:justify-between md:gap-10 md:py-12">
            {/* Studio locale */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
                Studio
              </p>
              <p className="text-base leading-relaxed text-ink">
                <span className="font-serif text-[clamp(1.15rem,2vw,1.4rem)] font-normal">
                  {studioName}
                </span>
                <span className="mt-1 block text-stone">{location}</span>
              </p>
            </div>

            {/* Social / elsewhere */}
            {social.length > 0 && (
              <div className="flex flex-col gap-3 md:items-end">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
                  Elsewhere
                </p>
                <ul className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
                  {social.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base leading-relaxed text-ink underline decoration-[1px] decoration-oat underline-offset-[6px] transition-[text-decoration-color] duration-[var(--dur)] ease-quiet hover:decoration-clay"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Hairline />
        </div>

        {/* Softest close — the studio throughline, echoing the tagline. */}
        <p className="mt-10 max-w-[52ch] text-sm leading-relaxed text-stone md:mt-12">
          {tagline}
        </p>
      </Container>
    </section>
  );
}

export { Contact };
