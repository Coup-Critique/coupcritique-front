// module

import { TableBase } from '@/components/table/Table';
import SpritePokemon from '@/components/elements/SpritePokemon';
import Pokemon from '@/components/elements/Pokemon';
import Type from '@/components/elements/Type';
import Ability from '@/components/elements/Ability';
import Tier from '@/components/elements/Tier';
import { formatNumbers } from '@/functions';
import useTableSorter from '@/hooks/useTableSorter';

const TablePokemonTierUsage = ({ usages = [], setUsages, tier, query, updateQuery }) => {
	const [handleSort, { key: sortedCol, orderDirection }] = useTableSorter(
		usages,
		setUsages,
		{
			pokemon: ({ pokemon }) => pokemon.nom || pokemon.name,
			type_1: ({ pokemon }) => pokemon.type_1.nom || pokemon.type_1.name,
			tier: ({ pokemon }) =>
				pokemon.tier
					? pokemon.tier.sortOrder
					  || (pokemon.tier.name === 'Untiered' ? null : pokemon.tier.name)
					: null,
			hp: ({ pokemon }) => pokemon.hp,
			atk: ({ pokemon }) => pokemon.atk,
			def: ({ pokemon }) => pokemon.def,
			spa: ({ pokemon }) => pokemon.spa,
			spd: ({ pokemon }) => pokemon.spd,
			spe: ({ pokemon }) => pokemon.spe,
		},
		undefined,
		query,
		updateQuery
	);

	return (
		<TableBase
			className={'table-pokemon table-sticky'}
			cols={[
				{ key: 'percent', content: 'Usage', sortable: true },
				' ',
				{ key: 'pokemon', content: 'Pokémon', sortable: true },
				{ key: 'type_1', content: 'Type', sortable: true },
				{ key: 'ability', content: 'Talent', sortable: false },
				{ key: 'tier', content: 'Tier', sortable: true },
				{ key: 'hp', content: 'PV', sortable: true },
				{ key: 'atk', content: 'Attaque', sortable: true },
				{ key: 'def', content: 'Défense', sortable: true },
				{ key: 'spa', content: 'Atq\u00A0Spé', sortable: true },
				{ key: 'spd', content: 'Déf\u00A0Spé', sortable: true },
				{ key: 'spe', content: 'Vitesse', sortable: true },
			]}
			sortable
			sortedCol={sortedCol}
			orderDirection={orderDirection}
			handleSort={handleSort}
		>
			<tbody>
				{usages.map((usage, i) => (
					<tr
						key={i}
						// className={
						// 	!tier
						// 	|| (usage.pokemon.tier && usage.pokemon.tier.id == tier.id)
						// 		? ''
						// 		: 'not-in'
						// }
					>
						<td>
							{!!usage.percent && (
								<em className="percent">
									{formatNumbers(usage.percent, 3)}&nbsp;%
								</em>
							)}
						</td>
						<td>
							<SpritePokemon pokemon={usage.pokemon} />
						</td>
						<td>
							<Pokemon pokemon={usage.pokemon} />
						</td>
						<td className="text-left">
							<Type type={usage.pokemon.type_1} />
							{!!usage.pokemon.type_2 && (
								<Type type={usage.pokemon.type_2} />
							)}
						</td>
						<td>
							{!!usage.pokemon.ability_1 && (
								<Ability ability={usage.pokemon.ability_1} />
							)}
							{!!usage.pokemon.ability_2 && (
								<Ability ability={usage.pokemon.ability_2} />
							)}
							{!!usage.pokemon.ability_hidden && (
								<Ability ability={usage.pokemon.ability_hidden} />
							)}
						</td>
						<td>
							{usage.pokemon.tier ? (
								<Tier
									displayGen={false}
									tier={usage.pokemon.tier}
									technically={usage.pokemon.technically}
								/>
							) : (
								'-'
							)}
						</td>
						<td>{usage.pokemon.hp}</td>
						<td>{usage.pokemon.atk}</td>
						<td>{usage.pokemon.def}</td>
						<td>{usage.pokemon.spa}</td>
						<td>{usage.pokemon.spd}</td>
						<td>{usage.pokemon.spe}</td>
					</tr>
				))}
			</tbody>
		</TableBase>
	);
};

export default TablePokemonTierUsage;
