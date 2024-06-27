// modules

import Link from 'next/link';
import { formatFileName, makeClassName } from '@/functions';
import { IMG_VERSION } from '@/constants/img';
// import Image from 'next/image';

const IconType = ({ type, className, ownPath = false, tera = false }) => {
	const category = tera ? 'tera' : 'icon';
	return (
		<Link
			href={`/entity/types/${type.id}`}
			className={makeClassName('icon-type', tera && 'tera', className)}
			title={type.nom || type.name}
		>
			<img
				src={
					ownPath
						? `/images/types/${category}/${formatFileName(
								type.name
						  )}.png?ver=${IMG_VERSION}`
						: '/images/transparent.png'
				}
				onError={e => {
					e.target.onerror = null;
					e.target.src = `/images/types/${category}/unknown.png`;
				}}
				alt={`Type ${type.nom || type.name}`}
				className={makeClassName(
					'link',
					!ownPath &&
						`type-${category}-sprite type-${category}-${type.name.toLowerCase()}`
				)}
				width={tera ? 25 : 20}
				height={tera ? 25 : 20}
			/>
			<span className="sr-only">{type.nom || type.name}</span>
		</Link>
	);
};
export default IconType;
