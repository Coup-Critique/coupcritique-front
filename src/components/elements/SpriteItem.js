// modules

import Link from 'next/link';
import { Popup } from 'semantic-ui-react';
import { IMG_VERSION, SPRITE_ITM } from '@/constants/img';
import { formatFileName } from '@/functions';
// import Image from 'next/image';

const SpriteItem = ({ item, noPopup = false }) =>
	noPopup || !item.description ? (
		<Link
			href={`/entity/items/${item.id}`}
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
			className="mt-2"
			content={(item.nom || item.name) + ' : ' + item.description.split('\n')[0]}
			trigger={
				<Link href={`/entity/items/${item.id}`} className="sprite">
					<InnerImg item={item} />
				</Link>
			}
		/>
	);

const InnerImg = ({ item }) => (
	<>
		<img
			key={item.id}
			src={`/images/items/sprites/${formatFileName(
				item.name
			)}.png?ver=${IMG_VERSION}`}
			onError={e => {
				e.target.onerror = null;
				e.target.src = `/images/items/sprites/unknown.png`;
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
