// Writing & speaking items. URLs are only included where a real, verified link
// exists (given directly, or already present elsewhere in this repo's data) —
// never invented. Items with url: null render as non-clickable text in
// WritingSpeaking.jsx until the real link is supplied. Items with a `urls`
// array (instead of a single `url`) render one small link button per entry —
// used for the LinkedIn series, which is several individual posts, not one link.
export const writingItems = [
  {
    id: 'linkedin-technical-series',
    label: 'LinkedIn Technical Series',
    description: 'A series of technical write-ups published on LinkedIn.',
    urls: [
      'https://www.linkedin.com/posts/singlaanisha_aiarchitecture-enterpriseai-aiagents-ugcPost-7485282125529759744-0tqi/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGnRKPsB3IFg7wQBtq8xVIdn5BvQHpfSrOo',
      'https://www.linkedin.com/posts/singlaanisha_aiengineering-productionai-aiagents-ugcPost-7485281736856117248-H3P6/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGnRKPsB3IFg7wQBtq8xVIdn5BvQHpfSrOo',
      'https://www.linkedin.com/posts/singlaanisha_rag-aiforbusiness-llm-ugcPost-7485281372312469504-e3QP/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGnRKPsB3IFg7wQBtq8xVIdn5BvQHpfSrOo',
      'https://www.linkedin.com/posts/singlaanisha_rag-aiengineering-productionai-ugcPost-7485280404220837888-LVXE/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGnRKPsB3IFg7wQBtq8xVIdn5BvQHpfSrOo',
      'https://www.linkedin.com/posts/singlaanisha_rag-aiengineering-aiagents-ugcPost-7483480527241441280-y72a/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGnRKPsB3IFg7wQBtq8xVIdn5BvQHpfSrOo',
    ],
  },
  {
    id: 'medium-articles',
    label: 'Medium Articles',
    description: 'Applied AI writing, published on Medium.',
    // Links to the Medium profile (same URL already used in socials.js) — no
    // per-article URLs are available in the repo to link individually yet.
    url: 'https://medium.com/@teenytechtrek',
  },
  {
    id: 'tie-open-mic',
    label: 'TiE Chandigarh — Open Mic Session',
    description: 'Open Mic session with TiE Chandigarh.',
    url: 'https://www.linkedin.com/posts/tie-chandigarh_open-mic-session-tie-chandigarh-ugcPost-7463546856598364161-MmHB?utm_medium=ios_app&rcm=ACoAACtzlL0BRRG_qxSY4c8zUkLDpaq8zFl2c9I&utm_source=social_share_send&utm_campaign=share_via',
  },
  {
    id: 'podcast-april-2026',
    label: 'Podcast Appearance',
    description: 'April 2026 podcast appearance.',
    url: 'https://youtu.be/MWCYy_OmrWs?si=yNQXBDq7AUeUS1uw',
  },
];
