import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import Projects from '@/components/sections/Projects'
import Toolkit from '@/components/sections/Toolkit'
import Shelf from '@/components/sections/Shelf'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Shelf />
      <Projects />
      <Toolkit />
      <Contact />
    </>
  )
}
