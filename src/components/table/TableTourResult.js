import Player from '../elements/Player';
import { TableBase } from './Table';

const TableTourResult = ({ rounds }) => {
	return (
		<TableBase
			cols={[
				{ key: 'player1', content: 'Joueur 1', colSpan: 2 },
				{
					key: 'result',
					content: 'Résultat',
				},
				{ key: 'player2', content: 'Joueur 2', colSpan: 2 },
			]}
		>
			<tbody>
				{rounds.map((round, i) => (
					<tr key={i}>
						<td className="py-1">
							<Player showdown_name={round.player1} />
						</td>
						<td
							className={
								round.winner === round.player1 ? 'text-green' : 'text-red'
							}
						>
							{round.player1}
						</td>
						<td>{round.result}</td>
						<td
							className={
								round.winner === round.player2 ? 'text-green' : 'text-red'
							}
						>
							{round.player2}
						</td>
						<td className="py-1">
							<Player showdown_name={round.player2} />
						</td>
					</tr>
				))}
			</tbody>
		</TableBase>
	);
};

export default TableTourResult;
