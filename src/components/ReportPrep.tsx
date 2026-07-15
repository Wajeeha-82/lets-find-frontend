import { useState, type ComponentType } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  Camera,
  MapPin,
  CalendarDays,
  UserRound,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  UserMinus,
  UserCheck,
  type LucideProps,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

type Variant = 'missing' | 'found';

interface ChecklistItem {
  icon: ComponentType<LucideProps>;
  label: string;
  hint: string;
}

const CHECKLIST: ChecklistItem[] = [
  { icon: Camera, label: 'A clear, recent photo', hint: 'Face visible and well-lit if possible.' },
  { icon: UserRound, label: 'Full name and approximate age', hint: 'A nickname or an estimate is okay.' },
  { icon: CalendarDays, label: 'Date', hint: 'When they were last seen — or when you found them.' },
  { icon: MapPin, label: 'Location', hint: 'Where they were last seen or where you found them.' },
];

const CONFIG: Record<
  Variant,
  { icon: ComponentType<LucideProps>; title: string; subtitle: string; tone: 'primary' | 'accent' }
> = {
  missing: {
    icon: UserMinus,
    title: 'Report a Missing Person',
    subtitle: 'Thank you for stepping up. The details you share help our face-matching find a possible reunion.',
    tone: 'primary',
  },
  found: {
    icon: UserCheck,
    title: 'Report a Found Person',
    subtitle: "Thank you for caring. The details you share help us reconnect this person with their family.",
    tone: 'accent',
  },
};

export default function ReportPrep({ variant }: { variant: Variant }) {
  const { isVerified, phoneNumber, signOut } = useAuth();
  const [checked, setChecked] = useState<boolean[]>(CHECKLIST.map(() => false));
  const [submitted, setSubmitted] = useState(false);

  if (!isVerified) {
    return <Navigate to="/login" replace />;
  }

  const config = CONFIG[variant];
  const allChecked = checked.every(Boolean);
  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  const Icon = config.icon;
  const iconBg = config.tone === 'primary' ? 'bg-primary-700' : 'bg-accent-500';

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-primary-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:py-16">
        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" /> Choose a different role
        </Link>

        <div className="card overflow-hidden">
          <div className="flex items-center gap-4 border-b border-primary-100 bg-white p-6 sm:p-8">
            <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-soft ${iconBg}`}>
              <Icon className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-2xl tracking-tight text-ink sm:text-3xl">{config.title}</h1>
              <p className="mt-1 text-sm text-ink/65">{config.subtitle}</p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Verified contact (auto-filled from AuthContext) */}
            <div className="flex items-center gap-3 rounded-2xl border border-primary-100 bg-white p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-700">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">Verified contact</p>
                <p className="truncate text-xs text-ink/55">
                  +92 {phoneNumber} — confirmed via OTP
                </p>
              </div>
              <span className="rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-medium text-primary-700">
                Auto-filled
              </span>
            </div>

            {!submitted ? (
              <>
                <h2 className="mt-7 text-lg font-semibold text-ink">Before you begin</h2>
                <p className="mt-1 text-sm text-ink/60">
                  Have these ready so the detailed report goes quickly. In the next step
                  you'll upload a photo for face-matching.
                </p>

                <ul className="mt-4 space-y-2.5">
                  {CHECKLIST.map((item, i) => {
                    const ItemIcon = item.icon;
                    const on = checked[i];
                    return (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => toggle(i)}
                          className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                            on
                              ? 'border-primary-300 bg-primary-50'
                              : 'border-primary-100 bg-white hover:border-primary-200'
                          }`}
                        >
                          <span
                            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${
                              on ? 'bg-primary-700 text-white' : 'bg-primary-50 text-primary-600'
                            }`}
                          >
                            <ItemIcon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-ink">{item.label}</span>
                            <span className="block text-xs text-ink/55">{item.hint}</span>
                          </span>
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                              on ? 'border-primary-700 bg-primary-700 text-white' : 'border-primary-200 bg-white'
                            }`}
                          >
                            {on && <CheckCircle2 className="h-4 w-4" />}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <Button
                  onClick={() => setSubmitted(true)}
                  variant={config.tone === 'primary' ? 'primary' : 'accent'}
                  size="lg"
                  className="mt-6 w-full"
                  disabled={!allChecked}
                >
                  Continue to photo &amp; details
                  <ArrowRight className="h-4 w-4" />
                </Button>
                {!allChecked && (
                  <p className="mt-2 text-center text-xs text-ink/45">
                    Confirm each item above to continue.
                  </p>
                )}
              </>
            ) : (
              <div className="animate-fade-up mt-2 rounded-2xl border border-primary-100 bg-white p-6 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-100 text-primary-700">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 className="mt-4 text-xl font-semibold text-ink">You're ready to continue</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-ink/65">
                  The detailed report form — including photo upload for face-matching — is the
                  next phase of Let's Find. Your verified contact and checklist are saved for
                  when it opens.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button to="/" variant="outline" size="md">
                    Back to home
                  </Button>
                  <Button
                    onClick={signOut}
                    variant="ghost"
                    size="md"
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
