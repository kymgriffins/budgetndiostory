import { Tags } from "@/components";

const topics = [
  { id: 1, title: "budget basics", href: "/edu" },
  { id: 2, title: "reading budgets", href: "/edu" },
  { id: 3, title: "tracking spending", href: "/edu" },
  { id: 4, title: "civic action", href: "/edu" },
];

export default function Heroedu() {
  return (
    <section
      className="w-full min-h-screen flex items-center"
      data-scroll-section
    >
      <div className="w-full flex flex-col justify-between">
        <div className="w-full flex flex-col">
          <div className="w-full margin padding-x">
            <div data-animate="fade-up">
              <h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
                Learning Path
              </h1>
              <p className="paragraph mt-[20px] text-secondry font-NeueMontreal max-w-[760px]">
                Master the art of understanding and engaging with Kenya's
                budget. Follow our structured learning path to become a budget
                expert.
              </p>
            </div>
          </div>

          <div className="w-full border-t border-[#21212155] pt-[20px]">
            <div className="w-full flex justify-between padding-x smOnly:flex-col xm:flex-col gap-[20px]">
              <div className="w-[50%] smOnly:w-full xm:w-full">
                <h3
                  className="paragraph font-medium text-secondry font-NeueMontreal"
                  data-animate="fade-up"
                >
                  Explore Topics:
                </h3>
              </div>
              <div
                className="w-[50%] smOnly:w-full xm:w-full flex flex-wrap items-center gap-[10px]"
                data-animate="fade-up"
              >
                {topics.map((item) => (
                  <Tags
                    key={item.id}
                    bgcolor="#212121"
                    item={item}
                    className="hover:text-white"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full padding-x padding-y">
            <div
              className="w-full flex items-center justify-between gap-[20px] smOnly:flex-col xm:flex-col"
              data-animate="fade-up"
            >
              <div className="w-[60%] smOnly:w-full xm:w-full">
                <h2 className="sub-heading font-FoundersGrotesk uppercase text-secondry">
                  Your journey to budget literacy starts here.
                </h2>
                <p className="paragraph mt-[10px] text-gray-500 font-NeueMontreal">
                  Complete structured courses at your own pace. From
                  understanding budget basics to taking civic action, we've got
                  you covered.
                </p>
              </div>
              <div className="w-fit">
                <a
                  href="#learning-path"
                  className="paragraph font-NeueMontreal uppercase text-secondry link-flash"
                >
                  Start Learning
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
