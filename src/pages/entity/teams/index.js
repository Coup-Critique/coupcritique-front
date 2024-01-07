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
import useFetch from '@/hooks/useFetch';
import { setTiers as setTiersAction } from '@/reducers/tiers';
import { setTags as setTagsAction } from '@/reducers/tags';
import TiersField from '@/components/fields/TiersField';
import DropdownMultipleSelectField from '@/components/fields/DropdownMultipleSelectField';
import SectionAds from '@/components/sections/SectionAds';
import useTableFetch from '@/hooks/useTableFetch';

const TeamList = () => {
	const dispatch = useDispatch();
	const tiers = useSelector(state => state.tiers);
	const tags = useSelector(state => state.tags);
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
	} = useTableFetch('teams');

	const [resultTiers, loadTiers, loadingTiers] = useFetch();
	const [resultTags, loadTags, loadingTags] = useFetch();
	const [setTiers, setTags] = useActions(dispatch, [setTiersAction, setTagsAction]);

	const [certified, setCertified] = useState(query.certified);
	const [checkedTier, setCheckedTier] = useState(query.tier);
	const [checkedGen, setCheckedGen] = useState(query.gen);
	const [checkedTags, setCheckedTags] = useState(
		query.tags ? (Array.isArray(query.tags) ? query.tags : query.tags.split(',')) : []
	);
	// const [displayFilters, setDisplayFilters] = useState(false);

	useEffect(() => {
		if (!Object.keys(tiers).length) {
			loadTiers({ url: 'tiers-select' });
		}
		if (!tags.length) {
			loadTags({ url: 'tags' });
		}
	}, []);

	useEffect(() => {
		if (query.tier !== checkedTier) {
			setCheckedTier(query.tier);
		}
	}, [query.tier]);

	useEffect(() => {
		if (!query.tags && checkedTags.length) {
			setCheckedTags([]);
		}
	}, [query.tags]);

	useEffect(() => {
		if (resultTiers && resultTiers.success) {
			setTiers(resultTiers.tiers);
		}
	}, [resultTiers]);

	useEffect(() => {
		if (resultTags && resultTags.success) {
			setTags(resultTags.tags);
		}
	}, [resultTags]);

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
		setCheckedTags([]);
		setQuery({ page: 1 });
	};

	return (
		<PageWrapper
			title="Équipes stratégiques"
			metadescription="Retrouvez des équipes viable en stratégie Pokémon, que ce soit sur le simulateur Pokémon Showdown ou sur console. Choisissez votre tier comme le VGC ou l'Overused et vos critères comme une équipe hyper offense."
			more
			className="team-list"
		>
			<div className="btn-wrapper text-center mb-4">
				<Button
					as={Link}
					href="/entity/teams/create"
					icon="plus"
					color="orange"
					content="Proposer une équipe"
					size="large"
				/>
			</div>
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
					{loadingTiers ? (
						<Loader active inline="centered" />
					) : (
						<TiersField
							label="Tier"
							tiers={tiers}
							currentTier={checkedTier}
							currentGen={checkedGen}
							handleChange={handleTier}
							className="flex-grow-1"
						/>
					)}
				</div>
				<div className="row mb-0">
					<div className="col-12 col-lg-6 d-flex mb-3 mb-lg-0">
						{loadingTags ? (
							<Loader active inline="centered" />
						) : (
							<DropdownMultipleSelectField
								label="Catégories"
								name="tags"
								className="flex-grow-1"
								options={tags}
								value={checkedTags}
								onChange={handleTags}
							/>
						)}
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
				{loading ? (
					<Loader active={loading} inline="centered" />
				) : table.length > 0 ? (
					<TableTeam
						teams={table}
						setTeams={setTable}
						handleLoad={handleLoad}
						handleSort={handleSort}
						handlePage={handlePage}
						query={query}
						nbPages={nbPages}
					/>
				) : (
					<p>Aucune équipe n'a été trouvée.</p>
				)}
			</div>
		</PageWrapper>
	);
};
export default TeamList;
