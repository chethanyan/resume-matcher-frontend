import type {
  CandidateProfile,
  JobPosting,
  MatchResult,
  RecommendationList,
} from '../types';

const API_BASE = 'http://localhost:8080';

export async function parseResume(
  file: File
): Promise<CandidateProfile> {

  console.log('📡 parseResume() started');
  console.log('📄 File:', file.name);
  console.log('📦 Size:', file.size);
  console.log('📋 Type:', file.type);

  const formData = new FormData();

  formData.append('file', file);

  console.log('📤 Sending POST /api/resumes/parse');

  const response = await fetch(
    `${API_BASE}/api/resumes/parse`,
    {
      method: 'POST',
      body: formData,
    }
  );

  console.log('📥 Response status:', response.status);

  if (!response.ok) {

    const errorText = await response.text();

    console.error(
      '❌ Backend error:',
      errorText
    );

    throw new Error(
      `Failed to parse resume: ${response.status}`
    );
  }

  const data = await response.json();

  console.log('✅ Parsed profile:', data);

  return data;
}


export async function matchProfile(
  candidate: CandidateProfile,
  job: JobPosting
): Promise<MatchResult> {

  const response = await fetch(
    `${API_BASE}/api/resumes/match-profile`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        candidate,
        job,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to match resume');
  }

  return response.json();
}


export async function recommendProfile(
  candidate: CandidateProfile,
  topK = 5
): Promise<RecommendationList> {

  const response = await fetch(
    `${API_BASE}/api/resumes/recommend-profile?topK=${topK}`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(candidate),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to recommend jobs');
  }

  return response.json();
}


export async function getJobs() {
  const response = await fetch(
    `${API_BASE}/api/jobs`
  );

  if (!response.ok) {
    throw new Error('Failed to load jobs');
  }

  return response.json();
}


export async function addJob(
  job: JobPosting
) {

  const response = await fetch(
    `${API_BASE}/api/jobs`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(job),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to add job');
  }

  return response.json();
}


export async function deleteJob(
  jobId: string
) {

  const response = await fetch(
    `${API_BASE}/api/jobs/${jobId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok && response.status !== 204) {
    throw new Error('Failed to delete job');
  }
}