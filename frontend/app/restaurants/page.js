"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../../lib/api";

const fallbackDining = [
  { name: "Azure Terrace", description: "Fine dining overlooking the pool" },
  { name: "The Ember Club", description: "Signature grill & bar experiences" },
  { name: "Café Mosaic", description: "Casual breakfast and brunch" },
];

export default function RestaurantsPage() {
  const [dining, setDining] = useState(fallbackDining);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDining() {
      try {
        const [menuResponse, tableResponse] = await Promise.allSettled([
          fetchApi("/restaurants/menu/"),
          fetchApi("/restaurants/tables/"),
        ]);

        if (!isMounted) return;

        const menuItems = normalizeListResponse(
          menuResponse.status === "fulfilled" ? menuResponse.value : [],
        );
        const tables = normalizeListResponse(
          tableResponse.status === "fulfilled" ? tableResponse.value : [],
        );

        const liveDining = menuItems.length
          ? menuItems.slice(0, 6).map((item) => ({
              name: item.name || "Chef's special",
              description:
                item.description ||
                `${item.category || "Curated menu"} • ${item.currency || "INR"}`,
            }))
          : tables.length
            ? tables.slice(0, 6).map((table) => ({
                name: table.name || "Dining table",
                description:
                  table.location ||
                  `${table.seating_capacity || 2} guests • ${table.is_active ? "Available" : "Booked"}`,
              }))
            : fallbackDining;

        setDining(liveDining);
      } catch (error) {
        if (isMounted) setDining(fallbackDining);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDining();

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
            <div className="brand-subtitle">Dining</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/restaurants", "Dining"],
            ["/packages", "Packages"],
            ["/profile", "Profile"],
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
              <span className="eyebrow">Culinary</span>
              <h2>Dining experiences</h2>
            </div>
          </div>
          <div className="card-grid three-up">
            {dining.map((item) => (
              <div key={item.name} className="card-panel room-card">
                <div className="room-image placeholder-image" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button className="button button-primary" type="button">
                  Book table
                </button>
              </div>
            ))}
          </div>
          {loading ? <p className="eyebrow">Loading dining options…</p> : null}
        </div>
      </main>
    </div>
  );
}
