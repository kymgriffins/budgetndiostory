import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components";
import { blogPosts } from "@/utils/blogPosts";
import { getBlogImageById } from "@/utils/blogAssets";

export default function Publication() {
	return (
		<section className="w-full bg-marquee padding-y rounded-t-[20px]">
			<div className="w-full bg-marquee z-10 relative rounded-t-[20px]">
				<Marquee
					title="instagram"
					className="pb-[50px] lgOnly:pb-[40px] mdOnly:pb-[30px] smOnly:pb-[20px] xm:pb-[15px] text-[540px] leading-[330px] lgOnly:text-[380px] lgOnly:leading-[240px] mdOnly:text-[300px] mdOnly:leading-[160px] smOnly:text-[230px] smOnly:leading-[140px] xm:text-[130px] xm:leading-[80px]"
				/>
			</div>
			<div className="w-full padding-x py-[30px]">
				<div className="w-full flex justify-between gap-[20px] flex-wrap smOnly:flex-col xm:flex-col">
					<div>
						<h3 className="paragraph font-medium text-white font-NeueMontreal">
							Latest stories
						</h3>
						<p className="paragraph text-white/70 font-NeueMontreal mt-[8px] max-w-[420px]">
							Read the full education series on{" "}
							<Link href="/edustories" className="underline underline-offset-4">
								/edustories
							</Link>
							.
						</p>
					</div>
					<div className="w-[70%] flex gap-y-[20px] smOnly:flex-col xm:flex-col smOnly:w-full xm:w-full gap-[10px]">
						{blogPosts.map((post) => (
							<div
								className="w-full flex justify-between gap-[20px] smOnly:flex-col xm:flex-col"
								key={post.id}>
								<Link href={`/edustories/${post.id}`} className="w-full">
									<div className="w-full flex gap-[20px] rounded-[20px] flex-col">
										<div className="group overflow-hidden rounded-[20px]">
											<Image
												src={getBlogImageById(post.id)}
												alt={post.title}
												className="w-full h-full group-hover:scale-[1.09] transform duration-[1s] ease-[.4,0,.2,1]	"
											/>
										</div>
										<div className="flex gap-[10px] items-center">
											<span className="w-[10px] h-[10px] rounded-full bg-white" />
											<h4 className="paragraph uppercase font-medium font-NeueMontreal text-white">
												{post.title}
											</h4>
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
