import React from 'react';
import { makeClassName } from '@/functions';
import ProgressBarStat from '../ProgressBarStat';

const calcStat = (stat, instance, oldGen) => {
	if (stat === 'hp') {
		// prettier-ignore
		return Math.floor(
            (
                (
                    instance.pokemon.hp * 2
                    + (oldGen
						? Math.floor(instance.hp_iv / 2) * 2 + 63
						: instance.hp_iv + instance.hp_ev / 4
					)
                ) * instance.level
            ) / 100 + instance.level + 10
        );
	}
	// prettier-ignore
	return Math.floor(
        (
			(
				(
					instance.pokemon[stat] * 2
                    + (oldGen
						? Math.floor(instance[`${stat}_iv`] / 2) * 2 + 63
						: instance[`${stat}_iv`] + instance[`${stat}_ev`] / 4
					)
				) * instance.level
			) / 100 + 5
        ) * (
            instance.nature && instance.nature[stat]
                ? 1 + (instance.nature[stat] * 0.1)
                : 1
        )
    );
};

const RowStat = ({ title, stat, instance, oldGen }) => {
	const natureStat = instance.nature ? instance.nature[stat] : 0;
	return (
		<tr>
			<td
				className={makeClassName(
					'text-left',
					natureStat === 1
						? 'text-green'
						: natureStat === -1
						? 'text-red'
						: null
				)}
			>
				{title}&nbsp;
				{natureStat === 1 ? '+' : natureStat === -1 ? <b>-</b> : null}
			</td>
			<td className="text-right">{instance.pokemon[stat]}</td>
			<td>
				<ProgressBarStat stat={instance.pokemon[stat]} />
			</td>
			<td className="text-right">{oldGen ? 252 : instance[`${stat}_ev`]}</td>
			<td className="text-right">
				{oldGen ? Math.floor(instance[`${stat}_iv`] / 2) : instance[`${stat}_iv`]}
			</td>
			<td className="text-right">{calcStat(stat, instance, oldGen)}</td>
		</tr>
	);
};

const TableInstanceStat = ({ instance, gen }) => {
	const oldGen = gen < 3;
	return (
		<table className="table table-stat table-inst-stat table-sm">
			<thead>
				<tr>
					<th className="text-left">Statistiques</th>
					<th className="text-right">Base</th>
					<th>{/* Progress bar stat */}</th>
					<th className="text-right">EVs</th>
					<th className="text-right">{oldGen ? 'DVs' : 'IVs'}</th>
					<th className="text-right">Valeur</th>
				</tr>
			</thead>
			<tbody>
				<RowStat title="PV" stat="hp" instance={instance} oldGen={oldGen} />
				<RowStat title="Attaque" stat="atk" instance={instance} oldGen={oldGen} />
				<RowStat title="Défense" stat="def" instance={instance} oldGen={oldGen} />
				<RowStat title="Atq Spé" stat="spa" instance={instance} oldGen={oldGen} />
				<RowStat title="Déf Spé" stat="spd" instance={instance} oldGen={oldGen} />
				<RowStat title="Vitesse" stat="spe" instance={instance} oldGen={oldGen} />
			</tbody>
		</table>
	);
};

export default TableInstanceStat;
