// modules
import { useState } from 'react';
import { makeClassName } from '@/functions';
import { useSelector } from 'react-redux';
// import Image from 'next/image';

const ShowdownIconHoverable = ({ linkProps, className, hoverColor = 'orange' }) => {
	const [hover, setHover] = useState(false);
	const darkMode = useSelector(state => state.darkMode);

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
				alt="Icon de Pokemon Showdown"
				width="19"
				height="18"
			/>
			<span className="sr-only">{linkProps.title}</span>
		</a>
	);
};
export default ShowdownIconHoverable;
