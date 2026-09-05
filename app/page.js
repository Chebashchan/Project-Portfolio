import { getFeaturedProjects } from '../lib/data/projects'
import BentoGrid from '../components/projects/BentoGrid'
import HeroReveal from '../components/animations/HeroReveal'

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects()

  return (
    <main className="max-w-6xl mx-auto px-6 py-24">
      <HeroReveal>
        <section>
          <h1 data-reveal className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
            Designing systems. <br />
            <span className="text-neutral-500">Engineering experiences.</span>
          </h1>
          <p data-reveal className="mt-6 text-neutral-400 text-lg max-w-xl leading-relaxed">
            Hi, my name is Duke Sebastian L. Iglesia, a full-stack developer and designer passionate about creating innovative solutions that merge technology and design. I specialize in building web applications, mobile apps, and scalable backend systems that deliver exceptional user experiences.
      </HeroReveal>

      <section className="mt-24">
        <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-6">Selected Archives</h2>
        <BentoGrid projects={featuredProjects} />
      </section>
    </main>
  )
}
