// modules
import { Button, Segment } from 'semantic-ui-react';
// components
import { manageFetch } from '@/hooks/useFetch';
import PageWrapper from '@/components/PageWrapper';
import SectionAds from '@/components/sections/SectionAds';
import ArticleTeaser from '@/components/teasers/ArticleTeaser';
import CircuitCalendar from '@/components/CircuitCalendar';
import Link from 'next/link';
import Video from '@/components/elements/Video';

const CircuitHome = props => {
	return (
		<PageWrapper
			title="Rejoignez le Circuit Compétitif de 2024 : la Coupe Critique"
			className="actuality-list"
			metadescription="Liste des tournois du Circuit de la Coupe Critique."
		>
			<h4 className="description framed">
				CashPrize total du Circuit : 4000&nbsp;€
			</h4>
			<SectionAds />
			<div className="row mb-5">
				<div className="col-12 col-lg-4">
					<h3>Notre dernier tournoi</h3>
					{props.currentTour && (
						<ArticleTeaser
							article={props.currentTour}
							entityName="circuit-tours"
						/>
					)}
					<div className="text-center">
						<Button
							as="a"
							href="https://discord.gg/UNn4Se3ZKM"
							target="_blank"
							rel="noreferrer nofollow"
							color="violet"
							content="S'inscrire aux tournois sur Discord"
							icon="discord"
						/>
					</div>
				</div>
				<div className="col-12 col-lg-8"></div>
			</div>
			<div className="mb-5">
				<CircuitCalendar calendar={props.calendar} toList />
			</div>
			<div className="row">
				<div className="col-12 col-lg-6">
					<h2>Derniers articles du Circuit</h2>
					<div className="row">
						{props.circuitArticles.map(article => (
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
						<Link
							href={'/entity/circuit-tours/articles'}
							className="btn btn-orange"
						>
							Voir tous les articles
						</Link>
					</div>
				</div>
				<div className="col-12 col-lg-6 pl-4">
					<Segment className="grow py-3 px-4">
						{/* <div className="row">
							<div className="col-12 col-lg-6"> */}
						<h2>Analyse en vidéo</h2>
						<div className="mb-4">
							{!!props.circuitVideos &&
								props.circuitVideos.map(video => (
									<Video key={video.id} video={video} short />
								))}
						</div>
						<div className="text-center">
							<Link
								href={`/entity/circuit-tours/videos`}
								className="btn btn-orange"
							>
								Voir toutes les videos
							</Link>
						</div>
						{/* </div>
						</div> */}
					</Segment>
				</div>
			</div>
			<SectionAds />
		</PageWrapper>
	);
};

export async function getServerSideProps() {
	try {
		const { calendar, currentTour } = await manageFetch(`circuit-tours/calendar`);
		const { circuitArticles } = await manageFetch(`circuit-articles?maxLength=2`);
		const { circuitVideos } = await manageFetch(`circuit-videos?maxLength=2`);
		return { props: { calendar, currentTour, circuitArticles, circuitVideos } };
	} catch (e) {
		console.error(e);
		return { props: { circuitArticles: [] } };
	}
}

export default CircuitHome;
