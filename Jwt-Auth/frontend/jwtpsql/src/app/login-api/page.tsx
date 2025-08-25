'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginApiPage() {
     const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [formMessage, setFormMessage] = useState('Must update fields to Login!')
  const [errors, setErrors] = useState<{ username?: string[]; password?: string[] }>({})
  const [success, setSuccess] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (success) {
      // After successful login you can redirect
      // e.g. check cookies or role via another API call
      router.refresh()
    }
  }, [success, router])

  useEffect(() => {
    if (isPending) {
      setFormMessage('...Pending Login')
    } else if (!isUpdated) {
      setFormMessage('Must update fields to Login!')
    } else {
      setFormMessage('')
    }
  }, [isPending, isUpdated])

  useEffect(() => {
    if (username === '' || password === '') {
      setIsUpdated(false)
    } else {
      setIsUpdated(true)
    }
  }, [username, password])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setIsPending(true)
    setErrors({})
    setFormMessage('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors(data.errors ?? {})
        setFormMessage(data.message ?? 'Login failed')
        setSuccess(false)
      } else {
        setSuccess(true)
        setFormMessage(data.message ?? 'Login successful!')
      }
    } catch (err) {
      setFormMessage('Something went wrong.')
      setSuccess(false)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-10 min-h-[120vh] bg-white rounded-tl-2xl rounded-br-2xl shadow-md">
      <div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold underline">
          LoginAPI
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12 w-3/5">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
          required
        />

        {errors.username?.map((err) => (
          <p key={err} className="text-sm text-accent">{err}</p>
        ))}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          required
        />

        {errors.password?.map((err) => (
          <p key={err} className="text-sm text-accent">{err}</p>
        ))}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={!isUpdated || isPending}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p
          className={`relative text-xs text-center text-accent duration-500 ${
            (isPending || !isUpdated) ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {formMessage}
        </p>
      </form>
    </div>
    )
}
