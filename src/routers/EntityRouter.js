// modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	useParams,
	useHistory,
	Switch,
	Route,
	Redirect,
	useLocation,
} from 'react-router-dom';
// components
import PokemonArticle from '@/pages/article/PokemonArticle';
import TeamArticle from '@/pages/article/TeamArticle';
import MoveArticle from '@/pages/article/MoveArticle';
import TypeArticle from '@/pages/article/TypeArticle';
import AbilityArticle from '@/pages/article/AbilityArticle';
import ItemArticle from '@/pages/article/ItemArticle';
import TierArticle from '@/pages/article/TierArticle';
import UserArticle from '@/pages/article/UserArticle';
import ActualityArticle from '@/pages/article/ActualityArticle';
import ProposeTeam from '@/pages/form/ProposeTeam';
import ActualityFormPage from '@/pages/form/ActualityFormPage';
import GuideArticle from '@/pages/article/GuideArticle';
import GuideFormPage from '@/pages/form/GuideFormPage';
import TournamentArticle from '@/pages/article/TournamentArticle';
import TournamentFormPage from '@/pages/form/TournamentFormPage';
// hooks
import useFetch from '@/hooks/useFetch';
// constants
import { entities, entitiesToEntity, checkNotif } from '@/constants/entities';
import { setNotifAction } from '@/reducers/notifs';
import PokemonContainer from '@/containers/PokemonContainer';
import TeamContainer from '@/containers/TeamContainer';
import TypeContainer from '@/containers/TypeContainer';
import MoveContainer from '@/containers/MoveContainer';
import AbilityContainer from '@/containers/AbilityContainer';
import ItemContainer from '@/containers/ItemContainer';
import ActualityContainer from '@/containers/ActualityContainer';
import GuideContainer from '@/containers/GuideContainer';
import TournamentContainer from '@/containers/TournamentContainer';
import TierContainer from '@/containers/TierContainer';
import UserContainer from '@/containers/UserContainer';

const EntityRouter = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state);
	const history = useHistory();
	const { type, id } = useParams();
	const { pathname } = useLocation();
	const [resultNotif, loadNotif] = useFetch();

	useEffect(() => {
		if (isNaN(id)) return history.push('/404');
		if (!entities[type]) return history.push('/404');
		if (user.id && checkNotif[type]) {
			loadNotif({ url: `notifications/view/${entitiesToEntity[type]}/${id}` });
		}
	}, [pathname, user.loading, user.id]);

	useEffect(() => {
		if (resultNotif) {
			if (resultNotif.success) {
				dispatch(setNotifAction(resultNotif.count));
			}
		}
	}, [resultNotif]);

	return (
		<Switch>
			<Route path="/entity/pokemons/:id">
				<PokemonContainer Component={PokemonArticle} />
			</Route>
			<Route path="/entity/teams/:id/update">
				<Sample>
					<TeamContainer Component={ProposeTeam} update={true} />
				</Sample>
			</Route>
			<Route path="/entity/teams/:id">
				<TeamContainer Component={TeamArticle} />
			</Route>
			<Route path={'/entity/types/:id'}>
				<TypeContainer Component={TypeArticle} />
			</Route>
			<Route path={'/entity/moves/:id'}>
				<MoveContainer Component={MoveArticle} />
			</Route>
			<Route path={'/entity/abilities/:id'}>
				<AbilityContainer Component={AbilityArticle} />
			</Route>
			<Route path={'/entity/items/:id'}>
				<ItemContainer Component={ItemArticle} />
			</Route>
			<Route path={'/entity/tiers/:id'}>
				<TierContainer Component={TierArticle} />
			</Route>
			<Route path="/entity/users/:id">
				<UserContainer Component={UserArticle} />
			</Route>
			<Route path="/entity/actualities/:id/update">
				<Sample>
					<ActualityContainer Component={ActualityFormPage} update={true} />
				</Sample>
			</Route>
			<Route path="/entity/actualities/:id">
				<ActualityContainer Component={ActualityArticle} />
			</Route>
			<Route path="/entity/guides/:id/update">
				<Sample>
					<GuideContainer Component={GuideFormPage} update={true} />
				</Sample>
			</Route>
			<Route path="/entity/guides/:id">
				<GuideContainer Component={GuideArticle} />
			</Route>
			<Route path="/entity/tournaments/:id/update">
				<Sample>
					<TournamentContainer Component={TournamentFormPage} update={true} />
				</Sample>
			</Route>
			<Route path="/entity/tournaments/:id">
				<TournamentContainer Component={TournamentArticle} />
			</Route>
			{/* Redirection */}
			<Route path="/">
				<Redirect to="/404" />
			</Route>
		</Switch>
	);
};

// When there is the same child between 2 routes
const Sample = ({ children }) => children;

export default EntityRouter;
