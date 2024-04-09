// modules

import { makeClassName } from '@/functions';
import GoBackButton from '@/components/GoBackButton';

// TODO title + | Coup Critique Stratégie Pokémon
const PageWrapper = ({
	title,
	className,
	children,
	action,
	goingBack = false,
	more = false,
	min = false,
	metatitle = title,
	metadescription,
	metaimage,
	nofollow,
}) => (
	<article className={className}>
		<div className={makeClassName('container simple-content', { more, min })}>
			{!!title && (
				<div className="title-banner">
					<h1>
						{goingBack && (
							<GoBackButton
								defaultUrl={goingBack === true ? undefined : goingBack}
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
