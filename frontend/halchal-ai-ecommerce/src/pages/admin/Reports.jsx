import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

const T = {
  bg0: "#05070E", bg1: "#0B1120", bg2: "#111B30", bg3: "#18253E",
  amber: "#F5A623", amberSoft: "rgba(245,166,35,0.09)", amberBorder: "rgba(245,166,35,0.22)",
  green: "#00D68F",
  sky: "#38C0FF",
  rose: "#FF5577",
  indigo: "#818CF8",
  violet: "#C084FC",
  border: "rgba(255,255,255,0.07)",
  gridLine: "rgba(255,255,255,0.04)",
  t1: "#EBF0FF", t2: "#7A98B8", t3: "#3F5470",
  font: "'Inter', system-ui, sans-serif",
};

const MONTHLY = [
  { month: "Dec", revenue: 8.4,  orders: 28 },
  { month: "Jan", revenue: 9.2,  orders: 33 },
  { month: "Feb", revenue: 10.1, orders: 38 },
  { month: "Mar", revenue: 12.8, orders: 44 },
  { month: "Apr", revenue: 13.5, orders: 41 },
  { month: "May", revenue: 14.8, orders: 47 },
];

const BY_PIPE = [
  { name: "16mm Inline", revenue: 5200, orders: 21, color: T.green  },
  { name: "16mm Online", revenue: 3800, orders: 14, color: T.amber  },
  { name: "20mm Inline", revenue: 3200, orders: 8,  color: T.sky    },
  { name: "20mm Online", revenue: 2600, orders: 4,  color: T.indigo },
];

const BY_REGION = [
  { name: "Pune",       revenue: 3820, color: T.green  },
  { name: "Nashik",     revenue: 3240, color: T.green  },
  { name: "Kolhapur",   revenue: 2860, color: T.amber  },
  { name: "Aurangabad", revenue: 2100, color: T.amber  },
  { name: "Solapur",    revenue: 1540, color: T.sky    },
  { name: "Nagpur",     revenue: 820,  color: T.indigo },
  { name: "Jalgaon",    revenue: 620,  color: T.t3     },
  { name: "Amravati",   revenue: 400,  color: T.t3     },
];

const SEASONAL = [
  { name: "Kharif\n(Cotton, Sugarcane)", value: 45, color: T.amber  },
  { name: "Rabi\n(Onion, Chilli)",       value: 35, color: T.green  },
  { name: "Zaid\n(Vegetables)",          value: 20, color: T.sky    },
];

const KPI = [
  { label: "Total Revenue",   value: "₹14,82,500", sub: "+11% MoM",  color: T.green  },
  { label: "Total Orders",    value: "47",          sub: "+14% MoM",  color: T.amber  },
  { label: "Avg Order Value", value: "₹31,543",    sub: "per order", color: T.sky    },
  { label: "Revenue/Metre",   value: "₹11.8",      sub: "blended",   color: T.t1     },
  { label: "Regions Active",  value: "8",           sub: "all zones", color: T.green  },
  { label: "AI Price Saves",  value: "₹2.1L",      sub: "vs manual", color: T.amber  },
];

/* ── Shared tooltip ── */
const ChartTooltip = ({ active, payload, label, prefix = "", suffix = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: T.bg2, border: `1px solid ${T.border}`,
      borderRadius: 10, padding: "10px 14px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
    }}>
      {label && <div style={{ fontSize: 11, color: T.t3, marginBottom: 6, fontWeight: 600 }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: 13, fontWeight: 700, color: p.color || T.t1, fontVariantNumeric: "tabular-nums" }}>
          {prefix}{typeof p.value === "number" ? p.value.toLocaleString() : p.value}{suffix}
          {p.name && <span style={{ fontSize: 11, color: T.t2, fontWeight: 400 }}> {p.name}</span>}
        </div>
      ))}
    </div>
  );
};

/* ── Custom Pie label ── */
const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 28;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill={T.t2} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={11} fontFamily={T.font}>
      {value}%
    </text>
  );
};

export default function Reports() {
  const [trendKey, setTrendKey] = useState("revenue");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: T.font }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", animation: "slideUp 0.3s ease both" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: T.t1, margin: 0, fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Reports & Analytics
          </h1>
          <p style={{ fontSize: 13, color: T.t2, margin: "4px 0 0" }}>Business performance overview · May 2026</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ padding: "9px 18px", borderRadius: 9, border: `1px solid ${T.border}`, background: "transparent", color: T.t2, fontSize: 12, cursor: "pointer", fontFamily: T.font, transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = T.bg2}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >Export CSV</button>
          <button style={{ padding: "9px 18px", borderRadius: 9, border: "none", background: T.amber, color: "#04080F", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: T.font, boxShadow: "0 4px 14px rgba(245,166,35,0.25)" }}>
            Download PDF
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12, animation: "slideUp 0.32s ease both", animationDelay: "40ms" }}>
        {KPI.map(({ label, value, sub, color }, i) => (
          <div key={label} style={{
            background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12,
            padding: "16px 16px",
            animation: "slideUp 0.35s ease both", animationDelay: `${i * 40}ms`,
            transition: "box-shadow 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <div style={{ fontSize: 10, color: T.t3, marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600 }}>{label}</div>
            <div style={{ fontSize: 21, fontWeight: 800, color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em", marginBottom: 3 }}>{value}</div>
            <div style={{ fontSize: 10, color: T.t3 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── AREA CHART — Monthly Trend ── */}
      <div style={{
        background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 14,
        padding: "24px 28px",
        animation: "slideUp 0.35s ease both", animationDelay: "120ms",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: T.t1, margin: 0 }}>Monthly Trend</h2>
            <p style={{ fontSize: 12, color: T.t2, margin: "4px 0 0" }}>Revenue (₹ lakhs) and order count — last 6 months</p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ key: "revenue", label: "Revenue", color: T.green }, { key: "orders", label: "Orders", color: T.amber }].map(({ key, label, color }) => (
              <button key={key} onClick={() => setTrendKey(key)} style={{
                padding: "6px 16px", borderRadius: 20, border: `1px solid ${trendKey === key ? color : T.border}`,
                background: trendKey === key ? `${color}18` : "transparent",
                color: trendKey === key ? color : T.t2,
                fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: T.font, transition: "all 0.15s",
              }}>{label}</button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={MONTHLY} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="grad-green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={T.green} stopOpacity={0.28} />
                <stop offset="100%" stopColor={T.green} stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="grad-amber" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={T.amber} stopOpacity={0.28} />
                <stop offset="100%" stopColor={T.amber} stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={T.gridLine} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: T.t3, fontSize: 11, fontFamily: T.font }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: T.t3, fontSize: 11, fontFamily: T.font }} axisLine={false} tickLine={false}
              tickFormatter={v => trendKey === "revenue" ? `₹${v}L` : v} />
            <Tooltip content={({ active, payload, label }) => (
              <ChartTooltip active={active} payload={payload} label={label}
                prefix={trendKey === "revenue" ? "₹" : ""}
                suffix={trendKey === "revenue" ? "L" : " orders"} />
            )} />
            <Area
              type="monotone"
              dataKey={trendKey}
              stroke={trendKey === "revenue" ? T.green : T.amber}
              strokeWidth={2.5}
              fill={trendKey === "revenue" ? "url(#grad-green)" : "url(#grad-amber)"}
              dot={{ r: 4, fill: trendKey === "revenue" ? T.green : T.amber, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: T.bg1 }}
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Bottom row: Pipe BarChart + Region BarChart + Seasonal PieChart ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.85fr", gap: 18 }}>

        {/* Revenue by Pipe — Bar chart */}
        <div style={{
          background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px 24px",
          animation: "slideUp 0.35s ease both", animationDelay: "180ms",
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: T.t1, margin: "0 0 4px" }}>Revenue by Pipe Type</h2>
          <p style={{ fontSize: 12, color: T.t2, margin: "0 0 20px" }}>₹ this month</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={BY_PIPE} barSize={28} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.gridLine} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: T.t3, fontSize: 9.5, fontFamily: T.font }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={({ active, payload, label }) => (
                <ChartTooltip active={active} payload={payload} label={label} prefix="₹" />
              )} />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]} animationDuration={900}>
                {BY_PIPE.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
            {BY_PIPE.map(({ name, color, orders }) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: T.t2 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
                <span>{name} <span style={{ color: T.t3 }}>({orders} orders)</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Region — Horizontal Bar */}
        <div style={{
          background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px 24px",
          animation: "slideUp 0.35s ease both", animationDelay: "220ms",
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: T.t1, margin: "0 0 4px" }}>Revenue by Region</h2>
          <p style={{ fontSize: 12, color: T.t2, margin: "0 0 20px" }}>Maharashtra · this month</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {BY_REGION.map(({ name, revenue, color }) => {
              const max = BY_REGION[0].revenue;
              const pct = Math.round((revenue / max) * 100);
              return (
                <div key={name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: T.t2 }}>{name}</span>
                    <span style={{ fontSize: 12, color: T.t1, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>₹{revenue.toLocaleString()}</span>
                  </div>
                  <div style={{ height: 6, background: T.bg3, borderRadius: 6, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${pct}%`, background: color,
                      borderRadius: 6, transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Seasonal Mix — Pie chart */}
        <div style={{
          background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px 24px",
          animation: "slideUp 0.35s ease both", animationDelay: "260ms",
          display: "flex", flexDirection: "column",
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: T.t1, margin: "0 0 4px" }}>Seasonal Mix</h2>
          <p style={{ fontSize: 12, color: T.t2, margin: "0 0 8px" }}>Sales split by crop season</p>

          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={SEASONAL}
                  cx="50%" cy="50%"
                  innerRadius={48} outerRadius={72}
                  paddingAngle={5}
                  dataKey="value"
                  labelLine={false}
                  label={PieLabel}
                  animationBegin={200}
                  animationDuration={900}
                >
                  {SEASONAL.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip content={({ active, payload }) => (
                  <ChartTooltip active={active} payload={payload} suffix="%" />
                )} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {SEASONAL.map(({ name, value, color }) => (
              <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 9, height: 9, borderRadius: 2, background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: T.t2 }}>{name.replace("\\n", " ")}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Impact callout */}
      <div style={{
        background: T.amberSoft, border: `1px solid ${T.amberBorder}`,
        borderRadius: 14, padding: "20px 28px",
        display: "flex", alignItems: "center", gap: 20,
        animation: "slideUp 0.35s ease both", animationDelay: "300ms",
      }}>
        <div style={{ fontSize: 32, lineHeight: 1 }}>🤖</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.amber, marginBottom: 6 }}>AI Pricing Impact This Month</div>
          <div style={{ fontSize: 13, color: T.t2, lineHeight: 1.65 }}>
            AI-optimised pricing generated an estimated{" "}
            <strong style={{ color: T.green }}>₹2.1 lakh</strong> additional margin vs. flat manual pricing,
            with <strong style={{ color: T.amber }}>94.2%</strong> demand forecast accuracy across all pipe types.
          </div>
        </div>
      </div>
    </div>
  );
}
