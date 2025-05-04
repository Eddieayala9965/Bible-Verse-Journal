"use client";
import { useState, useEffect } from "react";

const popularVerses = [
  "John 3:16",
  "Psalm 23:1",
  "Romans 8:28",
  "Philippians 4:13",
  "Jeremiah 29:11",
  "Proverbs 3:5-6",
  "Isaiah 40:31",
];

function getRandomSuggestions() {
  return [...popularVerses].sort(() => 0.5 - Math.random()).slice(0, 4);
}

export default function SearchVerse({ onSearch }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(getRandomSuggestions());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSearch(input.trim());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    document.getElementById("verse-search-input").focus();
  };

  const refreshSuggestions = () => {
    setSuggestions(getRandomSuggestions());
  };

  return (
    <div className="w-full mx-auto">
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-amber-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="verse-search-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a book or verse (e.g. Romans 8:28)"
              className="w-full pl-10 pr-10 py-3 text-amber-900 bg-amber-50 border border-amber-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-amber-400"
            />
            {input && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setInput("")}
              >
                <svg
                  className="w-5 h-5 text-amber-400 hover:text-amber-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-amber-700 text-white px-5 py-3 rounded-lg hover:bg-amber-800 transition shadow-sm hover:shadow flex items-center gap-2"
          >
            <span>Search</span>
          </button>
        </form>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-amber-700">Suggestions:</p>
          <button
            onClick={refreshSuggestions}
            className="text-amber-600 hover:text-amber-800 text-sm flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Refresh
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((verse, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(verse)}
              className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm hover:bg-amber-200 transition flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1 text-amber-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              {verse}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
