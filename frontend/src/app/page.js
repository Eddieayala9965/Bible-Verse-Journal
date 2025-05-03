"use client";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-6">
            Welcome to Bible Verse Journal
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Search, save, and reflect on your favorite Bible verses
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href="/search"
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                Search Verses
              </h2>
              <p className="text-slate-600">
                Find and explore Bible verses with our powerful search tool
              </p>
            </a>
            <a
              href="/journal"
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                My Journal
              </h2>
              <p className="text-slate-600">
                View and manage your saved verses and reflections
              </p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
