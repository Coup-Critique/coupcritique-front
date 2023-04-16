// modules
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
// hooks
import useFetch from '@/hooks/useFetch';
// components
import PokemonInstanceTeaser from '@/components/elements/PokemonInstanceTeaser';
// const
import { INSTANCES_KEYS } from '@/constants/team';
import Tier from '@/components/elements/Tier';
import { useSelector } from 'react-redux';

function SectionWeeklyTeam() {
	const ssrData = useSelector(state => state.ssrData);
	const [result, load, loading] = useFetch();
	const [team, setTeam] = useState(ssrData?.topWeek || null);

	useEffect(() => {
		if (!team) {
			load({ url: `teams/top` });
		}
	}, []);

	useEffect(() => {
		if (result && result.success) {
			setTeam(result.team);
		}
	}, [result]);

	return (
		<section className="section-weekly-team">
			<div className="ui container">
				<h2>Équipe de la semaine</h2>
				<div className="top-team">
					{loading ? (
						<Loader active inline="centered" /* inverted */ />
					) : team ? (
						<>
							<Tier tier={team.tier} color="yellow" size="large" />
							<h3 className="h4">
								<Link to={`/entity/teams/${team.id}`}>{team.name}</Link>
								&nbsp;par&nbsp;
								<Link to={`/entity/users/${team.user.id}`}>
									<em>{team.user.username}</em>
								</Link>
							</h3>
							<div className="row justify-content-center">
								{
									// prettier-ignore
									INSTANCES_KEYS.map(key => !!team[key] && (
										<div
											className="col-12 col-sm-6 col-md-3 col-xl-2 d-flex justify-content-center"
											key={key}
										>
											<PokemonInstanceTeaser instance={team[key]} />
											<Link 
												className="extended-link" 
												to={`/entity/teams/${team.id}`}
											>
												<span className="sr-only">
													{team.name}
												</span>
											</Link>
										</div>
									))
								}
							</div>
						</>
					) : (
						<p>Équipe indisponible.</p>
					)}
				</div>
				<div className="btn-wrapper">
					{!!team && (
						<Link
							to={`/entity/teams/${team.id}`}
							className="btn btn-red team-button btn-icon"
						>
							<img
								// src={`/images/picto/pokeball-mini-${
								// 	darkMode ? 'white' : 'black'
								// }.png`}
								src={`/images/picto/pokeball-mini-white.png`}
								alt="pokeball"
								width={16}
								height={16}
							/>
							Voir l'équipe
						</Link>
					)}
					<Link to="/entity/teams?certified=1" className="btn btn-red btn-icon">
						<img
							// src={`/images/picto/star-${darkMode ? 'white' : 'black'}.png`}
							src={`/images/picto/star-white.png`}
							alt="étoile"
							width={17}
							height={16}
						/>
						Voir les meilleures équipes
					</Link>
				</div>
			</div>
		</section>
	);
}
export default SectionWeeklyTeam;
