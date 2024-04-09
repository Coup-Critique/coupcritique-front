'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '@/hooks/useFetch';
import { lastGen } from '@/constants/gens';

const defaultArray = [];
const useFetchListByGen = (key, defaultValue = defaultArray) => {
	const gen = useSelector(state => state.gen);
	const [result, load, loading] = useFetch();
	const [list, setList] = useState(defaultValue);

	useEffect(() => {
		if (gen != lastGen) {
			load({ url: `${key}?gen=${gen}` });
		} else if (gen && defaultValue !== list) {
			setList(defaultValue);
		}
	}, [gen]);

	useEffect(() => {
		if (defaultValue !== list) {
			setList(defaultValue);
		}
	}, [defaultValue]);

	useEffect(() => {
		if (result?.[key]) {
			setList(result[key]);
		}
	}, [result]);

	return [list, setList, loading];
};
export default useFetchListByGen;
