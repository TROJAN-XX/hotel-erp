"use client";

import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../lib/api";

const fallbackRooms = [
  { name: "Deluxe Suite", description: "Garden view", base_price: 12500 },
  {
    name: "Heritage Villa",
    description: "Private plunge pool",
    base_price: 18900,
  },
  {
    name: "Family Loft",
    description: "2 adults • 2 children",
    base_price: 15400,
  },
];

const fallbackPackages = [
  {
    name: "Kerala Weekend Escape",
    description: "Stay, meals and transfer bundle",
    base_price: 18500,
  },
  {
    name: "Wellness Retreat",
    description: "Spa, yoga and curated dining",
    base_price: 22400,
  },
  {
    name: "Cultural Heritage Stay",
    description: "Tours, heritage dining and premium rooms",
    base_price: 27800,
  },
];

const fallbackTours = [
  { name: "Munnar Valley Circuit", description: "Full day experience" },
  { name: "Cultural Heritage Walk", description: "Half day experience" },
  { name: "Tea Estate Expedition", description: "Day trip experience" },
];

const formatPrice = (value) => {
  if (typeof value !== "number") return "Custom pricing";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function HospitalityOverview() {
  const [featuredRooms, setFeaturedRooms] = useState(fallbackRooms);
  const [packages, setPackages] = useState(fallbackPackages);
  const [tours, setTours] = useState(fallbackTours);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [roomResult, packageResult, tourResult] =
          await Promise.allSettled([
            fetchApi("/rooms/types/"),
            fetchApi("/packages/"),
            fetchApi("/tours/"),
          ]);

        if (!isMounted) return;

        const rooms = normalizeListResponse(
          roomResult.status === "fulfilled" ? roomResult.value : [],
        );
        const packageList = normalizeListResponse(
          packageResult.status === "fulfilled" ? packageResult.value : [],
        );
        const tourList = normalizeListResponse(
          tourResult.status === "fulfilled" ? tourResult.value : [],
        );

        setFeaturedRooms(
          rooms.length > 0
            ? rooms.slice(0, 3).map((room) => ({
                name: room.name || "Premium Room",
                description:
                  room.description || room.bed_type || "Premium stay",
                base_price: Number(room.base_price || 12000),
              }))
            : fallbackRooms,
        );

        setPackages(
          packageList.length > 0
            ? packageList.slice(0, 3).map((item) => ({
                name: item.name || "Signature Package",
                description:
                  item.description ||
                  item.included_services ||
                  "Tailored stay experience",
                base_price: Number(item.base_price || 18000),
              }))
            : fallbackPackages,
        );

        setTours(
          tourList.length > 0
            ? tourList.slice(0, 3).map((item) => ({
                name: item.name || "Local Adventure",
                description:
                  item.description || item.duration || "Curated experience",
              }))
            : fallbackTours,
        );
      } catch (error) {
        if (isMounted) {
          setFeaturedRooms(fallbackRooms);
          setPackages(fallbackPackages);
          setTours(fallbackTours);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="section-header">
        <div>
          <span className="eyebrow">Stay</span>
          <h2>Featured rooms</h2>
        </div>
        <button className="button button-primary" type="button">
          View all
        </button>
      </div>

      <section className="card-grid three-up">
        {featuredRooms.map((room) => (
          <article key={room.name} className="card-panel room-card">
            <div className="room-image placeholder-image" />
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <div className="card-row">
              <strong>{formatPrice(room.base_price)}</strong>
              <button className="button button-secondary" type="button">
                Book
              </button>
            </div>
          </article>
        ))}
      </section>

      <div className="section-header">
        <div>
          <span className="eyebrow">Packages</span>
          <h2>Popular getaway packages</h2>
        </div>
        <button className="button button-primary" type="button">
          Build custom
        </button>
      </div>

      <section className="package-list">
        {packages.map((pkg) => (
          <div key={pkg.name} className="list-item-row card-panel">
            <div>
              <h3>{pkg.name}</h3>
              <p>{pkg.description}</p>
            </div>
            <div className="card-row">
              <strong>{formatPrice(pkg.base_price)}</strong>
              <button className="button button-primary" type="button">
                Explore
              </button>
            </div>
          </div>
        ))}
      </section>

      <div className="section-header">
        <div>
          <span className="eyebrow">Experiences</span>
          <h2>Signature offering</h2>
        </div>
      </div>

      <section className="feature-strip">
        {tours.map((item) => (
          <div key={item.name} className="mini-card card-panel">
            <strong>{item.name}</strong>
            <span>{item.description}</span>
          </div>
        ))}
      </section>

      {loading ? (
        <p className="eyebrow">Syncing with live service data…</p>
      ) : null}
    </>
  );
}
