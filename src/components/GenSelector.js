// modules
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown, Icon, Label } from 'semantic-ui-react';
import gens from '@/constants/gens.json';
import { setGenAction } from '@/reducers/gen';

const genOptions = gens.map(({ value, name }) => ({
	key: value,
	value,
	text: `${value} (${name})`,
}));

const GenSelector = ({ availableGens, redirectOnChange }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const gen = useSelector(state => state.gen);
	const [options, setOptions] = useState(genOptions);
	const genIndex = genOptions.length - gen;

	useEffect(() => {
		if (availableGens) {
			setOptions(genOptions.filter(({ value }) => value in availableGens));
		} else if (options !== genOptions) {
			setOptions(genOptions);
		}
	}, [availableGens]);

	const onChange = (e, { value }) =>
		redirectOnChange
			? history.push(redirectOnChange + availableGens[value])
			: dispatch(setGenAction(value));

	return (
		<Dropdown
			trigger={
				<Button as="div" labelPosition="right">
					<Button color="orange">Génération</Button>
					<Label as="a" basic color="orange" pointing="left">
						{options.length > 0 && options[genIndex]
							? options[genIndex].text
							: ''}
						<Icon name="dropdown" className="ml-2" />
					</Label>
				</Button>
			}
			options={options}
			name="generations"
			onChange={onChange}
			value={gen}
			className="mb-3 menu-position-right button-triggered"
			upward={false}
		/>
	);
};
export default GenSelector;
