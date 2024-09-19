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
import useHash from '@/hooks/useHash';
import { redirect404 } from '@/pages/404';

// initQuery
// query.tags
// 	? Array.isArray(query.tags)
// 		? query.tags
// 		: query.tags.split(',')
// 	: defaultArray

const defaultArray = [];
const TeamList = props => {
	const searchRef = useRef();
	const [hash, removeHash] = useHash();

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

	useEffect(() => {
		if (hash && table.length > 0) {
			document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
			removeHash();
		}
	}, [table]);

	// const tiers = useSelector(state => props.tiers || state.tiers);
	// const tags = useSelector(state => props.tags || state.tags);
	const { tiers, tags } = props;

	const handleSearch = search => {
		setQueryParam('search', search);
	};

	const handleTier = useCallback(
		(tierId, gen) => {
			setQuery({
				...query,
				tier: tierId,
				gen: gen,
				page: 1,
			});
			if (searchRef.current) {
				searchRef.current.ref.current.click();
			}
		},
		[setQuery]
	);

	const handleTags = useCallback(
		(e, { value }) => {
			setQueryParam('tags', value);
			if (searchRef.current) {
				searchRef.current.ref.current.click();
			}
		},
		[setQueryParam]
	);

	const handleCertified = useCallback(
		(e, { value }) => {
			setQueryParam('certified', value);
			if (searchRef.current) {
				searchRef.current.ref.current.click();
			}
		},
		[setQueryParam]
	);

	return (
		<PageWrapper
			title="Équipes stratégiques"
			metadescription="Retrouvez des équipes viable en stratégie Pokémon, que ce soit sur le simulateur Pokémon Showdown ou sur console. Choisissez votre tier comme le VGC ou l'Overused et vos critères comme une équipe hyper offense."
			more
			className="team-list"
			goingBack
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
				value={query.certified || ''}
				onChange={handleCertified}
				fields={[
					{ label: 'Toutes', value: '' },
					{ label: 'Certifiées', value: '1' },
					{ label: 'Non certifiées', value: '0' },
					{ label: "Code d'emprunt", value: 'team_id' },
				]}
			/>
			<Form className="list-filter">
				<div className="d-flex mb-4">
					<TiersField
						label="Tier"
						tiers={tiers}
						currentTier={query.tier}
						currentGen={query.gen}
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
							value={query.tags || defaultArray}
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
		return redirect404;
	}
}

export default TeamList;
