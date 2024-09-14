import { formatPrices } from '@/functions';
import { TableBase } from './Table';
import { Icon } from 'semantic-ui-react';
import Player from '../elements/Player';
import Link from 'next/link';

const TableTourRanking = ({ players, circuitTours }) => {
	const cols = [
		{ key: 'rank', content: 'Rang' },
		{ key: 'name', content: 'Joueur', colSpan: 2 },
		{ key: 'points', content: 'Points' },
		{ key: 'prize', content: 'Prix' },
		// { key: 'country', content: 'Pays' },
		...circuitTours.map(tour => ({ key: tour.id, content: tour.title })),
	];
	return (
		<TableBase cols={cols}>
			<tbody>
				{players.map((player, i) => (
					<tr key={i}>
						<td>{player.rank}</td>
						<td className="py-1">
							{player.user ? (
								<Link href={`/entity/users/${player.user.id}`}>
									<Player name={player.name} />
									<span className="sr-only">
										{player.user.username}
									</span>
								</Link>
							) : (
								<Player name={player.name} />
							)}
						</td>
						<td>
							{player.user ? (
								<Link href={`/entity/users/${player.user.id}`}>
									{player.name}
								</Link>
							) : (
								player.name
							)}
						</td>
						<td>{player.points}</td>
						<td>{player.prize ? formatPrices(player.prize) : '\u00A0'}</td>
						{/* <td>{player.country}</td> */}
						{...circuitTours.map(tour => {
							if (!player.scores || !player.scores[tour.id]) {
								return <td key={tour.id} />;
							}
							const score = player.scores[tour.id];
							return (
								<td key={tour.id}>
									{score.sum}{' '}
									{score.rank == 1 ? (
										<Icon
											name="winner"
											style={{ color: tour.color }}
										/>
									) : (
										'\u00A0'
									)}{' '}
									{!!score.rank && `#${score.rank}`}
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</TableBase>
	);
};

export default TableTourRanking;
