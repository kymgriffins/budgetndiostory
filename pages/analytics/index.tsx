"use client";

import Head from "next/head";
import { useEffect, useState } from "react";

interface AnalyticsStats {
  totalPageViews: number;
  uniqueVisitors: number;
  totalEvents: number;
  topPages: { key: string; count: number }[];
  topReferrers: { key: string; count: number }[];
  eventsByCategory: Record<string, number>;
  dailyViews: { date: string; views: number }[];
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("7");

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      const days = parseInt(dateRange);
      const endDate = Date.now();
      const startDate = endDate - days * 24 * 60 * 60 * 1000;

      const res = await fetch(
        `/api/analytics?startDate=${startDate}&endDate=${endDate}`,
      );
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const maxViews =
    stats?.dailyViews.reduce(
      (max, day) => (day.views > max ? day.views : max),
      0,
    ) || 1;

  return (
    <>
      <Head>
        <title>Analytics Dashboard | Budget Ndio Story</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          color: "#fff",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
              Analytics Dashboard
            </h1>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                padding: "0.5rem 1rem",
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
              }}
            >
              <option value="7">Last 7 days</option>
              <option value="14">Last 14 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </header>

          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem" }}>
              Loading analytics...
            </div>
          ) : stats ? (
            <>
              {/* Stats Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <StatCard
                  label="Total Page Views"
                  value={stats.totalPageViews.toLocaleString()}
                />
                <StatCard
                  label="Unique Visitors"
                  value={stats.uniqueVisitors.toLocaleString()}
                />
                <StatCard
                  label="Total Events"
                  value={stats.totalEvents.toLocaleString()}
                />
                <StatCard
                  label="Events Tracked"
                  value={Object.values(stats.eventsByCategory)
                    .reduce((a, b) => a + b, 0)
                    .toLocaleString()}
                />
              </div>

              {/* Daily Views Chart */}
              <section
                style={{
                  background: "#1a1a1a",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
                  Daily Page Views
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "4px",
                    height: "200px",
                  }}
                >
                  {stats.dailyViews.map((day, i) => (
                    <div
                      key={day.date}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: `${(day.views / maxViews) * 150}px`,
                          background:
                            "linear-gradient(180deg, #4ade80 0%, #22c55e 100%)",
                          borderRadius: "4px 4px 0 0",
                          transition: "height 0.3s ease",
                        }}
                        title={`${day.date}: ${day.views} views`}
                      />
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          marginTop: "4px",
                        }}
                      >
                        {new Date(day.date).getDate()}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Top Pages & Referrers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <section
                  style={{
                    background: "#1a1a1a",
                    borderRadius: "12px",
                    padding: "1.5rem",
                  }}
                >
                  <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
                    Top Pages
                  </h2>
                  <ul>
                    {stats.topPages.map((page, i) => (
                      <li
                        key={page.key}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0.75rem 0",
                          borderBottom:
                            i < stats.topPages.length - 1
                              ? "1px solid #333"
                              : "none",
                        }}
                      >
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "200px",
                          }}
                        >
                          {page.key || "/"}
                        </span>
                        <span style={{ color: "#888" }}>
                          {page.count.toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  style={{
                    background: "#1a1a1a",
                    borderRadius: "12px",
                    padding: "1.5rem",
                  }}
                >
                  <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
                    Top Referrers
                  </h2>
                  <ul>
                    {stats.topReferrers.map((ref, i) => (
                      <li
                        key={ref.key}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0.75rem 0",
                          borderBottom:
                            i < stats.topReferrers.length - 1
                              ? "1px solid #333"
                              : "none",
                        }}
                      >
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "200px",
                          }}
                        >
                          {ref.key || "(direct)"}
                        </span>
                        <span style={{ color: "#888" }}>
                          {ref.count.toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  style={{
                    background: "#1a1a1a",
                    borderRadius: "12px",
                    padding: "1.5rem",
                  }}
                >
                  <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
                    Events by Category
                  </h2>
                  <ul>
                    {Object.entries(stats.eventsByCategory)
                      .sort((a, b) => b[1] - a[1])
                      .map(([category, count], i, arr) => (
                        <li
                          key={category}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0.75rem 0",
                            borderBottom:
                              i < arr.length - 1 ? "1px solid #333" : "none",
                          }}
                        >
                          <span>{category}</span>
                          <span style={{ color: "#888" }}>
                            {count.toLocaleString()}
                          </span>
                        </li>
                      ))}
                  </ul>
                </section>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem" }}>
              No data available
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        borderRadius: "12px",
        padding: "1.5rem",
      }}
    >
      <p
        style={{ color: "#888", fontSize: "0.875rem", marginBottom: "0.5rem" }}
      >
        {label}
      </p>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
