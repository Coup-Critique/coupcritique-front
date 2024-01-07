
import TeamContainer from '@/containers/TeamContainer';
import TeamFormPage from '@/pages/entity/teams/create';

const TeamUpdatePage = () => <TeamContainer Component={TeamFormPage} update={true} />;
export default TeamUpdatePage;
