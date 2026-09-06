import { differenceInCalendarDays, parseISO } from "date-fns";

export function formatUsd(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "$0";
  if (value >= 1_000_000) {
    const n = value / 1_000_000;
    return `$${trimNum(n)}M`;
  }
  if (value >= 1_000) {
    const n = value / 1_000;
    return `$${trimNum(n)}k`;
  }
  return `$${Math.round(value)}`;
}

function trimNum(n: number): string {
  const rounded = n >= 10 ? n.toFixed(0) : n.toFixed(1);
  return rounded.replace(/\.0$/, "");
}

export function relativeDay(iso: string, now = new Date()): string {
  const d = parseISO(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const diff = differenceInCalendarDays(now, d);
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 14) return `${diff}d ago`;
  if (diff < 60) return `${Math.round(diff / 7)}w ago`;
  return `${Math.round(diff / 30)}mo ago`;
}

export function nid(): string {
  return crypto.randomUUID();
}
