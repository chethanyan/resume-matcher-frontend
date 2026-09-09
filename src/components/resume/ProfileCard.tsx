import { useState } from 'react';

import { useCandidate } from '../../context/CandidateContext';

import type { CandidateProfile } from '../../types';

interface ProfileCardProps {
  profile: CandidateProfile;
}

export function ProfileCard({
  profile,
}: ProfileCardProps) {

  const { setProfile } = useCandidate();

  const [isEditing, setIsEditing] = useState(false);

  const [draft, setDraft] =
    useState<CandidateProfile>(profile);


  // ---------------------------------------------------------
  // Start editing
  // ---------------------------------------------------------

  const handleEdit = () => {
    setDraft(profile);
    setIsEditing(true);
  };


  // ---------------------------------------------------------
  // Cancel editing
  // ---------------------------------------------------------

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
  };


  // ---------------------------------------------------------
  // Save changes
  // ---------------------------------------------------------

  const handleSave = () => {
    setProfile(draft);
    setIsEditing(false);
  };


  // ---------------------------------------------------------
  // Update simple fields
  // ---------------------------------------------------------

  const updateField = <
    K extends keyof CandidateProfile
  >(
    field: K,
    value: CandidateProfile[K]
  ) => {

    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  };


  // ---------------------------------------------------------
  // Convert comma/newline separated text into array
  // ---------------------------------------------------------

  const parseList = (value: string) => {
    return value
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  };


  const initials = draft.fullName
    ? draft.fullName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'C';


  // =========================================================
  // EDIT MODE
  // =========================================================

  if (isEditing) {

    return (

      <div className="space-y-6">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              Edit Profile
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-1">
              Candidate Information
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Update the information extracted from your resume.
            </p>

          </div>

        </div>


        {/* Basic information */}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Basic Information
          </h3>


          <div className="space-y-4">

            {/* Name */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>

              <input
                type="text"
                value={draft.fullName}
                onChange={(e) =>
                  updateField(
                    'fullName',
                    e.target.value
                  )
                }
                className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>


            {/* Email */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>

              <input
                type="email"
                value={draft.email ?? ''}
                onChange={(e) =>
                  updateField(
                    'email',
                    e.target.value
                  )
                }
                className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>


            {/* Phone */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone
              </label>

              <input
                type="text"
                value={draft.phone ?? ''}
                onChange={(e) =>
                  updateField(
                    'phone',
                    e.target.value
                  )
                }
                className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>


            {/* Years */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Years of Experience
              </label>

              <input
                type="number"
                min="0"
                step="0.1"
                value={draft.yearsOfExperience ?? ''}
                onChange={(e) =>
                  updateField(
                    'yearsOfExperience',
                    Number(e.target.value)
                  )
                }
                className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>

          </div>

        </div>


        {/* Professional title */}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Professional Title
          </h3>

          <p className="text-xs text-gray-400 mb-4">
            Enter one title per line.
          </p>

          <textarea
            value={draft.titles.join('\n')}
            onChange={(e) =>
              updateField(
                'titles',
                parseList(e.target.value)
              )
            }
            rows={3}
            placeholder="Junior Data Scientist"
            className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm resize-none outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />

        </div>


        {/* Summary */}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Professional Summary
          </h3>

          <textarea
            value={draft.summary}
            onChange={(e) =>
              updateField(
                'summary',
                e.target.value
              )
            }
            rows={7}
            className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm leading-6 resize-none outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />

        </div>


        {/* Skills */}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Skills
          </h3>

          <p className="text-xs text-gray-400 mb-4">
            Separate skills with commas or put one skill per line.
          </p>

          <textarea
            value={draft.skills.join(', ')}
            onChange={(e) =>
              updateField(
                'skills',
                parseList(e.target.value)
              )
            }
            rows={6}
            placeholder="Java, Spring Boot, SQL, Python"
            className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm leading-6 resize-none outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />

        </div>


        {/* Education */}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Education
          </h3>

          <p className="text-xs text-gray-400 mb-4">
            Enter one education entry per line.
          </p>

          <textarea
            value={draft.education.join('\n')}
            onChange={(e) =>
              updateField(
                'education',
                parseList(e.target.value)
              )
            }
            rows={6}
            className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm leading-6 resize-none outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />

        </div>


        {/* Save / Cancel */}

        <div className="sticky bottom-0 bg-[#f5f7fb] pt-3 pb-2">

          <div className="flex gap-3">

            <button
              onClick={handleCancel}
              className="flex-1 h-11 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex-1 h-11 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>
    );
  }


  // =========================================================
  // VIEW MODE
  // =========================================================

  return (

    <div className="space-y-7">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            Candidate Profile
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Parsed from your resume
          </p>

        </div>


        <button
          onClick={handleEdit}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
        >
          <span>✎</span>
          Edit
        </button>

      </div>


      {/* Profile header */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">

            <span className="text-lg font-bold text-blue-600">
              {initials}
            </span>

          </div>


          <div className="min-w-0">

            <h2 className="text-xl font-bold text-gray-900 truncate">
              {draft.fullName}
            </h2>

            {draft.titles?.length > 0 && (

              <p className="text-sm text-gray-500 mt-1">
                {draft.titles[0]}
              </p>

            )}

          </div>

        </div>


        {/* Contact */}

        <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">

          <div className="flex items-center gap-3">

            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              ✉
            </div>

            <span className="text-sm text-gray-600 truncate">
              {draft.email}
            </span>

          </div>


          {draft.phone && (

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                ☎
              </div>

              <span className="text-sm text-gray-600">
                {draft.phone}
              </span>

            </div>

          )}

        </div>

      </div>


      {/* Stats */}

      <div className="grid grid-cols-2 gap-3">

        <div className="rounded-xl border border-gray-200 bg-white p-4">

          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Experience
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-1">
            {draft.yearsOfExperience}
          </p>

          <p className="text-xs text-gray-400">
            years
          </p>

        </div>


        <div className="rounded-xl border border-gray-200 bg-white p-4">

          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Skills
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-1">
            {draft.skills?.length ?? 0}
          </p>

          <p className="text-xs text-gray-400">
            detected
          </p>

        </div>

      </div>


      {/* Summary */}

      {draft.summary && (

        <section>

          <SectionTitle title="Professional Summary" />

          <div className="rounded-xl border border-gray-200 bg-white p-5">

            <p className="text-sm text-gray-600 leading-6">
              {draft.summary}
            </p>

          </div>

        </section>

      )}


      {/* Skills */}

      {draft.skills?.length > 0 && (

        <section>

          <div className="flex items-center justify-between mb-3">

            <SectionTitle title="Skills" />

            <span className="text-xs text-gray-400">
              {draft.skills.length} skills
            </span>

          </div>


          <div className="flex flex-wrap gap-2">

            {draft.skills.map((skill) => (

              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium"
              >
                {skill}
              </span>

            ))}

          </div>

        </section>

      )}


      {/* Education */}

      {draft.education?.length > 0 && (

        <section>

          <div className="mb-4">

            <h3 className="text-sm font-semibold text-gray-900">
              Education
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              Academic background extracted from your resume
            </p>

          </div>


          <div className="relative pl-7">

            {/* Timeline line */}

            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gray-200" />


            <div className="space-y-5">

              {draft.education.map((education, index) => (

                <div
                  key={`${education}-${index}`}
                  className="relative"
                >

                  {/* Timeline dot */}

                  <div className="absolute -left-7 top-5 w-4 h-4 rounded-full bg-white border-2 border-blue-500 z-10" />


                  {/* Education card */}

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:shadow-md transition">

                    <div className="flex items-start gap-4">

                      {/* Icon */}

                      <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">

                        <span className="text-lg">
                          🎓
                        </span>

                      </div>


                      {/* Content */}

                      <div className="min-w-0 flex-1">

                        <p className="text-sm font-semibold text-gray-900 leading-6">
                          {education}
                        </p>

                        <div className="flex items-center gap-2 mt-2">

                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />

                          <span className="text-xs text-gray-400">
                            Academic qualification
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

      )}

    </div>
  );
}


function SectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <h3 className="text-sm font-semibold text-gray-900 mb-3">
      {title}
    </h3>
  );
}