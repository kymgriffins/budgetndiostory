import { LinkHover, TextMask } from "@/animation";
import { footerItems, footernavbarItems } from "@/constants";
import { logo } from "@/public";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const phrase = ["Budget Ndio", "Story"];
  const phrase1 = ["Ganji Ndio Inabonga"];
  return (
    <footer className="w-full min-h-screen padding-x z-30 relative pt-[40px] bg-background flex flex-col justify-between rounded-t-[20px] mt-[-20px]">
      <div className="w-full flex justify-between smOnly:flex-col xm:flex-col">
        <div className="flex flex-col justify-between smOnly:w-full xm:w-full w-1/2">
          <h2 className="text-[150px] leading-[115px] lgOnly:text-[130px] lgOnly:leading-[98px] mdOnly:text-[100px] mdOnly:leading-[75px] smOnly:text-[74px] smOnly:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase">
            <TextMask>{phrase}</TextMask>
          </h2>
        </div>
        <div className="h-full flex flex-col justify-between smOnly:w-full xm:w-full w-1/2">
          <div>
            <h2 className="text-[150px] leading-[115px] lgOnly:text-[130px] lgOnly:leading-[98px] mdOnly:text-[100px] mdOnly:leading-[75px] smOnly:text-[74px] smOnly:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase">
              <TextMask>{phrase1}</TextMask>
            </h2>
            <div className="pt-[50px]">
              <p className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
                S:
              </p>
              {footerItems.map((item) => (
                <LinkHover
                  title={item.title}
                  href={item.href}
                  key={item.id}
                  className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium text-secondry capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                />
              ))}
            </div>
            <div className="flex justify-between">
              <div className="pt-[50px]">
                <p className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
                  L:
                </p>
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
                <p className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
                  M:
                </p>
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
              <p className="paragraph font-medium font-NeueMontreal text-secondry whitespace-nowrap">
                Email:
              </p>
              <LinkHover
                title="info@budgetndiyo.org"
                href="mailto:info@budgetndiyo.org"
                className="before:h-[1px] after:h-[1px] paragraph font-medium before:bottom-[-3px] after:bottom-[-3px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-[40px] pb-[30px] flex justify-between smOnly:flex-col xm:flex-col smOnly:gap-[20px] xm:gap-[20px]">
        <div className="w-1/2 smOnly:w-full xm:w-full">
          <Link href={"/"}>
            <Image src={logo} alt="ochi logo" width={70} height={70} />
          </Link>
        </div>
        <div className="w-1/2 h-full flex gap-[10px] justify-between items-end smOnly:w-full xm:w-full smOnly:flex-col xm:flex-col smOnly:items-start xm:items-start">
          <div className="flex smOnly:flex-col xm:flex-col gap-[10px]">
            <p className="paragraph font-medium font-NeueMontreal text-secondry opacity-40">
              © Budget Ndio Story 2026.
            </p>
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
