// modules
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
// constants
import { INSTANCES_KEYS } from '../../../constants/team';
// components
import PageWrapper from '../../PageWrapper';
import Profile from '../../elements/Profile';
import Tier from '../../elements/Tier';
import Tag from '../../elements/Tag';
import PokemonInstance from '../../elements/PokemonInstance';
import Export from '../../actions/Export';
import Certification from '../../elements/Certification';
import CertificationButton from '../../actions/CertificationButton';
import TeamBanButton from '../../actions/TeamBanButton';
import DeleteAction from '../../actions/DeleteAction';
import Favorite from '../../actions/Favorite';
import SpritePokemon from '../../elements/SpritePokemon';
import GoBackButton from '../../GoBackButton';
import TeamTopButton from '../../actions/TeamTopButton';
import { addMessage } from '../../../reducers/messages';
// import ScrollReveal from '../../ScrollReveal';
import SectionAds from '../../sections/SectionAds';
import { formatDate, formatFileName } from '../../../functions';
import CommentArea from '../../CommentArea';
import Replay from '../../elements/Replay';

const TeamArticle = ({ result }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector(state => state.user);
	const [team, setTeam] = useState((result && result.team) || {});

	useEffect(() => {
		if (result && result.success) {
			setTeam(result.team);
		}
	}, [result]);

	const handleValue = (name, value) => setTeam({ ...team, [name]: value });

	const handleRemove = resultDelete => {
		if (resultDelete.message) {
			dispatch(addMessage(resultDelete.message, true));
		}
		if (history.length > 3) {
			history.goBack();
		} else {
			history.push('/user');
		}
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
						to={`/entity/teams/${team.id}/update`}
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
						{!!team.update_date
							&& ' - (dernière mise à jour le : '
								+ formatDate(team.update_date)
								+ ')'}
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
