import SectionHeader from "../../components/common/SectionHeader";

const rooms = [
  { name: "Deluxe King Room", rate: "₹9,600/night", status: "Available" },
  { name: "Garden Family Suite", rate: "₹14,200/night", status: "Limited" },
  { name: "Heritage Suite", rate: "₹18,800/night", status: "Popular" },
];

export default function RoomsPage() {
  return (
    <div className="page-shell">
      <SectionHeader eyebrow="Hotel" title="Rooms & stays" action="Filter" />
      <div className="card-grid three-up">
        {rooms.map((room) => (
          <article key={room.name} className="card-panel room-card">
            <div className="room-image placeholder-image" />
            <h3>{room.name}</h3>
            <p>King bed • Breakfast • City view</p>
            <div className="card-row">
              <strong>{room.rate}</strong>
              <span className="pill">{room.status}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
