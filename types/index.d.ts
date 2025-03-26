export interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}

export interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  idToken: string;
}

export interface User {
  name: string;
  email: string;
  id: string;
}


export interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

interface TechIconProps {
  techStack: string[];
}
