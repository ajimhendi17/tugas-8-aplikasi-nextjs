'use client'
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    })
    if (res?.ok) router.push('/dashboard')
  }

  return (
    <form onSubmit={handleLogin} className="p-8 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <input type="email" placeholder="Email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2 w-full mb-2" />
      <input type="password" placeholder="Password" value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })} className="border p-2 w-full mb-2" />
      <button className="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>
  )
}