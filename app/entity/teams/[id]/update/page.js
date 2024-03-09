
import TeamContainer from '@/containers/TeamContainer';
import TeamFormPage from '@/app/entity/teams/create';

const TeamUpdatePage = () => <TeamContainer Component={TeamFormPage} update={true} />;
export default TeamUpdatePage;
