import Script from 'next/script';
// style
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'semantic-ui-css/semantic.min.css';
import 'animate.css';
import '@/styles/app.scss';
// components
import PwaButton from '@/components/PwaButton';
import AppProvider from '@/providers/AppProvider';
import useDarkMode from '@/hooks/useDarkMode';
import MessageManager from '@/components/MessageManager';
import UserManager from '@/components/UserManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieModal from '@/components/CookieModal';
import { makeClassName } from '@/functions';

const title = 'Coup Critique | Votre référence en stratégie Pokémon';
const description =
	"Le site de référence en stratégie Pokémon française. Vous pourrez y trouver et partager des équipes efficaces en combat classé sur des tiers Smogon comme l'OverUsed ou sur console avec le VGC et le BSS.";
const image = 'keldeo-landorus.png';

export default function RootLayout({ children }) {
	const [darkMode] = useDarkMode();

	return (
		<html lang="fr">
			<head>
				<meta charSet="UTF-8" />
				<meta name="MobileOptimized" content="width" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />
				<meta name="theme-color" content={darkMode ? '#000000' : '#ffffff'} />
				<meta property="og:locale" content="fr_FR" />
				<meta property="og:type" content="article" />
				<meta property="og:site_name" content="Coup Critique" />
				<link rel="icon" href="/favicon.ico" />
				<title>{title}</title>
				<meta name="title" content={title} />
				<meta name="og:title" content={title} />
				<meta name="description" content={description} />
				<meta name="og:description" content={description} />
				<meta
					property="og:image"
					content={'https://www.coupcritique.fr/images/' + image}
				/>
				<meta name="robots" content="index, follow" />
				<link
					rel="manifest"
					href="/manifest.json"
					crossOrigin="use-crendentials"
				/>
				<link rel="apple-touch-icon" href="/logo192.png" />
				<Script src="/scripts/matomo.js" />
			</head>
			<AppProvider>
				<body className={makeClassName('app', { darkMode })}>
					<Header />
					<main>
						<UserManager />
						<MessageManager />
						{children}
					</main>
					<Footer />
					<CookieModal />
					<PwaButton />
					<Script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4492453388939100"
						crossorigin="anonymous"
					/>
					<Script src="/scripts/init-sw.js" />
					{/* Separated in 2 scripts because it should be defer */}
					<Script src="/scripts/pwa-button.js" defer />
				</body>
			</AppProvider>
		</html>
	);
}
