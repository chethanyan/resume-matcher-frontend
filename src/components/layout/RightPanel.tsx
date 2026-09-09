import { useState } from 'react';

import { useCandidate } from '../../context/CandidateContext';
import { matchProfile } from '../../api/resume';

import type {
  JobPosting,
  MatchResult,
} from '../../types';

type Mode = 'match' | 'catalog';

export function RightPanel() {
  const { profile } = useCandidate();

  const [mode, setMode] = useState<Mode>('match');

  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [minYears, setMinYears] = useState('');

  const [result, setResult] = useState<MatchResult | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [error, setError] = useState('');

  if (!profile) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-blue-50 flex items-center justify-center">
            <span className="text-xl">📄</span>
          </div>

          <h2 className="text-lg font-semibold text-gray-700">
            No candidate profile yet
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Upload a resume on the left to get started.
          </p>
        </div>
      </div>
    );
  }

  const handleMatch = async () => {
    if (!jobTitle.trim()) {
      setError('Please enter a job title.');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a job description.');
      return;
    }

    setError('');
    setResult(null);
    setIsMatching(true);

    const job: JobPosting = {
      title: jobTitle.trim(),
      description: description.trim(),

      requiredSkills: requiredSkills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),

      minYearsExperience:
        minYears.trim() === ''
          ? null
          : Number(minYears),
    };

    try {
      const matchResult = await matchProfile(
        profile,
        job
      );

      setResult(matchResult);
    } catch (error) {
      console.error('Failed to match profile:', error);

      setError(
        'Unable to analyze the match. Make sure the backend is running.'
      );
    } finally {
      setIsMatching(false);
    }
  };

  const getRecommendationStyle = (
    recommendation: string
  ) => {
    const value = recommendation.toUpperCase();

    if (value.includes('STRONG')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }

    if (value.includes('POSSIBLE')) {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }

    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-7">

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              Match Workspace
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              Find the right job for your profile
            </h2>

            <p className="text-sm text-gray-500 mt-2 max-w-2xl">
              Compare your candidate profile against a specific
              job or search the job catalog for recommended roles.
            </p>

          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs text-gray-500">

            <span className="w-2 h-2 rounded-full bg-emerald-500" />

            Profile loaded

          </div>

        </div>

      </div>


      {/* =====================================================
          MODE TABS
      ====================================================== */}

      <div className="bg-white border border-gray-200 rounded-xl p-1.5 flex mb-7">

        <button
          onClick={() => setMode('match')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition ${
            mode === 'match'
              ? 'bg-gray-900 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          Direct Match
        </button>

        <button
          onClick={() => setMode('catalog')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition ${
            mode === 'catalog'
              ? 'bg-gray-900 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          Catalog & Recommend
        </button>

      </div>


      {/* =====================================================
          DIRECT MATCH
      ====================================================== */}

      {mode === 'match' && (

        <div className="space-y-5">

          {/* Form */}

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Card header */}

            <div className="px-6 py-5 border-b border-gray-100">

              <h3 className="text-lg font-semibold text-gray-900">
                Direct Job Match
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Enter the job requirements to calculate
                compatibility with your profile.
              </p>

            </div>


            {/* Form body */}

            <div className="p-6 space-y-5">

              {/* Job Title */}

              <div>

                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Job Title
                </label>

                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) =>
                    setJobTitle(e.target.value)
                  }
                  placeholder="e.g. Java Backend Developer"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />

              </div>


              {/* Experience + Skills */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Experience */}

                <div>

                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Minimum Experience
                  </label>

                  <div className="relative">

                    <input
                      type="number"
                      min="0"
                      value={minYears}
                      onChange={(e) =>
                        setMinYears(e.target.value)
                      }
                      placeholder="2"
                      className="w-full h-12 px-4 pr-16 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      years
                    </span>

                  </div>

                </div>


                {/* Skills */}

                <div>

                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Required Skills
                  </label>

                  <input
                    type="text"
                    value={requiredSkills}
                    onChange={(e) =>
                      setRequiredSkills(e.target.value)
                    }
                    placeholder="Java, Spring Boot, SQL"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                  <p className="text-xs text-gray-400 mt-1.5">
                    Separate multiple skills with commas.
                  </p>

                </div>

              </div>


              {/* Description */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="text-sm font-semibold text-gray-800">
                    Job Description
                  </label>

                  <span className="text-xs text-gray-400">
                    Required
                  </span>

                </div>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={8}
                  placeholder="Paste the job description here..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 resize-none outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />

              </div>


              {/* Error */}

              {error && (

                <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">

                  <span className="text-red-500">
                    ⚠
                  </span>

                  <p className="text-sm text-red-700">
                    {error}
                  </p>

                </div>

              )}


              {/* Analyze button */}

              <button
                onClick={handleMatch}
                disabled={isMatching}
                className="w-full h-12 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm shadow-blue-200 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition"
              >

                {isMatching ? (

                  <span className="flex items-center justify-center gap-2">

                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                    Analyzing profile...

                  </span>

                ) : (

                  <span className="flex items-center justify-center gap-2">

                    Analyze Match

                    <span>
                      →
                    </span>

                  </span>

                )}

              </button>

            </div>

          </div>


          {/* =================================================
              MATCH RESULT
          ================================================== */}

          {result && (

            <div className="space-y-5">

              {/* Score card */}

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7">

                <div className="flex flex-col items-center">

                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 mb-5">
                    Compatibility Score
                  </p>

                  <div
                    className="w-36 h-36 rounded-full flex items-center justify-center"
                    style={{
                      background: `conic-gradient(#2563eb ${result.matchScore}%, #e5e7eb ${result.matchScore}% 100%)`,
                    }}
                  >

                    <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">

                      <span className="text-4xl font-bold text-gray-900">
                        {Math.round(result.matchScore)}%
                      </span>

                    </div>

                  </div>


                  <span
                    className={`mt-5 px-4 py-2 rounded-full border text-sm font-semibold ${getRecommendationStyle(
                      result.recommendation
                    )}`}
                  >
                    {result.recommendation}
                  </span>

                </div>

              </div>


              {/* Skills */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Matched */}

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                  <div className="flex items-center justify-between mb-4">

                    <h4 className="font-semibold text-gray-900">
                      Matched Skills
                    </h4>

                    <span className="text-xs font-medium text-emerald-600">
                      {result.matchedSkills.length} found
                    </span>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    {result.matchedSkills.length > 0 ? (

                      result.matchedSkills.map((skill) => (

                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100"
                        >
                          ✓ {skill}
                        </span>

                      ))

                    ) : (

                      <span className="text-sm text-gray-400">
                        No matching skills found.
                      </span>

                    )}

                  </div>

                </div>


                {/* Missing */}

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                  <div className="flex items-center justify-between mb-4">

                    <h4 className="font-semibold text-gray-900">
                      Missing Skills
                    </h4>

                    <span className="text-xs font-medium text-red-500">
                      {result.missingSkills.length} missing
                    </span>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    {result.missingSkills.length > 0 ? (

                      result.missingSkills.map((skill) => (

                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-100"
                        >
                          {skill}
                        </span>

                      ))

                    ) : (

                      <span className="text-sm text-emerald-600">
                        No major skill gaps 🎉
                      </span>

                    )}

                  </div>

                </div>

              </div>


              {/* Explanation */}

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                <div className="flex items-center gap-2 mb-3">

                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    💡
                  </div>

                  <h4 className="font-semibold text-gray-900">
                    Match Explanation
                  </h4>

                </div>

                <p className="text-sm text-gray-600 leading-7">
                  {result.explanation}
                </p>

              </div>

            </div>

          )}

        </div>

      )}


      {/* =====================================================
          CATALOG
      ====================================================== */}

      {mode === 'catalog' && (

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

          <div className="max-w-md mx-auto text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center mb-4">

              <span className="text-2xl">
                💼
              </span>

            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              Job Catalog
            </h3>

            <p className="text-sm text-gray-500 mt-2 leading-6">
              Browse available jobs, add new opportunities,
              and get AI-powered recommendations based on
              this candidate's profile.
            </p>

            <button
              onClick={() => setMode('catalog')}
              className="mt-6 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Open Job Catalog
            </button>

          </div>

        </div>

      )}

    </div>
  );
}