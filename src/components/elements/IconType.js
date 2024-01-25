// modules

import Link from 'next/link';
import { IMG_VERSION } from '@/constants/img';
import { formatFileName, makeClassName } from '@/functions';
import Image from 'next/image';

const IconType = ({ type, className, tera = false }) => (
	<Link
		href={`/entity/types/${type.id}`}
		className={makeClassName('icon-type', tera && 'tera', className)}
		title={type.nom || type.name}
	>
		<Image
			src={`/images/types/${tera ? 'tera' : 'icon'}/${formatFileName(
				type.name
			)}.png`}
			onError={e => {
				e.target.onerror = null;
				e.target.src = `/images/types/${
					tera ? 'tera' : 'icon'
				}/unknown.png?ver=${IMG_VERSION}`;
			}}
			alt={`Type ${type.nom || type.name}`}
			className="link"
			width={20}
			height={tera ? 28 : 20}
		/>
		<span className="sr-only">{type.nom || type.name}</span>
	</Link>
);
export default IconType;
