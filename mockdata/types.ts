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

// More flexible type for JSON data (allows string literals)
export interface YearlyTrackerItem {
  id: string;
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
