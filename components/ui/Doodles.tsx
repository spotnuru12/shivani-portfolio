function MaskIcon({ src }: { src: string }) {
  return (
    <span
      className="block h-10 w-10 bg-current"
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}

export function GlobeDoodle() {
  return <MaskIcon src="/icons/globe.png" />
}

export function PaperDoodle() {
  return <MaskIcon src="/icons/paper.png" />
}

export function HeadsetDoodle() {
  return <MaskIcon src="/icons/headset.png" />
}
