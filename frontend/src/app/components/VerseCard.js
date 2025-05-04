"use client";
import { useEffect, useState } from "react";
import JournalForm from "./JournalForm";
import { createJournal } from "../lib/api";

const VerseCard = ({ reference, translation }) => {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const response = await fetch(
          `https://bible-api.com/${encodeURIComponent(
            reference
          )}?translation=${translation}`
        );
        const data = await response.json();
        setVerse(data);
      } catch (error) {
        console.error("Failed to fetch verse", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVerse();
  }, [reference, translation]);

  const handleSave = async (entry) => {
    try {
      await createJournal(entry);
      setMessage("Journal entry saved!");
      setShowForm(false);
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setMessage("Failed to save journal entry.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10 py-8">
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    );
  }

  if (!verse || !verse.text) {
    return (
      <div className="text-center text-red-500 mt-8">
        Verse not found or unavailable.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-10 px-4 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-amber-100 max-w-xl w-full relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-amber-500 opacity-10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-amber-500 opacity-10 rounded-full" />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-800 flex items-center">
            <span className="w-1.5 h-6 bg-amber-500 rounded-full mr-3 inline-block"></span>
            {verse.reference}
          </h2>
          <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
            {verse.translation_name}
          </span>
        </div>

        <div className="relative mb-8">
          <span className="absolute text-6xl text-amber-200 -left-1 -top-6 font-serif">
            &quot;
          </span>
          <p className="text-amber-900 text-lg leading-relaxed pl-6 pr-6">
            {verse.text.trim()}
          </p>
          <span className="absolute text-6xl text-amber-200 right-0 bottom-0 font-serif transform translate-y-2">
            &quot;
          </span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-amber-700 font-light">
            – {verse.translation_name}
          </p>
          <button
            className="group bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow"
            onClick={() => setShowForm((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:animate-pulse"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <span>{showForm ? "Cancel" : "Save to Journal"}</span>
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`mt-4 px-4 py-2 rounded shadow text-white ${
            message.includes("saved") ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

      {showForm && (
        <div className="mt-6 w-full max-w-xl">
          <JournalForm
            verse={{
              reference: verse.reference,
              text: verse.text,
              translation: verse.translation_name,
            }}
            onSubmit={handleSave}
          />
        </div>
      )}
    </div>
  );
};

export default VerseCard;
