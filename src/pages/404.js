// modules

import Link from 'next/link';
import { Icon } from 'semantic-ui-react';
import PageWrapper from '@/components/PageWrapper';
// components

const Page404 = () => (
	<PageWrapper
		title={'Erreur\u00A0: Page 404'}
		metadescription="Cette page n'exite pas ou plus."
		nofollow
	>
		<p>La page que vous recherchez n'existe pas.</p>
		<Link href="/" className="btn btn-primary">
			<Icon name="home" />
			Accueil
		</Link>
	</PageWrapper>
);
export default Page404;
