import { LinkHover, TextMask } from "@/animation";
import { footerItems, footernavbarItems } from "@/constants";
import { logo } from "@/public";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const phrase = ["Budget Ndio", "Story"];
  const phrase1 = ["Ganji Ndio Inabonga"];
  return (
    <footer className="w-full min-h-screen padding-x z-30 relative pt-[40px] bg-background flex flex-col justify-between rounded-t-[20px] mt-[-20px] overflow-x-hidden">
      <div className="w-full flex justify-between sm:flex-col xm:flex-col gap-[20px] sm:gap-[10px] xm:gap-[10px]">
        <div className="flex flex-col justify-between sm:w-full xm:w-full w-1/2 overflow-hidden">
          <h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase break-words">
            <TextMask>{phrase}</TextMask>
          </h1>
        </div>
        <div className="h-full flex flex-col justify-between sm:w-full xm:w-full w-1/2 overflow-hidden">
          <div className="overflow-hidden">
            <h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase break-words">
              <TextMask>{phrase1}</TextMask>
            </h1>
            <div className="pt-[50px]">
              <h1 className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
                S:
              </h1>
              {footerItems.map((item) => (
                <LinkHover
                  title={item.title}
                  href={item.href}
                  key={item.id}
                  className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium text-secondry capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                />
              ))}
            </div>
            <div className="flex justify-between sm:flex-col xm:flex-col gap-[10px]">
              <div className="pt-[50px]">
                <h1 className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
                  L:
                </h1>
                <div className="flex flex-col gap-y-[10px]">
                  <LinkHover
                    className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium  capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                    title={`Kenya`}
                    href="/"
                  />
                  <LinkHover
                    className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium  capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                    title={`Kisumu`}
                    href="/"
                  />
                  <LinkHover
                    className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium  capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                    title="Mombasa"
                    href="/"
                  />
                  <LinkHover
                    className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium  capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                    title="Nairobi"
                    href="/"
                  />
                </div>
              </div>
              <div className="pt-[50px]">
                <h1 className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
                  M:
                </h1>
                {footernavbarItems.map((item) => (
                  <LinkHover
                    key={item.id}
                    title={item.title}
                    href={item.href}
                    className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium text-secondry capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                  />
                ))}
              </div>
            </div>
            <div className="pt-[50px] flex items-center gap-x-[10px]">
              <h1 className="paragraph font-medium font-NeueMontreal text-secondry whitespace-nowrap">
                Email:
              </h1>
              <LinkHover
                title="info@budgetndiyo.org"
                href="mailto:info@budgetndiyo.org"
                className="before:h-[1px] after:h-[1px] paragraph font-medium before:bottom-[-3px] after:bottom-[-3px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-[40px] pb-[30px] flex justify-between sm:flex-col xm:flex-col sm:gap-[20px] xm:gap-[20px] overflow-hidden">
        <div className="w-1/2 sm:w-full xm:w-full">
          <Link href={"/"}>
            <Image src={logo} alt="ochi logo" width={70} height={70} />
          </Link>
        </div>
        <div className="w-1/2 h-full flex gap-[10px] justify-between items-end sm:w-full xm:w-full sm:flex-col xm:flex-col sm:items-start xm:items-start overflow-hidden">
          <div className="flex sm:flex-col xm:flex-col gap-[10px] break-words">
            <h1 className="paragraph font-medium font-NeueMontreal text-secondry opacity-40 break-words">
              © Budget Ndio Story 2026.
            </h1>
            {/* <LinkHover
							title="Legal Terms"
							href="/"
							className="before:h-[1px] after:h-[1px] paragraph font-medium text-secondry opacity-40 before:bottom-[-3px] after:bottom-[-3px]"
						/> */}
          </div>
          <div>
            <LinkHover
              title="Terms & conditions"
              href="/"
              className="before:h-[1px] after:h-[1px] paragraph font-medium text-secondry opacity-40 before:bottom-[-3px] after:bottom-[-3px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
