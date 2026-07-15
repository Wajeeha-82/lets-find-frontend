import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  UserRound,
  Eye,
  ClipboardCheck,
  ShieldCheck,
  Bell,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';

/* ──────────────────────────────────────────────────────────────────────────
 * Status badge system — 5 distinct states
 * ────────────────────────────────────────────────────────────────────────── */
type StatusKey = 'open' | 'review' | 'matched' | 'closed' | 'false';

interface StatusDef {
  label: string;
  badge: string;
  dot: string;
}

const STATUS: Record<StatusKey, StatusDef> = {
  open: {
    label: 'Open',
    badge: 'bg-blue-100 text-blue-700 border border-blue-200',
    dot: 'bg-blue-500',
  },
  review: {
    label: 'Under Review',
    badge: 'bg-[#E8A33D]/15 text-[#a9711f] border border-[#E8A33D]/30',
    dot: 'bg-[#E8A33D]',
  },
  matched: {
    label: 'Matched',
    badge: 'bg-green-600 text-white border border-green-700',
    dot: 'bg-green-600',
  },
  closed: {
    label: 'Closed',
    badge: 'bg-gray-200 text-gray-600 border border-gray-300',
    dot: 'bg-gray-400',
  },
  false: {
    label: 'False Lead',
    badge: 'bg-[#c66b4a]/15 text-[#9c4a2e] border border-[#c66b4a]/30',
    dot: 'bg-[#c66b4a]',
  },
};

/* ──────────────────────────────────────────────────────────────────────────
 * Timeline
 * ────────────────────────────────────────────────────────────────────────── */
interface TimelineEntry {
  icon: ComponentType<LucideProps>;
  title: string;
  detail: string;
  time: string;
  done: boolean;
}

const TIMELINE: TimelineEntry[] = [
  {
    icon: ShieldCheck,
    title: 'Case submitted',
    detail: 'Report received and assigned case ID #MP-2041.',
    time: 'Jul 9, 2026 · 2:14 PM',
    done: true,
  },
  {
    icon: Eye,
    title: 'Under review by moderator',
    detail: 'Our team is verifying the details and photo quality.',
    time: 'Jul 10, 2026 · 9:30 AM',
    done: true,
  },
  {
    icon: ClipboardCheck,
    title: 'Match found — pending confirmation',
    detail: 'A possible match was found. Our moderator is confirming before sharing.',
    time: 'Jul 12, 2026 · 4:48 PM',
    done: true,
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 * Placeholder case data
 * ────────────────────────────────────────────────────────────────────────── */
const CASE = {
  id: 'MP-2041',
  status: 'matched' as StatusKey,
  name: 'Ahmed Raza',
  age: 34,
  gender: 'Male',
  lastSeenDate: 'July 7, 2026',
  lastSeenLocation: 'Liberty Market, Lahore',
  features: 'Scar on left eyebrow. Was wearing a navy blue shalwar kameez.',
  photo:
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
};

export default function CaseStatus() {
  const { id } = useParams();
  const status = STATUS[CASE.status];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Back link */}
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-primary-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      {/* ── Case header card ── */}
      <div className="rounded-3xl border border-[#d3e6e3] bg-[#eaf4f4] p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {/* Photo thumbnail */}
          <div className="shrink-0">
            <img
              src={CASE.photo}
              alt={CASE.name}
              className="h-28 w-28 rounded-2xl border border-[#d3e6e3] object-cover shadow-sm"
            />
          </div>

          {/* Identity + status */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-ink/45">
                  Case #{id ?? CASE.id}
                </p>
                <h1 className="mt-1 text-2xl tracking-tight text-primary-700 sm:text-3xl">
                  {CASE.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/70">
                  <span>Age {CASE.age}</span>
                  <span className="text-ink/30">·</span>
                  <span>{CASE.gender}</span>
                </div>
              </div>

              {/* Prominent status badge */}
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.badge}`}
              >
                <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="mt-8 rounded-3xl border border-[#d3e6e3] bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-lg font-semibold text-primary-700">Case history</h2>
        <p className="mt-1 text-sm text-ink/55">
          A step-by-step record of your case as it moves through each stage.
        </p>

        <ol className="mt-6 space-y-0">
          {TIMELINE.map((entry, i) => {
            const Icon = entry.icon;
            const isLast = i === TIMELINE.length - 1;
            return (
              <li key={entry.title} className="relative flex gap-4 pb-8 last:pb-0">
                {/* Vertical connector */}
                {!isLast && (
                  <span
                    className="absolute left-5 top-11 h-[calc(100%-2.5rem)] w-px bg-primary-200"
                    aria-hidden
                  />
                )}

                {/* Icon node */}
                <span className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary-200 bg-primary-50 text-primary-700">
                  <Icon className="h-5 w-5" />
                </span>

                {/* Content */}
                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-sm font-semibold text-ink">{entry.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink/60">
                    {entry.detail}
                  </p>
                  <p className="mt-1.5 text-xs text-ink/40">{entry.time}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ── Case details (2-column) ── */}
      <div className="mt-8 rounded-3xl border border-[#d3e6e3] bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-lg font-semibold text-primary-700">Case details</h2>
        <div className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <Detail icon={UserRound} label="Age" value={`${CASE.age}`} />
          <Detail icon={CalendarDays} label="Last seen date" value={CASE.lastSeenDate} />
          <Detail icon={MapPin} label="Last seen location" value={CASE.lastSeenLocation} />
          <Detail
            icon={Eye}
            label="Distinguishing features"
            value={CASE.features}
          />
        </div>
      </div>

      {/* ── Notice box ── */}
      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#E8A33D]/20 bg-[#E8A33D]/8 p-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E8A33D]/20 text-[#a9711f]">
          <Bell className="h-4 w-4" />
        </span>
        <p className="text-sm leading-relaxed text-ink/75">
          If a match is confirmed, we'll notify you here and via email — we never share
          contact details directly.
        </p>
      </div>
    </div>
  );
}

/* ── Detail row ──────────────────────────────────────────────────────────── */
function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<LucideProps>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/45">
          {label}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink/80">{value}</p>
      </div>
    </div>
  );
}
