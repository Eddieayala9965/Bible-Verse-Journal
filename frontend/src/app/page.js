"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "./components/Header";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-amber-900 mb-6 leading-tight">
              Grow in Faith Through{" "}
              <span className="text-amber-700">God&apos;s Word</span>
            </h1>
            <p className="text-xl text-amber-800 mb-10 max-w-2xl mx-auto">
              Search, save, and reflect on Scripture to deepen your relationship
              with Christ
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/search"
                className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition shadow-md flex items-center"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                Find Verses
              </Link>
              <Link
                href="/journal"
                className="px-6 py-3 bg-white text-amber-700 border border-amber-300 rounded-lg hover:bg-amber-50 transition shadow-sm flex items-center"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                My Journal
              </Link>
            </div>
          </div>

          <div className="mb-16">
            <div className="relative bg-white rounded-xl shadow-md p-8 border border-amber-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -mr-16 -mt-16 opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-100 rounded-full -ml-12 -mb-12 opacity-30"></div>

              <h2 className="text-2xl font-bold text-amber-800 mb-6 relative z-10">
                Verse of the Day
              </h2>

              <div className="relative mb-6 z-10">
                <span className="absolute text-6xl text-amber-200 -left-1 -top-6 font-serif">
                  &quot;
                </span>
                <p className="text-amber-900 text-xl leading-relaxed pl-6 pr-6">
                  Trust in the LORD with all your heart, and do not lean on your
                  own understanding. In all your ways acknowledge him, and he
                  will make straight your paths.
                </p>
                <span className="absolute text-6xl text-amber-200 right-0 bottom-0 font-serif transform translate-y-2">
                  &quot;
                </span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-amber-700">Proverbs 3:5-6</p>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                  ESV
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border border-amber-100">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-amber-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Search Scripture
              </h3>
              <p className="text-amber-700">
                Find verses by reference, keyword, or topic to discover
                God&apos;s truth
              </p>
              <Link
                href="/search"
                className="mt-4 inline-block text-amber-800 hover:text-amber-600 font-medium"
              >
                Start searching &rarr;
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border border-amber-100">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-amber-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Save Favorites
              </h3>
              <p className="text-amber-700">
                Build your personal collection of meaningful verses for
                reflection
              </p>
              <Link
                href="/favorites"
                className="mt-4 inline-block text-amber-800 hover:text-amber-600 font-medium"
              >
                View favorites &rarr;
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border border-amber-100">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-amber-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Share Insights
              </h3>
              <p className="text-amber-700">
                Connect with others and share your spiritual journey
              </p>
              <Link
                href="/community"
                className="mt-4 inline-block text-amber-800 hover:text-amber-600 font-medium"
              >
                Join community &rarr;
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              Begin Your Journey Today
            </h2>
            <p className="text-amber-800 mb-6">
              Start exploring Scripture and deepening your faith
            </p>
            <Link
              href="/search"
              className="px-8 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition shadow-md inline-block"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-amber-900 text-amber-100 py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <span className="ml-2 font-semibold">Bible Verse Journal</span>
            </div>
            <p className="text-sm mt-2">
              © 2025 Bible Verse Journal. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
