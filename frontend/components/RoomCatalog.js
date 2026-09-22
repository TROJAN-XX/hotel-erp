"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../lib/api";

const fallbackRooms = [
  {
    name: "Deluxe King Room",
    base_price: 9600,
    description: "King bed • Breakfast • City view",
  },
  {
    name: "Garden Family Suite",
    base_price: 14200,
    description: "Family stay • Breakfast • Balcony",
  },
  {
    name: "Heritage Suite",
    base_price: 18800,
    description: "Premium suite • Heritage experience",
  },
];

const formatPrice = (value) => {
  if (typeof value !== "number") return "Custom pricing";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function RoomCatalog() {
  const [rooms, setRooms] = useState(fallbackRooms);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRooms() {
      try {
        const response = await fetchApi("/rooms/types/");
        const records = normalizeListResponse(response);

        if (!isMounted) return;

        if (records.length > 0) {
          setRooms(
            records.slice(0, 6).map((room) => ({
              name: room.name || "Room Type",
              base_price: Number(room.base_price || 12000),
              description:
                room.description ||
                `${room.max_guests || 2} guests • ${room.bed_type || "Luxury stay"}`,
            })),
          );
        }
      } catch (error) {
        if (isMounted) {
          setRooms(fallbackRooms);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadRooms();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="section-header">
        <div>
          <span className="eyebrow">Hotel</span>
          <h2>Rooms & stays</h2>
        </div>
        <button className="button button-primary" type="button">
          Filter
        </button>
      </div>

      <div className="card-grid three-up">
        {rooms.map((room) => (
          <article key={room.name} className="card-panel room-card">
            <div className="room-image placeholder-image" />
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <div className="card-row">
              <strong>{formatPrice(room.base_price)}</strong>
              <span className="pill">Available</span>
            </div>
            <div className="card-row room-actions">
              <Link href="/booking" className="button button-primary">
                Book now
              </Link>
            </div>
          </article>
        ))}
      </div>

      {loading ? <p className="eyebrow">Loading live room inventory…</p> : null}
    </>
  );
}
