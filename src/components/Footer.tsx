import { Link } from 'react-router-dom';
import { LifeBuoy, GraduationCap, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-primary-100 bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size="sm" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
              A community-driven platform that reunites missing persons with their
              families using face-matching technology. Every report is filed by a
              verified contact.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-3.5 py-1.5 text-xs font-medium text-primary-700 shadow-soft">
              <GraduationCap className="h-3.5 w-3.5" />
              University of Agriculture Faisalabad
              <span className="text-ink/40">·</span>
              <span>Computer Science</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-700">Platform</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
              <li>
                <Link to="/" className="transition-colors hover:text-primary-700">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="transition-colors hover:text-primary-700">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition-colors hover:text-primary-700">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-700">Get help</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
              <li className="flex items-start gap-2 leading-relaxed">
                <LifeBuoy className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                If someone is in immediate danger, contact your local emergency
                services right away.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-primary-100 pt-6 text-xs text-ink/55 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Let's Find. Built with care for families.</p>
          <p className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary-600" />
            Department of Computer Science, UAF
          </p>
        </div>
      </div>
    </footer>
  );
}
