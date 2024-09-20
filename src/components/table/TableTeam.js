// module

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Icon, Label, Popup } from 'semantic-ui-react';
// components
import { TableBase, colorOddRows, DESC, ASC } from '@/components/table/Table';
import SpritePokemon from '@/components/elements/SpritePokemon';
import Profile from '@/components/elements/Profile';
import Tag from '@/components/elements/Tag';
import Tier from '@/components/elements/Tier';
// reducers
import Certification from '@/components/elements/Certification';
import CertificationButton from '@/components/actions/CertificationButton';
import TeamBanButton from '@/components/actions/TeamBanButton';
import HistoryPopup from '@/components/actions/HistoryPopup';
// functions
import { formatDate, makeClassName } from '@/functions';
// const
import { INSTANCES_KEYS } from '@/constants/team';
import Favorite from '@/components/actions/Favorite';
import PaginationPrettier from '@/components/PaginationPrettier';
import useClick from '@/hooks/useClick';
import DeleteAction from '@/components/actions/DeleteAction';
import SectionAds from '@/components/sections/SectionAds';
import { useMemo } from 'react';

const TableTeam = ({
	teams = [],
	setTeams,
	deletable = false,
	hideUser = false,
	isModo = false,
	query,
	handleLoad,
	handlePage,
	handleSort,
	nbPages,
}) => {
	const user = useSelector(state => state.user);
	const darkMode = useSelector(state => state.darkMode);

	const handleUpdate = (i, team) => {
		const nextTeams = teams.slice();
		nextTeams[i] = team;
		setTeams(nextTeams);
	};

	const handleRemove = i => {
		if (nbPages > 1) {
			handleLoad();
		} else {
			const nextTeams = teams.slice();
			nextTeams.splice(i, 1);
			setTeams(nextTeams);
		}
	};

	const isUserConnected = !user.loading && user.id;
	return (
		<>
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={query.page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
			<TableBase
				className="table-pokemon table-team"
				cols={[
					{
						key: 'certified',
						content: 'Certif',
						sortable: true,
						className: 'pr-0',
					},
					{ key: 'tier', content: 'Tier', sortable: true },
					{
						key: 'pkm_inst',
						content: 'Pokémon',
						sortable: false,
						className: 'table-team-instance',
					},
					!hideUser && { key: 'user', content: 'Utilisateur', sortable: true },
					{ key: 'date_creation', content: 'Date', sortable: true },
					{
						key: 'name',
						content: 'Nom',
						sortable: true,
						className: 'd-none d-md-table-cell',
					},
					{
						key: 'tags',
						content: 'Catégories',
						sortable: false,
						className: 'd-none d-md-table-cell',
					},
					{
						key: 'countEnjoyers',
						content: 'Favoris',
						sortable: true,
					},
					(deletable || isModo) && 'Action',
				]}
				sortable
				sortedCol={query.order}
				orderDirection={query.orderDirection}
				handleSort={handleSort}
			>
				<tbody>
					{teams.map((team, i) => (
						<RowTeam
							key={i}
							index={i}
							/* className={colorOddRows(i)} */
							team={team}
							user={user}
							deletable={deletable}
							hideUser={hideUser}
							isModo={isModo}
							darkMode={darkMode}
							handleUpdate={handleUpdate}
							handleRemove={handleRemove}
							isUserConnected={isUserConnected}
						/>
					))}
				</tbody>
			</TableBase>
			<SectionAds className="mt-4" />
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={query.page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
		</>
	);
};

const RowTeam = ({
	index,
	team,
	user,
	deletable,
	hideUser,
	isModo,
	darkMode,
	handleUpdate,
	handleRemove,
	className,
	isUserConnected,
}) => {
	const router = useRouter();
	const linkTo = useMemo(
		() => ({
			pathname: `/entity/teams/${team.id}`,
			query: { from: router.asPath.split('#')[0].split('?')[0] },
		}),
		[router.asPath, team.id]
	);
	const [handleClick, handleStopClick] = useClick(linkTo);

	const handleModify = e => router.push(`/entity/teams/${team.id}/update`);

	const handleValue = (name, value) => handleUpdate(index, { ...team, [name]: value });

	return (
		<tr
			id={'team-' + team.id}
			className={makeClassName('tr-clickable', className)}
			title={"L'équipe " + team.name}
			onClick={handleClick}
		>
			<td className="pr-0">
				<Certification className="img-fluid" team={team} userId={user.id} />
			</td>
			<td>
				<Tier tier={team.tier} />
			</td>
			<td className="list nowrap">
				<div className="team-grid">
					{INSTANCES_KEYS.map(
						key =>
							!!team[key] && (
								<SpritePokemon
									key={key}
									pokemon={team[key].pokemon}
									noLink
								/>
							)
					)}
				</div>
			</td>
			{!hideUser && (
				<td className="text-left">
					<Profile user={team.user} className="justify-content-start" />
				</td>
			)}
			<td>{formatDate(team.date_creation)}</td>
			<td className="text-left text-break d-none d-md-table-cell">
				<Link href={linkTo}>{team.name}</Link>
			</td>
			<td className="list nowrap d-none d-md-table-cell">
				{team.tags.length > 2 ? (
					<>
						<Tag tag={team.tags[0]} />
						<Tag tag={team.tags[1]} />
						<Popup
							position="bottom center"
							basic
							wide="very"
							on="click"
							className={makeClassName(
								'tag-popup',
								darkMode && 'dark-mode'
							)}
							trigger={
								<Label
									onClick={e => e.stopPropagation()}
									className="mb-1 align-top To more-tags-btn"
									icon="angle down"
									title="Afficher les tags suivants"
								/>
							}
						>
							{team.tags.map(
								(tag, i) => i > 1 && <Tag key={i} tag={tag} />
							)}
						</Popup>
					</>
				) : (
					team.tags.map((tag, i) => <Tag key={i} tag={tag} />)
				)}
			</td>
			<td className="td-action" title="">
				<Favorite isIcon team={team} action={isUserConnected} />
			</td>
			{deletable && (
				<td className="td-action" title="">
					<Icon
						link
						name="pencil"
						color="blue"
						onClick={handleModify}
						title="modifier"
					/>
					<DeleteAction
						isIcon
						url={`teams/${team.id}`}
						callback={() => handleRemove(index)}
						confirmProps={{
							children: `Êtes-vous sûr de vouloir supprimer cette équipe\u00A0?`,
							handleStopClick: handleStopClick,
						}}
					/>
				</td>
			)}
			{isModo && (
				<td className="td-action" title="">
					<CertificationButton isIcon team={team} handleCertif={handleValue} />
					<TeamBanButton isIcon team={team} handleBan={handleValue} />
					<HistoryPopup history={team.history} />
				</td>
			)}
		</tr>
	);
};

export default TableTeam;
