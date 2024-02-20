import { useRouter } from 'next/router';
import { Button, Icon } from 'semantic-ui-react';
import useDarkMode from '@/hooks/useDarkMode';

const GoBackButton = ({ callback }) => {
	const router = useRouter();
	const [darkMode] = useDarkMode();

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
