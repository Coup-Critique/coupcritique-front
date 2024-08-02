import { Icon } from 'semantic-ui-react';
import Player from '../elements/Player';
import { TableBase } from './Table';

const TableTourCycles = ({ cycles, circuitTour }) => {
	return (
		<TableBase
			cols={[
				{ key: 'player', content: 'Joueur', colSpan: 2 },
				{ key: 'alt', content: 'Showdown Alt' },
				{ key: 'rank', content: 'Rang' },
				{ key: 'elo', content: 'ELO' },
				{ key: 'gxe', content: 'GXE' },
				{ key: 'glicko', content: 'Glicko-1' },
				{ key: 'qualifpoints', content: 'Points Qualificatifs' },
				{ key: 'points', content: 'Points Circuit' },
			]}
		>
			<tbody>
				{cycles.map((cycle, i) => (
					<tr key={i}>
						<td className="py-1">
							<Player name={cycle.player1} />
						</td>
						<td>{cycle.player}</td>
						<td>{cycle.alt}</td>
						<td>{cycle.rank}</td>
						<td>{cycle.elo}</td>
						<td>{cycle.gxe}</td>
						<td>{cycle.glicko}</td>
						<td>{cycle.qualifpoints}</td>
						<td>{cycle.points}</td>
						{/* <td>{cycle.a}</td> */}
					</tr>
				))}
			</tbody>
		</TableBase>
	);
};

export default TableTourCycles;
