import React from 'react';

interface NotesProps {
  shogiNotes: string[];
  warabiNotes: string[];
}

const NotesSection: React.FC<{ title: string; notes: string[]; icon: React.ReactNode; color: string; }> = ({ title, notes, icon, color }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
    <h3 className={`text-xl font-bold ${color} flex items-center`}>
      {icon}
      {title}
    </h3>
    <ul className="mt-4 space-y-3 list-disc list-inside text-slate-600">
      {notes.map((note, index) => (
        <li key={index} className="leading-relaxed">{note}</li>
      ))}
    </ul>
  </div>
);

const Notes: React.FC<NotesProps> = ({ shogiNotes, warabiNotes }) => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <NotesSection 
        title="将棋サロンの注意事項" 
        notes={shogiNotes}
        color="text-green-800"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L4 6v12l8 4 8-4V6L12 2z" />
            <path d="M8 9l4 4 4-4" />
          </svg>
        } 
      />
      <NotesSection 
        title="わらび餅の注意事項" 
        notes={warabiNotes}
        color="text-yellow-900"
        icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-yellow-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        }
      />
    </div>
  );
};

export default Notes;