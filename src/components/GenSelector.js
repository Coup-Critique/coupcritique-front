// modules
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Dropdown, Icon, Label } from 'semantic-ui-react';
import gens, { lastGen } from '@/constants/gens';
import { setGenAction } from '@/reducers/gen';
import useLocalStorage, { STORAGE_KEY } from '@/hooks/useLocalStorage';
import { arrayCompare } from '@/functions';

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
		const storedGen = getStoredItem(STORAGE_KEY + '-gen') || lastGen;
		if (storedGen != gen) {
			dispatch(setGenAction(storedGen));
		}
	}, []);

	useEffect(() => {
		if (availableGens) {
			const filteredOptions = genOptions.filter(
				({ value }) => value in availableGens
			);
			if (!arrayCompare(filteredOptions, options)) {
				setOptions(filteredOptions);
			}
			if (!(gen in availableGens)) {
				dispatch(setGenAction(lastGen));
			}
		} else if (options !== genOptions) {
			setOptions(genOptions);
		}
	}, [gen, availableGens]);

	const onChange = (e, { value }) => {
		if (redirectOnChange) {
			dispatch(setGenAction(value));
			router.push(redirectOnChange + availableGens[value]);
		} else {
			dispatch(setGenAction(value));
		}
	};

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
			aria-label="Sélectionner une génération"
		/>
	);
};
export default GenSelector;
