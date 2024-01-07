// modules

import Link from 'next/link';
import { Popup } from 'semantic-ui-react';
import { formateName } from '@/functions';

const Ability = ({ ability, noPopup = false }) =>
	noPopup || !ability.description ? (
		<Link className="ability" href={`/entity/abilities/${ability.id}`}>
			{ability.nom || formateName(ability.name)}
		</Link>
	) : (
		<Popup
			basic
			inverted
			hoverable
			wide="very"
			position="bottom center"
			offset="5px"
			content={ability.description.split('\n')[0]}
			trigger={
				<Link className="ability" href={`/entity/abilities/${ability.id}`}>
					{ability.nom || formateName(ability.name)}
				</Link>
			}
		/>
	);

export default Ability;
