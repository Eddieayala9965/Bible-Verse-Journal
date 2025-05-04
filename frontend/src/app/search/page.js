"use client";
import { useState } from "react";
import VerseCard from "../components/VerseCard";
import SearchVerse from "../components/SearchVerse";
import Header from "../components/Header";

const TRANSLATIONS = [
  { name: "King James Version", code: "kjv" },
  { name: "American Standard Version", code: "asv" },
  { name: "World English Bible", code: "web" },
  { name: "Bible in Basic English", code: "bbe" },
  { name: "Darby Translation", code: "darby" },
  { name: "Young's Literal Translation", code: "ylt" },
  { name: "World English Bible British Edition", code: "webbe" },
];

const SearchPage = () => {
  const [reference, setReference] = useState("john 3:16");
  const [selectedTranslation, setSelectedTranslation] = useState("kjv");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <main className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-900 mb-2">
              Search Scripture
            </h1>
            <p className="text-amber-700">
              Find and explore verses from God&apos;s Word
            </p>
          </div>

          <div className="mb-6">
            <div className="relative w-full max-w-md mx-auto">
              <label
                htmlFor="translation"
                className="block text-sm font-medium text-amber-800 mb-2"
              >
                Select Translation
              </label>
              <div className="relative">
                <select
                  id="translation"
                  value={selectedTranslation}
                  onChange={(e) => setSelectedTranslation(e.target.value)}
                  className="block w-full pl-4 pr-10 py-3 text-amber-900 bg-white border border-amber-200 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {TRANSLATIONS.map((t) => (
                    <option key={t.code} value={t.code}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-amber-700">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <SearchVerse onSearch={setReference} />
          </div>

          <VerseCard reference={reference} translation={selectedTranslation} />
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
