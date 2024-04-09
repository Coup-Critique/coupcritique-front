// modules
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Form, Loader } from 'semantic-ui-react';
import useDarkMode from '@/hooks/useDarkMode';
import useFetch, { manageFetch } from '@/hooks/useFetch';
import usePager from '@/hooks/usePager';
import ActualityTeaser from '@/components/teasers/ActualityTeaser';
import PageWrapper from '@/components/PageWrapper';
import PaginationPrettier from '@/components/PaginationPrettier';
import { setActualityTags } from '@/reducers/actuality_tags';
import useActions from '@/hooks/useActions';
import { objectToGETparams } from '@/functions';
import DropdownMultipleSelectField from '@/components/fields/DropdownMultipleSelectField';
import useStoreQuery from '@/hooks/useStoreQuery';
import SectionAds from '@/components/sections/SectionAds';
import FormSearch from '@/components/forms/FormSearch';
import useStateProps from '@/hooks/useStateProps';

const defaultArray = [];
const ActualityList = props => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const actuality_tags = useSelector(state => props.tags || state.actuality_tags);
	const [darkMode] = useDarkMode();
	const [result, load, loading] = useFetch();
	const [actualities, setActualities] = useStateProps(
		props.actualities || defaultArray
	);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);
	const [table, page, nbPages, handlePage] = usePager(24, actualities);
	const [setTags] = useActions(dispatch, [setActualityTags]);
	const [checkedTags, setCheckedTags] = useState(
		query.tags
			? Array.isArray(query.tags)
				? query.tags
				: query.tags.split(',')
			: defaultArray
	);

	useEffect(() => {
		if (props.tags?.length) {
			setTags(props.tags);
		}
	}, []);

	useEffect(() => {
		if (!actualities.length || Object.keys(query).length > 1) {
			handleLoad();
		}
	}, [query]);

	useEffect(() => {
		if (result?.success) {
			setActualities(result.actualities);
		}
	}, [result]);

	const handleSubmitFilters = e => {
		e.preventDefault();
		setQueryParam('tags', checkedTags);
	};

	const handleLoad = () => load({ url: 'actualities' + objectToGETparams(query) });

	return (
		<PageWrapper
			title="Toutes les actualités sur la stratégie Pokémon"
			className="actuality-list"
			metadescription="Liste d'actualités sur la stratégie Pokémon et la scène compétitive française. Vous y retrouverez des informations sur les événements Smogon ou ceux des formats officiels comme le VGC."
			action={
				user.is_modo && (
					<Button
						as={Link}
						href="/entity/actualities/create"
						color="orange"
						content="Ajouter une actualité"
						icon="plus"
					/>
				)
			}
		>
			<SectionAds />
			<Form
				onSubmit={handleSubmitFilters}
				// className="mb-2 inline d-flex align-items-end"
			>
				<DropdownMultipleSelectField
					label="Catégories"
					name="tags"
					className="flex-grow-1"
					options={actuality_tags}
					value={checkedTags}
					onChange={(e, { value }) => setCheckedTags(value)}
				>
					<Button
						color="orange"
						className="mb-3 btn-rounded-right"
						style={{ minHeight: '2.71428571em' }}
						content="Valider le filtre"
						type="submit"
					/>
				</DropdownMultipleSelectField>
			</Form>
			<div className="list-filter">
				<FormSearch
					placeholder={
						"Rechercher par le titre, l'auteur ou le texte d'accroche"
					}
					handleSearch={search => setQueryParam('search', search)}
					defaultValue={query.search}
				/>
				<em>
					&gt; Vous pouvez cumuler les recherches en les séparant par des
					virgules.
				</em>
			</div>
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader inline="centered" active />
				) : table.length > 0 ? (
					<div className="row">
						{table.map(actuality => (
							<div
								key={actuality.id}
								className="col-12 col-lg-4 d-flex flex-column"
							>
								<ActualityTeaser
									actuality={actuality}
									darkMode={darkMode}
								/>
							</div>
						))}
					</div>
				) : (
					<p>Aucune actualité disponible.</p>
				)}
			</div>
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
			<SectionAds />
		</PageWrapper>
	);
};

export async function getServerSideProps() {
	try {
		const { actualities } = await manageFetch(`actualities`);
		const { tags } = await manageFetch(`actuality_tags`);
		return { props: { actualities, tags } };
	} catch (e) {
		console.error(e);
		return { props: { actualities: null } };
	}
}

export default ActualityList;
