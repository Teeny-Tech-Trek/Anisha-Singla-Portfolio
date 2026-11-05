import { socials } from '../data/socials';
import { useTheme } from '../context/ThemeContext';

export default function SocialBar({ size = 'md', className = '' }) {
  const box = size === 'md' ? 'w-11 h-11 text-[18px]' : 'w-11 h-11 text-[16px]';
  const { isDark } = useTheme();
  const accent = isDark ? '#C9A84C' : '#2563EB';

  const borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';
  const textColor   = isDark ? 'rgba(255,255,255,0.65)' : '#4B5563';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ label, href, Icon }) => {
        const external = !href.startsWith('mailto:');

        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`grid place-items-center ${box} rounded-lg transition-all duration-200
                        focus-visible:outline-none focus-visible:ring-2 ${
                          isDark ? 'focus-visible:ring-[#C9A84C]' : 'focus-visible:ring-[#2563EB]'
                        }`}
            style={{ border: `1px solid ${borderColor}`, color: textColor }}
            onMouseEnter={e => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = accent; }}
            onMouseLeave={e => { e.currentTarget.style.color = textColor; e.currentTarget.style.borderColor = borderColor; }}
          >
            <Icon aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
