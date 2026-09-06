import type { ReactNode } from 'react';

interface SplitLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

export function SplitLayout({ left, right }: SplitLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel */}
      <div className="w-full md:w-2/5 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          {left}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-3/5 overflow-y-auto">
        <div className="p-6">
          {right}
        </div>
      </div>
    </div>
  );
}