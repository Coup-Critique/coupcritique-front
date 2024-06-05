import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieModal from '@/components/CookieModal';
import MessageManager from '@/components/MessageManager';
import useManageToken from '@/hooks/useManageToken';
import { makeClassName } from '@/functions';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
	const darkMode = useSelector(state => state.darkMode);
	useManageToken();

	return (
		<div className={makeClassName('app', darkMode && 'dark-mode')}>
			<Head>
				{/* Here due to next */}
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />
				<meta name="theme-color" content={darkMode ? '#000000' : '#ffffff'} />
				<meta property="og:locale" content="fr_FR" />
				<meta property="og:type" content="article" />
				<meta property="og:site_name" content="Coup Critique" />
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
