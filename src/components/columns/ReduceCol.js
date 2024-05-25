import { makeClassName } from '@/functions';
import ThreeCol from './ThreeCol';

const ReduceCol = ({ children, className, i }) => {
	return (
		<ThreeCol
			className={makeClassName(
				i > 1 ? 'd-none d-lg-flex' : i > 0 && 'd-none d-sm-flex',
				className
			)}
		>
			{children}
		</ThreeCol>
	);
};

export default ReduceCol;
