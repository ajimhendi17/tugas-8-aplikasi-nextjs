import { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

type Note = { id: number; title: string; amount: number };

export default function Dashboard({ session }: { session: any }) {
  const { data } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [form, setForm] = useState({ title: '', amount: 0 });

  useEffect(() => {
    fetch('/api/notes').then(res => res.json()).then(setNotes);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const updated = await fetch('/api/notes').then(res => res.json());
    setNotes(updated);
    setForm({ title: '', amount: 0 });
  };

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Dashboard Keuangan</h1>
        <p className="text-gray-700 mb-6">
          Selamat datang, <strong>{data?.user?.name}</strong> ({data?.user?.email})
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            placeholder="Judul Catatan"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          <input
            type="number"
            placeholder="Jumlah (Rp)"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: parseFloat(e.target.value) })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
          >
            Tambah Catatan
          </button>
        </form>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Daftar Catatan</h2>
        {notes.length === 0 ? (
          <p className="text-gray-500">Belum ada catatan.</p>
        ) : (
          <ul className="space-y-3">
            {notes.map(note => (
              <li key={note.id} className="bg-gray-50 border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{note.title}</span>
                  <span className="text-green-600 font-semibold">{formatRupiah(note.amount)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};
