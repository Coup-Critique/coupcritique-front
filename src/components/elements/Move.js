// modules
// import Link from 'next/link';
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
				className="mt-2"
				content={move.description ? move.description.split('\n')[0] : ''}
				trigger={<a href={`/entity/moves/${move.id}`}>{move.nom || move.name}</a>}
			/>
		</div>
	) : move.description ? (
		<Popup
			basic
			inverted
			hoverable
			wide="very"
			position="bottom center"
			className="mt-2"
			content={move.description.split('\n')[0]}
			trigger={<a href={`/entity/moves/${move.id}`}>{move.nom || move.name}</a>}
		/>
	) : (
		<a href={`/entity/moves/${move.id}`}>{move.nom || move.name}</a>
	);
export default Move;
