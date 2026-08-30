import { getDictionary, Locale } from "@/dictionaries";
import ProjectHero from "@/components/projects/ProjectHero";
import StatsBar from "@/components/projects/StatsBar";
import AboutSection from "@/components/projects/AboutSection";
import VisionMission from "@/components/projects/VisionMission";
import ServicePipeline from "@/components/projects/ServicePipeline";
import ProductRange from "@/components/projects/ProductRange";
import ProjectCTA from "@/components/projects/ProjectCTA";

export default async function Projects({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const p = dict.projects;
  const cp = p.currentPower;

  return (
    <>
      <ProjectHero
        eyebrow={cp.modalEyebrow}
        title={cp.cardTitle}
        tag={cp.tag}
        blurb={cp.cardBlurb}
        location={cp.location}
        sector={cp.sector}
        home={p.home}
        pageTitle={p.title}
      />

      <StatsBar stats={cp.stats} />

      <AboutSection
        aboutLabel={cp.aboutLabel}
        aboutP1={cp.aboutP1}
        aboutP2={cp.aboutP2}
      />

      <VisionMission
        label={cp.visionMissionLabel}
        visionTitle={cp.visionTitle}
        vision={cp.vision}
        missionTitle={cp.missionTitle}
        mission={cp.mission}
      />

      <ServicePipeline
        label={cp.serviceModelLabel}
        services={cp.services}
      />

      <ProductRange
        label={cp.productRangeLabel}
        outputRange={cp.outputRange}
        tiers={cp.tiers}
      />

      <ProjectCTA
        contactLabel={dict.navbar.requestQuote}
        lang={params.lang}
      />
    </>
  );
}
