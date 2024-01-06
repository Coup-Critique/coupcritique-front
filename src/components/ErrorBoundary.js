import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import PageWrapper from '@/components/PageWrapper';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };

		this.handleGoBack = this.handleGoBack.bind(this);
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// Vous pouvez aussi enregistrer l'erreur au sein d'un service de rapport.
	}

	clearError() {
		this.setState({ hasError: false });
	}

	handleGoBack() {
		this.clearError();
		this.props.router.back();
	}

	render() {
		if (this.state.hasError) {
			return (
				<PageWrapper title="Une erreur est survenue">
					<p>
						Nous sommes désolés pour le désagrément, une erreur est venue
						corrompre l'interface.
						<br /> Nous faisons notre maximum pour la corriger au plus vite.
					</p>
					<button className="btn btn-primary" onClick={this.handleGoBack}>
						<Icon name="left arrow" />
						Revenir en lieu sûr
					</button>
				</PageWrapper>
			);
		}

		return this.props.children;
	}
}
export default ErrorBoundary;
