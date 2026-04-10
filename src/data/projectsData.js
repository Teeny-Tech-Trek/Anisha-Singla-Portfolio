export const projects = [
  {
  id: 1,
  title: 'Teeny Tech Trek',
  category: 'Company Website',
  description:
    'Official website for Teeny Tech Trek — an AI consultancy helping businesses adopt custom AI solutions, chatbots, and automation systems. Built with React 18, TypeScript, and Tailwind CSS, with a mobile-first, SEO-optimized, and accessibility-focused approach.',
  tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'React Router'],
  status: 'Live',
  liveUrl: 'https://www.teenytechtrek.com/',
  year: '2024',
  featured: true,
  gradient: 'radial-gradient(ellipse at top left, rgba(201,168,76,0.18) 0%, transparent 65%)',
},
 {
  id: 2,
  title: 'TTT Website Chatbot',
  category: 'Artificial Intelligence',
  description:
    'A production-grade hybrid AI chatbot for the Teeny Tech Trek website. Uses a 4-layer decision waterfall — Redis cache, guided flow engine, structured handler, and RAG (FAISS + Neo4j + Claude) — so the easy 80% of queries never hit the LLM at all.',
  tags: ['FastAPI', 'Claude', 'FAISS', 'Neo4j', 'Redis', 'MongoDB', 'spaCy'],
  status: 'Live',
  liveUrl: 'https://github.com/Anisha-Singla-22/ttt_website_chatbot',
  year: '2024',
  featured: false,
  gradient: 'radial-gradient(ellipse at top right, rgba(100,180,255,0.1) 0%, transparent 65%)',
},
  {
  id: 3,
  title: 'PulseRobot',
  category: 'Real Estate AI',
  description:
    'A SaaS platform where real estate agents deploy a personalized AI avatar via QR code. Buyers scan, chat, get property recommendations, and book visits — 24/7. Includes lead scoring, CRM pipeline, team management, and Razorpay billing.',
  tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Razorpay'],
  status: 'Live',
  liveUrl: 'https://estate.techtrekkers.ai',
  year: '2025',
  featured: false,
  gradient: 'radial-gradient(ellipse at bottom left, rgba(180,100,255,0.09) 0%, transparent 65%)',
},
  {
  id: 4,
  title: 'Flipkart Sentiment Analyzer',
  category: 'Machine Learning',
  description:
    'Multi-class sentiment classifier on 169K Flipkart reviews — predicts star ratings (1–5) using GloVe embeddings with Logistic Regression (81.4% accuracy) and LSTM (~90%+). Full NLP pipeline: preprocessing, lemmatization, stopword removal, and GloVe mean pooling.',
  tags: ['Python', 'TensorFlow', 'GloVe', 'NLTK', 'Sklearn', 'LSTM'],
  status: 'Completed',
  liveUrl: 'https://github.com/Anisha-Singla-22/SentimentalAnalysis',
  year: '2024',
  featured: false,
  gradient: 'radial-gradient(ellipse at top left, rgba(255,120,100,0.08) 0%, transparent 65%)',
},
  {
  id: 5,
  title: 'Toxic Comment Classifier',
  category: 'AI Safety',
  description:
    'Multi-label toxicity classifier on 159K Wikipedia comments across 6 categories — built as a safety artifact. Compares TF-IDF + Logistic Regression vs Bi-LSTM, with three safety audits: identity-term bias probe (19 terms), adversarial robustness (leetspeak, spacing, punctuation), and calibration reliability diagrams.',
  tags: ['Python', 'TensorFlow', 'Sklearn', 'Bi-LSTM', 'TF-IDF', 'Kaggle'],
  status: 'Completed',
  liveUrl: 'https://github.com/Anisha-Singla-22/Jigsaw',
  year: '2024',
  featured: false,
  gradient: 'radial-gradient(ellipse at bottom right, rgba(80,220,160,0.08) 0%, transparent 65%)',
},
  {
  id: 6,
  title: 'UGC Video Generator',
  category: 'Generative AI',
  description:
    'An n8n workflow that turns a product image into 3 fully produced UGC video ads — no code, no manual work. Gemini builds a creator persona + writes 3 platform-native scripts, Veo 3.1 generates 8s 9:16 videos with native audio, and outputs are stored on Cloudflare R2. Supports 6 Indian languages.',
  tags: ['n8n', 'Veo 3.1', 'Gemini', 'Cloudflare R2', 'LangChain', 'No-Code'],
  status: 'Completed',
  liveUrl: 'https://github.com/Anisha-Singla-22/GrammyVideo',
  year: '2025',
  featured: false,
  gradient: 'radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 65%)',
},
  {
  id: 7,
  title: 'Transfer Learning Image Classifier',
  category: 'Deep Learning',
  description:
    'Image classification using Xception (ImageNet pre-trained) on tf_flowers (5 classes) and cars196 (196 classes). Two-phase training — frozen base for head training, then full fine-tune — achieves 91%+ validation accuracy on just 3,670 images with a fraction of the compute cost.',
  tags: ['Python', 'TensorFlow', 'Xception', 'Keras', 'Transfer Learning', 'Colab'],
  status: 'Completed',
  liveUrl: 'https://github.com/Anisha-Singla-22/TransferLearning',
  year: '2024',
  featured: false,
  gradient: 'radial-gradient(ellipse at top right, rgba(255,200,80,0.09) 0%, transparent 65%)',
},
  {
  id: 8,
  title: 'Jigsaw Toxic Comment Classifier',
  category: 'Natural Language Processing',
  description:
    'Multi-label text classifier on 159K Wikipedia comments across 6 toxicity categories — built for the Kaggle Jigsaw 2018 challenge. Compares Logistic Regression, Decision Tree, and Random Forest with a TF-IDF pipeline and repeat-word ablation study. Logistic Regression scored 0.96963 on the private leaderboard.',
  tags: ['Python', 'Sklearn', 'TF-IDF', 'NLTK', 'Kaggle', 'Jupyter'],
  status: 'Completed',
  liveUrl: 'https://github.com/Anisha-Singla-22/Ad-Maths-MP',
  year: '2024',
  featured: false,
  gradient: 'radial-gradient(ellipse at bottom left, rgba(100,220,200,0.08) 0%, transparent 65%)',
},
  
];

export const statusStyle = {
  Live:         { bg: 'rgba(80,220,120,0.15)',  color: '#4dde8a', border: 'rgba(80,220,120,0.4)' },
  Beta:         { bg: 'rgba(255,180,50,0.15)',   color: '#ffb432', border: 'rgba(255,180,50,0.4)' },
  Completed:    { bg: 'rgba(120,160,255,0.15)',  color: '#7898ff', border: 'rgba(120,160,255,0.4)' },
  'In Progress':{ bg: 'rgba(201,168,76,0.15)',   color: '#C9A84C', border: 'rgba(201,168,76,0.4)' },
};