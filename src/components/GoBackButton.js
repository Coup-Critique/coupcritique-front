import { useRouter } from 'next/router';
import { Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const GoBackButton = ({ callback, defaultUrl = '/' }) => {
	const router = useRouter();
	const darkMode = useSelector(state => state.darkMode);

	const goBack = () => {
		if (callback) {
			callback();
		}
		if (history.length > 2) {
			router.back();
		} else {
			router.replace(defaultUrl);
		}
	};

	return (
		<Button
			className={'mr-2 ' + (darkMode ? 'white' : 'grey')}
			inverted
			icon="arrow left"
			onClick={goBack}
			aria-label="Revenir à la page précédente"
		/>
	);
};
export default GoBackButton;
