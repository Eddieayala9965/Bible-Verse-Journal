"use client";
import { useState } from "react";
import EditJournalModal from "./EditJournalModal";
import DeleteJournalButton from "./DeleteJournalButton";

const JournalEntry = ({
  id,
  reference,
  text,
  translation,
  notes,
  onUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = (success) => {
    setIsModalOpen(false);
    if (success && onUpdate) {
      onUpdate();
    }
  };

  const handleSave = async (entry) => {
    try {
      await createJournal(entry);
      setMessage("Journal entry saved!");
      setShowForm(false);
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Create journal error:", error, error?.response);
      setMessage("Failed to save journal entry.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-amber-900">{reference}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-amber-600 hover:text-amber-800 transition-colors"
            title="Edit entry"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <DeleteJournalButton entryId={id} onDelete={onUpdate} />
        </div>
      </div>
      <p className="text-amber-800 italic border-l-2 border-amber-200 pl-3 py-1">
        &quot;{text}&quot;
      </p>
      <p className="text-amber-600 italic text-sm">– {translation}</p>
      {notes && (
        <div className="mt-2 bg-amber-50 border-l-4 border-amber-500 pl-3 py-2 rounded text-sm text-amber-800">
          {notes}
        </div>
      )}

      <EditJournalModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        entry={{ id, reference, text, translation, notes }}
      />
    </div>
  );
};

export default JournalEntry;
