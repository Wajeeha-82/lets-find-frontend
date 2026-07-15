import { useState, useRef, type DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Upload,
  Check,
  ShieldCheck,
  Lock,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function FoundReport() {
  const { phoneNumber } = useAuth();
  const navigate = useNavigate();
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (files: FileList | null) => {
    if (files && files[0]) setPhotoName(files[0].name);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handlePhoto(e.dataTransfer.files);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="animate-fade-up rounded-3xl border border-[#d3e6e3] bg-[#eaf4f4] p-8 text-center shadow-soft">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-100 text-primary-700">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-primary-700">
            Report submitted — thank you
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">
            Your found-person report has been received. Our team will review the details
            and check for possible matches against active missing-person cases. We'll
            reach out to you at your verified number if there's a lead.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      {/* ── Page header ── */}
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-3.5 py-1.5 text-xs font-medium text-primary-700 shadow-soft">
          <UserCheck className="h-3.5 w-3.5 text-accent-500" />
          Found Person Report
        </span>
        <h1 className="mt-4 text-3xl tracking-tight text-primary-700 sm:text-4xl">
          Report a found person
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
          Thank you for stepping in. The details you share here help us reconnect this
          person with their family. Take a moment — every detail counts.
        </p>
      </div>

      {/* ── Form card ── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          navigate('/case-status');
        }}
        className="rounded-3xl border border-[#d3e6e3] bg-[#eaf4f4] p-6 shadow-soft sm:p-8"
      >
        <div className="space-y-6">
          {/* Age + Gender row */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Approximate age" required>
              <input
                type="number"
                required
                min={0}
                max={120}
                placeholder="e.g. 40"
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

          {/* Location found + Date/time row */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Location where found" required>
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

            <Field label="Date & time found" required>
              <input
                type="datetime-local"
                required
                className={inputClass}
              />
            </Field>
          </div>

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
                onChange={(e) => handlePhoto(e.target.files)}
              />
            </div>
          </div>

          {/* Additional information */}
          <Field label="Any information the found person could provide">
            <textarea
              rows={3}
              placeholder="name, or note if unable to communicate"
              className={`${inputClass} resize-none`}
            />
          </Field>

          {/* Contact info (auto-filled, fixed +92) */}
          <Field label="Contact phone number" required>
            <div className="flex items-stretch overflow-hidden rounded-xl border border-[#d3e6e3] bg-white transition focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20">
              <span className="flex items-center border-r border-[#d3e6e3] bg-primary-50 px-3 text-sm font-medium text-primary-700">
                +92
              </span>
              <input
                type="tel"
                required
                value={phoneNumber ?? ''}
                readOnly
                placeholder="Auto-filled from your verified login"
                className="w-full cursor-not-allowed bg-primary-50/40 px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink/35"
              />
              <ShieldCheck className="my-auto mr-3 h-4 w-4 text-primary-500" />
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink/50">
              <Lock className="h-3 w-3" />
              Auto-filled from your verified phone number. Only visible to verified
              reporters on matched cases.
            </p>
          </Field>
        </div>

        {/* ── Actions ── */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E8A33D] px-7 py-3.5 text-base font-semibold tracking-tight text-white shadow-soft transition-all duration-200 hover:bg-[#cf8e2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eaf4f4] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Report
          </button>

          <button
            type="button"
            onClick={() => {
              setSubmitted(true);
              navigate('/case-status');
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#358f80] bg-transparent px-7 py-3 text-sm font-medium text-[#358f80] transition-colors hover:bg-[#358f80]/5"
          >
            Mark as Resolved
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-ink/45">
          Use "Mark as Resolved" if the person has already been reunited with their
          family outside of Let's Find.
        </p>
      </form>
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
