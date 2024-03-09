// modules

// components
import TournamentContainer from '@/containers/TournamentContainer';
import TournamentFormPage from '@/app/entity/tournaments/create';

const TournamentUpdatePage = () => (
	<TournamentContainer Component={TournamentFormPage} update />
);

export default TournamentUpdatePage;
