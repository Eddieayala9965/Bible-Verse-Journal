"use client";
import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const SearchVerse = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const popularVerses = [
    "Genesis 1:1",
    "Genesis 50:20",
    "Exodus 14:14",
    "Leviticus 19:18",
    "Numbers 6:24-26",
    "Deuteronomy 31:6",
    "Joshua 1:9",
    "1 Samuel 16:7",
    "2 Samuel 22:31",
    "1 Chronicles 16:11",
    "Psalm 1:1",
    "Psalm 23:1",
    "Psalm 46:10",
    "Psalm 119:105",
    "Proverbs 3:5-6",
    "Isaiah 40:31",
    "Jeremiah 29:11",
    "Matthew 6:33",
    "Matthew 11:28",
    "Matthew 28:19-20",
    "John 3:16",
    "John 14:6",
    "Romans 8:28",
    "Romans 12:2",
    "1 Corinthians 13:4-7",
    "Galatians 5:22-23",
    "Ephesians 2:8-9",
    "Philippians 4:13",
    "Hebrews 11:1",
    "James 1:5",
    "1 Peter 5:7",
    "1 John 4:18",
    "Revelation 21:4",
  ];

  const getRandomSuggestions = () => {
    return [...popularVerses].sort(() => 0.5 - Math.random()).slice(0, 4);
  };

  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    setSuggestions(getRandomSuggestions());
  }, []);

  useEffect(() => {
    if (debouncedInput.length > 2) {
      setIsSearching(true);
      setTimeout(() => {
        const filtered = popularVerses.filter((v) =>
          v.toLowerCase().includes(debouncedInput.toLowerCase())
        );
        if (filtered.length > 0) {
          setSuggestions(filtered.slice(0, 4));
        }
        setIsSearching(false);
      }, 200);
    } else if (debouncedInput.length === 0) {
      setSuggestions(getRandomSuggestions());
      setIsSearching(false);
    }
  }, [debouncedInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSearch(input.trim());
      setInput("");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    onSearch(suggestion);
  };

  const refreshSuggestions = () => {
    setSuggestions(getRandomSuggestions());
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <h1 className="text-2xl font-bold text-center mb-4 text-slate-800">
        Bible Verse Finder
      </h1>

      <div className="relative">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
              </svg>
            </div>

            <input
              id="verse-search-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a verse (e.g. Romans 8:28)"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 text-black placeholder:text-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {input ? (
                <button type="button" onClick={() => setInput("")}>
                  <svg
                    className="w-5 h-5 text-gray-400 hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition shadow-sm hover:shadow"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500">Suggestions:</p>
          <button
            onClick={refreshSuggestions}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <svg
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
            </svg>
            Refresh
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((verse, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(verse)}
              className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition"
            >
              {verse}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchVerse;
