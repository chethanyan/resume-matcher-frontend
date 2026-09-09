interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function UploadZone({
  onFileSelect,
  isLoading,
}: UploadZoneProps) {

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    console.log('📁 File input changed');

    const file = e.target.files?.[0];

    console.log('Selected file:', file);

    if (!file) {
      console.log('❌ No file selected');
      return;
    }

    if (file.type !== 'application/pdf') {
      console.log('❌ Not a PDF:', file.type);
      alert('Please select a PDF file.');
      return;
    }

    console.log('✅ Sending file to ResumePanel:', file.name);

    onFileSelect(file);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition">

      <input
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleChange}
        disabled={isLoading}
        className="hidden"
        id="resume-upload"
      />

      <label
        htmlFor="resume-upload"
        className={`cursor-pointer block ${
          isLoading ? 'cursor-not-allowed' : ''
        }`}
      >

        <div className="text-4xl mb-3">
          📄
        </div>

        <h3 className="text-lg font-semibold text-gray-700">
          {isLoading
            ? 'Parsing resume...'
            : 'Upload Resume (PDF)'}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {isLoading
            ? 'Please wait while we process your resume'
            : 'Click to select a PDF file'}
        </p>

      </label>

    </div>
  );
}