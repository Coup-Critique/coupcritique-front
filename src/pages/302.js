// modules
import { Loader } from 'semantic-ui-react';
import PageWrapper from '@/components/PageWrapper';
import LinkButton from '@/components/buttons/LinkButton';
// components

const Page302 = () => (
	<PageWrapper
		title={'Redirection en cours'}
		metadescription="Cette page n'exite plus, vous allez être redirigé vers sa nouvelle version."
	>
		<p>Cette page n'exite plus, vous allez être redirigé vers sa nouvelle version</p>
		<Loader active inline="centered" />
		<LinkButton color="primary" href="/" label="Accueil" icon="home" />
	</PageWrapper>
);
export default Page302;
