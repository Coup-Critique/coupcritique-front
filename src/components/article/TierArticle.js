// modules
import { useState } from 'react';
import Link from 'next/link';
import { Button } from 'semantic-ui-react';
// components
import Description from '@/components/elements/Description';
import PageWrapper from '@/components/PageWrapper';
import TablePokemonTierUsage from '@/components/table/TablePokemonTierUsage';
import TablePokemon from '@/components/table/TablePokemon';
import Resource from '@/components/elements/Resource';
import GenSelector from '@/components/GenSelector';
import GoBackButton from '@/components/GoBackButton';
import useStoreQuery from '@/hooks/useStoreQuery';
import useStateProps from '@/hooks/useStateProps';
import useStateWithGen from '@/hooks/useStateWithGen';

const defaultArray = [];
const TierArticle = props => {
	console.log(props);
	const [tier, setTier] = useStateWithGen(props.tier);
	const [pokemons, setPokemons] = useStateProps(props.pokemons || defaultArray);
	const [pokemonsTechnically, setPokemonsTechnically] = useStateProps(
		props.pokemonsTechnically || defaultArray
	);
	const [pokemonsBl, setPokemonsBl] = useStateProps(props.pokemonsBl || defaultArray);
	const [usages, setUsages] = useStateProps(props.usages || defaultArray);
	const [usagesTechnically, setUsagesTechnically] = useStateProps(
		props.usagesTechnically || defaultArray
	);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	if (!tier) return null;
	return (
		<PageWrapper
			title={tier.name}
			more
			className="tier-article"
			metadescription={`Retrouvez la liste des Pokémon du tier ${tier.name}`}
			metaimage={`tiers/${tier.gen}-${tier.shortName || tier.name}.png`}
		>
			<GoBackButton defaultUrl={'/entity/tiers/'} />
			<GenSelector
				availableGens={props.availableGens}
				redirectOnChange={'/entity/tiers/'}
			/>
			<Description
				entity={tier}
				keyResult="tier"
				putUrl={`tiers/${tier.id}`}
				handleUpdate={setTier}
			/>
			{!!tier.resources && tier.resources.length > 0 && (
				<div className="framed pb-0">
					<div className="h5">Ressources&nbsp;:</div>
					<ul className="resources">
						{tier.resources.map(resource => (
							<Resource key={resource.id} resource={resource} fromTier />
						))}
					</ul>
				</div>
			)}
			<Button
				color="blue"
				content="Voir les équipes du tiers"
				// className="mb-4"
				as={Link}
				href={`/entity/teams?tier=${tier.id}&gen=${tier.gen}`}
				icon="search"
			/>
			<div id="pagination-scroll-ref">
				{pokemons.length > 0 && (
					<TablePokemon
						pokemons={pokemons}
						setPokemons={setPokemons}
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				)}
				{usages.length > 0 && (
					<TablePokemonTierUsage
						tier={tier}
						usages={usages}
						setUsages={setUsages}
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				)}
			</div>
			{!pokemons.length && !usages.length && (
				<p>Aucun usage n'est disponible pour ce tier dans cette génération.</p>
			)}
			{pokemonsTechnically.length > 0 && (
				<div className="mt-6">
					<h3>Pokémon par technicité&nbsp;:</h3>
					<TablePokemon
						pokemons={pokemonsTechnically}
						setPokemons={setPokemonsTechnically}
					/>
				</div>
			)}
			{usagesTechnically.length > 0 && (
				<div className="mt-6">
					<h3>Pokémon par technicité&nbsp;:</h3>
					<TablePokemonTierUsage
						usages={usagesTechnically}
						setUsages={setUsagesTechnically}
					/>
				</div>
			)}
			{pokemonsBl.length > 0 && (
				<div className="mt-6">
					<h3>Pokémon Border Line (bannis du tier inférieur)&nbsp;:</h3>
					<TablePokemon pokemons={pokemonsBl} setPokemons={setPokemonsBl} />
				</div>
			)}
		</PageWrapper>
	);
};
export default TierArticle;
