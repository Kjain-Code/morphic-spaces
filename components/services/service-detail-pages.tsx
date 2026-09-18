"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fraunces } from "@/lib/fonts";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";
import { PROJECTS, type Project } from "@/components/projects/project-data";
import { SERVICES, type Service } from "@/lib/services-data";

const EASE = [0.22, 1, 0.36, 1] as const;

function Headline({ lines, className = "" }: { lines: ReactNode[]; className?: string }) {
  const reduced = useIsReducedMotion();

  return (
    <h1 className={`${fraunces.className} font-light leading-[1.08] tracking-tight ${className}`}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.12 + index * 0.12, ease: EASE }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={`flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.3em] ${
        tone === "light" ? "text-[var(--charcoal)]" : "text-[var(--gold)]"
      }`}
    >
      {children}
      <span aria-hidden="true" className={`h-px w-10 ${tone === "light" ? "bg-[var(--charcoal-20)]" : "bg-[var(--gold-40)]"}`} />
    </span>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useIsReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroLine({ className = "" }: { className?: string }) {
  const reduced = useIsReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 0.6, ease: EASE }}
      style={{ transformOrigin: "left" }}
      className={`block h-[2px] bg-[var(--gold-40)] ${className}`}
    />
  );
}

function HeroCopy({ service, statement, lines }: { service: Service; statement: string; lines: ReactNode[] }) {
  const reduced = useIsReducedMotion();

  return (
    <div className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
      >
        <Eyebrow>{service.number} / 06 &nbsp; {service.title}</Eyebrow>
      </motion.div>
      <Headline lines={lines} className="mt-8 max-w-2xl text-4xl text-[var(--ivory-90)] sm:text-6xl lg:text-7xl" />
      <motion.p
        initial={{ opacity: 0, y: reduced ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.58, ease: EASE }}
        className="mt-8 max-w-md text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base"
      >
        {statement}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.78, ease: EASE }}
      >
        <Link
          href="#story"
          className="group mt-10 inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--ivory-90)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
        >
          Enter the work
          <span className="text-lg text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>
    </div>
  );
}

function NextService({ service }: { service: Service }) {
  const index = SERVICES.findIndex((item) => item.slug === service.slug);
  const next = SERVICES[(index + 1) % SERVICES.length];

  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--graphite)] px-6 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-8">
        <div>
          <Eyebrow>Next service</Eyebrow>
          <Link href={`/services/${next.slug}`} className="group mt-5 block">
            <span className={`${fraunces.className} text-3xl font-light text-[var(--ivory-90)] sm:text-5xl`}>{next.title}</span>
            <span className="ml-4 text-[var(--gold)] transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <span className="hidden text-[10px] uppercase tracking-[0.25em] text-[var(--taupe)] sm:block">{next.number} / 06</span>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>Begin a conversation</Eyebrow>
          <h2 className={`${fraunces.className} mx-auto mt-7 max-w-3xl text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:text-6xl`}>
            Let&rsquo;s Create Something With Intention.
          </h2>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          >
            Start a conversation
            <span className="text-lg text-[var(--gold)] transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectReferences({
  projects,
  label,
  heading = "Built, Lived, Remembered.",
}: {
  projects: Project[];
  label: string;
  heading?: string;
}) {
  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>{label}</Eyebrow>
            <h2 className={`${fraunces.className} mt-5 max-w-2xl text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:whitespace-nowrap sm:text-5xl`}>{heading}</h2>
          </div>
          <Link href="/projects" className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-[var(--ivory-70)] hover:text-[var(--gold)]">View all projects →</Link>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <Link href={`/projects/${project.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--graphite)]">
                  <Image
                    src={project.image}
                    alt={`${project.title} — Morphic Spaces`}
                    fill
                    sizes="(min-width: 640px) 30vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between border-t border-[var(--ivory-10)] pt-4">
                  <div>
                    <h3 className="text-base font-light text-[var(--ivory-90)]">{project.title}</h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--taupe)]">{project.location} · {project.year}</p>
                  </div>
                  <span className="text-xs text-[var(--gold)]">{project.number}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * "Our services include" — the full sub-service checklist for a given
 * service, in a simple two/three-column list. Sits near the end of every
 * detail page's story section, right before the featured-work reference.
 */
function SubServicesList({ service }: { service: Service }) {
  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--graphite)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>Our services include</Eyebrow>
          <h2 className={`${fraunces.className} mt-6 text-3xl font-light leading-[1.15] tracking-tight text-[var(--ivory-90)] sm:text-4xl`}>
            Everything under {service.shortTitle.toLowerCase()}.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-4 border-t border-[var(--ivory-10)] pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {service.subServices.map((item, index) => (
            <Reveal key={item} delay={(index % 6) * 0.05} className="flex items-baseline gap-3">
              <span aria-hidden="true" className="text-xs text-[var(--gold)]">
                →
              </span>
              <span className="text-sm text-[var(--ivory-70)]">{item}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitecturePage({ service }: { service: Service }) {
  const reduced = useIsReducedMotion();
  const projects = PROJECTS.filter((project) => project.category === "Residential" || project.category === "Commercial").filter(
    (project) => project.image !== service.heroImage && project.image !== service.overviewImage
  );

  return (
    <>
      <section className="relative min-h-[92svh] overflow-hidden bg-[var(--charcoal)] px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto grid min-h-[76svh] max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="relative z-10 lg:col-span-5"><HeroCopy service={service} statement="Architecture begins before a line is drawn. We study the site, the climate, the people and the way a space will be lived before defining its form." lines={[<span key="design">We Design The</span>, <span key="framework">Framework For</span>, <em key="living" className="text-[var(--gold)]">Living.</em>]} /></div>
          <div className="relative min-h-[28rem] lg:col-span-7 lg:min-h-[70vh]">
            <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} transition={{ duration: reduced ? 0 : 1.5, ease: EASE }} className="absolute right-0 top-0 h-[85%] w-[78%] overflow-hidden sm:w-[68%]">
              <Image src={service.heroImage} alt="Architecture shaped around a residential facade" fill priority sizes="(min-width: 1024px) 42vw, 85vw" className="object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.7, ease: EASE }} className="absolute bottom-0 left-0 h-[42%] w-[48%] overflow-hidden border-8 border-[var(--charcoal)] sm:w-[40%]">
              <Image src={service.overviewImage} alt="Architectural material and site detail" fill sizes="20rem" className="object-cover" />
            </motion.div>
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-[var(--taupe)] sm:block">Site<br />Proportion<br />Light<br />Movement</div>
          </div>
        </div>
      </section>

      <section id="story" className="border-t border-[var(--ivory-10)] bg-[var(--graphite)] px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4"><Eyebrow>The foundation</Eyebrow><h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:text-5xl`}>A place is never just a form.</h2></Reveal>
          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7"><p className="max-w-xl text-lg font-light leading-relaxed text-[var(--ivory-70)]">We read context before we draw conclusions. The structure follows the life inside it, the climate around it and the material decisions that allow it to belong.</p><HeroLine className="mt-10 w-full" /></Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-[var(--charcoal)] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>From concept to creation</Eyebrow></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--ivory-10)] sm:grid-cols-4">
            {["Site", "Idea", "Form", "Place"].map((item, index) => (
              <Reveal key={item} delay={index * 0.08} className="bg-[var(--charcoal)] px-5 py-8 sm:min-h-52 sm:px-6 sm:py-10">
                <span className="text-xs text-[var(--gold)]">0{index + 1}</span>
                <h3 className={`${fraunces.className} mt-10 text-3xl font-light text-[var(--ivory-90)]`}>{item}</h3>
                <p className="mt-4 max-w-[13rem] text-xs leading-relaxed text-[var(--taupe)]">{["Read the ground, climate and context.", "Find the order beneath the brief.", "Give proportion a physical language.", "Make the idea inhabitable."][index]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SubServicesList service={service} />
      <ProjectReferences projects={projects} label="Selected architecture" heading="Built, Lived, Remembered." />
      <NextService service={service} />
      <FinalCTA />
    </>
  );
}

function InteriorPage({ service }: { service: Service }) {
  const reduced = useIsReducedMotion();
  const projects = PROJECTS.filter((project) => project.category === "Interiors").filter(
    (project) => project.image !== service.heroImage && project.image !== service.overviewImage
  );

  return (
    <>
      <section className="relative min-h-[92svh] overflow-hidden bg-[var(--graphite)] px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto grid min-h-[76svh] max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="relative z-10 lg:col-span-5"><HeroCopy service={service} statement="Interiors are built from the things that stay with us: the weight of a door, the fall of light, the texture beneath a hand and the rituals a room quietly holds." lines={[<span key="shape">We Shape</span>, <span key="lives">What Lives</span>, <em key="within" className="text-[var(--gold)]">Within.</em>]} /></div>
          <div className="relative min-h-[28rem] lg:col-span-7 lg:min-h-[70vh]">
            <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} transition={{ duration: reduced ? 0 : 1.5, ease: EASE }} className="absolute right-0 top-0 h-[85%] w-[78%] overflow-hidden sm:w-[68%]">
              <Image src={service.heroImage} alt="Layered interior material and light" fill priority sizes="(min-width: 1024px) 42vw, 85vw" className="object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.7, ease: EASE }} className="absolute bottom-0 left-0 h-[42%] w-[48%] overflow-hidden border-8 border-[var(--graphite)] sm:w-[40%]">
              <Image src="/images/projects/147p-panchkula-interior.jpg" alt="Interior detail and material composition" fill sizes="20rem" className="object-cover" />
            </motion.div>
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-[var(--taupe)] sm:block">Material<br />Light<br />Furniture<br />Detail</div>
          </div>
        </div>
      </section>

      <section id="story" className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl"><Eyebrow>Atmosphere first</Eyebrow><h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:text-6xl`}>A room should reveal itself slowly.</h2><p className="mt-7 max-w-xl text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">We work from the atmosphere outward, balancing proportion, texture and light until a space feels personal without needing to announce itself.</p></Reveal>
          <div className="mt-20 grid grid-cols-2 gap-1 sm:grid-cols-5">
            {["Stone", "Wood", "Textile", "Metal", "Light"].map((item, index) => (
              <Reveal key={item} delay={index * 0.08} className="border-t border-[var(--ivory-10)] px-3 py-5 sm:px-4 sm:py-7">
                <span className="text-[10px] text-[var(--gold)]">0{index + 1}</span>
                <p className={`${fraunces.className} mt-10 text-xl font-light text-[var(--ivory-90)] sm:text-2xl`}>{item}</p>
                <p className="mt-3 max-w-[11rem] text-xs leading-relaxed text-[var(--taupe)]">
                  {
                    [
                      "A grounding coolness underfoot.",
                      "Warmth and grain, overhead and under hand.",
                      "Softness that invites touch.",
                      "A precise, quiet accent.",
                      "The material that shapes all the others.",
                    ][index]
                  }
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--stone-warm)] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><Eyebrow tone="light">Material in balance</Eyebrow><h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--charcoal)] sm:text-6xl`}>The detail is the atmosphere.</h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--charcoal-muted)]">Furniture, finish and light are not layers added at the end. They are the language through which a room becomes legible.</p></Reveal>
          <Reveal delay={0.14} className="relative aspect-[4/3] lg:col-span-6 lg:col-start-7"><Image src={service.overviewImage} alt="Interior material and light" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></Reveal>
        </div>
      </section>

      <SubServicesList service={service} />
      <ProjectReferences projects={projects} label="Selected interiors" heading="Crafted, Lived, Cherished." />
      <NextService service={service} />
      <FinalCTA />
    </>
  );
}

function LandscapePage({ service }: { service: Service }) {
  const reduced = useIsReducedMotion();
  const projects = PROJECTS.filter((project) => ["residence-at-mohali", "residence-at-kaithal"].includes(project.id)).filter(
    (project) => project.image !== service.heroImage && project.image !== service.overviewImage
  );

  return (
    <>
      <section className="relative min-h-[92svh] overflow-hidden bg-[var(--charcoal)] px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto grid min-h-[76svh] max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="relative z-10 lg:col-span-5">
            <HeroCopy service={service} statement="The garden is not an edge to the architecture. It is the slower room beyond it — shaped by planting, shade, weather and the way people move outside." lines={[<span key="where">Where</span>, <span key="architecture">Architecture</span>, <em key="land" className="text-[var(--gold)]">Meets The Land.</em>]} />
          </div>
          <div className="relative min-h-[28rem] lg:col-span-7 lg:min-h-[70vh]">
            <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} transition={{ duration: reduced ? 0 : 1.5, ease: EASE }} className="absolute right-0 top-0 h-[85%] w-[78%] overflow-hidden sm:w-[68%]">
              <Image src={service.heroImage} alt="A landscaped garden extending around a Morphic Spaces residence" fill priority sizes="(min-width: 1024px) 42vw, 85vw" className="object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.7, ease: EASE }} className="absolute bottom-0 left-0 h-[42%] w-[48%] overflow-hidden border-8 border-[var(--charcoal)] sm:w-[40%]">
              <Image src={service.overviewImage} alt="A landscaped courtyard and planting detail" fill sizes="20rem" className="object-cover" />
            </motion.div>
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-[var(--taupe)] sm:block">Built<br />Threshold<br />Garden<br />Landscape</div>
          </div>
        </div>
      </section>

      <section id="story" className="border-t border-[var(--ivory-10)] bg-[var(--graphite)] px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4"><Eyebrow>Land + site</Eyebrow><h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:text-5xl`}>A landscape changes the pace of a place.</h2></Reveal>
          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7"><p className="text-lg font-light leading-relaxed text-[var(--ivory-70)]">We shape outdoor rooms through shade, planting, ground and transition. The result is not decoration around a building, but a living continuation of its architecture.</p><HeroLine className="mt-10 w-full" /></Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-[var(--charcoal)] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>A slower sequence</Eyebrow></Reveal>
          <div className="mt-16 grid grid-cols-1 gap-0 border-t border-[var(--ivory-10)] sm:grid-cols-4">
            {["Built", "Threshold", "Garden", "Landscape"].map((item, index) => (
              <Reveal key={item} delay={index * 0.12} className="border-b border-[var(--ivory-10)] py-8 sm:border-b-0 sm:border-r sm:px-6 sm:py-10 first:sm:pl-0 last:sm:border-r-0"><span className="text-xs text-[var(--gold)]">0{index + 1}</span><h3 className={`${fraunces.className} mt-12 text-3xl font-light text-[var(--ivory-90)]`}>{item}</h3><p className="mt-4 max-w-[13rem] text-xs leading-relaxed text-[var(--taupe)]">{["The structure sets the ground.", "A pause between inside and out.", "Planting makes room for time.", "A place that keeps changing."][index]}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--stone-warm)] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><Eyebrow tone="light">Seasonal change</Eyebrow><h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--charcoal)] sm:text-6xl`}>The best garden is never still.</h2></Reveal>
          <Reveal delay={0.14} className="relative aspect-[16/10] lg:col-span-6 lg:col-start-7"><Image src={service.overviewImage} alt="A residential garden integrated with architecture" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></Reveal>
        </div>
      </section>

      <SubServicesList service={service} />
      <ProjectReferences projects={projects} label="Landscape in context" heading="Planted, Grown, Enjoyed." />
      <NextService service={service} />
      <FinalCTA />
    </>
  );
}

function VisualizationPage({ service }: { service: Service }) {
  const reduced = useIsReducedMotion();
  const projects = PROJECTS.filter((project) => project.id.endsWith("-concept")).filter(
    (project) => project.image !== service.heroImage && project.image !== service.overviewImage
  );

  return (
    <>
      <section className="relative min-h-[92svh] overflow-hidden bg-[var(--charcoal)] px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto grid min-h-[76svh] max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="relative z-10 lg:col-span-5">
            <HeroCopy
              service={service}
              statement="A rendering is a conversation piece. It lets a client, a contractor and the studio agree on scale, material and light long before the first brick is laid."
              lines={[<span key="see">See It</span>, <span key="before">Before It&rsquo;s</span>, <em key="built" className="text-[var(--gold)]">Built.</em>]}
            />
          </div>
          <div className="relative min-h-[28rem] lg:col-span-7 lg:min-h-[70vh]">
            <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} transition={{ duration: reduced ? 0 : 1.5, ease: EASE }} className="absolute right-0 top-0 h-[85%] w-[78%] overflow-hidden sm:w-[68%]">
              <Image src={service.heroImage} alt="A photorealistic architectural visualization" fill priority sizes="(min-width: 1024px) 42vw, 85vw" className="object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.7, ease: EASE }} className="absolute bottom-0 left-0 h-[42%] w-[48%] overflow-hidden border-8 border-[var(--charcoal)] sm:w-[40%]">
              <Image src={service.overviewImage} alt="A photorealistic material and lighting study" fill sizes="20rem" className="object-cover" />
            </motion.div>
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-[var(--taupe)] sm:block">Scale<br />Material<br />Light<br />Atmosphere</div>
          </div>
        </div>
      </section>

      <section id="story" className="border-t border-[var(--ivory-10)] bg-[var(--graphite)] px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Before it&rsquo;s real</Eyebrow>
            <h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:text-5xl`}>What you approve is what gets built.</h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-xl text-lg font-light leading-relaxed text-[var(--ivory-70)]">
              We build every visualization on the same material, light and proportion decisions the finished space will
              actually carry — never a generic stand-in render that gets quietly redesigned later.
            </p>
            <HeroLine className="mt-10 w-full" />
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-[var(--charcoal)] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>From concept to render</Eyebrow></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--ivory-10)] sm:grid-cols-4">
            {["Model", "Material", "Light", "Render"].map((item, index) => (
              <Reveal key={item} delay={index * 0.08} className="bg-[var(--charcoal)] px-5 py-8 sm:min-h-52 sm:px-6 sm:py-10">
                <span className="text-xs text-[var(--gold)]">0{index + 1}</span>
                <h3 className={`${fraunces.className} mt-10 text-3xl font-light text-[var(--ivory-90)]`}>{item}</h3>
                <p className="mt-4 max-w-[13rem] text-xs leading-relaxed text-[var(--taupe)]">
                  {[
                    "Build accurate geometry from the design drawings.",
                    "Match every finish to what will actually be used.",
                    "Study how daylight and fixtures behave in the space.",
                    "Produce a photorealistic still, walkthrough or film.",
                  ][index]}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--stone-warm)] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow tone="light">Seeing is deciding</Eyebrow>
            <h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--charcoal)] sm:text-6xl`}>Clarity, before a single wall goes up.</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--charcoal-muted)]">
              From a single still to a full flythrough, our visualizations exist to remove doubt — not to impress, but
              to inform a confident decision.
            </p>
          </Reveal>
          <Reveal delay={0.14} className="relative aspect-[4/3] lg:col-span-6 lg:col-start-7">
            <Image src={service.overviewImage} alt="A photorealistic interior render" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <SubServicesList service={service} />
      <ProjectReferences projects={projects} label="Visualized in detail" heading="Rendered, Reviewed, Realized." />
      <NextService service={service} />
      <FinalCTA />
    </>
  );
}

function ConsultancyPage({ service }: { service: Service }) {
  const reduced = useIsReducedMotion();
  const projects = PROJECTS.filter((project) => project.category === "Commercial").filter(
    (project) => project.image !== service.heroImage && project.image !== service.overviewImage
  );

  return (
    <>
      <section className="relative min-h-[92svh] overflow-hidden bg-[var(--graphite)] px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto grid min-h-[76svh] max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="relative z-10 lg:col-span-5">
            <HeroCopy
              service={service}
              statement="Not every project needs a studio full-time. Sometimes what a design needs most is a second, experienced opinion at exactly the right moment."
              lines={[<span key="expertise">Expertise,</span>, <span key="when">When</span>, <em key="need" className="text-[var(--gold)]">You Need It.</em>]}
            />
          </div>
          <div className="relative min-h-[28rem] lg:col-span-7 lg:min-h-[70vh]">
            <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} transition={{ duration: reduced ? 0 : 1.5, ease: EASE }} className="absolute right-0 top-0 h-[85%] w-[78%] overflow-hidden sm:w-[68%]">
              <Image src={service.heroImage} alt="A design concept under review" fill priority sizes="(min-width: 1024px) 42vw, 85vw" className="object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.7, ease: EASE }} className="absolute bottom-0 left-0 h-[42%] w-[48%] overflow-hidden border-8 border-[var(--graphite)] sm:w-[40%]">
              <Image src={service.overviewImage} alt="A design concept ready for review" fill sizes="20rem" className="object-cover" />
            </motion.div>
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-[var(--taupe)] sm:block">Review<br />Direction<br />Detail<br />Decision</div>
          </div>
        </div>
      </section>

      <section id="story" className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <Eyebrow>Focused, not full-service</Eyebrow>
            <h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:text-6xl`}>A second opinion, held to the same rigor.</h2>
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">
              Whether it's reviewing a concept a client already has, unsticking a stalled decision or advising at one
              key stage, our consultancy work follows the same process as a full project — just scoped to what's
              actually needed.
            </p>
          </Reveal>
          <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-[var(--ivory-10)] pt-5 sm:grid-cols-4 sm:gap-0">
            {["Review", "Advise", "Refine", "Direct"].map((item, index) => (
              <Reveal key={item} delay={index * 0.08} className="sm:border-r sm:border-[var(--ivory-10)] sm:px-5 first:sm:pl-0 last:sm:border-r-0">
                <span className="text-[10px] text-[var(--gold)]">0{index + 1}</span>
                <p className={`${fraunces.className} mt-10 text-2xl font-light text-[var(--ivory-90)]`}>{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--stone-warm)] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
          <Reveal className="relative order-2 aspect-[4/5] lg:order-1 lg:col-span-5">
            <Image src={service.overviewImage} alt="A design concept ready for review" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.14} className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <Eyebrow tone="light">Practical guidance</Eyebrow>
            <h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--charcoal)] sm:text-6xl`}>Direction you can act on.</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--charcoal-muted)]">
              Every consultation ends with something usable — a recommendation, a marked-up drawing or a clear next
              step, not just an opinion.
            </p>
          </Reveal>
        </div>
      </section>

      <SubServicesList service={service} />
      <ProjectReferences projects={projects} label="Advised in context" heading="Advised, Refined, Delivered." />
      <NextService service={service} />
      <FinalCTA />
    </>
  );
}

function RenovationPage({ service }: { service: Service }) {
  const reduced = useIsReducedMotion();
  const projects = PROJECTS.filter((project) => ["147p-panchkula", "147p-panchkula-interior", "residence-at-karnal"].includes(project.id)).filter(
    (project) => project.image !== service.heroImage && project.image !== service.overviewImage
  );

  return (
    <>
      <section className="relative min-h-[92svh] overflow-hidden bg-[var(--charcoal)] px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto grid min-h-[76svh] max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="relative z-10 lg:col-span-5">
            <HeroCopy
              service={service}
              statement="An existing structure carries its own logic — its bones, its constraints, its history. We work with that logic to unlock what a space could become."
              lines={[<span key="reimagining">Reimagining</span>, <span key="what">What</span>, <em key="already" className="text-[var(--gold)]">Already Exists.</em>]}
            />
          </div>
          <div className="relative min-h-[28rem] lg:col-span-7 lg:min-h-[70vh]">
            <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} transition={{ duration: reduced ? 0 : 1.5, ease: EASE }} className="absolute right-0 top-0 h-[85%] w-[78%] overflow-hidden sm:w-[68%]">
              <Image src={service.heroImage} alt="A residence mid-construction, before its transformation" fill priority sizes="(min-width: 1024px) 42vw, 85vw" className="object-cover grayscale-[0.2]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.7, ease: EASE }} className="absolute bottom-0 left-0 h-[42%] w-[48%] overflow-hidden border-8 border-[var(--charcoal)] sm:w-[40%]">
              <Image src={service.overviewImage} alt="The same residence, completed" fill sizes="20rem" className="object-cover" />
            </motion.div>
            <span className="absolute bottom-2 left-0 text-[9px] uppercase tracking-[0.2em] text-[var(--ivory-45)] sm:hidden">Before → After</span>
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-[var(--taupe)] sm:block">Before<br />↓<br />After</div>
          </div>
        </div>
      </section>

      <section id="story" className="border-t border-[var(--ivory-10)] bg-[var(--graphite)] px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Working with what's there</Eyebrow>
            <h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:text-5xl`}>Transformation, not demolition.</h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-xl text-lg font-light leading-relaxed text-[var(--ivory-70)]">
              We look for what a structure already does well, then focus our intervention on what's holding it back —
              layout, light, material or identity — so the result feels renewed rather than replaced.
            </p>
            <HeroLine className="mt-10 w-full" />
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-[var(--charcoal)] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal><Eyebrow>A staged process</Eyebrow></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--ivory-10)] sm:grid-cols-4">
            {["Assess", "Plan", "Transform", "Refine"].map((item, index) => (
              <Reveal key={item} delay={index * 0.08} className="bg-[var(--charcoal)] px-5 py-8 sm:min-h-52 sm:px-6 sm:py-10">
                <span className="text-xs text-[var(--gold)]">0{index + 1}</span>
                <h3 className={`${fraunces.className} mt-10 text-3xl font-light text-[var(--ivory-90)]`}>{item}</h3>
                <p className="mt-4 max-w-[13rem] text-xs leading-relaxed text-[var(--taupe)]">
                  {[
                    "Understand what the existing structure allows.",
                    "Decide what stays, what changes and why.",
                    "Rebuild, reorganize and refinish with intention.",
                    "Complete the details that make it feel whole.",
                  ][index]}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SubServicesList service={service} />
      <ProjectReferences projects={projects} label="Selected renovations" heading="Reimagined, Rebuilt, Renewed." />
      <NextService service={service} />
      <FinalCTA />
    </>
  );
}

export function ServiceDetailPages({ service }: { service: Service }) {
  switch (service.slug) {
    case "architecture":
      return <ArchitecturePage service={service} />;
    case "interior-design":
      return <InteriorPage service={service} />;
    case "visualization":
      return <VisualizationPage service={service} />;
    case "landscape":
      return <LandscapePage service={service} />;
    case "design-consultancy":
      return <ConsultancyPage service={service} />;
    case "renovation":
      return <RenovationPage service={service} />;
    default:
      return null;
  }
}