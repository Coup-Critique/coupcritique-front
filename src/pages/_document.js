import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import PwaButton from '@/components/PwaButton';

export default function Document() {
	return (
		<Html lang="fr">
			<Head>
				<meta charSet="UTF-8" />
				<meta name="MobileOptimized" content="width" />
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="manifest"
					href="/manifest.json"
					crossOrigin="use-crendentials"
				/>
				<link rel="apple-touch-icon" href="/logo192.png" />
				<Script src="/scripts/matomo.js" />
			</Head>
			<body>
				<Main />
				<PwaButton />
				<NextScript />
				<Script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4492453388939100"
					crossorigin="anonymous"
				/>
				<Script src="/scripts/init-sw.js" />
				{/* Separated in 2 scripts because it should be defer */}
				<Script src="/scripts/pwa-button.js" defer />
			</body>
		</Html>
	);
}
