import Link from 'next/link';
import { makeClassName } from '@/functions';
import { Icon } from 'semantic-ui-react';

const LinkButton = ({
	color,
	inverted = false,
	outline = false,
	className,
	label,
	icon,
	...props
}) => (
	<Link
		className={makeClassName(
			'btn',
			color && `btn-${color}`,
			{ inverted, outline },
			className
		)}
		role="button"
		aria-label={label || props.children}
		{...props}
	>
		{props.children || (
			<>
				{icon && <Icon name={icon} />}
				{label}
			</>
		)}
	</Link>
);

export default LinkButton;
