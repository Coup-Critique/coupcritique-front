// modules
// import Link from 'next/link';
import { Popup } from 'semantic-ui-react';
import { formateName } from '@/functions';

const Item = ({ item, noPopup = false }) =>
	noPopup || !item.description ? (
		<a href={`/entity/items/${item.id}`}>{item.nom || formateName(item.name)}</a>
	) : (
		<Popup
			basic
			inverted
			hoverable
			wide="very"
			position="bottom center"
			className='mt-2'
			content={item.description.split('\n')[0]}
			trigger={
				<a href={`/entity/items/${item.id}`}>
					{item.nom || formateName(item.name)}
				</a>
			}
		/>
	);

export default Item;
