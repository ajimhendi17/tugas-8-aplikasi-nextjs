'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import bcrypt from 'bcryptjs'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        password: bcrypt.hashSync(form.password, 10),
      }),
    })
    if (res.ok) router.push('/login')
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Daftar Akun</h1>
      <input type="text" placeholder="Nama" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 w-full mb-2" />
      <input type="email" placeholder="Email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2 w-full mb-2" />
      <input type="password" placeholder="Password" value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })} className="border p-2 w-full mb-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
    </form>
  )
}