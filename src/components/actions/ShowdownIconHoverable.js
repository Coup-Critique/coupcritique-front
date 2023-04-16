// modules
import React, { useState } from 'react';
import { makeClassName } from '@/functions';
import useDarkMode from '@/hooks/useDarkMode';

const ShowdownIconHoverable = ({ linkProps, className, hoverColor = 'orange' }) => {
	const [hover, setHover] = useState(false);
	const [darkMode] = useDarkMode();

	return (
		<a
			{...linkProps}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<img
				className={makeClassName('fake-icon', className)}
				src={`/images/picto/showdown-export-${
					hover ? hoverColor : darkMode ? 'white' : 'black'
				}.svg`}
				alt="Pokemon Showdown Icon"
				width="19"
				height="18"
			/>
			<span className="sr-only">{linkProps.title}</span>
		</a>
	);
};
export default ShowdownIconHoverable;
