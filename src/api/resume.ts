import type { CandidateProfile } from '../types';

const API_BASE = 'http://localhost:8080';   // change if your backend runs on a different port

export async function parseResume(file: File): Promise<CandidateProfile> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/api/resumes/parse`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to parse resume');
  }

  return response.json();
}