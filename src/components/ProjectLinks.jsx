import { FaGithub, FaFileLines } from 'react-icons/fa6';
import { navigateTo } from '../routes';

// Shared base styling for every action button: rounded-lg, thin border, small body
// text, and a keyboard-accessible gold focus ring.
const BASE =
  'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 min-h-[44px] font-body text-xs ' +
  'tracking-wide transition-colors duration-200 cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] whitespace-nowrap';

export default function ProjectLinks({ project }) {
  const links = project?.links;

  // The live/demo link is intentionally NOT a button — clicking the card itself
  // opens the live site (see Projects/AllProjects). Only Code + Case study render here.
  if (!links || (!links.code && !links.caseStudy)) {
    return null;
  }

  const title = project?.title || 'project';

  // Stop clicks from bubbling to any parent card handlers.
  const stop = (event) => event.stopPropagation();

  return (
    <div
      className="mt-4 flex flex-row flex-nowrap items-center gap-1.5 overflow-x-auto scrollbar-none"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}
    >
      {links.code && (
        <a
          href={links.code}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          aria-label={`${title} — source code on GitHub (opens in new tab)`}
          className={`${BASE} border-[#C9A84C]/50 bg-transparent text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black hover:border-[#C9A84C]`}
        >
          <FaGithub size={14} aria-hidden="true" />
          Code
        </a>
      )}

      {links.caseStudy && (
        // Internal route — navigated in-app (the custom router's <Link> equivalent),
        // so NOT target="_blank". Real href so crawlers/users get a followable
        // link; onClick still preventDefault()s and drives the SPA router.
        <a
          href={links.caseStudy}
          onClick={(event) => {
            event.preventDefault();
            stop(event);
            navigateTo(links.caseStudy);
          }}
          aria-label={`${title} — read the case study`}
          className={`${BASE} border-white/15 bg-transparent text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C]`}
        >
          <FaFileLines size={12} aria-hidden="true" />
          Case study
        </a>
      )}
    </div>
  );
}
