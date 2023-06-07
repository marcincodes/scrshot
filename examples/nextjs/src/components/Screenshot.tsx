import Image from 'next/image'

export function Screenshot() {
  return (
    <div>
      <h1>I&apos;m up-to-date screenshot</h1>
      <img src="/screenshots/homepage.png" alt='Next.js screenshot' />
      {/* Using NextJS Image cache image */}
      <Image
        src="/screenshots/homepage.png"
        alt="Next.js screenshot"
        width={434}
        height={38}
        // priority
      />
    </div>
  )
}
