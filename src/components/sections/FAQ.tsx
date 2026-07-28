import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

type FAQProps = {
  label: string;
  title: string;
  items: readonly { question: string; answer: string }[];
};

export function FAQ({ label, title, items }: FAQProps) {
  return (
    <section className="section-space border-t border-rule bg-ivory">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <SectionLabel>{label}</SectionLabel>
            <h2 className="section-title mt-7 max-w-[11ch] font-serif font-light text-balance">
              {title}
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {items.map((item, index) => (
              <details
                key={item.question}
                className="group border-t border-rule py-6 last:border-b"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 font-serif text-[clamp(1.5rem,2.4vw,2.15rem)] font-light leading-tight marker:content-none">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-xl transition-transform duration-[var(--dur)] group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[58ch] pt-5 text-[0.975rem] leading-7 text-stone">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FAQ;
