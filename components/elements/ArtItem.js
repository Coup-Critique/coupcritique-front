// modules

import Link from 'next/link';
import { ART_ITM, IMG_VERSION } from '@/constants/img';
import { formatFileName } from '@/functions';
import { useMemo } from 'react';
import ImageLoader from './ImageLoader';

const defaultSrc = '/images/picto/circle-question-solid.svg';

// Not exportable
const ArtItemImgTag = item => {
	const src = useMemo(
		() => `/images/items/${formatFileName(item.name)}.png?ver=${IMG_VERSION}`,
		[item.name]
	);

	return (
		<ImageLoader
			src={src}
			defaultSrc={defaultSrc}
			alt={`Objet ${item.nom || item.name}`}
			className="img-fluid art-item"
			width={ART_ITM}
			height={ART_ITM}
		/>
	);
};

const ArtItem = ({ item, linked = false }) =>
	linked ? (
		<Link href={`/entity/items/${item.id}`}>
			<ArtItemImgTag {...item} />
			<span className="sr-only">{item.nom || item.name}</span>
		</Link>
	) : (
		<ArtItemImgTag {...item} />
	);
export default ArtItem;
