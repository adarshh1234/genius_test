export type UserRole = 'student' | 'parent' | 'counselor' | 'institution' | 'superadmin';

export type AgeTier = 'early' | 'academic' | 'career' | 'longevity';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  age?: number;
  ageTier?: AgeTier;
  institutionId?: string;
  institutionName?: string;
}

export type AssessmentModuleId =
  | 'raven'
  | 'aptitude'
  | 'bigfive'
  | 'disc'
  | 'riasec'
  | 'eq'
  | 'stress'
  | 'dmit';

export type AssessmentStatus = 'not_started' | 'in_progress' | 'completed' | 'unavailable';

export interface AssessmentModuleMeta {
  id: AssessmentModuleId;
  title: string;
  shortDesc: string;
  description: string;
  category: 'cognitive' | 'personality' | 'behavioral' | 'interests' | 'emotional' | 'biometric';
  questionCount: number;
  estimatedMinutes: number;
  status: AssessmentStatus;
  progressPercent: number;
  iconName: string;
  isOptional?: boolean;
}

export type QuestionType =
  | 'single_choice'
  | 'multiple_choice'
  | 'likert_scale'
  | 'numerical'
  | 'image_reasoning'
  | 'matrix_reasoning'
  | 'scenario'
  | 'ranking'
  | 'disc_forced_choice';

export interface QuestionOption {
  id: string;
  label: string;
  subtext?: string;
  visualSvg?: string;
  scoreValue?: number | string;
}

export interface AssessmentQuestion {
  id: string;
  moduleId: AssessmentModuleId;
  questionNumber: number;
  type: QuestionType;
  prompt: string;
  scenarioText?: string;
  contextNote?: string;
  imageUrl?: string;
  matrixData?: {
    gridRows: number;
    gridCols: number;
    cells: { id: string; content: string; isMissing?: boolean }[];
  };
  options: QuestionOption[];
  likertScaleLabels?: { [key: number]: string };
  discPairs?: {
    trait: 'D' | 'I' | 'S' | 'C';
    text: string;
  }[];
}

export interface AssessmentAttemptState {
  moduleId: AssessmentModuleId;
  currentQuestionIndex: number;
  answers: Record<string, unknown>;
  flaggedQuestionIds: string[];
  elapsedSeconds: number;
  isCompleted: boolean;
}

export interface StudentProfileData {
  fullName: string;
  dob: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  language: string;
  schoolCollege: string;
  gradeYear: string;
  currentCourse: string;
  subjects: string[];
  academicPerformance: string;
  previousQualifications: string;
  interests: string[];
  activities: string[];
  careerGoals: string;
  guardianName?: string;
  guardianEmail?: string;
  guardianPhone?: string;
  guardianRelationship?: string;
  generalConsent: boolean;
  parentConsentForMinor: boolean;
  optionalDmitConsent: boolean;
  selectedTrack: 'standard' | 'premium_dmit';
}

export interface CareerMatch {
  id: string;
  title: string;
  category: string;
  matchPercentage: number;
  description: string;
  matchingStrengths: string[];
  potentialGaps: string[];
  requiredSkills: string[];
  educationPathway: string;
  growthOutlook: string;
  averageSalaryIndia: string;
  averageSalaryGlobal: string;
  relatedCareers: string[];
}

export interface CourseRecommendation {
  id: string;
  title: string;
  provider: string;
  skillCategory: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  priceINR: string;
  priceUSD: string;
  prerequisites: string;
  careerRelevance: string;
  url?: string;
  rating: number;
}

export interface DevelopmentMilestone {
  id: string;
  month: string;
  skillGoal: string;
  suggestedAction: string;
  learningMilestone: string;
  recommendedCourse: string;
  status: 'planned' | 'in_progress' | 'completed';
}

export interface ComprehensiveAssessmentResults {
  studentId: string;
  studentName: string;
  dateGenerated: string;
  scoringProfileUsed: 'profile_a' | 'profile_b';
  completenessPercentage: number;
  overallPercentile: number;
  innateVsAcquired: {
    innateCognitive: number;
    acquiredSkill: number;
    behavioralAlignment: number;
    emotionalResilience: number;
  };
  fluidIntelligence: {
    score: number;
    maxScore: number;
    percentile: number;
    classification: string;
    subdomains: { spatial: number; logic: number; pattern: number };
  };
  aptitude: {
    overallScore: number;
    numerical: number;
    verbal: number;
    abstract: number;
    spatial: number;
    mechanical: number;
  };
  bigFive: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  disc: {
    dominance: number;
    influence: number;
    steadiness: number;
    conscientiousness: number;
    primaryStyle: string;
    secondaryStyle: string;
  };
  riasec: {
    realistic: number;
    investigative: number;
    artistic: number;
    social: number;
    enterprising: number;
    conventional: number;
    topThreeCode: string;
  };
  eq: {
    overallScore: number;
    selfAwareness: number;
    selfRegulation: number;
    empathy: number;
    interpersonal: number;
    emotionalDecisionMaking: number;
  };
  stressResilience: {
    overallScore: number;
    pressureHandling: number;
    decisionUnderStress: number;
    emotionalRegulation: number;
    resilienceBehavior: number;
    burnoutRisk: 'Low' | 'Moderate' | 'Elevated';
  };
  dmit?: {
    isAvailable: boolean;
    ridgeCountIndex: number;
    leftBrainAffinity: number;
    rightBrainAffinity: number;
    atdAngle: number;
    learningStyle: 'Visual' | 'Auditory' | 'Kinesthetic';
    fingerprintPatterns: {
      finger: string;
      pattern: 'Whorl' | 'Ulnar Loop' | 'Radial Loop' | 'Arch';
      ridgeDensity: number;
    }[];
  };
  strengths: string[];
  developmentAreas: string[];
  careerMatches: CareerMatch[];
  courses: CourseRecommendation[];
  developmentPlan: DevelopmentMilestone[];
  counselorNotes?: string;
  methodologyNotes: string;
}

export interface ScoringWeightsProfile {
  id: 'profile_a' | 'profile_b' | 'custom';
  name: string;
  version: string;
  status: 'active' | 'draft';
  weights: {
    [key: string]: number;
  };
  description: string;
}
