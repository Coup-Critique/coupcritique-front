import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'semantic-ui-css/semantic.min.css';
import 'animate.css';
import '@/styles/app.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { SingletonHooksContainer } from 'react-singleton-hook';
import ErrorBoundary from '@/components/ErrorBoundary';
import reducerCombiner from '@/reducers';
import CustomBrowserRouter from '@/routers/CustomBrowserRouter';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps, router }) {
	const store = createStore(reducerCombiner);

	return (
		<Provider store={store}>
			<CustomBrowserRouter asPath={router.asPath}>
				<ErrorBoundary>
					<Layout>
						<Component {...pageProps} />
					</Layout>
					<SingletonHooksContainer />
				</ErrorBoundary>
			</CustomBrowserRouter>
		</Provider>
	);
}
