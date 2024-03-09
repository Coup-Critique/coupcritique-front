import { Checkbox } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkModeAction } from '@/reducers/darkMode';

const DarkModeToggle = () => {
	const dispatch = useDispatch();
	const darkMode = useSelector(state => state.darkMode);

	const handleToggle = e => {
		e.preventDefault();
		dispatch(setDarkModeAction(!darkMode));
	};

	return (
		<Checkbox
			checked={darkMode || false}
			toggle
			className="dark-mode-checkbox position-static extended-link"
			onChange={handleToggle}
			fitted={false}
			label="Mode"
		/>
	);
};

export default DarkModeToggle;
