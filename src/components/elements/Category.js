// modules

import { IMG_VERSION } from '@/constants/img';
import { formatFileName } from '@/functions';
import Image from 'next/image';

const Category = ({ category }) => (
	<div className="d-inline-block">
		<Image
			className="category"
			src={`/images/categories/${formatFileName(category)}.png?ver=${IMG_VERSION}`}
			alt={`Catégorie ${category}`}
			title={category}
			width="39"
			height="20"
		/>
	</div>
);
export default Category;
