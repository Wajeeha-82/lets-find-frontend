import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  UserMinus,
  UserCheck,
  RefreshCw,
  ScanFace,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OtpInput from '../components/OtpInput';
import { Button } from '../components/ui/Button';

type Step = 'phone' | 'otp' | 'role';

const STEP_LABELS = ['Verify phone', 'Enter OTP', 'Choose role'];

function StepIndicator({ current }: { current: Step }) {
  const idx = current === 'phone' ? 0 : current === 'otp' ? 1 : 2;
  return (
    <div className="flex items-center justify-center gap-2">
      {STEP_LABELS.map((label, i) => {
        const state = i < idx ? 'done' : i === idx ? 'active' : 'todo';
        return (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                state === 'active'
                  ? 'bg-primary-700 text-white'
                  : state === 'done'
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-primary-50 text-ink/40'
              }`}
            >
              {state === 'done' ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
              <span className="hidden sm:inline">{label}</span>
            </span>
            {i < STEP_LABELS.length - 1 && (
              <span className="h-px w-4 bg-primary-100 sm:w-6" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Login() {
  const { isVerified, phoneNumber, verify, signOut } = useAuth();
  const [step, setStep] = useState<Step>(isVerified ? 'role' : 'phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (isVerified) setStep('role');
  }, [isVerified]);

  const phoneValid = /^\d{10}$/.test(phone);

  const sendOtp = () => {
    if (!phoneValid) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStep('otp');
    }, 600);
  };

  const verifyOtp = () => {
    if (otp.length !== 6) {
      setError('Enter the 6-digit code.');
      return;
    }
    setError('');
    verify(phone);
    setStep('role');
  };

  const reset = () => {
    signOut();
    setPhone('');
    setOtp('');
    setError('');
    setStep('phone');
  };

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-lg flex-col items-center px-4 py-14 sm:px-6 lg:py-20">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-soft">
            <ScanFace className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-3xl tracking-tight text-ink">Verify your identity</h1>
          <p className="mt-2 max-w-sm text-sm text-ink/65">
            We use a quick OTP check so every report on Let's Find comes from a trusted
            contact.
          </p>
        </div>

        <div className="card w-full p-6 sm:p-8">
          <div className="mb-6">
            <StepIndicator current={step} />
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-accent-500/30 bg-accent-500/10 px-4 py-2.5 text-sm text-accent-700">
              {error}
            </div>
          )}

          {step === 'phone' && (
            <div className="animate-fade-up">
              <label htmlFor="phone" className="block text-sm font-medium text-ink/80">
                Mobile number
              </label>
              <div className="mt-2 flex items-stretch overflow-hidden rounded-xl border border-primary-100 bg-white shadow-sm transition focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-300">
                <span className="flex items-center border-r border-primary-100 bg-primary-50 px-3 text-sm font-medium text-primary-700">
                  +92
                </span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                    setError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && sendOtp()}
                  className="w-full bg-white px-3 py-3 text-base text-ink outline-none placeholder:text-ink/35"
                />
              </div>
              <Button
                onClick={sendOtp}
                variant="accent"
                size="lg"
                className="mt-5 w-full"
                disabled={sending}
              >
                {sending ? 'Sending OTP…' : 'Send OTP'}
                {!sending && <ArrowRight className="h-4 w-4" />}
              </Button>
              <p className="mt-3 text-center text-xs text-ink/45">
                We'll never share your number without your consent.
              </p>
            </div>
          )}

          {step === 'otp' && (
            <div className="animate-fade-up">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-ink/70">
                  Code sent to <span className="font-medium text-ink">+92 {phone}</span>
                </span>
                <button
                  onClick={() => setStep('phone')}
                  className="flex items-center gap-1 font-medium text-primary-700 hover:text-primary-800"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Change
                </button>
              </div>
              <p className="mb-5 text-xs text-ink/45">
                For this demo, any 6-digit code will work.
              </p>

              <OtpInput value={otp} onChange={setOtp} />

              <Button
                onClick={verifyOtp}
                variant="accent"
                size="lg"
                className="mt-6 w-full"
                disabled={otp.length !== 6}
              >
                Verify
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                <button
                  onClick={() => setOtp('')}
                  className="flex items-center gap-1 font-medium text-primary-700 hover:text-primary-800"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Resend code
                </button>
              </div>
            </div>
          )}

          {step === 'role' && (
            <div className="animate-fade-up">
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-primary-100 bg-white p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-700">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">You're verified</p>
                  <p className="truncate text-xs text-ink/55">
                    +92 {phoneNumber ?? phone}
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="text-xs font-medium text-primary-700 hover:text-primary-800"
                >
                  Use another number
                </button>
              </div>

              <p className="mb-3 text-center text-sm text-ink/70">
                How would you like to help today?
              </p>

              <div className="grid gap-3">
                <Link
                  to="/missing-report"
                  className="card-interactive group flex items-center gap-4 p-5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-700 text-white">
                    <UserMinus className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-ink">
                      I'm reporting a missing person
                    </h3>
                    <p className="mt-0.5 text-sm text-ink/65">
                      Someone I know is missing. I'll share their photo and details.
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-primary-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-700" />
                </Link>

                <Link
                  to="/found-report"
                  className="card-interactive group flex items-center gap-4 p-5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-500 text-white">
                    <UserCheck className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-ink">
                      I'm reporting a found person
                    </h3>
                    <p className="mt-0.5 text-sm text-ink/65">
                      I've found someone who may be lost from their family.
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-accent-400 transition-transform group-hover:translate-x-1 group-hover:text-accent-600" />
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-ink/55">
          Just browsing?{' '}
          <Link to="/" className="font-medium text-primary-700 hover:text-primary-800">
            Back to home
          </Link>
        </p>
      </div>
    </section>
  );
}
