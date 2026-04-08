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
        pdfUrl: '/Certificates/Letter of Apperciation Engineers Day 2018.pdf',
        imageUrl: '/Certificates-Photos/Letter of Apperciation Engineers Day 2018.png',
      },
      {
        name: 'Class Representative',
        pdfUrl: '/Certificates/Letter of Apperciiation CR.pdf',
        imageUrl: '/Certificates-Photos/Letter of Apperciiation CR.png',
      },
      {
        name: 'Tech Fest 2018',
        pdfUrl: '/Certificates/Letter of apperication Tech Fest 2018.pdf',
        imageUrl: '/Certificates-Photos/Letter of apperication Tech Fest 2018.png',
      },
    ],
  },
  {
    id: 'certificate-appreciation',
    title: 'Certificate of Appreciation',
    items: [
      {
        name: 'Engineers Day 2018',
        pdfUrl: '/Certificates/Certificate of apperication Engineers Day 2018.pdf',
        imageUrl: '/Certificates-Photos/Certificate of apperication Engineers Day 2018.png',
        autoRotate: 90,
      },
      {
        name: 'Engineers Day 2017',
        pdfUrl: '/Certificates/Certificate for Coordination Engineers Day 2017.pdf',
        imageUrl: '/Certificates-Photos/Certificate for Coordination Engineers Day 2017.png',
      },
      {
        name: 'Tech Fest 2018',
        pdfUrl: '/Certificates/Certificate for Coordination Tech Fest 2018.pdf',
        imageUrl: '/Certificates-Photos/Certificate for Coordination Tech Fest 2018.png',
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
        pdfUrl: '/Certificates/Certificate of Excellence IIT Delhi.pdf',
        imageUrl: '/Certificates-Photos/Certificate of Excellence IIT Delhi.png',
      },
      {
        name: 'Quiz 2018',
        pdfUrl: '/Certificates/Certificate Of Excellence Quiz 2018.pdf',
        imageUrl: '/Certificates-Photos/Certificate Of Excellence Quiz 2018.png',
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
        pdfUrl: '/Certificates/Certificate Of Participation EAC 2017.pdf',
        imageUrl: '/Certificates-Photos/Certificate Of Participation EAC 2017.png',
        autoRotate: 90,
      },
      {
        name: 'Skit 2019',
        pdfUrl: '/Certificates/Certificate of Participation Skit 2019.pdf',
        imageUrl: '/Certificates-Photos/Certificate of Participation Skit 2019.png',
        autoRotate: 90,
      },
    ],
  },
  {
    id: 'deans-list',
    title: "Dean's List",
    items: [
      {
        name: 'Academic Semester 1',
        pdfUrl: '/Certificates/A1_Dean_letter_101411015.pdf',
        imageUrl: '/Certificates-Photos/A1_Dean_Letter.png',
      },
      {
        name: 'Academic Semester 2',
        pdfUrl: '/Certificates/A2_Dean_letter_101411015.pdf',
        imageUrl: '/Certificates-Photos/A2_Dean_Letter.png',
      },
      {
        name: 'Presidents List Semester 1',
        pdfUrl: '/Certificates/P1_Dean_letter_101411015.pdf',
        imageUrl: '/Certificates-Photos/P1_Dean_letter_2023.png',
      },
      {
        name: 'Presidents List Semester 2',
        pdfUrl: '/Certificates/P2_Dean_letter_101411015.pdf',
        imageUrl: '/Certificates-Photos/P2_Dean_letter_2024.png',
      },
    ],
  },
  {
    id: 'sports',
    title: 'Sports Achievement',
    items: [
      {
        name: 'Sports 2013-2014',
        pdfUrl: '/Certificates/Sports 1 20213-2014.pdf',
        imageUrl: '/Certificates-Photos/Sports 1 20213-2014.png',
        autoRotate: 90,
      },
      {
        name: 'Sports 2014-2015 (1)',
        pdfUrl: '/Certificates/Sports 2 2014-2015.pdf',
        imageUrl: '/Certificates-Photos/Sports 2 2014-2015.png',
        autoRotate: 90,
      },
      {
        name: 'Sports 2014-2015 (2)',
        pdfUrl: '/Certificates/Sport 3 2014-2015.pdf',
        imageUrl: '/Certificates-Photos/Sport 3 2014-2015.png',
        autoRotate: 90,
      },
    ],
  },
];
