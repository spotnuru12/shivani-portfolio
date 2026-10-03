import Image from 'next/image'
import { EDUCATION, POLAROIDS } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import Polaroid from '@/components/ui/Polaroid'
import Draggable from '@/components/ui/Draggable'
import SectionHeading from '@/components/ui/SectionHeading'
import { GlobeDoodle, HeadsetDoodle, PaperDoodle } from '@/components/ui/Doodles'
import PauseOffscreen from '@/components/ui/PauseOffscreen'

const PHOTO_SPOTS = [
  { left: '2%', top: '4%', rotate: -7, z: 3 },
  { left: '48%', top: '0%', rotate: 5, z: 4 },
  { left: '6%', top: '46%', rotate: 3, z: 2 },
  { left: '50%', top: '44%', rotate: -4, z: 5 },
]

export default function About() {
  return (
    <section id="about" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="about" title="About me" />
      </Reveal>

      <div className="mt-11 grid md:grid-cols-2 gap-10 md:gap-14">
        <PauseOffscreen>
        <Reveal className="flex flex-col gap-5 font-sans text-[17px] font-normal leading-[1.6] text-ink-soft max-w-[65ch]">
          <p className="m-0 text-ink">
            Hi! I&apos;m Shivani. I work on software, data, and HCI research.
            I like building things end to end, and figuring out who they&apos;re actually for while I
            do it.
          </p>

          <div className="flex gap-[18px] items-start">
            <span className="shrink-0 w-10 h-10 mt-[3px] text-orange" aria-hidden>
              <GlobeDoodle />
            </span>
            <p className="m-0 font-sans text-[17px] font-normal leading-[1.6] text-ink-soft">
              I got into tech because of the digital divide, the gap between who a
              technology is built for and who can actually use it. That&apos;s still
              what decides what I work on.
            </p>
          </div>

          <div className="flex gap-[18px] items-start">
            <a
              href="https://dl.acm.org/doi/10.1145/3710972"
              target="_blank"
              rel="noopener noreferrer"
              className="paperdoodle shrink-0 w-10 h-10 mt-[3px] text-orange"
              aria-label="Read the paper on the ACM Digital Library"
            >
              <PaperDoodle />
            </a>
            <p className="m-0 font-sans text-[17px] font-normal leading-[1.6] text-ink-soft">
              Then I co-authored my first paper with the{' '}
              <a
                href="https://tech4good.soe.ucsc.edu/"
                target="_blank"
                rel="noopener noreferrer"
              className="orglink text-orange-ink font-medium"
              >
                Tech4Good Lab
              </a>{' '}
              at UC Santa Cruz. Running the thematic analysis was my first real exposure to HCI, and
              it changed what I wanted from the work: to develop with a specific person in mind.
            </p>
          </div>

          <div className="flex gap-[18px] items-start">
            <span className="shrink-0 w-10 h-10 mt-[3px] text-orange" aria-hidden>
              <HeadsetDoodle />
            </span>
            <p className="m-0 font-sans text-[17px] font-normal leading-[1.6] text-ink-soft">
              Now I care about innovation that doesn&apos;t leave people behind. Mixed reality is
              where software is heading, and at the{' '}
              <a
                href="https://madability.cs.wisc.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="orglink text-orange-ink font-medium"
              >
                MadAbility Lab
              </a>{' '}
              I&apos;m testing where vision-language models still fail blind and low vision users.
            </p>
          </div>

          <p className="m-0 font-sans text-[17px] font-normal leading-[1.6] text-ink-soft">
            Currently I&apos;m building <span className="text-orange-ink font-medium">Pharavo</span>, a medication
            companion for ESL patients and older adults, and working as a data operations intern at{' '}
            <a
              href="https://filene.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="orglink text-orange-ink font-medium"
            >
              Filene Research Institute
            </a>
            , a think tank that helps credit unions compete with the largest players in the market.
            I&apos;m also vice president of{' '}
            <a
              href="https://www.designinteractive-uw.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="orglink text-orange-ink font-medium"
            >
              Design Interactive
            </a>
            , a human-centered design org on campus that works with local community partners to
            improve their products.
          </p>
        </Reveal>
        </PauseOffscreen>

        <div>
          <Reveal>
            <div className="relative h-[380px] md:h-[520px] touch-pan-y">
              {POLAROIDS.map((shot, i) => {
                const spot = PHOTO_SPOTS[i]
                if (!spot) return null
                return (
                  <Draggable
                    key={shot.id}
                    rotate={spot.rotate}
                    z={spot.z}
                    className="w-[46%] max-w-[156px] md:w-[188px] md:max-w-none"
                    style={{ left: spot.left, top: spot.top }}
                  >
                    <Polaroid shot={shot} className="w-full" />
                  </Draggable>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-2 flex items-start gap-4">
            <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-[14px]">
              <Image src={EDUCATION.logo} alt="" fill className="object-cover" sizes="52px" />
            </div>
            <div className="pt-0.5">
              <h3 className="font-display text-[22px] leading-[1.15]">
                {EDUCATION.school} <span aria-hidden>🦡</span>
              </h3>
              <p className="mt-1.5 text-[15px] text-orange-ink font-medium">{EDUCATION.degree}</p>
              <p className="mt-1 text-[14px] text-muted">
                {EDUCATION.dates} · {EDUCATION.honors}
              </p>
              <p className="mt-3.5 text-[14px] text-muted leading-[1.6] max-w-[46ch]">
                <span className="text-ink-soft font-medium">Coursework</span> -{' '}
                {EDUCATION.coursework.join(', ')}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
