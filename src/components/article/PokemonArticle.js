// modules
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Loader, Menu, Popup, Segment } from 'semantic-ui-react';
// components
import PageWrapper from '@/components/PageWrapper';
import ArtPokemon from '@/components/elements/ArtPokemon';
import TableStat from '@/components/table/TableStat';
import TableTeam from '@/components/table/TableTeam';
import Tier from '@/components/elements/Tier';
import Type from '@/components/elements/Type';
import Ability from '@/components/elements/Ability';
import SpritePokemon from '@/components/elements/SpritePokemon';
import PokemonSetManager from '@/components/sections/PokemonSetManager';
import EvolutionTree from '@/components/elements/EvolutionTree';
import WeaknessesPopup from '@/components/elements/WeaknessesPopup';
import Description from '@/components/elements/Description';
import UsageStats from '@/components/elements/UsageStats';
import GenSelector from '@/components/GenSelector';
import SectionAds from '@/components/sections/SectionAds';
// functions
import useTableFetch from '@/hooks/useTableFetch';
import { formatFileName, formatNumbers, getMetaName, getName } from '@/functions';
import useStateWithGen from '@/hooks/useStateWithGen';

const PokemonArticle = props => {
	const router = useRouter();
	const gen = useSelector(state => state.gen);
	const darkMode = useSelector(state => state.darkMode);
	const [pokemon, setPokemon] = useStateWithGen(props.pokemon || null);
	// prettier-ignore
	const { usage, usages, availableGens, weaknesses, pokemonSets, forms, mainPokemon } = props;

	// prettier-ignore
	const {
		table: teams,
		setTable: setTeams,
		loading: loadingTeams,
		handleLoad: loadTeams,
		nbPages: nbTeamsPages,
		query: teamsQuery,
		handlePage: handleTeamsPage,
		handleSort: handleTeamsSort,
	} = useTableFetch(
		'teams', 
		{ 
			loadUrl: pokemon ? `teams/certified/pokemons/${props.redirectedId || mainPokemon.id}` : null,
			saveQueryToStore: false,
		}
	);

	// const handleChangeForm = (e, { name: id }) => router.push(`/entity/pokemons/${id}`);

	if (!pokemon || !pokemon.id) return null;
	const name = getName(pokemon);
	const metaName = getMetaName(pokemon);
	return (
		<PageWrapper
			more
			className="pokemon article"
			title={`Fiche stratégique de ${name}`}
			metatitle={`Fiche stratégique de : ${metaName}`}
			metadescription={
				`Regarder la fiche stratégique du Pokémon ${metaName}` +
				(pokemon.tier.name !== 'Untiered' ? ' en ' + pokemon.tier.name : '') +
				". Vous y retrouverez ces statisques d'utilisations dans les tiers dans lesquels il est jouable, ainsi que différent set avec lesquels le jouer. Vous pourrez aussi y consulter les équipe certifiées l'incluant, partagée sur le site."
			}
			metaimage={`pokemons/${formatFileName(pokemon.name)}.png`}
			goingBack="/entity/pokemons/"
			action={
				<GenSelector
					availableGens={availableGens}
					redirectOnChange="/entity/pokemons/"
				/>
			}
		>
			{forms.length > 1 && (
				<Menu
					color="orange"
					inverted
					className="fake-tab mt-0 mb-4 d-inline-flex"
				>
					{forms.map(form => (
						<Menu.Item
							key={form.id}
							name={form.id.toString()}
							active={form.id === pokemon.id}
							href={`/entity/pokemons/${form.id}`}
							as={Link}
							content={
								<>
									<SpritePokemon
										pokemon={form}
										noLink
										className="small"
									/>
									{form.nom || form.name}
								</>
							}
							// onClick={handleChangeForm}
						/>
					))}
				</Menu>
			)}
			<div className="row">
				<div className="col-12 col-md-6 col-lg-5 mb-4">
					<ArtPokemon pokemon={pokemon} />
				</div>
				<div className="col-12 col-md-6 col-lg-3 mb-4">
					<div className="font-weight-medium">Type&nbsp;:</div>
					<Popup
						on="hover"
						basic
						position="bottom left"
						className={darkMode ? 'dark-mode' : undefined}
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
					<EvolutionTree pokemon={pokemon} />
					{!pokemon.preEvo &&
						pokemon.evolutions.length < 1 &&
						!!pokemon.base_form && (
							<EvolutionTree pokemon={pokemon.base_form} />
						)}
				</div>
				<div className="col-12 col-lg-4 col-xl-3 mb-4">
					<div className="font-weight-medium">Statistiques&nbsp;:</div>
					<TableStat pokemon={pokemon} />
				</div>
			</div>
			<div className="mb-4">
				<Button
					color="blue"
					content="Voir les capacités du Pokémon"
					aria-label={`Voir les capacités du Pokémon ${
						pokemon.nom || pokemon.name
					}`}
					as={Link}
					href={`/entity/moves/pokemon/${pokemon.id}`}
					icon="search"
				/>
				<Description
					json
					entity={pokemon}
					keyResult="pokemon"
					putUrl={`pokemons/${pokemon.id}`}
					handleUpdate={setPokemon}
				/>
			</div>
			{!!props.redirectedGen && (
				<Segment
					inverted
					size="large"
					color="orange"
					className="mb-4 font-weight-bold"
					content={`Le Pokémon n'est pas disponible dans cette génération. Vous visualisez ici les statistiques d'utilisation de la dernière génération dans laquelle ce Pokémon était disponible : ${props.redirectedGen}G`}
				/>
			)}
			<section>
				<h2>Statistiques d'utilisation de {name}</h2>
				<UsageStats usages={usages} />
			</section>
			<section>
				<h2>Sets stratégiques de {name}</h2>
				<PokemonSetManager
					pokemon={mainPokemon}
					pokemonSets={pokemonSets}
					tiers={props.tiers}
					redirectedId={props.redirectedId}
					redirectedGen={props.redirectedGen}
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
