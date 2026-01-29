import { Marquee } from "@/components";
import { ArrowRight, Coins, FileText, PieChart, ShieldCheck } from "lucide-react";

const steps = [
	{
		id: 1,
		title: "Where money comes from",
		body: "Taxes, fees, grants, and borrowing. Revenue choices affect prices, jobs, and services.",
		icon: Coins,
	},
	{
		id: 2,
		title: "How priorities are set",
		body: "Government proposes allocations across sectors (health, education, roads). Trade-offs are real.",
		icon: PieChart,
	},
	{
		id: 3,
		title: "Approval & public participation",
		body: "Draft budgets should be debated and improved. Citizens can question and suggest changes.",
		icon: FileText,
	},
	{
		id: 4,
		title: "Spending & delivery",
		body: "Funds become projects: bursaries, clinics, roads. Delays and leakages can happen here.",
		icon: ArrowRight,
	},
	{
		id: 5,
		title: "Oversight & accountability",
		body: "Audits, parliament/assemblies, and watchdogs track results. Data + stories make pressure real.",
		icon: ShieldCheck,
	},
];

export default function BudgetWorks() {
	return (
		<section className="w-full bg-secondry rounded-t-[20px]" data-scroll-section>
			<div className="w-full bg-secondry z-10 relative rounded-t-[20px] pt-[100px] lgOnly:pt-[80px] mdOnly:pt-[60px] smOnly:pt-[40px] xm:pt-[40px]">
				<div data-animate="fade-up">
					<Marquee
						title="how it works"
						className="pb-[40px] lgOnly:pb-[30px] mdOnly:pb-[25px] smOnly:pb-[20px] xm:pb-[15px] text-[420px] leading-[260px] lgOnly:text-[320px] lgOnly:leading-[200px] mdOnly:text-[240px] mdOnly:leading-[150px] smOnly:text-[180px] smOnly:leading-[120px] xm:text-[110px] xm:leading-[70px] text-background"
					/>
				</div>
			</div>

			<div className="w-full padding-x pb-[80px] lgOnly:pb-[60px] mdOnly:pb-[50px] smOnly:pb-[40px] xm:pb-[40px]">
				<div
					className="w-full flex justify-between gap-y-[20px] flex-wrap"
					data-animate="cards">
					{steps.map((s) => {
						const Icon = s.icon;
						return (
							<div
								key={s.id}
								className="w-[32.5%] lgOnly:w-[49%] mdOnly:w-[49%] smOnly:w-full xm:w-full"
								data-animate="card">
								<div className="w-full h-full rounded-[18px] border border-[#f1f1f133] p-[22px] lgOnly:p-[18px] smOnly:p-[18px] xm:p-[18px]">
									<div className="flex items-center justify-between gap-[10px]">
										<div className="flex items-center gap-[10px]">
											<span className="w-[10px] h-[10px] rounded-full bg-background" />
											<p className="small-text uppercase font-NeueMontreal text-background opacity-80">
												Step {s.id}
											</p>
										</div>
										<Icon
											size={22}
											strokeWidth={1.6}
											className="text-background opacity-90"
										/>
									</div>
									<h3 className="sub-paragraph font-NeueMontreal text-background mt-[16px]">
										{s.title}
									</h3>
									<p className="paragraph font-NeueMontreal text-background opacity-70 mt-[10px]">
										{s.body}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}


