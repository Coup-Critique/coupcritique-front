// modules
import React from 'react';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { makeClassName } from '@/functions';

const Tier = ({
	tier,
	technically = false,
	displayGen = true,
	noLink = false,
	className,
	...props
}) => {
	if (tier.name === 'Untiered') return tier.name;

	let Wrapper = noLink ? 'span' : Link;
	return (
		<Wrapper
			to={`/entity/tiers/${tier.id}`}
			className={makeClassName('tier', 'd-inline-block', className)}
			title=""
		>
			<Label color="blue" {...props} className={makeClassName(!noLink && 'link')}>
				{technically
					? '(' + (tier.shortName || tier.name) + ')'
					: tier.shortName || tier.name}{' '}
				{displayGen && tier.gen + 'G'}
			</Label>
		</Wrapper>
	);
};

export default Tier;
