import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import useDarkMode from '../hooks/useDarkMode';

const GoBackButton = ({ callback, defaultUrl }) => {
	const history = useHistory();
	const [darkMode] = useDarkMode();

	const goBack = () => {
		if (callback) {
			callback();
		}
		// TODO l'historique est bugé, faire une version Redux
		if (history.length < 2) {
			if (defaultUrl) {
				history.push(defaultUrl);
			} else {
				history.push('/');
			}
		} else {
			history.goBack();
		}
	};

	return (
		<Button
			className={'iconned mr-2 ' + (darkMode ? 'white' : 'grey')}
			inverted
			onClick={goBack}
		>
			{history.length < 2 && !defaultUrl ? (
				<>
					<Icon name="arrow left" />
					Accueil
				</>
			) : (
				<>
					<Icon name="arrow left" /> Retour
				</>
			)}
		</Button>
	);
};
export default GoBackButton;
