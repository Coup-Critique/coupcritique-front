import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import PwaButton from '@/components/PwaButton';

const title = 'Coup Critique | Votre référence en stratégie Pokémon';
const description =
	"Le site de référence en stratégie Pokémon française. Vous pourrez y trouver et partager des équipes efficaces en combat classé sur des tiers Smogon comme l'OverUsed ou sur console avec le VGC et le BSS.";

export default function Document() {
	return (
		<Html lang="fr">
			<Head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="MobileOptimized" content="width" />
				<meta name="theme-color" content="#000000" />
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="manifest"
					href="/manifest.json"
					crossorigin="use-crendentials"
				/>
				<link rel="apple-touch-icon" href="/logo192.png" />
				<meta property="og:locale" content="fr_FR" />
				<meta property="og:type" content="article" />
				<meta property="og:site_name" content="Coup Critique" />
				<title data-react-helmet="true">{title}</title>
				<meta name="title" content={title} data-react-helmet="true" />
				<meta name="og:title" content={title} data-react-helmet="true" />
				<meta name="description" content={description} data-react-helmet="true" />
				<meta
					name="og:description"
					content={description}
					data-react-helmet="true"
				/>
				<meta
					property="og:image"
					content="https://www.coupcritique.fr/images/keldeo-landorus.png"
					data-react-helmet="true"
				/>
				<meta name="robots" content="index, follow" data-react-helmet="true" />
				<Script src="/scripts/matomo.js" />
			</Head>
			<body>
				<Main />
				<PwaButton/>
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
