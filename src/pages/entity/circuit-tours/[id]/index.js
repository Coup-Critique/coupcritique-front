// modules
import Link from 'next/link';
import { Button, Segment } from 'semantic-ui-react';
// components
import ArticleArticle from '@/components/article/ArticleArticle';
import CircuitTourContainer from '@/containers/CircuitTourContainer';
import { manageFetch } from '@/hooks/useFetch';
import useNotifChecker from '@/hooks/useNotifChecker';
import ArticleTeaser from '@/components/teasers/ArticleTeaser';
import Video from '@/components/elements/Video';
import LinkButton from '@/components/buttons/LinkButton';
import { redirect404 } from '@/pages/404';
import useCookies from '@/hooks/useCookies';

const CircuitTourPage = ({ circuitTour, circuitArticles, circuitVideos }) => {
	useCookies(); // for videos
	useNotifChecker('circuitTour', circuitTour.id);
	return (
		<CircuitTourContainer
			Component={ArticleArticle}
			circuitTour={circuitTour}
			entityName="circuit-tours"
			actions={
				!!(circuitTour.rounds || circuitTour.cycles) && (
					<Button
						as={Link}
						href={`/entity/circuit-tours/${circuitTour.id}/result`}
						color="orange"
						content="Voir les résultats"
					/>
				)
			}
		>
			<div className="row">
				<div className="col-12 col-lg-6">
					<h2>Les articles du Tour</h2>
					<div className="row">
						{!!circuitArticles &&
							circuitArticles.map(article => (
								<div key={article.id} className="col-12 col-lg-6">
									<ArticleTeaser
										article={article}
										entityName="circuit-articles"
										path="circuit-tours/articles"
									/>
								</div>
							))}
					</div>
					<div className="text-center">
						<LinkButton
							href={`/entity/circuit-tours/articles/tour/${circuitTour.id}`}
							color="orange"
							inverted
						>
							Voir tous les articles du tour
						</LinkButton>
					</div>
				</div>
				<div className="col-12 col-lg-6 pl-4">
					<Segment className="grow py-3 px-4">
						<h2>Analyse en vidéo</h2>
						<div className="mb-2">
							{!!circuitVideos &&
								circuitVideos.map(video => (
									<Video key={video.id} video={video} short />
								))}
						</div>
						<div className="text-center">
							<LinkButton
								href={`/entity/circuit-tours/videos/tour/${circuitTour.id}`}
								color="orange"
								inverted
							>
								Voir toutes les videos du tour
							</LinkButton>
						</div>
					</Segment>
				</div>
			</div>
		</CircuitTourContainer>
	);
};

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { circuitTour } = await manageFetch(`circuit-tours/${id}`);
		const { circuitArticles } = await manageFetch(
			`circuit-articles/tour/${id}?maxLength=2`
		);
		const { circuitVideos } = await manageFetch(
			`circuit-videos/tour/${id}?maxLength=2`
		);
		return { props: { circuitTour, circuitArticles, circuitVideos } };
	} catch (e) {
		console.error(e);
		return redirect404;
	}
}

export default CircuitTourPage;
