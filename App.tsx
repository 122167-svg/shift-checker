import React, { useState, useMemo } from 'react';
import type { Shift } from './types.ts';
import { SHIFTS, NAMES, SHOGI_NOTES, WARABI_NOTES } from './constants.ts';
import ShiftCard from './components/ShiftCard.tsx';
import Notes from './components/Notes.tsx';

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

  const { groupedShifts, totalHours } = useMemo(() => {
    if (!selectedPerson) {
      return { groupedShifts: {}, totalHours: 0 };
    }

    // Helper to extract the start hour for robust chronological sorting
    const getStartTime = (timeStr: string): number => {
      try {
        return parseInt(timeStr.split(':')[0], 10);
      } catch {
        return 99; // Fallback for parsing errors, places them at the end
      }
    };

    const personShifts = SHIFTS
      .filter(shift => shift.person === selectedPerson)
      .sort((a, b) => {
        // First, sort by day using Japanese locale
        const dayCompare = a.day.localeCompare(b.day, 'ja');
        if (dayCompare !== 0) {
          return dayCompare;
        }
        
        // Then, sort by start time numerically for chronological order
        const timeA = getStartTime(a.time);
        const timeB = getStartTime(b.time);
        return timeA - timeB;
      });

    const grouped = personShifts.reduce((acc, shift) => {
      const day = shift.day;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(shift);
      return acc;
    }, {} as Record<string, Shift[]>);

    return { groupedShifts: grouped, totalHours: personShifts.length };
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
              <label htmlFor="person-search" className="block text-lg font-medium text-slate-700 mb-2">
                名前でシフトを検索
              </label>
              <input
                type="text"
                id="person-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="名前を入力、または一覧から選択"
                className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
              />
              <div className="mt-4 max-h-60 overflow-y-auto rounded-md border border-slate-200">
                {filteredNames.map(name => (
                  <button
                    key={name}
                    onClick={() => handleSelectPerson(name)}
                    className="w-full text-left p-3 text-slate-800 border-b border-slate-100 last:border-b-0 hover:bg-slate-100 focus:outline-none focus:bg-indigo-100 transition-colors duration-150"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="transition-all duration-300 ease-in-out">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800 p-4 rounded-md mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold">{selectedPerson}さんのシフト</h2>
                  <p className="mt-1 text-base text-indigo-700">
                    合計シフト数: <span className="font-bold text-lg">{totalHours}</span> コマ
                  </p>
                </div>
                <button
                  onClick={clearSelection}
                  className="mt-3 sm:mt-0 px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  別の担当者を選択
                </button>
              </div>

              {totalHours > 0 ? (
                <div className="space-y-6">
                  {Object.keys(groupedShifts).map(day => (
                    <div key={day} className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center mb-4 border-b border-slate-300 pb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {day}
                      </h3>
                      <div className="space-y-3">
                        {groupedShifts[day].map((shift, index) => (
                          <ShiftCard key={`${day}-${index}`} shift={shift} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <p>割り当てられているシフトはありません。</p>
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