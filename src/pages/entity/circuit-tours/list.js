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
const CircuitList = props => {
	const user = useSelector(state => state.user);
	const [result, load, loading] = useFetch();
	const [circuitTours, setCircuitTours] = useStateProps(
		props.circuitTours || defaultArray
	);
	const [table, page, nbPages, handlePage] = usePager(12, circuitTours);

	useEffect(() => {
		if (!circuitTours.length /*  || Object.keys(query).length > 1 */) {
			handleLoad();
		}
		// }, [query.tags]);
	}, []);

	useEffect(() => {
		if (result?.success) setCircuitTours(result.circuitTours);
	}, [result]);

	const handleLoad = () => load({ url: 'circuitTours' });

	return (
		<PageWrapper
			title="Circuit Compétitif Coup Critique"
			className="actuality-list"
			metadescription="Liste des tournois du Circuit Compétitif Coup Critique."
			goingBack="/entity/circuit-tours"
			action={
				user.is_modo && (
					<Button
						as={Link}
						href="/entity/circuit-tours/create"
						color="blue"
						content="Ajouter un tournoi"
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
									entityName={'circuit-tours'}
									noCover
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
		const { circuitTours } = await manageFetch(`circuit-tours`);
		return { props: { circuitTours } };
	} catch (e) {
		console.error(e);
		return { props: { circuitTours: null } };
	}
}

export default CircuitList;
