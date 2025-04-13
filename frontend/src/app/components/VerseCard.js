"use client";
import { use, useEffect, useState } from "react";

const VerseCard = ({ reference }) => {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const response = await fetch(
          `https://bible-api.com/${encodeURIComponent(reference)}`
        );
        const data = await response.json();
        console.log(data);
        setVerse(data);
      } catch (error) {
        console.error("Failed to fetch verse", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVerse();
  }, [reference]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-slate-100 max-w-xl mx-auto relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500 opacity-10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-blue-500 opacity-10 rounded-full" />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3 inline-block"></span>
            {verse.reference}
          </h2>
          <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {verse.translation_name}
          </span>
        </div>

        <div className="relative mb-8">
          <p className="text-slate-700 text-lg leading-relaxed pl-4 border-l-2 border-blue-200">
            {verse.text.trim()}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-500 font-light">
            – {verse.translation_name}
          </p>
          <button
            className="group bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow"
            onClick={() => alert("Coming soon: Save to journal")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:animate-pulse"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <span>Save to Journal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerseCard;
