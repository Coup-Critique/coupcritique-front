import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieModal from '@/components/CookieModal';
import MessageManager from '@/components/MessageManager';
import useDarkMode, { DARK_MODE_KEY } from '@/hooks/useDarkMode';
import useManageToken from '@/hooks/useManageToken';
import { makeClassName } from '@/functions';

const Layout = ({ children }) => {
	const [darkMode] = useDarkMode();
	useManageToken();

	return (
		<div className={makeClassName('app', darkMode && DARK_MODE_KEY)}>
			<MessageManager />
			<Header />
			<main>{children}</main>
			<Footer />
			<CookieModal />
		</div>
	);
};
export default Layout;
