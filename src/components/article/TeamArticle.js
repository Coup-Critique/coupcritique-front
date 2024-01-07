// modules
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'semantic-ui-react';
// constants
import { INSTANCES_KEYS } from '@/constants/team';
// components
import PageWrapper from '@/components/PageWrapper';
import Profile from '@/components/elements/Profile';
import Tier from '@/components/elements/Tier';
import Tag from '@/components/elements/Tag';
import PokemonInstance from '@/components/elements/PokemonInstance';
import Export from '@/components/actions/Export';
import Certification from '@/components/elements/Certification';
import CertificationButton from '@/components/actions/CertificationButton';
import TeamBanButton from '@/components/actions/TeamBanButton';
import DeleteAction from '@/components/actions/DeleteAction';
import Favorite from '@/components/actions/Favorite';
import SpritePokemon from '@/components/elements/SpritePokemon';
import GoBackButton from '@/components/GoBackButton';
import TeamTopButton from '@/components/actions/TeamTopButton';
import { addMessage } from '@/reducers/messages';
// import ScrollReveal from '@/components/ScrollReveal';
import SectionAds from '@/components/sections/SectionAds';
import { formatDate, formatFileName } from '@/functions';
import CommentArea from '@/components/CommentArea';
import Replay from '@/components/elements/Replay';

const TeamArticle = ({ result }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector(state => state.user);
	const [team, setTeam] = useState(result?.team || {});

	useEffect(() => {
		if (result?.success) {
			setTeam(result.team);
		}
	}, [result]);

	const handleValue = (name, value) => setTeam({ ...team, [name]: value });

	const handleRemove = resultDelete => {
		if (resultDelete.message) {
			dispatch(addMessage(resultDelete.message, true));
		}
		router.back();
	};

	const isUserConnected = !user.loading && user.id;
	if (!team.id) return null;
	return (
		<PageWrapper
			className="team article"
			title={team.name}
			metatitle={"L'équipe " + (team.certified ? 'certifiée ' : '') + team.name}
			metadescription={team.description}
			metaimage={`pokemons/${formatFileName(team.pkm_inst_1.pokemon.name)}.png`}
		>
			<GoBackButton defaultUrl="/entity/teams" />
			<div className="table-wrapper mt-3 mb-4">
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
								<Profile
									user={team.user}
									className="justify-content-start"
								/>
							</td>
							<td>
								<Certification
									className="img-fluid"
									team={team}
									userId={user.id}
								/>
							</td>
							<td className="list nowrap">
								{
									// prettier-ignore
									INSTANCES_KEYS.map(key => !!team[key] && (
										<SpritePokemon key={key} pokemon={team[key].pokemon}/>
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
			<div className="text-center mb-3 btn-wrapper">
				{isUserConnected && <Favorite team={team} />}
				{(user.id === team.user.id || user.is_modo === true) && (
					<Button
						icon="pencil"
						color="blue"
						content="Modifier"
						as={Link}
						href={`/entity/teams/${team.id}/update`}
					/>
				)}
				{user.is_modo === true && (
					<>
						<CertificationButton team={team} handleCertif={handleValue} />
						<TeamTopButton team={team} />
						<TeamBanButton team={team} handleBan={handleValue} />
					</>
				)}
				{user.id === team.user.id && (
					<DeleteAction
						url={`teams/${team.id}`}
						callback={handleRemove}
						confirmProps={{
							children: `Êtes-vous sûr de vouloir supprimer cette équipe\u00A0?`,
						}}
					/>
				)}
			</div>
			{!!team.team_id && (
				<p>
					<b className="text-primary">Code d'emprunt&nbsp;:</b> {team.team_id}
				</p>
			)}
			{team.replays.length > 0 && (
				<div className="mb-4">
					<b className="text-primary">
						Replay{team.replays.length > 1 && 's'}&nbsp;:
					</b>{' '}
					{team.replays.map(({ uri }, i) => (
						<Replay key={i} uri={uri} />
					))}
				</div>
			)}
			<div className="mb-2">
				<div className="d-xs-flex justify-content-between flex-wrap align-items-end mb-3">
					<div className="date mb-2">
						{formatDate(team.date_creation)}{' '}
						{!!team.update_date &&
							' - (dernière mise à jour le : ' +
								formatDate(team.update_date) +
								')'}
					</div>
					<Export content={team.export} />
				</div>
			</div>
			<p className="description framed">{team.description}</p>
			<div className="row">
				{INSTANCES_KEYS.map(
					// prettier-ignore
					key => !!team[key] && (
						<div key={key} className='col-12 col-sm-6 col-xl-12 vertically-centered'>
							<PokemonInstance instance={team[key]} gen={team.gen} tier={team.tier}/>
						</div>
					)
				)}
			</div>
			<SectionAds />
			<CommentArea entity={team} entityName="team" />
		</PageWrapper>
	);
};
export default TeamArticle;
