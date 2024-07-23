// modules

import Link from 'next/link';
import { Icon, Loader } from 'semantic-ui-react';
import PageWrapper from '@/components/PageWrapper';
// components

const LoadingPage = () => (
	<PageWrapper
		title={'Chargment...'}
		metadescription="Page indisponible."
		nofollow
		goingBack
	>
		<Loader active inline="centered" />
		<Link href="/" className="btn btn-primary">
			<Icon name="home" />
			Accueil
		</Link>
	</PageWrapper>
);
export default LoadingPage;
