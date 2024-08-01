import { Html, Head, Main, NextScript } from 'next/document';
import { randomBytes } from 'crypto';
// import { headers } from 'next/headers';
import Script from 'next/script';
import PwaButton from '@/components/PwaButton';

export default function Document() {
	// const nonce = headers().get('x-nonce');
	const nonce = randomBytes(128).toString('base64');

	return (
		<Html lang="fr">
			<Head nonce={nonce}>
				<meta charset="UTF-8" />
				<meta name="MobileOptimized" content="width" />
				<meta
					httpEquiv="Content-Security-Policy"
					content={`object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: 'nonce-${nonce}' 'strict-dynamic'`}
				/>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="manifest"
					href="/manifest.json"
					crossOrigin="use-crendentials"
				/>
				<link rel="apple-touch-icon" href="/logo192.png" />
				<Script
					src="/scripts/matomo.js"
					strategy="afterInteractive"
					nonce={nonce}
				/>
			</Head>
			<body>
				<Main />
				<PwaButton />
				<NextScript nonce={nonce} />
				<Script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4492453388939100"
					crossorigin="anonymous"
					strategy="afterInteractive"
					nonce={nonce}
				/>
				<Script src="/scripts/sw.js" nonce={nonce} />
				{/* Separated in 2 scripts because it should be defer */}
				<Script src="/scripts/pwa-button.js" defer nonce={nonce} />
			</body>
		</Html>
	);
}
