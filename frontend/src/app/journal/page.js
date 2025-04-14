"use client";
import JournalEntry from "../components/JournalEntry";

const mockEntries = [
  {
    reference: "John 3:16",
    text: "For God so loved the world...",
    translation: "KJV",
    notes: "This verse reminds me that love is unconditional.",
  },
  {
    reference: "Psalm 23:1",
    text: "The Lord is my shepherd; I shall not want.",
    translation: "NIV",
    notes: "Gives me peace when I’m stressed.",
  },
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
        My Journal
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {mockEntries.map((entry, idx) => (
          <JournalEntry key={idx} {...entry} />
        ))}
      </div>
    </div>
  );
}
