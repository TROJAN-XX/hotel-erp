"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../../lib/api";

const fallbackTransport = [
  { name: "Airport Transfer", description: "Private pickup and drop" },
  { name: "Luxury Chauffeur", description: "Hourly premium car service" },
  { name: "Intercity Travel", description: "Curated destination rides" },
];

export default function TransportPage() {
  const [transport, setTransport] = useState(fallbackTransport);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadTransport() {
      try {
        const [serviceResponse, vehicleResponse] = await Promise.allSettled([
          fetchApi("/transport/services/"),
          fetchApi("/transport/vehicles/"),
        ]);

        if (!isMounted) return;

        const services = normalizeListResponse(
          serviceResponse.status === "fulfilled" ? serviceResponse.value : [],
        );
        const vehicles = normalizeListResponse(
          vehicleResponse.status === "fulfilled" ? vehicleResponse.value : [],
        );

        const liveTransport = services.length
          ? services.slice(0, 6).map((service) => ({
              name: service.name || "Transfer service",
              description:
                service.description ||
                `${service.service_type || "Private"} travel support`,
            }))
          : vehicles.length
            ? vehicles.slice(0, 6).map((vehicle) => ({
                name: vehicle.name || "Luxury vehicle",
                description:
                  vehicle.service ||
                  `${vehicle.capacity || "4"} seats • ${vehicle.base_price || 0} INR`,
              }))
            : fallbackTransport;

        setTransport(liveTransport);
      } catch (error) {
        if (isMounted) setTransport(fallbackTransport);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadTransport();

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
            <div className="brand-subtitle">Transport</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/tours", "Tours"],
            ["/packages", "Packages"],
            ["/transport", "Transport"],
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
              <span className="eyebrow">Travel</span>
              <h2>Seamless transfers</h2>
            </div>
          </div>
          <div className="card-grid three-up">
            {transport.map((item) => (
              <div key={item.name} className="card-panel room-card">
                <div className="room-image placeholder-image" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button className="button button-secondary" type="button">
                  Book service
                </button>
              </div>
            ))}
          </div>
          {loading ? <p className="eyebrow">Loading travel options…</p> : null}
        </div>
      </main>
    </div>
  );
}
