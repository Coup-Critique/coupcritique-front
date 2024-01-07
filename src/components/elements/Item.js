// modules

import Link from 'next/link';
import { Popup } from 'semantic-ui-react';
import { formateName } from '@/functions';

const Item = ({ item, noPopup = false }) =>
	noPopup || !item.description ? (
		<Link href={`/entity/items/${item.id}`}>{item.nom || formateName(item.name)}</Link>
	) : (
		<Popup
			basic
			inverted
			hoverable
			wide="very"
			position="bottom center"
			offset="5px"
			content={item.description.split('\n')[0]}
			trigger={
				<Link href={`/entity/items/${item.id}`}>
					{item.nom || formateName(item.name)}
				</Link>
			}
		/>
	);

export default Item;
