import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center p-10">
      <div className="max-w-2xl text-center bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Selamat Datang di Aplikasi Keuangan
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Kelola catatan keuangan Anda dengan mudah, aman, dan efisien. Mulailah perjalanan finansial yang lebih baik hari ini!
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 w-40">
              Masuk
            </button>
          </Link>

          <Link href="/register">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 w-40">
              Daftar
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
