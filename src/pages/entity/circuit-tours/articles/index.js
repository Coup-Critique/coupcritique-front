// modules
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Loader } from 'semantic-ui-react';
// components
import useFetch, { manageFetch } from '@/hooks/useFetch';
import usePager from '@/hooks/usePager';
import PageWrapper from '@/components/PageWrapper';
import PaginationPrettier from '@/components/PaginationPrettier';
import SectionAds from '@/components/sections/SectionAds';
import useStateProps from '@/hooks/useStateProps';
import ArticleTeaser from '@/components/teasers/ArticleTeaser';
import ThreeCol from '@/components/columns/ThreeCol';

const defaultArray = [];
const CircuitArticleList = props => {
	const user = useSelector(state => state.user);
	const [result, load, loading] = useFetch();
	const [circuitArticles, setCircuitTours] = useStateProps(
		props.circuitArticles || defaultArray
	);
	const [table, page, nbPages, handlePage] = usePager(12, circuitArticles);

	useEffect(() => {
		if (!circuitArticles.length /*  || Object.keys(query).length > 1 */) {
			handleLoad();
		}
		// }, [query.tags]);
	}, []);

	useEffect(() => {
		if (result?.success) setCircuitTours(result.circuitArticles);
	}, [result]);

	const handleLoad = () => load({ url: 'circuit-articles' });

	return (
		<PageWrapper
			title="Les articles de la Coupe Critique"
			className="actuality-list"
			metadescription="Liste des articles du Circuit de la Coupe Critique."
			goingBack="/entity/circuit-tours"
			action={
				user.is_modo && (
					<Button
						as={Link}
						href="/entity/circuit-tours/articles/create"
						color="blue"
						content="Ajouter un article"
						icon="plus"
					/>
				)
			}
		>
			<SectionAds />
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
						{table.map(circuitTour => (
							<ThreeCol key={circuitTour.id}>
								<ArticleTeaser
									article={circuitTour}
									entityName={'circuit-articles'}
									path={'circuit-tours/articles'}
								/>
							</ThreeCol>
						))}
					</div>
				) : (
					<p>Aucun tournoi disponible.</p>
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
		const { circuitArticles } = await manageFetch(`circuit-articles`);
		return { props: { circuitArticles } };
	} catch (e) {
		console.error(e);
		return { props: { circuitArticles: null } };
	}
}

export default CircuitArticleList;
