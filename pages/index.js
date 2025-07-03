import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[var(--main-bg)] flex flex-col items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Hello, Mamoon</h1>

        {/* Flare Risk Card */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <div className="flex flex-col items-center">
            <img src="/weather.png" alt="Weather" className="w-14 h-14 mb-2" />
            <p className="text-sm font-medium text-gray-600">Flare Risk Today</p>
            <p className="text-4xl font-bold text-gray-800">60%</p>
            <p className="text-sm text-red-500 font-semibold">Moderate</p>
          </div>
        </div>

        {/* Today's Data Icons */}
        <h2 className="text-md font-bold mb-3 text-left">Today’s Data:</h2>
        <div className="flex justify-between mb-6">
          {/* Sleep */}
          <Link
            href="/sleep"
            className="flex flex-col items-center text-sm text-gray-800 hover:scale-105 transition"
          >
            <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow">
              😴
            </div>
            <span className="mt-1 font-semibold">Sleep</span>
          </Link>

          {/* UV Index */}
          <Link
            href="/uv"
            className="flex flex-col items-center text-sm text-gray-800 hover:scale-105 transition"
          >
            <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow">
              🌞
            </div>
            <span className="mt-1 font-semibold">UV Index</span>
          </Link>

          {/* Pollen Index */}
          <Link
            href="/pollen"
            className="flex flex-col items-center text-sm text-gray-800 hover:scale-105 transition"
          >
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow">
              🌸
            </div>
            <span className="mt-1 font-semibold">Pollen</span>
          </Link>
        </div>

        {/* CTA Button */}
        <Link
          href="/log"
          className="block bg-[var(--main-orange)] hover:bg-[var(--main-orange-dark)] text-white text-md font-semibold py-3 px-6 rounded-full shadow transition-all"
        >
          Log Today’s Data
        </Link>
      </div>
    </main>
  );
}