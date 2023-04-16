// modules
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// custom
import useRefreshToken from './useRefreshToken';
import { addMessage } from '@/reducers/messages';
import { buildFormData } from '@/functions';
import { GET } from '@/constants/methods';

export const JSON_TYPE = 'application/json';
export const FILE_TYPE = 'multipart/form-data';

const useFetch = (firstCallPriority = true) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [result, setResult] = useState(null);
	const refreshToken = useRefreshToken(result);
	const [loading, setLoading] = useState(false);
	// If component is unmounted result can't be updated
	const unmounted = useRef(false);
	// To interrupt fetching
	const [controller, setController] = useState(
		typeof window === 'undefined' ? null : new AbortController()
	);

	useEffect(() => {
		return () => {
			unmounted.current = true;
			controller.abort();
		};
	}, []);

	useEffect(() => {
		if (result) {
			if (loading && !unmounted.current) {
				setLoading(false);
			}
			if (!result.success && result.message) {
				dispatch(addMessage(result.message, false));
			}
		}
	}, [result]);

	const load = async ({
		url,
		method = GET,
		body,
		token = user.token,
		contentType = JSON_TYPE,
	}) => {
		let controllerTemp = controller || new AbortController();
		if (loading) {
			// Cut current
			if (firstCallPriority) return;
			if (controller) {
				controllerTemp.abort();
				controllerTemp = new AbortController();
				setController(controllerTemp);
			}
		}

		if (!unmounted.current) setLoading(true);

		const params = {
			method,
			headers: { Accept: JSON_TYPE },
			signal: controllerTemp.signal,
		};

		if (token) {
			params.headers.JWTAuthorization = `Bearer ${token}`;
		}

		if (body) {
			if (contentType === JSON_TYPE) {
				body = JSON.stringify(body);
				params.headers['Content-Type'] = contentType;
			} else if (contentType === FILE_TYPE) {
				// Content type should be autotmatically fill
				body = buildFormData(body);
			}
			params.body = body;
		}

		// Catch if token is invalid/expired.
		// Then try to get a new one with refreshToken : success ? reload : logout
		try {
			const response = await manageFetch(url, params);
			if (!unmounted.current) setResult(response);
		} catch (e) {
			const responseAfterRefresh = await refreshToken(url, params);
			if (!unmounted.current) setResult(responseAfterRefresh);
		}
	};

	return [result, load, loading];
};

export const manageFetch = async (url, params) => {
	// If fetch, repsonse status or .json() is an error throw error to manageError
	let response = null;
	try {
		// console.log('request', `/api/${url}`, params);
		const response = await fetch(`/api/${url}`, params);
		// console.log('response', response);
		const responseJson = await response.json();
		// console.log('responseJson',responseJson);
		if (response.ok && response.status >= 200 && response.status < 300) {
			responseJson.success = true;
			responseJson.code = response.status;
			return responseJson;
		} else {
			throw responseJson;
		}
	} catch (e) {
		// Set as result
		if (response && response.code && typeof e === 'object' && !e.code) {
			e.code = response.code;
		}
		return manageError(e);
	}
};

export const manageError = error => {
	if (!error) error = {};
	error.success = false;

	if (error.name === 'AbortError') {
		return;
	}

	if (
		error.message === 'Invalid JWT Token'
		|| error.message === 'Expired JWT Token'
		|| error.message === "Une exception d'authentification s'est produite."
	) {
		// Throw error to refreshToken
		throw error;
	}

	console.error(error.code, error.message || error);

	if (error.message === 'Failed to fetch') {
		error.message =
			'Erreur de communication, le serveur est inaccessible. Veuillez vérifier votre connexion internet.';
	}

	if (error.title === 'An error occurred' || error.message?.startsWith('Unexpected')) {
		error.message = 'Erreur de communication avec le serveur.';
	}
	return error;
};

export default useFetch;
