import Hero from "@/components/sections/Hero";
import Studio from "@/components/sections/Studio";
import Disciplines from "@/components/sections/Disciplines";
import SelectedProjects from "@/components/sections/SelectedProjects";
import Process from "@/components/sections/Process";
import Capabilities from "@/components/sections/Capabilities";
import Contact from "@/components/sections/Contact";

/**
 * Home — the single-page editorial composition. Sections render in landing
 * order (ux-spec §5); each is an async server component that fetches its own
 * slice from the content layer, so this file is a pure ordered assembly. The
 * <main> wrapper, header, and footer live in layout.tsx. Page-level title and
 * description are inherited from the layout metadata defaults.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Studio />
      <Disciplines />
      <SelectedProjects />
      <Process />
      <Capabilities />
      <Contact />
    </>
  );
}
