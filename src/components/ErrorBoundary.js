import { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PageWrapper from '@/components/PageWrapper';
import { useRouter } from 'next/router';
import useLogout from '@/hooks/useLogout';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	// componentDidCatch(error, errorInfo) {
	// Vous pouvez aussi enregistrer l'erreur au sein d'un service de rapport.
	// }

	clearError() {
		this.setState({ hasError: false });
	}

	render() {
		if (this.state.hasError) {
			return <PageError clearError={this.clearError} />;
		}

		return this.props.children;
	}
}

const PageError = ({ clearError }) => {
	const router = useRouter();
	const logout = useLogout();

	const handleRefresh = () => {
		clearError();
		location.reload();
	};

	const handleGoBack = () => {
		clearError();
		if (history.length > 2) {
			router.back();
		} else {
			router.replace('/');
		}
	};

	const handleLogout = () => {
		clearError();
		logout();
	};

	return (
		<PageWrapper title="Une erreur est survenue">
			<p>
				Nous sommes désolé pour le désagrément, une erreur est venue corrompre
				votre interface.
				<br /> Nous faisons notre maximum pour la corriger au plus vite.
				<br /> Vous pouvez essayer de rafraîchir la page, si le problème persiste
				veuillez nous contacter&nbsp;: par{' '}
				<a
					href="https://discord.gg/UNn4Se3ZKM"
					target="_blank"
					rel="noreferrer nofollow"
					className="nav-link mr-2"
				>
					<Icon name="discord" />
					Discord
				</a>{' '}
				ou par mail à aide.coupcritique@gmail.com.
			</p>
			<div className="mb-1_5">
				<p>Pour tenter de résoudre le problème :</p>
				<Button
					color="orange"
					onClick={handleRefresh}
					icon="refresh"
					content="Rafraîchir la page"
					arial-label="Rafraîchir la page"
				/>
			</div>
			<div className="mb-1_5">
				<p>Pour effectuer d'autres actions :</p>
				<Button
					color="orange"
					onClick={handleGoBack}
					icon="left arrow"
					basic
					content="Revenir en arrière"
					area-label="Revenir en arrière"
				/>
			</div>
			<div>
				<p>Si vous parvenez pas rétablir l'interface :</p>
				<Button
					color="red"
					onClick={handleLogout}
					icon="sign out"
					basic
					size="mini"
					content="Se déconnecter"
					area-label="Se déconnecter"
				/>
			</div>
		</PageWrapper>
	);
};

export default ErrorBoundary;
