import { useState } from 'react';
import { useCandidate } from '../../context/CandidateContext';

type Mode = 'match' | 'catalog';

export function RightPanel() {
  const { profile } = useCandidate();
  const [mode, setMode] = useState<Mode>('match');

  // When no resume is uploaded yet
  if (!profile) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <p>Upload a resume on the left to get started</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('match')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === 'match'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Direct Match
        </button>

        <button
          onClick={() => setMode('catalog')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === 'catalog'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Catalog & Recommend
        </button>
      </div>

      {/* Content based on mode */}
      <div className="flex-1">
        {mode === 'match' ? (
          <div className="text-gray-500">
            Direct Match form will go here
          </div>
        ) : (
          <div className="text-gray-500">
            Catalog & Recommendations will go here
          </div>
        )}
      </div>
    </div>
  );
}