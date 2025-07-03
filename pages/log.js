import { useState } from "react";
import Link from "next/link";

export default function Log() {
  const [skinFile, setSkinFile] = useState(null);
  const [symptoms, setSymptoms] = useState("Normal");
  const [sleep, setSleep] = useState(8);
  const [stress, setStress] = useState("Low");
  const [dairy, setDairy] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data logged (not really) ✅");
    console.log({ skinFile, symptoms, sleep, stress, dairy });
  };

  return (
    <main className="min-h-screen w-full bg-[var(--main-bg)] flex items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Log Today’s Data</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">📷 Upload Skin Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSkinFile(e.target.files[0])}
              className="mt-1 block w-full text-sm"
            />
          </div>

          <div>
            <label className="block font-medium">😣 How does your skin feel?</label>
            <select
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="mt-1 block w-full border p-2 rounded"
            >
              <option>Normal</option>
              <option>Itchy</option>
              <option>Red</option>
              <option>Cracked</option>
              <option>Burning</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">💤 Sleep hours:</label>
            <input
              type="number"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              className="mt-1 block w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">😵‍💫 Stress level:</label>
            <select
              value={stress}
              onChange={(e) => setStress(e.target.value)}
              className="mt-1 block w-full border p-2 rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={dairy}
              onChange={() => setDairy(!dairy)}
            />
            <label>🥛 Had dairy today</label>
          </div>

          <button
            type="submit"
            className="bg-[var(--main-orange)] hover:bg-[var(--main-orange-dark)] text-white px-6 py-2 rounded-full shadow w-full"
          >
            Submit Log
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-700 underline hover:text-blue-900">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
