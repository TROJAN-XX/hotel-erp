"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../../lib/api";

const fallbackPackages = [
  {
    name: "Weekend Escape",
    base_price: 18500,
    included_services: "2 nights + breakfast + transfers",
  },
  {
    name: "Wellness Retreat",
    base_price: 22400,
    included_services: "Spa, yoga and curated dining",
  },
  {
    name: "Heritage Trail",
    base_price: 27800,
    included_services: "Tours, local dining and stay",
  },
];

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function PackagesPage() {
  const [packages, setPackages] = useState(fallbackPackages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPackages() {
      try {
        const response = await fetchApi("/packages/");
        const records = normalizeListResponse(response);

        if (!isMounted) return;

        if (records.length > 0) {
          setPackages(
            records.slice(0, 6).map((item) => ({
              name: item.name || "Signature package",
              base_price: Number(item.base_price || 0),
              included_services:
                item.included_services ||
                item.description ||
                "Curated hospitality experiences",
            })),
          );
        }
      } catch (error) {
        if (isMounted) setPackages(fallbackPackages);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPackages();

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
            <div className="brand-subtitle">Packages</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/tours", "Tours"],
            ["/wellness", "Wellness"],
            ["/packages", "Packages"],
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
              <span className="eyebrow">Tailored</span>
              <h2>Signature packages</h2>
            </div>
          </div>
          <div className="card-grid three-up">
            {packages.map((pkg) => (
              <div key={pkg.name} className="card-panel room-card">
                <div className="room-image placeholder-image" />
                <h3>{pkg.name}</h3>
                <p>{pkg.included_services}</p>
                <div className="card-row">
                  <strong>{formatPrice(pkg.base_price)}</strong>
                  <button className="button button-primary" type="button">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
          {loading ? (
            <p className="eyebrow">Loading curated packages…</p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
