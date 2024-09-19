// modules

import Link from 'next/link';
import { Icon } from 'semantic-ui-react';
import PageWrapper from '@/components/PageWrapper';
import LinkButton from '@/components/buttons/LinkButton';
// components

export const redirect404 = {
	redirect: {
		destination: '/404',
		permanent: true,
	},
};

const Page404 = () => (
	<PageWrapper
		title={'Erreur\u00A0: Page 404'}
		metadescription="Cette page n'exite pas ou plus."
		nofollow
		goingBack
	>
		<p>La page que vous recherchez n'existe pas.</p>
		<LinkButton color="primary" href="/" label="Accueil" icon="home" />
	</PageWrapper>
);
export default Page404;
