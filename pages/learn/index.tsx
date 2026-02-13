"use client";

import { NavbarLanding } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  FileText,
  GraduationCap,
  HelpCircle,
  MapPin,
  Moon,
  Play,
  Sun,
  Users,
  Video,
  Globe,
  Award,
  Link as LinkIcon,
  Map,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

// ==================== DATA ====================

// Learning Steps for Guided Path
const learningSteps = [
  {
    id: "basics",
    title: "Start with Budget Basics",
    description: "Learn the fundamentals of budgets",
    icon: <BookOpen size={20} />,
    color: "#00aa55",
    courseId: "budget-basics",
  },
  {
    id: "structure",
    title: "Understand Government Structure",
    description: "National vs County governments",
    icon: <Globe size={20} />,
    color: "#3b82f6",
    courseId: "government-structure",
  },
  {
    id: "participate",
    title: "Public Participation Guide",
    description: "Learn your rights and how to participate",
    icon: <Users size={20} />,
    color: "#f59e0b",
    courseId: "public-participation",
  },
  {
    id: "track",
    title: "Track a Project",
    description: "Use the tracker to monitor spending",
    icon: <Map size={20} />,
    color: "#8b5cf6",
    courseId: "tracking-guide",
  },
];

// Budget Calendar Events
const budgetCalendarEvents = [
  { month: "January", event: "County Budget Plans Due", phase: "planning" },
  { month: "February", event: "County Budget Reviews", phase: "review" },
  { month: "March", event: "Public Hearings Begin", phase: "participation" },
  { month: "April", event: "National Budget Reading", phase: "announcement" },
  { month: "May", event: "Parliamentary Debate", phase: "debate" },
  { month: "June", event: "Budget Approval", phase: "approval" },
  { month: "July", event: "New Fiscal Year Starts", phase: "implementation" },
  { month: "August", event: "Mid-Year Review", phase: "review" },
  { month: "September", event: "County Budget Updates", phase: "update" },
  { month: "October", event: "Public Participation Reports", phase: "participation" },
  { month: "November", event: "Audit Reports Published", phase: "accountability" },
  { month: "December", event: "Year-End Assessment", phase: "review" },
];

// Toolkits Data
const toolkits = [
  {
    id: "youth-guide",
    title: "Youth Civic Guide",
    description: "A comprehensive guide for young Kenyans to understand and engage with public budgets.",
    format: "PDF",
    size: "2.4 MB",
    downloads: 1250,
    color: "#00aa55",
  },
  
  {
    id: "community-advocacy",
    title: "Community Advocacy Manual",
    description: "Step-by-step guide for community-led budget advocacy campaigns.",
    format: "PDF",
    size: "3.8 MB",
    downloads: 654,
    color: "#f59e0b",
  },
  {
    id: "budget-checklist",
    title: "Citizen Budget Checklist",
    description: "Quick reference checklist for reviewing budget documents.",
    format: "PDF",
    size: "1.2 MB",
    downloads: 2100,
    color: "#8b5cf6",
  },
];

// Budget Clinics
const budgetClinics = [
  {
    id: 1,
    date: "March 15, 2025",
    time: "10:00 AM - 12:00 PM",
    title: "Understanding County Budgets",
    topic: "How county governments allocate funds",
    host: "Nairobi County Finance Team",
    spots: 50,
    registered: 42,
    type: "virtual",
  },
  {
    id: 2,
    date: "March 22, 2025",
    time: "2:00 PM - 4:00 PM",
    title: "Public Participation Workshop",
    topic: "Your rights in the budget process",
    host: "Civil Society Coalition",
    spots: 100,
    registered: 78,
    type: "hybrid",
    location: "Mombasa Cultural Centre",
  },
  {
    id: 3,
    date: "April 5, 2025",
    time: "11:00 AM - 1:00 PM",
    title: "Reading Budget Documents",
    topic: "Making sense of financial reports",
    host: "Kenya Institute for Public Policy Research",
    spots: 75,
    registered: 55,
    type: "virtual",
  },
];

// Course Lessons Data
const courseLessons = {
  "budget-basics": [
    { title: "What is a Budget?", duration: "5 min", type: "video" },
    { title: "Why Budgets Matter", duration: "4 min", type: "video" },
    { title: "Kenya's Budget Process", duration: "6 min", type: "article" },
    { title: "Types of Budgets", duration: "4 min", type: "video" },
    { title: "Quiz: Budget Basics", duration: "5 min", type: "quiz" },
  ],
  "reading-budgets": [
    {
      title: "Understanding Budget Documents",
      duration: "6 min",
      type: "video",
    },
    { title: "Reading Financial Statements", duration: "5 min", type: "video" },
    { title: "Allocation vs Expenditure", duration: "4 min", type: "article" },
    {
      title: "Identifying Budget Line Items",
      duration: "5 min",
      type: "video",
    },
    { title: "Quiz: Reading Budgets", duration: "5 min", type: "quiz" },
  ],
  "tracking-spending": [
    { title: "Tracking Public Funds", duration: "5 min", type: "video" },
    { title: "Procurement Records", duration: "4 min", type: "article" },
    { title: "Field Verification", duration: "6 min", type: "video" },
    { title: "Finding Discrepancies", duration: "5 min", type: "video" },
  ],
  "civic-action": [
    { title: "Your Right to Know", duration: "4 min", type: "video" },
    { title: "Participatory Budgeting", duration: "5 min", type: "video" },
    { title: "Advocacy Strategies", duration: "6 min", type: "article" },
    { title: "Writing to Representatives", duration: "4 min", type: "video" },
    { title: "Taking Action", duration: "5 min", type: "video" },
  ],
  "government-structure": [
    { title: "National Government Structure", duration: "6 min", type: "video" },
    { title: "County Government Structure", duration: "5 min", type: "video" },
    { title: "Revenue Allocation", duration: "4 min", type: "article" },
    { title: "Equitable Share Formula", duration: "5 min", type: "video" },
    { title: "Quiz: Government Structure", duration: "5 min", type: "quiz" },
  ],
  "public-participation": [
    { title: "Your Constitutional Rights", duration: "5 min", type: "video" },
    { title: "How to Submit Memoranda", duration: "4 min", type: "article" },
    { title: "Attending Public Hearings", duration: "6 min", type: "video" },
    { title: "Following Up on Submissions", duration: "4 min", type: "video" },
    { title: "Quiz: Public Participation", duration: "5 min", type: "quiz" },
  ],
  "tracking-guide": [
    { title: "Introduction to the Tracker", duration: "3 min", type: "video" },
    { title: "Finding Projects by Location", duration: "4 min", type: "video" },
    { title: "Understanding Status Updates", duration: "5 min", type: "article" },
    { title: "Reporting Issues", duration: "4 min", type: "video" },
    { title: "Practice: Track a Project", duration: "10 min", type: "video" },
  ],
};

const courses = [
  {
    id: "budget-basics",
    title: "Budget Basics",
    description:
      "Learn what a budget is, why it matters, and how Kenya's budget process works.",
    lessons: 5,
    duration: "20 min",
    category: "Foundation",
    color: "#00aa55",
    icon: <BookOpen size={24} />,
  },
  {
    id: "government-structure",
    title: "Government Structure",
    description:
      "Understand the relationship between National and County governments and how funds are allocated.",
    lessons: 5,
    duration: "25 min",
    category: "Foundation",
    color: "#3b82f6",
    icon: <Globe size={24} />,
  },
  {
    id: "reading-budgets",
    title: "Reading Budgets",
    description:
      "Understand budget documents, allocations, and how to read fiscal reports.",
    lessons: 5,
    duration: "25 min",
    category: "Skills",
    color: "#6366f1",
    icon: <FileText size={24} />,
  },
  {
    id: "public-participation",
    title: "Public Participation",
    description:
      "Learn your constitutional rights and how to participate in Kenya's budget process.",
    lessons: 5,
    duration: "24 min",
    category: "Engagement",
    color: "#f59e0b",
    icon: <Users size={24} />,
  },
  {
    id: "tracking-spending",
    title: "Tracking Spending",
    description:
      "Learn techniques to track public spending and identify discrepancies.",
    lessons: 4,
    duration: "20 min",
    category: "Accountability",
    color: "#ef4444",
    icon: <Map size={24} />,
  },
  {
    id: "tracking-guide",
    title: "Track a Project",
    description:
      "Master the Budget Tracker tool to monitor government projects in your area.",
    lessons: 5,
    duration: "26 min",
    category: "Skills",
    color: "#8b5cf6",
    icon: <LinkIcon size={24} />,
  },
  {
    id: "civic-action",
    title: "Civic Action",
    description:
      "Discover how to participate in budget processes and advocate for change.",
    lessons: 5,
    duration: "25 min",
    category: "Engagement",
    color: "#ec4899",
    icon: <Award size={24} />,
  },
];

const features = [
  {
    icon: <Play size={24} />,
    title: "Video Lessons",
    description: "Engaging video content that breaks down complex budget concepts.",
    color: "#3b82f6",
  },
  {
    icon: <FileText size={24} />,
    title: "Reading Materials",
    description: "In-depth articles and guides for deeper understanding.",
    color: "#00aa55",
  },
  {
    icon: <Calendar size={24} />,
    title: "Budget Calendar",
    description: "Stay informed about key dates in Kenya's budget cycle.",
    color: "#f59e0b",
  },
  {
    icon: <Download size={24} />,
    title: "Downloadable Toolkits",
    description: "Resources you can use in your community.",
    color: "#8b5cf6",
  },
  {
    icon: <Users size={24} />,
    title: "Budget Clinics",
    description: "Live sessions with experts on budget topics.",
    color: "#ec4899",
  },
  {
    icon: <HelpCircle size={24} />,
    title: "Interactive Quizzes",
    description: "Test your knowledge and track your progress.",
    color: "#06b6d4",
  },
];

// Quiz Questions
const quizQuestions = {
  "budget-basics": [
    {
      question: "What is a national budget?",
      options: [
        "A list of government employees",
        "A plan for how public money will be collected and spent",
        "A collection of laws",
        "A report on completed projects",
      ],
      correct: 1,
    },
    {
      question: "Who approves Kenya's national budget?",
      options: ["The President alone", "Parliament", "The Treasury", "County Governors"],
      correct: 1,
    },
    {
      question: "What is the fiscal year in Kenya?",
      options: [
        "January to December",
        "July 1 to June 30",
        "April 1 to March 31",
        "October 1 to September 30",
      ],
      correct: 2,
    },
  ],
  "reading-budgets": [
    {
      question: "What does 'allocation' refer to in a budget?",
      options: [
        "Money actually spent",
        "Money set aside for a specific purpose",
        "Money borrowed",
        "Money saved",
      ],
      correct: 1,
    },
    {
      question: "Where can you find Kenya's national budget documents?",
      options: [
        "National Treasury website",
        "Only in Parliament",
        "County offices",
        "Private newspapers",
      ],
      correct: 0,
    },
  ],
};

// ==================== COMPONENT ====================

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDark, setIsDark] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<{
    courseId: string;
    lessonIndex: number;
  } | null>(null);
  const [completedLessons, setCompletedLessons] = useState<
    Record<string, boolean>
  >({});
  const [currentStep, setCurrentStep] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");
  const [showQuiz, setShowQuiz] = useState<{
    courseId: string;
    questionIndex: number;
    score: number;
  } | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
    setActiveLesson(null);
  };

  const openLesson = (courseId: string, lessonIndex: number) => {
    const lesson =
      courseLessons[courseId as keyof typeof courseLessons]?.[lessonIndex];
    if (lesson?.type === "quiz") {
      setShowQuiz({ courseId, questionIndex: 0, score: 0 });
    } else {
      setActiveLesson({ courseId, lessonIndex });
    }
    setExpandedCourse(courseId);
  };

  const closeLesson = () => {
    setActiveLesson(null);
    setShowQuiz(null);
    setQuizAnswers({});
  };

  const toggleLesson = (lessonKey: string) => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonKey]: !prev[lessonKey],
    }));
  };

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  const totalLessons = courses.reduce((acc, course) => acc + course.lessons, 0);
  const completedCount = Object.keys(completedLessons).filter(
    (key) => completedLessons[key],
  ).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const faqs = [
    {
      question: "How long do courses take?",
      answer:
        "Each course takes between 15-30 minutes to complete. You can learn at your own pace and revisit content anytime.",
    },
    {
      question: "Are the courses free?",
      answer:
        "Yes! All our courses and learning materials are completely free. We believe budget literacy should be accessible to everyone.",
    },
    {
      question: "Do I need prior knowledge?",
      answer:
        "No! Our courses start from the basics and build up. Even if you've never looked at a budget before, you'll be able to follow along.",
    },
    {
      question: "Can I download the toolkits?",
      answer:
        "Yes! All our downloadable resources are free. Click the download button on any toolkit to get the PDF file.",
    },
    {
      question: "How do I join a Budget Clinic?",
      answer:
        "Register for upcoming clinics directly on this page. Virtual clinics use Zoom, and hybrid clinics have both online and in-person options.",
    },
  ];

  const handleQuizAnswer = (answerIndex: number, questionIndex: number, courseId: string, question: typeof quizQuestions["budget-basics"][0]) => {
    const newAnswers = { ...quizAnswers, [`${courseId}-${questionIndex}`]: answerIndex };
    setQuizAnswers(newAnswers);

    const nextQuestion = questionIndex + 1;
    const questions = quizQuestions[courseId as keyof typeof quizQuestions];

    if (nextQuestion < questions.length) {
      setShowQuiz({ courseId, questionIndex: nextQuestion, score: 0 });
    } else {
      // Calculate final score
      let score = 0;
      questions.forEach((q, idx) => {
        if (newAnswers[`${courseId}-${idx}`] === q.correct) {
          score++;
        }
      });
      setShowQuiz({ courseId, questionIndex: -1, score });
    }
  };

  return (
    <>
      <Head>
        <title>Learn - Budget Ndio Story</title>
        <meta
          name="description"
          content="Learn to understand and engage with Kenya's public budgets through our free courses and learning materials."
        />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
        {/* Navigation */}
        <NavbarLanding />

        <main>
          {/* HERO */}
         
          {/* Section Divider */}
          <div className="px-4">
            <div className="max-w-6xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* FEATURED COURSE SPOTLIGHT */}
          <section id="featured-course" className="px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs font-NeueMontreal uppercase tracking-[0.2em] text-[#00aa55]">
                  Featured Course
                </span>
                <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
                  {/* Content */}
                  <div>
                    <div className="flex font-NeueMontreal  items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#00aa55]/20 text-[#00aa55] text-sm font-medium">
                        Most Popular
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-sm">
                        20 min
                      </span>
                    </div>
                    <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold tracking-tight uppercase">
                      Budget Basics
                    </h2>
                    <p className="mt-4 text-lg font-NeueMontreal text-white/70 leading-relaxed">
                      Start your civic education journey here. Learn what a budget is, 
                      why it matters, and how Kenya's national and county budgets work.
                      This foundational course will give you the knowledge you need 
                      to understand all other budget topics.
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00aa55]/30 to-[#3b82f6]/30 border-2 border-[#0a0a0a] flex items-center justify-center">
                            <span className="text-xs font-medium">U{i}</span>
                          </div>
                        ))}
                      </div>
                      <span className="font-NeueMontreal text-white/60">
                        2,500+ enrolled
                      </span>
                    </div>
                    <div className="mt-8 flex items-center gap-4">
                      <button
                        onClick={() => openLesson('budget-basics', 0)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
                      >
                        Start Learning <Play size={14} />
                      </button>
                      <Link
                        href="/learn/budget-basics"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/20 transition-colors"
                      >
                        View Curriculum
                      </Link>
                    </div>
                  </div>

                  {/* Preview Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00aa55]/20 to-[#3b82f6]/20 rounded-3xl blur-3xl" />
                    <div className="relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                      {/* Video Preview */}
                      <div className="aspect-video bg-gradient-to-br from-[#00aa55]/10 to-[#3b82f6]/10 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <Play size={32} className="text-white ml-1" />
                        </div>
                      </div>
                      {/* Lesson List Preview */}
                      <div className="p-6">
                        <h4 className="font-FoundersGrotesk text-lg font-medium mb-4">Course Content</h4>
                        <div className="space-y-3">
                          {courseLessons['budget-basics']?.slice(0, 3).map((lesson, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                lesson.type === 'video' ? 'bg-[#3b82f6]/20 text-[#3b82f6]' :
                                lesson.type === 'quiz' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' :
                                'bg-white/10 text-white/60'
                              }`}>
                                {lesson.type === 'video' ? <Play size={14} /> :
                                 lesson.type === 'quiz' ? <HelpCircle size={14} /> :
                                 <FileText size={14} />}
                              </div>
                              <div className="flex-1">
                                <p className="font-NeueMontreal text-sm">{lesson.title}</p>
                                <p className="font-NeueMontreal text-xs text-white/40">{lesson.duration}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-4 text-center font-NeueMontreal text-sm text-white/40">
                          + 2 more lessons
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="px-4">
            <div className="max-w-6xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* ALL COURSES GRID */}
          <section id="courses" className="px-4 sm:px-6 lg:px-8 py-24 bg-white/5">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs font-NeueMontreal uppercase tracking-[0.2em] text-white/50">
                  All Courses
                </span>
                <h2 className="font-FoundersGrotesk text-2xl lg:text-4xl font-semibold tracking-tight uppercase mt-3">
                  Explore Our Library
                </h2>
                <p className="mt-3 text-lg font-NeueMontreal text-white/60 max-w-xl mx-auto">
                  From beginners to advanced - we have courses for every level of budget literacy.
                </p>
              </motion.div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {['All', 'Foundation', 'Skills', 'Engagement', 'Accountability'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full font-NeueMontreal text-sm transition-all ${
                      activeCategory === category
                        ? 'bg-[#00aa55] text-black'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Course Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1"
                  >
                    {/* Category Color Stripe */}
                   

                    <div className="p-6 pl-8">
                      {/* Icon & Category */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${course.color}20`, color: course.color }}
                        >
                          {course.icon}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-NeueMontreal text-white/50">
                          {course.category}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="font-FoundersGrotesk text-xl font-semibold group-hover:text-[#00aa55] transition-colors">
                        {course.title}
                      </h3>
                      <p className="font-NeueMontreal text-sm text-white/60 mt-2 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1 text-white/50">
                          <BookOpen size={14} />
                          <span className="text-sm font-NeueMontreal">{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/50">
                          <Clock size={14} />
                          <span className="text-sm font-NeueMontreal">{course.duration}</span>
                        </div>
                      </div>

                      {/* Hover: Start Learning CTA */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        whileHover={{ opacity: 1, height: 'auto' }}
                        className="overflow-hidden"
                      >
                        <button
                          onClick={() => openLesson(course.id, 0)}
                          className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-[#00aa55] to-[#00cc66] text-black font-NeueMontreal text-sm font-medium hover:shadow-lg hover:shadow-[#00aa55]/20 transition-all"
                        >
                          Start Learning
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="px-4">
            <div className="max-w-6xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* BUDGET CALENDAR + CLINICS SIDE BY SIDE */}
          <section id="calendar" className="px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs font-NeueMontreal uppercase tracking-[0.2em] text-white/50">
                  Stay Informed
                </span>
                <h2 className="font-FoundersGrotesk text-2xl lg:text-4xl font-semibold tracking-tight uppercase mt-3">
                  Calendar & Events
                </h2>
                <p className="mt-3 text-lg font-NeueMontreal text-white/60 max-w-xl mx-auto">
                  Key dates in Kenya's budget cycle and upcoming opportunities to learn from experts.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Budget Calendar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center">
                      <Calendar size={24} className="text-[#f59e0b]" />
                    </div>
                    <div>
                      <h3 className="font-FoundersGrotesk text-xl font-semibold">Budget Calendar</h3>
                      <p className="font-NeueMontreal text-sm text-white/60">2025-2026 Fiscal Year</p>
                    </div>
                  </div>

                  {/* Interactive Calendar Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {budgetCalendarEvents.map((event, index) => (
                      <motion.button
                        key={event.month}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00aa55]/30 transition-all text-left group"
                      >
                        <p className="font-NeueMontreal text-[10px] sm:text-xs text-white/50 group-hover:text-[#00aa55] transition-colors">
                          {event.month}
                        </p>
                        <p className="font-NeueMontreal text-xs sm:text-sm font-medium mt-0.5 sm:mt-1 line-clamp-2">
                          {event.event}
                        </p>
                        <span className={`inline-block font-NeueMontreal mt-1 sm:mt-2 px-1.5 py-0.5 rounded text-[9px] sm:text-xs capitalize whitespace-nowrap ${
                          event.phase === 'planning' ? 'bg-blue-500/20 text-blue-400' :
                          event.phase === 'review' ? 'bg-yellow-500/20 text-yellow-400' :
                          event.phase === 'participation' ? 'bg-[#00aa55]/20 text-[#00aa55]' :
                          event.phase === 'announcement' ? 'bg-purple-500/20 text-purple-400' :
                          event.phase === 'debate' ? 'bg-orange-500/20 text-orange-400' :
                          event.phase === 'approval' ? 'bg-green-500/20 text-green-400' :
                          event.phase === 'implementation' ? 'bg-[#00aa55]/20 text-[#00aa55]' :
                          event.phase === 'accountability' ? 'bg-red-500/20 text-red-400' :
                          'bg-white/10 text-white/60'
                        }`}>
                          {event.phase}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <button className="mt-6 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 font-NeueMontreal text-sm transition-colors">
                    View Full Calendar →
                  </button>
                </motion.div>

                {/* Budget Clinics */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  {budgetClinics.map((clinic, index) => (
                    <motion.div
                      key={clinic.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00aa55]/20 to-[#3b82f6]/20 flex items-center justify-center flex-shrink-0">
                            <Video size={20} className="text-[#00aa55]" />
                          </div>
                          <div>
                            <h4 className="font-FoundersGrotesk font-medium">{clinic.title}</h4>
                            <p className="font-NeueMontreal text-sm text-white/60 mt-1">{clinic.topic}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-white/50">
                              <span>{clinic.date}</span>
                              <span>•</span>
                              <span>{clinic.time}</span>
                            </div>
                          </div>
                        </div>
                        {/* Urgency Badge */}
                        {clinic.spots - clinic.registered <= 20 && (
                          <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium flex-shrink-0">
                            {clinic.spots - clinic.registered} spots left
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-white/50">{clinic.registered}/{clinic.spots} registered</span>
                              <span className="text-[#00aa55]">{Math.round((clinic.registered/clinic.spots)*100)}%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(clinic.registered/clinic.spots)*100}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-[#00aa55] to-[#00aa55] rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-[#00aa55] text-black text-sm font-NeueMontreal font-medium hover:bg-[#00cc66] transition-colors">
                          Register
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 font-NeueMontreal text-sm transition-colors">
                    View All Clinics →
                  </button>
                </motion.div>
              </div>
            </div>
          </section>

          

          {/* TOOLKITS SECTION */}
          <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/5">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold uppercase">
                  Downloadable Toolkits
                </h2>
                <p className="mt-2 text-sm font-NeueMontreal text-white/60">
                  Resources to help you engage with budgets in your community
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {toolkits.map((toolkit, index) => (
                  <motion.div
                    key={toolkit.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${toolkit.color}20`,
                          color: toolkit.color,
                        }}
                      >
                        <Download size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-FoundersGrotesk text-lg font-medium">
                          {toolkit.title}
                        </h3>
                        <p className="font-NeueMontreal text-white/60 text-sm mt-2">
                          {toolkit.description}
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                          <span className="px-2 py-1 rounded bg-white/10 text-xs font-NeueMontreal text-white/60">
                            {toolkit.format}
                          </span>
                          <span className="text-xs font-NeueMontreal text-white/40">
                            {toolkit.size}
                          </span>
                          <span className="text-xs font-NeueMontreal text-white/40">
                            {toolkit.downloads.toLocaleString()} downloads
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-NeueMontreal transition-colors">
                        Download
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          

          {/* Section Divider */}
          <div className="px-4">
            <div className="max-w-6xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* IMPACT STATS + TESTIMONIALS */}
          <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-transparent via-[#3b82f6]/5 to-transparent">
            <div className="max-w-6xl mx-auto">
              {/* Impact Stats */}
             
              {/* Testimonials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-10">
                  <span className="text-xs font-NeueMontreal uppercase tracking-[0.2em] text-white/50">
                    Testimonials
                  </span>
                  <h2 className="font-FoundersGrotesk text-2xl lg:text-4xl font-semibold tracking-tight uppercase mt-3">
                    What Our Learners Say
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      quote: "This course helped me understand how my county allocates funds. Now I can participate in public hearings with confidence.",
                      name: "Jane Wanjiku",
                      role: "Community Activist, Nairobi",
                      avatar: "JW",
                      color: "#00aa55"
                    },
                    {
                      quote: "As a teacher, the budget toolkit has been invaluable. My students now understand civic responsibility at a young age.",
                      name: "David Ochieng",
                      role: "High School Teacher, Kisumu",
                      avatar: "DO",
                      color: "#3b82f6"
                    },
                    {
                      quote: "I never understood budgets before. The tracker feature showed me exactly where development projects were happening in my area.",
                      name: "Mary Akinyi",
                      role: "Youth Leader, Mombasa",
                      avatar: "MA",
                      color: "#f59e0b"
                    },
                  ].map((testimonial, index) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:transform hover:-translate-y-1"
                    >
                      {/* Quote Icon */}
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${testimonial.color}20`, color: testimonial.color }}
                      >
                        <Award size={20} />
                      </div>

                      {/* Quote */}
                      <p className="font-NeueMontreal text-white/80 leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                          style={{ backgroundColor: `${testimonial.color}20`, color: testimonial.color }}
                        >
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="font-FoundersGrotesk font-medium">{testimonial.name}</p>
                          <p className="font-NeueMontreal text-sm text-white/50">{testimonial.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="px-4">
            <div className="max-w-6xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* FAQ SECTION */}
          <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/5">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  FAQ
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold tracking-tight mt-3">
                  Frequently Asked Questions
                </h2>
              </motion.div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left"
                    >
                      <span className="font-FoundersGrotesk text-lg font-medium">
                        {faq.question}
                      </span>
                      {openFaq === i ? (
                        <ChevronUp size={20} className="text-white/60" />
                      ) : (
                        <ChevronDown size={20} className="text-white/60" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5">
                            <p className="font-NeueMontreal text-white/70 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#03522a] via-[#000000] to-[#000000]" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                
                {/* Content */}
                <div className="relative p-8 lg:p-16 text-center">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex font-NeueMontreal items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm text-white text-sm font-medium mb-6"
                  >
                    <Users size={16} />
                    Join 10,000+ learners
                  </motion.div>

                  <h2 className="font-FoundersGrotesk text-3xl lg:text-5xl font-semibold tracking-tight text-white">
                    Ready to Start Your Journey?
                  </h2>
                  <p className="font-NeueMontreal text-lg text-white/90 mt-4 max-w-xl mx-auto leading-relaxed">
                    Join thousands of Kenyans who are taking control of their civic education. 
                    Your first lesson is free - start now!
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-10">
                    <button
                      onClick={() => {
                        setActiveCategory("Foundation");
                        document
                          .getElementById("courses")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg"
                    >
                      Start Learning Free
                    </button>
                    <Link
                      href="/newsletter"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-black/20 backdrop-blur-sm text-white rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-black/30 transition-colors"
                    >
                      Subscribe to Updates
                    </Link>
                  </div>

                  {/* Trust indicators */}
                  <div className="flex font-NeueMontreal items-center justify-center gap-6 mt-8 text-white/70 text-sm">
                    <span className="flex items-center gap-2">
                      <Check size={16} className="text-white" />
                      No credit card required
                    </span>
                    <span className="flex items-center gap-2">
                      <Check size={16} className="text-white" />
                      100% Free forever
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Contact Info */}
              <div>
                <h3 className="font-FoundersGrotesk text-sm font-medium text-white uppercase mb-4">
                  Contact
                </h3>
                <div className="space-y-2">
                  <a
                    href="mailto:info@budgetndiostory.org"
                    className="block text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    info@budgetndiostory.org
                  </a>
                  <p className="text-sm font-NeueMontreal text-white/60">
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-FoundersGrotesk text-sm font-medium text-white uppercase mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/tracker"
                    className="block text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Budget Tracker
                  </Link>
                  <Link
                    href="/blog"
                    className="block text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Theme Toggle */}
              <div>
                <h3 className="font-FoundersGrotesk text-sm font-medium text-white uppercase mb-4">
                  Appearance
                </h3>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>

              {/* Copyright */}
              <div>
                <h3 className="font-FoundersGrotesk text-sm font-medium text-white uppercase mb-4">
                  Budget Ndio Story
                </h3>
                <p className="text-xs font-NeueMontreal text-white/40">
                  © {new Date().getFullYear()} All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* LESSON CONTENT DISPLAY / QUIZ MODAL */}
      <AnimatePresence>
        {(activeLesson || showQuiz) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLesson}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0a0a] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Quiz Mode */}
              {showQuiz && showQuiz.questionIndex >= 0 && (
                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-NeueMontreal text-white/50 uppercase tracking-wider">
                        Quiz
                      </span>
                      <span className="text-xs font-NeueMontreal text-white/50">
                        Question {showQuiz.questionIndex + 1} of{" "}
                        {quizQuestions[
                          showQuiz.courseId as keyof typeof quizQuestions
                        ]?.length || 0}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full">
                      <div
                        className="h-full bg-[#00aa55] rounded-full transition-all"
                        style={{
                          width: `${((showQuiz.questionIndex + 1) /
                            (quizQuestions[
                              showQuiz.courseId as keyof typeof quizQuestions
                            ]?.length || 1)) *
                            100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {(() => {
                    const questions =
                      quizQuestions[
                        showQuiz.courseId as keyof typeof quizQuestions
                      ];
                    const question = questions?.[showQuiz.questionIndex];

                    if (!question) return null;

                    return (
                      <>
                        <h3 className="font-FoundersGrotesk text-xl font-semibold mb-6">
                          {question.question}
                        </h3>
                        <div className="space-y-3">
                          {question.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() =>
                                handleQuizAnswer(
                                  idx,
                                  showQuiz.questionIndex,
                                  showQuiz.courseId,
                                  question,
                                )
                              }
                              className="w-full p-4 text-left rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
                            >
                              <span className="font-NeueMontreal">
                                {option}
                              </span>
                            </button>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Quiz Results */}
              {showQuiz && showQuiz.questionIndex === -1 && (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-20 h-20 rounded-full bg-[#00aa55]/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <Award size={40} className="text-[#00aa55]" />
                  </motion.div>
                  <h3 className="font-FoundersGrotesk text-2xl font-semibold mb-4">
                    Quiz Complete!
                  </h3>
                  <p className="font-NeueMontreal text-white/60 mb-6">
                    You scored{" "}
                    <span className="text-[#00aa55] font-semibold">
                      {showQuiz.score}/
                      {quizQuestions[
                        showQuiz.courseId as keyof typeof quizQuestions
                      ]?.length || 0}
                    </span>
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setShowQuiz(null);
                        setQuizAnswers({});
                      }}
                      className="px-6 py-3 bg-white/10 text-white rounded-full font-NeueMontreal text-sm hover:bg-white/20 transition-colors"
                    >
                      Retake Quiz
                    </button>
                    <button
                      onClick={closeLesson}
                      className="px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal text-sm hover:bg-[#00cc66] transition-colors"
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              )}

              {/* Lesson Content (not quiz) */}
              {activeLesson && !showQuiz && (
                <>
                  {(() => {
                    const course = courses.find(
                      (c) => c.id === activeLesson.courseId,
                    );
                    const lesson =
                      courseLessons[
                        activeLesson.courseId as keyof typeof courseLessons
                      ]?.[activeLesson.lessonIndex];
                    if (!course || !lesson) return null;

                    return (
                      <div className="p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{
                                backgroundColor: `${course.color}20`,
                                color: course.color,
                              }}
                            >
                              {course.icon}
                            </div>
                            <div>
                              <p className="text-xs font-NeueMontreal text-white/50 uppercase tracking-wider">
                                {course.title}
                              </p>
                              <h3 className="font-FoundersGrotesk text-xl font-semibold">
                                {lesson.title}
                              </h3>
                            </div>
                          </div>
                          <button
                            onClick={closeLesson}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                          >
                            <ChevronDown size={20} className="rotate-45" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="mb-6">
                          {lesson.type === "video" && (
                            <div className="aspect-video rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                              <div className="text-center">
                                <Play
                                  size={48}
                                  className="mx-auto mb-4 text-white/40"
                                />
                                <p className="font-NeueMontreal text-white/60">
                                  Video content coming soon
                                </p>
                              </div>
                            </div>
                          )}
                          {lesson.type === "article" && (
                            <div className="prose prose-invert max-w-none">
                              <h4 className="font-FoundersGrotesk text-lg font-semibold mb-4">
                                {lesson.title}
                              </h4>
                              <p className="font-NeueMontreal text-white/70 leading-relaxed">
                                Article content coming soon. This lesson will
                                cover important concepts related to{" "}
                                {lesson.title.toLowerCase()} in Kenya's public
                                budget process.
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          {(() => {
                            const lessonKey = `${activeLesson.courseId}-${activeLesson.lessonIndex}`;
                            const isCompleted = completedLessons[lessonKey];
                            return (
                              <button
                                onClick={() => toggleLesson(lessonKey)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center ${isCompleted ? "bg-[#00aa55]" : "border border-white/30"}`}
                                >
                                  {isCompleted && <Check size={12} />}
                                </div>
                                <span className="text-sm font-NeueMontreal">
                                  {isCompleted
                                    ? "Completed"
                                    : "Mark as complete"}
                                </span>
                              </button>
                            );
                          })()}

                          <div className="flex items-center gap-2">
                            {activeLesson.lessonIndex > 0 && (
                              <button
                                onClick={() =>
                                  setActiveLesson({
                                    courseId: activeLesson.courseId,
                                    lessonIndex: activeLesson.lessonIndex - 1,
                                  })
                                }
                                className="px-4 py-2 text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                              >
                                Previous
                              </button>
                            )}
                            <button
                              onClick={() => {
                                const lessonKey = `${activeLesson.courseId}-${activeLesson.lessonIndex}`;
                                toggleLesson(lessonKey);
                                if (
                                  activeLesson.lessonIndex <
                                  (courseLessons[
                                    activeLesson.courseId as keyof typeof courseLessons
                                  ]?.length || 1) -
                                    1
                                ) {
                                  setActiveLesson({
                                    courseId: activeLesson.courseId,
                                    lessonIndex: activeLesson.lessonIndex + 1,
                                  });
                                }
                              }}
                              className="px-6 py-2 rounded-full bg-[#00aa55] text-black text-sm font-NeueMontreal hover:bg-[#00cc66] transition-colors"
                            >
                              Next Lesson
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
