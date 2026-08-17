import { SKILLS } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import SkillChip from '@/components/ui/SkillChip'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Toolkit() {
  return (
    <section id="toolkit" className="max-w-content mx-auto px-6 md:px-10 pt-10 pb-20 md:pb-24">
      <Reveal>
        <SectionHeading eyebrow="stack" title="Toolkit" />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {Object.entries(SKILLS).map(([category, list], i) => (
          <Reveal key={category} as="div" delay={i * 60}>
            <div className="eyebrow mb-4">{category}</div>
            <div className="flex flex-wrap gap-2">
              {list.map((skill) => (
                <SkillChip key={skill} name={skill} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
