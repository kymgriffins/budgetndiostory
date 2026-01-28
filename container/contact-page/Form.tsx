
import Link from "next/link";
import { RoundButton } from "@/components";

export default function Form() {
	return (
		<section className="w-full padding-x padding-y">
			<div className="w-full flex flex-col gap-[15px]">
				<div className="w-full flex gap-[15px] sm:flex-col xm:flex-col">
					<div className="flex gap-[10px] w-[50%] sm:w-full xm:w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								Hello, my name is
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Your full name*"
								className="paragraph w-full font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transition duration-200 ease-in-out"
							/>
						</div>
					</div>

					<div className="flex gap-[10px] w-[50%] sm:w-full xm:w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								and I’m part of
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Youth group, NGO, institution, or collective*"
								className="paragraph w-full font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transition duration-200 ease-in-out"
							/>
						</div>
					</div>
				</div>

				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								We’re exploring a partnership around
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Youth engagement, budget transparency, data storytelling, policy work*"
								className="paragraph font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transition duration-200 ease-in-out w-full"
							/>
						</div>
					</div>
				</div>

				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								with a target timeline of
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Proposed timeline or milestone*"
								className="paragraph font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transition duration-200 ease-in-out w-full"
							/>
						</div>
					</div>
				</div>

				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								and an estimated budget of
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Indicative budget range (KES or USD)*"
								className="paragraph font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transition duration-200 ease-in-out w-full"
							/>
						</div>
					</div>
				</div>

				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								You can contact me via
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Email address*"
								className="paragraph font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transition duration-200 ease-in-out w-full"
							/>
						</div>
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								to start the discussion.
							</h2>
						</div>
					</div>
				</div>

				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								Anything else we should know?
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Youth audience, data sources, policy focus, or geographic scope (optional)"
								className="paragraph font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transition duration-200 ease-in-out w-full"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full flex items-center justify-end sm:justify-start xm:justify-start pt-[50px]">
				<div className="flex sm:flex-col xm:flex-col gap-[25px]">
					<div className="flex gap-[10px] items-center">
						<input type="checkbox" className="w-[30px]" />
						<p className="paragraph text-secondry font-NeueMontreal font-normal">
							I have read and agree to the
						</p>
						<Link
							className="paragraph font-medium font-NeueMontreal text-secondry capitalize hover"
							href="/privacy"
						>
							Privacy Policy
						</Link>
					</div>

					<div className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full">
						<RoundButton
							bgcolor="#212121"
							href="/"
							title="submit partnership request"
							className="bg-white text-black"
							style={{ color: "#fff" }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

