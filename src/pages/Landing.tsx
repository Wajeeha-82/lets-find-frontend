import {
  ScanFace,
  ClipboardList,
  BellRing,
  ShieldCheck,
  Lock,
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  Sparkles,
  MapPin,
  Search,
  Users,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Report',
    body: 'Share a photo and a few details about the missing or found person. Reporters verify their identity with a quick OTP, so every report is trusted.',
  },
  {
    icon: ScanFace,
    title: 'We Match',
    body: 'Our face-matching technology compares each new report against the database of missing and found persons to surface possible reunions.',
  },
  {
    icon: BellRing,
    title: 'We Notify',
    body: 'When a likely match is found, we alert both reporting families and local partner organizations to coordinate a safe reunion.',
  },
];

const FEATURES = [
  {
    icon: ScanFace,
    title: 'Face-matching built for reunions',
    body: 'Purpose-built matching compares reports to surface possible matches that a manual search might miss.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified reporters only',
    body: 'Every report comes from an OTP-verified phone number, reducing misuse and protecting the people involved.',
  },
  {
    icon: Lock,
    title: 'Privacy-first by design',
    body: 'Sensitive details are handled with care and only shared with verified contacts coordinating the reunion.',
  },
  {
    icon: BellRing,
    title: 'Real-time alerts',
    body: 'Get notified the moment a likely match appears, so families can act while every minute still counts.',
  },
];

const TRUST = ['Verified reporters', 'Privacy-first', 'Free for families'];

const TEAM = [
  { initials: 'MS', name: 'Maham Shafique', role: 'Developer' },
  { initials: 'WR', name: 'Wajeeha Rauf', role: 'Developer' },
  { initials: 'MN', name: 'Maria Noor', role: 'Developer' },
];



export default function Landing() {
  return (
    <div>
      {/* ──────────────── HERO ──────────────── */}
      <section className="relative overflow-hidden">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary-300/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[11fr_9fr] lg:gap-16 lg:py-24">

          {/* ── Left: Text ── */}
          <div className="animate-fade-up flex flex-col items-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-3.5 py-1.5 text-xs font-medium text-primary-700 shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-accent-500" />
              Face-matching for family reunification
            </span>

            <h1 className="mt-5 text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
              Bringing missing{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary-600">loved ones</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded bg-accent-500/20" />
              </span>{' '}
              home.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
              Let's Find pairs reports of missing and found persons using face-matching
              technology and notifies families the moment a match appears. Every report is
              filed by a verified contact.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/missing-report" variant="accent" size="lg">
                Report a Missing Person
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/found-report" variant="primary" size="lg">
                Report a Found Person
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <p className="mt-3 text-xs text-ink/45">
              Identity verified via OTP before filing any report.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {TRUST.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm text-ink/65">
                  <ShieldCheck className="h-4 w-4 text-primary-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: Photo ── */}
          <div className="animate-fade-up relative [animation-delay:150ms]">
            {/* Soft glow */}
            <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary-300/40 to-accent-500/15 blur-2xl" />

            {/* Photo card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-primary-100 shadow-card">
              <img
                src="https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="A family reuniting — representing the purpose of Let's Find"
                className="h-[420px] w-full object-cover"
                loading="eager"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent p-5 pt-16">
                <p className="text-sm font-medium text-white/95">
                  Every reunion starts with a single report.
                </p>
              </div>
            </div>

            {/* Floating badge: Reunited */}
            <div className="absolute -right-3 top-6 z-10 animate-float rounded-2xl border border-primary-100 bg-white px-3 py-2 shadow-card [animation-delay:400ms]">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary-700">
                <HeartHandshake className="h-4 w-4 text-accent-500" /> Reunited
              </span>
            </div>

            {/* Floating badge: Match */}
            <div className="absolute -left-3 top-1/2 z-10 animate-float rounded-2xl border border-primary-100 bg-white px-3 py-2 shadow-card [animation-delay:700ms]">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary-700">
                <BadgeCheck className="h-4 w-4 text-primary-600" /> 98% match
              </span>
            </div>

            {/* Floating badge: Found nearby */}
            <div className="absolute -bottom-3 left-8 z-10 animate-float rounded-2xl border border-primary-100 bg-white px-3 py-2 shadow-card [animation-delay:1000ms]">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary-700">
                <MapPin className="h-4 w-4 text-accent-500" /> Found nearby
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── HOW IT WORKS ──────────────── */}
      <section id="how-it-works" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
              How it works
            </p>
            <h2 className="mt-2 text-3xl tracking-tight text-ink sm:text-4xl">
              Three steps to a possible reunion
            </h2>
            <p className="mt-4 text-ink/70">
              From the first report to a notified family, the process is simple, verified,
              and built around the people searching for each other.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="card-interactive relative p-7">
                <span className="absolute right-6 top-6 text-5xl font-display font-semibold text-primary-100">
                  {i + 1}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-700 text-white shadow-soft">
                  <step.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.body}</p>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-primary-300 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── FEATURES ──────────────── */}
      <section className="bg-primary-50/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl tracking-tight text-ink sm:text-4xl">
              Why families choose Let's Find
            </h2>
            <p className="mt-4 text-ink/70">
              A calm, trustworthy platform designed around safety, privacy, and the urgency
              of finding someone you love.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="card-interactive flex gap-4 p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary-600 shadow-soft">
                  <feature.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{feature.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── OUR TEAM ──────────────── */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
              Our Team
            </p>
            <h2 className="mt-2 text-3xl tracking-tight text-ink sm:text-4xl">
              The people behind Let's Find
            </h2>
            <p className="mt-4 text-ink/70">
              A team from the Department of Computer Science, University of Agriculture
              Faisalabad, combining academic rigor with a commitment to civic technology.
            </p>
          </div>

          {/* Faculty Mentor */}
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="card-interactive relative overflow-hidden flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:text-left">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-100/60 to-transparent" />
              <span className="relative grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-2xl font-bold text-white shadow-soft">
                MZ
                <span className="absolute -bottom-1.5 -right-1.5 grid h-7 w-7 place-items-center rounded-full bg-accent-500 shadow-soft">
                  <Search className="h-3.5 w-3.5 text-white" />
                </span>
              </span>
              <div className="relative min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">Faculty Mentor</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">Dr. Muhammad Zeeshan Asaf</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  Providing academic guidance and domain expertise in computer vision and
                  civic technology systems.
                </p>
              </div>
            </div>
          </div>

          {/* Development Team */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-primary-100" />
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600">
              <Users className="h-4 w-4" /> Development Team
            </span>
            <div className="h-px flex-1 bg-primary-100" />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="card-interactive flex flex-col items-center gap-4 p-6 text-center">
                <span
                  className="grid h-16 w-16 place-items-center rounded-2xl text-lg font-bold text-white shadow-soft"
                  style={{
                    background: 'linear-gradient(135deg, #358f80, #036666)',
                  }}
                >
                  {member.initials}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink">{member.name}</h3>
                  <p className="mt-0.5 text-sm text-ink/55">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── CTA BAND ──────────────── */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 px-6 py-12 text-center shadow-card sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <h2 className="relative text-3xl tracking-tight text-white sm:text-4xl">
              Hope starts with a report
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/80">
              Whether someone is missing or has been found, a verified report is the first
              step toward bringing them home.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/missing-report" variant="accent" size="lg">
                Report a Missing Person
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                to="/found-report"
                size="lg"
                className="border border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                Report a Found Person
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
