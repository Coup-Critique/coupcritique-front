// modules
import React from 'react';
import { capitalize } from '../../functions';

const Spread = ({ nature, evs }) => (
	<span className="spread">
		{/* Nature&nbsp;: {nature.nom || nature.name} EVs&nbsp;:{' '} */}
		{Object.entries(evs).reduce((str, [stat, value]) => {
			if (!value && !nature[stat]) return str;
			if (str) {
				str += ' / ';
			}
			str += `${value || ''}${
				nature[stat] == 1 ? '+' : nature[stat] == -1 ? '-' : ''
			} ${capitalize(stat) || ''}`;
			return str;
		}, '')}
	</span>
);
export default Spread;
