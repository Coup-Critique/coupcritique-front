import React from 'react';
import { Icon, Pagination } from 'semantic-ui-react';

const PaginationPrettier = ({ activePage = 1, ...props }) => (
	<div className="pagination-wrapper">
		<Pagination
			activePage={activePage}
			firstItem={{ content: <Icon name="angle double left" />, icon: true }}
			prevItem={{ content: <Icon name="angle left" />, icon: true }}
			nextItem={{ content: <Icon name="angle right" />, icon: true }}
			lastItem={{ content: <Icon name="angle double right" />, icon: true }}
			{...props}
		/>
	</div>
);

export default PaginationPrettier;
