"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, fetchApi, normalizeListResponse } from "../../lib/api";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

function toDateInputValue(date) {
  const offset = date.getTimezoneOffset();
  const normalized = new Date(date.getTime() - offset * 60 * 1000);
  return normalized.toISOString().slice(0, 10);
}

export default function BookingPage() {
  const router = useRouter();
  const [hotels, setHotels] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [form, setForm] = useState({
    guest_name: "",
    guest_phone: "",
    check_in: toDateInputValue(new Date()),
    check_out: toDateInputValue(new Date(Date.now() + 24 * 60 * 60 * 1000)),
    adults: 2,
    children: 0,
    notes: "",
  });

  useEffect(() => {
    let isMounted = true;

    async function loadBookingOptions() {
      try {
        const [hotelResponse, roomResponse] = await Promise.allSettled([
          fetchApi("/hotels/"),
          fetchApi("/rooms/types/"),
        ]);

        if (!isMounted) return;

        const hotelList = normalizeListResponse(
          hotelResponse.status === "fulfilled" ? hotelResponse.value : [],
        );
        const roomList = normalizeListResponse(
          roomResponse.status === "fulfilled" ? roomResponse.value : [],
        );

        setHotels(hotelList);
        setRoomTypes(roomList);

        if (hotelList.length > 0) {
          setSelectedHotelId(String(hotelList[0].id));
        }

        if (roomList.length > 0) {
          setSelectedRoomTypeId(String(roomList[0].id));
        }
      } catch (error) {
        if (isMounted) {
          setStatus({
            type: "error",
            message: "Unable to load hotel and room availability right now.",
          });
        }
      }
    }

    loadBookingOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedRoom =
    roomTypes.find((room) => String(room.id) === String(selectedRoomTypeId)) ||
    roomTypes[0];

  const selectedHotel =
    hotels.find((hotel) => String(hotel.id) === String(selectedHotelId)) ||
    hotels[0];

  const nights = useMemo(() => {
    if (!form.check_in || !form.check_out) return 1;

    const start = new Date(form.check_in);
    const end = new Date(form.check_out);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return 1;
    }

    const duration = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return duration > 0 ? duration : 1;
  }, [form.check_in, form.check_out]);

  const estimatedTotal = Number(selectedRoom?.base_price || 0) * nights;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedHotelId || !selectedRoomTypeId) {
      setStatus({
        type: "error",
        message: "Please choose a hotel and room type before confirming.",
      });
      return;
    }

    if (
      !form.guest_name ||
      !form.guest_phone ||
      !form.check_in ||
      !form.check_out
    ) {
      setStatus({
        type: "error",
        message: "Guest details and dates are required.",
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = {
        hotel: Number(selectedHotelId),
        room_type: Number(selectedRoomTypeId),
        guest_name: form.guest_name,
        guest_phone: form.guest_phone,
        check_in: form.check_in,
        check_out: form.check_out,
        adults: Number(form.adults || 1),
        children: Number(form.children || 0),
        total_amount: estimatedTotal,
        currency: "INR",
        notes: form.notes || "",
      };

      const response = await fetch(`${API_BASE_URL}/bookings/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Booking submission failed.",
        );
      }

      const guestName = data.guest_name || form.guest_name;
      const successUrl = `/payment?amount=${encodeURIComponent(String(estimatedTotal))}&guest=${encodeURIComponent(guestName)}&hotel=${encodeURIComponent(selectedHotel?.name || "Asteria")}&room=${encodeURIComponent(selectedRoom?.name || "Suite")}&nights=${encodeURIComponent(String(nights))}`;

      setStatus({
        type: "success",
        message: `Booking created successfully for ${guestName}.`,
      });
      setSelectedHotelId(String(hotels[0]?.id || ""));
      setSelectedRoomTypeId(String(roomTypes[0]?.id || ""));
      setForm({
        guest_name: "",
        guest_phone: "",
        check_in: toDateInputValue(new Date()),
        check_out: toDateInputValue(new Date(Date.now() + 24 * 60 * 60 * 1000)),
        adults: 2,
        children: 0,
        notes: "",
      });

      router.push(successUrl);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message || "Something went wrong while creating your booking.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Hotel & Experiences</div>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/restaurants", "Dining"],
            ["/tours", "Tours"],
            ["/transport", "Travel"],
            ["/wellness", "Wellness"],
            ["/packages", "Packages"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/login" className="button button-secondary">
            Login
          </Link>
          <Link href="/rooms" className="button button-primary">
            Browse stays
          </Link>
        </div>
      </header>

      <main className="page-content">
        <div className="page-shell booking-page-shell">
          <section className="booking-layout">
            <div className="card-panel booking-form-panel">
              <div className="section-header compact-header">
                <div>
                  <span className="eyebrow">Reservation</span>
                  <h2>Book your stay</h2>
                </div>
              </div>

              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="booking-form-grid">
                  <label>
                    Hotel
                    <select
                      value={selectedHotelId}
                      onChange={(event) =>
                        setSelectedHotelId(event.target.value)
                      }
                    >
                      {hotels.length === 0 ? (
                        <option value="">Loading hotels…</option>
                      ) : (
                        hotels.map((hotel) => (
                          <option key={hotel.id} value={hotel.id}>
                            {hotel.name}
                          </option>
                        ))
                      )}
                    </select>
                  </label>

                  <label>
                    Room type
                    <select
                      value={selectedRoomTypeId}
                      onChange={(event) =>
                        setSelectedRoomTypeId(event.target.value)
                      }
                    >
                      {roomTypes.length === 0 ? (
                        <option value="">Loading room types…</option>
                      ) : (
                        roomTypes.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name}
                          </option>
                        ))
                      )}
                    </select>
                  </label>

                  <label>
                    Guest name
                    <input
                      type="text"
                      name="guest_name"
                      value={form.guest_name}
                      onChange={handleChange}
                      placeholder="Enter guest name"
                    />
                  </label>

                  <label>
                    Phone
                    <input
                      type="tel"
                      name="guest_phone"
                      value={form.guest_phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </label>

                  <label>
                    Check-in
                    <input
                      type="date"
                      name="check_in"
                      value={form.check_in}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Check-out
                    <input
                      type="date"
                      name="check_out"
                      value={form.check_out}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Adults
                    <input
                      type="number"
                      min="1"
                      name="adults"
                      value={form.adults}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Children
                    <input
                      type="number"
                      min="0"
                      name="children"
                      value={form.children}
                      onChange={handleChange}
                    />
                  </label>

                  <label className="full-span">
                    Notes
                    <textarea
                      name="notes"
                      rows="4"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any dinner preference, arrival plan, or special request?"
                    />
                  </label>
                </div>

                {status.message ? (
                  <div className={`status-banner ${status.type}`}>
                    {status.message}
                  </div>
                ) : null}

                <div className="booking-actions">
                  <button
                    className="button button-primary"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting…" : "Confirm booking"}
                  </button>
                  <Link href="/rooms" className="button button-secondary">
                    Back to rooms
                  </Link>
                </div>
              </form>
            </div>

            <aside className="card-panel booking-summary">
              <div className="section-header compact-header">
                <div>
                  <span className="eyebrow">Summary</span>
                  <h3>Reservation preview</h3>
                </div>
              </div>

              <div className="summary-card">
                <h4>{selectedRoom?.name || "Room type"}</h4>
                <p>{selectedHotel?.name || "Hotel name"}</p>
                <ul>
                  <li>
                    <span>Base rate</span>
                    <strong>
                      {formatCurrency(selectedRoom?.base_price || 0)}
                    </strong>
                  </li>
                  <li>
                    <span>Duration</span>
                    <strong>{nights} nights</strong>
                  </li>
                  <li>
                    <span>Guests</span>
                    <strong>
                      {Number(form.adults || 1) + Number(form.children || 0)}
                    </strong>
                  </li>
                </ul>
              </div>

              <div className="total-box">
                <span>Estimated total</span>
                <strong>{formatCurrency(estimatedTotal)}</strong>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

