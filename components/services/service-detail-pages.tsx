"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { fraunces } from "@/lib/fonts";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";
import { PROJECTS, type Project } from "@/components/projects/project-data";
import { SERVICES, type Service } from "@/lib/services-data";

const EASE = [0.22, 1, 0.36, 1] as const;

function Headline({ lines, className = "" }: { lines: ReactNode[]; className?: string }) {
  const reduced = useIsReducedMotion();

  return (
    <h1 className={`${fraunces.className} font-light leading-[0.94] tracking-tight ${className}`}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden">
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

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
      {children}
      <span aria-hidden="true" className="h-px w-10 bg-[var(--gold-40)]" />
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
      className={`block h-px bg-[var(--gold-30)] ${className}`}
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
        <Eyebrow>{service.number} / 04 &nbsp; {service.title}</Eyebrow>
      </motion.div>
      <Headline lines={lines} className="mt-8 max-w-3xl text-5xl text-[var(--ivory-90)] sm:text-7xl lg:text-8xl" />
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
        <span className="hidden text-[10px] uppercase tracking-[0.25em] text-[var(--taupe)] sm:block">{next.number} / 04</span>
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
            Let&rsquo;s create a space with intention.
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

function ProjectReferences({ projects, label }: { projects: Project[]; label: string }) {
  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>{label}</Eyebrow>
            <h2 className={`${fraunces.className} mt-5 max-w-xl text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:text-5xl`}>Built, lived, remembered.</h2>
          </div>
          <Link href="/projects" className="text-[10px] uppercase tracking-[0.25em] text-[var(--ivory-70)] hover:text-[var(--gold)]">View all projects →</Link>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1} className={index === 1 ? "sm:mt-16" : ""}>
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

function ArchitecturePage({ service }: { service: Service }) {
  const reduced = useIsReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const projects = PROJECTS.filter((project) => project.category === "Residential" || project.category === "Commercial").slice(0, 3);

  return (
    <>
      <section ref={heroRef} className="relative min-h-[92svh] overflow-hidden bg-[var(--charcoal)] px-6 pb-16 pt-32 sm:px-10 sm:pt-40 lg:px-0">
        <div className="mx-auto grid min-h-[76svh] max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="relative z-10 lg:col-span-6 lg:pr-10"><HeroCopy service={service} statement="Architecture begins before a line is drawn. We study the site, the climate, the people and the way a space will be lived before defining its form." lines={[<span key="design">We design the</span>, <span key="framework">framework for</span>, <em key="living" className="text-[var(--gold)]">living.</em>]} /></div>
          <div className="relative min-h-[26rem] lg:col-span-6 lg:min-h-[70vh]">
            <motion.div style={{ y: reduced ? 0 : imageY }} className="absolute inset-y-0 right-0 w-[88%] overflow-hidden sm:w-[80%]">
              <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} transition={{ duration: reduced ? 0 : 1.5, ease: EASE }} className="absolute inset-0">
                <Image src={service.heroImage} alt="Architecture shaped around a residential facade" fill priority sizes="(min-width: 1024px) 44vw, 90vw" className="object-cover" />
              </motion.div>
            </motion.div>
            <div className="absolute bottom-0 left-0 hidden w-48 border-l border-t border-[var(--gold-30)] pt-4 pl-4 text-[10px] uppercase leading-loose tracking-[0.22em] text-[var(--taupe)] sm:block">Site<br />Proportion<br />Light<br />Movement</div>
            <motion.svg viewBox="0 0 500 650" aria-hidden="true" className="pointer-events-none absolute -right-12 -top-10 h-[110%] w-[110%] text-[var(--gold-30)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.path d="M70 70h110M70 70v110M430 580H320M430 580V470M100 350h300" fill="none" stroke="currentColor" strokeWidth="0.7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduced ? 0 : 1.8, delay: reduced ? 0 : 0.45, ease: EASE }} />
            </motion.svg>
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
          <Reveal><Eyebrow>From site to space</Eyebrow></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--ivory-10)] sm:grid-cols-4">
            {["Site", "Idea", "Form", "Space"].map((item, index) => (
              <Reveal key={item} delay={index * 0.08} className="bg-[var(--charcoal)] px-5 py-8 sm:min-h-52 sm:px-6 sm:py-10">
                <span className="text-xs text-[var(--gold)]">0{index + 1}</span>
                <h3 className={`${fraunces.className} mt-10 text-3xl font-light text-[var(--ivory-90)]`}>{item}</h3>
                <p className="mt-4 max-w-[13rem] text-xs leading-relaxed text-[var(--taupe)]">{["Read the ground, climate and context.", "Find the order beneath the brief.", "Give proportion a physical language.", "Make the idea inhabitable."][index]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProjectReferences projects={projects} label="Selected architecture" />
      <NextService service={service} />
      <FinalCTA />
    </>
  );
}

function InteriorPage({ service }: { service: Service }) {
  const reduced = useIsReducedMotion();
  const projects = PROJECTS.filter((project) => project.category === "Interiors").slice(0, 3);

  return (
    <>
      <section className="relative min-h-[92svh] overflow-hidden bg-[var(--graphite)] px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto grid min-h-[76svh] max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="relative z-10 lg:col-span-5"><HeroCopy service={service} statement="Interiors are built from the things that stay with us: the weight of a door, the fall of light, the texture beneath a hand and the rituals a room quietly holds." lines={[<span key="shape">We shape</span>, <span key="spaces">the spaces</span>, <em key="within" className="text-[var(--gold)]">within.</em>]} /></div>
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
              <Reveal key={item} delay={index * 0.08} className="border-t border-[var(--ivory-10)] px-3 py-5 sm:px-4 sm:py-7"><span className="text-[10px] text-[var(--gold)]">0{index + 1}</span><p className={`${fraunces.className} mt-10 text-xl font-light text-[var(--ivory-90)] sm:text-2xl`}>{item}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--stone-warm)] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><Eyebrow>Material in balance</Eyebrow><h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--charcoal)] sm:text-6xl`}>The detail is the atmosphere.</h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--charcoal-muted)]">Furniture, finish and light are not layers added at the end. They are the language through which a room becomes legible.</p></Reveal>
          <Reveal delay={0.14} className="relative aspect-[4/3] lg:col-span-6 lg:col-start-7"><Image src={service.overviewImage} alt="Interior material and light" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></Reveal>
        </div>
      </section>

      <ProjectReferences projects={projects} label="Selected interiors" />
      <NextService service={service} />
      <FinalCTA />
    </>
  );
}

function LandscapePage({ service }: { service: Service }) {
  const reduced = useIsReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const projects = PROJECTS.filter((project) => ["residence-at-mohali", "residence-at-kaithal"].includes(project.id));

  return (
    <>
      <section ref={heroRef} className="relative min-h-[94svh] overflow-hidden bg-[var(--charcoal)] px-6 pt-32 sm:px-10 sm:pt-40">
        <motion.div style={{ y: reduced ? 0 : imageY }} className="absolute inset-x-0 bottom-0 h-[66%] overflow-hidden opacity-70 sm:h-[72%]">
          <Image src={service.heroImage} alt="Landscape extending around a Morphic Spaces residence" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-[var(--charcoal)]/25 to-transparent" />
        </motion.div>
        <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-between pb-12">
          <HeroCopy service={service} statement="The garden is not an edge to the architecture. It is the slower room beyond it — shaped by planting, shade, weather and the way people move outside." lines={[<span key="where">Where</span>, <span key="architecture">architecture</span>, <em key="land" className="text-[var(--gold)]">meets the land.</em>]} />
          <div className="grid grid-cols-2 gap-6 border-t border-[var(--gold-30)] pt-4 text-[10px] uppercase tracking-[0.22em] text-[var(--ivory-55)] sm:grid-cols-4"><span>Built</span><span>Threshold</span><span>Garden</span><span>Landscape</span></div>
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
          <Reveal className="lg:col-span-5"><Eyebrow>Seasonal change</Eyebrow><h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--charcoal)] sm:text-6xl`}>The best garden is never still.</h2></Reveal>
          <Reveal delay={0.14} className="relative aspect-[16/10] lg:col-span-6 lg:col-start-7"><Image src={service.overviewImage} alt="A residential garden integrated with architecture" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></Reveal>
        </div>
      </section>

      <ProjectReferences projects={projects} label="Landscape in context" />
      <NextService service={service} />
      <FinalCTA />
    </>
  );
}

function FurniturePage({ service }: { service: Service }) {
  const reduced = useIsReducedMotion();
  const projects = PROJECTS.filter((project) => project.category === "Interiors").slice(0, 3);

  return (
    <>
      <section className="relative min-h-[92svh] overflow-hidden bg-[var(--graphite)] px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto grid min-h-[76svh] max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="relative z-10 lg:col-span-6"><HeroCopy service={service} statement="The final layer is often the most intimate. We select and shape objects for the way they hold light, invite touch and give a room its particular character." lines={[<span key="details">The details</span>, <span key="make">that make</span>, <em key="yours" className="text-[var(--gold)]">a space yours.</em>]} /></div>
          <div className="relative min-h-[28rem] lg:col-span-6 lg:min-h-[70vh]">
            <motion.div initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduced ? 0 : 1.5, ease: EASE }} className="absolute right-0 top-0 h-[72%] w-[78%] overflow-hidden sm:w-[70%]">
              <Image src={service.heroImage} alt="Furniture and interior details" fill priority sizes="(min-width: 1024px) 42vw, 90vw" className="object-cover" />
            </motion.div>
            <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 0.5, ease: EASE }} className="absolute bottom-0 left-0 h-[48%] w-[52%] overflow-hidden border-8 border-[var(--graphite)]">
              <Image src="/images/projects/interior-panchkula.jpg" alt="Interior detail with crafted material" fill sizes="22rem" className="object-cover" />
            </motion.div>
            <div className="absolute bottom-8 right-0 text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-[var(--taupe)]">Object<br />Form<br />Material<br />Craft</div>
          </div>
        </div>
      </section>

      <section id="story" className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-7xl"><Reveal className="max-w-3xl"><Eyebrow>A collection, not a catalogue</Eyebrow><h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:text-6xl`}>Objects give a room its memory.</h2><p className="mt-7 max-w-xl text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">We look for the quiet relationship between a piece and the space around it: scale, texture, edge, shadow and the trace of the hand that made it.</p></Reveal>
          <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-[var(--ivory-10)] pt-5 sm:grid-cols-5 sm:gap-0">{["Object", "Form", "Material", "Craft", "Place"].map((item, index) => <Reveal key={item} delay={index * 0.08} className="sm:border-r sm:border-[var(--ivory-10)] sm:px-5 first:sm:pl-0 last:sm:border-r-0"><span className="text-[10px] text-[var(--gold)]">0{index + 1}</span><p className={`${fraunces.className} mt-10 text-2xl font-light text-[var(--ivory-90)]`}>{item}</p></Reveal>)}</div>
        </div>
      </section>

      <section className="bg-[var(--stone-warm)] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12"><Reveal className="relative order-2 aspect-[4/5] lg:order-1 lg:col-span-5"><Image src="/images/projects/147p-panchkula-interior.jpg" alt="Material, furniture and light in an interior" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" /></Reveal><Reveal delay={0.14} className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8"><Eyebrow>Craft in context</Eyebrow><h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--charcoal)] sm:text-6xl`}>The object completes the room.</h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--charcoal-muted)]">A considered object does not compete with architecture. It gives the space somewhere to gather.</p></Reveal></div>
      </section>

      <ProjectReferences projects={projects} label="Selected interiors" />
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
    case "landscape":
      return <LandscapePage service={service} />;
    case "furniture-decor":
      return <FurniturePage service={service} />;
    default:
      return null;
  }
}