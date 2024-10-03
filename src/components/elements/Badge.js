import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

const Badge = ({ badge, ...props }) => {
	return (
		<Popup
			basic
			hoverable
			inverted
			wide="very"
			position="bottom center"
			className="popup-badge mt-2"
			content={badge.title}
			trigger={<Icon {...badge} circular inverted {...props} />}
		/>
	);
};

export default Badge;
