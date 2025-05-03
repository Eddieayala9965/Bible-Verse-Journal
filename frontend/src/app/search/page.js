"use client";
import { useState } from "react";
import VerseCard from "../components/VerseCard";
import SearchVerse from "../components/SearchVerse";
import Header from "../components/Header";

const SearchPage = () => {
  const [reference, setReference] = useState("john 3:16");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="py-8 px-4">
        <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
          <SearchVerse onSearch={setReference} />
          <VerseCard reference={reference} />
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
