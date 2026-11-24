import { FaGithub, FaFileLines } from 'react-icons/fa6';
import { navigateTo } from '../routes';

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

  const baseBtn =
    'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 min-h-[40px] font-body text-xs ' +
    'font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2';

  return (
    <div
      className="mt-4 flex flex-row flex-nowrap items-center gap-2 overflow-x-auto scrollbar-none"
      style={{
        borderTop: '1px solid rgba(37,99,235,0.12)',
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
          className={`${baseBtn} border-[#2563EB]/30 bg-[#2563EB]/5 text-[#1D4ED8] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB]`}
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
          className={`${baseBtn} border-[#2563EB] bg-[#2563EB] text-white hover:bg-[#1D4ED8] hover:border-[#1D4ED8]`}
        >
          <FaGithub size={14} aria-hidden="true" />
          Code
        </a>
      )}
    </div>
  );
}
