import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'semantic-ui-css/semantic.min.css';
import 'animate.css';
import '@/styles/app.scss';
//
import { useEffect, useState } from 'react';
import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import Router from 'next/router';
import { Loader } from 'semantic-ui-react';
//
import ErrorBoundary from '@/components/ErrorBoundary';
import reducerCombiner from '@/reducers';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }) {
	const store = legacy_createStore(reducerCombiner);
	const [loading, setLoading] = useState(false);

	// loading on page change
	useEffect(() => {
		const start = () => setLoading(true);
		const end = () => setLoading(false);
		Router.events.on('routeChangeStart', start);
		Router.events.on('routeChangeComplete', end);
		Router.events.on('routeChangeError', end);
		return () => {
			Router.events.off('routeChangeStart', start);
			Router.events.off('routeChangeComplete', end);
			Router.events.off('routeChangeError', end);
		};
	}, []);

	return (
		<Provider store={store}>
			<ErrorBoundary>
				<Layout>
					{loading ? (
						<Loader active inline="centered" />
					) : (
						<Component {...pageProps} />
					)}
				</Layout>
			</ErrorBoundary>
		</Provider>
	);
}
