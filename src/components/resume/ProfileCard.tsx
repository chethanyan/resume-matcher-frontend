import { CandidateProfile } from '../../types';

interface ProfileCardProps {
  profile: CandidateProfile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{profile.fullName}</h2>
        <div className="text-sm text-gray-500 mt-1 space-y-1">
          {profile.email && <p>{profile.email}</p>}
          {profile.phone && <p>{profile.phone}</p>}
        </div>
      </div>

      {/* Summary */}
      {profile.summary && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
        </div>
      )}

      {/* Years of Experience */}
      {profile.yearsOfExperience !== null && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Experience
          </h3>
          <p className="text-gray-700">{profile.yearsOfExperience} years</p>
        </div>
      )}

      {/* Skills */}
      {profile.skills.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Titles */}
      {profile.titles.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Previous Titles
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {profile.titles.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Education
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {profile.education.map((edu) => (
              <li key={edu}>{edu}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}