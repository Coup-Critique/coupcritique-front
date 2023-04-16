// modules
import React from 'react';
import { Link } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';
import { IMG_VERSION, SPRITE_ITM } from '@/constants/img';
import { formatFileName } from '@/functions';

const SpriteItem = ({ item, noPopup = false }) =>
	noPopup || !item.description ? (
		<Link
			to={`/entity/items/${item.id}`}
			className="sprite"
			title={item.nom || item.name}
		>
			<InnerImg item={item} />
		</Link>
	) : (
		<Popup
			basic
			inverted
			hoverable
			wide="very"
			position="bottom center"
			offset="5px"
			content={(item.nom || item.name) + ' : ' + item.description.split('\n')[0]}
			trigger={
				<Link to={`/entity/items/${item.id}`} className="sprite">
					<InnerImg item={item} />
				</Link>
			}
		/>
	);

const InnerImg = ({ item }) => (
	<>
		<img
			src={`/images/items/sprites/${formatFileName(item.name)}.png?ver=${IMG_VERSION}`}
			onError={e => {
				e.target.onerror = null;
				e.target.src = `/images/items/sprites/unknown.png?ver=${IMG_VERSION}`;
			}}
			alt={`Objet ${item.nom || item.name}`}
			className="link"
			width={SPRITE_ITM}
			height={SPRITE_ITM}
		/>
		<span className="sr-only">{item.nom || item.name}</span>
	</>
);

export default SpriteItem;
