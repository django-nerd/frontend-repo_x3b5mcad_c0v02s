import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
          Share your world in moments
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-200/90">
          A playful, vibrant space to post photos, like your friends’ shots, and chat in the comments.
        </p>
        <a href="#create" className="mt-8 inline-flex items-center rounded-full bg-blue-500/90 hover:bg-blue-500 text-white px-6 py-3 font-semibold transition-colors">
          Create a post
        </a>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-950" />
    </section>
  )
}

export default Hero
