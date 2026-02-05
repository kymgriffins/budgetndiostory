"use client";

import Head from "next/head";
import { useState } from "react";
import YouTubePlayer from "@/components/YouTubePlayer";
import { extractYouTubeId } from "@/components/YouTubePlayer";

type ConfigTab = "domains" | "general" | "api" | "seo" | "analytics";

interface DomainInfo {
  name: string;
  status: "valid" | "invalid";
  environment: string;
  dnsRecords: {
    type: string;
    name: string;
    value: string;
  }[];
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: copied ? "#22c55e" : "#f3f4f6",
        color: copied ? "#fff" : "#4b5563",
        border: "none",
        padding: "0.4rem 0.75rem",
        borderRadius: "6px",
        fontSize: "0.8rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
      }}
    >
      <span style={{ fontSize: "0.9rem" }}>{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState<ConfigTab>("domains");
  const videoUrl = "https://youtu.be/Htl6SNvK2F4?si=-CYX0-3yUV4AtHKk&t=52";
  const videoId = extractYouTubeId(videoUrl);

  const tabs: { id: ConfigTab; label: string; disabled: boolean }[] = [
    { id: "domains", label: "Domains", disabled: false },
    { id: "general", label: "General", disabled: true },
    { id: "api", label: "API", disabled: true },
    { id: "seo", label: "SEO", disabled: true },
    { id: "analytics", label: "Analytics", disabled: true },
  ];

  const domains: DomainInfo[] = [
    {
      name: "budgetndiostory.org",
      status: "invalid",
      environment: "Production",
      dnsRecords: [
        { type: "A", name: "@", value: "216.198.79.1" },
      ],
    },
    {
      name: "www.budgetndiostory.org",
      status: "invalid",
      environment: "Production",
      dnsRecords: [
        { type: "CNAME", name: "www", value: "781ea67122b2a916.vercel-dns-017.com." },
      ],
    },
    {
      name: "budgetndiostory.vercel.app",
      status: "valid",
      environment: "Production",
      dnsRecords: [
        { type: "CNAME", name: "@", value: "cname.vercel-dns.com." },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Config | Budget Ndio Story</title>
        <meta name="description" content="Configuration and domains documentation" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div style={{ minHeight: "100vh", background: "#fff", color: "#000", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1rem" }}>
          <header style={{ padding: "1rem 0", borderBottom: "1px solid #e5e7eb", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.9rem", color: "#666" }}>kymgriffins' projects</span>
              <span style={{ color: "#666" }}>›</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>budgetndiostory</span>
            </div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#000" }}>Domains</h1>
          </header>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "1px solid #e5e7eb", paddingBottom: "0" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  border: "none",
                  borderBottom: activeTab === tab.id ? "2px solid #000" : "2px solid transparent",
                  marginBottom: "-1px",
                  cursor: tab.disabled ? "not-allowed" : "pointer",
                  background: "transparent",
                  color: tab.disabled ? "#ccc" : activeTab === tab.id ? "#000" : "#666",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "domains" && (
            <section>
              <p style={{ fontSize: "0.95rem", color: "#666", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Domains can be assigned to git branches, custom environments, and production.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {domains.map((domain) => (
                  <div
                    key={domain.name}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "1rem",
                        borderBottom: "1px solid #e5e7eb",
                        background: "#f9fafb",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#000" }}>
                            {domain.name}
                          </h3>
                          <span
                            style={{
                              background: domain.status === "valid" ? "#dcfce7" : "#fef3c7",
                              color: domain.status === "valid" ? "#16a34a" : "#b45309",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                              fontWeight: 500,
                            }}
                          >
                            {domain.status === "valid" ? "Valid Configuration" : "Invalid Configuration"}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem" }}>
                          {domain.environment}
                        </p>
                      </div>
                      {domain.status === "invalid" && (
                        <a href="#" style={{ fontSize: "0.85rem", color: "#2563eb", textDecoration: "none" }}>
                          Learn more
                        </a>
                      )}
                    </div>

                    <div style={{ padding: "1rem", background: "#fff" }}>
                      <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem" }}>
                        The DNS records at your provider must match the following records to verify and connect your domain.
                      </p>

                      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <th style={{ textAlign: "left", padding: "0.5rem 0", fontSize: "0.8rem", fontWeight: 600, color: "#666" }}>Type</th>
                            <th style={{ textAlign: "left", padding: "0.5rem 0", fontSize: "0.8rem", fontWeight: 600, color: "#666" }}>Name</th>
                            <th style={{ textAlign: "left", padding: "0.5rem 0", fontSize: "0.8rem", fontWeight: 600, color: "#666" }}>Value</th>
                            <th style={{ width: "80px" }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {domain.dnsRecords.map((record, index) => (
                            <tr key={index} style={{ borderBottom: index < domain.dnsRecords.length - 1 ? "1px solid #e5e7eb" : "none" }}>
                              <td style={{ padding: "0.75rem 0", fontSize: "0.9rem", color: "#000" }}>{record.type}</td>
                              <td style={{ padding: "0.75rem 0", fontSize: "0.9rem", color: "#000" }}>{record.name}</td>
                              <td style={{ padding: "0.75rem 0", fontSize: "0.85rem", fontFamily: "monospace", color: "#000" }}>{record.value}</td>
                              <td style={{ padding: "0.75rem 0", textAlign: "right" }}>
                                <CopyButton value={record.value} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div
                        style={{
                          background: "#f3f4f6",
                          borderRadius: "6px",
                          padding: "0.75rem 1rem",
                          fontSize: "0.8rem",
                          color: "#666",
                        }}
                      >
                        As part of a planned IP range expansion, you may notice new records above. The old records of cname.vercel-dns.com and 76.76.21.21 will continue to work but we recommend you use the new ones.
                        <br />
                        <span style={{ marginTop: "0.25rem", display: "block" }}>
                          It might take some time for the DNS records to apply. <a href="#" style={{ color: "#2563eb", textDecoration: "none" }}>Learn More</a>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "2rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#000", marginBottom: "1rem" }}>
                  Visual Guide
                </h3>
                <div style={{ background: "#000", borderRadius: "12px", overflow: "hidden" }}>
                  <YouTubePlayer videoId={videoId} autoplay={false} />
                </div>
              </div>
            </section>
          )}

          {(activeTab === "general" || activeTab === "api" || activeTab === "seo" || activeTab === "analytics") && (
            <div
              style={{
                background: "#f9fafb",
                borderRadius: "8px",
                padding: "3rem",
                textAlign: "center",
                border: "1px solid #e5e7eb",
              }}
            >
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#000", marginBottom: "0.5rem" }}>
                Coming Soon
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#666" }}>
                This configuration section is currently under development.
              </p>
            </div>
          )}

          <footer style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb", textAlign: "center", color: "#999", fontSize: "0.8rem" }}>
            <p>All systems normal.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
