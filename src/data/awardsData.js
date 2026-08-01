// Each award category has items[] — one per actual certificate/document.
// pdfUrl opens the document and imageUrl is used for the folder preview card.
// count is derived dynamically from items.length.

export const awardsData = [
  {
    id: 'letter-appreciation',
    title: 'Letter of Appreciation',
    items: [
      {
        name: 'Engineers Day 2018',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Letter%20of%20Apperciation%20Engineers%20Day%202018.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Letter%20of%20Apperciation%20Engineers%20Day%202018.webp',
      },
      {
        name: 'Class Representative',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Letter%20of%20Apperciiation%20CR.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Letter%20of%20Apperciiation%20CR.webp',
      },
      {
        name: 'Tech Fest 2018',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Letter%20of%20apperication%20Tech%20Fest%202018.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Letter%20of%20apperication%20Tech%20Fest%202018.webp',
      },
    ],
  },
  {
    id: 'certificate-appreciation',
    title: 'Certificate of Appreciation',
    items: [
      {
        name: 'Engineers Day 2018',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Certificate%20of%20apperication%20Engineers%20Day%202018.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Certificate%20of%20apperication%20Engineers%20Day%202018.webp',
        autoRotate: 90,
      },
      {
        name: 'Engineers Day 2017',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Certificate%20for%20Coordination%20Engineers%20Day%202017.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Certificate%20for%20Coordination%20Engineers%20Day%202017.webp',
      },
      {
        name: 'Tech Fest 2018',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Certificate%20for%20Coordination%20Tech%20Fest%202018.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Certificate%20for%20Coordination%20Tech%20Fest%202018.webp',
        autoRotate: 90,
      },
    ],
  },
  // {
  //   id: 'certificate-coordination',
  //   title: 'Certificate of Coordination',
  //   items: [
      
  //   ],
  // },
  {
    id: 'certificate-excellence',
    title: 'Certificate of Excellence',
    items: [
      {
        name: 'IIT Delhi',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Certificate%20of%20Excellence%20IIT%20Delhi.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Certificate%20of%20Excellence%20IIT%20Delhi.webp',
      },
      {
        name: 'Quiz 2018',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Certificate%20Of%20Excellence%20Quiz%202018.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Certificate%20Of%20Excellence%20Quiz%202018.webp',
        autoRotate: 90,
      },
    ],
  },
  {
    id: 'certificate-participation',
    title: 'Certificate of Participation',
    items: [
      {
        name: 'EAC 2017',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Certificate%20Of%20Participation%20EAC%202017.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Certificate%20Of%20Participation%20EAC%202017.webp',
        autoRotate: 90,
      },
      {
        name: 'Skit 2019',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Certificate%20of%20Participation%20Skit%202019.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Certificate%20of%20Participation%20Skit%202019.webp',
        autoRotate: 90,
      },
    ],
  },
  {
    id: 'deans-list',
    title: "Dean's List",
    items: [
      {
        // Confirmed via LinkedIn (Honors-Awards section): Applied AI term 1
        name: "Dean's Honour List — Fall 2022 Term (Applied AI)",
        alt: "Dean's List certificate",
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/A1_Dean_letter_101411015.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/A1_Dean_Letter.webp',
      },
      {
        // Confirmed via LinkedIn (Honors-Awards section): Applied AI term 2
        name: "Dean's Honour List — Winter 2023 Term (Applied AI)",
        alt: "Dean's List certificate",
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/A2_Dean_letter_101411015.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/A2_Dean_Letter.webp',
      },
      {
        // Confirmed via LinkedIn (Honors-Awards section): Project Management term 1
        name: "Dean's Honour List — Fall 2023 Term (Project Management)",
        alt: "Dean's List certificate",
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/P1_Dean_letter_101411015.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/P1_Dean_letter_2023.webp',
      },
      {
        // Confirmed via LinkedIn (Honors-Awards section): Project Management term 2
        name: "Dean's Honour List — Winter 2024 Term (Project Management)",
        alt: "Dean's List certificate",
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/P2_Dean_letter_101411015.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/P2_Dean_letter_2024.webp',
      },
    ],
  },
  {
    id: 'sports',
    title: 'Sports Achievement',
    items: [
      {
        name: 'Sports 2013-2014',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Sports%201%2020213-2014.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Sports%201%2020213-2014.webp',
        autoRotate: 90,
      },
      {
        name: 'Sports 2014-2015 (1)',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Sports%202%202014-2015.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Sports%202%202014-2015.webp',
        autoRotate: 90,
      },
      {
        name: 'Sports 2014-2015 (2)',
        pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/PDFs/Sport%203%202014-2015.pdf',
        imageUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Certification-Photos/Sport%203%202014-2015.webp',
        autoRotate: 90,
      },
    ],
  },
];
