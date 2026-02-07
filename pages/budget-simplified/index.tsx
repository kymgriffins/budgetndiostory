import LandingFooter from "@/components/LandingFooter";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function BudgetSimplified() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let loco: any;
    let ctx: any;
    let gsap: any;
    let ScrollTrigger: any;

    const el = scrollerRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    let cancelled = false;

    (async () => {
      try {
        if (
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
        ) {
          return;
        }

        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        const gsapModule: any = await import("gsap");
        const stModule: any = await import("gsap/ScrollTrigger");

        gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
        ScrollTrigger = stModule.ScrollTrigger ?? stModule.default ?? stModule;

        if (!gsap?.registerPlugin || !ScrollTrigger) return;
        gsap.registerPlugin(ScrollTrigger);

        if (getComputedStyle(el).position === "static") {
          el.style.position = "relative";
        }

        loco = new LocomotiveScroll({
          lenisOptions: {
            wrapper: el,
            content,
            lerp: 0.08,
            smoothWheel: true,
            smoothTouch: true,
          } as any,
          scrollCallback: () => ScrollTrigger.update(),
          autoStart: true,
        });

        if (cancelled) return;

        const getScrollY = () =>
          loco?.lenisInstance?.scroll ?? el.scrollTop ?? 0;

        ScrollTrigger.scrollerProxy(el, {
          scrollTop(value?: number) {
            if (typeof value === "number") {
              return loco?.scrollTo?.(value, { immediate: true });
            }
            return getScrollY();
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType:
            getComputedStyle(el).transform !== "none" ? "transform" : "fixed",
        });

        ScrollTrigger.defaults({ scroller: el });
        ScrollTrigger.addEventListener("refresh", () => loco?.update?.());

        ctx = gsap.context(() => {
          gsap.fromTo(
            "[data-hero='sub']",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          );
          gsap.fromTo(
            "[data-hero='title']",
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              delay: 0.05,
            },
          );
          gsap.fromTo(
            "[data-hero='cta']",
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",
              delay: 0.12,
            },
          );

          (
            gsap.utils.toArray("[data-animate='fade-up']") as HTMLElement[]
          ).forEach((node) => {
            gsap.fromTo(
              node,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: node, start: "top 85%" },
              },
            );
          });
        });

        return () => {
          cancelled = true;
          ctx?.revert?.();
          loco?.destroy?.();
          ScrollTrigger?.getAll?.().forEach?.((t: any) => t.kill?.());
        };
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Budget 101 - Budget Ndio Story</title>
        <meta
          name="description"
          content="Understand Kenya's budget cycle, where money comes from, and how it's allocated across sectors."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div ref={scrollerRef} className="h-screen overflow-hidden">
        <div ref={contentRef}>
          <main className="w-full">
            {/* HERO */}
            <section className="padding-x padding-y min-h-screen flex flex-col justify-center bg-gradient-to-br from-[#f1f1f1] to-white">
              <div className="max-w-[1200px] mx-auto w-full">
                <div data-hero="sub" className="inline-block mb-[20px]">
                  <span className="px-[14px] py-[8px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/70">
                    📚 Learn the Basics
                  </span>
                </div>

                <h1
                  data-hero="title"
                  className="sub-heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]"
                >
                  Budget 101: How Kenya's Money Actually Works
                </h1>

                <p
                  data-hero="sub"
                  className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]"
                >
                  No jargon. No PDFs. Just plain language explanations of where
                  money comes from, how it's allocated, and who decides.
                </p>

                <div
                  data-hero="cta"
                  className="mt-[32px] flex items-center gap-[12px] flex-wrap"
                >
                  <Link
                    href="#sections"
                    className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition"
                  >
                    Start Learning
                  </Link>
                  <Link
                    href="/"
                    className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </section>

            {/* MAIN SECTIONS */}
            <section id="sections" className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                {/* Section 1: Where Money Comes From */}
                <div data-animate="fade-up" className="mb-[60px]">
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111] mb-[22px]">
                    1. Where Does the Money Come From?
                  </h2>
                  <div className="grid grid-cols-3 gap-[14px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
                    <div className="rounded-[26px] bg-white border border-black/5 p-[22px]">
                      <div className="text-[32px] mb-[12px]">💰</div>
                      <h3 className="sub-heading font-FoundersGrotesk text-[#111]">
                        Taxes
                      </h3>
                      <p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
                        Income tax, VAT, customs duties, and other taxes paid by
                        Kenyans fund 80% of the government budget.
                      </p>
                    </div>
                    <div className="rounded-[26px] bg-white border border-black/5 p-[22px]">
                      <div className="text-[32px] mb-[12px]">🏦</div>
                      <h3 className="sub-heading font-FoundersGrotesk text-[#111]">
                        Loans
                      </h3>
                      <p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
                        Kenya borrows money from international banks, the IMF,
                        and other countries for development projects.
                      </p>
                    </div>
                    <div className="rounded-[26px] bg-white border border-black/5 p-[22px]">
                      <div className="text-[32px] mb-[12px]">🤝</div>
                      <h3 className="sub-heading font-FoundersGrotesk text-[#111]">
                        Grants
                      </h3>
                      <p className="mt-[12px] paragraph font-NeueMontreal text-[#212121]/70">
                        Donor countries and organizations (World Bank, USAID)
                        give money without expecting repayment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2: The Budget Cycle */}
                <div data-animate="fade-up" className="mb-[60px]">
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111] mb-[22px]">
                    2. How Does the Budget Process Work?
                  </h2>
                  <div className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px]">
                    <div className="space-y-[20px]">
                      <div className="flex gap-[20px] items-start">
                        <div className="flex-shrink-0 w-[50px] h-[50px] rounded-full bg-[#212121] text-white flex items-center justify-center paragraph font-FoundersGrotesk">
                          1
                        </div>
                        <div>
                          <h4 className="sub-heading font-FoundersGrotesk text-[#111]">
                            Formulation (May–August)
                          </h4>
                          <p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70">
                            Each government department submits what they want to
                            spend on. These proposals are combined into one big
                            budget.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-[20px] items-start">
                        <div className="flex-shrink-0 w-[50px] h-[50px] rounded-full bg-[#212121] text-white flex items-center justify-center paragraph font-FoundersGrotesk">
                          2
                        </div>
                        <div>
                          <h4 className="sub-heading font-FoundersGrotesk text-[#111]">
                            Presentation (August)
                          </h4>
                          <p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70">
                            The Finance Minister presents the budget in
                            Parliament. This is when the public—and media—first
                            see what the government plans to do with your money.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-[20px] items-start">
                        <div className="flex-shrink-0 w-[50px] h-[50px] rounded-full bg-[#212121] text-white flex items-center justify-center paragraph font-FoundersGrotesk">
                          3
                        </div>
                        <div>
                          <h4 className="sub-heading font-FoundersGrotesk text-[#111]">
                            Debate & Approval (August–September)
                          </h4>
                          <p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70">
                            Parliament debates it, makes changes, and votes to
                            approve it. In theory, citizens can submit views. In
                            practice, not many do.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-[20px] items-start">
                        <div className="flex-shrink-0 w-[50px] h-[50px] rounded-full bg-[#212121] text-white flex items-center justify-center paragraph font-FoundersGrotesk">
                          4
                        </div>
                        <div>
                          <h4 className="sub-heading font-FoundersGrotesk text-[#111]">
                            Implementation (July–June)
                          </h4>
                          <p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70">
                            The budget is spent over the next 12 months. Money
                            goes to ministries, counties, and projects. This is
                            where things often go sideways.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: National vs County */}
                <div data-animate="fade-up" className="mb-[60px]">
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111] mb-[22px]">
                    3. National Budget vs County Budget: What's the Difference?
                  </h2>
                  <div className="grid grid-cols-2 gap-[20px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1">
                    <div className="rounded-[26px] bg-white border border-black/5 p-[22px]">
                      <h3 className="sub-heading font-FoundersGrotesk text-[#111]">
                        National Budget
                      </h3>
                      <p className="mt-[12px] small-text font-NeueMontreal text-[#212121]/70 uppercase tracking-wide">
                        Ksh 3.6 Trillion (2024/25)
                      </p>
                      <ul className="mt-[16px] space-y-[10px]">
                        <li className="paragraph font-NeueMontreal text-[#212121]/70">
                          ✓ Defense, security, police
                        </li>
                        <li className="paragraph font-NeueMontreal text-[#212121]/70">
                          ✓ National roads and airports
                        </li>
                        <li className="paragraph font-NeueMontreal text-[#212121]/70">
                          ✓ Universities and higher education
                        </li>
                        <li className="paragraph font-NeueMontreal text-[#212121]/70">
                          ✓ National health programs
                        </li>
                        <li className="paragraph font-NeueMontreal text-[#212121]/70">
                          ✓ Parliament and presidential office
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-[26px] bg-white border border-black/5 p-[22px]">
                      <h3 className="sub-heading font-FoundersGrotesk text-[#111]">
                        County Budget
                      </h3>
                      <p className="mt-[12px] small-text font-NeueMontreal text-[#212121]/70 uppercase tracking-wide">
                        ~Ksh 450B per county (varies)
                      </p>
                      <ul className="mt-[16px] space-y-[10px]">
                        <li className="paragraph font-NeueMontreal text-[#212121]/70">
                          ✓ Local roads and bridges
                        </li>
                        <li className="paragraph font-NeueMontreal text-[#212121]/70">
                          ✓ Health centers and dispensaries
                        </li>
                        <li className="paragraph font-NeueMontreal text-[#212121]/70">
                          ✓ Primary and secondary schools
                        </li>
                        <li className="paragraph font-NeueMontreal text-[#212121]/70">
                          ✓ Water and sanitation
                        </li>
                        <li className="paragraph font-NeueMontreal text-[#212121]/70">
                          ✓ Local development projects
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 4: Who Decides? */}
                <div data-animate="fade-up" className="mb-[60px]">
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111] mb-[22px]">
                    4. Who Actually Decides What Gets Funded?
                  </h2>
                  <div className="rounded-[28px] bg-[#111] text-white border border-white/10 p-[26px]">
                    <div className="space-y-[20px]">
                      <div className="flex gap-[16px] items-start">
                        <div className="text-[28px]">👨‍💼</div>
                        <div>
                          <h4 className="sub-heading font-FoundersGrotesk text-white">
                            The President & Cabinet
                          </h4>
                          <p className="mt-[8px] paragraph font-NeueMontreal text-white/70">
                            Sets priorities and proposes the budget. Can veto
                            Parliament's decisions.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-[16px] items-start">
                        <div className="text-[28px]">📜</div>
                        <div>
                          <h4 className="sub-heading font-FoundersGrotesk text-white">
                            Parliament
                          </h4>
                          <p className="mt-[8px] paragraph font-NeueMontreal text-white/70">
                            Reviews, debates, and approves the budget. Can
                            modify amounts and priorities.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-[16px] items-start">
                        <div className="text-[28px]">🗣️</div>
                        <div>
                          <h4 className="sub-heading font-FoundersGrotesk text-white">
                            The Public (In Theory)
                          </h4>
                          <p className="mt-[8px] paragraph font-NeueMontreal text-white/70">
                            Can submit views during the public participation
                            window. Most people don't know about this.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div
                  data-animate="fade-up"
                  className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px] flex items-end justify-between gap-[16px] flex-wrap"
                >
                  <div>
                    <h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                      Now Dig Deeper
                    </h3>
                    <p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[62ch]">
                      Understand how this theory works (or doesn't) in real life
                      through stories and documentaries.
                    </p>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <Link
                      href="/blog"
                      className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition"
                    >
                      See Stories
                    </Link>
                    <Link
                      href="/"
                      className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition"
                    >
                      Back Home
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <LandingFooter />
        </div>
      </div>
    </>
  );
}
