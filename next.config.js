/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/:any*',
	// 			destination: '/',
	// 		},
	// 	];
	// },
	webpack: config => {
		config.resolve.fallback = { fs: false };
		return config;
	},
};

module.exports = nextConfig;
