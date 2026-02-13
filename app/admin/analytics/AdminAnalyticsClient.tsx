"use client";

import { useState } from "react";

export default function AdminAnalyticsClient() {
  const [dateRange, setDateRange] = useState("30d");

  // Mock analytics data
  const stats = {
    pageViews: 45678,
    uniqueVisitors: 12345,
    avgSessionDuration: "3:24",
    bounceRate: "42%",
    newUsers: 2345,
    returningUsers: 10000,
  };

  const topPages = [
    { path: "/", views: 12500, change: "+12%" },
    { path: "/tracker", views: 8900, change: "+8%" },
    { path: "/blog/understanding-kenya-county-budget-process", views: 4500, change: "+25%" },
    { path: "/learn", views: 3200, change: "+15%" },
    { path: "/stories", views: 2800, change: "+5%" },
  ];

  const topCountries = [
    { country: "Kenya", visitors: 8500, percentage: "69%" },
    { country: "United States", visitors: 1500, percentage: "12%" },
    { country: "United Kingdom", visitors: 800, percentage: "6%" },
    { country: "Nigeria", visitors: 450, percentage: "4%" },
    { country: "Uganda", visitors: 350, percentage: "3%" },
  ];

  const trafficSources = [
    { source: "Direct", visits: 12500, percentage: "35%" },
    { source: "Google Search", visits: 10000, percentage: "28%" },
    { source: "Twitter/X", visits: 6500, percentage: "18%" },
    { source: "Facebook", visits: 4000, percentage: "11%" },
    { source: "Other", visits: 2500, percentage: "8%" },
  ];

  const dailyData = [
    { date: "Jan 1", views: 1200, visitors: 400 },
    { date: "Jan 2", views: 1350, visitors: 450 },
    { date: "Jan 3", views: 1100, visitors: 380 },
    { date: "Jan 4", views: 1450, visitors: 480 },
    { date: "Jan 5", views: 1600, visitors: 520 },
    { date: "Jan 6", views: 1550, visitors: 500 },
    { date: "Jan 7", views: 1400, visitors: 460 },
    { date: "Jan 8", views: 1650, visitors: 540 },
    { date: "Jan 9", views: 1800, visitors: 580 },
    { date: "Jan 10", views: 1750, visitors: 560 },
    { date: "Jan 11", views: 1900, visitors: 620 },
    { date: "Jan 12", views: 2100, visitors: 680 },
    { date: "Jan 13", views: 2050, visitors: 660 },
    { date: "Jan 14", views: 1950, visitors: 640 },
  ];

  const maxViews = Math.max(...dailyData.map((d) => d.views));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-500 mt-1">
              Track your website traffic, user engagement, and content performance.
            </p>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Page Views</span>
            <span className="text-xs text-green-600 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              +18%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.pageViews.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Unique Visitors</span>
            <span className="text-xs text-green-600 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              +12%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.uniqueVisitors.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Avg. Session</span>
            <span className="text-xs text-green-600 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              +5%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.avgSessionDuration}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Bounce Rate</span>
            <span className="text-xs text-red-600 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
              </svg>
              +3%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.bounceRate}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Traffic Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Traffic Overview</h2>
          <div className="h-64 flex items-end gap-1">
            {dailyData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-[#1a1a2e] rounded-t hover:bg-[#16213e] transition-all"
                  style={{ height: `${(day.views / maxViews) * 100}%` }}
                  title={`${day.views} views`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            {dailyData.filter((_, i) => i % 2 === 0).map((day) => (
              <span key={day.date}>{day.date}</span>
            ))}
          </div>
        </div>

        {/* User Types */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Types</h2>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#1a1a2e"
                  strokeWidth="3"
                  strokeDasharray={`${(stats.newUsers / (stats.newUsers + stats.returningUsers)) * 100}, 100`}
                  strokeDashoffset="25"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats.newUsers.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">New Users</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#1a1a2e] rounded-full"></div>
              <span className="text-sm text-gray-600">New: {Math.round((stats.newUsers / (stats.newUsers + stats.returningUsers)) * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
              <span className="text-sm text-gray-600">Returning: {Math.round((stats.returningUsers / (stats.newUsers + stats.returningUsers)) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Top Pages</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {topPages.map((page, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{page.path}</p>
                  <p className="text-xs text-gray-500">{page.views.toLocaleString()} views</p>
                </div>
                <span className="text-xs text-green-600 ml-2">{page.change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Top Countries</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {topCountries.map((country, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{country.country}</span>
                  <span className="text-sm text-gray-500">{country.visitors.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-[#1a1a2e] h-1.5 rounded-full"
                    style={{ width: country.percentage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Traffic Sources</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {trafficSources.map((source, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#1a1a2e] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">{source.source}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{source.percentage}</p>
                  <p className="text-xs text-gray-500">{source.visits.toLocaleString()} visits</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Help Card */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Understanding Your Analytics</h3>
            <p className="text-sm text-blue-700 mt-1 mb-3">
              Here's what these metrics mean for your content strategy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-blue-800">
              <p><strong>Page Views:</strong> Total times pages were viewed</p>
              <p><strong>Unique Visitors:</strong> Individual users who visited</p>
              <p><strong>Session Duration:</strong> Average time spent on site</p>
              <p><strong>Bounce Rate:</strong> Visitors who left after one page</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
