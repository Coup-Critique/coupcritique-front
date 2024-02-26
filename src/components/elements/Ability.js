// modules

// import Link from 'next/link';
import { Popup } from 'semantic-ui-react';
import { formateName } from '@/functions';

const Ability = ({ ability, noPopup = false }) =>
	noPopup || !ability.description ? (
		<a className="ability" href={`/entity/abilities/${ability.id}`}>
			{ability.nom || formateName(ability.name)}
		</a>
	) : (
		<Popup
			basic
			inverted
			hoverable
			wide="very"
			position="bottom center"
			className='mt-2'
			content={ability.description.split('\n')[0]}
			trigger={
				<a className="ability" href={`/entity/abilities/${ability.id}`}>
					{ability.nom || formateName(ability.name)}
				</a>
			}
		/>
	);

export default Ability;
