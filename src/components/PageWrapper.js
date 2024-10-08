// modules

import { makeClassName } from '@/functions';
import MetaData from '@/components/MetaData';
import GoBackButton from './GoBackButton';

const PageWrapper = ({
	title,
	className,
	children,
	action,
	goingBack = false,
	goBack,
	more = false,
	min = false,
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
		<div className={makeClassName('container simple-content', { more, min })}>
			{!!title && (
				<div className="title-banner">
					<h1>
						{goingBack && (
							<GoBackButton
								defaultUrl={goingBack === true ? undefined : goingBack}
								callback={goBack}
							/>
						)}{' '}
						{title}
					</h1>
					{action}
				</div>
			)}
			{children}
		</div>
	</article>
);
export default PageWrapper;
