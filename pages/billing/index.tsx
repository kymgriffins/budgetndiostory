import billingData from "@/mockdata/billing.json";
import { Expense, Invoice, TechBill } from "@/mockdata/types";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [invoices, setInvoices] = useState<Invoice[]>(
    billingData.invoices as Invoice[],
  );
  const [expenses, setExpenses] = useState<Expense[]>(
    billingData.expenses as Expense[],
  );
  const [techBills, setTechBills] = useState<TechBill[]>(
    billingData.techBills as TechBill[],
  );
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [showModal, setShowModal] = useState<{
    type: "invoice" | "expense" | null;
  }>({ type: null });
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isEditingInvoice, setIsEditingInvoice] = useState(false);

  // Dynamic invoice items state
  const [invoiceItems, setInvoiceItems] = useState<any[]>([
    { id: "item-1", description: "", quantity: 1, unitPrice: 0, amount: 0 },
  ]);

  // Add new invoice item
  const addInvoiceItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        id: `item-${Date.now()}`,
        description: "",
        quantity: 1,
        unitPrice: 0,
        amount: 0,
      },
    ]);
  };

  // Remove invoice item
  const removeInvoiceItem = (itemId: string) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter((item) => item.id !== itemId));
    }
  };

  // Update invoice item
  const updateInvoiceItem = (itemId: string, field: string, value: any) => {
    setInvoiceItems(
      invoiceItems.map((item) => {
        if (item.id === itemId) {
          const updated = { ...item, [field]: value };
          // Recalculate amount
          if (field === "quantity" || field === "unitPrice") {
            updated.amount = updated.quantity * updated.unitPrice;
          }
          return updated;
        }
        return item;
      }),
    );
  };

  // DEBUG: Log CRUD capabilities
  useEffect(() => {
    console.log("[BILLING DEBUG] Initial State:");
    console.log("[BILLING DEBUG] - Invoices count:", invoices.length);
    console.log("[BILLING DEBUG] - Expenses count:", expenses.length);
    console.log("[BILLING DEBUG] - TechBills count:", techBills.length);
    console.log(
      "[BILLING DEBUG] - CRUD Status: READ=✓, UPDATE=✓, CREATE=✓, DELETE=✓",
    );
    console.log("[BILLING DEBUG] - API Endpoints: /api/billing EXISTS=", true);
  }, [invoices, expenses, techBills]);

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
      const monthlyCost =
        b.billingFrequency === "monthly"
          ? b.cost
          : b.billingFrequency === "quarterly"
            ? b.cost / 3
            : b.cost / 12;
      return sum + monthlyCost;
    }, 0);

  const pendingInvoices = invoices.filter(
    (i) => i.status === "sent" || i.status === "draft",
  );
  const pendingExpenses = expenses.filter((e) => e.status === "pending");
  const upcomingBills = techBills.filter((b) => {
    const nextDate = new Date(b.nextBillingDate);
    const now = new Date();
    const daysUntil = Math.ceil(
      (nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysUntil <= 30 && b.status === "active";
  });

  const handleApproveExpense = (expenseId: string) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === expenseId
          ? {
              ...e,
              status: "approved",
              approvedDate: new Date().toISOString().split("T")[0],
              updatedAt: new Date().toISOString(),
            }
          : e,
      ),
    );
    showNotify("success", "Expense approved successfully");
  };

  const handleRejectExpense = (expenseId: string) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === expenseId
          ? { ...e, status: "rejected", updatedAt: new Date().toISOString() }
          : e,
      ),
    );
    showNotify("info", "Expense rejected");
  };

  // CRUD: Create handlers
  const handleAddExpense = () => {
    console.log("[BILLING] Opening expense creation modal");
    setShowModal({ type: "expense" });
  };

  const handleCreateInvoice = () => {
    console.log("[BILLING] Opening invoice creation modal");
    setShowModal({ type: "invoice" });
  };

  // CRUD: Delete handlers
  const handleDeleteInvoice = async (invoiceId: string) => {
    console.log("[BILLING] Deleting invoice:", invoiceId);
    setInvoices((prev) => prev.filter((i) => i.id !== invoiceId));
    showNotify("success", "Invoice deleted successfully");

    // Call API
    try {
      await fetch(`/api/billing?entity=invoice&id=${invoiceId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("[BILLING] Error deleting invoice:", error);
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    console.log("[BILLING] Deleting expense:", expenseId);
    setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    showNotify("success", "Expense deleted successfully");

    // Call API
    try {
      await fetch(`/api/billing?entity=expense&id=${expenseId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("[BILLING] Error deleting expense:", error);
    }
  };

  const handleDeleteTechBill = async (techBillId: string) => {
    console.log("[BILLING] Deleting tech bill:", techBillId);
    setTechBills((prev) => prev.filter((b) => b.id !== techBillId));
    showNotify("success", "Tech bill deleted successfully");

    // Call API
    try {
      await fetch(`/api/billing?entity=techbill&id=${techBillId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("[BILLING] Error deleting tech bill:", error);
    }
  };

  // Modal form handlers
  const handleSubmitExpense = async (expenseData: any) => {
    console.log("[BILLING] Creating expense:", expenseData);
    const newExpense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
    showNotify("success", "Expense added successfully");
    setShowModal({ type: null });

    // Call API
    try {
      await fetch("/api/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entity: "expense", data: newExpense }),
      });
    } catch (error) {
      console.error("[BILLING] Error creating expense:", error);
    }
  };

  const handleSubmitInvoice = async (invoiceData: any) => {
    console.log("[BILLING] Creating invoice:", invoiceData);

    // Get items from hidden field
    const items = JSON.parse(invoiceData.items || "[]");

    // Calculate subtotal from items
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + (item.amount || 0),
      0,
    );

    const newInvoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
      items,
      subtotal,
      taxRate: 0,
      taxAmount: 0,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setInvoices((prev) => [...prev, newInvoice]);
    showNotify("success", "Invoice created successfully");

    // Reset invoice items
    setInvoiceItems([
      { id: "item-1", description: "", quantity: 1, unitPrice: 0, amount: 0 },
    ]);
    setShowModal({ type: null });

    // Call API
    try {
      await fetch("/api/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entity: "invoice", data: newInvoice }),
      });
    } catch (error) {
      console.error("[BILLING] Error creating invoice:", error);
    }
  };

  const handleUpdateInvoice = async (invoiceData: Invoice) => {
    console.log("[BILLING] Updating invoice:", invoiceData);
    const updatedInvoice = {
      ...invoiceData,
      updatedAt: new Date().toISOString(),
    };
    setInvoices((prev) =>
      prev.map((i) => (i.id === invoiceData.id ? updatedInvoice : i)),
    );
    setSelectedInvoice(updatedInvoice);
    showNotify("success", "Invoice updated successfully");
    setIsEditingInvoice(false);

    // Call API
    try {
      await fetch("/api/billing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity: "invoice",
          id: invoiceData.id,
          data: updatedInvoice,
        }),
      });
    } catch (error) {
      console.error("[BILLING] Error updating invoice:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Billing Dashboard - Budget Ndio Story</title>
        <meta
          name="description"
          content="Manage invoices, expenses, and tech bills"
        />
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
            {notification.type === "success"
              ? "✓"
              : notification.type === "error"
                ? "✕"
                : "ℹ"}
          </span>
          <span className="font-NeueMontreal text-[14px]">
            {notification.message}
          </span>
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
                    Track invoices, manage expenses, and monitor tech
                    infrastructure costs.
                  </p>
                </div>
                <div className="flex items-center gap-[12px] flex-wrap">
                  <Link
                    href="/home"
                    className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition"
                  >
                    ← Back to Home
                  </Link>
                  <button
                    onClick={handleAddExpense}
                    className="px-[24px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:bg-[#333] transition flex items-center gap-[8px]"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
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
                  <p
                    className={`mt-[8px] text-[28px] font-FoundersGrotesk font-medium ${totalIncome - totalExpenses >= 0 ? "text-[#059669]" : "text-[#dc2626]"}`}
                  >
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
                    {techBills.filter((b) => b.status === "active").length}{" "}
                    active services
                  </p>
                </div>

                {/* Pending Actions */}
                <div className="relative rounded-[24px] bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-[24px] overflow-hidden">
                  <p className="text-[13px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                    Pending Actions
                  </p>
                  <p className="mt-[8px] text-[28px] font-FoundersGrotesk font-medium text-[#d97706]">
                    {pendingInvoices.length +
                      pendingExpenses.length +
                      upcomingBills.length}
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
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between p-[16px] rounded-[12px] bg-[#f9fafb]"
                        >
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
                              Due:{" "}
                              {new Date(invoice.dueDate).toLocaleDateString()}
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
                        <div
                          key={expense.id}
                          className="flex items-center justify-between p-[16px] rounded-[12px] bg-[#f9fafb]"
                        >
                          <div className="flex-1">
                            <p className="text-[14px] font-NeueMontreal font-medium text-[#111]">
                              {expense.title}
                            </p>
                            <p className="text-[12px] font-NeueMontreal text-[#6b7280]">
                              {EXPENSE_CATEGORY_LABELS[expense.category] ||
                                expense.category}
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
                      {Object.entries(TECH_BILL_CATEGORY_LABELS).map(
                        ([key, label]) => {
                          const categoryTotal = techBills
                            .filter(
                              (b) =>
                                b.category === key && b.status === "active",
                            )
                            .reduce((sum, b) => {
                              const monthly =
                                b.billingFrequency === "monthly"
                                  ? b.cost
                                  : b.billingFrequency === "quarterly"
                                    ? b.cost / 3
                                    : b.cost / 12;
                              return sum + monthly;
                            }, 0);
                          if (categoryTotal === 0) return null;
                          return (
                            <div
                              key={key}
                              className="p-[16px] rounded-[16px] bg-[#f9fafb]"
                            >
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
                        },
                      )}
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
                    <button
                      onClick={handleCreateInvoice}
                      className="px-[24px] py-[10px] rounded-full bg-[#212121] text-white font-NeueMontreal hover:bg-[#333] transition flex items-center gap-[8px]"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
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
                          <th className="text-center py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((invoice) => (
                          <tr
                            key={invoice.id}
                            className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition cursor-pointer"
                            onClick={() => setSelectedInvoice(invoice)}
                          >
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal font-medium text-[#111]">
                              {invoice.invoiceNumber}
                            </td>
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#111]">
                              {invoice.clientName}
                            </td>
                            <td className="py-[16px] px-[16px]">
                              <span
                                className={`px-[10px] py-[4px] rounded-full text-[12px] font-NeueMontreal font-medium ${
                                  invoice.type === "income"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {invoice.type.charAt(0).toUpperCase() +
                                  invoice.type.slice(1)}
                              </span>
                            </td>
                            <td className="py-[16px] px-[16px]">
                              <span
                                className={`px-[10px] py-[4px] rounded-full text-[12px] font-NeueMontreal font-medium ${INVOICE_STATUS_COLORS[invoice.status]}`}
                              >
                                {invoice.status.charAt(0).toUpperCase() +
                                  invoice.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#6b7280]">
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </td>
                            <td
                              className={`py-[16px] px-[16px] text-right text-[14px] font-NeueMontreal font-medium ${invoice.type === "income" ? "text-green-600" : "text-red-600"}`}
                            >
                              {invoice.type === "income" ? "+" : "-"}
                              {formatCurrency(invoice.total, invoice.currency)}
                            </td>
                            <td className="py-[16px] px-[16px] text-center">
                              <button
                                onClick={() => handleDeleteInvoice(invoice.id)}
                                className="w-[28px] h-[28px] rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition"
                                title="Delete"
                              >
                                🗑️
                              </button>
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
                    <button
                      onClick={handleAddExpense}
                      className="px-[24px] py-[10px] rounded-full bg-[#212121] text-white font-NeueMontreal hover:bg-[#333] transition flex items-center gap-[8px]"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
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
                          <th className="text-center py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((expense) => (
                          <tr
                            key={expense.id}
                            className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition"
                          >
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
                              {EXPENSE_CATEGORY_LABELS[expense.category] ||
                                expense.category}
                            </td>
                            <td className="py-[16px] px-[16px] text-[14px] font-NeueMontreal text-[#111]">
                              {expense.vendor}
                            </td>
                            <td className="py-[16px] px-[16px]">
                              {expense.status === "pending" ? (
                                <div className="flex gap-[8px]">
                                  <button
                                    onClick={() =>
                                      handleApproveExpense(expense.id)
                                    }
                                    className="px-[10px] py-[4px] rounded-full bg-green-100 text-green-800 text-[12px] font-NeueMontreal font-medium hover:bg-green-200 transition"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleRejectExpense(expense.id)
                                    }
                                    className="px-[10px] py-[4px] rounded-full bg-red-100 text-red-800 text-[12px] font-NeueMontreal font-medium hover:bg-red-200 transition"
                                  >
                                    Reject
                                  </button>
                                </div>
                              ) : (
                                <span
                                  className={`px-[10px] py-[4px] rounded-full text-[12px] font-NeueMontreal font-medium ${EXPENSE_STATUS_COLORS[expense.status]}`}
                                >
                                  {expense.status.charAt(0).toUpperCase() +
                                    expense.status.slice(1)}
                                </span>
                              )}
                            </td>
                            <td className="py-[16px] px-[16px] text-right text-[14px] font-NeueMontreal font-medium text-[#dc2626]">
                              {formatCurrency(expense.amount, expense.currency)}
                            </td>
                            <td className="py-[16px] px-[16px] text-center">
                              <button
                                onClick={() => handleDeleteExpense(expense.id)}
                                className="w-[28px] h-[28px] rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition"
                                title="Delete"
                              >
                                🗑️
                              </button>
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
                          {formatCurrency(
                            billingData.techBillYearlySummary.totalAnnualCost,
                          )}
                        </p>
                        <p className="mt-[8px] text-[14px] font-NeueMontreal opacity-80">
                          {formatCurrency(
                            billingData.techBillYearlySummary
                              .totalMonthlyEquivalent,
                          )}
                          /month average
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] font-NeueMontreal opacity-80">
                          Active Services
                        </p>
                        <p className="mt-[8px] text-[36px] font-FoundersGrotesk font-medium">
                          {
                            techBills.filter((b) => b.status === "active")
                              .length
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Bills Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                    {techBills.map((bill) => {
                      const nextDate = new Date(bill.nextBillingDate);
                      const now = new Date();
                      const daysUntil = Math.ceil(
                        (nextDate.getTime() - now.getTime()) /
                          (1000 * 60 * 60 * 24),
                      );

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
                              {bill.category === "domain"
                                ? "🌐"
                                : bill.category === "hosting"
                                  ? "🖥️"
                                  : bill.category === "ai_api"
                                    ? "🤖"
                                    : bill.category === "security"
                                      ? "🔒"
                                      : bill.category === "communication"
                                        ? "💬"
                                        : bill.category === "design_tools"
                                          ? "🎨"
                                          : bill.category === "development"
                                            ? "💻"
                                            : bill.category === "monitoring"
                                              ? "📊"
                                              : "📦"}
                            </div>
                            <span
                              className={`px-[10px] py-[4px] rounded-full text-[11px] font-NeueMontreal font-medium ${
                                bill.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
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
                                /
                                {bill.billingFrequency === "monthly"
                                  ? "mo"
                                  : bill.billingFrequency === "quarterly"
                                    ? "qtr"
                                    : "yr"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-[12px] font-NeueMontreal text-[#6b7280]">
                                Next bill
                              </p>
                              <p
                                className={`text-[14px] font-NeueMontreal font-medium ${daysUntil <= 7 ? "text-yellow-600" : daysUntil <= 30 ? "text-orange-600" : "text-[#6b7280]"}`}
                              >
                                {nextDate.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
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

                          {/* Delete button */}
                          <div className="mt-[12px] pt-[12px] border-t border-[#e5e7eb] flex items-center justify-center">
                            <button
                              onClick={() => handleDeleteTechBill(bill.id)}
                              className="text-[12px] font-NeueMontreal text-red-600 hover:text-red-800 transition flex items-center gap-[4px]"
                            >
                              🗑️ Delete
                            </button>
                          </div>
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

      {/* MODAL: Add Expense Form */}
      {showModal.type === "expense" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-[24px] p-[32px] max-w-[500px] w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-[24px] font-FoundersGrotesk uppercase text-[#111] mb-[24px]">
              Add New Expense
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleSubmitExpense({
                  title: formData.get("title"),
                  description: formData.get("description"),
                  category: formData.get("category"),
                  amount: parseFloat(formData.get("amount") as string),
                  currency: formData.get("currency"),
                  date: formData.get("date"),
                  vendor: formData.get("vendor"),
                  isRecurring: formData.get("isRecurring") === "on",
                  recurringFrequency: formData.get("recurringFrequency"),
                });
              }}
            >
              <div className="space-y-[16px]">
                <div>
                  <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                    Title
                  </label>
                  <input
                    name="title"
                    required
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    placeholder="Expense title"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    placeholder="Expense description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-[16px]">
                  <div>
                    <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                      Category
                    </label>
                    <select
                      name="category"
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    >
                      {Object.entries(EXPENSE_CATEGORY_LABELS).map(
                        ([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                      Amount
                    </label>
                    <input
                      name="amount"
                      type="number"
                      step="0.01"
                      required
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[16px]">
                  <div>
                    <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                      Currency
                    </label>
                    <select
                      name="currency"
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    >
                      <option value="USD">USD</option>
                      <option value="KES">KES</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                      Date
                    </label>
                    <input
                      name="date"
                      type="date"
                      required
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                    Vendor
                  </label>
                  <input
                    name="vendor"
                    required
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    placeholder="Vendor name"
                  />
                </div>
                <div className="flex items-center gap-[12px]">
                  <input
                    type="checkbox"
                    name="isRecurring"
                    id="isRecurring"
                    className="w-[18px] h-[18px] rounded"
                  />
                  <label
                    htmlFor="isRecurring"
                    className="text-[14px] font-NeueMontreal"
                  >
                    This is a recurring expense
                  </label>
                </div>
                <div>
                  <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                    Recurring Frequency
                  </label>
                  <select
                    name="recurringFrequency"
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-[12px] mt-[24px]">
                <button
                  type="button"
                  onClick={() => setShowModal({ type: null })}
                  className="px-[24px] py-[12px] rounded-full border border-[#e5e7eb] text-[#6b7280] hover:border-[#212121] hover:text-[#212121] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-[24px] py-[12px] rounded-full bg-[#212121] text-white hover:bg-[#333] transition"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Create Invoice Form */}
      {showModal.type === "invoice" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-[24px] p-[32px] max-w-[500px] w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-[24px] font-FoundersGrotesk uppercase text-[#111] mb-[24px]">
              Create New Invoice
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleSubmitInvoice({
                  invoiceNumber: formData.get("invoiceNumber"),
                  type: formData.get("type"),
                  clientName: formData.get("clientName"),
                  clientEmail: formData.get("clientEmail"),
                  clientAddress: formData.get("clientAddress"),
                  description: formData.get("description"),
                  total: parseFloat(formData.get("total") as string),
                  currency: formData.get("currency"),
                  dueDate: formData.get("dueDate"),
                  issueDate: formData.get("issueDate"),
                });
              }}
            >
              <div className="space-y-[16px]">
                <div className="grid grid-cols-2 gap-[16px]">
                  <div>
                    <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                      Invoice Number
                    </label>
                    <input
                      name="invoiceNumber"
                      required
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                      placeholder="INV-2024-001"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                      Type
                    </label>
                    <select
                      name="type"
                      className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                    Client Name
                  </label>
                  <input
                    name="clientName"
                    required
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                    Client Email
                  </label>
                  <input
                    name="clientEmail"
                    type="email"
                    required
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    placeholder="client@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                    Client Address
                  </label>
                  <textarea
                    name="clientAddress"
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    placeholder="Client address"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    placeholder="Invoice description"
                    rows={2}
                  />
                </div>

                {/* Dynamic Invoice Items Section */}
                <div className="mt-[24px]">
                  <div className="flex items-center justify-between mb-[16px]">
                    <h3 className="text-[16px] font-NeueMontreal font-medium text-[#111]">
                      Invoice Items
                    </h3>
                    <button
                      type="button"
                      onClick={addInvoiceItem}
                      className="px-[16px] py-[8px] rounded-full bg-[#212121] text-white text-[12px] font-NeueMontreal hover:bg-[#333] transition flex items-center gap-[8px]"
                    >
                      + Add Item
                    </button>
                  </div>

                  <div className="bg-[#f9fafb] rounded-[16px] overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#e5e7eb]">
                          <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280] w-[40%]">
                            Description
                          </th>
                          <th className="text-right py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280] w-[15%]">
                            Qty
                          </th>
                          <th className="text-right py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280] w-[20%]">
                            Unit Price
                          </th>
                          <th className="text-right py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280] w-[20%]">
                            Amount
                          </th>
                          <th className="text-center py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280] w-[5%]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceItems.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-[#e5e7eb]"
                          >
                            <td className="py-[8px] px-[16px]">
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) =>
                                  updateInvoiceItem(
                                    item.id,
                                    "description",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-[12px] py-[8px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                                placeholder="Item description"
                              />
                            </td>
                            <td className="py-[8px] px-[16px]">
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateInvoiceItem(
                                    item.id,
                                    "quantity",
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                className="w-full px-[12px] py-[8px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none text-right"
                                min="1"
                              />
                            </td>
                            <td className="py-[8px] px-[16px]">
                              <input
                                type="number"
                                value={item.unitPrice}
                                onChange={(e) =>
                                  updateInvoiceItem(
                                    item.id,
                                    "unitPrice",
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                className="w-full px-[12px] py-[8px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none text-right"
                                step="0.01"
                                min="0"
                              />
                            </td>
                            <td className="py-[8px] px-[16px] text-right">
                              <span className="text-[14px] font-NeueMontreal font-medium text-[#111]">
                                {formatCurrency(item.amount, "USD")}
                              </span>
                            </td>
                            <td className="py-[8px] px-[16px] text-center">
                              {invoiceItems.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeInvoiceItem(item.id)}
                                  className="text-[18px] text-red-500 hover:text-red-700"
                                >
                                  ×
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-[#e5e7eb] bg-[#f3f4f6]">
                          <td
                            colSpan={3}
                            className="py-[12px] px-[16px] text-right text-[14px] font-NeueMontreal font-medium text-[#111]"
                          >
                            Subtotal
                          </td>
                          <td className="py-[12px] px-[16px] text-right text-[14px] font-NeueMontreal font-medium text-[#111]">
                            {formatCurrency(
                              invoiceItems.reduce(
                                (sum, item) => sum + item.amount,
                                0,
                              ),
                              "USD",
                            )}
                          </td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Hidden total field - calculated from items */}
                <input
                  type="hidden"
                  name="total"
                  value={invoiceItems.reduce(
                    (sum, item) => sum + item.amount,
                    0,
                  )}
                />
                <input
                  type="hidden"
                  name="items"
                  value={JSON.stringify(invoiceItems)}
                />
              </div>

              {/* Dates section */}
              <div className="grid grid-cols-2 gap-[16px] mt-[24px]">
                <div>
                  <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                    Issue Date
                  </label>
                  <input
                    name="issueDate"
                    type="date"
                    required
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                    Due Date
                  </label>
                  <input
                    name="dueDate"
                    type="date"
                    required
                    className="w-full px-[16px] py-[12px] rounded-[12px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                  />
                </div>
              </div>

              {/* Form actions */}
              <div className="flex items-center gap-[12px] mt-[24px]">
                <button
                  type="button"
                  onClick={() => {
                    setInvoiceItems([
                      {
                        id: "item-1",
                        description: "",
                        quantity: 1,
                        unitPrice: 0,
                        amount: 0,
                      },
                    ]);
                    setShowModal({ type: null });
                  }}
                  className="px-[24px] py-[12px] rounded-full border border-[#e5e7eb] text-[#6b7280] hover:border-[#212121] hover:text-[#212121] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-[24px] py-[12px] rounded-full bg-[#212121] text-white hover:bg-[#333] transition"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Invoice Detail View */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-[24px] p-[32px] max-w-[700px] w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-[24px]">
              <h2 className="text-[24px] font-FoundersGrotesk uppercase text-[#111]">
                Invoice Details
              </h2>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-[24px] text-[#6b7280] hover:text-[#212121]"
              >
                ✕
              </button>
            </div>

            {/* Invoice Header */}
            <div className="grid grid-cols-2 gap-[24px] mb-[24px]">
              <div>
                <p className="text-[12px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                  Invoice Number
                </p>
                <p className="text-[18px] font-FoundersGrotesk text-[#111]">
                  {selectedInvoice.invoiceNumber}
                </p>
              </div>
              <div>
                <p className="text-[12px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                  Status
                </p>
                <span
                  className={`inline-block mt-[4px] px-[12px] py-[4px] rounded-full text-[12px] font-NeueMontreal font-medium ${INVOICE_STATUS_COLORS[selectedInvoice.status]}`}
                >
                  {selectedInvoice.status.charAt(0).toUpperCase() +
                    selectedInvoice.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-[12px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                  Type
                </p>
                <span
                  className={`inline-block mt-[4px] px-[12px] py-[4px] rounded-full text-[12px] font-NeueMontreal font-medium ${selectedInvoice.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {selectedInvoice.type.charAt(0).toUpperCase() +
                    selectedInvoice.type.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-[12px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                  Total Amount
                </p>
                <p className="text-[24px] font-FoundersGrotesk font-medium text-[#2563eb]">
                  {formatCurrency(
                    selectedInvoice.total,
                    selectedInvoice.currency,
                  )}
                </p>
              </div>
            </div>

            {/* Client Info */}
            <div className="bg-[#f9fafb] rounded-[16px] p-[20px] mb-[24px]">
              <h3 className="text-[14px] font-NeueMontreal font-medium text-[#111] mb-[12px]">
                Client Information
              </h3>
              <p className="text-[14px] font-NeueMontreal text-[#111]">
                {selectedInvoice.clientName}
              </p>
              <p className="text-[13px] font-NeueMontreal text-[#6b7280]">
                {selectedInvoice.clientEmail}
              </p>
              {selectedInvoice.clientAddress && (
                <p className="text-[13px] font-NeueMontreal text-[#6b7280]">
                  {selectedInvoice.clientAddress}
                </p>
              )}
            </div>

            {/* Description */}
            {selectedInvoice.description && (
              <div className="mb-[24px]">
                <h3 className="text-[14px] font-NeueMontreal font-medium text-[#111] mb-[8px]">
                  Description
                </h3>
                <p className="text-[14px] font-NeueMontreal text-[#6b7280]">
                  {selectedInvoice.description}
                </p>
              </div>
            )}

            {/* Invoice Items */}
            <div className="mb-[24px]">
              <h3 className="text-[14px] font-NeueMontreal font-medium text-[#111] mb-[12px]">
                Invoice Items
              </h3>
              <div className="bg-[#f9fafb] rounded-[16px] overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e5e7eb]">
                      <th className="text-left py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                        Description
                      </th>
                      <th className="text-right py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                        Qty
                      </th>
                      <th className="text-right py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                        Unit Price
                      </th>
                      <th className="text-right py-[12px] px-[16px] text-[12px] font-NeueMontreal uppercase tracking-wider text-[#6b7280]">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items?.map((item: any) => (
                      <tr key={item.id} className="border-b border-[#e5e7eb]">
                        <td className="py-[12px] px-[16px] text-[14px] font-NeueMontreal text-[#111]">
                          {item.description}
                        </td>
                        <td className="py-[12px] px-[16px] text-right text-[14px] font-NeueMontreal text-[#6b7280]">
                          {item.quantity}
                        </td>
                        <td className="py-[12px] px-[16px] text-right text-[14px] font-NeueMontreal text-[#6b7280]">
                          {formatCurrency(
                            item.unitPrice,
                            selectedInvoice.currency,
                          )}
                        </td>
                        <td className="py-[12px] px-[16px] text-right text-[14px] font-NeueMontreal font-medium text-[#111]">
                          {formatCurrency(
                            item.amount,
                            selectedInvoice.currency,
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-[#e5e7eb]">
                      <td
                        colSpan={3}
                        className="py-[12px] px-[16px] text-right text-[14px] font-NeueMontreal font-medium text-[#111]"
                      >
                        Subtotal
                      </td>
                      <td className="py-[12px] px-[16px] text-right text-[14px] font-NeueMontreal text-[#111]">
                        {formatCurrency(
                          selectedInvoice.subtotal,
                          selectedInvoice.currency,
                        )}
                      </td>
                    </tr>
                    {selectedInvoice.taxAmount > 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-[12px] px-[16px] text-right text-[14px] font-NeueMontreal text-[#6b7280]"
                        >
                          Tax ({selectedInvoice.taxRate}%)
                        </td>
                        <td className="py-[12px] px-[16px] text-right text-[14px] font-NeueMontreal text-[#6b7280]">
                          {formatCurrency(
                            selectedInvoice.taxAmount,
                            selectedInvoice.currency,
                          )}
                        </td>
                      </tr>
                    )}
                    <tr className="border-t border-[#e5e7eb] bg-[#f3f4f6]">
                      <td
                        colSpan={3}
                        className="py-[16px] px-[16px] text-right text-[16px] font-FoundersGrotesk font-medium text-[#111]"
                      >
                        Total
                      </td>
                      <td className="py-[16px] px-[16px] text-right text-[16px] font-FoundersGrotesk font-medium text-[#2563eb]">
                        {formatCurrency(
                          selectedInvoice.total,
                          selectedInvoice.currency,
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-3 gap-[16px] mb-[24px]">
              <div className="bg-[#f9fafb] rounded-[12px] p-[16px]">
                <p className="text-[11px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                  Issue Date
                </p>
                <p className="text-[14px] font-NeueMontreal text-[#111] mt-[4px]">
                  {new Date(selectedInvoice.issueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-[#f9fafb] rounded-[12px] p-[16px]">
                <p className="text-[11px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                  Due Date
                </p>
                <p className="text-[14px] font-NeueMontreal text-[#111] mt-[4px]">
                  {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                </p>
              </div>
              {selectedInvoice.paidDate && (
                <div className="bg-[#f9fafb] rounded-[12px] p-[16px]">
                  <p className="text-[11px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                    Paid Date
                  </p>
                  <p className="text-[14px] font-NeueMontreal text-[#111] mt-[4px]">
                    {new Date(selectedInvoice.paidDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {/* Payment Method */}
            {selectedInvoice.paymentMethod && (
              <div className="bg-[#f9fafb] rounded-[12px] p-[16px]">
                <p className="text-[11px] font-NeueMontreal text-[#6b7280] uppercase tracking-wider">
                  Payment Method
                </p>
                <p className="text-[14px] font-NeueMontreal text-[#111] mt-[4px]">
                  {selectedInvoice.paymentMethod}
                </p>
              </div>
            )}

            {/* View Mode Actions */}
            {!isEditingInvoice && (
              <div className="mt-[24px] flex justify-end gap-[12px]">
                <button
                  onClick={() => setIsEditingInvoice(true)}
                  className="px-[24px] py-[12px] rounded-full border border-[#e5e7eb] text-[#6b7280] hover:border-[#212121] hover:text-[#212121] transition flex items-center gap-[8px]"
                >
                  ✏️ Edit Invoice
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-[24px] py-[12px] rounded-full bg-[#212121] text-white hover:bg-[#333] transition"
                >
                  Close
                </button>
              </div>
            )}

            {/* Edit Mode Form */}
            {isEditingInvoice && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const updatedInvoice = {
                    ...selectedInvoice,
                    invoiceNumber: formData.get("invoiceNumber") as string,
                    type: formData.get("type") as "income" | "expense",
                    clientName: formData.get("clientName") as string,
                    clientEmail: formData.get("clientEmail") as string,
                    clientAddress:
                      (formData.get("clientAddress") as string) || "",
                    description: (formData.get("description") as string) || "",
                    total: parseFloat(formData.get("total") as string),
                    currency: formData.get("currency") as "USD" | "KES",
                    status: formData.get("status") as
                      | "draft"
                      | "sent"
                      | "paid"
                      | "overdue"
                      | "cancelled",
                    issueDate: formData.get("issueDate") as string,
                    dueDate: formData.get("dueDate") as string,
                  };
                  handleUpdateInvoice(updatedInvoice);
                }}
              >
                <div className="bg-[#f9fafb] rounded-[16px] p-[20px] mt-[24px]">
                  <h3 className="text-[14px] font-NeueMontreal font-medium text-[#111] mb-[16px]">
                    Edit Invoice
                  </h3>
                  <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
                    <div>
                      <label className="block text-[12px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                        Invoice Number
                      </label>
                      <input
                        name="invoiceNumber"
                        defaultValue={selectedInvoice.invoiceNumber}
                        className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                        Type
                      </label>
                      <select
                        name="type"
                        defaultValue={selectedInvoice.type}
                        className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
                    <div>
                      <label className="block text-[12px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                        Client Name
                      </label>
                      <input
                        name="clientName"
                        defaultValue={selectedInvoice.clientName}
                        className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                        Client Email
                      </label>
                      <input
                        name="clientEmail"
                        type="email"
                        defaultValue={selectedInvoice.clientEmail}
                        className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-[16px]">
                    <label className="block text-[12px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                      Client Address
                    </label>
                    <input
                      name="clientAddress"
                      defaultValue={selectedInvoice.clientAddress || ""}
                      className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    />
                  </div>
                  <div className="mb-[16px]">
                    <label className="block text-[12px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={selectedInvoice.description || ""}
                      rows={2}
                      className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-[16px] mb-[16px]">
                    <div>
                      <label className="block text-[12px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                        Total Amount
                      </label>
                      <input
                        name="total"
                        type="number"
                        step="0.01"
                        defaultValue={selectedInvoice.total}
                        className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                        Currency
                      </label>
                      <select
                        name="currency"
                        defaultValue={selectedInvoice.currency}
                        className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                      >
                        <option value="USD">USD</option>
                        <option value="KES">KES</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[12px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                        Status
                      </label>
                      <select
                        name="status"
                        defaultValue={selectedInvoice.status}
                        className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-[16px]">
                    <div>
                      <label className="block text-[12px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                        Issue Date
                      </label>
                      <input
                        name="issueDate"
                        type="date"
                        defaultValue={selectedInvoice.issueDate}
                        className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-NeueMontreal text-[#6b7280] mb-[8px]">
                        Due Date
                      </label>
                      <input
                        name="dueDate"
                        type="date"
                        defaultValue={selectedInvoice.dueDate}
                        className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#e5e7eb] focus:border-[#212121] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-[24px] flex justify-end gap-[12px]">
                  <button
                    type="button"
                    onClick={() => setIsEditingInvoice(false)}
                    className="px-[24px] py-[12px] rounded-full border border-[#e5e7eb] text-[#6b7280] hover:border-[#212121] hover:text-[#212121] transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-[24px] py-[12px] rounded-full bg-[#212121] text-white hover:bg-[#333] transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
