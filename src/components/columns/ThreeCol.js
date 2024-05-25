import { makeClassName } from '@/functions';

const ThreeCol = ({ children, className }) => {
	return (
		<div
			className={makeClassName(
				'col-12 col-sm-6 col-lg-4 align-items-center',
				className
			)}
		>
			{children}
		</div>
	);
};

export default ThreeCol;
