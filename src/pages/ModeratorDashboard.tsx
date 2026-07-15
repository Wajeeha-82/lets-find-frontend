import { useState } from 'react';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Check,
  X,
  Info,
  MapPin,
  CalendarDays,
  UserRound,
  Eye,
  ShieldCheck,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';

/* ──────────────────────────────────────────────────────────────────────────
 * Types & placeholder data
 * ────────────────────────────────────────────────────────────────────────── */
interface PersonRecord {
  name: string;
  age: number;
  gender: string;
  location: string;
  date: string;
  features: string;
  photo: string;
}

interface Candidate {
  id: string;
  similarity: number;
  timestamp: string;
  missing: PersonRecord;
  found: PersonRecord;
}

const CANDIDATES: Candidate[] = [
  {
    id: 'M-1042',
    similarity: 87,
    timestamp: '2 min ago',
    missing: {
      name: 'Ahmed Raza',
      age: 34,
      gender: 'Male',
      location: 'Liberty Market, Lahore',
      date: 'Jul 7, 2026',
      features: 'Scar on left eyebrow. Navy blue shalwar kameez.',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    found: {
      name: 'Unknown male',
      age: ~34,
      gender: 'Male',
      location: 'Gulberg, Lahore',
      date: 'Jul 10, 2026',
      features: 'Scar on left eyebrow. Disoriented, unable to recall name.',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  },
  {
    id: 'M-1043',
    similarity: 72,
    timestamp: '14 min ago',
    missing: {
      name: 'Fatima Khan',
      age: 28,
      gender: 'Female',
      location: 'Saddar, Karachi',
      date: 'Jul 5, 2026',
      features: 'Mole on right cheek. Wearing a green dupatta.',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    found: {
      name: 'Unknown female',
      age: ~28,
      gender: 'Female',
      location: 'Clifton, Karachi',
      date: 'Jul 9, 2026',
      features: 'Mole on right cheek. Carrying a green dupatta.',
      photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  },
  {
    id: 'M-1044',
    similarity: 64,
    timestamp: '31 min ago',
    missing: {
      name: 'Bilal Ahmed',
      age: 41,
      gender: 'Male',
      location: 'Qissa Khwani Bazaar, Peshawar',
      date: 'Jul 3, 2026',
      features: 'Greying beard. Walks with a slight limp.',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    found: {
      name: 'Unknown male',
      age: ~40,
      gender: 'Male',
      location: 'Hayatabad, Peshawar',
      date: 'Jul 8, 2026',
      features: 'Greying beard. Limp noticeable when walking.',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  },
  {
    id: 'M-1045',
    similarity: 91,
    timestamp: '1 hr ago',
    missing: {
      name: 'Sana Tariq',
      age: 19,
      gender: 'Female',
      location: 'Blue Area, Islamabad',
      date: 'Jul 6, 2026',
      features: 'Birthmark on left forearm. Maroon headscarf.',
      photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    found: {
      name: 'Unknown female',
      age: ~19,
      gender: 'Female',
      location: 'F-7 Markaz, Islamabad',
      date: 'Jul 11, 2026',
      features: 'Birthmark on left forearm. Wearing a maroon scarf.',
      photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  },
  {
    id: 'M-1046',
    similarity: 58,
    timestamp: '2 hr ago',
    missing: {
      name: 'Imran Sheikh',
      age: 52,
      gender: 'Male',
      location: 'Bohri Bazaar, Rawalpindi',
      date: 'Jul 2, 2026',
      features: 'Wears glasses. Missing upper right incisor.',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    found: {
      name: 'Unknown male',
      age: ~50,
      gender: 'Male',
      location: 'Raja Bazaar, Rawalpindi',
      date: 'Jul 6, 2026',
      features: 'Wears glasses. Noticeable gap in upper teeth.',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  },
  {
    id: 'M-1047',
    similarity: 83,
    timestamp: '3 hr ago',
    missing: {
      name: 'Zainab Hussain',
      age: 7,
      gender: 'Female',
      location: 'Anarkali Bazaar, Lahore',
      date: 'Jul 8, 2026',
      features: 'Short braided hair. Yellow kameez with white embroidery.',
      photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    found: {
      name: 'Unknown child',
      age: ~7,
      gender: 'Female',
      location: 'Bhatti Chowk, Lahore',
      date: 'Jul 10, 2026',
      features: 'Short braided hair. Yellow outfit with white trim.',
      photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  },
];

const STATS = [
  { icon: ClipboardList, label: 'Pending Reviews', value: '6', tone: 'primary' },
  { icon: CheckCircle2, label: 'Confirmed Today', value: '14', tone: 'green' },
  { icon: Clock, label: 'Avg Review Time', value: '3.2m', tone: 'amber' },
];

/* ──────────────────────────────────────────────────────────────────────────
 * Page
 * ────────────────────────────────────────────────────────────────────────── */
export default function ModeratorDashboard() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = CANDIDATES[selectedIdx];
  const score = selected.similarity;
  const ringColor = score >= 80 ? '#16a34a' : '#E8A33D';

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:py-10">
      {/* ── Header ── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl tracking-tight text-primary-700 sm:text-3xl">
            Moderator Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            Review face-match candidates side by side before confirming a reunion.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-3.5 py-1.5 text-xs font-medium text-primary-700 shadow-soft">
          <ShieldCheck className="h-3.5 w-3.5" />
          Staff access · verified
        </span>
      </div>

      {/* ── Stats bar ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((s) => {
          const Icon = s.icon;
          const iconBg =
            s.tone === 'green'
              ? 'bg-green-100 text-green-700'
              : s.tone === 'amber'
                ? 'bg-[#E8A33D]/15 text-[#a9711f]'
                : 'bg-primary-100 text-primary-700';
          return (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-2xl border border-[#d3e6e3] bg-[#eaf4f4] p-4 shadow-soft"
            >
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${iconBg}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-primary-700">
                  {s.value}
                </p>
                <p className="text-xs font-medium text-ink/55">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main grid: sidebar + review panel ── */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* ── Sidebar: pending candidates ── */}
        <aside className="flex flex-col rounded-2xl border border-[#d3e6e3] bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-[#d3e6e3] px-5 py-4">
            <h2 className="text-sm font-semibold text-primary-700">Pending candidates</h2>
            <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
              {CANDIDATES.length}
            </span>
          </div>

          <div className="max-h-[640px] overflow-y-auto p-3">
            {CANDIDATES.map((c, i) => {
              const active = i === selectedIdx;
              const cScore = c.similarity;
              const scoreBg =
                cScore >= 80
                  ? 'bg-green-600 text-white'
                  : 'bg-[#E8A33D] text-white';
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedIdx(i)}
                  className={`mb-2 flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                    active
                      ? 'border-primary-400 bg-primary-50'
                      : 'border-transparent hover:border-primary-200 hover:bg-primary-50/50'
                  }`}
                >
                  {/* Thumbnail pair */}
                  <div className="flex shrink-0 -space-x-3">
                    <img
                      src={c.missing.photo}
                      alt=""
                      className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <img
                      src={c.found.photo}
                      alt=""
                      className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">
                      {c.missing.name}
                    </p>
                    <p className="text-xs text-ink/45">{c.timestamp}</p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${scoreBg}`}
                  >
                    {cScore}%
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── Review panel ── */}
        <div className="rounded-2xl border border-[#d3e6e3] bg-[#eaf4f4] p-5 shadow-soft sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-primary-700">
              Candidate review
            </h2>
            <span className="text-xs font-medium text-ink/50">
              Case #{selected.id}
            </span>
          </div>

          {/* ── Two photo cards + score ring ── */}
          <div className="grid items-start gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <PersonCard label="Missing Report" data={selected.missing} accent="primary" />
            <ScoreRing score={score} color={ringColor} />
            <PersonCard label="Found Report" data={selected.found} accent="amber" />
          </div>

          {/* ── Action buttons ── */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-green-700"
            >
              <Check className="h-4 w-4" />
              Confirm Match
            </button>

            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#c66b4a] bg-transparent px-6 py-3 text-sm font-semibold text-[#9c4a2e] transition-colors hover:bg-[#c66b4a]/5"
            >
              <X className="h-4 w-4" />
              Reject
            </button>

            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#E8A33D] bg-transparent px-6 py-3 text-sm font-semibold text-[#a9711f] transition-colors hover:bg-[#E8A33D]/5"
            >
              <Info className="h-4 w-4" />
              Needs More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Person card
 * ────────────────────────────────────────────────────────────────────────── */
function PersonCard({
  label,
  data,
  accent,
}: {
  label: string;
  data: PersonRecord;
  accent: 'primary' | 'amber';
}) {
  const labelBg =
    accent === 'amber'
      ? 'bg-[#E8A33D] text-white'
      : 'bg-primary-700 text-white';

  return (
    <div className="overflow-hidden rounded-2xl border border-[#d3e6e3] bg-white shadow-sm">
      <div className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wide ${labelBg}`}>
        {label}
      </div>
      <img
        src={data.photo}
        alt={data.name}
        className="h-44 w-full object-cover sm:h-52"
      />
      <div className="p-4">
        <h3 className="text-base font-semibold text-ink">{data.name}</h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/60">
          <span className="inline-flex items-center gap-1">
            <UserRound className="h-3.5 w-3.5 text-primary-500" />
            {data.age} yrs · {data.gender}
          </span>
        </div>

        <div className="mt-3 space-y-2">
          <DetailRow icon={MapPin} text={`${data.location}`} />
          <DetailRow icon={CalendarDays} text={data.date} />
          <DetailRow icon={Eye} text={data.features} />
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  text,
}: {
  icon: ComponentType<LucideProps>;
  text: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" />
      <p className="text-xs leading-relaxed text-ink/70">{text}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Circular score ring — SVG, color driven by score
 * ────────────────────────────────────────────────────────────────────────── */
function ScoreRing({ score, color }: { score: number; color: string }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center self-center py-2">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#d3e6e3"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold tracking-tight"
            style={{ color }}
          >
            {score}%
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wide text-ink/45">
            similarity
          </span>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-ink/50">
        {score >= 80 ? 'High confidence' : 'Moderate confidence'}
      </p>
    </div>
  );
}
