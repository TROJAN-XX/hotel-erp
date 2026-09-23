"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../../lib/api";

const fallbackInventory = [
  {
    name: "Fresh linens",
    current_stock: 620,
    reorder_level: 150,
    unit: "units",
  },
  {
    name: "Breakfast ingredients",
    current_stock: 84,
    reorder_level: 180,
    unit: "units",
  },
  { name: "Spa oils", current_stock: 240, reorder_level: 100, unit: "units" },
  {
    name: "Housekeeping consumables",
    current_stock: 52,
    reorder_level: 120,
    unit: "units",
  },
  {
    name: "Bar spirits",
    current_stock: 310,
    reorder_level: 120,
    unit: "units",
  },
];

const fallbackMovements = [
  { item: "Rooms received", quantity: 42, movement_type: "inbound" },
  { item: "Dining issued", quantity: -18, movement_type: "outbound" },
  { item: "Spa stock returned", quantity: 9, movement_type: "inbound" },
  { item: "Bar transfers", quantity: -7, movement_type: "outbound" },
];

const formatStockStatus = (item) => {
  if (!item || item.current_stock === 0) return "Critical";
  if (item.current_stock <= Number(item.reorder_level || 0)) return "Low";
  return "Healthy";
};

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState(fallbackInventory);
  const [movementLog, setMovementLog] = useState(fallbackMovements);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadInventoryData() {
      try {
        const [itemsResponse, movementsResponse] = await Promise.allSettled([
          fetchApi("/inventory/items/"),
          fetchApi("/inventory/movements/"),
        ]);

        if (!isMounted) return;

        const liveItems = normalizeListResponse(
          itemsResponse.status === "fulfilled" ? itemsResponse.value : [],
        );
        const liveMovements = normalizeListResponse(
          movementsResponse.status === "fulfilled"
            ? movementsResponse.value
            : [],
        );

        setInventoryItems(liveItems.length ? liveItems : fallbackInventory);
        setMovementLog(
          liveMovements.length ? liveMovements : fallbackMovements,
        );
      } catch (error) {
        if (isMounted) {
          setInventoryItems(fallbackInventory);
          setMovementLog(fallbackMovements);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadInventoryData();
    return () => {
      isMounted = false;
    };
  }, []);

  const stockRows = (inventoryItems || fallbackInventory).map((item) => {
    const status = formatStockStatus(item);
    return {
      item: item.name,
      status,
      count: `${item.current_stock ?? 0} ${item.unit ?? "units"}`,
      reorder:
        item.current_stock <= Number(item.reorder_level || 0) ? "Yes" : "No",
    };
  });

  const totalStock = inventoryItems.reduce(
    (sum, item) => sum + Number(item.current_stock || 0),
    0,
  );
  const lowAlerts = inventoryItems.filter(
    (item) =>
      Number(item.current_stock || 0) <= Number(item.reorder_level || 0),
  ).length;
  const pendingReorders = inventoryItems.filter(
    (item) =>
      Number(item.current_stock || 0) <= Number(item.reorder_level || 0),
  ).length;

  const inventoryOverview = [
    {
      label: "Total stock units",
      value: totalStock.toLocaleString("en-IN"),
      tone: "success",
    },
    { label: "Low stock alerts", value: String(lowAlerts), tone: "warning" },
    {
      label: "Pending reorders",
      value: String(pendingReorders),
      tone: "critical",
    },
    { label: "Turnover rate", value: "94%", tone: "success" },
  ];

  const movementRows = (movementLog || fallbackMovements)
    .slice(0, 4)
    .map((entry) => ({
      label: entry.item || entry.reference || "Inventory update",
      value: `${entry.quantity > 0 ? "+" : ""}${entry.quantity || 0}`,
    }));

  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Inventory</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/admin", "Admin"],
            ["/inventory", "Inventory"],
            ["/reports", "Reports"],
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
              <span className="eyebrow">Operations</span>
              <h2>Inventory control</h2>
            </div>
            <button type="button" className="button button-primary">
              Create reorder
            </button>
          </div>

          <section className="inventory-grid">
            {inventoryOverview.map((item) => (
              <div key={item.label} className="card-panel inventory-card">
                <span className="eyebrow">{item.label}</span>
                <strong>{item.value}</strong>
                <span
                  className={`badge ${item.tone}`}
                  style={{ marginTop: 12 }}
                >
                  {item.tone === "success"
                    ? "Stable"
                    : item.tone === "warning"
                      ? "Monitor"
                      : "Action"}
                </span>
              </div>
            ))}
          </section>

          <section className="inventory-panel-grid">
            <div className="card-panel padded-box">
              <span className="eyebrow">Stock view</span>
              <h3>Current inventory status</h3>
              <table className="stock-table" style={{ marginTop: 16 }}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Reorder</th>
                  </tr>
                </thead>
                <tbody>
                  {stockRows.map((row) => (
                    <tr key={row.item}>
                      <td>{row.item}</td>
                      <td>
                        <span
                          className={`badge ${
                            row.status === "Healthy"
                              ? "success"
                              : row.status === "Low"
                                ? "warning"
                                : "critical"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td>{row.count}</td>
                      <td>{row.reorder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-panel padded-box">
              <span className="eyebrow">Movement</span>
              <h3>Daily adjustments</h3>
              <ul className="alert-list" style={{ marginTop: 18 }}>
                {movementRows.map((entry) => (
                  <li key={entry.label}>
                    <div className="notification-item">
                      <span>{entry.label}</span>
                      <strong>{entry.value}</strong>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {loading ? <p className="eyebrow">Loading stock data…</p> : null}
        </div>
      </main>
    </div>
  );
}
