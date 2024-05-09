import { TableBase } from './Table';

const TableTourResult = ({ results }) => {
	return (
		<TableBase
			cols={[
				{ key: 'p1', content: 'Joueur 1' },
				{
					key: 'r',
					content: 'Résultat',
				},
				{ key: 'p2', content: 'Joueur 2' },
			]}
		>
			<tbody>
				{results.map((result, i) => (
					<tr key={i}>
						<td
							className={result.w === result.p1 ? 'text-green' : 'text-red'}
						>
							{result.p1}
						</td>
						<td>{result.r}</td>
						<td
							className={result.w === result.p2 ? 'text-green' : 'text-red'}
						>
							{result.p2}
						</td>
					</tr>
				))}
			</tbody>
		</TableBase>
	);
};

export default TableTourResult;
