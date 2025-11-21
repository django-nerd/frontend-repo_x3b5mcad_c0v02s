import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function CreatePost({ onCreated }) {
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [author, setAuthor] = useState('Alex')
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/150?img=3')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_name: author,
          author_avatar_url: avatar,
          image_url: imageUrl,
          caption,
        }),
      })
      if (!res.ok) throw new Error('Failed to create post')
      const data = await res.json()
      onCreated?.(data)
      setImageUrl('')
      setCaption('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="create" className="bg-slate-900 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <form onSubmit={submit} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">Create a new post</h2>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 text-sm">Image URL</label>
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required placeholder="https://..." className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white" />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Caption</label>
              <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Say something about this" className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white" />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Your name</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white" />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Avatar URL</label>
              <input value={avatar} onChange={(e) => setAvatar(e.target.value)} className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white" />
            </div>
          </div>
          <button disabled={loading} className="inline-flex items-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 disabled:opacity-60">
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost
