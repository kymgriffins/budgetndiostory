// Mock Data Index - Export all mock data for easy importing
// Types are relaxed for MVP mockdata compatibility
import aboutData from "./about.json";
import eduData from "./edu.json";
import homeData from "./home.json";
import participateData from "./participate.json";
import podcastsData from "./podcasts.json";
import shortsData from "./shorts.json";
import storiesData from "./stories.json";
import trackerData from "./tracker.json";

export const stories = storiesData.stories as any[];
export const podcasts = podcastsData.podcasts as any[];
export const shorts = shortsData.shorts as any[];
export const projects = trackerData.projects as any[];
export const participationStats = participateData.stats as any[];
export const participationMethods = participateData.methods as any[];
export const faqs = participateData.faqs as any[];
export const featuredStory = homeData.featuredStory as any;
export const budgetSnapshot = homeData.budgetSnapshot as any[];
export const contentTypes = homeData.contentTypes as any[];
export const homeStats = homeData.stats as any;
export const problemStatement = aboutData.problemStatement as any[];
export const mission = aboutData.mission as any;
export const values = aboutData.values as any[];
export const team = aboutData.team as any;
export const contact = aboutData.contact as any;
export const courses = eduData.courses as any[];
