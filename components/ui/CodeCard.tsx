import Typewriter from '@/components/ui/Typewriter'
import { PROFILE } from '@/lib/data'

// The hero's "about me" as a source file that types its own last value.
export default function CodeCard() {
  return (
    <div className="rounded-xl border border-line bg-panel overflow-hidden max-w-[480px]">
      <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-line">
        <span className="h-2.5 w-2.5 rounded-full bg-orange" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="ml-1.5 font-mono text-[11.5px] text-muted">shivani.ts</span>
      </div>

      <pre className="px-4 py-3.5 font-mono text-[12.5px] md:text-[13px] leading-[1.85] text-ink-soft overflow-x-auto">
        <code>
          <span className="text-muted">const</span> shivani = {'{'}
          {'\n'}
          {'  '}
          <span className="text-orange-ink">school</span>:{' '}
          <span className="text-ink">&quot;UW–Madison&quot;</span>,
          {'\n'}
          {'  '}
          <span className="text-orange-ink">studying</span>: [
          <span className="text-ink">&quot;Computer Science&quot;</span>,{' '}
          <span className="text-ink">&quot;Statistics&quot;</span>],
          {'\n'}
          {'  '}
          <span className="text-orange-ink">focus</span>:{' '}
          <span className="text-ink">
            &quot;
            <Typewriter words={[...PROFILE.typing]} />
            &quot;
          </span>
          ,
          {'\n'}
          {'}'}
        </code>
      </pre>
    </div>
  )
}
