// modules

import { makeClassName } from '@/functions';
import MetaData from '@/components/MetaData';

const PageWrapper = ({
	title,
	className,
	children,
	more = false,
	metatitle = title,
	metadescription,
	metaimage,
	nofollow,
}) => (
	<article className={className}>
		<MetaData
			title={
				metatitle ? `${metatitle} | Coup Critique Stratégie Pokémon` : undefined
			}
			description={metadescription}
			image={metaimage}
			nofollow={nofollow}
		/>
		{!!title && (
			<div className="title-banner">
				<div className="container">
					<h1>{title}</h1>
				</div>
			</div>
		)}
		<div className={makeClassName('container simple-content', more && 'more')}>
			{children}
		</div>
	</article>
);
export default PageWrapper;
