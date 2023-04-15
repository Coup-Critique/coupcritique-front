// modules
import React, { useEffect, useState } from 'react';
import Description from '../../elements/Description';
// components
import PageWrapper from '../../PageWrapper';
import TablePokemonTierUsage from '../../table/TablePokemonTierUsage';
import TablePokemon from '../../table/TablePokemon';
import Resource from '../../elements/Resource';
import GenSelector from '../../GenSelector';
import GoBackButton from '../../GoBackButton';
import useStoreQuery from '../../../hooks/useStoreQuery';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const TierArticle = ({ result }) => {
	const [tier, setTier] = useState();
	const [pokemons, setPokemons] = useState([]);
	const [pokemonsTechnically, setPokemonsTechnically] = useState([]);
	const [pokemonsBl, setPokemonsBl] = useState([]);
	const [usages, setUsages] = useState([]);
	const [usagesTechnically, setUsagesTechnically] = useState([]);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	useEffect(() => {
		if (result && result.tier && result.tier.id) {
			setTier(result.tier);
			if (result.pokemons) {
				setPokemons(result.pokemons);
			}
			if (result.pokemonsTechnically) {
				setPokemonsTechnically(result.pokemonsTechnically);
			}
			if (result.pokemonsBl) {
				setPokemonsBl(result.pokemonsBl);
			}
			if (result.usages) {
				setUsages(result.usages);
			}
			if (result.usagesTechnically) {
				setUsagesTechnically(result.usagesTechnically);
			}
		}
	}, [result]);

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
				availableGens={result.availableGens}
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
				to={`/entity/teams?tier=${tier.id}&gen=${tier.gen}`}
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
