import { formatPrices } from '@/functions';
import { TableBase } from './Table';
import { Icon } from 'semantic-ui-react';
import Player from '../elements/Player';

const cols = [
	{ key: 'p', content: 'Joueur', colSpan: 2 },
	{ key: 'rank', content: 'Rang' },
	{ key: 'sum', content: 'Points' },
	{ key: 'prize', content: 'Prix' },
	// { key: 'a', content: 'Ultime adversaire' },
];
const TableTourScore = ({ scores, circuitTour }) => {
	return (
		<TableBase cols={cols}>
			<tbody>
				{scores.map((score, i) => (
					<tr key={i}>
						<td className="py-1">
							<Player showdown_name={score.player} />
						</td>
						<td>
							{score.player}{' '}
							{score.rank == 1 && (
								<Icon
									name="winner"
									style={{ color: circuitTour.color }}
								/>
							)}
						</td>
						<td>{score.rank}</td>
						<td>{score.sum}</td>
						<td>{score.prize ? formatPrices(score.prize) : '\u00A0'}</td>
						{/* <td>{score.a}</td> */}
					</tr>
				))}
			</tbody>
		</TableBase>
	);
};

export default TableTourScore;
