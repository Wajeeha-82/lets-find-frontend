import { createContext, useContext, useState, type ReactNode, useCallback } from 'react';

interface AuthContextValue {
  phoneNumber: string | null;
  isVerified: boolean;
  verify: (phone: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'letsfind.auth';

interface StoredAuth {
  phoneNumber: string;
  isVerified: boolean;
}

function readStored(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAuth;
    if (parsed && typeof parsed.phoneNumber === 'string' && parsed.isVerified) {
      return { phoneNumber: parsed.phoneNumber, isVerified: true };
    }
  } catch {
    /* ignore malformed storage */
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredAuth | null>(readStored);

  const persist = useCallback((next: StoredAuth | null) => {
    setStored(next);
    try {
      if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  const verify = useCallback(
    (phone: string) => persist({ phoneNumber: phone, isVerified: true }),
    [persist],
  );

  const signOut = useCallback(() => persist(null), [persist]);

  const value: AuthContextValue = {
    phoneNumber: stored?.phoneNumber ?? null,
    isVerified: stored?.isVerified ?? false,
    verify,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
