"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../../lib/api";

const fallbackWellness = [
  {
    name: "Signature Massage Therapy",
    description: "60 minute deep relaxation therapy",
  },
  {
    name: "Detox Spa Ritual",
    description: "Custom therapy with herbal-infused oils",
  },
  { name: "Yoga & Breathwork", description: "Guided sunrise wellness session" },
];

export default function WellnessPage() {
  const [wellness, setWellness] = useState(fallbackWellness);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadWellness() {
      try {
        const response = await fetchApi("/wellness/services/");
        const records = normalizeListResponse(response);

        if (!isMounted) return;

        if (records.length > 0) {
          setWellness(
            records.slice(0, 6).map((item) => ({
              name: item.name || "Wellness session",
              description:
                item.description ||
                `${item.category || "Therapy"} • ${item.duration_minutes || 60} min`,
            })),
          );
        }
      } catch (error) {
        if (isMounted) setWellness(fallbackWellness);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadWellness();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Wellness</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/packages", "Packages"],
            ["/tours", "Tours"],
            ["/wellness", "Wellness"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="page-content">
        <div className="page-shell">
          <div className="section-header">
            <div>
              <span className="eyebrow">Healing</span>
              <h2>Luxury wellness experiences</h2>
            </div>
          </div>
          <div className="card-grid three-up">
            {wellness.map((item) => (
              <div key={item.name} className="card-panel room-card">
                <div className="room-image placeholder-image" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button className="button button-primary" type="button">
                  Book session
                </button>
              </div>
            ))}
          </div>
          {loading ? (
            <p className="eyebrow">Loading wellness sessions…</p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
