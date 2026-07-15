import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
  onClick?: () => void;
}

const DIMS: Record<string, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
};

export function LogoMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={`relative shrink-0 ${DIMS[size]} block`}>
      <img
        src="/images/ChatGPT_Image_Jul_13,_2026,_12_27_20_AM.png"
        alt="Let's Find logo"
        className="h-full w-full object-contain drop-shadow-sm"
        draggable={false}
      />
    </span>
  );
}

export default function Logo({ size = 'md', withText = true, className = '', onClick }: LogoProps) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`} onClick={onClick}>
      <span className="transition-transform group-hover:scale-105">
        <LogoMark size={size} />
      </span>
      {withText && (
        <span className="text-xl font-display tracking-tight select-none">
          <span className="text-primary-500">Let's</span>{' '}
          <span className="font-semibold text-primary-700">Find</span>
        </span>
      )}
    </Link>
  );
}
