import fundsData from "@/mockdata/funds.json";
import { FundSource } from "@/mockdata/types";
import type { NextApiRequest, NextApiResponse } from "next";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>,
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ success: false, error: `Method ${method} Not Allowed` });
  }
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>,
) {
  try {
    const { type, status, search } = req.query;

    let fundSources = [...fundsData.fundSources] as FundSource[];

    // Filter by type
    if (type && typeof type === "string") {
      fundSources = fundSources.filter((fund) => fund.type === type);
    }

    // Filter by status
    if (status && typeof status === "string") {
      fundSources = fundSources.filter((fund) => fund.status === status);
    }

    // Search by name
    if (search && typeof search === "string") {
      const searchLower = search.toLowerCase();
      fundSources = fundSources.filter(
        (fund) =>
          fund.name.toLowerCase().includes(searchLower) ||
          fund.organization?.toLowerCase().includes(searchLower),
      );
    }

    // Get fund summary if requested
    if (req.query.summary === "true") {
      return res.status(200).json({
        success: true,
        data: {
          summary: fundsData.fundSummary,
          fundSources: fundSources,
          recentTransactions: fundsData.fundTransactions.slice(0, 10),
          allocations: fundsData.fundAllocations,
        },
      });
    }

    // Get all transactions
    if (req.query.transactions === "true") {
      return res.status(200).json({
        success: true,
        data: fundsData.fundTransactions,
      });
    }

    // Get all allocations
    if (req.query.allocations === "true") {
      return res.status(200).json({
        success: true,
        data: fundsData.fundAllocations,
      });
    }

    return res.status(200).json({
      success: true,
      data: fundSources,
    });
  } catch (error) {
    console.error("Error fetching funds:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<FundSource>>,
) {
  try {
    const newFund: FundSource = {
      ...req.body,
      id: `fund-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, this would save to a database
    // For mock purposes, we just return the created fund
    return res.status(201).json({
      success: true,
      data: newFund,
      message: "Fund source created successfully",
    });
  } catch (error) {
    console.error("Error creating fund:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
