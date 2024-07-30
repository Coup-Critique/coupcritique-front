import { makeClassName } from '@/functions';

const ExtLinkButton = ({
	color,
	basic = false,
	inverted = false,
	className,
	text,
	...props
}) => (
	<a
		className={makeClassName(
			'btn',
			color && `btn-${color}`,
			{ basic, inverted },
			className
		)}
		role="button"
		aria-label={text || props.children}
		target="_blank"
		rel="nofollow noreferrer"
		{...props}
	/>
);

export default ExtLinkButton;
