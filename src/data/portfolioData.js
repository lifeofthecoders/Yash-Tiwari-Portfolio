// ============================================================
// portfolioData.js — Centralized configuration for Yash Tiwari's Portfolio
// 100% Yash Tiwari verified content & assets
// 0% reference-client data
// ============================================================

export const personalInfo = {
  name: "Yash Tiwari",
  firstName: "Yash",
  brandName: "Yash",
  title: "B.Tech AI & Data Science Student | Aspiring Software Developer",
  shortTitle: "AI & Data Science Student",
  location: "Alwar, Rajasthan, India",
  university: "JECRC University, Alwar/NCR",
  semester: "1st Semester",
  openTo: "Learning Opportunities, Projects & Collaborations",
  phone: "+91 8949591614",
  emails: {
    primary: "tyash0702@gmail.com",
  },
  summary:
    "Motivated and enthusiastic B.Tech student specializing in Artificial Intelligence & Data Science at JECRC University, currently building foundational knowledge in programming, computer science, and AI/data science concepts. Passionate about learning new technologies, developing practical projects, strengthening technical problem-solving abilities, and exploring software development, artificial intelligence, and data science.",
  resumeUrl: "/Yash_Tiwari_Resume.pdf",
};

export const socialLinks = {
  linkedin: null, // Yash has not provided a LinkedIn URL yet
  github: null,   // Yash has not provided a GitHub URL yet
  email: "mailto:tyash0702@gmail.com",
  phone: "tel:+918949591614",
};

export const heroContent = {
  greeting: "Hi, I'm Yash",
  titleHighlight: "AI & Data Science Student",
  subtitle:
    "Exploring AI, Data Science, programming and software development while building the technical foundations for what's next at JECRC University.",
  ctaPrimary: { text: "Explore Journey", href: "#process" },
  ctaSecondary: { text: "View Skills", href: "#skills" },
  ctaResume: { text: "Download Resume", href: "/Yash_Tiwari_Resume.pdf" },
};

export const statsData = [
  { num: "01", label: "Semester", desc: "B.Tech AI & Data Science" },
  { num: "88%", label: "Class 12", desc: "Rajesh Public School" },
  { num: "91%", label: "Class 10", desc: "Rajesh Public School" },
  { num: "AI + DS", label: "Current Focus", desc: "Intelligent Systems Core" },
];

export const aboutContent = {
  heading: "Building Foundations For What's Next",
  accentWord: "AI & Data Science",
  bio: `Hi, my name is <span class="text-white text-xl font-black mx-1 tracking-wide uppercase">Yash Tiwari</span>, a 1st-semester B.Tech student in <span class="text-white font-bold">Artificial Intelligence & Data Science</span> at <span class="text-white font-bold">JECRC University</span>. Driven by an authentic curiosity for how intelligent computing and data-driven systems operate, I am currently dedicating my time to strengthening core computer science and programming fundamentals. My studies and self-directed practice encompass logical thinking, algorithmic concepts, and emerging paradigms in modern web engineering and machine learning.`,
  techStack: [
    { name: "Python", tag: "AI & Scripting", color: "#3776ab", bg: "#08233a" },
    { name: "Logic & Code", tag: "Algorithms", color: "#f50604", bg: "#2a0505" },
    { name: "Web Foundations", tag: "HTML5 / CSS3", color: "#e34f26", bg: "#361005" },
    { name: "Data Concepts", tag: "Data Science", color: "#00d8ff", bg: "#002b33" },
  ],
};

// Learning Roadmap replacing the reference's lifecycle cards
export const skillsContent = {
  badge: "ACADEMIC & TECHNICAL ROADMAP",
  heading: "Structured Path Toward Engineering Intelligent Systems",
  description:
    "An intentional, progressive learning roadmap covering computer science fundamentals, analytical thinking, and applied artificial intelligence.",
  cards: [
    {
      number: "01",
      title: "Programming Fundamentals",
      status: "Core Focus",
      text: "Building rigorous coding fundamentals, control flow logic, syntax fluency, and analytical problem-solving routines.",
    },
    {
      number: "02",
      title: "CS Foundations & Data Structures",
      status: "Active Learning",
      text: "Understanding computer architecture, memory models, algorithmic complexity, and foundational data structures.",
    },
    {
      number: "03",
      title: "Modern Web Development",
      status: "Exploring",
      text: "Learning how modern responsive interfaces, web standards, and full-stack interactive applications are designed and built.",
    },
    {
      number: "04",
      title: "Data Science & Analytics",
      status: "Specialization",
      text: "Exploring data organization, statistical analysis, exploratory visualization, and mathematical concepts behind data pipelines.",
    },
    {
      number: "05",
      title: "Artificial Intelligence",
      status: "Specialization",
      text: "Studying heuristic search, intelligent agent architecture, knowledge representation, and computational reasoning systems.",
    },
    {
      number: "06",
      title: "Applied Machine Learning",
      status: "Future Milestone",
      text: "Progressing toward predictive modeling, supervised and unsupervised learning algorithms, and real-world neural applications.",
    },
  ],
  endText: "Engineered for continuous technical growth!",
};

// Technical Skill Clusters without fake percentages
export const technicalSkills = {
  categories: [
    {
      title: "Programming & Foundations",
      skills: [
        { name: "Programming Fundamentals", status: "Active Focus", tag: "Coding Logic & Structure" },
        { name: "Problem Solving", status: "Foundational", tag: "Logical & Analytical Thinking" },
        { name: "Algorithms & Data Structures", status: "In Progress", tag: "Core CS Concepts" },
        { name: "Python Basics", status: "Active Learning", tag: "Syntax, Loops & Functions" },
      ],
    },
    {
      title: "AI & Data Science Focus",
      skills: [
        { name: "AI Fundamentals", status: "Exploring", tag: "Intelligent Systems Overview" },
        { name: "Data Science Concepts", status: "Learning", tag: "Data Representation & Flow" },
        { name: "Introduction to Machine Learning", status: "Exploring", tag: "Pattern Recognition Models" },
        { name: "Data Analysis Principles", status: "Exploring", tag: "Statistical Foundations" },
      ],
    },
    {
      title: "Web Development Exploration",
      skills: [
        { name: "Web Development Fundamentals", status: "Exploring", tag: "Architecture & Protocols" },
        { name: "HTML5 & Semantic Markup", status: "Foundational", tag: "Document Structure & Web Accessibility" },
        { name: "CSS3 & Modern Styling", status: "Foundational", tag: "Responsive Design & Flexbox" },
        { name: "Frontend Development Concepts", status: "Exploring", tag: "Component-Based UI & Interactivity" },
      ],
    },
    {
      title: "Academic Strengths & Disciplines",
      skills: [
        { name: "Logical Reasoning", status: "Proven", tag: "Systematic Deconstruction" },
        { name: "Quick Learning", status: "Proven", tag: "Rapid Technical Synthesis" },
        { name: "Academic Consistency", status: "Proven", tag: "88% in 12th & 91% in 10th" },
        { name: "Curiosity & Growth Mindset", status: "Proven", tag: "Passion for Technology" },
      ],
    },
  ],
};

// Core Strengths (from resume)
export const softSkillsList = [
  { name: "Quick Learning", icon: "⚡", desc: "Rapidly synthesizing new programming languages, algorithmic paradigms, and framework abstractions." },
  { name: "Logical Thinking", icon: "🧩", desc: "Deconstructing complex computational problems into clear, verifiable step-by-step solutions." },
  { name: "Problem Solving", icon: "💡", desc: "Applying systematic reasoning and disciplined debugging to resolve programming challenges." },
  { name: "Curiosity & Exploration", icon: "🔍", desc: "Enthusiastically seeking deeper understanding of how modern intelligent systems work." },
  { name: "Academic Consistency", icon: "🎯", desc: "Proven track record of disciplined study evidenced by 88% in Class 12 and 91% in Class 10." },
  { name: "Adaptability", icon: "🔄", desc: "Thriving when introduced to unfamiliar technical tools, libraries, and university coursework." },
  { name: "Willingness to Learn", icon: "📖", desc: "Dedicated to continuous daily skill acquisition across computer science and data science." },
  { name: "AI & DS Interest", icon: "🧠", desc: "Strong intrinsic passion for intelligent automation, data analytics, and machine learning." },
];

// Featured Projects / Building Next (Honest, roadmap-driven case studies)
export const projects = [
  {
    id: "algorithmic-suite",
    number: "01",
    badge: "🚀 Active Focus",
    title: "Algorithmic Problem Solving & Python Suite",
    category: "Computer Science / Core Logic",
    client: "Academic & Personal Development",
    duration: "1st Semester Roadmap",
    description: "Developing foundational coding and computational logic through a structured repository of algorithms, mathematical operations, and data structure implementations in Python.",
    techTags: ["Python", "Algorithms", "Data Structures", "Problem Solving", "Logic"],
    imageUrl: null,
    isFlagship: true,
    accentColor: "#f50604",
    visualType: "algorithmic",
    caseStudy: {
      client: "Self-Initiated Academic Pursuit",
      domain: "Computer Science Foundations & Problem Solving",
      role: "Student Developer",
      problem: "Building a rock-solid grasp of programming requires moving beyond simple syntax to understand algorithmic time-complexity, memory efficiency, and systematic debugging practices.",
      contributions: [
        "Implementing fundamental algorithms for searching, sorting, and recursion in Python.",
        "Developing structured problem-solving habits through continuous coding exercises.",
        "Writing clean, readable code with comments explaining the algorithmic logic.",
        "Practicing computational thinking to translate real-world problems into programmatic models.",
      ],
      impact: "Establishing the core technical foundation required for advanced B.Tech coursework and competitive programming.",
    },
  },
  {
    id: "web-development-lab",
    number: "02",
    badge: "💻 Web Exploration",
    title: "Responsive Web Development & Personal Showcase",
    category: "Web Engineering / Frontend",
    client: "Self-Initiated Web Project",
    duration: "Hands-on Exploration",
    description: "Exploring modern web standards by crafting high-performance, responsive interfaces using semantic HTML5, modern CSS architectures, and interactive JavaScript paradigms.",
    techTags: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "Web Standards"],
    imageUrl: null,
    isFlagship: false,
    accentColor: "#eb0803",
    visualType: "web",
    caseStudy: {
      client: "Personal Web Engineering Project",
      domain: "Modern Frontend Web Systems",
      role: "Frontend Explorer & Developer",
      problem: "Understanding how modern responsive web applications maintain fluid layouts across mobile, tablet, and high-DPI desktop viewports without sacrificing performance.",
      contributions: [
        "Structuring accessible, semantic markup following modern web conventions.",
        "Designing fluid CSS grid and flexbox layouts tailored for diverse screen sizes.",
        "Experimenting with client-side interactivity, DOM manipulation, and smooth transitions.",
      ],
      impact: "Building practical web development skills to showcase future academic and technical projects.",
    },
  },
  {
    id: "data-analysis-engine",
    number: "03",
    badge: "📊 Data Science",
    title: "Data Analysis & Statistical Insights Engine",
    category: "Data Science / Analytics",
    client: "Academic Specialization Project",
    duration: "Planned Curriculum Project",
    description: "Planned exploration into collecting, cleaning, and inspecting structured data to generate actionable statistical summaries and intuitive visual charts.",
    techTags: ["Data Science", "Python", "Data Cleaning", "Visualization", "Statistics"],
    imageUrl: null,
    isFlagship: false,
    accentColor: "#d80000",
    visualType: "data",
    caseStudy: {
      client: "B.Tech Curriculum Project",
      domain: "Exploratory Data Analysis (EDA)",
      role: "Aspiring Data Scientist",
      problem: "Raw data is often noisy, incomplete, and difficult to interpret without systematic cleaning, transformation, and visual representation.",
      contributions: [
        "Investigating techniques for identifying missing values, data anomalies, and distributions.",
        "Exploring descriptive statistical methods to summarize key data metrics accurately.",
        "Designing clear visual representations of data patterns and correlations.",
      ],
      impact: "Preparing for advanced data science coursework and real-world analytical datasets.",
    },
  },
  {
    id: "ai-intelligent-agent",
    number: "04",
    badge: "🤖 Artificial Intelligence",
    title: "Intelligent AI Assistant & Agent Architecture",
    category: "Artificial Intelligence / Systems",
    client: "AI Department Exploration",
    duration: "Planned Roadmap",
    description: "Conceptualizing an intelligent conversational agent exploring search algorithms, decision trees, and natural language understanding fundamentals.",
    techTags: ["Artificial Intelligence", "Intelligent Agents", "Python", "Decision Trees"],
    imageUrl: null,
    isFlagship: false,
    accentColor: "#c20000",
    visualType: "ai",
    caseStudy: {
      client: "Academic AI Project",
      domain: "Intelligent Systems & Computational Logic",
      role: "AI Student Researcher",
      problem: "Creating interactive systems that adapt to user inputs requires mastering knowledge representation, state machines, and intelligent search heuristics.",
      contributions: [
        "Studying the theoretical mechanics of state-space search and heuristic evaluation.",
        "Exploring conversational pattern matching and automated decision-making workflows.",
        "Synthesizing classroom AI theory with practical programmatic implementations.",
      ],
      impact: "Laying the groundwork for building intelligent agents and automated software assistants.",
    },
  },
  {
    id: "ml-predictive-lab",
    number: "05",
    badge: "⚡ Machine Learning",
    title: "Machine Learning Predictive Models Lab",
    category: "Machine Learning / Predictive",
    client: "Future Milestone Project",
    duration: "Upcoming Semester Goal",
    description: "A planned laboratory of supervised and unsupervised machine learning models aimed at pattern recognition, classification, and continuous metric evaluation.",
    techTags: ["Machine Learning", "Supervised Learning", "Classification", "Model Evaluation"],
    imageUrl: null,
    isFlagship: true,
    accentColor: "#f50604",
    visualType: "ml",
    caseStudy: {
      client: "Machine Learning Research Initiative",
      domain: "Predictive Analytics & Model Training",
      role: "Student ML Engineer",
      problem: "Transitioning from traditional deterministic code to probabilistic machine learning models that learn patterns directly from empirical datasets.",
      contributions: [
        "Studying regression and classification algorithms and loss optimization functions.",
        "Understanding train/test validation splits to avoid overfitting and ensure generalization.",
        "Benchmarking accuracy and precision across multiple algorithmic approaches.",
      ],
      impact: "Developing the competencies needed to architect, train, and evaluate production machine learning models.",
    },
  },
];

// Academic Milestones (Honest education history)
export const educationData = [
  {
    year: "2026 – Present",
    degree: "B.Tech — Artificial Intelligence & Data Science",
    institution: "JECRC University",
    location: "Alwar/NCR, India",
    grade: "Current Status: 1st Semester",
    category: "Undergraduate Degree",
    description: "Four-year comprehensive engineering program covering computer science, algorithms, discrete mathematics, artificial intelligence, data science, and modern software engineering.",
  },
  {
    year: "Completed",
    degree: "Class 12th (Senior Secondary)",
    institution: "Rajesh Public School",
    location: "Alwar, Rajasthan, India",
    grade: "Score: 88% (Distinction)",
    category: "Senior Secondary",
    description: "Rigorous academic study focusing on Physics, Chemistry, and Mathematics, developing strong quantitative analysis and problem-solving skills.",
  },
  {
    year: "Completed",
    degree: "Class 10th (Secondary School)",
    institution: "Rajesh Public School",
    location: "Alwar, Rajasthan, India",
    grade: "Score: 91% (Distinction)",
    category: "Secondary School",
    description: "Excellence across foundational sciences, mathematics, and analytical subjects, establishing a disciplined academic work ethic.",
  },
];

// Credentials in Progress (honest representations)
export const certificatesData = [
  {
    id: "cred-btech-ai",
    title: "B.Tech AI & Data Science Curriculum",
    issuer: "JECRC University",
    category: "Higher Education Degree",
    icon: "🎓",
    description: "Active enrollment in the accredited B.Tech program in Artificial Intelligence & Data Science, mastering computer systems, calculus, programming, and algorithms.",
    skills: ["AI Fundamentals", "Data Science", "Computer Science", "Programming Logic"],
  },
  {
    id: "cred-prog-foundations",
    title: "Programming & Computational Logic Foundations",
    issuer: "Academic & Practical Study",
    category: "Computer Science",
    icon: "💻",
    description: "Rigorous coursework and self-directed coding practice focused on programming logic, control structures, function design, and algorithmic problem solving.",
    skills: ["Programming Logic", "Problem Solving", "Algorithms", "Python"],
  },
  {
    id: "cred-web-foundations",
    title: "Web Development & Frontend Architecture",
    issuer: "Independent Technical Exploration",
    category: "Software Development",
    icon: "🌐",
    description: "Hands-on study of modern web standards, responsive design principles, DOM manipulation, semantic markup, and modular user interface engineering.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
  },
];

export const footerContent = {
  taglines: [
    "B.Tech — Artificial Intelligence & Data Science",
    "JECRC University, Alwar/NCR · 1st Semester",
    "Aspiring Software Developer & AI Enthusiast",
  ],
  credential: "Class 12: 88% · Class 10: 91% · Rajesh Public School",
  copyright: `© ${new Date().getFullYear()} Yash Tiwari | AI & Data Science Student`,
};

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
