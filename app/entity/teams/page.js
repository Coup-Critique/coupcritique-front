// modules
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Form, Loader, Segment } from 'semantic-ui-react';
import useActions from '@/hooks/useActions';
// components
import FormSearch from '@/components/forms/FormSearch';
import RadioFilterForm from '@/components/forms/RadioFilterForm';
import PageWrapper from '@/components/PageWrapper';
import TableTeam from '@/components/table/TableTeam';
import { manageFetch } from '@/hooks/useFetch';
import { setTiers as setTiersAction } from '@/reducers/tiers';
import { setTags as setTagsAction } from '@/reducers/tags';
import TiersField from '@/components/fields/TiersField';
import DropdownMultipleSelectField from '@/components/fields/DropdownMultipleSelectField';
import SectionAds from '@/components/sections/SectionAds';
import useTableFetch from '@/hooks/useTableFetch';

const defaultArray = [];
const TeamList = props => {
	const dispatch = useDispatch();
	const filterRef = useRef();
	const searchRef = useRef();

	const {
		table,
		setTable,
		loading,
		handleLoad,
		nbPages,
		query,
		setQuery,
		setQueryParam,
		handlePage,
		handleSort,
	} = useTableFetch('teams', { loadUrl: 'teams' }, props.teams, props.nbPages);

	const tiers = useSelector(state => props.tiers || state.tiers);
	const tags = useSelector(state => props.tags || state.tags);
	const [setTiers, setTags] = useActions(dispatch, [setTiersAction, setTagsAction]);
	const [checkedGen, setCheckedGen] = useState(query.gen);
	const [checkedTier, setCheckedTier] = useState(query.tier);
	const [checkedTags, setCheckedTags] = useState(
		query.tags
			? Array.isArray(query.tags)
				? query.tags
				: query.tags.split(',')
			: defaultArray
	);
	const [certified, setCertified] = useState(query.certified);
	// const [displayFilters, setDisplayFilters] = useState(false);

	useEffect(() => {
		if (props.tiers?.length) {
			setTiers(props.tiers);
		}
		if (props.tags?.length) {
			setTags(props.tags);
		}
	}, []);

	useEffect(() => {
		if (query.tier !== checkedTier) {
			setCheckedTier(query.tier);
		}
	}, [query.tier]);

	useEffect(() => {
		if (!query.tags && checkedTags.length) {
			setCheckedTags(defaultArray);
		}
	}, [query.tags]);

	const handleSubmitFilters = e => {
		e.preventDefault();
		setQuery({
			...query,
			certified,
			tier: checkedTier,
			gen: checkedGen,
			tags: checkedTags,
			page: 1,
		});
		if (searchRef.current) {
			searchRef.current.ref.current.click();
		}
	};

	const handleSearch = search => {
		setQueryParam('search', search);
		if (filterRef.current) {
			filterRef.current.ref.current.click();
		}
	};

	const handleTier = useCallback(
		(tierId, gen) => {
			setCheckedTier(tierId);
			setCheckedGen(gen);
		},
		[setCheckedTier, setCheckedGen]
	);

	const handleTags = useCallback(
		(e, { value }) => setCheckedTags(value),
		[setCheckedTags]
	);

	const handleReset = e => {
		e.preventDefault();
		setCertified('');
		setCheckedTier(undefined);
		setCheckedGen(undefined);
		setCheckedTags(defaultArray);
		setQuery({ page: 1 });
	};

	return (
		<PageWrapper
			title="Équipes stratégiques"
			metadescription="Retrouvez des équipes viable en stratégie Pokémon, que ce soit sur le simulateur Pokémon Showdown ou sur console. Choisissez votre tier comme le VGC ou l'Overused et vos critères comme une équipe hyper offense."
			more
			className="team-list"
			action={
				<Button
					as={Link}
					href="/entity/teams/create"
					icon="plus"
					color="orange"
					content="Proposer une équipe"
					size="large"
				/>
			}
		>
			<SectionAds />
			<RadioFilterForm
				name="certified"
				label="Filtrer par"
				value={certified || ''}
				onChange={(e, { value }) => setCertified(value)}
				fields={[
					{ label: 'Toutes', value: '' },
					{ label: 'Certifiées', value: '1' },
					{ label: 'Non certifiées', value: '0' },
					{ label: "Code d'emprunt", value: 'team_id' },
				]}
			/>
			<Form onSubmit={handleSubmitFilters} className="list-filter">
				<div className="d-flex mb-4">
					<TiersField
						label="Tier"
						tiers={tiers}
						currentTier={checkedTier}
						currentGen={checkedGen}
						handleChange={handleTier}
						className="flex-grow-1"
					/>
				</div>
				<div className="row mb-0">
					<div className="col-12 col-lg-6 d-flex mb-3 mb-lg-0">
						<DropdownMultipleSelectField
							label="Catégories"
							name="tags"
							className="flex-grow-1"
							options={tags}
							value={checkedTags}
							onChange={handleTags}
						/>
					</div>
					<div className="col-12 col-lg-6 d-flex flex-column mb-3 mb-lg-0">
						<FormSearch
							className="mb-3"
							label="Rechercher"
							placeholder={
								"Un pokemon, une catégorie, un nom d'équipe, un utilisateur, un code d'emprunt"
							}
							handleSearch={handleSearch}
							defaultValue={query.search}
							searchRef={searchRef}
						/>
						<em>
							&gt; Vous pouvez cumuler les recherches en les séparant par
							des virgules.
						</em>
					</div>
				</div>
				<div>
					<Button
						color="orange"
						content="Valider le filtre"
						type="submit"
						ref={filterRef}
					/>
					<Button
						color="blue"
						icon="refresh"
						content="Réinitialiser le filtre"
						onClick={handleReset}
						className="ml-2"
					/>
				</div>
			</Form>
			<div id="pagination-scroll-ref">
				{table.length > 0 ? (
					<TableTeam
						teams={table}
						setTeams={setTable}
						handleLoad={handleLoad}
						handleSort={handleSort}
						handlePage={handlePage}
						query={query}
						nbPages={nbPages}
					/>
				) : loading ? (
					<Loader active={loading} inline="centered" />
				) : (
					<p>Aucune équipe n'a été trouvée.</p>
				)}
			</div>
		</PageWrapper>
	);
};

export async function getServerSideProps() {
	// TODO prendre en compte la pagination !
	// Plus le filtre ne fonctionne plus
	// Plus il faut se login 2 fois...
	try {
		const { teams, nbPages } = await manageFetch(`teams`);
		const { tags } = await manageFetch(`tags`);
		const { tiers } = await manageFetch(`tiers-select`);
		return { props: { teams, tags, tiers, nbPages } };
	} catch (e) {
		console.error(e);
		return { props: { teams: null } };
	}
}

export default TeamList;
