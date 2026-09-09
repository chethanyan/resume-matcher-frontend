import { useCandidate } from '../../context/CandidateContext';
import { UploadZone } from './UploadZone';
import { parseResume } from '../../api/resume';
import { ProfileCard } from './ProfileCard';

export function ResumePanel() {

  const {
    profile,
    isLoading,
    setProfile,
    setIsLoading,
  } = useCandidate();

  const handleFileSelect = async (file: File) => {

    console.log('🚀 handleFileSelect called');
    console.log('📄 File:', file.name);
    console.log('📦 File size:', file.size);
    console.log('📋 File type:', file.type);

    setIsLoading(true);

    try {

      console.log('🌐 Calling parseResume()...');

      const profile = await parseResume(file);

      console.log('✅ Backend response:', profile);

      setProfile(profile);

    } catch (error) {

      console.error('❌ Failed to parse resume:', error);

      alert(
        'Failed to parse resume. Check the browser console.'
      );

    } finally {

      console.log('🏁 Finished parsing');

      setIsLoading(false);
    }
  };

  return (
    <div>

      <h1 className="text-xl font-bold text-gray-800 mb-6">
        Candidate
      </h1>

      {!profile ? (
        <UploadZone
          onFileSelect={handleFileSelect}
          isLoading={isLoading}
        />
      ) : (
        <ProfileCard profile={profile} />
      )}

    </div>
  );
}