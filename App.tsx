import React, { useState, useMemo } from 'react';
import type { Shift } from './types.ts';
import { SHIFTS, NAMES, SHOGI_NOTES, WARABI_NOTES } from './constants.ts';
import ShiftCard from './ShiftCard.tsx';
import Notes from './Notes.tsx';

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
