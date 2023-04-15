// modules
import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// hooks
import useResetScroll from '../../hooks/useResetScroll';
// components
// import ErrorBoundary from '../ErrorBoundary';
import Header from '../Header';
import Footer from '../Footer';
import EntityRouter from './EntityRouter';
import ListRouter from './ListRouter';
import AdminRouter from './AdminRouter';
import Page404 from '../pages/Page404';
import Home from '../pages/Home';
import TeamList from '../pages/list/TeamList';
import SearchResult from '../pages/list/SearchResult';
import ProposeTeam from '../pages/form/ProposeTeam';
import UserFormPage from '../pages/form/UserFormPage';
import ResetForgottenPassword from '../pages/form/ResetForgottenPassword';
import FavoriteTeam from '../pages/list/ListFavoriteTeam';
import VideoList from '../pages/list/VideoList';
import ResourcesPage from '../pages/list/ResourcesPage';
import ActualityFormPage from '../pages/form/ActualityFormPage';
import ActualityList from '../pages/list/ActualityList';
import GuideFormPage from '../pages/form/GuideFormPage';
import GuideList from '../pages/list/GuideList';
import TournamentFormPage from '../pages/form/TournamentFormPage';
import TournamentList from '../pages/list/TournamentList';
import LegalNotices from '../pages/LegalNotices';
import Thanks from '../pages/Thanks';
import CGU from '../pages/CGU';
import TopWeek from '../pages/article/TopWeek';
import PokemonByNameContainer from '../../containers/PokemonByNameContainer';
import MovePool from '../pages/list/MovePool';
import NotificationList from '../pages/list/NotificationList';
import MoveByType from '../pages/list/MoveByType';

function PageRouter() {
	useResetScroll();
	return (
		<Fragment>
			<Header />
			<main>
				{/* <ErrorBoundary> */}
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/user" exact>
						<UserFormPage />
					</Route>
					<Route path="/entity/teams" exact>
						<TeamList />
					</Route>
					<Route path="/entity/teams/top" exact>
						<TopWeek />
					</Route>
					<Route path={'/entity/teams/create'} exact>
						<ProposeTeam />
					</Route>
					<Route path="/entity/teams/favorites" exact>
						<FavoriteTeam />
					</Route>
					<Route path="/notifications" exact>
						<NotificationList />
					</Route>
					<Route path="/entity/actualities" exact>
						<ActualityList />
					</Route>
					<Route path={'/entity/actualities/create'} exact>
						<ActualityFormPage />
					</Route>
					<Route path="/entity/guides" exact>
						<GuideList />
					</Route>
					<Route path={'/entity/guides/create'} exact>
						<GuideFormPage />
					</Route>
					<Route path="/entity/tournaments" exact>
						<TournamentList />
					</Route>
					<Route path={'/entity/tournaments/create'} exact>
						<TournamentFormPage />
					</Route>
					<Route path="/entity/videos" exact>
						<Redirect to={'/videos'} />
					</Route>
					<Route path="/entity/moves/pokemon/:id" exact>
						<MovePool />
					</Route>
					<Route path="/entity/moves/type/:id" exact>
						<MoveByType />
					</Route>
					<Route path="/entity/:type" exact>
						<ListRouter />
					</Route>
					<Route path="/pokemon-name/:name">
						<PokemonByNameContainer />
					</Route>
					<Route path="/entity/:type/:id">
						<EntityRouter />
					</Route>
					<Route path={'/search/:isuser?/:string'} exact>
						<SearchResult />
					</Route>
					<Route path="/videos" exact>
						<VideoList />
					</Route>
					<Route path="/resources" exact>
						<ResourcesPage />
					</Route>
					<Route path="/resetPassword/:renewPasswordToken" exact>
						<ResetForgottenPassword />
					</Route>
					<Route path="/admin">
						<AdminRouter />
					</Route>
					<Route path="/mentions-legales" exact>
						<LegalNotices />
					</Route>
					<Route path="/cgu" exact>
						<CGU />
					</Route>
					<Route path="/remerciements" exact>
						<Thanks />
					</Route>
					<Route path="/404" exact>
						<Page404 />
					</Route>
					{/* Redirection */}
					<Route path="/">
						<Redirect to="/404" />
					</Route>
				</Switch>
				{/* </ErrorBoundary> */}
			</main>
			<Footer />
		</Fragment>
	);
}
export default PageRouter;
