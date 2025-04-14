const JournalEntry = ({ reference, text, translation, notes }) => {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
      <h3 className="text-lg font-bold text-blue-600">{reference}</h3>
      <p className="text-slate-700">{text}</p>
      <p className="text-slate-500 italic text-sm">– {translation}</p>
      {notes && (
        <div className="mt-2 bg-blue-50 border-l-4 border-blue-500 pl-3 py-2 rounded text-sm text-blue-800">
          {notes}
        </div>
      )}
    </div>
  );
};

export default JournalEntry;
