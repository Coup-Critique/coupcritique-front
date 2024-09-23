// modules
import { Button, Form, Icon, Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
// components
import PageWrapper from '@/components/PageWrapper';
import TableTeam from '@/components/table/TableTeam';
import UserBanButton from '@/components/actions/UserBanButton';
import UserModoButton from '@/components/actions/UserModoButton';
// constant
import { MONTHS } from '@/constants/months';
import useTableFetch from '@/hooks/useTableFetch';
import UserTiperButton from '@/components/actions/UserTiperButton';
import useStateProps from '@/hooks/useStateProps';
import TableTourRanking from '../table/TableTourRanking';
import {
	badgeIsCertified,
	badgeIsContentCreator,
	badgeIsModo,
	badgeIsTiper,
	badgeIsWeeker,
	badgeIsWinner,
} from '@/constants/badges';
import { capitalize } from '@/functions';
import { useState } from 'react';
import Badge from '../elements/Badge';
// import Image from 'next/image';

const defaultValue = {};
const UserArticle = props => {
	const ownUser = useSelector(state => state.user);
	const [user, setUser] = useStateProps(props.user || defaultValue);

	const {
		table,
		setTable,
		loading,
		handleLoad,
		nbPages,
		query,
		handlePage,
		handleSort,
	} = useTableFetch(
		'teams',
		{
			loadUrl: user && !user.loading && user.id ? `teams/user/${user.id}` : null,
		},
		props.teams
	);

	const handleValue = (name, value) => setUser({ ...user, [name]: value });

	if (!user) return null;

	const date = new Date(user.date_creation);
	const user_date = MONTHS[date.getMonth()] + ' ' + date.getFullYear();

	return (
		<PageWrapper
			more
			className="article user"
			title="Profil"
			metatitle={"Profil de l'utilisateur " + user.username}
			metaimage={user.picture && `users/${user.picture}`}
			goingBack
		>
			<div className="row">
				{/* <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 mb-4"> */}
				<div className="col-12 col-sm-6 col-md-5 col-lg-3 mb-4">
					{user.picture ? (
						// eslint-disable-next-line jsx-a11y/img-redundant-alt
						<img
							className={'img-fluid img-profile'}
							src={`${process.env.NEXT_PUBLIC_API_URL}/images/uploads/users/${user.picture}`}
							alt="Photo de profil"
							onError={e => {
								e.target.onerror = null;
								e.target.src = '/images/picto/user-circle-solid.svg';
							}}
							// TODO gerer une taille fixe
						/>
					) : (
						<Icon name="user circle" size="massive" />
					)}
				</div>
				{/* <div className="col-12 col-sm-6 col-md-7 col-lg-8 col-xl-9 mb-4"> */}
				<div className="col-12 col-sm-6 col-md-7 col-lg-9 mb-4">
					<h2>
						{user.username} {user.is_modo && <Badge badge={badgeIsModo} size="small"/>}
						{user.is_content_creator && (
							<Badge badge={badgeIsContentCreator} size="small"/>
						)}
						{user.is_winner && <Badge badge={badgeIsWinner} size="small"/>}
						{user.is_weeker && <Badge badge={badgeIsWeeker} size="small"/>}
						{user.is_certified && <Badge badge={badgeIsCertified} size="small"/>}
						{user.is_tiper && <Badge badge={badgeIsTiper} size="small"/>}
						{/* {user.is_subscriber && <Badge badge={badgeIsSubscriber} size="small"/>} */}
					</h2>
					<div className="user-info">
						<p>Membre depuis&nbsp;: {user_date}</p>
						<p>Nombre de commentaires&nbsp;: {props.nbComments}</p>
						{!!user.discord_name && <p>Discord&nbsp;: {user.discord_name}</p>}
						{!!user.showdown_name && (
							<p>Showdown&nbsp;: {user.showdown_name}</p>
						)}
						{ownUser.is_modo && (
							<>
								{!user.is_modo && (
									<p>
										<UserBanButton
											user={user}
											handleBan={handleValue}
										/>
										{ownUser.is_admin && (
											<UserModoButton
												user={user}
												handleModo={handleValue}
											/>
										)}
									</p>
								)}
								<p>
									<UserTiperButton
										user={user}
										handleTiper={handleValue}
									/>
								</p>
							</>
						)}
					</div>
				</div>
				<div className="col-12 col-lg-5 mb-4">
					{/* <UserBiography user={user} /> */}
				</div>
			</div>
			{!!props.players && (
				<div className="mb-4">
					<h3 className="ui header">Résultats sur le Circuit</h3>
					<TableTourRanking
						players={props.players}
						circuitTours={props.circuitTours}
					/>
				</div>
			)}
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active inline="centered" />
				) : (
					table.length > 0 && (
						<>
							<h3 className="ui header">Équipes de {user.username}</h3>
							<TableTeam
								teams={table}
								setTeams={setTable}
								handleLoad={handleLoad}
								handleSort={handleSort}
								handlePage={handlePage}
								query={query}
								nbPages={nbPages}
								hideUser
							/>
						</>
					)
				)}
			</div>
		</PageWrapper>
	);
};

// const UserBiography = ({ user }) => {
// 	const ownUser = useSelector(state => state.user);
// 	const [updating, setUpdating] = useState(false);

// 	const handleUpdate = e => {
// 		setUpdating(false);
// 	};

// 	const handleCancel = e => {
// 		e.preventDefault();
// 		setUpdating(false);
// 	};

// 	return (
// 		<>
// 			<h3 className="ui header">Bio&nbsp;:</h3>
// 			{updating ? (
// 				<Form />
// 			) : (
// 				<>
// 					{user && <p>{user.biography}</p>}
// 					{ownUser.id == user.id && (
// 						<Button
// 							color="blue"
// 							icon="pencil"
// 							content="Modifier sa bio"
// 							area-label="Modifier sa bio"
// 							onClick={handleUpdate}
// 							className="btn-descr"
// 						/>
// 					)}
// 				</>
// 			)}
// 		</>
// 	);
// };

export default UserArticle;
