import Hero from './components/Hero'
import CreatePost from './components/CreatePost'
import Feed from './components/Feed'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <CreatePost onCreated={() => { /* Feed will refetch on mount refresh prompt: simplest ask user to refresh feed */ }} />
      <Feed />
      <footer className="text-center text-slate-400 py-6">Built with love • Social Vibes</footer>
    </div>
  )
}

export default App
