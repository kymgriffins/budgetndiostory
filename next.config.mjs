/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		localPatterns: [
			{
				pathname: '/_next/static/media/.*',
				search: '',
			},
		],
	},
};

export default nextConfig;
