'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button, Dropdown, Icon, Label } from 'semantic-ui-react';
import gens from '@/constants/gens';
import { setGenAction } from '@/reducers/gen';
import useLocalStorage, { STORAGE_KEY } from '@/hooks/useLocalStorage';

const genOptions = gens.map(({ value, name }) => ({
	key: value,
	value,
	text: `${value} (${name})`,
}));

const GenSelector = ({ availableGens, redirectOnChange }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const gen = useSelector(state => state.gen);
	const [options, setOptions] = useState(genOptions);
	const { getStoredItem } = useLocalStorage();
	const genIndex = genOptions.length - gen;

	useEffect(() => {
		const storedGen = getStoredItem(STORAGE_KEY + '-gen');
		if (storedGen != gen) {
			dispatch(setGenAction(storedGen));
		}
	}, []);

	useEffect(() => {
		if (availableGens) {
			setOptions(genOptions.filter(({ value }) => value in availableGens));
		} else if (options !== genOptions) {
			setOptions(genOptions);
		}
	}, [availableGens]);

	const onChange = (e, { value }) =>
		redirectOnChange
			? router.push(redirectOnChange + availableGens[value])
			: dispatch(setGenAction(value));

	return (
		<Dropdown
			trigger={
				<Button as="div" labelPosition="right">
					<Button color="orange">Génération</Button>
					<Label as="a" basic color="orange" pointing="left">
						{options[genIndex]?.text || ''}
						<Icon name="dropdown" className="ml-2" />
					</Label>
				</Button>
			}
			options={options}
			name="generations"
			onChange={onChange}
			value={gen}
			className="menu-position-right button-triggered"
			upward={false}
		/>
	);
};
export default GenSelector;
