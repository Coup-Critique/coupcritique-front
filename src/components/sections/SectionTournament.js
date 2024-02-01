// modules
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Loader } from 'semantic-ui-react';
// hooks
import useFetch from '@/hooks/useFetch';
import TournamentTeaser from '@/components/teasers/TournamentTeaser';

const defaultArray = [];
function SectionTournament() {
	const ssrData = useSelector(state => state.ssrData);
	const [result, load, loading] = useFetch();
	const [tournaments, setTournaments] = useState(ssrData?.tournaments || defaultArray);

	useEffect(() => {
		if (!tournaments.length) {
			load({ url: `tournaments?maxLength=3` });
		}
	}, []);

	useEffect(() => {
		if (result?.success) {
			setTournaments(result.tournaments);
		}
	}, [result]);

	if (!tournaments.length && !loading) return null;
	return (
		<section className="section-news">
			<div className="ui container">
				<h2>
					<Link href="/entity/tournaments">Tournois</Link>
				</h2>
				<div className="mb-4">
					{loading ? (
						<Loader active inline="centered" inverted />
					) : (
						<div className="row">
							{tournaments.map(tournament => (
								<div
									key={tournament.id}
									className="col-12 col-lg-4 d-flex flex-column"
								>
									<TournamentTeaser
										tournament={tournament}
										btnProps={{ color: 'blue', inverted: true }}
									/>
								</div>
							))}
						</div>
					)}
				</div>
				<Link href="/entity/tournaments" className="btn btn-light">
					Voir tous les tournois
				</Link>
			</div>
		</section>
	);
}
export default SectionTournament;
