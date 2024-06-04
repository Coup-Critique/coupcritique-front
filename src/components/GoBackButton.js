import { useRouter } from 'next/router';
import { Button } from 'semantic-ui-react';
import useDarkMode from '@/hooks/useDarkMode';

const GoBackButton = ({ callback, defaultUrl = '/' }) => {
	const router = useRouter();
	const [darkMode] = useDarkMode();

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
		/>
	);
};
export default GoBackButton;
