// modules

import Link from 'next/link';
import { IMG_VERSION } from '@/constants/img';
import { formatFileName, makeClassName } from '@/functions';
import Image from 'next/image';

const Type = ({ type, className }) => (
	<Link href={`/entity/types/${type.id}`} className={makeClassName('type', className)}>
		<Image
			src={`/images/types/${formatFileName(type.name)}.png?ver=${IMG_VERSION}`}
			onError={e => {
				e.target.onerror = null;
				e.target.src = `/images/types/unknown.png`;
			}}
			alt={`Type ${type.nom || type.name}`}
			className="link"
			width="100"
			height="20"
		/>
		<span className="sr-only">{type.nom || type.name}</span>
	</Link>
);
export default Type;
