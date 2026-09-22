import "./globals.css";

export const metadata = {
  title: "Asteria Hotel ERP",
  description: "Luxury hospitality management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
