'use client'

import { useState } from 'react'
import { signIn } from '../../app/admin/login/actions'

export default function LoginForm() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData) {
    setLoading(true)
    setError(null)
    const result = await signIn(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
    // on success, the server action redirects — no client nav needed
  }

  return (
    <form action={handleSubmit} className="w-full max-w-sm p-8 space-y-4">
      <h1 className="text-xl font-medium text-white">Admin Login</h1>

      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        className="w-full px-3 py-2 bg-neutral-900 text-white rounded"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        className="w-full px-3 py-2 bg-neutral-900 text-white rounded"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-white text-black rounded disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}