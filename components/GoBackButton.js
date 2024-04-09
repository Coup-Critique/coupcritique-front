import { useRouter } from 'next/navigation';
import { Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const GoBackButton = ({ callback }) => {
	const router = useRouter();
	const darkMode = useSelector(state => state.darkMode);

	const goBack = () => {
		if (callback) {
			callback();
		}
		router.back();
	};

	return (
		<Button
			className={'mr-2 ' + (darkMode ? 'white' : 'grey')}
			inverted
			icon="arrow left"
			onClick={goBack}
		/>
	);
};
export default GoBackButton;
