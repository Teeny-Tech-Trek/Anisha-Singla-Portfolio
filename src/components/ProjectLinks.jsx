import { FaArrowUpRightFromSquare, FaGithub, FaArrowRight } from 'react-icons/fa6';
import { navigateTo } from '../routes';

// Shared base styling for every action button: rounded-lg, thin border, small body
// text, and a keyboard-accessible gold focus ring.
const BASE =
  'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-body text-xs ' +
  'tracking-wide transition-colors duration-200 cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]';

export default function ProjectLinks({ project }) {
  const links = project?.links;

  // Render nothing at all when there are no links — never an empty/"#" button.
  if (!links || (!links.live && !links.code && !links.caseStudy)) {
    return null;
  }

  const title = project?.title || 'project';
  const liveLabel = project?.requiresAuth ? 'Live (login required)' : 'Live demo';

  // Stop clicks from bubbling to any parent card handlers.
  const stop = (event) => event.stopPropagation();

  return (
    <div
      className="mt-4 flex flex-wrap items-center gap-2"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}
    >
      {links.live && (
        <a
          href={links.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          aria-label={`${title} — ${liveLabel} (opens in new tab)`}
          className={`${BASE} border-white bg-white text-black hover:bg-[#C9A84C] hover:border-[#C9A84C]`}
        >
          <FaArrowUpRightFromSquare size={12} aria-hidden="true" />
          {liveLabel}
        </a>
      )}

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
        // so NOT target="_blank".
        <button
          type="button"
          onClick={(event) => {
            stop(event);
            navigateTo(links.caseStudy);
          }}
          aria-label={`${title} — read the case study`}
          className={`${BASE} border-white/15 bg-transparent text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C]`}
        >
          Case study
          <FaArrowRight size={12} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
