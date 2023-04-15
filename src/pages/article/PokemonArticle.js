// modules
import React, { useEffect, useState } from 'react';
import { Button, Loader, Menu, Popup } from 'semantic-ui-react';
// components
import PageWrapper from '../../PageWrapper';
import ArtPokemon from '../../elements/ArtPokemon';
import TableStat from '../../table/TableStat';
import TableTeam from '../../table/TableTeam';
import Tier from '../../elements/Tier';
import Type from '../../elements/Type';
import Ability from '../../elements/Ability';
import SpritePokemon from '../../elements/SpritePokemon';
import PokemonSetManager from '../../sections/PokemonSetManager';
import EvolutionTree from '../../elements/EvolutionTree';
import WeaknessesPopup from '../../elements/WeaknessesPopup';
import Description from '../../elements/Description';
// functions
import useDarkMode, { DARK_MODE_KEY } from '../../../hooks/useDarkMode';
import { formateName, formatFileName, formatNumbers } from '../../../functions';
import UsageStats from '../../elements/UsageStats';
import GenSelector from '../../GenSelector';
import { useSelector } from 'react-redux';
import GoBackButton from '../../GoBackButton';
import { Link, useHistory } from 'react-router-dom';
import SectionAds from '../../sections/SectionAds';
import useTableFetch from '../../../hooks/useTableFetch';

const PokemonArticle = ({ result }) => {
	const history = useHistory();
	const gen = useSelector(state => state.gen);
	const [darkMode] = useDarkMode();
	const [pokemon, setPokemon] = useState((result && result.pokemon) || null);

	const {
		table: teams,
		setTable: setTeams,
		loading: loadingTeams,
		handleLoad: loadTeams,
		nbPages: nbTeamsPages,
		query: teamsQuery,
		handlePage: handleTeamsPage,
		handleSort: handleTeamsSort,
	} = useTableFetch('teams', {
		loadUrl: result.pokemon
			? `teams/certified/pokemons/${
					result.inherit ? result.pokemon.base_form.id : result.pokemon.id
			  }`
			: null,
		saveQueryToStore: false,
	});

	useEffect(() => {
		if (result && result.success) {
			setPokemon(result.pokemon);
		}
	}, [result.pokemon]);

	const handleChangeForm = (e, { name: id }) => history.push(`/entity/pokemons/${id}`);

	if (!pokemon || !pokemon.id) return null;
	const { usages, weaknesses, pokemonSets } = result;
	const refTier = pokemon.tier.parent ? pokemon.tier.parent : pokemon.tier;
	const usage = usages ? usages.find(usage => usage.tier.id === refTier.id) : null;
	let forms;
	if (pokemon.base_form) {
		forms = pokemon.base_form.forms
			.map(form => form || pokemon)
			.concat(pokemon.forms);
		forms.unshift(pokemon.base_form);
	} else {
		forms = pokemon.forms.slice();
		forms.unshift(pokemon);
	}
	const name = pokemon.nom || formateName(pokemon.name);
	return (
		<PageWrapper
			more
			className="pokemon article"
			title={`Fiche stratégique de ${name}`}
			metatitle={`Fiche stratégique de : ${name}`}
			metadescription={
				`Regarder la fiche stratégique du Pokémon ${name}`
				+ (pokemon.tier.name !== 'Untiered' ? ' en ' + pokemon.tier.name : '')
				+ ". Vous y retrouverez ces statisques d'utilisations dans les tiers dans lesquels il est jouable, ainsi que différent set avec lesquels le jouer. Vous pourrez aussi y consulter les équipe certifiées l'incluant, partagée sur le site."
			}
			metaimage={`pokemons/${formatFileName(pokemon.name)}.png`}
		>
			<GoBackButton />
			<GenSelector
				availableGens={result.availableGens}
				redirectOnChange={'/entity/pokemons/'}
			/>
			{forms.length > 1 && (
				<Menu color="orange" inverted className="fake-tab mt-0 mb-4">
					{forms.map(form => (
						<Menu.Item
							key={form.id}
							name={form.id.toString()}
							active={form.id === pokemon.id}
							content={
								<>
									<SpritePokemon pokemon={form} isLink={false} />
									{form.nom || form.name}
								</>
							}
							onClick={handleChangeForm}
						/>
					))}
				</Menu>
			)}
			<div className="row mb-3">
				<div className="col-12 col-md-6 col-lg-5 mb-4 vertically-centered">
					<ArtPokemon pokemon={pokemon} />
				</div>
				<div className="col-12 col-md-6 col-lg-3 mb-4 vertically-centered">
					<div className="font-weight-medium">Type&nbsp;:</div>
					<Popup
						on="hover"
						basic
						position="bottom left"
						className={darkMode ? DARK_MODE_KEY : undefined}
						disabled={!weaknesses || !weaknesses.length}
						hoverable
						content={<WeaknessesPopup weaknesses={weaknesses} />}
						trigger={
							<div className="mb-4 popup-types">
								<Type type={pokemon.type_1} />
								{!!pokemon.type_2 && <Type type={pokemon.type_2} />}
							</div>
						}
					/>
					{gen > 2 && (
						<div className="mb-4-not-last">
							<div className="font-weight-medium">Talent&nbsp;:</div>
							<ul>
								{!!pokemon.ability_1 && (
									<AbilityItem
										ability={pokemon.ability_1}
										usageAbilities={usage && usage.usageAbilities}
									/>
								)}
								{!!pokemon.ability_2 && (
									<AbilityItem
										ability={pokemon.ability_2}
										usageAbilities={usage && usage.usageAbilities}
									/>
								)}
								{!!pokemon.ability_hidden && (
									<AbilityItem
										ability={pokemon.ability_hidden}
										usageAbilities={usage && usage.usageAbilities}
									/>
								)}
							</ul>
						</div>
					)}
					{!!pokemon.tier && (
						<div className="mb-4-not-last">
							<TierItem
								tier={pokemon.tier}
								technically={pokemon.technically}
								usage={usage}
							/>
						</div>
					)}
					{/* {!!pokemon.base_form && (
						<div className="mb-3-not-last">
							<div className="font-weight-medium">Autres formes&nbsp;:</div>
							<div className="row mx-0">
								<div className="col col-sprite">
									<SpritePokemon pokemon={pokemon.base_form} />
								</div>
								{pokemon.base_form.forms.length > 0
									&& pokemon.base_form.forms.map(form =>
										form ? (
											<div key={form.id} className="col col-sprite">
												<SpritePokemon pokemon={form} />
											</div>
										) : null
									)}
							</div>
						</div>
					)} */}
					{/* {pokemon.forms.length > 0 && (
						<div className="mb-3-not-last">
							<div className="font-weight-medium">Autres formes&nbsp;:</div>
							<div className="row mx-0">
								{pokemon.forms.map(form =>
									form ? (
										<div key={form.id} className="col col-sprite">
											<SpritePokemon pokemon={form} />
										</div>
									) : null
								)}
							</div>
						</div>
					)} */}
					<EvolutionTree pokemon={pokemon} />
					{!pokemon.preEvo
						&& pokemon.evolutions.length < 1
						&& !!pokemon.base_form && (
							<EvolutionTree pokemon={pokemon.base_form} />
						)}
				</div>
				<div className="col-12 col-lg-4 col-xl-3 mb-4 vertically-centered">
					<div className="font-weight-medium">Statistiques&nbsp;:</div>
					<TableStat pokemon={pokemon} />
				</div>
			</div>
			<Button
				color="blue"
				content="Voir les capacités du Pokémon"
				className="mb-4"
				as={Link}
				to={`/entity/moves/pokemon/${pokemon.id}`}
				icon="search"
			/>
			<Description
				json
				entity={pokemon}
				keyResult="pokemon"
				putUrl={`pokemons/${pokemon.id}`}
				handleUpdate={setPokemon}
			/>
			<section>
				<h2>Statistiques d'utilisation de {name}</h2>
				<UsageStats usages={usages} />
			</section>
			<section>
				<h2>Sets stratégiques de {name}</h2>
				<PokemonSetManager
					pokemon={result.inherit ? pokemon.base_form : pokemon}
					sets={pokemonSets}
				/>
			</section>
			<SectionAds />
			<section id="pagination-scroll-ref">
				<h2>Équipes certifiées avec {name}</h2>
				{loadingTeams ? (
					<Loader active inline="centered" />
				) : teams.length > 0 ? (
					<TableTeam
						teams={teams}
						setTeams={setTeams}
						handleLoad={loadTeams}
						handleSort={handleTeamsSort}
						handlePage={handleTeamsPage}
						query={teamsQuery}
						nbPages={nbTeamsPages}
					/>
				) : (
					<p>Aucune équipe certifiée n'est disponible pour ce Pokémon.</p>
				)}
			</section>
		</PageWrapper>
	);
};

const TierItem = ({ tier, technically, usage }) => (
	<>
		<span className="font-weight-medium">Tier&nbsp;:</span>{' '}
		<Tier tier={tier} technically={technically} displayGen={false} />{' '}
		{!!usage && <em className="percent">{formatNumbers(usage.percent, 3)}&nbsp;%</em>}
	</>
);

const AbilityItem = ({ ability, usageAbilities }) => {
	// prettier-ignore
	const usageAbility = usageAbilities && usageAbilities.find((usageAbility) => usageAbility.ability.id === ability.id);

	return (
		<li>
			- <Ability ability={ability} />
			{!!usageAbility && (
				<em className="percent d-inline-block ml-2">
					{formatNumbers(usageAbility.percent, 3)}&nbsp;%
				</em>
			)}
		</li>
	);
};

export default PokemonArticle;
