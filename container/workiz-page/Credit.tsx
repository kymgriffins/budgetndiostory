export default function Credit() {
	return (
		<section className="w-full pb-[100px] lgOnly:pb-[80px] mdOnly:pb-[60px] smOnly:pb-[40px] xm:pb-[40px]">
			<div className="w-full flex flex-col">
				<h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px]">
					Credit
				</h1>
				<div className="w-full border-t border-[#21212155] pt-[20px]">
					<div className="w-full flex smOnly:flex-col xm:flex-col justify-between gap-y-[15px] padding-x">
						<div className="w-1/2 smOnly:w-full xm:w-full">
							<h3 className="paragraph font-medium text-secondry font-NeueMontreal">
								Services we provided:
							</h3>
						</div>
						<div className="w-1/2 smOnly:w-full xm:w-full flex smOnly:flex-col xm:flex-col justify-between gap-y-[20px]">
							<div className="flex flex-col gap-[10px]">
								<div className="flex flex-col">
									<p className="paragraph font-NeueMontreal text-secondry underline">
										Client:
									</p>
									<p className="paragraph font-NeueMontreal text-secondry">
										Tomer Levy
									</p>
								</div>
								<div className="flex flex-col">
									<p className="paragraph font-NeueMontreal text-secondry underline">
										Project Manager:
									</p>
									<p className="paragraph font-NeueMontreal text-secondry">
										Ihor Hulyahrodskyy
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-[10px]">
								<div className="flex flex-col">
									<p className="paragraph font-NeueMontreal text-secondry underline">
										Team:
									</p>
									<p className="paragraph font-NeueMontreal text-secondry">
										Ihor Hulyahrodskyy, Kseniia Palamarchuk,
										<br /> Olha Sereda
									</p>
								</div>
								<div className="flex flex-col">
									<p className="paragraph font-NeueMontreal text-secondry underline">
										Motion & Animation:
									</p>
									<p className="paragraph font-NeueMontreal text-secondry">
										Vadym Herasymenko
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
