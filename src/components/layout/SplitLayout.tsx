import { ResumePanel } from './../resume/ResumePanel';
import { RightPanel } from './RightPanel';

export function SplitLayout() {
  return (
    <div className="h-screen overflow-hidden bg-[#f5f7fb]">

      {/* Top bar */}

      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">
              RM
            </span>
          </div>

          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Resume Matcher
            </h1>

            <p className="text-xs text-gray-400">
              AI-powered job matching
            </p>
          </div>

        </div>


        <div className="flex items-center gap-2 text-xs text-gray-500">

          <span className="w-2 h-2 rounded-full bg-emerald-500" />

          System ready

        </div>

      </header>


      {/* Workspace */}

      <main className="h-[calc(100vh-4rem)] flex">

        {/* Candidate panel */}

        <aside className="w-[38%] min-w-[340px] max-w-[520px] bg-white border-r border-gray-200 overflow-hidden">

          <div className="h-full overflow-y-auto px-6 lg:px-8 py-7">

            <ResumePanel />

          </div>

        </aside>


        {/* Workspace */}

        <section className="flex-1 min-w-0 overflow-hidden">

          <div className="h-full overflow-y-auto px-6 lg:px-10 py-7">

            <RightPanel />

          </div>

        </section>

      </main>

    </div>
  );
}