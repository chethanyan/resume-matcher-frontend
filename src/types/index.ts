// src/types/index.ts

export interface CandidateProfile {
  fullName: string;
  email: string | null;
  phone: string | null;
  summary: string;
  yearsOfExperience: number | null;
  skills: string[];
  titles: string[];
  education: string[];
}

export interface JobPosting {
  title: string;
  description: string;
  requiredSkills: string[];
  minYearsExperience: number | null;    
}

export interface MatchResult {
    matchScore:number;
    matchedSkills:string[];
    missingSkills:string[];
    explanation:string;
    recommendation:string;
}

export interface JobRecommendation {
  jobTitle: string;
  matchScore: number;
  matchedSkills: string[];
  reason: string;
}

export interface RecommendationList {
  recommendations: JobRecommendation[];
}