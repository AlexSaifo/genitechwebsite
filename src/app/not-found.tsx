// Rendered when no [locale] segment matches (e.g. /ascasc).
// Must supply its own <html> and <body> because the root layout is a
// pass-through wrapper that doesn't emit those tags.
import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#03080e",
          color: "#ffffff",
          fontFamily: "Cairo, sans-serif",
          flexDirection: "column",
          gap: "1.5rem",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "6rem", fontWeight: 900, margin: 0, lineHeight: 1 }}>
          404
        </h1>
        <p style={{ fontSize: "1.25rem", margin: 0, opacity: 0.7 }}>
          الصفحة التي تبحث عنها غير موجودة
        </p>
        <Link
          href="/ar"
          style={{
            marginTop: "0.5rem",
            padding: "0.6rem 1.6rem",
            borderRadius: "9999px",
            background: "#0CA5F0",
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          العودة إلى الرئيسية
        </Link>
      </body>
    </html>
  );
}
