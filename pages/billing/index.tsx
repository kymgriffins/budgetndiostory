import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import billingData from "@/mockdata/billing.json";
import { Invoice, Expense, TechBill } from "@/mockdata/types";

type TabType = "overview" | "invoices" | "expenses" | "techbills";

const EXPENSE_CATEGORY_LABELS: Record<string, string> = {
  domain_hosting: "Domain & Hosting",
  software_tools: "Software Tools",
  ai_services: "AI Services",
  marketing: "Marketing",
  office_supplies: "Office Supplies",
  travel: "Travel",
  professional_services: "Professional Services",
  utilities: "Utilities",
  payroll: "Payroll",
  other: "Other",
};

const TECH_BILL_CATEGORY_LABELS: Record<string, string> = {
  domain: "Domain",
  hosting: "Hosting",
  ai_api: "AI/API",
  software_license: "Software License",
  ci_cd: "CI/CD",
  monitoring: "Monitoring",
  security: "Security",
  communication: "Communication",
  design_tools: "Design Tools",
  development: "Development",
  other: "Other",
};

const INVOICE_STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  sent: "bg-blue-100 text-blue-800",
  paid: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-500",
};

const EXPENSE_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  reimbursed: "bg-blue-100 text-blue-800",
};

export default function BillingDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [invoices, setInvoices] = useState<Invoice[]>(billingData.invoices as Invoice[]);
  const [expenses, setExpenses] = useState<Expense[]>(billingData.expenses as Expense[]);
  const [techBills, setTechBills] = useState<TechBill[]>(billingData.techBills as TechBill[]);
  const [notification, setNotification] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

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

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate totals
  const totalIncome = invoices
    .filter((i) => i.type === "income" && i.status === "paid")
    .reduce((sum, i) => {
      const convertedAmount = i.currency === "KES" ? i.total / 150 : i.total;
      return sum + convertedAmount;
    }, 0);

  const totalExpenses = expenses
    .filter((e) => e.status === "approved")
    .reduce((sum, e) => {
      const convertedAmount = e.currency === "KES" ? e.amount / 150 : e.amount;
      return sum + convertedAmount;
    }, 0);

  const monthlyTechBills = techBills
    .filter((b) => b.status === "active")
    .reduce((sum, b) => {
      const monthlyCost = b.billingFrequency === "monthly"
        ? b.cost
        : b.billingFrequency === "quarterly"
          ? b.cost / 3
          : b.cost / 12;
      return sum + monthlyCost;
    }, 0);

  const pendingInvoices = invoices.filter((i) => i.status === "sent" || i.status === "draft");
  const pendingExpenses = expenses.filter((e) => e.status === "pending");
  const upcomingBills = techBills.filter((b) => {
    const nextDate = new Date(b.nextBillingDate);
    const now = new Date();
    const daysUntil = Math.ceil((nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30 && b.status === "active";
  });

  const handleApproveExpense = (expenseId: string) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === expenseId
          ? { ...e, status: "approved", approvedDate: new Date().toISOString().split("T")[0], updatedAt: new Date().toISOString() }
          : e
      )
    );
    showNotify("success", "Expense approved successfully");
  };

  const handleRejectExpense = (expenseId: string) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === expenseId
          ? { ...e, status: "rejected", updatedAt: new Date().toISOString() }
          : e
      )
    );
    showNotify("info", "Expense rejected");
  };

  return (
    <>
      <Head>
        <title>Billing Dashboard - Budget Ndio Story</title>
        <meta name="description" content="Manage invoices, expenses, and tech bills" />
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

      <div className="relative min-h-screen bg-[#f8f9fa]">
        {/* Spacer for fixed navbar */}
        <div className="h-[8vh]" />

        <main className="w-full relative z-10 pb-[60px]">
          {/* HERO SECTION */}
          <section className="padding-x pt-[36px] smOnly:pt-[28px] xm:pt-[22px]">
            <div className="max-w-[1400px] mx-auto w-full">
              <div className="flex items-center justify-between flex-wrap gap-[16px]">
                <div>
                  <div className="inline-block mb-[20px]">
                    <span className="px-[14px] py-[8px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/70">
                      💰 Billing & Expenses
                    </span>
                  </div>
                  <h1 className="sub-heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[600px]">
                    Financial Dashboard
                  </h1>
                  <p className="mt-[16px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]">
                    Track invoices, manage expenses, and monitor tech infrastructure costs.
                  </p>
                </div>
                <div className="flex items-center gap-[12px] flex-wrap">
                  <Link
                    href="/home"
                    className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition"
                  >
                    ← Back to Home
                  </Link>
                  <button className="px-[24px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:bg-[#333] transition flex items-center gap-[8px]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Expense
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SUMMARY CARDS */}
          <section className="padding-x mt-[40px]">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[16px]">
                {/* Total Income */}
                <div className="relative rounded-[24px] bg-white border border-black/10 p-[24px] overflow-hidden hover:shadow-lg transition-shadow">
                  <p className="text-[13px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                    Total Income
                  </p>
                  <p className="mt-[8px] text-[28px] font-FoundersGrotesk font-medium text-[#059669]">
                    {formatCurrency(totalIncome)}
                  </p>
                  <p className="mt-[8px] text-[12px] font-NeueMontreal text-[#6b7280]">
                    From paid invoices
                  </p>
                </div>

                {/* Total Expenses */}
                <div className="relative rounded-[24px] bg-white border border-black/10 p-[24px] overflow-hidden hover:shadow-lg transition-shadow">
                  <p className="text-[13px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                    Total Expenses
                  </p>
                  <p className="mt-[8px] text-[28px] font-FoundersGrotesk font-medium text-[#dc2626]">
                    {formatCurrency(totalExpenses)}
                  </p>
                  <p className="mt-[8px] text-[12px] font-NeueMontreal text-[#6b7280]">
                    Approved expenses
                  </p>
                </div>

                {/* Net Balance */}
                <div className="relative rounded-[24px] bg-white border border-black/10 p-[24px] overflow-hidden hover:shadow-lg transition-shadow">
                  <p className="text-[13px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                    Net Balance
                  </p>
                  <p className={`mt-[8px] text-[28px] font-FoundersGrotesk font-medium ${totalIncome - totalExpenses >= 0 ? "text-[#059669]" : "text-[#dc2626]"}`}>
                    {formatCurrency(totalIncome - totalExpenses)}
                  </p>
                  <p className="mt-[8px] text-[12px] font-NeueMontreal text-[#6b7280]">
                    Income - Expenses
                  </p>
                </div>

                {/* Monthly Tech Bills */}
                <div className="relative rounded-[24px] bg-white border border-black/10 p-[24px] overflow-hidden hover:shadow-lg transition-shadow">
                  <p className="text-[13px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                    Monthly Tech Bills
                  </p>
                  <p className="mt-[8px] text-[28px] font-FoundersGrotesk font-medium text-[#2563eb]">
                    {formatCurrency(monthlyTechBills)}
                  </p>
                  <p className="mt-[8px] text-[12px] font-NeueMontreal text-[#6b7280]">
                    {techBills.filter((b) => b.status === "active").length} active services
                  </p>
                </div>

                {/* Pending Actions */}
                <div className="relative rounded-[24px] bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-[24px] overflow-hidden">
                  <p className="text-[13px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                    Pending Actions
                  </p>
                  <p className="mt-[8px] text-[28px] font-FoundersGrotesk font-medium text-[#d97706]">
                    {pendingInvoices.length + pendingExpenses.length + upcomingBills.length}
                  </p>
                  <p className="mt-[8px] text-[12px] font-NeueMontreal text-[#6b7280]">
                    Invoices & expenses to review
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* TAB NAVIGATION */}
          <section className="padding-x mt-[40px]">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-center gap-[8px] flex-wrap mb-[32px]">
                {[
                  { id: "overview", label: "Overview", icon: "📊" },
                  { id: "invoices", label: "Invoices", icon: "📄" },
                  { id: "expenses", label: "Expenses", icon: "💳" },
                  { id: "techbills", label: "Tech Bills", icon: "🖥️" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
                  {/* Pending Invoices */}
                  <div className="rounded-[24px] bg-white border border-black/10 p-[28px]">
                    <div className="flex items-center justify-between mb-[20px]">
                      <h3 className="text-[18px] font-FoundersGrotesk uppercase text-[#111]">
                        Pending Invoices
                      </h3>
                      <span className="px-[12px] py-[4px] rounded-full bg-yellow-100 text-yellow-800 text-[12px] font-NeueMontreal font-medium">
                        {pendingInvoices.length}
                      </span>
                    </div>
                    <div className="space-y-[12px]">
                      {pendingInvoices.slice(0, 4).map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-[16px] rounded-[12px] bg-[#f9fafb]">
                          <div>
                            <p className="text-[14px] font-NeueMontreal font-medium text-[#111]">
                              {invoice.invoiceNumber}
                            </p>
                            <p className="text-[12px] font-NeueMontreal text-[#6b7280]">
                              {invoice.clientName}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[14px] font-FoundersGrotesk font-medium text-[#111]">
                              {formatCurrency(invoice.total, invoice.currency)}
                            </p>
                            <p className="text-[12px] font-NeueMontreal text-[#6b7280]">
                              Due: {new Date(invoice.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {pendingInvoices.length === 0 && (
                        <p className="text-[14px] font-NeueMontreal text-[#6b7280] text-center py-[20px]">
                          No pending invoices
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pending Expenses */}
                  <div className="rounded-[24px] bg-white border border-black/10 p-[28px]">
                    <div className="flex items-center justify-between mb-[20px]">
                      <h3 className="text-[18px] font-FoundersGrotesk uppercase text-[#111]">
                        Pending Expenses
                      </h3>
                      <span className="px-[12px] py-[4px] rounded-full bg-yellow-100 text-yellow-800 text-[12px] font-NeueMontreal font-medium">
                        {pendingExpenses.length}
                      </span>
                    </div>
                    <div className="space-y-[12px]">
                      {pendingExpenses.slice(0, 4).map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between p-[16px] rounded-[12px] bg-[#f9fafb]">
                          <div className="flex-1">
                            <p className="text-[14px] font-NeueMontreal font-medium text-[#111]">
                              {expense.title}
                            </p>
                            <p className="text-[12px] font-NeueMontreal text-[#6b7280]">
                              {EXPENSE_CATEGORY_LABELS[expense.category] || expense.category}
                            </p>
                          </div>
                          <div className="flex items-center gap-[12px]">
                            <p className="text-[14px] font-FoundersGrotesk font-medium text-[#dc2626]">
                              {formatCurrency(expense.amount, expense.currency)}
                            </p>
                            <div className="flex gap-[8px]">
                              <button
                                onClick={() => handleApproveExpense(expense.id)}
                                className="w-[28px] h-[28px] rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition"
                                title="Approve"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => handleRejectExpense(expense.id)}
                                className="w-[28px] h-[28px] rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition"
                                title="Reject"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {pendingExpenses.length === 0 && (
                        <p className="text-[14px] font-NeueMontreal text-[#6b7280] text-center py-[20px]">
                          No pending expenses
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tech Bills Breakdown */}
                  <div className="lg:col-span-2 rounded-[24px] bg-white border border-black/10 p-[28px]">
                    <h3 className="text-[18px] font-FoundersGrotesk uppercase text-[#111] mb-[24px]">
                      Tech Infrastructure Costs
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
                      {Object.entries(TECH_BILL_CATEGORY_LABELS).map(([key, label]) => {
                        const categoryTotal = techBills
                          .filter((b) => b.category === key && b.status === "active")
                          .reduce((sum, b) => {
                            const monthly = b.billingFrequency === "monthly" ? b.cost : b.billingFrequency === "quarterly" ? b.cost / 3 : b.cost / 12;
                            return sum + monthly;
                          }, 0);
                        if (categoryTotal === 0) return null;
                        return (
                          <div key={key} className="p-[16px] rounded-[16px] bg-[#f9fafb]">
                            <p className="text-[12px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                              {label}
                            </p>
                            <p className="mt-[8px] text-[20px] font-FoundersGrotesk font-medium text-[#2563eb]">
                              {formatCurrency(categoryTotal)}
                            </p>
                            <p className="text-[11px] font-NeueMontreal text-[#6b7280]">
                              /month
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* INVOICES TAB */}
              {activeTab === "invoices" && (
                <div className="rounded-[24px] bg-white border border-black/10 p-[28px]">
                  <div className="flex items-center justify-between mb-[24px]">
                    <h3 className="text-[20px] font-FoundersGrotesk uppercase text-[#111]">
                      All Invoices
                    </h3>
                    <button className="px-[24px] py-[10px] rounded-full bg-[#212121] text-white font-NeueMontreal hover:bg-[#333] transition flex items-center gap-[8px]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Invoice
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#e5e7eb]">
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Invoice #
                          </th>
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Client
                          </th>
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Type
                          </th>
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Status
                          </th>
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Due Date
                          </th>
                          <th className="text-right py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition">
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal font-medium text-[#111]">
                              {invoice.invoiceNumber}
                            </td>
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#111]">
                              {invoice.clientName}
                            </td>
                            <td className="py-[16px] px-[16px]">
                              <span className={`px-[10px] py-[4px] rounded-full text-[12px] font-NeueMontreal font-medium ${
                                invoice.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}>
                                {invoice.type.charAt(0).toUpperCase() + invoice.type.slice(1)}
                              </span>
                            </td>
                            <td className="py-[16px] px-[16px]">
                              <span className={`px-[10px] py-[4px] rounded-full text-[12px] font-NeueMontreal font-medium ${INVOICE_STATUS_COLORS[invoice.status]}`}>
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#6b7280]">
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </td>
                            <td className={`py-[16px] px-[16px] text-right text-[14px] font-NeueMontreal font-medium ${invoice.type === "income" ? "text-green-600" : "text-red-600"}`}>
                              {invoice.type === "income" ? "+" : "-"}{formatCurrency(invoice.total, invoice.currency)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* EXPENSES TAB */}
              {activeTab === "expenses" && (
                <div className="rounded-[24px] bg-white border border-black/10 p-[28px]">
                  <div className="flex items-center justify-between mb-[24px]">
                    <h3 className="text-[20px] font-FoundersGrotesk uppercase text-[#111]">
                      Expense Tracker
                    </h3>
                    <button className="px-[24px] py-[10px] rounded-full bg-[#212121] text-white font-NeueMontreal hover:bg-[#333] transition flex items-center gap-[8px]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Expense
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
                            Title
                          </th>
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Category
                          </th>
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Vendor
                          </th>
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Status
                          </th>
                          <th className="text-right py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((expense) => (
                          <tr key={expense.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition">
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#111]">
                              {new Date(expense.date).toLocaleDateString()}
                            </td>
                            <td className="py-[16px] px-[16px]">
                              <p className="text-[14px] font-NeueMontreal font-medium text-[#111]">
                                {expense.title}
                              </p>
                              {expense.isRecurring && (
                                <span className="text-[11px] font-NeueMontreal text-[#6b7280]">
                                  🔄 {expense.recurringFrequency}
                                </span>
                              )}
                            </td>
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#6b7280]">
                              {EXPENSE_CATEGORY_LABELS[expense.category] || expense.category}
                            </td>
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#111]">
                              {expense.vendor}
                            </td>
                            <td className="py-[16px] px-[16px]">
                              {expense.status === "pending" ? (
                                <div className="flex gap-[8px]">
                                  <button
                                    onClick={() => handleApproveExpense(expense.id)}
                                    className="px-[10px] py-[4px] rounded-full bg-green-100 text-green-800 text-[12px] font-NeueMontreal font-medium hover:bg-green-200 transition"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleRejectExpense(expense.id)}
                                    className="px-[10px] py-[4px] rounded-full bg-red-100 text-red-800 text-[12px] font-NeueMontreal font-medium hover:bg-red-200 transition"
                                  >
                                    Reject
                                  </button>
                                </div>
                              ) : (
                                <span className={`px-[10px] py-[4px] rounded-full text-[12px] font-NeueMontreal font-medium ${EXPENSE_STATUS_COLORS[expense.status]}`}>
                                  {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                                </span>
                              )}
                            </td>
                            <td className="py-[16px] px-[16px] text-right text-[14px] font-NeueMontreal font-medium text-[#dc2626]">
                              {formatCurrency(expense.amount, expense.currency)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TECH BILLS TAB */}
              {activeTab === "techbills" && (
                <div className="space-y-[24px]">
                  {/* Yearly Summary */}
                  <div className="rounded-[24px] bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white p-[28px]">
                    <div className="flex items-center justify-between flex-wrap gap-[24px]">
                      <div>
                        <p className="text-[14px] font-NeueMontreal opacity-80">
                          Yearly Tech Infrastructure Cost
                        </p>
                        <p className="mt-[8px] text-[48px] font-FoundersGrotesk font-medium">
                          {formatCurrency(billingData.techBillYearlySummary.totalAnnualCost)}
                        </p>
                        <p className="mt-[8px] text-[14px] font-NeueMontreal opacity-80">
                          {formatCurrency(billingData.techBillYearlySummary.totalMonthlyEquivalent)}/month average
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] font-NeueMontreal opacity-80">
                          Active Services
                        </p>
                        <p className="mt-[8px] text-[36px] font-FoundersGrotesk font-medium">
                          {techBills.filter((b) => b.status === "active").length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Bills Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                    {techBills.map((bill) => {
                      const nextDate = new Date(bill.nextBillingDate);
                      const now = new Date();
                      const daysUntil = Math.ceil((nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

                      return (
                        <div
                          key={bill.id}
                          className={`rounded-[24px] border p-[24px] transition-all duration-300 hover:shadow-lg ${
                            bill.status === "active"
                              ? "bg-white border-black/10"
                              : "bg-gray-50 border-gray-200 opacity-75"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-[16px]">
                            <div className="w-[48px] h-[48px] rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-[24px]">
                              {bill.category === "domain" ? "🌐" :
                               bill.category === "hosting" ? "🖥️" :
                               bill.category === "ai_api" ? "🤖" :
                               bill.category === "security" ? "🔒" :
                               bill.category === "communication" ? "💬" :
                               bill.category === "design_tools" ? "🎨" :
                               bill.category === "development" ? "💻" :
                               bill.category === "monitoring" ? "📊" : "📦"}
                            </div>
                            <span className={`px-[10px] py-[4px] rounded-full text-[11px] font-NeueMontreal font-medium ${
                              bill.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}>
                              {bill.status}
                            </span>
                          </div>

                          <h4 className="text-[18px] font-FoundersGrotesk text-[#111]">
                            {bill.name}
                          </h4>
                          <p className="text-[13px] font-NeueMontreal text-[#6b7280] mt-[4px]">
                            {bill.provider}
                          </p>

                          <div className="mt-[20px] flex items-end justify-between">
                            <div>
                              <p className="text-[24px] font-FoundersGrotesk font-medium text-[#2563eb]">
                                {formatCurrency(bill.cost, bill.currency)}
                              </p>
                              <p className="text-[12px] font-NeueMontreal text-[#6b7280]">
                                /{bill.billingFrequency === "monthly" ? "mo" : bill.billingFrequency === "quarterly" ? "qtr" : "yr"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-[12px] font-NeueMontreal text-[#6b7280]">
                                Next bill
                              </p>
                              <p className={`text-[14px] font-NeueMontreal font-medium ${daysUntil <= 7 ? "text-yellow-600" : daysUntil <= 30 ? "text-orange-600" : "text-[#6b7280]"}`}>
                                {nextDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </p>
                              {daysUntil <= 30 && bill.status === "active" && (
                                <span className="text-[11px] font-NeueMontreal text-yellow-600">
                                  in {daysUntil} days
                                </span>
                              )}
                            </div>
                          </div>

                          {bill.autoRenew && bill.status === "active" && (
                            <div className="mt-[16px] pt-[16px] border-t border-[#e5e7eb] flex items-center gap-[8px]">
                              <span className="text-[12px] font-NeueMontreal text-[#6b7280]">
                                🔄 Auto-renew enabled
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <div className="py-[40px] text-center text-[#212121]/40 text-sm border-t border-black/5 mt-[60px]">
          <p>© 2024 Budget Ndio Story - Billing System</p>
        </div>
      </div>
    </>
  );
}
