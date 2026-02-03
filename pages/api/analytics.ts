import type { NextApiRequest, NextApiResponse } from "next";

// Types
interface PageView {
  id: string;
  url: string;
  referrer: string;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  language: string;
  timestamp: number;
  ip?: string;
  country?: string;
  city?: string;
}

interface Event {
  id: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  url: string;
  timestamp: number;
}

interface AnalyticsData {
  pageViews: PageView[];
  events: Event[];
}

// In-memory storage (use Redis or database in production)
const analyticsData: AnalyticsData = {
  pageViews: [],
  events: [],
};

const MAX_ENTRIES = 10000;

// Helper to get client info
function getClientInfo(req: NextApiRequest) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? (Array.isArray(forwarded) ? forwarded[0] : forwarded).split(",")[0].trim()
    : req.socket?.remoteAddress || "unknown";

  const userAgent = req.headers["user-agent"] || "unknown";

  return { ip, userAgent };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case "POST": {
      const { type, data } = req.body;

      switch (type) {
        case "pageview": {
          const pageView: PageView = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: data.url,
            referrer: data.referrer || "",
            userAgent: data.userAgent,
            screenWidth: data.screenWidth,
            screenHeight: data.screenHeight,
            language: data.language,
            timestamp: Date.now(),
          };

          analyticsData.pageViews.push(pageView);

          // Keep only recent entries
          if (analyticsData.pageViews.length > MAX_ENTRIES) {
            analyticsData.pageViews =
              analyticsData.pageViews.slice(-MAX_ENTRIES);
          }

          return res.status(200).json({ success: true });
        }

        case "event": {
          const event: Event = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            category: data.category,
            action: data.action,
            label: data.label,
            value: data.value,
            url: data.url,
            timestamp: Date.now(),
          };

          analyticsData.events.push(event);

          // Keep only recent entries
          if (analyticsData.events.length > MAX_ENTRIES) {
            analyticsData.events = analyticsData.events.slice(-MAX_ENTRIES);
          }

          return res.status(200).json({ success: true });
        }

        default:
          return res.status(400).json({ message: "Invalid event type" });
      }
    }

    case "GET": {
      const { startDate, endDate, type } = req.query;

      const start = startDate
        ? parseInt(startDate as string)
        : Date.now() - 7 * 24 * 60 * 60 * 1000;
      const end = endDate ? parseInt(endDate as string) : Date.now();

      const filteredPageViews = analyticsData.pageViews.filter(
        (pv) => pv.timestamp >= start && pv.timestamp <= end,
      );

      const filteredEvents = analyticsData.events.filter(
        (e) => e.timestamp >= start && e.timestamp <= end,
      );

      // Calculate stats
      const stats = {
        totalPageViews: filteredPageViews.length,
        uniqueVisitors: new Set(filteredPageViews.map((pv) => pv.ip)).size,
        totalEvents: filteredEvents.length,
        topPages: getTopItems(filteredPageViews, "url", 10),
        topReferrers: getTopItems(filteredPageViews, "referrer", 10),
        eventsByCategory: groupBy(filteredEvents, "category"),
        dailyViews: getDailyViews(filteredPageViews, start, end),
      };

      return res.status(200).json(stats);
    }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
}

// Helper functions
function getTopItems(
  items: any[],
  key: string,
  limit: number,
): { key: string; count: number }[] {
  const counts: Record<string, number> = {};

  items.forEach((item) => {
    const value = item[key] || "(direct)";
    counts[value] = (counts[value] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function groupBy(items: any[], key: string): Record<string, number> {
  const groups: Record<string, number> = {};

  items.forEach((item) => {
    const value = item[key] || "unknown";
    groups[value] = (groups[value] || 0) + 1;
  });

  return groups;
}

function getDailyViews(
  pageViews: PageView[],
  start: number,
  end: number,
): { date: string; views: number }[] {
  const daily: Record<string, number> = {};

  pageViews.forEach((pv) => {
    const date = new Date(pv.timestamp).toISOString().split("T")[0];
    daily[date] = (daily[date] || 0) + 1;
  });

  // Fill in missing dates
  const result: { date: string; views: number }[] = [];
  const current = new Date(start);

  while (current.getTime() <= end) {
    const dateStr = current.toISOString().split("T")[0];
    result.push({ date: dateStr, views: daily[dateStr] || 0 });
    current.setDate(current.getDate() + 1);
  }

  return result;
}
