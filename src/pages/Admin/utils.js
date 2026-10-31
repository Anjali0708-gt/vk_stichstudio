// Shared helpers for admin pages. They tolerate different API response shapes.
export const toList = (res) => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  return d?.data || d?.orders || d?.customers || d?.services || d?.result || [];
};

export const idOf = (x) => x?._id || x?.id;

export const amountOf = (o) =>
  Number(o?.totalAmount ?? o?.total ?? o?.price ?? o?.amount ?? 0);

export const customerName = (o) => {
  const c = o?.customer ?? o?.customerId;
  if (c && typeof c === "object") return c.name || c.fullName || c.email || "-";
  return c || o?.customerName || "-";
};

export const fmtINR = (n) =>
  "₹" + Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const STATUSES = ["Pending", "In Progress", "Complete", "Delivered", "Cancelled"];

export const statusClass = (s = "") =>
  "badge badge-" + s.toLowerCase().replace(/\s+/g, "-");

export const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "-";
