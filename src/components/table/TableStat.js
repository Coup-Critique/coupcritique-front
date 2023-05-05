import React from 'react';
import ProgressBarStat from '@/components/ProgressBarStat';

const TableStat = ({ pokemon }) => (
	<table className="table table-stat table-sm">
		<tbody>
			<RowStat title="PV" stat="hp" pokemon={pokemon} />
			<RowStat title="Attaque" stat="atk" pokemon={pokemon} />
			<RowStat title="Défense" stat="def" pokemon={pokemon} />
			<RowStat title="Atq Spé" stat="spa" pokemon={pokemon} />
			<RowStat title="Déf Spé" stat="spd" pokemon={pokemon} />
			<RowStat title="Vitesse" stat="spe" pokemon={pokemon} />
		</tbody>
	</table>
);

const RowStat = ({ title, stat, pokemon }) => (
	<tr>
		<th className="text-right">{title}</th>
		<td className="text-right">{pokemon[stat]}</td>
		<td>
			<ProgressBarStat stat={pokemon[stat]} />
		</td>
	</tr>
);

export default TableStat;
