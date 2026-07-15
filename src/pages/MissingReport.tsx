import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Upload,
  ImageIcon,
  Check,
  ShieldCheck,
  Lock,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ── Progress Steps ──────────────────────────────────────────────────────── */
const STEPS = [
  { id: 1, label: 'Person details' },
  { id: 2, label: 'Matching info' },
  { id: 3, label: 'Review & submit' },
];

/* ── Case Status Badges ──────────────────────────────────────────────────── */
const CASE_STATUSES = [
  {
    label: 'Open',
    desc: 'Newly filed, actively searching for matches.',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    label: 'Under Review',
    desc: 'Our team is verifying the report details.',
    className: 'bg-accent-500/15 text-accent-700 border-accent-500/30',
  },
  {
    label: 'Matched',
    desc: 'A likely match has been found and shared.',
    className: 'bg-green-500 text-white border-green-600',
  },
  {
    label: 'Closed',
    desc: 'Case resolved or no longer active.',
    className: 'bg-gray-200 text-gray-600 border-gray-300',
  },
];

export default function MissingReport() {
  const { phoneNumber } = useAuth();
  const navigate = useNavigate();
  const [currentStep] = useState(1);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [extraPhotos, setExtraPhotos] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const extraInputRef = useRef<HTMLInputElement>(null);

  const handleMainPhoto = (files: FileList | null) => {
    if (files && files[0]) setPhotoName(files[0].name);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleMainPhoto(e.dataTransfer.files);
  };

  const handleExtraPhotos = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setExtraPhotos((prev) => [...prev, ...Array.from(files).map((f) => f.name)]);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      {/* ── Page header ── */}
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-3.5 py-1.5 text-xs font-medium text-primary-700 shadow-soft">
          <AlertCircle className="h-3.5 w-3.5 text-accent-500" />
          Step {currentStep} of 3 · Missing Person Report
        </span>
        <h1 className="mt-4 text-3xl tracking-tight text-primary-700 sm:text-4xl">
          Report a missing person
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
          Every detail you share helps us search more effectively. Take your time —
          you can always edit this report later.
        </p>
      </div>

      {/* ── Progress indicator ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold transition-all duration-300 ${
                    step.id <= currentStep
                      ? 'bg-primary-700 text-white shadow-soft'
                      : 'border-2 border-primary-200 bg-white text-primary-300'
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`hidden text-xs font-medium sm:block ${
                    step.id <= currentStep ? 'text-primary-700' : 'text-ink/40'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="mx-2 h-1 flex-1 rounded-full bg-primary-100 sm:mx-3">
                  <div
                    className="h-full rounded-full bg-primary-700 transition-all duration-500"
                    style={{ width: step.id < currentStep ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Form card ── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/case-status');
        }}
        className="rounded-3xl border border-[#d3e6e3] bg-[#eaf4f4] p-6 shadow-soft sm:p-8"
      >
        <div className="space-y-6">
          {/* Full name */}
          <Field label="Full name" required>
            <input
              type="text"
              required
              placeholder="e.g. Ahmed Raza"
              className={inputClass}
            />
          </Field>

          {/* Age + Gender row */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Age or estimated age" required>
              <input
                type="number"
                required
                min={0}
                max={120}
                placeholder="e.g. 34"
                className={inputClass}
              />
            </Field>

            <Field label="Gender" required>
              <select required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="unsure">Unsure</option>
              </select>
            </Field>
          </div>

          {/* Last seen date + location row */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Last seen date" required>
              <input type="date" required className={inputClass} />
            </Field>

            <Field label="Last seen location" required>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="City, area, or address"
                  className={`${inputClass} flex-1`}
                />
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-primary-700 bg-white px-3 py-2.5 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Pin on map</span>
                </button>
              </div>
            </Field>
          </div>

          {/* Distinguishing features */}
          <Field label="Distinguishing features">
            <textarea
              rows={3}
              placeholder="scars, marks, clothing worn, etc."
              className={`${inputClass} resize-none`}
            />
          </Field>

          {/* Photo upload */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary-700">
              Photo upload <span className="text-accent-600">*</span>
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200 ${
                dragging
                  ? 'border-primary-500 bg-primary-50'
                  : photoName
                    ? 'border-primary-300 bg-white/70'
                    : 'border-primary-200 bg-white/50 hover:border-primary-400 hover:bg-primary-50/60'
              }`}
            >
              {photoName ? (
                <>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-100 text-primary-600">
                    <Check className="h-6 w-6" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-primary-700">{photoName}</p>
                  <p className="mt-1 text-xs text-ink/50">Click to replace</p>
                </>
              ) : (
                <>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-100 text-primary-600">
                    <Upload className="h-6 w-6" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-primary-700">
                    Drag &amp; drop or click to upload
                  </p>
                  <p className="mt-1 text-xs text-ink/50">
                    Please upload a clear, front-facing photo
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleMainPhoto(e.target.files)}
              />
            </div>
          </div>

          {/* Contact info (auto-filled) */}
          <Field label="Contact phone number" required>
            <div className="relative">
              <input
                type="tel"
                required
                value={phoneNumber ?? ''}
                readOnly
                placeholder="Auto-filled from your verified login"
                className={`${inputClass} cursor-not-allowed bg-primary-50/60 pr-10`}
              />
              <ShieldCheck className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-500" />
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink/50">
              <Lock className="h-3 w-3" />
              Auto-filled from your verified phone number. Only visible to verified
              reporters on matched cases.
            </p>
          </Field>

          {/* Consent checkbox */}
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white/60 p-4 transition-colors hover:bg-white/80">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-primary-300 text-primary-700 focus:ring-primary-500"
            />
            <span className="text-sm leading-relaxed text-ink/75">
              I understand this photo will be compared against other reports using face
              recognition.
            </span>
          </label>
        </div>

        {/* ── Actions ── */}
        <div className="mt-8 flex items-center justify-end">
          <button
            type="button"
            disabled={!consent || !photoName}
            onClick={() => navigate('/case-status')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8A33D] px-7 py-3.5 text-base font-semibold tracking-tight text-white shadow-soft transition-all duration-200 hover:bg-[#cf8e2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eaf4f4] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* ── Add more photos ── */}
      <div className="mt-10 rounded-2xl border border-[#d3e6e3] bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-primary-700">Add more photos</h2>
        <p className="mt-1.5 text-sm text-ink/60">
          Additional photos can help with matching. You can add more to this case later
          as well.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {extraPhotos.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-2 rounded-xl border border-primary-100 bg-[#eaf4f4] px-3 py-2"
            >
              <ImageIcon className="h-4 w-4 text-primary-500" />
              <span className="max-w-[140px] truncate text-xs text-ink/70">{name}</span>
              <Check className="h-3.5 w-3.5 text-primary-600" />
            </div>
          ))}

          <button
            type="button"
            onClick={() => extraInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-primary-200 px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:border-primary-400 hover:bg-primary-50"
          >
            <Upload className="h-4 w-4" />
            Add photo
          </button>
          <input
            ref={extraInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleExtraPhotos}
          />
        </div>
      </div>

      {/* ── Case status reference ── */}
      <div className="mt-10">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-primary-600">
          Case statuses
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-xs text-ink/50">
          Every report moves through these stages. You'll be notified at each change.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CASE_STATUSES.map((status) => (
            <div
              key={status.label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-[#d3e6e3] bg-white p-4 text-center shadow-soft"
            >
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
              >
                {status.label}
              </span>
              <span className="text-xs leading-relaxed text-ink/55">{status.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Shared input styling ────────────────────────────────────────────────── */
const inputClass =
  'w-full rounded-xl border border-[#d3e6e3] bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors';

/* ── Field wrapper ───────────────────────────────────────────────────────── */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-primary-700">
        {label} {required && <span className="text-accent-600">*</span>}
      </label>
      {children}
    </div>
  );
}
