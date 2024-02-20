// modules
import { useEffect, useState } from 'react';
import { Icon, Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
// components
import PageWrapper from '@/components/PageWrapper';
import TableTeam from '@/components/table/TableTeam';
import UserBanButton from '@/components/actions/UserBanButton';
import UserModoButton from '@/components/actions/UserModoButton';
// constant
import { MONTHS } from '@/constants';
import GoBackButton from '@/components/GoBackButton';
import useTableFetch from '@/hooks/useTableFetch';
import UserTiperButton from '@/components/actions/UserTiperButton';
import useStateProps from '@/hooks/useStateProps';

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
				<div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 mb-4">
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
				<div className="col-12 col-sm-6 col-md-7 col-lg-8 col-xl-9 mb-4">
					<h2>{user.username}</h2>
					<div className="user-info">
						<p>Membre depuis&nbsp;: {user_date}</p>
						<p>Nombre de commentaires&nbsp;: {props.nbComments}</p>
						{!!user.discord_name && <p>Discord&nbsp;: {user.discord_name}</p>}
						{!!user.showdown_name && (
							<p>Showdown&nbsp;: {user.showdown_name}</p>
						)}
						{ownUser.is_modo && (
							<>
								{user.is_admin ? (
									<p>
										Rôle&nbsp;:{' '}
										<Icon name="chess queen" color="purple" />{' '}
										Administrateur
									</p>
								) : user.is_modo ? (
									<p>
										Rôle&nbsp;: <Icon name="gem" color="violet" />{' '}
										Modérateur
									</p>
								) : (
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
						{!!user.is_tiper && (
							<p>
								<Icon name="gratipay" color="red" /> Contributeur
							</p>
						)}
					</div>
				</div>
			</div>
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
export default UserArticle;
