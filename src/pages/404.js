// modules
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import PageWrapper from '../PageWrapper';
// components

const Page404 = () => (
	<PageWrapper
		title={'Erreur\u00A0: Page 404'}
		metadescription="Cette page n'exite pas ou plus."
		nofollow
	>
		<p>La page que vous recherchez n'existe pas.</p>
		<Link to="/" className="btn btn-primary">
			<Icon name="home" />
			Accueil
		</Link>
	</PageWrapper>
);
export default Page404;
