// modules
import { useEffect, useState } from 'react';
import { formateName } from '@/functions';
// hooks
import Description from '@/components/elements/Description';
import GenSelector from '@/components/GenSelector';
// components
import GoBackButton from '@/components/GoBackButton';
import PageWrapper from '@/components/PageWrapper';
import TablePokemonWithUsages from '@/components/table/TablePokemonWithUsages';
import useStoreQuery from '@/hooks/useStoreQuery';

const AbilityArticle = props => {
	const [ability, setAbility] = useState(props.ability || null);
	const [pokemons, setPokemons] = useState(props.pokemons || []);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery();

	if (!ability || !ability.id) return null;
	return (
		<PageWrapper
			title={ability.nom || formateName(ability.name)}
			metatitle={
				'Le talent Pokémon : ' + (ability.nom || formateName(ability.name))
			}
			metadescription={ability.description}
		>
			<GoBackButton />
			<GenSelector
				availableGens={props.availableGens}
				redirectOnChange={'/entity/abilities/'}
			/>
			<Description
				entity={ability}
				keyResult="ability"
				putUrl={`abilities/${ability.id}`}
				handleUpdate={setAbility}
			/>
			<div id="pagination-scroll-ref">
				{pokemons.length > 0 && (
					<TablePokemonWithUsages
						pokemons={pokemons}
						setPokemons={setPokemons}
						usageKey="usageAbility"
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				)}
			</div>
		</PageWrapper>
	);
};
export default AbilityArticle;
