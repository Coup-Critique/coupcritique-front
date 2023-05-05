// modules
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { formateName } from '@/functions';
// hooks
import useFetch from '@/hooks/useFetch';
import Description from '@/components/elements/Description';
import GenSelector from '@/components/GenSelector';
// components
import GoBackButton from '@/components/GoBackButton';
import PageWrapper from '@/components/PageWrapper';
import TablePokemonWithUsages from '@/components/table/TablePokemonWithUsages';
import useStoreQuery from '@/hooks/useStoreQuery';

const AbilityArticle = ({ result }) => {
	const { id } = useParams();
	const [resultPokemons, load, loading] = useFetch();
	const [ability, setAbility] = useState((result && result.ability) || null);
	const [pokemons, setPokemons] = useState((result && result.pokemons) || []);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery();

	useEffect(() => {
		if (!result.pokemons) {
			load({ url: `pokemons/ability/${id}` });
		}
	}, [id]);

	useEffect(() => {
		if (result && result.success) {
			setAbility(result.ability);
		}
	}, [result]);

	useEffect(() => {
		if (resultPokemons && resultPokemons.success) {
			setPokemons(resultPokemons.pokemons);
		}
	}, [resultPokemons]);

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
				availableGens={result.availableGens}
				redirectOnChange={'/entity/abilities/'}
			/>
			<Description
				entity={ability}
				keyResult="ability"
				putUrl={`abilities/${ability.id}`}
				handleUpdate={setAbility}
			/>
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active inline="centered" />
				) : (
					pokemons.length > 0 && (
						<TablePokemonWithUsages
							pokemons={pokemons}
							setPokemons={setPokemons}
							usageKey="usageAbility"
							query={query}
							updateQuery={updateQuery}
							setQueryParam={setQueryParam}
						/>
					)
				)}
			</div>
		</PageWrapper>
	);
};
export default AbilityArticle;
