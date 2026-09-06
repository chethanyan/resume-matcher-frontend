import { useCandidate } from '../../context/CandidateContext';
import { UploadZone } from './UploadZone';
import { parseResume } from '../../api/resume';
import { ProfileCard } from './ProfileCard';

export function ResumePanel() {
  const { profile, isLoading, setProfile, setIsLoading } = useCandidate();

 const handleFileSelect = async (file: File) => {
  setIsLoading(true);

  try {
    const profile = await parseResume(file);
    setProfile(profile);
  } catch (error) {
    console.error('Failed to parse resume', error);
    alert('Failed to parse resume. Make sure the backend is running.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Candidate</h1>

      {!profile ? (
        <UploadZone onFileSelect={handleFileSelect} isLoading={isLoading} />
      ) : (
        <ProfileCard profile={profile} />
      )}
    </div>
  );
}