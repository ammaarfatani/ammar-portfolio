import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/hero/hero";
import { AboutExperience } from "@/components/about/about-experience";
import { TechnologyStack } from "@/components/stack/technology-stack";
import { SelectedWork } from "@/components/work/selected-work";
import { Playground } from "@/components/playground/playground";
import { ExperienceEducation } from "@/components/profile/experience-education";
import { HowIBuild } from "@/components/process/how-i-build";
import { ContactExperience } from "@/components/contact/contact-experience";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="site-shell">
      <Navigation />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Hero />
        <AboutExperience />
        <TechnologyStack />
        <SelectedWork />
        <Playground />
        <ExperienceEducation />
        <HowIBuild />
        <ContactExperience />
      </main>
      <Footer />
    </div>
  );
}
