import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, Loader } from 'semantic-ui-react';
import useDarkMode from '@/hooks/useDarkMode';
import useFetch from '@/hooks/useFetch';
import usePager from '@/hooks/usePager';
import GuideTeaser from '@/components/elements/GuideTeaser';
import PageWrapper from '@/components/PageWrapper';
import PaginationPrettier from '../../PaginationPrettier';
import useActions from '@/hooks/useActions';
import { setGuideTags } from '@/reducers/guide_tags';
import { objectToGETparams } from '@/functions';
import DropdownMultipleSelectField from '@/components/fields/DropdownMultipleSelectField';
import FormSearch from '@/components/forms/FormSearch';
import useStoreQuery from '@/hooks/useStoreQuery';
import SectionAds from '@/components/sections/SectionAds';

const GuideList = () => {
	const dispatch = useDispatch();
	const [darkMode] = useDarkMode();
	const { user, ssrData, guide_tags } = useSelector(state => state);
	const [result, load, loading] = useFetch();
	const [guides, setGuides] = useState(ssrData?.guides || []);
	const [table, page, nbPages, handlePage] = usePager(12, guides);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);
	const [resultTags, loadTags, loadingTags] = useFetch();
	const [setTags] = useActions(dispatch, [setGuideTags]);
	const [checkedTags, setCheckedTags] = useState(
		query.tags ? (Array.isArray(query.tags) ? query.tags : query.tags.split(',')) : []
	);

	useEffect(() => {
		if (!guides.length || Object.keys(query).length > 1) {
			handleLoad();
		}
	}, [query]);

	useEffect(() => {
		if (result && result.success) {
			setGuides(result.guides);
		}
	}, [result]);

	useEffect(() => {
		if (!guide_tags.length) {
			loadTags({ url: 'guide_tags' });
		}
	}, []);

	useEffect(() => {
		if (resultTags && resultTags.success) {
			setTags(resultTags.tags);
		}
	}, [resultTags]);

	const handleSubmitFilters = e => {
		e.preventDefault();
		setQueryParam('tags', checkedTags);
	};

	const handleLoad = () => load({ url: 'guides' + objectToGETparams(query) });

	return (
		<PageWrapper
			title="Tous les guides"
			className="actuality-list"
			metadescription="Liste des guides sur la stratégie Pokémon et la scène compétitive française. Vous y retrouverez des articles d'aide sur le vocabulaire et les pratiques de la stratégie Pokémon."
		>
			{user.is_modo && (
				<Button
					as={Link}
					to="/entity/guides/create"
					color="blue"
					content="Ajouter un guide"
					icon="plus"
					className="mb-4"
				/>
			)}
			<SectionAds />
			<Form onSubmit={handleSubmitFilters} className="mb-4">
				{loadingTags ? (
					<Loader active inline="centered" />
				) : (
					<DropdownMultipleSelectField
						label="Catégories"
						name="tags"
						className="flex-grow-1"
						options={guide_tags}
						value={checkedTags}
						onChange={(e, { value }) => setCheckedTags(value)}
					/>
				)}
				<Button color="orange" content="Valider le filtre" type="submit" />
			</Form>
			{/* </Segment> */}
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
						{table.map(guide => (
							<div
								key={guide.id}
								className="col-12 col-lg-4 d-flex flex-column"
							>
								<GuideTeaser guide={guide} darkMode={darkMode} />
							</div>
						))}
					</div>
				) : (
					<p>Aucun guide disponible.</p>
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

export default GuideList;
