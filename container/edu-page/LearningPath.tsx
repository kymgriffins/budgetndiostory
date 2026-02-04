import { Marquee } from "@/components";
import Link from "next/link";
import { courses } from "@/mockdata";

// Color mapping for course categories
const colorMap: Record<string, string> = {
  "Budget Basics": "from-green-400 to-emerald-500",
  "County Government": "from-blue-400 to-indigo-500",
  "Your Civic Rights": "from-purple-400 to-violet-500",
  "Tracking Public Spending": "from-orange-400 to-amber-500",
};

const gradientMap: Record<string, string> = {
  "Budget Basics": "bg-gradient-to-br from-green-400/20 to-emerald-500/20",
  "County Government": "bg-gradient-to-br from-blue-400/20 to-indigo-500/20",
  "Your Civic Rights": "bg-gradient-to-br from-purple-400/20 to-violet-500/20",
  "Tracking Public Spending": "bg-gradient-to-br from-orange-400/20 to-amber-500/20",
};

export default function LearningPath() {
  // Transform courses to learning path format
  const learningPath = courses.map((course, index) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    duration: course.duration,
    lessons: course.lessons.length,
    completed: index === 0, // Mark first course as completed
    current: index === 1, // Mark second course as current
    color: colorMap[course.title] || "from-gray-400 to-gray-500",
    gradient: gradientMap[course.title] || "bg-gradient-to-br from-gray-400/20 to-gray-500/20",
  }));

  const completedCount = learningPath.filter((p) => p.completed).length;
  const progressPercent = Math.round(
    (completedCount / learningPath.length) * 100,
  );

  return (
    <section
      id="learning-path"
      className="w-full min-h-screen bg-[#f1f1f1] rounded-t-[20px]"
      data-scroll-section
    >
      {/* LEARNING PATH SECTION */}
      <div
        className="w-full bg-[#111] pt-[60px] pb-[60px] min-h-screen"
        data-scroll-section
      >
        <div className="w-full mx-auto max-w-[1200px] px-[24px]">
          <div
            className="flex items-center justify-between gap-[16px] flex-wrap mb-[24px]"
            data-animate="fade-up"
          >
            <div>
              <h2 className="text-[24px] font-FoundersGrotesk font-medium text-white leading-[1.2]">
                Your Learning Path
              </h2>
              <p className="mt-[8px] text-[14px] font-NeueMontreal text-white/60">
                Complete these courses to master budget literacy
              </p>
            </div>
            <div className="text-right">
              <span className="text-[14px] font-NeueMontreal text-white/50">
                {completedCount} of {learningPath.length} completed
              </span>
              <div className="mt-[8px] w-[120px] h-[6px] bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-[16px] lg:grid-cols-1 mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1"
            data-animate="cards"
          >
            {learningPath.map((course, idx) => (
              <Link
                key={course.id}
                href={`/edu/${course.id}`}
                className={`group relative overflow-hidden rounded-[16px] ${course.gradient} ${course.color} p-[20px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300 border border-white/10`}
                data-animate="card"
              >
                <div className="flex items-center justify-between gap-[12px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[48px] h-[48px] rounded-full bg-white/20 flex items-center justify-center text-[20px] text-white">
                      {course.completed ? (
                        <svg
                          className="w-[24px] h-[24px]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : course.current ? (
                        <svg
                          className="w-[20px] h-[20px] pl-[2px]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      ) : (
                        <span className="font-FoundersGrotesk">{idx + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-[18px] font-FoundersGrotesk font-medium text-white">
                        {course.title}
                      </h3>
                      <p className="text-[12px] font-NeueMontreal text-white/70 mt-[2px]">
                        {course.duration} • {course.lessons} lessons
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    {course.current && (
                      <span className="px-[10px] py-[4px] rounded-full bg-white/20 text-[10px] font-NeueMontreal font-medium text-white">
                        In Progress
                      </span>
                    )}
                    {course.completed && (
                      <span className="px-[10px] py-[4px] rounded-full bg-green-500/20 text-[10px] font-NeueMontreal font-medium text-green-300">
                        Completed
                      </span>
                    )}
                    <span className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-[#111] transition-all duration-300">
                      <svg
                        className="w-[16px] h-[16px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <p className="mt-[12px] text-[14px] font-NeueMontreal text-white/80">
                  {course.description}
                </p>
                <div className="mt-[16px] flex items-center gap-[8px]">
                  <div className="flex -space-x-[4px]">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-[24px] h-[24px] rounded-full bg-white/30 border border-white/50 flex items-center justify-center text-[8px] text-white"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] font-NeueMontreal text-white/50">
                    and others started this course
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>



      {/* ADDITIONAL RESOURCES */}
      <div
        className="w-full flex justify-between gap-y-[30px] padding-x py-[40px] flex-wrap bg-[#f1f1f1]"
        data-animate="cards"
        data-scroll-section
      >
        <div className="w-full mb-[20px]">
          <h2 className="text-[32px] font-FoundersGrotesk font-medium text-[#212121] uppercase">
            Quick Resources
          </h2>
          <p className="paragraph mt-[8px] text-gray-500 font-NeueMontreal">
            Additional materials to support your learning journey
          </p>
        </div>

        <div className="w-[32%] smOnly:w-full xm:w-full" data-animate="card">
          <div className="w-full rounded-[12px] overflow-hidden border border-[#21212122] bg-white hover:scale-[0.99] transition-transform duration-300">
            <div className="w-full h-[160px] bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
              <svg
                className="w-[48px] h-[48px] text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="p-[16px]">
              <h3 className="text-[18px] font-FoundersGrotesk font-medium text-[#212121]">
                Budget Glossary
              </h3>
              <p className="paragraph font-NeueMontreal text-gray-500 mt-[8px]">
                Essential terms and definitions every budget literate person
                should know.
              </p>
              <Link
                href="/resources/glossary"
                className="paragraph font-NeueMontreal text-[#212121] mt-[14px] underline underline-offset-4 hover:text-gray-600"
              >
                View Glossary
              </Link>
            </div>
          </div>
        </div>

        <div className="w-[32%] smOnly:w-full xm:w-full" data-animate="card">
          <div className="w-full rounded-[12px] overflow-hidden border border-[#21212122] bg-white hover:scale-[0.99] transition-transform duration-300">
            <div className="w-full h-[160px] bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <svg
                className="w-[48px] h-[48px] text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div className="p-[16px]">
              <h3 className="text-[18px] font-FoundersGrotesk font-medium text-[#212121]">
                Data Tools
              </h3>
              <p className="paragraph font-NeueMontreal text-gray-500 mt-[8px]">
                Interactive tools and databases to explore budget data yourself.
              </p>
              <Link
                href="/resources/tools"
                className="paragraph font-NeueMontreal text-[#212121] mt-[14px] underline underline-offset-4 hover:text-gray-600"
              >
                Explore Tools
              </Link>
            </div>
          </div>
        </div>

        <div className="w-[32%] smOnly:w-full xm:w-full" data-animate="card">
          <div className="w-full rounded-[12px] overflow-hidden border border-[#21212122] bg-white hover:scale-[0.99] transition-transform duration-300">
            <div className="w-full h-[160px] bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center">
              <svg
                className="w-[48px] h-[48px] text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="p-[16px]">
              <h3 className="text-[18px] font-FoundersGrotesk font-medium text-[#212121]">
                Community
              </h3>
              <p className="paragraph font-NeueMontreal text-gray-500 mt-[8px]">
                Join other learners and share your insights on budget matters.
              </p>
              <Link
                href="/community"
                className="paragraph font-NeueMontreal text-[#212121] mt-[14px] underline underline-offset-4 hover:text-gray-600"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

