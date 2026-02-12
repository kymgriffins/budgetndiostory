import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer role="contentinfo" aria-label="Site footer" className="padding-x pb-[70px] smOnly:pb-[55px] xm:pb-[55px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="rounded-[28px] bg-[#111] text-[#f1f1f1] border border-black/10 p-[22px] smOnly:p-[18px] xm:p-[18px]">
          {/* Tagline */}
          <p className="small-text font-NeueMontreal text-[#f1f1f1]/60 mb-[20px]">
            Your tax money. Your right to know.
          </p>

          <div className="flex items-start justify-between gap-[18px] flex-wrap">
            <div className="min-w-[240px]">
              <p className="text-[14px] tracking-[0.14em] uppercase font-NeueMontreal text-[#f1f1f1]/70">
                Budget Ndio Story
              </p>
              <p className="mt-[10px] small-text font-NeueMontreal text-[#f1f1f1]/70 max-w-[44ch]">
                Stories, not spreadsheets. Evidence, not promises. Kenyans na
                Budget.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-[18px] smOnly:grid-cols-2 xm:grid-cols-2">
              <div>
                <p className="small-text font-NeueMontreal text-[#f1f1f1]/60 uppercase tracking-wide">
                  Stories
                </p>
                <div className="mt-[10px] flex flex-col gap-[8px]">
                  <Link
                    className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white transition-colors"
                    href="/stories"
                  >
                    Stories
                  </Link>
                  <Link
                    className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white transition-colors"
                    href="/tracker"
                  >
                    Budget Tracker
                  </Link>
                  <Link
                    className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white transition-colors"
                    href="/podcasts"
                  >
                    Podcasts
                  </Link>
                </div>
              </div>
              <div>
                <p className="small-text font-NeueMontreal text-[#f1f1f1]/60 uppercase tracking-wide">
                  Explore
                </p>
                <div className="mt-[10px] flex flex-col gap-[8px]">
                  <Link
                    className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white transition-colors"
                    href="/shorts"
                  >
                    Shorts
                  </Link>
                  <Link
                    className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white transition-colors"
                    href="/budget-simplified"
                  >
                    Budget Simplified
                  </Link>
                  <Link
                    className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white transition-colors"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </div>
              </div>
              <div>
                <p className="small-text font-NeueMontreal text-[#f1f1f1]/60 uppercase tracking-wide">
                  Get Started
                </p>
                <div className="mt-[10px] flex flex-col gap-[8px]">
                  <Link
                    className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white transition-colors"
                    href="/home"
                  >
                    Home
                  </Link>
                  <Link
                    className="small-text font-NeueMontreal text-[#f1f1f1]/80 hover:text-white transition-colors"
                    href="/edu"
                  >
                    Education
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[18px] pt-[14px] border-t border-white/10 flex items-center justify-between gap-[12px] flex-wrap">
            <div className="flex flex-col gap-[4px]">
              <p className="small-text font-NeueMontreal text-[#f1f1f1]/55">
                © {new Date().getFullYear()} Budget Ndio Story. Built with love in Kenya.
              </p>
              <p className="text-xs font-NeueMontreal text-[#f1f1f1]/40">
                Budget data sourced from National Treasury, KNBS
              </p>
            </div>
            <div className="flex gap-[20px]">
              <Link
                href="/privacy"
                className="small-text font-NeueMontreal text-[#f1f1f1]/55 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="small-text font-NeueMontreal text-[#f1f1f1]/55 hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
