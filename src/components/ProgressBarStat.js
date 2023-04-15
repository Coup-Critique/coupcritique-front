// modules
import React from 'react';

// export const MAX_STAT = 255; // true max
export const MAX_STAT = 200; // for design

export const calcColor = stat => {
	if (stat >= 175) return 'blue';
	if (stat >= 150) return 'teal';
	if (stat >= 125) return 'green';
	if (stat >= 100) return 'olive';
	if (stat >= 75) return 'yellow';
	if (stat >= 50) return 'orange';
	return 'red';
};

const ProgressBarStat = ({ stat }) => (
	<div className="progress">
		<div
			className={'progress-bar ' + calcColor(stat)}
			role="progressbar"
			style={{ width: (stat * 100) / MAX_STAT + '%' }}
			aria-valuenow={stat}
			aria-valuemin="0"
			aria-valuemax={MAX_STAT}
		></div>
	</div>
);
export default ProgressBarStat;
