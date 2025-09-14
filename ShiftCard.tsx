import React from 'react';
import type { Shift } from '../types.ts';

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

export default ShiftCard;