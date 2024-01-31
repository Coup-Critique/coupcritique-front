// modules
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Loader } from 'semantic-ui-react';
import useActions from '@/hooks/useActions';
// components
import useFetch from '@/hooks/useFetch';
import TiersField from '@/components/fields/TiersField';
import RadioFilterForm from '@/components/forms/RadioFilterForm';
import PageWrapper from '@/components/PageWrapper';
import TableTeam from '@/components/table/TableTeam';
import { setTiers as setTiersAction } from '@/reducers/tiers';
import FormSearch from '@/components/forms/FormSearch';
import useTableFetch from '@/hooks/useTableFetch';
import Page404 from '@/pages/404';

const AdminTeams = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const tiers = useSelector(state => state.tiers);
	const filterRef = useRef();
	const searchRef = useRef();

	const [resultTiers, loadTiers, loadingTiers] = useFetch();
	const [setTiers] = useActions(dispatch, [setTiersAction]);

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
	} = useTableFetch('teams', {
		loadUrl: 'teams/state',
		defaultQuery: { page: 1, state: null },
	});

	const [checkedTier, setCheckedTier] = useState(query.tier);
	const [checkedGen, setCheckedGen] = useState(query.gen);

	useEffect(() => {
		if (!Object.keys(tiers).length) {
			loadTiers({ url: 'tiers-select' });
		}
	}, []);

	useEffect(() => {
		if (resultTiers?.success) {
			setTiers(resultTiers.tiers);
		}
	}, [resultTiers]);

	useEffect(() => {
		if (query.tier !== checkedTier) {
			setCheckedTier(query.tier);
		}
	}, [query.tier]);

	const handleSubmitFilters = e => {
		e.preventDefault();
		setQuery({
			...query,
			tier: checkedTier,
			gen: checkedGen,
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

	const handleReset = e => {
		e.preventDefault();
		setCheckedTier(undefined);
		setCheckedGen(undefined);
		setQuery({ page: 1, state: query.state });
	};

	const handleTier = useCallback(
		(tierId, gen) => {
			setCheckedTier(tierId);
			setCheckedGen(gen);
		},
		[setCheckedTier, setCheckedGen]
	);

	if (user.loading) {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id || !user.is_modo) {
		return <Page404 />;
	}
	return (
		<PageWrapper title="Équipe" className="team-list" more nofollow>
			<RadioFilterForm
				name="state"
				label="Filtrer par"
				value={query.state}
				onChange={(e, { name, value }) => setQueryParam(name, value)}
				fields={[
					{ label: 'Non traitées', value: null },
					{ label: 'Non certifiées', value: 'false' },
					{ label: 'Certifiées', value: 'true' },
					{ label: 'Bannies', value: 'banned' },
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
				<FormSearch
					label="Rechercher"
					placeholder={
						"Un pokemon, une catégorie, un nom d'équipe, un utilisateur, un code d'emprunt"
					}
					handleSearch={handleSearch}
					defaultValue={query.search}
					searchRef={searchRef}
				/>
				<em>
					&gt; Vous pouvez cumuler les recherches en les séparant par des
					virgules.
				</em>
				<div className="mt-3">
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
						isModo
						teams={table}
						setTeams={setTable}
						handleLoad={handleLoad}
						handleSort={handleSort}
						handlePage={handlePage}
						query={query}
						nbPages={nbPages}
					/>
				) : (
					<p>Aucune équipe a traiter.</p>
				)}
			</div>
		</PageWrapper>
	);
};
export default AdminTeams;
