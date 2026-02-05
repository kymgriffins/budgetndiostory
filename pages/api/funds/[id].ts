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
  const { id } = query;

  switch (method) {
    case "GET":
      return handleGet(id as string, res);
    case "PUT":
      return handlePut(id as string, req, res);
    case "DELETE":
      return handleDelete(id as string, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ success: false, error: `Method ${method} Not Allowed` });
  }
}

async function handleGet(id: string, res: NextApiResponse<ApiResponse<any>>) {
  try {
    const fund = fundsData.fundSources.find((f) => f.id === id);

    if (!fund) {
      return res.status(404).json({ success: false, error: "Fund not found" });
    }

    // Get related data
    const allocations = fundsData.fundAllocations.filter(
      (a) => a.fundSourceId === id,
    );
    const transactions = fundsData.fundTransactions.filter(
      (t) => t.fundSourceId === id,
    );
    const disbursements = fund.disbursementSchedule || [];
    const reports = fund.reportingRequirements || [];

    return res.status(200).json({
      success: true,
      data: {
        ...fund,
        allocations,
        transactions,
        disbursements,
        reports,
      },
    });
  } catch (error) {
    console.error("Error fetching fund:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

async function handlePut(
  id: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<FundSource>>,
) {
  try {
    const fundIndex = fundsData.fundSources.findIndex((f) => f.id === id);

    if (fundIndex === -1) {
      return res.status(404).json({ success: false, error: "Fund not found" });
    }

    const updatedFund: FundSource = {
      ...fundsData.fundSources[fundIndex],
      ...req.body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    // In a real app, this would update the database
    return res.status(200).json({
      success: true,
      data: updatedFund,
      message: "Fund updated successfully",
    });
  } catch (error) {
    console.error("Error updating fund:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

async function handleDelete(
  id: string,
  res: NextApiResponse<ApiResponse<void>>,
) {
  try {
    const fundIndex = fundsData.fundSources.findIndex((f) => f.id === id);

    if (fundIndex === -1) {
      return res.status(404).json({ success: false, error: "Fund not found" });
    }

    // In a real app, this would delete from the database
    return res.status(200).json({
      success: true,
      message: "Fund deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting fund:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
