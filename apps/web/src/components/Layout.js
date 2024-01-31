
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieModal from '@/components/CookieModal';
import MessageManager from '@/components/MessageManager';
import useDarkMode, { DARK_MODE_KEY } from '@/hooks/useDarkMode';
import useManageToken from '@/hooks/useManageToken';
import { makeClassName } from '@/functions';

const title = 'Coup Critique | Votre référence en stratégie Pokémon';
const description =
	"Le site de référence en stratégie Pokémon française. Vous pourrez y trouver et partager des équipes efficaces en combat classé sur des tiers Smogon comme l'OverUsed ou sur console avec le VGC et le BSS.";

const Layout = ({ children }) => {
	const [darkMode] = useDarkMode();
	useManageToken();

	return (
		<div className={makeClassName('app', darkMode && DARK_MODE_KEY)}>
			<Head>
				{/* Here due to next */}
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" data-react-helmet="true" />
				<meta name="theme-color" content={darkMode ? '#000000' : '#ffffff'} />
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
			</Head>
			<MessageManager />
			<Header />
			<main>{children}</main>
			<Footer />
			<CookieModal />
		</div>
	);
};
export default Layout;
