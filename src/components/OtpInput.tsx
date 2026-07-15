import { useRef, type ClipboardEvent, type KeyboardEvent, type ChangeEvent } from 'react';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export default function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  const focusNext = (i: number) => {
    if (i < length - 1) inputs.current[i + 1]?.focus();
  };
  const focusPrev = (i: number) => {
    if (i > 0) inputs.current[i - 1]?.focus();
  };

  const setChar = (i: number, char: string) => {
    const arr = chars.slice();
    arr[i] = char;
    onChange(arr.join(''));
  };

  const handleChange = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (!raw) {
      setChar(i, '');
      return;
    }
    const char = raw[raw.length - 1];
    setChar(i, char);
    focusNext(i);
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (chars[i]) setChar(i, '');
      else if (i > 0) {
        focusPrev(i);
        setChar(i - 1, '');
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusPrev(i);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusNext(i);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    inputs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
      {chars.map((char, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={char}
          aria-label={`OTP digit ${i + 1}`}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-14 w-12 rounded-xl border border-primary-100 bg-white text-center text-xl font-semibold text-ink shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-300 sm:h-16 sm:w-14"
        />
      ))}
    </div>
  );
}
