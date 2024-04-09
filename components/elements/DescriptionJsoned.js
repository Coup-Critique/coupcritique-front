// modules
import { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import { makeClassName } from '@/functions';
// custom
import Pokemon from '@/components/elements/Pokemon';
import SpritePokemon from '@/components/elements/SpritePokemon';
import Item from '@/components/elements/Item';
import SpriteItem from '@/components/elements/SpriteItem';
import Move from '@/components/elements/Move';
import Ability from '@/components/elements/Ability';
import Type from '@/components/elements/Type';

const regex = /\[[^\]^\s]*:[^\]]*\]|\n/g;
const DescriptionJsoned = ({ description, json, className, handleUpdate }) => {
	if (!json) {
		return <p className="description">{description}</p>;
	}

	const jsonReplace = Object.entries(json).reduce((acc, [key, value]) => {
		if (key === '\\n') acc['\n'] = <br />;
		// eslint-disable-next-line default-case
		switch (value.entity) {
			case 'Pokemon':
				if (value.displayName) {
					acc[key] = (
						<>
							<Pokemon pokemon={value} /> <SpritePokemon pokemon={value} />
						</>
					);
				} else {
					acc[key] = <SpritePokemon pokemon={value} />;
				}
				break;
			case 'Item':
				if (value.displayName) {
					acc[key] = (
						<>
							<Item item={value} /> <SpriteItem item={value} />
						</>
					);
				} else {
					acc[key] = <SpriteItem item={value} />;
				}
				break;
			case 'Ability':
				acc[key] = <Ability ability={value} />;
				break;
			case 'Move':
				acc[key] = <Move move={value} />;
				break;
			case 'Type':
				acc[key] = <Type type={value} />;
				break;
		}
		return acc;
	}, {});

	let splites = description.split(regex);
	let length = splites.length;
	let matches = description.match(regex);
	if (matches) matches = [...matches];
	return (
		<p className={makeClassName('description json', className)}>
			{splites.map((str, i) =>
				i === length - 1 ? (
					str
				) : (
					<Fragment key={i}>
						{str}
						{jsonReplace[matches[i]]}
					</Fragment>
				)
			)}{' '}
			{!!handleUpdate && (
				<Icon link name="pencil" title="modifier" onClick={handleUpdate} />
			)}
		</p>
	);
};

export default DescriptionJsoned;
