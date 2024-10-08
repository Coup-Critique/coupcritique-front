// modules

import Link from 'next/link';
import { IMG_VERSION } from '@/constants/img';
import { formatFileName, makeClassName } from '@/functions';
// import Image from 'next/image';

const Type = ({ type, className, ownPath = false }) => (
	<Link href={`/entity/types/${type.id}`} className={makeClassName('type', className)}>
		<img
			key={type.id}
			src={
				ownPath
					? `/images/types/${formatFileName(type.name)}.png?ver=${IMG_VERSION}`
					: '/images/transparent.png'
			}
			onError={e => {
				e.target.onerror = null;
				e.target.src = `/images/types/unknown.png`;
			}}
			alt={`Type ${type.nom || type.name}`}
			className={makeClassName(
				'link',
				!ownPath && `type-sprite type-${type.name.toLowerCase()}`
			)}
			width="100"
			height="20"
		/>
		<span className="sr-only">{type.nom || type.name}</span>
	</Link>
);
export default Type;
