/** @type {import('next').NextConfig} */
const nextConfig = {
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
