import Player from '../elements/Player';
import { TableBase } from './Table';

const TableTourResult = ({ rounds }) => {
	return (
		<TableBase
			cols={[
				{ key: 'p1', content: 'Joueur 1', colSpan: 2 },
				{
					key: 'result',
					content: 'Résultat',
				},
				{ key: 'p2', content: 'Joueur 2', colSpan: 2 },
			]}
		>
			<tbody>
				{rounds.map((round, i) => (
					<tr key={i}>
						<td className='py-1'>
							<Player showdown_name={round.p1} />
						</td>
						<td
							className={
								round.winner === round.p1 ? 'text-green' : 'text-red'
							}
						>
							{round.p1}
						</td>
						<td>{round.result}</td>
						<td
							className={
								round.winner === round.p2 ? 'text-green' : 'text-red'
							}
						>
							{round.p2}
						</td>
						<td className='py-1'>
							<Player showdown_name={round.p2} />
						</td>
					</tr>
				))}
			</tbody>
		</TableBase>
	);
};

export default TableTourResult;
