import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';
import { Icon } from 'semantic-ui-react';

export default async function NotFound() {
	return (
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
}
