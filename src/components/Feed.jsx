import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function PostCard({ post, onLike, onComment }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <img src={post.author_avatar_url || 'https://i.pravatar.cc/64'} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
        <div>
          <p className="text-white font-semibold leading-tight">{post.author_name}</p>
          <p className="text-xs text-slate-400">{new Date(post.created_at || Date.now()).toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-black/20">
        <img src={post.image_url} alt={post.caption || 'photo'} className="w-full max-h-[560px] object-cover" />
      </div>
      <div className="px-4 py-3 space-y-2">
        <div className="flex items-center gap-4">
          <button onClick={() => onLike(post.id)} className="text-white font-semibold bg-blue-500/80 hover:bg-blue-500 px-3 py-1 rounded-full">
            ❤️ Like ({post.likes || 0})
          </button>
        </div>
        {post.caption && <p className="text-slate-200"><span className="font-semibold">{post.author_name}</span> {post.caption}</p>}
        <div className="space-y-1">
          {(post.comments || []).map((c, idx) => (
            <p key={idx} className="text-slate-300"><span className="font-semibold">{c.author_name}</span> {c.text}</p>
          ))}
        </div>
        <CommentBox onSubmit={(text) => onComment(post.id, text)} />
      </div>
    </div>
  )
}

function CommentBox({ onSubmit }) {
  const [text, setText] = useState('')
  return (
    <form onSubmit={(e)=>{e.preventDefault(); if(!text.trim()) return; onSubmit(text); setText('')}} className="flex gap-2">
      <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Add a comment..." className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white" />
      <button className="px-3 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600">Post</button>
    </form>
  )
}

function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/posts`)
      const data = await res.json()
      setPosts(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const like = async (id) => {
    const res = await fetch(`${API_BASE}/api/posts/${id}/like`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ increment: true }) })
    const data = await res.json()
    setPosts((prev)=> prev.map(p => p.id === id ? data : p))
  }

  const comment = async (id, text) => {
    const res = await fetch(`${API_BASE}/api/posts/${id}/comments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ author_name: 'You', text }) })
    const data = await res.json()
    setPosts((prev)=> prev.map(p => p.id === id ? data : p))
  }

  return (
    <section className="bg-slate-900 py-10">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {loading && <p className="text-slate-300">Loading...</p>}
        {!loading && posts.length === 0 && (
          <p className="text-slate-400">No posts yet. Be the first to share!</p>
        )}
        {posts.map(p => (
          <PostCard key={p.id} post={p} onLike={like} onComment={comment} />
        ))}
      </div>
    </section>
  )
}

export default Feed
