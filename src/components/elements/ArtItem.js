// modules

// import Link from 'next/link';
import { ART_ITM, IMG_VERSION } from '@/constants/img';
import { formatFileName } from '@/functions';
import Image from 'next/image';

// Not exportable
const ArtItemImgTag = item => (
	<Image
		src={`/images/items/${formatFileName(item.name)}.png?ver=${IMG_VERSION}`}
		onError={e => {
			e.target.onerror = null;
			e.target.src = '/images/picto/circle-question-solid.svg';
		}}
		alt={`Objet ${item.nom || item.name}`}
		className="img-fluid art-item"
		width={ART_ITM}
		height={ART_ITM}
	/>
);

const ArtItem = ({ item, linked = false }) =>
	linked ? (
		<a href={`/entity/items/${item.id}`}>
			<ArtItemImgTag {...item} />
			<span className="sr-only">{item.nom || item.name}</span>
		</a>
	) : (
		<ArtItemImgTag {...item} />
	);
export default ArtItem;
