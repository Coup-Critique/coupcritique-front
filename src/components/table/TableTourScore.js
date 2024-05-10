import { formatPrices } from '@/functions';
import { TableBase } from './Table';
import { Icon } from 'semantic-ui-react';

const cols = [
	{ key: 'p', content: 'Joueur' },
	{ key: 'rank', content: 'Rang' },
	{ key: 'sum', content: 'Points' },
	{ key: 'prize', content: 'Prix' },
	{ key: 'a', content: 'Ultime adversaire' },
];
const TableTourScore = ({ scores }) => {
	return (
		<TableBase cols={cols}>
			<tbody>
				{scores.map((score, i) => (
					<tr key={i}>
						<td>
							{score.p}{' '}
							{score.rank === 1 && <Icon name="winner" color="yellow" />}
						</td>
						<td>{score.rank}</td>
						<td>{score.sum}</td>
						<td>{score.prize ? formatPrices(score.prize) : '\u00A0'}</td>
						<td>{score.a}</td>
					</tr>
				))}
			</tbody>
		</TableBase>
	);
};

export default TableTourScore;
