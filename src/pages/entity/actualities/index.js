// modules
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Form, Loader } from 'semantic-ui-react';
import useFetch, { manageFetch } from '@/hooks/useFetch';
import usePager from '@/hooks/usePager';
import PageWrapper from '@/components/PageWrapper';
import PaginationPrettier from '@/components/PaginationPrettier';
import { objectToGETparams } from '@/functions';
import DropdownMultipleSelectField from '@/components/fields/DropdownMultipleSelectField';
import useStoreQuery from '@/hooks/useStoreQuery';
import SectionAds from '@/components/sections/SectionAds';
import FormSearch from '@/components/forms/FormSearch';
import useStateProps from '@/hooks/useStateProps';
import ArticleTeaser from '@/components/teasers/ArticleTeaser';
import ThreeCol from '@/components/columns/ThreeCol';

const defaultArray = [];
const ActualityList = props => {
	const user = useSelector(state => state.user);
	// const actuality_tags = useSelector(state => props.tags || state.actuality_tags);
	const [result, load, loading] = useFetch();
	const [actualities, setActualities] = useStateProps(
		props.actualities || defaultArray
	);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery({
		saveQueryToStore: true,
	});
	const [table, page, nbPages, handlePage] = usePager(24, actualities);

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

	const handleLoad = () => load({ url: 'actualities' + objectToGETparams(query) });

	return (
		<PageWrapper
			title="Toutes les actualités sur la stratégie Pokémon"
			className="actuality-list"
			metadescription="Liste d'actualités sur la stratégie Pokémon et la scène compétitive française. Vous y retrouverez des informations sur les événements Smogon ou ceux des formats officiels comme le VGC."
			goingBack="/"
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
			<div className="row">
				<div className="col-12 col-lg-6 d-flex mb-3 mb-lg-0">
					<Form>
						<DropdownMultipleSelectField
							label="Catégories"
							name="tags"
							placeholder="Sélectionner une catégorie"
							className="flex-grow-1"
							options={props.tags}
							value={query.tags || []}
							onChange={(e, { value }) => setQueryParam('tags', value)}
						/>
					</Form>
				</div>
				<div className="col-12 col-lg-6 d-flex mb-3 mb-lg-0">
					<div className="list-filter">
						<label>&nbsp;</label>
						<FormSearch
							placeholder={
								"Rechercher par le titre, l'auteur ou le texte d'accroche"
							}
							handleSearch={search => setQueryParam('search', search)}
							defaultValue={query.search}
						/>
						<em>
							&gt; Vous pouvez cumuler les recherches en les séparant par
							des virgules.
						</em>
					</div>
				</div>
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
							<ThreeCol key={actuality.id}>
								<ArticleTeaser
									article={actuality}
									entityName={'actualities'}
								/>
							</ThreeCol>
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
