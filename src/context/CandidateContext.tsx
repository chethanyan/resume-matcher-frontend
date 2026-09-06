import { createContext, useContext, useState, ReactNode } from 'react';
import { CandidateProfile } from '../types';

// 1. Define what the context will provide
interface CandidateContextType {
  profile: CandidateProfile | null;
  setProfile: (profile: CandidateProfile | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// 2. Create the context
const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

// 3. Create the Provider component
export function CandidateProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CandidateContext.Provider value={{ profile, setProfile, isLoading, setIsLoading }}>
      {children}
    </CandidateContext.Provider>
  );
}

// 4. Custom hook for easy usage
export function useCandidate() {
  const context = useContext(CandidateContext);
  if (context === undefined) {
    throw new Error('useCandidate must be used within a CandidateProvider');
  }
  return context;
}