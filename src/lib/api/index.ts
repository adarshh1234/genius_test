import {
  AssessmentModuleMeta,
  AssessmentQuestion,
  CareerMatch,
  CourseRecommendation,
  ComprehensiveAssessmentResults,
  ScoringWeightsProfile,
  StudentProfileData,
  User,
  UserRole,
} from '@/types';
import {
  mockAssessmentModules,
  mockComprehensiveResults,
  mockQuestions,
  mockScoringProfiles,
  mockUsers,
} from '@/lib/mock/data';

// ==========================================
// TYPED SERVICE INTERFACES
// ==========================================

export interface IAuthService {
  getCurrentUser(): Promise<User>;
  switchDemoRole(role: UserRole, ageTier?: string): Promise<User>;
  login(email: string, password?: string): Promise<{ user: User; token: string }>;
  register(data: Record<string, unknown>): Promise<{ user: User; token: string }>;
  logout(): Promise<void>;
  requestPasswordReset(email: string): Promise<boolean>;
  resetPassword(password: string, token: string): Promise<boolean>;
  verifyEmailCode(code: string): Promise<boolean>;
}

export interface IAssessmentService {
  getModules(): Promise<AssessmentModuleMeta[]>;
  getModuleById(id: string): Promise<AssessmentModuleMeta | null>;
  getQuestionsForModule(moduleId: string): Promise<AssessmentQuestion[]>;
  submitAnswer(moduleId: string, questionId: string, answer: unknown): Promise<boolean>;
  completeModule(moduleId: string, answers: Record<string, unknown>): Promise<{ success: boolean; scorePercent: number }>;
  resetModule(moduleId: string): Promise<boolean>;
}

export interface IResultsService {
  getComprehensiveResults(studentId?: string): Promise<ComprehensiveAssessmentResults>;
  getCareerMatches(filters?: { query?: string; category?: string }): Promise<CareerMatch[]>;
  getCourseRecommendations(filters?: { query?: string; category?: string }): Promise<CourseRecommendation[]>;
  getDevelopmentPlan(): Promise<ComprehensiveAssessmentResults['developmentPlan']>;
  getScoringProfiles(): Promise<ScoringWeightsProfile[]>;
  updateScoringProfile(profile: ScoringWeightsProfile): Promise<boolean>;
}

export interface IStudentOnboardingService {
  saveDraft(data: Partial<StudentProfileData>): Promise<void>;
  getDraft(): Promise<Partial<StudentProfileData> | null>;
  submitOnboarding(data: StudentProfileData): Promise<{ success: boolean; studentId: string }>;
}

export interface IAdminService {
  getAllUsers(): Promise<User[]>;
  getScoringWeights(): Promise<ScoringWeightsProfile[]>;
  updateScoringWeights(profileId: string, weights: Record<string, number>): Promise<boolean>;
  getSystemMetrics(): Promise<{
    totalStudents: number;
    completedAssessments: number;
    completionRate: number;
    reportDownloads: number;
    activeInstitutions: number;
  }>;
}

// ==========================================
// MOCK IMPLEMENTATIONS (DEMO ADAPTER)
// ==========================================

class MockAuthService implements IAuthService {
  private activeUser: User = mockUsers[0]; // Default Aarav Sharma (student)

  async getCurrentUser(): Promise<User> {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('genius_demo_user');
      if (stored) {
        try {
          this.activeUser = JSON.parse(stored);
        } catch {
          // ignore parsing error
        }
      }
    }
    return { ...this.activeUser };
  }

  async switchDemoRole(role: UserRole, ageTier?: string): Promise<User> {
    const matched = mockUsers.find((u) => {
      if (ageTier && u.ageTier) {
        return u.role === role && u.ageTier === ageTier;
      }
      return u.role === role;
    }) || {
      id: `usr-${role}-custom`,
      name: `Demo ${role.toUpperCase()} User`,
      email: `${role}@geniuspie.com`,
      role,
    };

    this.activeUser = matched;
    if (typeof window !== 'undefined') {
      localStorage.setItem('genius_demo_user', JSON.stringify(matched));
    }
    return matched;
  }

  async login(email: string): Promise<{ user: User; token: string }> {
    const found = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || {
      id: 'usr-new-login',
      name: email.split('@')[0],
      email,
      role: 'student' as UserRole,
    };
    this.activeUser = found;
    if (typeof window !== 'undefined') {
      localStorage.setItem('genius_demo_user', JSON.stringify(found));
    }
    return { user: found, token: 'demo-jwt-token-xyz-123' };
  }

  async register(data: Record<string, unknown>): Promise<{ user: User; token: string }> {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: (data.fullName as string) || 'Demo Registered User',
      email: (data.email as string) || 'user@example.com',
      role: (data.role as UserRole) || 'student',
      age: (data.age as number) || 16,
    };
    this.activeUser = newUser;
    if (typeof window !== 'undefined') {
      localStorage.setItem('genius_demo_user', JSON.stringify(newUser));
    }
    return { user: newUser, token: 'demo-registered-token' };
  }

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('genius_demo_user');
    }
    this.activeUser = mockUsers[0];
  }

  async requestPasswordReset(): Promise<boolean> {
    return true;
  }

  async resetPassword(): Promise<boolean> {
    return true;
  }

  async verifyEmailCode(): Promise<boolean> {
    return true;
  }
}

class MockAssessmentService implements IAssessmentService {
  async getModules(): Promise<AssessmentModuleMeta[]> {
    return [...mockAssessmentModules];
  }

  async getModuleById(id: string): Promise<AssessmentModuleMeta | null> {
    return mockAssessmentModules.find((m) => m.id === id) || null;
  }

  async getQuestionsForModule(moduleId: string): Promise<AssessmentQuestion[]> {
    return mockQuestions[moduleId] || mockQuestions.aptitude;
  }

  async submitAnswer(): Promise<boolean> {
    return true;
  }

  async completeModule(): Promise<{ success: boolean; scorePercent: number }> {
    return { success: true, scorePercent: 92 };
  }

  async resetModule(): Promise<boolean> {
    return true;
  }
}

class MockResultsService implements IResultsService {
  async getComprehensiveResults(): Promise<ComprehensiveAssessmentResults> {
    return { ...mockComprehensiveResults };
  }

  async getCareerMatches(filters?: { query?: string; category?: string }): Promise<CareerMatch[]> {
    let list = [...mockComprehensiveResults.careerMatches];
    if (filters?.query) {
      const q = filters.query.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.requiredSkills.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (filters?.category && filters.category !== 'All') {
      list = list.filter((c) => c.category.includes(filters.category!));
    }
    return list;
  }

  async getCourseRecommendations(filters?: { query?: string; category?: string }): Promise<CourseRecommendation[]> {
    let list = [...mockComprehensiveResults.courses];
    if (filters?.query) {
      const q = filters.query.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.skillCategory.toLowerCase().includes(q) ||
          c.provider.toLowerCase().includes(q)
      );
    }
    return list;
  }

  async getDevelopmentPlan(): Promise<ComprehensiveAssessmentResults['developmentPlan']> {
    return [...mockComprehensiveResults.developmentPlan];
  }

  async getScoringProfiles(): Promise<ScoringWeightsProfile[]> {
    return [...mockScoringProfiles];
  }

  async updateScoringProfile(profile: ScoringWeightsProfile): Promise<boolean> {
    const idx = mockScoringProfiles.findIndex((p) => p.id === profile.id);
    if (idx !== -1) {
      mockScoringProfiles[idx] = profile;
    }
    return true;
  }
}

class MockStudentOnboardingService implements IStudentOnboardingService {
  async saveDraft(data: Partial<StudentProfileData>): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem('genius_onboarding_draft', JSON.stringify(data));
    }
  }

  async getDraft(): Promise<Partial<StudentProfileData> | null> {
    if (typeof window !== 'undefined') {
      const draft = localStorage.getItem('genius_onboarding_draft');
      if (draft) {
        try {
          return JSON.parse(draft);
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  async submitOnboarding(data: StudentProfileData): Promise<{ success: boolean; studentId: string }> {
    if (typeof window !== 'undefined') {
      localStorage.setItem('genius_student_profile', JSON.stringify(data));
    }
    return { success: true, studentId: 'student-' + Date.now() };
  }
}

class MockAdminService implements IAdminService {
  async getAllUsers(): Promise<User[]> {
    return [...mockUsers];
  }

  async getScoringWeights(): Promise<ScoringWeightsProfile[]> {
    return [...mockScoringProfiles];
  }

  async updateScoringWeights(profileId: string, weights: Record<string, number>): Promise<boolean> {
    const prof = mockScoringProfiles.find((p) => p.id === profileId);
    if (prof) {
      prof.weights = weights;
    }
    return true;
  }

  async getSystemMetrics() {
    return {
      totalStudents: 14820,
      completedAssessments: 11940,
      completionRate: 80.6,
      reportDownloads: 8430,
      activeInstitutions: 42,
    };
  }
}

// Export singleton instances conforming to strict interfaces
export const authService: IAuthService = new MockAuthService();
export const assessmentService: IAssessmentService = new MockAssessmentService();
export const resultsService: IResultsService = new MockResultsService();
export const onboardingService: IStudentOnboardingService = new MockStudentOnboardingService();
export const adminService: IAdminService = new MockAdminService();
