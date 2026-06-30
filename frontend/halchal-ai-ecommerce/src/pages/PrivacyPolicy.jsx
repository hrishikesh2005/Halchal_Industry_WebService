import { useTheme } from "../context/ThemeContext";

const sections = [
  {
    title: "Information We Collect",
    body: "We collect user registration details (name, email, region), order history, cart data, and system usage patterns. This information is stored securely in our database and used solely to operate and improve the platform.",
  },
  {
    title: "How We Use Data",
    body: "Data is used to generate AI-driven pricing, optimise inventory management, improve demand forecasting accuracy, and provide personalised product recommendations based on your crop type and region.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell or share your personal data with third parties. Order and payment data is shared with Razorpay solely for payment processing, governed by Razorpay's own privacy policy.",
  },
  {
    title: "Cookies & Sessions",
    body: "We use session identifiers (stored in your browser's localStorage) to maintain your cart across visits. No third-party tracking cookies are used on this platform.",
  },
  {
    title: "Security",
    body: "All data is encrypted in transit (HTTPS) and stored on secured MongoDB Atlas clusters. Payment details are never stored on our servers — they are handled directly by Razorpay's PCI-DSS compliant infrastructure.",
  },
  {
    title: "Your Rights",
    body: "You may request deletion of your account and associated data at any time by contacting us. We will process the request within 7 business days.",
  },
];

const PrivacyPolicy = () => {
  const T = useTheme();
  return (
    <div style={{ minHeight: "100vh", background: T.bg0, fontFamily: T.font, padding: "60px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.green, background: T.greenBg, border: `1px solid ${T.greenBd}`, borderRadius: 6, padding: "4px 12px", marginBottom: 16 }}>
            Legal
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: T.text1, marginBottom: 12, lineHeight: 1.15 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 15, color: T.text2, lineHeight: 1.7, maxWidth: 560 }}>
            Halchal Industries values your privacy. This policy explains how we collect, use, and protect your information when using our platform.
          </p>
          <div style={{ marginTop: 20, fontSize: 12, color: T.text3 }}>Last updated: June 2026</div>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sections.map((s, i) => (
            <div key={i} style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: "24px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: T.greenBg, border: `1px solid ${T.greenBd}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: T.green, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: T.text1, margin: 0 }}>{s.title}</h2>
              </div>
              <p style={{ fontSize: 14, color: T.text2, lineHeight: 1.75, margin: 0, paddingLeft: 40 }}>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: 32, padding: "16px 20px", background: T.greenBg, border: `1px solid ${T.greenBd}`, borderRadius: 10 }}>
          <p style={{ fontSize: 13, color: T.green, margin: 0, lineHeight: 1.6 }}>
            <strong>Questions about privacy?</strong> Contact us through the Contact page. We are based in Pune, Maharashtra and operate under Indian data protection laws.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
