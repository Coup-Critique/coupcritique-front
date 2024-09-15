import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Profile from '@/components/elements/Profile';
import Tier from '@/components/elements/Tier';
import Tag from '@/components/elements/Tag';
import Certification from '@/components/elements/Certification';
import SpritePokemon from '@/components/elements/SpritePokemon';
import { INSTANCES_KEYS } from '@/constants/team';
import { makeClassName } from '@/functions';
import Favorite from '@/components/actions/Favorite';
import ArtPokemon from '../elements/ArtPokemon';

// TODO props link > click on team to go to team page
const TableOneTeam = ({ team, className, isLink = false, art = false }) => {
	const router = useRouter();
	const user = useSelector(state => state.user);
	const isUserConnected = !user.loading && user.id;
	return (
		<div
			className={makeClassName(
				'table-wrapper one-team',
				isLink && 'clickable',
				className
			)}
			onClick={isLink ? e => router.push(`/entity/teams/${team.id}`) : undefined}
		>
			<table className="table table-one basic table-pokemon stackable">
				<thead>
					<tr>
						<th>Utilisateur</th>
						<th>Certif</th>
						<th>Pokémon</th>
						<th>Tier</th>
						<th>Catégories</th>
						<th>Favoris</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<Profile user={team.user} noLink={isLink} />
						</td>
						<td>
							<Certification
								className="img-fluid"
								team={team}
								userId={user.id}
							/>
						</td>
						<td className="list nowrap">
							<div className="team-grid">
								{INSTANCES_KEYS.map(
									key =>
										!!team[key] &&
										(art ? (
											<Fragment key={key}>
												<SpritePokemon
													pokemon={team[key].pokemon}
													noLink={isLink}
													className="d-md-none"
												/>
												<ArtPokemon
													pokemon={team[key].pokemon}
													linked={!isLink}
													half
													wrapperClassName="d-none d-md-block"
												/>
											</Fragment>
										) : (
											<SpritePokemon
												key={key}
												pokemon={team[key].pokemon}
												noLink={isLink}
											/>
										))
								)}
							</div>
						</td>
						<td>
							<Tier tier={team.tier} noLink={isLink} />
						</td>
						<td className={team.tags?.length > 2 ? 'text-left' : undefined}>
							{team.tags.map((tag, i) => (
								<Tag key={i} tag={tag} />
							))}
						</td>
						<td className="td-action" title="">
							<Favorite isIcon team={team} action={isUserConnected} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TableOneTeam;
