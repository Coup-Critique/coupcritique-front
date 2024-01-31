// modules

import { Helmet } from 'react-helmet';

// 2 description conditions for helmet functionment
const MetaData = ({ title, description, image, nofollow = false }) => (
	<Helmet>
		<title data-react-helmet="true">{title}</title>
		<meta name="title" content={title} data-react-helmet="true" />
		<meta name="og:title" content={title} data-react-helmet="true" />
		{!!description && (
			<meta name="description" content={description} data-react-helmet="true" />
		)}
		{!!description && (
			<meta name="og:description" content={description} data-react-helmet="true" />
		)}
		{!!image && (
			<meta
				property="og:image"
				content={'https://www.coupcritique.fr/images/' + image}
				data-react-helmet="true"
			/>
		)}
		{nofollow ? (
			<meta name="robots" content="noindex, nofollow" data-react-helmet="true" />
		) : (
			<meta name="robots" content="index, follow" data-react-helmet="true" />
		)}
	</Helmet>
);
export default MetaData;
