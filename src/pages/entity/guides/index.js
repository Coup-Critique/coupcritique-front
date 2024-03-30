import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Form, Loader } from 'semantic-ui-react';
import useFetch, { manageFetch } from '@/hooks/useFetch';
import usePager from '@/hooks/usePager';
import PageWrapper from '@/components/PageWrapper';
import PaginationPrettier from '@/components/PaginationPrettier';
import useActions from '@/hooks/useActions';
import { setGuideTags } from '@/reducers/guide_tags';
import { objectToGETparams } from '@/functions';
import DropdownMultipleSelectField from '@/components/fields/DropdownMultipleSelectField';
import FormSearch from '@/components/forms/FormSearch';
import useStoreQuery from '@/hooks/useStoreQuery';
import SectionAds from '@/components/sections/SectionAds';
import useStateProps from '@/hooks/useStateProps';
import ArticleTeaser from '@/components/teasers/ArticleTeaser';

const defaultArray = [];
const GuideList = props => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const guide_tags = useSelector(state => props.tags || state.guide_tags);
	const [result, load, loading] = useFetch();
	const [guides, setGuides] = useStateProps(props.guides || defaultArray);
	const [table, page, nbPages, handlePage] = usePager(12, guides);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);
	const [setTags] = useActions(dispatch, [setGuideTags]);
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
		if (!guides.length || Object.keys(query).length > 1) {
			handleLoad();
		}
	}, [query]);

	useEffect(() => {
		if (result?.success) {
			setGuides(result.guides);
		}
	}, [result]);

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
			action={
				user.is_modo && (
					<Button
						as={Link}
						href="/entity/guides/create"
						color="orange"
						content="Ajouter un guide"
						icon="plus"
					/>
				)
			}
		>
			<SectionAds />
			<Form onSubmit={handleSubmitFilters} className="mb-4">
				<DropdownMultipleSelectField
					label="Catégories"
					name="tags"
					className="flex-grow-1"
					options={guide_tags}
					value={checkedTags}
					onChange={(e, { value }) => setCheckedTags(value)}
				/>
				<Button color="orange" content="Valider le filtre" type="submit" />
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
						{table.map(guide => (
							<div
								key={guide.id}
								className="col-12 col-lg-4 d-flex flex-column"
							>
								<ArticleTeaser article={guide} entityName={'guides'} />
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

export async function getServerSideProps() {
	try {
		const { guides } = await manageFetch(`guides`);
		const { tags } = await manageFetch(`guide_tags`);
		return { props: { guides, tags } };
	} catch (e) {
		console.error(e);
		return { props: { guides: null } };
	}
}

export default GuideList;
