'use client';
import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import reducerCombiner from '@/reducers';

export default function AppProvider({ children }) {
	const store = legacy_createStore(reducerCombiner);

	return <Provider store={store}>{children}</Provider>;
}
