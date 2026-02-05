// Mock Data Types for Budget Ndio Story Platform

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  category:
    | "Infrastructure"
    | "Health"
    | "Education"
    | "Youth"
    | "Water"
    | "Agriculture"
    | "All";
  emoji: string;
  readTime: string;
  author: string;
  date: string;
  thumbnail?: string;
  content: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  episodeNumber: number;
  duration: string;
  category: string;
  publishDate: string;
  audioUrl?: string;
  thumbnail?: string;
  isFeatured?: boolean;
  // Additional UI properties
  mediaType?: string;
  excerpt?: string;
  type?: string;
  videoUrl?: string;
  color?: string;
}

export interface ShortVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  likes: string;
  thumbnail?: string;
  videoUrl?: string;
  category: "Skit" | "Explainer" | "Comedy" | "Interview" | string;
  isFeatured?: boolean;
  // Additional UI properties
  color?: string;
  icon?: string;
  type?: string;
}

export interface TrackerProject {
  id: string;
  name: string;
  description: string;
  county: string;
  sector: string;
  budget: string;
  allocated: number; // percentage
  status: "Allocated" | "In Progress" | "Completed" | "Stalled";
  progress: number; // percentage
  completionDate?: string;
  icon: string;
}

// Status types
type TrackerStatus = "Allocated" | "In Progress" | "Completed" | "Stalled";
type TrackerSector = "National" | "County";
type TrackerType = "national" | "county";

// Unified Tracker Sector (for main tracker page)
export interface TrackerSectorItem {
  slug: string;
  name: string;
  type: TrackerType;
  budget: string;
  status: TrackerStatus | string;
  county: string;
  icon: string;
  description: string;
  timeline?: string;
  impact?: string;
  category: string;
  breakdown?: string[];
}

// More flexible type for JSON data (allows string literals)
export interface YearlyTrackerItem {
  slug: string;
  year?: number; // Optional - year is derived from parent YearlyTrackerData
  category: string;
  title: string;
  description: string;
  budget: string;
  allocated: number;
  status: TrackerStatus | string; // Allow string for JSON compatibility
  progress: number;
  icon: string;
  sector: TrackerSector | string; // Allow string for JSON compatibility
  quarter?: string;
  beneficiaries?: string;
  completionDate?: string;
}

export interface YearlyTrackerData {
  year: number;
  totalBudget: string;
  totalProjects: number;
  completed: number;
  inProgress: number;
  allocated: number;
  stalled: number;
  items: YearlyTrackerItem[];
}

// Unified Tracker Data
export interface UnifiedTrackerData {
  sectors: TrackerSectorItem[];
  years: YearlyTrackerData[];
}

export interface ParticipationStat {
  label: string;
  value: string;
  description: string;
}

export interface ParticipationMethod {
  id: string;
  title: string;
  emoji: string;
  description: string;
  actionLabel: string;
}

export interface HomeFeatured {
  storyId: string;
  week: string;
  title: string;
  subtitle: string;
  category: string;
}

export interface BudgetSnapshot {
  sector: string;
  percentage: number;
  color: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface CoreValue {
  emoji: string;
  title: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  duration: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "text" | "quiz";
  completed?: boolean;
}

// ============================================
// FUNDS MANAGEMENT TYPES
// ============================================

// Fund Source Types
export type FundSourceType =
  | "government_grant"
  | "donation"
  | "partnership"
  | "corporate_sponsorship"
  | "international_aid"
  | "membership_fee"
  | "event_revenue"
  | "crowdfunding";

export type FundStatus =
  | "pending"
  | "secured"
  | "in_progress"
  | "completed"
  | "cancelled";
export type Currency = "KES" | "USD" | "EUR" | "GBP";

// Main Fund Source Interface
export interface FundSource {
  id: string;
  name: string;
  type: FundSourceType;
  description: string;
  organization?: string; // For grants, partnerships, sponsorships
  contactPerson?: string;
  contactEmail?: string;
  amount: number;
  currency: Currency;
  status: FundStatus;
  startDate: string;
  endDate?: string;
  disbursementSchedule?: Disbursement[];
  allocatedTo?: string[]; // Project IDs or program names
  requirements?: string[];
  reportingRequirements?: ReportingRequirement[];
  documents?: FundDocument[];
  createdAt: string;
  updatedAt: string;
}

// Disbursement Information
export interface Disbursement {
  id: string;
  fundSourceId: string;
  amount: number;
  currency: Currency;
  date: string;
  status: "pending" | "processed" | "received" | "failed";
  referenceNumber?: string;
  notes?: string;
}

// Reporting Requirements
export interface ReportingRequirement {
  id: string;
  fundSourceId: string;
  type: "quarterly" | "annual" | "milestone" | "ad_hoc";
  dueDate: string;
  status: "pending" | "in_progress" | "submitted" | "approved" | "rejected";
  description: string;
  submittedDate?: string;
  documentUrl?: string;
}

// Fund Documents
export interface FundDocument {
  id: string;
  fundSourceId: string;
  name: string;
  type: "agreement" | "report" | "invoice" | "receipt" | "other";
  url: string;
  uploadedAt: string;
}

// Fund Allocation to Projects/Programs
export interface FundAllocation {
  id: string;
  fundSourceId: string;
  projectId?: string;
  programName: string;
  description: string;
  allocatedAmount: number;
  currency: Currency;
  utilizedAmount: number;
  status: "planned" | "active" | "completed" | "on_hold";
  startDate: string;
  endDate?: string;
  milestones?: AllocationMilestone[];
  createdAt: string;
  updatedAt: string;
}

// Allocation Milestones
export interface AllocationMilestone {
  id: string;
  allocationId: string;
  name: string;
  description?: string;
  targetAmount: number;
  targetDate: string;
  status: "pending" | "in_progress" | "completed" | "missed";
  completedDate?: string;
}

// Fund Transaction (Income/Expense Tracking)
export interface FundTransaction {
  id: string;
  fundSourceId?: string;
  allocationId?: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  currency: Currency;
  date: string;
  vendor?: string;
  receiptNumber?: string;
  approvedBy?: string;
  status: "pending" | "approved" | "rejected" | "processed";
  createdAt: string;
}

// Fund Summary/Analytics
export interface FundSummary {
  totalSecured: number;
  totalPending: number;
  totalUtilized: number;
  totalRemaining: number;
  byType: Record<FundSourceType, number>;
  byStatus: Record<FundStatus, number>;
  currency: Currency;
  periodStart: string;
  periodEnd: string;
}

// Funds Dashboard Data
export interface FundsDashboardData {
  summary: FundSummary;
  recentTransactions: FundTransaction[];
  upcomingReports: ReportingRequirement[];
  activeFunds: FundSource[];
  fundByType: { type: FundSourceType; total: number; count: number }[];
}

// ============================================
// INVOICE MANAGEMENT TYPES
// ============================================

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";
export type InvoiceType = "income" | "expense";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  type: InvoiceType;
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  clientPhone?: string;
  description: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: Currency;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// EXPENSE TRACKING TYPES
// ============================================

export type ExpenseCategory =
  | "domain_hosting"
  | "software_tools"
  | "ai_services"
  | "marketing"
  | "office_supplies"
  | "travel"
  | "professional_services"
  | "utilities"
  | "payroll"
  | "other";

export type ExpenseStatus = "pending" | "approved" | "rejected" | "reimbursed";

export interface Expense {
  id: string;
  title: string;
  description?: string;
  category: ExpenseCategory;
  amount: number;
  currency: Currency;
  date: string;
  vendor: string;
  receiptUrl?: string;
  receiptNumber?: string;
  status: ExpenseStatus;
  approvedBy?: string;
  approvedDate?: string;
  fundSourceId?: string;
  allocationId?: string;
  isRecurring: boolean;
  recurringFrequency?: "monthly" | "quarterly" | "annually";
  createdAt: string;
  updatedAt: string;
}

// ============================================
// TECH BILLS (Yearly Infrastructure Costs)
// ============================================

export type TechBillCategory =
  | "domain"
  | "hosting"
  | "ai_api"
  | "software_license"
  | "ci_cd"
  | "monitoring"
  | "security"
  | "communication"
  | "design_tools"
  | "development"
  | "other";

export interface TechBill {
  id: string;
  name: string;
  category: TechBillCategory;
  provider: string;
  description?: string;
  cost: number;
  currency: Currency;
  billingFrequency: "monthly" | "quarterly" | "annually";
  nextBillingDate: string;
  lastBillingDate?: string;
  autoRenew: boolean;
  status: "active" | "cancelled" | "paused";
  usageNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechBillYearlySummary {
  year: number;
  totalAnnualCost: number;
  totalMonthlyEquivalent: number;
  byCategory: Record<TechBillCategory, number>;
  bills: TechBill[];
}

// ============================================
// BILLING DASHBOARD TYPES
// ============================================

export interface BillingDashboardData {
  overview: {
    totalIncome: number;
    totalExpenses: number;
    netBalance: number;
    pendingInvoices: number;
    overdueAmount: number;
    monthlyBurnRate: number;
  };
  invoices: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
  };
  expenses: {
    total: number;
    byCategory: Record<ExpenseCategory, number>;
    pendingApproval: number;
  };
  techBills: {
    totalMonthly: number;
    totalAnnual: number;
    activeBills: number;
    upcomingRenewals: number;
  };
  currency: Currency;
}
