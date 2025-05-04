"use client";
import { useState } from "react";
import { deleteJournal } from "../lib/api";

const DeleteJournalButton = ({ entryId, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    setError("");
    try {
      await deleteJournal(entryId);
      setShowConfirm(false);
      if (onDelete) onDelete();
    } catch (err) {
      setError("Failed to delete entry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowConfirm(true)}
        className="text-amber-600 hover:text-amber-800 px-2 py-1 rounded disabled:opacity-50"
        disabled={isLoading}
        title="Delete entry"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 inline" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H7V5a2 2 0 012-2zm-7 6h18"
            />
          </svg>
        )}
      </button>
      {showConfirm && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-amber-200 rounded-xl shadow-lg z-50 p-4">
          <p className="text-amber-900 mb-4">
            Are you sure you want to delete this journal entry?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1 rounded bg-amber-100 text-amber-900 hover:bg-amber-200"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 rounded bg-amber-700 text-white hover:bg-amber-800 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
          {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default DeleteJournalButton;
