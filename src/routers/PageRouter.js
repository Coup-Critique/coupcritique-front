// modules
import { Switch, Route, Redirect } from 'react-router-dom';
// hooks
import useResetScroll from '@/hooks/useResetScroll';
// components
// import ErrorBoundary from '../ErrorBoundary';
import EntityRouter from '@/routers/EntityRouter';
import ListRouter from '@/routers/ListRouter';
import AdminRouter from '@/routers/AdminRouter';
import Home from '@/pages';
import Page404 from '@/pages/404';
import LegalNotices from '@/pages/mentions-legales';
import CGU from '@/pages/cgu';
import Thanks from '@/pages/remerciements';
import TeamList from '@/pages/list/TeamList';
import SearchResult from '@/pages/list/SearchResult';
import ProposeTeam from '@/pages/form/ProposeTeam';
import UserFormPage from '@/pages/form/UserFormPage';
import ResetForgottenPassword from '@/pages/resetPassword/[token]';
import FavoriteTeam from '@/pages/list/ListFavoriteTeam';
import VideoList from '@/pages/list/VideoList';
import ResourcesPage from '@/pages/list/ResourcesPage';
import ActualityFormPage from '@/pages/form/ActualityFormPage';
import ActualityList from '@/pages/list/ActualityList';
import GuideFormPage from '@/pages/form/GuideFormPage';
import GuideList from '@/pages/list/GuideList';
import TournamentFormPage from '@/pages/form/TournamentFormPage';
import TournamentList from '@/pages/list/TournamentList';
import TopWeek from '@/pages/article/TopWeek';
import PokemonByNameContainer from '@/containers/PokemonByNameContainer';
import MovePool from '@/pages/list/MovePool';
import NotificationList from '@/pages/list/NotificationList';
import MoveByType from '@/pages/list/MoveByType';

function PageRouter() {
	useResetScroll();
	return (
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
			<Route path={'/search/user/:string'} exact>
				<SearchResult />
			</Route>
			<Route path={'/search/:string'} exact>
				<SearchResult />
			</Route>
			<Route path="/videos" exact>
				<VideoList />
			</Route>
			<Route path="/resources" exact>
				<ResourcesPage />
			</Route>
			<Route path="/resetPassword/:token" exact>
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
	);
}
export default PageRouter;
