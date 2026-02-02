import type { NextApiRequest, NextApiResponse } from "next";

// Performance metrics interface
interface VitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  timestamp: number;
  url: string;
  userAgent: string;
}

// In-memory storage for demo (use database in production)
const vitalsHistory: VitalsMetric[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const metric: VitalsMetric = req.body;

    // Store the metric
    vitalsHistory.push(metric);

    // Keep only last 1000 entries
    if (vitalsHistory.length > 1000) {
      vitalsHistory.shift();
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[Vitals API] Received ${metric.name}: ${metric.value.toFixed(2)}`,
      );
    }

    // Return success
    res.status(200).json({
      success: true,
      message: "Metric received",
      metricName: metric.name,
      metricValue: metric.value,
    });
  } catch (error) {
    console.error("[Vitals API] Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
