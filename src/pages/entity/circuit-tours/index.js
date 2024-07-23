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
import VideoEmbed from '@/components/elements/VideoEmbed';
import { useSelector } from 'react-redux';
import Player from '@/components/elements/Player';
import { makeClassName } from '@/functions';

const CircuitHome = props => {
	const cookie = useSelector(state => state.cookie);
	return (
		<PageWrapper
			title="Rejoignez le Circuit Compétitif Coup Critique de 2024"
			className="actuality-list"
			metadescription="Liste des tournois du Circuit Compétitif Coup Critique."
			goingBack="/"
		>
			<div className="description framed pt-4 pl-4 pr-4 pb-0">
				<div className="row">
					<div className="col-12 col-xl-6 mb-4">
						<img
							width={654}
							height={131}
							alt="Circuit Compétitif"
							src="/images/logo_circuit.png"
							className="img-fluid"
						/>
					</div>
					<div className="col-12 col-xl-6 d-flex mb-4 justify-content-center align-items-center">
						<h2 className="text-center">
							Cash prize total du Circuit :{' '}
							<b className="text-gold">4&nbsp;000&nbsp;€</b>
						</h2>
						<Button
							size="large"
							color="red"
							as="a"
							href="https://www.paypal.com/donate/?hosted_button_id=BF3YGL7JGDLVU"
							target="_blank"
							rel="noreferrer nofollow"
						>
							Contribuer
						</Button>
					</div>
				</div>
			</div>
			<SectionAds />
			<div className="row mb-4">
				<div className="col-12 col-lg-8 mb-3">
					<h3>Nos derniers tournois</h3>
					<div className="row">
						{props.currentTours.map((tour, i) => (
							<div
								key={tour.id}
								className={makeClassName(
									'col-12 col-sm-6 align-items-center',
									i > 0 && 'd-none d-sm-flex'
								)}
							>
								<ArticleTeaser
									article={tour}
									entityName="circuit-tours"
									noCover
								/>
							</div>
						))}
					</div>
					<div className="text-center">
						<Button
							as="a"
							href="https://discord.gg/UNn4Se3ZKM"
							target="_blank"
							rel="noreferrer nofollow"
							color="violet"
							content="S'inscrire aux tournois sur Discord"
							icon="discord"
							className="mb-3"
						/>{' '}
						<Link
							href="/entity/circuit-tours/list"
							className="btn btn-orange inverted mb-3"
						>
							Voir tous les tournois
						</Link>
					</div>
				</div>
				<div className="col-12 col-lg-4 mb-4">
					<Segment padded>
						<div className="mb-4">
							<h3>Le Podium</h3>
							<div className="row mb-4">
								{props.players.map(player => (
									<div key={player.id} className="col-4">
										<div className="text-center">
											<Player
												showdown_name={player.showdown_name}
												height={80}
												width={80}
											/>
											<h5>{player.showdown_name}</h5>
											<p>{player.points}&nbsp;pts</p>
										</div>
									</div>
								))}
							</div>
							<div className="text-center">
								<Link
									href={`/entity/circuit-tours/ranking`}
									className="btn btn-orange inverted"
								>
									Voir le classement complet
								</Link>
							</div>
						</div>
						<div>
							<h3>Trailer du Circuit</h3>
							{/* <div className="row"> */}
							{/* <div className="col-12 col-lg-6"> */}
							<VideoEmbed
								url="https://www.youtube.com/embed/hDwO5bg64_8"
								cookie={cookie.youtube}
							/>
							{/* </div> */}
							{/* </div> */}
						</div>
					</Segment>
				</div>
			</div>
			<div className="mb-5">
				<CircuitCalendar calendar={props.calendar} toList />
			</div>
			<div className="row">
				<div className="col-12 col-lg-6 mb-5">
					<Segment className="flex-grow-1 py-3 px-4">
						<h2>Derniers articles du Circuit</h2>
						<div className="row">
							{props.circuitArticles.map((article, i) => (
								<div
									key={article.id}
									className={makeClassName(
										'col-12 col-sm-6 col-lg-12 col-xl-6 align-items-center',
										i > 0 && 'd-none d-sm-flex d-lg-none d-xl-flex'
									)}
								>
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
								className="btn btn-orange inverted"
							>
								Voir tous les articles
							</Link>
						</div>
					</Segment>
				</div>
				<div className="col-12 col-lg-6 pl-4 mb-5">
					<Segment className="flex-grow-1 py-3 px-4">
						<h2>Analyse en vidéo</h2>
						<div className="row mb-4">
							{!!props.circuitVideos &&
								props.circuitVideos.map((video, i) => (
									<div
										key={video.id}
										className={makeClassName(
											'col-12 col-sm-6 col-lg-12',
											i > 0 &&
												'd-none d-md-flex d-lg-none d-xl-flex'
										)}
									>
										<Video video={video} short />
									</div>
								))}
						</div>
						<div className="text-center">
							<Link
								href={`/entity/circuit-tours/videos`}
								className="btn btn-orange inverted"
							>
								Voir toutes les videos
							</Link>
						</div>
					</Segment>
				</div>
			</div>
			<SectionAds />
		</PageWrapper>
	);
};

export async function getServerSideProps() {
	try {
		const { calendar, currentTours } = await manageFetch(`circuit-tours/calendar`);
		const { circuitArticles } = await manageFetch(`circuit-articles?maxLength=2`);
		const { circuitVideos } = await manageFetch(`circuit-videos?maxLength=2`);
		const { players = [] } = await manageFetch(`players/top`);
		return {
			props: {
				calendar,
				currentTours,
				circuitArticles,
				circuitVideos,
				players: players.map((player, i) => ({ ...player, rank: i + 1 })),
			},
		};
	} catch (e) {
		console.error(e);
		return { props: { circuitArticles: [] } };
	}
}

export default CircuitHome;
