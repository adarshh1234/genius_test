# Genius Test by GeniusPie.com — Frontend Application

A complete, age-adaptive intelligence, multi-aptitude, personality, and career-discovery frontend platform serving users aged 3–90.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Recharts**.

---

## 🚀 Key Features

1. **Age-Adaptive User Experiences**:
   - **Ages 3–7 (Early Discovery)**: Playful visual shape tests, friendly mascot guidance, parent observational input, and celebratory completion.
   - **Ages 8–18 (Academic Focus)**: Raven matrix non-verbal reasoning, multi-aptitude diagnostics, and stream/course recommendations.
   - **Ages 19–55 (Career Growth)**: DISC behavioral styles, leadership assessments, and skill-gap bridging.
   - **Ages 56–90 (Lifelong Vitality)**: High-contrast toggle, larger typography, and cognitive vitality tracking.

2. **Full Assessment Battery**:
   - Raven Progressive Matrices (Fluid Intelligence)
   - Multi-Aptitude Battery (Numerical, Verbal, Abstract, Spatial, Mechanical)
   - Big Five Personality (OCEAN)
   - DISC Behavioral Quadrant
   - Holland RIASEC Vocational Interests
   - Emotional Intelligence (EQ)
   - Stress Stamina & Resilience
   - Optional AI-DMIT Biometric Ridge Pattern Capture UI (100% voluntary, separate consent, local-only processing)

3. **Multi-Role Portals & Interactive Demo Switcher**:
   - Student Dashboard & Unified Results Analytics
   - Parent Portal with multi-child switching & consent management
   - Counselor Portal with assigned student roster and qualitative report notes
   - Institution Administrator Suite with batch enrollment and CSV export
   - Super Admin Panel with 21 modules and Profile A / Profile B scoring weight configurators (with live 100% validation)

4. **19-Section Comprehensive Psychological & Career Report**:
   - Official HTML report viewer pre-styled with clean `@media print` PDF export rules.

---

## 🗺️ Route Directory

### Public Website
- `/` — Landing Page with Hero, Assessment Categories, Age Pathways, Pathway Comparison, Proposed Pricing, and FAQs
- `/about` — About Genius Test & GeniusPie
- `/how-it-works` — Scientific Methodology & 4-Phase Framework
- `/assessments-overview` — Complete 8-Module Catalog
- `/career-discovery` — Career Discovery Engine (300+ careers)
- `/parents` — For Parents & Guardians (consent & nurturing)
- `/schools` — For Schools & Institutions (cohort licensing)
- `/pricing` — Dedicated Pricing Matrix with INR (₹) / USD ($) Switcher
- `/faq` — Frequently Asked Questions
- `/privacy` — Privacy Policy & Minor Safety Protection
- `/terms` — Terms of Service & Educational Disclaimers
- `/contact` — Interactive Inquiry Desk

### Authentication & Intake
- `/auth/login` — Sign In with role quick-fill buttons
- `/auth/register` — Registration with age tier calculation & password strength meter
- `/auth/forgot-password` — Password Recovery Request
- `/auth/reset-password` — Password Reset
- `/auth/verify-email` — 6-Digit Email Verification
- `/auth/access-denied` — Role-Specific Access Denied Notice
- `/auth/session-expired` — Inactive Session Timeout Screen
- `/onboarding` — 6-Step Student Intake Wizard with local draft state

### Assessments
- `/assessments` — Assessment Catalog & Overall Battery Progress
- `/assessments/take/[moduleId]` — Reusable Assessment Shell supporting 9 question types (Raven 3x3 visual matrices, Likert scale, DISC pairs, numerical, scenarios)
- `/assessments/dmit` — Optional AI-DMIT Biometric Ridge Capture Interface with camera preview

### Dashboards & Reporting
- `/dashboard/student` — Student Dashboard Overview
- `/dashboard/student/results` — Unified Psychometric Results & Recharts Analytics
- `/dashboard/student/careers` — Suggested Career Matches (with salary bands & pathways)
- `/dashboard/student/courses` — Course Recommendations & Prerequisites
- `/dashboard/student/development-plan` — 12-Month Interactive Growth Roadmap
- `/dashboard/student/reports` — Student Report Dossiers & Download Triggers
- `/dashboard/parent` — Parent Dashboard with sibling switcher & consent toggles
- `/dashboard/counselor` — Counselor Dashboard with student notes editor
- `/dashboard/institution` — School Cohort Administrator & CSV Exporter
- `/dashboard/admin` — Super Admin Panel with 21 modules & Profile A/B scoring configurator
- `/reports/view/[id]` — Official 19-Section Printable Psychological Dossier

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Run lint checks
npm run lint
```
