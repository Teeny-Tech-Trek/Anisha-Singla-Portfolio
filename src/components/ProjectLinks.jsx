import { FaGithub, FaFileLines } from 'react-icons/fa6';
import { navigateTo } from '../routes';
import { useTheme } from '../context/ThemeContext';

export default function ProjectLinks({ project }) {
  const { isDark } = useTheme();
  const links = project?.links;

  // The live/demo link is intentionally NOT a button — clicking the card itself
  // opens the live site (see Projects/AllProjects). Only Code + Case study render here.
  if (!links || (!links.code && !links.caseStudy)) {
    return null;
  }

  const title = project?.title || 'project';

  // Stop clicks from bubbling to any parent card handlers.
  const stop = (event) => event.stopPropagation();

  const baseBtn =
    'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 min-h-[44px] font-body text-xs ' +
    'tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap ' +
    'focus-visible:outline-none focus-visible:ring-2 ' +
    (isDark
      ? 'focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]'
      : 'focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-white');

  return (
    <div
      className="mt-4 flex flex-row flex-nowrap items-center gap-1.5 overflow-x-auto scrollbar-none"
      style={{
        borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
        paddingTop: '1rem',
      }}
    >
      {links.caseStudy && (
        <a
          href={links.caseStudy}
          onClick={(event) => {
            event.preventDefault();
            stop(event);
            navigateTo(links.caseStudy);
          }}
          aria-label={`${title} — read the case study`}
          className={`${baseBtn} ${
            isDark
              ? 'border-white/15 bg-transparent text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C]'
              : 'border-black/15 bg-transparent text-gray-700 hover:text-[#2563EB] hover:border-[#2563EB]'
          }`}
        >
          <FaFileLines size={12} aria-hidden="true" />
          Case study
        </a>
      )}

      {links.code && (
        <a
          href={links.code}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          aria-label={`${title} — source code on GitHub (opens in new tab)`}
          className={`${baseBtn} ${
            isDark
              ? 'border-[#C9A84C]/50 bg-transparent text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black hover:border-[#C9A84C]'
              : 'border-[#2563EB]/50 bg-transparent text-[#2563EB] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB]'
          }`}
        >
          <FaGithub size={14} aria-hidden="true" />
          Code
        </a>
      )}
    </div>
  );
}
