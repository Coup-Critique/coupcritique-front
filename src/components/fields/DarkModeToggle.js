import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import useDarkMode from '../../hooks/useDarkMode';

const DarkModeToggle = () => {
	const [darkMode, setDarkMode] = useDarkMode();

	const handleToggle = e => {
		e.preventDefault();
		setDarkMode(!darkMode);
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
