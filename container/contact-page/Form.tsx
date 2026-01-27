import Link from "next/link";
import { useState } from "react";
import { RoundButton } from "@/components";

const inquiryTypes = [
	{ id: "youth-education", label: "Youth Budget Education", description: "Create engaging content to help young people understand budgets" },
	{ id: "government-partnership", label: "Government Partnership", description: "Collaborate on budget visualization and public education" },
	{ id: "community-workshop", label: "Community Workshops", description: "Organize interactive sessions about public finance" },
	{ id: "digital-tools", label: "Digital Learning Tools", description: "Build interactive platforms for budget literacy" },
	{ id: "custom-project", label: "Custom Project", description: "Other budget-related initiatives" }
];

const budgetRanges = [
	{ id: "under-50k", label: "Under KES 50,000" },
	{ id: "50k-200k", label: "KES 50,000 - 200,000" },
	{ id: "200k-500k", label: "KES 200,000 - 500,000" },
	{ id: "over-500k", label: "Over KES 500,000" }
];

export default function Form() {
	const [selectedInquiryType, setSelectedInquiryType] = useState("");

	return (
		<section className="w-full padding-x padding-y">
			<div className="w-full flex flex-col gap-[15px]">
				{/* Personal Introduction */}
				<div className="w-full flex gap-[15px] sm:flex-col xm:flex-col">
					<div className="flex gap-[10px] w-[50%] sm:w-full xm:w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								Hi! My name is
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Enter your name*"
								className="paragraph w-full font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out sm:w-full xm:w-full"
							/>
						</div>
					</div>
					<div className="flex gap-[10px] w-[50%] sm:w-full xm:w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								and I represent
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Your organization or community*"
								className="paragraph w-full font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out sm:w-full xm:w-full"
							/>
						</div>
					</div>
				</div>

				{/* Guided Inquiry Type Selection */}
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								I'm reaching out because I want to
							</h2>
						</div>
						<div className="w-full mt-[20px]">
							<div className="grid grid-cols-1 gap-[10px]">
								{inquiryTypes.map((type) => (
									<label key={type.id} className="flex items-center gap-[10px] cursor-pointer group">
										<input
											type="radio"
											name="inquiryType"
											value={type.id}
											onChange={(e) => setSelectedInquiryType(e.target.value)}
											className="w-[20px] h-[20px] accent-secondry"
										/>
										<div>
											<h3 className="paragraph font-NeueMontreal font-medium text-secondry group-hover:text-secondry/80">
												{type.label}
											</h3>
											<p className="text-sm font-NeueMontreal text-secondry/70">
												{type.description}
											</p>
										</div>
									</label>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Specific Goal */}
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								Specifically, my goal is to
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Describe what you want to achieve*"
								className="paragraph font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
						</div>
					</div>
				</div>

				{/* Target Audience */}
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								This project will impact
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Who will benefit? (e.g., youth, community, students)*"
								className="paragraph font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
						</div>
					</div>
				</div>

				{/* Timeline */}
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								I'd like to complete this by
							</h2>
						</div>
						<div className="w-full">
							<input
								type="text"
								placeholder="Target completion date*"
								className="paragraph font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
						</div>
					</div>
				</div>

				{/* Budget Range */}
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								My budget range is approximately
							</h2>
						</div>
						<div className="w-full mt-[20px]">
							<div className="grid grid-cols-2 gap-[10px] sm:grid-cols-1 xm:grid-cols-1">
								{budgetRanges.map((range) => (
									<label key={range.id} className="flex items-center gap-[10px] cursor-pointer">
										<input
											type="radio"
											name="budgetRange"
											value={range.id}
											className="w-[20px] h-[20px] accent-secondry"
										/>
										<span className="paragraph font-NeueMontreal font-normal text-secondry">
											{range.label}
										</span>
									</label>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Contact Info */}
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								You can reach me at
							</h2>
						</div>
						<div className="w-full">
							<input
								type="email"
								placeholder="your.email@example.com"
								className="paragraph font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full"
							/>
						</div>
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								to start the conversation.
							</h2>
						</div>
					</div>
				</div>

				{/* Additional Details */}
				<div className="w-full flex gap-[10px]">
					<div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
						<div className="xl:min-w-max lg:min-w-max md:min-w-max">
							<h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
								Any additional context that would help us understand your vision:
							</h2>
						</div>
						<div className="w-full">
							<textarea
								rows={3}
								placeholder="Share more about your project, challenges, or specific requirements..."
								className="paragraph font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out w-full sm:w-full xm:w-full resize-none"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex items-center justify-end sm:justify-start xm:justify-start pt-[50px]">
				<div className="flex sm:flex-col xm:flex-col gap-[25px]">
					<div className="flex gap-[10px] items-center">
						<div className="flex gap-[10px]">
							<input
								type="checkbox"
								className="w-[30px]"
							/>
							<p className="paragraph text-secondry font-NeueMontreal font-normal">
								I agree with the
							</p>
						</div>
						<Link
							className="paragraph font-medium font-NeueMontreal text-secondry capitalize flex flex-col hover"
							href={"/privacy"}>
							Privacy Policy
						</Link>
					</div>
					<div className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group">
						<RoundButton
							bgcolor="#212121"
							href="/"
							title="send inquiry"
							className="bg-white text-black"
							style={{ color: "#fff" }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
