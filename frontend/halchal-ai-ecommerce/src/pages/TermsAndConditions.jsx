import { useTheme } from "../context/ThemeContext";

const sections = [
  {
    title: "Platform Usage",
    body: "Users must provide accurate information while placing orders and interacting with AI pricing features. Misuse of the platform, including placing fraudulent orders or manipulating the pricing system, may result in account suspension.",
  },
  {
    title: "Pricing Disclaimer",
    body: "All prices displayed are AI-generated based on real-time demand, season, and region. Prices are subject to admin approval and may vary. Halchal Industries reserves the right to adjust prices before order confirmation.",
  },
  {
    title: "Order & Payment",
    body: "Orders above 100 coils require admin approval before dispatch. Payments are processed securely via Razorpay. GST @ 12% (HSN 3917) is applicable on all orders as per government regulations.",
  },
  {
    title: "Limitation of Liability",
    body: "Halchal Industries is not liable for indirect losses, crop failure, or consequential damages arising from system usage, delivery delays, or product performance beyond standard manufacturing specifications.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Pune, Maharashtra.",
  },
];

const TermsAndConditions = () => {
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
            Terms &amp; Conditions
          </h1>
          <p style={{ fontSize: 15, color: T.text2, lineHeight: 1.7, maxWidth: 560 }}>
            By using the Halchal Industries platform, you agree to comply with these terms and conditions. Please read them carefully before placing any order.
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
        <div style={{ marginTop: 32, padding: "16px 20px", background: T.amberBg, border: `1px solid ${T.amberBd}`, borderRadius: 10 }}>
          <p style={{ fontSize: 13, color: T.amber, margin: 0, lineHeight: 1.6 }}>
            <strong>Note:</strong> This platform is operated by Halchal Industries, Pune, Maharashtra. For queries regarding these terms, contact us via the Contact page.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;
