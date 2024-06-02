import { formatPrices } from '@/functions';
import { TableBase } from './Table';
import { Icon } from 'semantic-ui-react';

const TableTourRanking = ({ players, circuitTours }) => {
	const cols = [
		{ key: 'rank', content: 'Rang' },
		{ key: 'showdown_name', content: 'Joueur' },
		{ key: 'points', content: 'Points' },
		{ key: 'prize', content: 'Prix' },
		{ key: 'country', content: 'Pays' },
		...circuitTours.map(tour => ({ key: tour.id, content: tour.title })),
	];
	return (
		<TableBase cols={cols}>
			<tbody>
				{players.map((player, i) => (
					<tr key={i}>
						<td>{player.rank}</td>
						<td>{player.showdown_name}</td>
						<td>{player.points}</td>
						<td>{player.prize ? formatPrices(player.prize) : '\u00A0'}</td>
						<td>{player.country}</td>
						{...circuitTours.map(tour => {
							if (!player.scores || !player.scores[tour.id]) {
								return <td key={tour.id} />;
							}
							const score = player.scores[tour.id];
							return (
								<td key={tour.id}>
									{score.rank} &nbsp; ({score.sum}&nbsp;pt)
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
