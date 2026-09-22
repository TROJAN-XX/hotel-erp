"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../../lib/api";

const fallbackTours = [
  { name: "Munnar Valley Circuit", duration: "Full day" },
  { name: "Cultural Heritage Walk", duration: "Half day" },
  { name: "Tea Estate Expedition", duration: "Day trip" },
];

export default function ToursPage() {
  const [tours, setTours] = useState(fallbackTours);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadTours() {
      try {
        const response = await fetchApi("/tours/");
        const records = normalizeListResponse(response);

        if (!isMounted) return;

        if (records.length > 0) {
          setTours(
            records.slice(0, 6).map((tour) => ({
              name: tour.name || "Local discovery tour",
              duration: tour.duration_hours
                ? `${tour.duration_hours} hrs`
                : tour.description || "Curated day tour",
            })),
          );
        }
      } catch (error) {
        if (isMounted) setTours(fallbackTours);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadTours();

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
            <div className="brand-subtitle">Tours</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/packages", "Packages"],
            ["/transport", "Transport"],
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
              <span className="eyebrow">Experiences</span>
              <h2>Explore local adventures</h2>
            </div>
          </div>
          <div className="card-grid three-up">
            {tours.map((tour) => (
              <div key={tour.name} className="card-panel room-card">
                <div className="room-image placeholder-image" />
                <h3>{tour.name}</h3>
                <p>{tour.duration}</p>
                <button className="button button-secondary" type="button">
                  Reserve
                </button>
              </div>
            ))}
          </div>
          {loading ? <p className="eyebrow">Loading tour packages…</p> : null}
        </div>
      </main>
    </div>
  );
}
