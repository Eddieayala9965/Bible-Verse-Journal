"use client";
import { useState } from "react";
import { updateJournal } from "../lib/api";

const EditJournalModal = ({ isOpen, onClose, entry }) => {
  const [formData, setFormData] = useState({
    reference: entry?.reference || "",
    text: entry?.text || "",
    translation: entry?.translation || "",
    notes: entry?.notes || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await updateJournal(entry.id, formData);
      onClose(true);
    } catch (err) {
      console.error("Error updating journal entry:", err);
      setError("Failed to update journal entry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl pointer-events-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-amber-900">
            Edit Journal Entry
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-amber-600 hover:text-amber-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-amber-900"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-amber-900"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-4 py-2 text-sm font-medium text-amber-900 bg-amber-100 rounded-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-amber-700 rounded-md hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
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
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJournalModal;
