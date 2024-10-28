import { getCookie } from '@/functions/cookie';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCookieAction } from '@/reducers/cookie';

export const youtubeCookieKey = 'accept-youtube-cookie';
export const googleAdsCookieKey = 'accept-google-ads-cookie';

const useCookies = () => {
	const dispatch = useDispatch();
	const { googleAds, youtube } = useSelector(state => state.cookie);

	useEffect(() => {
		const youtubeValue = getCookie(youtubeCookieKey);
		const googleAdsValue = getCookie(googleAdsCookieKey);

		if (youtube == undefined) {
			storeCookie('youtube', youtubeValue);
		}
		if (googleAds == undefined) {
			storeCookie('googleAds', googleAdsValue);
		}
	}, []);

	const storeCookie = (key, value) => dispatch(setCookieAction(key, value));

	return { googleAds, youtube, storeCookie };
};

export default useCookies;
