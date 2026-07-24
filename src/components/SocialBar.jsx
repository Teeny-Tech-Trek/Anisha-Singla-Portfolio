import { socials } from '../data/socials';

export default function SocialBar({ size = 'md', className = '' }) {
  const box = size === 'md' ? 'w-11 h-11 text-[18px]' : 'w-11 h-11 text-[16px]';

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
            className={`grid place-items-center ${box} rounded-lg border border-neutral-800
                        text-neutral-300 transition-colors duration-200
                        hover:text-[#C9A84C] hover:border-[#C9A84C]
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]`}
          >
            <Icon aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
