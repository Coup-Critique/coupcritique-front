// modules

// components
import GuideContainer from '@/containers/GuideContainer';
import GuideFormPage from '@/pages/entity/guides/create';

const GuideUpdatePage = () => (
	<GuideContainer Component={GuideFormPage} update />
);

export default GuideUpdatePage;
