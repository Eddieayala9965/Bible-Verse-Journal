"use client";
import { useState } from "react";

const JournalForm = ({ verse, onSubmit }) => {
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const entry = {
      reference: verse.reference,
      text: verse.text,
      translation: verse.translation,
      notes: notes.trim(),
    };

    onSubmit(entry);
    setNotes("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-white border border-amber-200 rounded-xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-amber-800 mb-2">Add Notes</h3>

      <div className="mb-4">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your thoughts or reflections..."
          className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-lg transition font-medium"
      >
        Save to Journal
      </button>
    </form>
  );
};

export default JournalForm;
