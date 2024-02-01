import React from 'react';
import { useRouter } from 'next/router';
import Profile from '@/components/elements/Profile';
import Tier from '@/components/elements/Tier';
import Tag from '@/components/elements/Tag';
import Certification from '@/components/elements/Certification';
import SpritePokemon from '@/components/elements/SpritePokemon';
import { INSTANCES_KEYS } from '@/constants/team';
import { makeClassName } from '@/functions';

// TODO props link > click on team to go to team page
const TableOneTeam = ({ team, className, userId, isLink }) => {
	const router = useRouter();
	return (
		<div
			className={makeClassName('table-wrapper', className)}
			onClick={e => router.push(`/entity/teams/${team.id}`)}
		>
			<table className="table basic table-pokemon stackable">
				<thead>
					<tr>
						<th>Utilisateur</th>
						<th>Certif</th>
						<th>Pokémon</th>
						<th>Tier</th>
						<th>Catégories</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<Profile user={team.user} className="justify-content-start" />
						</td>
						<td>
							<Certification
								className="img-fluid"
								team={team}
								userId={userId}
							/>
						</td>
						<td className="list nowrap">
							{
								// prettier-ignore
								INSTANCES_KEYS.map(key => !!team[key] && (
                            <SpritePokemon key={key} pokemon={team[key].pokemon} isLink={!isLink}/>
                        ))
							}
						</td>
						<td>
							<Tier tier={team.tier} />
						</td>
						<td>
							{team.tags.map((tag, i) => (
								<Tag key={i} tag={tag} />
							))}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TableOneTeam;