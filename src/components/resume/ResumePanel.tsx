import { useCandidate } from '../../context/CandidateContext';
import { UploadZone } from './UploadZone';
import { ProfileCard } from './ProfileCard';

export function ResumePanel() {
  const { profile, isLoading, setProfile, setIsLoading } = useCandidate();

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);

    try {
      // We will add the real API call here later
      console.log('File selected:', file.name);

      // Temporary: just for testing the UI
      // Later we will call the backend /api/resumes/parse
    } catch (error) {
      console.error('Failed to parse resume', error);
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