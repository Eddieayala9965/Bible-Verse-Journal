"use client";
import { useState, useEffect, useMemo } from "react";
import JournalEntry from "../components/JournalEntry";
import Header from "../components/Header";
import { getAllJournals, searchJournals } from "../lib/api";

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState("grid");
  const [filterTag, setFilterTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchEntries = async () => {
    try {
      const response = await getAllJournals();
      setEntries(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching journal entries:", err);
      setError("Failed to load journal entries. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const response = await searchJournals(query);
        setEntries(response.data);
      } catch (err) {
        console.error("Error searching journal entries:", err);
        setError("Failed to search journal entries. Please try again later.");
      }
    } else {
      fetchEntries();
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEntryUpdate = () => {
    fetchEntries();
  };

  const allTags = useMemo(() => {
    const tags = new Set();
    entries.forEach((entry) => {
      if (entry.tags) {
        entry.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [entries]);

 
  const filteredEntries = useMemo(() => {
    let result = entries;
    if (filterTag) {
      result = result.filter(
        (entry) => entry.tags && entry.tags.includes(filterTag)
      );
    }
    return result;
  }, [entries, filterTag]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <main className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-amber-900 mb-3">
              My Spiritual Journal
            </h1>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Reflect on Scripture and record your spiritual journey. Your
              personal collection of verses and thoughts.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center bg-white rounded-lg shadow-sm p-1 border border-amber-100">
              <button
                onClick={() => setActiveView("grid")}
                className={`px-4 py-2 rounded-md flex items-center ${
                  activeView === "grid"
                    ? "bg-amber-100 text-amber-800"
                    : "text-amber-600 hover:bg-amber-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid
              </button>
              <button
                onClick={() => setActiveView("list")}
                className={`px-4 py-2 rounded-md flex items-center ${
                  activeView === "list"
                    ? "bg-amber-100 text-amber-800"
                    : "text-amber-600 hover:bg-amber-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                List
              </button>
            </div>


            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search journal entries..."
                  className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 placeholder-amber-400"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400"
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
            </div>

      
            <div className="flex items-center">
              <label htmlFor="tag-filter" className="mr-2 text-amber-800">
                Filter by tag:
              </label>
              <select
                id="tag-filter"
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="bg-white border border-amber-200 text-amber-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All entries</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

       
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-amber-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-amber-300 mb-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                No journal entries yet
              </h3>
              <p className="text-amber-700 mb-6">
                Start by adding your first reflection on a Bible verse
              </p>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {activeView === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEntries.map((entry) => (
                    <JournalEntry
                      key={entry.id}
                      id={entry.id}
                      reference={entry.reference}
                      text={entry.text || entry.verse}
                      translation={entry.translation}
                      notes={entry.notes || entry.reflection}
                      onUpdate={handleEntryUpdate}
                    />
                  ))}
                </div>
              )}

          
              {activeView === "list" && (
                <div className="space-y-4">
                  {filteredEntries.map((entry) => (
                    <JournalEntry
                      key={entry.id}
                      id={entry.id}
                      reference={entry.reference}
                      text={entry.text || entry.verse}
                      translation={entry.translation}
                      notes={entry.notes || entry.reflection}
                      onUpdate={handleEntryUpdate}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
