import { useRouter } from 'next/router';

const { useSearchParams } = require('next/navigation');

export const useGetParam = key => {
	const { query } = useRouter();
	const params = useSearchParams();
	console.log(query, params);
	if (query[key]) {
		return query[key];
	}
	return params.get(key);
};

const useGetParams = (...args) => {
	const params = useSearchParams();
	const { query } = useRouter();
	return args.reduce((object, key) => {
		object[key] = query[key] || params.get(key);
		return object;
	}, {});
};
export default useGetParams;
