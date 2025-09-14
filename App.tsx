import React, { useState, useMemo } from 'react';
import type { Shift } from './types.ts';
import { SHIFTS, NAMES, SHOGI_NOTES, WARABI_NOTES } from './constants.ts';

// --- ShiftCard Component ---
interface ShiftCardProps {
  shift: Shift;
}

const EventIcon: React.FC<{ event: string }> = ({ event }) => {
  const isShogi = event === '将棋サロン';
  return (
    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${isShogi ? 'bg-green-100' : 'bg-yellow-100'}`}>
      {isShogi ? (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L4 6v12l8 4 8-4V6L12 2z" />
            <path d="M8 9l4 4 4-4" />
         </svg>
      ) : (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12.38c0-3.53 2.87-6.4 6.4-6.4h7.2c3.53 0 6.4 2.87 6.4 6.4v0c0 3.53-2.87 6.4-6.4 6.4h-7.2C4.87 18.78 2 15.91 2 12.38v0z"/>
            <path d="M12 18.78V5.98"/>
            <path d="M19.2 12.38H4.8"/>
         </svg>
      )}
    </div>
  );
};

const ShiftCard: React.FC<ShiftCardProps> = ({ shift }) => {
  const isShogi = shift.event === '将棋サロン';
  
  return (
    <div className="bg-slate-50 rounded-lg p-4 flex items-center space-x-4 border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-shadow duration-200">
      <EventIcon event={shift.event} />
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <p className={`font-bold text-lg ${isShogi ? 'text-green-800' : 'text-yellow-900'}`}>{shift.event}</p>
          {shift.role && (
            <span className="text-xs font-semibold bg-slate-200 text-slate-700 px-2 py-1 rounded-full">
              {shift.role}
            </span>
          )}
        </div>
        <div className="text-slate-600 mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{shift.day}</span>
          </div>
          <div className="flex items-center mt-1 sm:mt-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-mono tracking-wider">{shift.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Notes Component ---
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


// --- Main App Component ---
function App() {
  const [selectedPerson, setSelectedPerson] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSelectPerson = (name: string) => {
    setSelectedPerson(name);
    setSearchTerm(name);
  };

  const clearSelection = () => {
    setSelectedPerson('');
    setSearchTerm('');
  };

  const filteredNames = useMemo(() => {
    if (!searchTerm) {
      return NAMES;
    }
    return NAMES.filter(name =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const { filteredShifts, totalHours } = useMemo(() => {
    if (!selectedPerson) {
      return { filteredShifts: [], totalHours: 0 };
    }
    const shifts = SHIFTS
      .filter(shift => shift.person === selectedPerson)
      .sort((a, b) => {
        if (a.day !== b.day) {
          return a.day.localeCompare(b.day);
        }
        return a.time.localeCompare(b.time);
      });
    return { filteredShifts: shifts, totalHours: shifts.length };
  }, [selectedPerson]);

  return (
    <div className="bg-slate-100 min-h-screen font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <main className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">2025年度 シフト確認</h1>
          <p className="text-slate-500 mt-2">将棋サロン・わらび餅シフト</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {!selectedPerson ? (
            <div>
              <label htmlFor="person-search" className="block text-sm font-medium text-slate-700 mb-2">
                名前を検索してください
              </label>
              <input
                type="text"
                id="person-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="名前を入力..."
                className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
              />
              <div className="mt-4 max-h-60 overflow-y-auto">
                {filteredNames.map(name => (
                  <button
                    key={name}
                    onClick={() => handleSelectPerson(name)}
                    className="w-full text-left p-2 rounded-md hover:bg-slate-100 focus:outline-none focus:bg-indigo-100"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="transition-all duration-300 ease-in-out">
              <div className="flex justify-between items-center bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800 p-4 rounded-md mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold">{selectedPerson} さんのシフト</h2>
                  <p className="mt-1 text-lg">
                    総シフト時間: <span className="font-bold">{totalHours}</span> 時間
                  </p>
                </div>
                <button
                  onClick={clearSelection}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  変更
                </button>
              </div>

              {filteredShifts.length > 0 ? (
                <div className="space-y-4">
                  {filteredShifts.map((shift, index) => (
                    <ShiftCard key={index} shift={shift} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <p>シフトは見つかりませんでした。</p>
                </div>
              )}
            </div>
          )}
        </div>

        <Notes shogiNotes={SHOGI_NOTES} warabiNotes={WARABI_NOTES} />
      </main>
    </div>
  );
}

export default App;
