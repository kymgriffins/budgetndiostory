import { TextMask } from "@/animation";
import { BackgroundImg } from "@/components";
import { achiveItems } from "@/constants";
import { background } from "@/public";

export default function Archive() {
  return (
    <section className="w-full">
      <div className="padding-x w-full">
        <BackgroundImg src={background} />
      </div>
      <div className="w-full padding-y">
        <div className="w-full padding-x pt-[20px] border-t border-[#21212155] flex smOnly:flex-col xm:flex-col justify-between gap-y-[20px]">
          <div className="w-[50%] smOnly:w-full xm:w-full flex-shrink-0">
            <h3 className="paragraph font-medium font-NeueMontreal">
              Ochi in numbers:
            </h3>
          </div>
          <div className="w-[50%] smOnly:w-full xm:w-full flex flex-col gap-y-[20px]">
            {achiveItems.map((item) => (
              <div
                className="w-full flex justify-between gap-[20px] smOnly:flex-col xm:flex-col"
                key={item.id}
              >
                <div className="bg-[#E1E1E1] w-full flex flex-col gap-y-[80px] smOnly:gap-y-[60px] xm:gap-y-[50px] rounded-[20px] px-[30px] py-[20px] smOnly:px-[20px] smOnly:py-[15px] xm:px-[20px] xm:py-[15px]">
                  <div className="flex gap-x-[10px] items-center pb-[10px]">
                    <h1 className="sub-heading font-normal font-NeueMontreal">
                      <TextMask>{item.title1}</TextMask>
                    </h1>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <button className="paragraph font-normal font-NeueMontreal">
                      {item.subTitle1}
                    </button>
                  </div>
                </div>
                <div className="bg-[#E1E1E1] w-full flex flex-col gap-y-[80px] smOnly:gap-y-[60px] xm:gap-y-[50px] rounded-[20px] px-[30px] py-[20px] smOnly:px-[20px] smOnly:py-[15px] xm:px-[20px] xm:py-[15px]">
                  <div className="flex gap-x-[10px] items-center pb-[10px]">
                    <h1 className="sub-heading font-normal font-NeueMontreal">
                      <TextMask>{item.title2}</TextMask>
                    </h1>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <button className="paragraph font-normal font-NeueMontreal">
                      {item.subTitle2}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
