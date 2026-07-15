import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, LogOut, ShieldAlert, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import Logo from './Logo';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'How it Works', to: '/#how-it-works' },
  { label: 'Case Status', to: '/case-status' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { isVerified, phoneNumber, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const isActive = (to: string) => (to === '/' ? pathname === '/' : false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100/80 bg-canvas/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo onClick={() => setOpen(false)} />

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'text-primary-700'
                  : 'text-ink/70 hover:text-primary-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/moderator"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50/60 px-3.5 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100"
          >
            <Eye className="h-3.5 w-3.5" />
            Moderator
          </Link>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50/60 px-3.5 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            Admin
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isVerified && phoneNumber ? (
            <div className="flex items-center gap-2 rounded-full border border-primary-100 bg-white py-1 pl-3 pr-1.5">
              <span className="flex items-center gap-1.5 text-sm text-ink/80">
                <ShieldCheck className="h-4 w-4 text-primary-600" />
                +92 {phoneNumber}
              </span>
              <button
                onClick={signOut}
                aria-label="Sign out"
                className="grid h-7 w-7 place-items-center rounded-full text-ink/50 transition-colors hover:bg-primary-50 hover:text-primary-700"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button to="/login" variant="primary" size="md">
              Login
            </Button>
          )}
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl text-primary-700 hover:bg-primary-50 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-primary-100 bg-canvas px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </Link>
          ))}
          <Link
            to="/moderator"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex items-center gap-1.5 rounded-xl border border-primary-200 bg-primary-50/60 px-3 py-2.5 text-sm font-medium text-primary-700"
          >
            <Eye className="h-3.5 w-3.5" />
            Moderator
          </Link>
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex items-center gap-1.5 rounded-xl border border-primary-200 bg-primary-50/60 px-3 py-2.5 text-sm font-medium text-primary-700"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            Admin
          </Link>
            <div className="mt-2 border-t border-primary-100 pt-3">
              {isVerified && phoneNumber ? (
                <div className="flex items-center justify-between rounded-xl border border-primary-100 bg-white px-3 py-2.5">
                  <span className="flex items-center gap-1.5 text-sm text-ink/80">
                    <ShieldCheck className="h-4 w-4 text-primary-600" />
                    +92 {phoneNumber}
                  </span>
                  <button
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                    className="text-sm font-medium text-primary-700"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Button
                  to="/login"
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
