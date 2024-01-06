// modules
import React from 'react';
import Link from 'next/link';
import { Popup } from 'semantic-ui-react';
import IconType from '@/components/elements/IconType';

const Move = ({ move }) =>
	move.type ? (
		<div className="move">
			<IconType type={move.type} />
			<Popup
				basic
				inverted
				hoverable
				wide="very"
				position="bottom center"
				offset="5px"
				content={move.description ? move.description.split('\n')[0] : ''}
				trigger={
					<Link href={`/entity/moves/${move.id}`}>{move.nom || move.name}</Link>
				}
			/>
		</div>
	) : move.description ? (
		<Popup
			basic
			inverted
			hoverable
			wide="very"
			position="bottom center"
			offset="5px"
			content={move.description.split('\n')[0]}
			trigger={<Link href={`/entity/moves/${move.id}`}>{move.nom || move.name}</Link>}
		/>
	) : (
		<Link href={`/entity/moves/${move.id}`}>{move.nom || move.name}</Link>
	);
export default Move;
