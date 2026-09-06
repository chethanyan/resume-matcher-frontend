interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function UploadZone({ onFileSelect, isLoading }: UploadZoneProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition">
      <input
        type="file"
        accept=".pdf"
        onChange={handleChange}
        disabled={isLoading}
        className="hidden"
        id="resume-upload"
      />
      <label htmlFor="resume-upload" className="cursor-pointer">
        <div className="text-4xl mb-3">📄</div>
        <h3 className="text-lg font-semibold text-gray-700">
          {isLoading ? 'Parsing resume...' : 'Upload Resume (PDF)'}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Click to select a PDF file
        </p>
      </label>
    </div>
  );
}