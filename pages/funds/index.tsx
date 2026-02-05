import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import fundsData from "@/mockdata/funds.json";
import { FundSource, FundSummary, FundTransaction } from "@/mockdata/types";

type FundType = FundSource["type"];
type FundStatus = FundSource["status"];

const FUND_TYPE_LABELS: Record<FundType, string> = {
  government_grant: "Government Grant",
  donation: "Donation",
  partnership: "Partnership",
  corporate_sponsorship: "Corporate Sponsorship",
  international_aid: "International Aid",
  membership_fee: "Membership Fee",
  event_revenue: "Event Revenue",
  crowdfunding: "Crowdfunding",
};

const FUND_STATUS_COLORS: Record<FundStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  secured: "bg-green-100 text-green-800 border-green-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-gray-100 text-gray-800 border-gray-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const FUND_TYPE_COLORS: Record<FundType, string> = {
  government_grant: "from-blue-500 to-blue-600",
  donation: "from-pink-500 to-pink-600",
  partnership: "from-purple-500 to-purple-600",
  corporate_sponsorship: "from-amber-500 to-amber-600",
  international_aid: "from-indigo-500 to-indigo-600",
  membership_fee: "from-teal-500 to-teal-600",
  event_revenue: "from-orange-500 to-orange-600",
  crowdfunding: "from-red-500 to-red-600",
};

const FUND_TYPE_ICONS: Record<FundType, string> = {
  government_grant: "🏛️",
  donation: "💝",
  partnership: "🤝",
  corporate_sponsorship: "🏢",
  international_aid: "🌍",
  membership_fee: "👥",
  event_revenue: "🎉",
  crowdfunding: "🙌",
};

// Initial form state for new fund
const initialFormState: Partial<FundSource> = {
  name: "",
  type: "government_grant",
  description: "",
  organization: "",
  contactPerson: "",
  contactEmail: "",
  amount: 0,
  currency: "KES",
  status: "pending",
  startDate: new Date().toISOString().split("T")[0],
  endDate: "",
  allocatedTo: [],
  requirements: [],
};

export default function FundsPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "sources" | "transactions" | "allocations">("overview");
  const [filterType, setFilterType] = useState<FundType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<FundStatus | "all">("all");
  const [fundSources, setFundSources] = useState<FundSource[]>(fundsData.fundSources as FundSource[]);
  const [showModal, setShowModal] = useState(false);
  const [editingFund, setEditingFund] = useState<FundSource | null>(null);
  const [formData, setFormData] = useState<Partial<FundSource>>(initialFormState);
  const [notification, setNotification] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  const summary = fundsData.fundSummary as FundSummary;
  const transactions = fundsData.fundTransactions as FundTransaction[];
  const allocations = fundsData.fundAllocations;

  // Show notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotify = (type: "success" | "error" | "info", message: string) => {
    setNotification({ type, message });
  };

  const formatCurrency = (amount: number, currency: string = "KES") => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredFunds = fundSources.filter((fund) => {
    if (filterType !== "all" && fund.type !== filterType) return false;
    if (filterStatus !== "all" && fund.status !== filterStatus) return false;
    return true;
  });

  const totalSecured = fundSources
    .filter((f) => f.status === "secured" || f.status === "in_progress")
    .reduce((sum, f) => {
      const convertedAmount = f.currency === "USD" ? f.amount * 150 : f.amount;
      return sum + convertedAmount;
    }, 0);

  const totalUtilized = allocations.reduce((sum, a) => sum + a.utilizedAmount, 0);

  // CRUD Operations
  const handleAddFund = () => {
    setEditingFund(null);
    setFormData(initialFormState);
    setShowModal(true);
  };

  const handleEditFund = (fund: FundSource) => {
    setEditingFund(fund);
    setFormData(fund);
    setShowModal(true);
  };

  const handleDeleteFund = (fundId: string) => {
    if (confirm("Are you sure you want to delete this fund? This action cannot be undone.")) {
      setFundSources((prev) => prev.filter((f) => f.id !== fundId));
      showNotify("success", "Fund deleted successfully");
    }
  };

  const handleSaveFund = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingFund) {
      // Update existing fund
      setFundSources((prev) =>
        prev.map((f) =>
          f.id === editingFund.id ? { ...formData, updatedAt: new Date().toISOString() } as FundSource : f
        )
      );
      showNotify("success", "Fund updated successfully");
    } else {
      // Create new fund
      const newFund: FundSource = {
        ...formData,
        id: `fund-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as FundSource;
      setFundSources((prev) => [...prev, newFund]);
      showNotify("success", "Fund created successfully");
    }

    setShowModal(false);
    setEditingFund(null);
    setFormData(initialFormState);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : parseFloat(value)) : value,
    }));
  };

  return (
    <>
      <Head>
        <title>Funds Management - Budget Ndio Story</title>
        <meta name="description" content="Track and manage organizational funding from various avenues" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-[100px] right-[24px] z-[1000] px-[24px] py-[16px] rounded-[12px] shadow-lg flex items-center gap-[12px] transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : notification.type === "error"
              ? "bg-red-50 border border-red-200 text-red-800"
              : "bg-blue-50 border border-blue-200 text-blue-800"
          }`}
        >
          <span className="text-[20px]">
            {notification.type === "success" ? "✓" : notification.type === "error" ? "✕" : "ℹ"}
          </span>
          <span className="font-NeueMontreal text-[14px]">{notification.message}</span>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-[16px]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-[24px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-[28px]">
              <div className="flex items-center justify-between mb-[24px]">
                <h2 className="text-[24px] font-FoundersGrotesk uppercase text-[#111]">
                  {editingFund ? "Edit Fund" : "Add New Fund"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-[40px] h-[40px] rounded-full bg-[#f3f4f6] flex items-center justify-center hover:bg-[#e5e7eb] transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSaveFund} className="space-y-[20px]">
                {/* Name */}
                <div>
                  <label className="block text-[13px] font-NeueMontreal font-medium text-[#6b7280] mb-[8px]">
                    Fund Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#212121] focus:ring-1 focus:ring-[#212121] transition"
                    placeholder="e.g., National Treasury Grant"
                  />
                </div>

                {/* Type & Status */}
                <div className="grid grid-cols-2 gap-[16px]">
                  <div>
                    <label className="block text-[13px] font-NeueMontreal font-medium text-[#6b7280] mb-[8px]">
                      Fund Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#212121] transition bg-white"
                    >
                      {Object.entries(FUND_TYPE_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-NeueMontreal font-medium text-[#6b7280] mb-[8px]">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#212121] transition bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="secured">Secured</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Organization & Contact */}
                <div className="grid grid-cols-2 gap-[16px]">
                  <div>
                    <label className="block text-[13px] font-NeueMontreal font-medium text-[#6b7280] mb-[8px]">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#212121] transition"
                      placeholder="e.g., National Treasury"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-NeueMontreal font-medium text-[#6b7280] mb-[8px]">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#212121] transition"
                      placeholder="e.g., John Mwangi"
                    />
                  </div>
                </div>

                {/* Email & Currency */}
                <div className="grid grid-cols-2 gap-[16px]">
                  <div>
                    <label className="block text-[13px] font-NeueMontreal font-medium text-[#6b7280] mb-[8px]">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#212121] transition"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-NeueMontreal font-medium text-[#6b7280] mb-[8px]">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#212121] transition bg-white"
                    >
                      <option value="KES">KES - Kenyan Shilling</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-[13px] font-NeueMontreal font-medium text-[#6b7280] mb-[8px]">
                    Amount *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="100"
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#212121] transition"
                    placeholder="0"
                  />
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-[16px]">
                  <div>
                    <label className="block text-[13px] font-NeueMontreal font-medium text-[#6b7280] mb-[8px]">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#212121] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-NeueMontreal font-medium text-[#6b7280] mb-[8px]">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#212121] transition"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[13px] font-NeueMontreal font-medium text-[#6b7280] mb-[8px]">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:outline-none focus:border-[#212121] focus:ring-1 focus:ring-[#212121] transition resize-none"
                    placeholder="Describe the purpose of this fund..."
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-[12px] pt-[16px]">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-[24px] py-[14px] rounded-full border border-[#e5e7eb] text-[#212121] font-NeueMontreal hover:bg-[#f3f4f6] transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-[24px] py-[14px] rounded-full bg-[#212121] text-white font-NeueMontreal hover:bg-[#333] transition"
                  >
                    {editingFund ? "Save Changes" : "Create Fund"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="relative min-h-screen bg-[#f8f9fa]">
        {/* Spacer for fixed navbar */}
        <div className="h-[8vh]" />

        <main className="w-full relative z-10 pb-[60px]">
          {/* HERO SECTION */}
          <section className="padding-x pt-[36px] smOnly:pt-[28px] xm:pt-[22px]">
            <div className="max-w-[1400px] mx-auto w-full">
              <div data-hero="sub" className="inline-block mb-[20px]">
                <span className="px-[14px] py-[8px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/70">
                  💰 Funds Management
                </span>
              </div>

              <h1
                data-hero="title"
                className="sub-heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]"
              >
                Track Your Funding Sources
              </h1>

              <p
                data-hero="sub"
                className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]"
              >
                Monitor grants, donations, sponsorships, and other funding avenues.
                See where money comes from and how it's being utilized.
              </p>

              <div
                data-hero="cta"
                className="mt-[32px] flex items-center gap-[12px] flex-wrap"
              >
                <Link
                  href="/home"
                  className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition"
                >
                  ← Back to Home
                </Link>
                <button
                  onClick={handleAddFund}
                  className="px-[24px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:bg-[#333] transition flex items-center gap-[8px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Fund
                </button>
              </div>
            </div>
          </section>

          {/* SUMMARY CARDS */}
          <section className="padding-x mt-[48px]">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
                {/* Total Secured */}
                <div className="relative rounded-[24px] bg-white border border-black/10 p-[24px] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`absolute top-0 right-0 w-[100px] h-[100px] bg-gradient-to-br from-green-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2`} />
                  <div className="relative z-10">
                    <p className="text-[13px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                      Total Secured
                    </p>
                    <p className="mt-[8px] text-[32px] font-FoundersGrotesk font-medium text-[#111]">
                      {formatCurrency(totalSecured)}
                    </p>
                    <p className="mt-[8px] text-[13px] font-NeueMontreal text-[#059669]">
                      ↑ 12% from last period
                    </p>
                  </div>
                </div>

                {/* Total Utilized */}
                <div className="relative rounded-[24px] bg-white border border-black/10 p-[24px] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`absolute top-0 right-0 w-[100px] h-[100px] bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2`} />
                  <div className="relative z-10">
                    <p className="text-[13px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                      Total Utilized
                    </p>
                    <p className="mt-[8px] text-[32px] font-FoundersGrotesk font-medium text-[#111]">
                      {formatCurrency(totalUtilized)}
                    </p>
                    <p className="mt-[8px] text-[13px] font-NeueMontreal text-[#6b7280]">
                      {((totalUtilized / totalSecured) * 100).toFixed(1)}% utilization rate
                    </p>
                  </div>
                </div>

                {/* Active Funds */}
                <div className="relative rounded-[24px] bg-white border border-black/10 p-[24px] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`absolute top-0 right-0 w-[100px] h-[100px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2`} />
                  <div className="relative z-10">
                    <p className="text-[13px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                      Active Funds
                    </p>
                    <p className="mt-[8px] text-[32px] font-FoundersGrotesk font-medium text-[#111]">
                      {fundSources.filter((f) => f.status === "secured" || f.status === "in_progress").length}
                    </p>
                    <p className="mt-[8px] text-[13px] font-NeueMontreal text-[#6b7280]">
                      Across {fundSources.length} sources
                    </p>
                  </div>
                </div>

                {/* Pending */}
                <div className="relative rounded-[24px] bg-white border border-black/10 p-[24px] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`absolute top-0 right-0 w-[100px] h-[100px] bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2`} />
                  <div className="relative z-10">
                    <p className="text-[13px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                      Pending
                    </p>
                    <p className="mt-[8px] text-[32px] font-FoundersGrotesk font-medium text-[#111]">
                      {fundSources.filter((f) => f.status === "pending").length}
                    </p>
                    <p className="mt-[8px] text-[13px] font-NeueMontreal text-[#6b7280]">
                      Awaiting confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TAB NAVIGATION */}
          <section className="padding-x mt-[48px]">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-center gap-[8px] flex-wrap mb-[32px]">
                {[
                  { id: "overview", label: "Overview", icon: "📊" },
                  { id: "sources", label: "Funding Sources", icon: "💰" },
                  { id: "transactions", label: "Transactions", icon: "📋" },
                  { id: "allocations", label: "Allocations", icon: "📁" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-[20px] py-[12px] rounded-full text-[14px] font-NeueMontreal font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-[#212121] text-white shadow-lg"
                        : "bg-white text-[#212121] border border-[#e5e7eb] hover:border-[#212121] hover:text-[#212121]"
                    }`}
                  >
                    <span className="flex items-center gap-[8px]">
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </span>
                  </button>
                ))}
              </div>

              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
                  {/* Funds by Type */}
                  <div className="lg:col-span-2 rounded-[24px] bg-white border border-black/10 p-[28px]">
                    <h3 className="text-[20px] font-FoundersGrotesk uppercase text-[#111] mb-[24px]">
                      Funds by Source Type
                    </h3>
                    <div className="space-y-[16px]">
                      {Object.entries(summary.byType).map(([type, amount]) => {
                        if (amount === 0) return null;
                        const percentage = ((amount / summary.totalSecured) * 100).toFixed(1);
                        return (
                          <div key={type} className="flex items-center gap-[16px]">
                            <div className="w-[48px] h-[48px] rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[24px]">
                              {FUND_TYPE_ICONS[type as FundType] || "💵"}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-[8px]">
                                <span className="text-[14px] font-NeueMontreal font-medium text-[#111]">
                                  {FUND_TYPE_LABELS[type as FundType]}
                                </span>
                                <span className="text-[14px] font-NeueMontreal text-[#6b7280]">
                                  {formatCurrency(amount)} ({percentage}%)
                                </span>
                              </div>
                              <div className="h-[8px] bg-[#e5e7eb] rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${FUND_TYPE_COLORS[type as FundType]} rounded-full transition-all duration-500`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="rounded-[24px] bg-white border border-black/10 p-[28px]">
                    <h3 className="text-[20px] font-FoundersGrotesk uppercase text-[#111] mb-[24px]">
                      Recent Activity
                    </h3>
                    <div className="space-y-[16px]">
                      {transactions.slice(0, 5).map((txn) => (
                        <div key={txn.id} className="flex items-start gap-[12px]">
                          <div className={`w-[8px] h-[8px] rounded-full mt-[6px] ${txn.type === "income" ? "bg-green-500" : "bg-red-500"}`} />
                          <div className="flex-1">
                            <p className="text-[13px] font-NeueMontreal text-[#111]">
                              {txn.description}
                            </p>
                            <p className="text-[12px] font-NeueMontreal text-[#6b7280] mt-[4px]">
                              {new Date(txn.date).toLocaleDateString("en-KE")}
                            </p>
                          </div>
                          <span className={`text-[14px] font-NeueMontreal font-medium ${txn.type === "income" ? "text-green-600" : "text-red-600"}`}>
                            {txn.type === "income" ? "+" : "-"}{formatCurrency(txn.amount, txn.currency)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Reports */}
                  <div className="lg:col-span-3 rounded-[24px] bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-[28px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[20px] font-FoundersGrotesk uppercase text-[#111] mb-[8px]">
                          Upcoming Reporting Deadlines
                        </h3>
                        <p className="text-[14px] font-NeueMontreal text-[#6b7280]">
                          Stay on top of your reporting requirements
                        </p>
                      </div>
                      <button className="px-[24px] py-[12px] rounded-full bg-[#212121] text-white font-NeueMontreal hover:bg-[#333] transition">
                        View All Reports
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SOURCES TAB */}
              {activeTab === "sources" && (
                <div>
                  {/* Filters */}
                  <div className="flex items-center gap-[16px] mb-[24px] flex-wrap">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value as FundType | "all")}
                      className="px-[16px] py-[10px] rounded-full bg-white border border-[#e5e7eb] text-[14px] font-NeueMontreal focus:outline-none focus:border-[#212121]"
                    >
                      <option value="all">All Types</option>
                      {Object.entries(FUND_TYPE_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as FundStatus | "all")}
                      className="px-[16px] py-[10px] rounded-full bg-white border border-[#e5e7eb] text-[14px] font-NeueMontreal focus:outline-none focus:border-[#212121]"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="secured">Secured</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={handleAddFund}
                      className="px-[24px] py-[10px] rounded-full bg-[#212121] text-white font-NeueMontreal hover:bg-[#333] transition flex items-center gap-[8px]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add New Fund
                    </button>
                  </div>

                  {/* Fund Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                    {filteredFunds.map((fund) => (
                      <div
                        key={fund.id}
                        className="group relative rounded-[24px] bg-white border border-black/10 hover:border-black/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden"
                      >
                        {/* Gradient accent */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${FUND_TYPE_COLORS[fund.type]}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative z-10 p-[26px]">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-[16px]">
                            <div className="w-[56px] h-[56px] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[26px]">
                              {FUND_TYPE_ICONS[fund.type]}
                            </div>
                            <div className="flex items-center gap-[8px]">
                              <span className={`px-[12px] py-[6px] rounded-full text-[11px] font-NeueMontreal font-medium border ${FUND_STATUS_COLORS[fund.status]}`}>
                                {fund.status.replace("_", " ")}
                              </span>
                              <div className="relative group/menu">
                                <button className="w-[32px] h-[32px] rounded-full hover:bg-[#f3f4f6] flex items-center justify-center transition">
                                  <svg className="w-5 h-5 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                  </svg>
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-[140px] bg-white rounded-[12px] shadow-lg border border-[#e5e7eb] opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-20">
                                  <button
                                    onClick={() => handleEditFund(fund)}
                                    className="w-full px-[16px] py-[12px] text-left text-[14px] font-NeueMontreal text-[#111] hover:bg-[#f3f4f6] rounded-t-[12px]"
                                  >
                                    Edit Fund
                                  </button>
                                  <button
                                    onClick={() => handleDeleteFund(fund.id)}
                                    className="w-full px-[16px] py-[12px] text-left text-[14px] font-NeueMontreal text-red-600 hover:bg-[#f3f4f6] rounded-b-[12px]"
                                  >
                                    Delete Fund
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col">
                            <h3 className="text-[20px] font-FoundersGrotesk leading-tight text-[#111]">
                              {fund.name}
                            </h3>

                            <div className="mt-[12px] flex items-center gap-[8px]">
                              <span className="text-[13px] font-NeueMontreal text-[#6b7280]">
                                {FUND_TYPE_LABELS[fund.type]}
                              </span>
                              <span className="text-[#e5e7eb]">•</span>
                              <span className="text-[13px] font-NeueMontreal text-[#6b7280]">
                                {fund.organization || "N/A"}
                              </span>
                            </div>

                            <div className="mt-[16px] w-[40px] h-[3px] bg-gradient-to-r from-[#212121] to-[#212121]/30 rounded-full" />

                            <div className="mt-[16px] flex items-center justify-between">
                              <div>
                                <p className="text-[24px] font-FoundersGrotesk font-medium text-[#111]">
                                  {formatCurrency(fund.amount, fund.currency)}
                                </p>
                                <p className="text-[11px] font-NeueMontreal uppercase tracking-wider mt-[4px] text-[#6b7280]">
                                  {fund.currency} Total
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-[14px] font-NeueMontreal text-[#111]">
                                  {new Date(fund.startDate).toLocaleDateString("en-KE", { month: "short", year: "numeric" })}
                                </p>
                                <p className="text-[11px] font-NeueMontreal uppercase tracking-wider mt-[4px] text-[#6b7280]">
                                  {fund.endDate ? `to ${new Date(fund.endDate).toLocaleDateString("en-KE", { month: "short", year: "numeric" })}` : "Ongoing"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="mt-[20px] pt-[16px] border-t border-black/5 flex items-center justify-between">
                            <Link
                              href={`/funds/${fund.id}`}
                              className="text-[12px] font-NeueMontreal text-[#6b7280] flex items-center gap-[6px] transition-all duration-300 hover:text-[#212121]"
                            >
                              <span>View Details</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredFunds.length === 0 && (
                    <div className="text-center py-[60px]">
                      <p className="text-[18px] font-NeueMontreal text-[#6b7280]">
                        No funds found matching your filters.
                      </p>
                      <button
                        onClick={handleAddFund}
                        className="mt-[16px] px-[24px] py-[12px] rounded-full bg-[#212121] text-white font-NeueMontreal hover:bg-[#333] transition"
                      >
                        Add Your First Fund
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TRANSACTIONS TAB */}
              {activeTab === "transactions" && (
                <div className="rounded-[24px] bg-white border border-black/10 p-[28px]">
                  <div className="flex items-center justify-between mb-[24px]">
                    <h3 className="text-[20px] font-FoundersGrotesk uppercase text-[#111]">
                      All Transactions
                    </h3>
                    <button className="px-[24px] py-[10px] rounded-full bg-[#212121] text-white font-NeueMontreal hover:bg-[#333] transition flex items-center gap-[8px]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export CSV
                    </button>
                  </div>

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
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Type
                          </th>
                          <th className="text-right py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Amount
                          </th>
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((txn) => (
                          <tr key={txn.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition">
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#111]">
                              {new Date(txn.date).toLocaleDateString("en-KE")}
                            </td>
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#111]">
                              {txn.description}
                            </td>
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#6b7280]">
                              {txn.category}
                            </td>
                            <td className="py-[16px] px-[16px]">
                              <span className={`px-[10px] py-[4px] rounded-full text-[12px] font-NeueMontreal font-medium ${
                                txn.type === "income"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                              </span>
                            </td>
                            <td className={`py-[16px] px-[16px] text-right text-[14px] font-NeueMontreal font-medium ${
                              txn.type === "income" ? "text-green-600" : "text-red-600"
                            }`}>
                              {txn.type === "income" ? "+" : "-"}{formatCurrency(txn.amount, txn.currency)}
                            </td>
                            <td className="py-[16px] px-[16px]">
                              <span className={`px-[10px] py-[4px] rounded-full text-[12px] font-NeueMontreal font-medium ${
                                txn.status === "processed" ? "bg-gray-100 text-gray-800" :
                                txn.status === "approved" ? "bg-green-100 text-green-800" :
                                txn.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                              }`}>
                                {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ALLOCATIONS TAB */}
              {activeTab === "allocations" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
                  {allocations.map((allocation) => {
                    const utilizationRate = (allocation.utilizedAmount / allocation.allocatedAmount) * 100;
                    return (
                      <div
                        key={allocation.id}
                        className="rounded-[24px] bg-white border border-black/10 p-[26px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500"
                      >
                        <div className="flex items-start justify-between mb-[16px]">
                          <div>
                            <span className={`inline-block px-[10px] py-[4px] rounded-full text-[11px] font-NeueMontreal font-medium mb-[8px] ${
                              allocation.status === "active" ? "bg-green-100 text-green-800" :
                              allocation.status === "completed" ? "bg-blue-100 text-blue-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {allocation.status.replace("_", " ")}
                            </span>
                            <h3 className="text-[20px] font-FoundersGrotesk text-[#111]">
                              {allocation.programName}
                            </h3>
                          </div>
                        </div>

                        <p className="text-[14px] font-NeueMontreal text-[#6b7280] mb-[20px]">
                          {allocation.description}
                        </p>

                        {/* Budget info */}
                        <div className="grid grid-cols-2 gap-[16px] mb-[20px]">
                          <div>
                            <p className="text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                              Allocated
                            </p>
                            <p className="text-[20px] font-FoundersGrotesk font-medium text-[#111] mt-[4px]">
                              {formatCurrency(allocation.allocatedAmount, allocation.currency)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                              Utilized
                            </p>
                            <p className="text-[20px] font-FoundersGrotesk font-medium text-[#111] mt-[4px]">
                              {formatCurrency(allocation.utilizedAmount, allocation.currency)}
                            </p>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-[20px]">
                          <div className="flex items-center justify-between mb-[8px]">
                            <span className="text-[12px] font-NeueMontreal text-[#6b7280]">
                              Utilization Rate
                            </span>
                            <span className="text-[14px] font-NeueMontreal font-medium text-[#111]">
                              {utilizationRate.toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-[8px] bg-[#e5e7eb] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                              style={{ width: `${utilizationRate}%` }}
                            />
                          </div>
                        </div>

                        {/* Milestones */}
                        {allocation.milestones && allocation.milestones.length > 0 && (
                          <div>
                            <p className="text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280] mb-[12px]">
                              Milestones
                            </p>
                            <div className="space-y-[8px]">
                              {allocation.milestones.map((milestone) => (
                                <div key={milestone.id} className="flex items-center gap-[12px]">
                                  <div className={`w-[8px] h-[8px] rounded-full ${
                                    milestone.status === "completed" ? "bg-green-500" :
                                    milestone.status === "in_progress" ? "bg-blue-500" :
                                    "bg-gray-300"
                                  }`} />
                                  <span className="flex-1 text-[13px] font-NeueMontreal text-[#111]">
                                    {milestone.name}
                                  </span>
                                  <span className="text-[12px] font-NeueMontreal text-[#6b7280]">
                                    {new Date(milestone.targetDate).toLocaleDateString("en-KE", { month: "short", day: "numeric" })}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <div className="py-[40px] text-center text-[#212121]/40 text-sm border-t border-black/5 mt-[60px]">
          <p>© 2024 Budget Ndio Story - Funds Management System</p>
        </div>
      </div>
    </>
  );
}
