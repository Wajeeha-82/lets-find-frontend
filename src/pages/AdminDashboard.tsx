import {
  FolderKanban,
  HeartHandshake,
  Users,
  Clock,
  UserPlus,
  ShieldAlert,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';

/* ──────────────────────────────────────────────────────────────────────────
 * Stat cards
 * ────────────────────────────────────────────────────────────────────────── */
interface StatDef {
  icon: ComponentType<LucideProps>;
  value: string;
  label: string;
  tone: 'primary' | 'green' | 'amber' | 'ink';
}

const STATS: StatDef[] = [
  { icon: FolderKanban, value: '1,284', label: 'Total Cases', tone: 'primary' },
  { icon: HeartHandshake, value: '317', label: 'Matches Made', tone: 'green' },
  { icon: Users, value: '12', label: 'Active Moderators', tone: 'amber' },
  { icon: Clock, value: '4.6h', label: 'Avg Time-to-Match', tone: 'ink' },
];

/* ──────────────────────────────────────────────────────────────────────────
 * Chart data — believable gradual upward trend over 30 days
 * ────────────────────────────────────────────────────────────────────────── */
const CHART_DATA = [
  8, 6, 9, 7, 10, 12, 9, 11, 14, 10, 13, 15, 12, 16, 14, 18, 15, 17, 20, 16,
  19, 22, 18, 21, 24, 20, 23, 26, 22, 28,
];

/* ──────────────────────────────────────────────────────────────────────────
 * Moderator table data
 * ────────────────────────────────────────────────────────────────────────── */
interface ModRow {
  name: string;
  reviewed: number;
  decisions: number;
  lastActive: string;
}

const MODERATORS: ModRow[] = [
  { name: 'Ayesha Malik', reviewed: 214, decisions: 198, lastActive: '12 min ago' },
  { name: 'Usman Tariq', reviewed: 187, decisions: 172, lastActive: '1 hr ago' },
  { name: 'Rabia Siddiqui', reviewed: 256, decisions: 241, lastActive: '4 min ago' },
  { name: 'Hamza Sheikh', reviewed: 143, decisions: 128, lastActive: '2 hr ago' },
  { name: 'Mariam Yousuf', reviewed: 301, decisions: 289, lastActive: 'Just now' },
  { name: 'Bilal Khan', reviewed: 168, decisions: 151, lastActive: '35 min ago' },
];

/* ──────────────────────────────────────────────────────────────────────────
 * Page
 * ────────────────────────────────────────────────────────────────────────── */
export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      {/* ── Header ── */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl tracking-tight text-primary-700 sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            Platform-wide statistics and moderator management.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-3.5 py-1.5 text-xs font-medium text-primary-700 shadow-soft">
          <ShieldAlert className="h-3.5 w-3.5" />
          Admin access
        </span>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          const iconBg =
            s.tone === 'green'
              ? 'bg-green-100 text-green-700'
              : s.tone === 'amber'
                ? 'bg-[#E8A33D]/15 text-[#a9711f]'
                : s.tone === 'ink'
                  ? 'bg-ink/10 text-ink/70'
                  : 'bg-primary-100 text-primary-700';
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-[#d3e6e3] bg-[#eaf4f4] p-5 shadow-soft"
            >
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${iconBg}`}>
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-primary-700">
                {s.value}
              </p>
              <p className="mt-1 text-sm font-medium text-ink/55">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* ── Line chart ── */}
      <div className="mt-8 rounded-2xl border border-[#d3e6e3] bg-[#eaf4f4] p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-primary-700">
              Cases Submitted
            </h2>
            <p className="mt-0.5 text-sm text-ink/55">Last 30 days</p>
          </div>
          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
            +18% vs prior period
          </span>
        </div>
        <LineChart data={CHART_DATA} />
      </div>

      {/* ── Moderator accounts table ── */}
      <div className="mt-8 rounded-2xl border border-[#d3e6e3] bg-[#eaf4f4] p-6 shadow-soft">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-primary-700">
              Moderator Accounts
            </h2>
            <p className="mt-0.5 text-sm text-ink/55">
              {MODERATORS.length} active moderators
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#E8A33D] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-[#cf8e2a]"
          >
            <UserPlus className="h-4 w-4" />
            Add Moderator
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-[#d3e6e3] bg-white md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#d3e6e3] bg-primary-50/60">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-primary-700">
                  Name
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-primary-700">
                  Cases Reviewed
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-primary-700">
                  Decisions Made
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-primary-700">
                  Last Active
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {MODERATORS.map((m) => (
                <tr
                  key={m.name}
                  className="border-b border-[#d3e6e3] last:border-0 transition-colors hover:bg-primary-50/40"
                >
                  <td className="px-5 py-3.5 font-medium text-ink">{m.name}</td>
                  <td className="px-5 py-3.5 text-ink/70">{m.reviewed}</td>
                  <td className="px-5 py-3.5 text-ink/70">{m.decisions}</td>
                  <td className="px-5 py-3.5 text-ink/60">{m.lastActive}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="cursor-pointer text-sm font-medium text-[#9c4a2e] transition-colors hover:text-[#c66b4a]">
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {MODERATORS.map((m) => (
            <div
              key={m.name}
              className="rounded-xl border border-[#d3e6e3] bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-ink">{m.name}</p>
                <span className="cursor-pointer text-sm font-medium text-[#9c4a2e]">
                  Remove
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-ink/60">
                <span>Reviewed: <strong className="text-ink/80">{m.reviewed}</strong></span>
                <span>Decisions: <strong className="text-ink/80">{m.decisions}</strong></span>
                <span className="col-span-2">Last active: {m.lastActive}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Lightweight SVG line + area chart
 * ────────────────────────────────────────────────────────────────────────── */
function LineChart({ data }: { data: number[] }) {
  const W = 760;
  const H = 240;
  const padX = 40;
  const padY = 24;
  const max = Math.max(...data) * 1.15;
  const min = 0;

  const xStep = (W - padX * 2) / (data.length - 1);
  const points = data.map((v, i) => {
    const x = padX + i * xStep;
    const y = H - padY - ((v - min) / (max - min)) * (H - padY * 2);
    return [x, y] as const;
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1][0].toFixed(1)} ${H - padY} L ${points[0][0].toFixed(1)} ${H - padY} Z`;

  const yTicks = 4;
  const yLabels = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round((max / yTicks) * i),
  );

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full min-w-[640px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#358f80" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#358f80" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Y grid + labels */}
        {yLabels.map((label, i) => {
          const y = H - padY - (i / yTicks) * (H - padY * 2);
          return (
            <g key={label}>
              <line
                x1={padX}
                x2={W - padX}
                y1={y}
                y2={y}
                stroke="#d3e6e3"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <text
                x={padX - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-[#2B2B2B]"
                style={{ fontSize: 11, opacity: 0.5 }}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* X labels (every 5th day) */}
        {points.map((p, i) =>
          i % 5 === 0 ? (
            <text
              key={i}
              x={p[0]}
              y={H - 6}
              textAnchor="middle"
              className="fill-[#2B2B2B]"
              style={{ fontSize: 11, opacity: 0.5 }}
            >
              Day {i + 1}
            </text>
          ) : null,
        )}

        {/* Area + line */}
        <path d={areaPath} fill="url(#areaFill)" />
        <path
          d={linePath}
          fill="none"
          stroke="#358f80"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r={i === points.length - 1 ? 4.5 : 2.5}
            fill="#fff"
            stroke="#358f80"
            strokeWidth={i === points.length - 1 ? 2.5 : 1.5}
          />
        ))}
      </svg>
    </div>
  );
}
