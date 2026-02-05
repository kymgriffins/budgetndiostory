import fundsData from "@/mockdata/funds.json";
import { FundSource } from "@/mockdata/types";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const FUND_TYPE_LABELS: Record<string, string> = {
  government_grant: "Government Grant",
  donation: "Donation",
  partnership: "Partnership",
  corporate_sponsorship: "Corporate Sponsorship",
  international_aid: "International Aid",
  membership_fee: "Membership Fee",
  event_revenue: "Event Revenue",
  crowdfunding: "Crowdfunding",
};

const FUND_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  secured: "bg-green-100 text-green-800 border-green-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-gray-100 text-gray-800 border-gray-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const FUND_TYPE_ICONS: Record<string, string> = {
  government_grant: "🏛️",
  donation: "💝",
  partnership: "🤝",
  corporate_sponsorship: "🏢",
  international_aid: "🌍",
  membership_fee: "👥",
  event_revenue: "🎉",
  crowdfunding: "🙌",
};

export default function FundDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const fund = fundsData.fundSources.find((f) => f.id === id) as
    | FundSource
    | undefined;
  const allocations = fundsData.fundAllocations.filter(
    (a) => a.fundSourceId === id,
  );
  const transactions = fundsData.fundTransactions.filter(
    (t) => t.fundSourceId === id,
  );

  if (!fund) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[24px] font-FoundersGrotesk text-[#111] mb-[16px]">
            Fund Not Found
          </h1>
          <Link
            href="/funds"
            className="px-[24px] py-[12px] rounded-full bg-[#212121] text-white font-NeueMontreal hover:bg-[#333] transition"
          >
            ← Back to Funds
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number, currency: string = "KES") => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalDisbursed = (fund.disbursementSchedule || [])
    .filter((d) => d.status === "received" || d.status === "processed")
    .reduce((sum, d) => {
      const convertedAmount =
        fund.currency === "USD" ? d.amount * 150 : d.amount;
      return sum + convertedAmount;
    }, 0);

  const totalAllocated = allocations.reduce(
    (sum, a) => sum + a.allocatedAmount,
    0,
  );
  const totalUtilized = allocations.reduce(
    (sum, a) => sum + a.utilizedAmount,
    0,
  );

  return (
    <>
      <Head>
        <title>{fund.name} - Funds Management - Budget Ndio Story</title>
        <meta name="description" content={fund.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative min-h-screen bg-[#f8f9fa]">
        {/* Spacer for fixed navbar */}
        <div className="h-[8vh]" />

        <main className="w-full relative z-10 pb-[60px]">
          {/* Back Navigation */}
          <section className="padding-x pt-[24px]">
            <div className="max-w-[1400px] mx-auto">
              <Link
                href="/funds"
                className="inline-flex items-center gap-[8px] px-[16px] py-[10px] rounded-full bg-white border border-[#e5e7eb] text-[#212121] font-NeueMontreal hover:bg-[#f3f4f6] transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Funds
              </Link>
            </div>
          </section>

          {/* Hero Section */}
          <section className="padding-x mt-[24px]">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-[16px] mb-[20px]">
                    <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[36px]">
                      {FUND_TYPE_ICONS[fund.type]}
                    </div>
                    <div>
                      <span
                        className={`inline-block px-[14px] py-[6px] rounded-full text-[12px] font-NeueMontreal font-medium border ${FUND_STATUS_COLORS[fund.status]}`}
                      >
                        {fund.status.replace("_", " ")}
                      </span>
                      <h1 className="mt-[12px] text-[36px] font-FoundersGrotesk uppercase text-[#111] leading-[1.1]">
                        {fund.name}
                      </h1>
                      <p className="mt-[12px] text-[16px] font-NeueMontreal text-[#6b7280]">
                        {FUND_TYPE_LABELS[fund.type]}{" "}
                        {fund.organization && `• ${fund.organization}`}
                      </p>
                    </div>
                  </div>

                  <div className="mt-[32px] rounded-[24px] bg-white border border-black/10 p-[28px]">
                    <h2 className="text-[20px] font-FoundersGrotesk uppercase text-[#111] mb-[16px]">
                      Description
                    </h2>
                    <p className="text-[15px] font-NeueMontreal text-[#4b5563] leading-relaxed">
                      {fund.description}
                    </p>

                    {/* Requirements */}
                    {fund.requirements && fund.requirements.length > 0 && (
                      <div className="mt-[24px] pt-[24px] border-t border-[#e5e7eb]">
                        <h3 className="text-[16px] font-FoundersGrotesk uppercase text-[#111] mb-[12px]">
                          Requirements
                        </h3>
                        <ul className="space-y-[8px]">
                          {fund.requirements.map((req, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-[10px]"
                            >
                              <svg
                                className="w-5 h-5 text-[#6b7280] mt-[2px]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-[14px] font-NeueMontreal text-[#4b5563]">
                                {req}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Allocations */}
                  {allocations.length > 0 && (
                    <div className="mt-[24px] rounded-[24px] bg-white border border-black/10 p-[28px]">
                      <h2 className="text-[20px] font-FoundersGrotesk uppercase text-[#111] mb-[24px]">
                        Allocations ({allocations.length})
                      </h2>
                      <div className="space-y-[16px]">
                        {allocations.map((allocation) => {
                          const utilizationRate =
                            (allocation.utilizedAmount /
                              allocation.allocatedAmount) *
                            100;
                          return (
                            <div
                              key={allocation.id}
                              className="p-[20px] rounded-[16px] bg-[#f9fafb] border border-[#e5e7eb]"
                            >
                              <div className="flex items-center justify-between mb-[12px]">
                                <h3 className="text-[18px] font-FoundersGrotesk text-[#111]">
                                  {allocation.programName}
                                </h3>
                                <span
                                  className={`px-[10px] py-[4px] rounded-full text-[11px] font-NeueMontreal font-medium ${
                                    allocation.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : allocation.status === "completed"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {allocation.status.replace("_", " ")}
                                </span>
                              </div>
                              <p className="text-[14px] font-NeueMontreal text-[#6b7280] mb-[16px]">
                                {allocation.description}
                              </p>
                              <div className="grid grid-cols-2 gap-[16px] mb-[12px]">
                                <div>
                                  <p className="text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                                    Allocated
                                  </p>
                                  <p className="text-[18px] font-FoundersGrotesk font-medium text-[#111]">
                                    {formatCurrency(
                                      allocation.allocatedAmount,
                                      allocation.currency,
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                                    Utilized
                                  </p>
                                  <p className="text-[18px] font-FoundersGrotesk font-medium text-[#111]">
                                    {formatCurrency(
                                      allocation.utilizedAmount,
                                      allocation.currency,
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="h-[6px] bg-[#e5e7eb] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                                  style={{ width: `${utilizationRate}%` }}
                                />
                              </div>
                              <p className="mt-[8px] text-[12px] font-NeueMontreal text-[#6b7280] text-right">
                                {utilizationRate.toFixed(1)}% utilized
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-[16px]">
                  {/* Amount Card */}
                  <div className="rounded-[24px] bg-gradient-to-br from-[#212121] to-[#333] text-white p-[28px]">
                    <p className="text-[13px] font-NeueMontreal uppercase tracking-wider text-white/60">
                      Total Fund Amount
                    </p>
                    <p className="mt-[8px] text-[40px] font-FoundersGrotesk font-medium">
                      {formatCurrency(fund.amount, fund.currency)}
                    </p>
                    <div className="mt-[24px] pt-[24px] border-t border-white/20">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-NeueMontreal text-white/60">
                          Disbursed
                        </span>
                        <span className="text-[18px] font-FoundersGrotesk font-medium">
                          {formatCurrency(totalDisbursed)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-[12px]">
                        <span className="text-[13px] font-NeueMontreal text-white/60">
                          Allocated
                        </span>
                        <span className="text-[18px] font-FoundersGrotesk font-medium">
                          {formatCurrency(totalAllocated)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-[12px]">
                        <span className="text-[13px] font-NeueMontreal text-white/60">
                          Remaining
                        </span>
                        <span className="text-[18px] font-FoundersGrotesk font-medium text-green-400">
                          {formatCurrency(fund.amount - totalAllocated)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details Card */}
                  <div className="rounded-[24px] bg-white border border-black/10 p-[28px]">
                    <h3 className="text-[18px] font-FoundersGrotesk uppercase text-[#111] mb-[20px]">
                      Fund Details
                    </h3>
                    <div className="space-y-[16px]">
                      <div>
                        <p className="text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                          Duration
                        </p>
                        <p className="text-[15px] font-NeueMontreal text-[#111] mt-[4px]">
                          {new Date(fund.startDate).toLocaleDateString(
                            "en-KE",
                            { month: "long", year: "numeric" },
                          )}
                          {" - "}
                          {fund.endDate
                            ? new Date(fund.endDate).toLocaleDateString(
                                "en-KE",
                                { month: "long", year: "numeric" },
                              )
                            : "Ongoing"}
                        </p>
                      </div>
                      {fund.contactPerson && (
                        <div>
                          <p className="text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Contact Person
                          </p>
                          <p className="text-[15px] font-NeueMontreal text-[#111] mt-[4px]">
                            {fund.contactPerson}
                          </p>
                          {fund.contactEmail && (
                            <p className="text-[14px] font-NeueMontreal text-[#6b7280] mt-[2px]">
                              {fund.contactEmail}
                            </p>
                          )}
                        </div>
                      )}
                      {fund.allocatedTo && fund.allocatedTo.length > 0 && (
                        <div>
                          <p className="text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Allocated To
                          </p>
                          <div className="flex flex-wrap gap-[8px] mt-[8px]">
                            {fund.allocatedTo.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-[10px] py-[4px] rounded-full bg-[#f3f4f6] text-[12px] font-NeueMontreal text-[#4b5563]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Disbursements Card */}
                  {fund.disbursementSchedule &&
                    fund.disbursementSchedule.length > 0 && (
                      <div className="rounded-[24px] bg-white border border-black/10 p-[28px]">
                        <h3 className="text-[18px] font-FoundersGrotesk uppercase text-[#111] mb-[20px]">
                          Disbursements ({fund.disbursementSchedule.length})
                        </h3>
                        <div className="space-y-[12px]">
                          {fund.disbursementSchedule.map((disbursement) => (
                            <div
                              key={disbursement.id}
                              className="flex items-center justify-between p-[12px] rounded-[12px] bg-[#f9fafb]"
                            >
                              <div>
                                <p className="text-[14px] font-NeueMontreal text-[#111]">
                                  {formatCurrency(
                                    disbursement.amount,
                                    disbursement.currency,
                                  )}
                                </p>
                                <p className="text-[12px] font-NeueMontreal text-[#6b7280] mt-[2px]">
                                  {new Date(
                                    disbursement.date,
                                  ).toLocaleDateString("en-KE", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                              <span
                                className={`px-[10px] py-[4px] rounded-full text-[11px] font-NeueMontreal font-medium ${
                                  disbursement.status === "received"
                                    ? "bg-green-100 text-green-800"
                                    : disbursement.status === "processed"
                                      ? "bg-blue-100 text-blue-800"
                                      : disbursement.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {disbursement.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Reporting Requirements */}
                  {fund.reportingRequirements &&
                    fund.reportingRequirements.length > 0 && (
                      <div className="rounded-[24px] bg-white border border-black/10 p-[28px]">
                        <h3 className="text-[18px] font-FoundersGrotesk uppercase text-[#111] mb-[20px]">
                          Reporting ({fund.reportingRequirements.length})
                        </h3>
                        <div className="space-y-[12px]">
                          {fund.reportingRequirements.map((report) => {
                            const isOverdue =
                              new Date(report.dueDate) < new Date() &&
                              report.status !== "approved";
                            return (
                              <div
                                key={report.id}
                                className={`p-[16px] rounded-[12px] border ${isOverdue ? "bg-red-50 border-red-200" : "bg-[#f9fafb] border-[#e5e7eb]"}`}
                              >
                                <div className="flex items-center justify-between mb-[8px]">
                                  <span
                                    className={`px-[8px] py-[2px] rounded-full text-[10px] font-NeueMontreal font-medium uppercase ${
                                      report.type === "quarterly"
                                        ? "bg-blue-100 text-blue-800"
                                        : report.type === "annual"
                                          ? "bg-purple-100 text-purple-800"
                                          : report.type === "milestone"
                                            ? "bg-amber-100 text-amber-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {report.type}
                                  </span>
                                  <span
                                    className={`text-[11px] font-NeueMontreal font-medium ${isOverdue ? "text-red-600" : report.status === "approved" ? "text-green-600" : "text-[#6b7280]"}`}
                                  >
                                    {report.status}
                                  </span>
                                </div>
                                <p className="text-[14px] font-NeueMontreal text-[#111]">
                                  {report.description}
                                </p>
                                <p className="text-[12px] font-NeueMontreal text-[#6b7280] mt-[4px]">
                                  Due:{" "}
                                  {new Date(report.dueDate).toLocaleDateString(
                                    "en-KE",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    },
                                  )}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </section>

          {/* Transactions Section */}
          {transactions.length > 0 && (
            <section className="padding-x mt-[48px]">
              <div className="max-w-[1400px] mx-auto">
                <div className="rounded-[24px] bg-white border border-black/10 p-[28px]">
                  <h2 className="text-[20px] font-FoundersGrotesk uppercase text-[#111] mb-[24px]">
                    Transactions ({transactions.length})
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#e5e7eb]">
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Date
                          </th>
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Description
                          </th>
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Category
                          </th>
                          <th className="text-right py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((txn) => (
                          <tr
                            key={txn.id}
                            className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition"
                          >
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#111]">
                              {new Date(txn.date).toLocaleDateString("en-KE")}
                            </td>
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#111]">
                              {txn.description}
                            </td>
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#6b7280]">
                              {txn.category}
                            </td>
                            <td
                              className={`py-[16px] px-[16px] text-right text-[14px] font-NeueMontreal font-medium ${txn.type === "income" ? "text-green-600" : "text-red-600"}`}
                            >
                              {txn.type === "income" ? "+" : "-"}
                              {formatCurrency(txn.amount, txn.currency)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <div className="py-[40px] text-center text-[#212121]/40 text-sm border-t border-black/5 mt-[60px]">
          <p>© 2024 Budget Ndio Story - Funds Management System</p>
        </div>
      </div>
    </>
  );
}
