/* eslint-disable */
import React from 'react';
import { BrowserRouter, Router, StaticRouter } from 'react-router-dom';
import { createNextHistory } from './createNextHistory';
import { Loader } from 'semantic-ui-react';

function CustomBrowserRouter({ children, asPath }) {
	// if (process.browser) {
	if (typeof window !== 'undefined') {
		const historyRef = React.useRef();

		if (historyRef.current == null) {
			historyRef.current = createNextHistory(asPath);
			historyRef.current.listen(update => dispatch(update));
		}

		const history = historyRef.current;

		const [state, dispatch] = React.useReducer((_, action) => action, {
			action: history.action,
			location: history.location,
		});

		// if (!history) return <Loader active inline="centered" />;

		return (
			<Router action={state.action} location={state.location} history={history}>
				{children}
			</Router>
		);
		// return <BrowserRouter>{children}</BrowserRouter>;
	} else {
		return <StaticRouter location={asPath}>{children}</StaticRouter>;
	}
}

export default CustomBrowserRouter;
