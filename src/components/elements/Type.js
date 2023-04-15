// modules
import React from 'react';
import { Link } from 'react-router-dom';
import { IMG_VERSION } from '../../constants/img';
import { formatFileName, makeClassName } from '../../functions';

const Type = ({ type, className }) => (
	<Link to={`/entity/types/${type.id}`} className={makeClassName('type', className)}>
		<img
			src={`/images/types/${formatFileName(type.name)}.png?ver=${IMG_VERSION}`}
			onError={e => {
				e.target.onerror = null;
				e.target.src = `/images/types/unknown.png?ver=${IMG_VERSION}`;
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
