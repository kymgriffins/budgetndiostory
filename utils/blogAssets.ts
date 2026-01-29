import type { StaticImageData } from "next/image";
import { insights1, insights2, insights3 } from "@/public";

export const blogImageById: Record<number, StaticImageData> = {
	1: insights1,
	2: insights2,
	3: insights3,
};

export function getBlogImageById(id: number): StaticImageData {
	return blogImageById[id] ?? insights1;
}


