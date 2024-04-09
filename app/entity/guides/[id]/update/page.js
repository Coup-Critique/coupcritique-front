// modules

// components
import GuideContainer from '@/containers/GuideContainer';
import GuideFormPage from '@/app/entity/guides/create';

const GuideUpdatePage = () => (
	<GuideContainer Component={GuideFormPage} update />
);

export default GuideUpdatePage;
