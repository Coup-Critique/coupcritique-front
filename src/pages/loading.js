// modules

import Link from 'next/link';
import { Icon, Loader } from 'semantic-ui-react';
import PageWrapper from '@/components/PageWrapper';
import LinkButton from '@/components/buttons/LinkButton';
// components

const LoadingPage = () => (
	<PageWrapper
		title={'Chargment...'}
		metadescription="Page indisponible."
		nofollow
		goingBack
	>
		<Loader active inline="centered" />
		<LinkButton color="primary" href="/" label="Accueil" icon="home" />
	</PageWrapper>
);
export default LoadingPage;
