// modules

import Link from 'next/link';
import { Popup } from 'semantic-ui-react';
import { IMG_VERSION, SPRITE_ITM } from '@/constants/img';
import { formatFileName, makeClassName } from '@/functions';
// import Image from 'next/image';

const SpriteItem = ({ item, ownPath = false, noPopup = false }) =>
	noPopup || !item.description ? (
		<Link
			href={`/entity/items/${item.id}`}
			className="sprite"
			title={item.nom || item.name}
		>
			<InnerImg item={item} ownPath={ownPath} />
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
					<InnerImg item={item} ownPath={ownPath} />
				</Link>
			}
		/>
	);

const InnerImg = ({ item, ownPath, className }) => (
	<>
		<img
			key={item.id}
			src={
				ownPath
					? `/images/items/sprites/${formatFileName(
							item.name
					  )}.png?ver=${IMG_VERSION}`
					: `/images/transparent.png`
			}
			alt={`Objet ${item.nom || item.name}`}
			className={makeClassName(
				'link',
				className,
				!ownPath && `item-sprite item-${formatFileName(item.name)}`
			)}
			width={SPRITE_ITM}
			height={SPRITE_ITM}
		/>
		<span className="sr-only">{item.nom || item.name}</span>
	</>
);

export default SpriteItem;
