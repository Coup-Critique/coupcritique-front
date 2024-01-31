// modules

import { Label } from 'semantic-ui-react';

const Tag = ({ tag }) => (
	<Label color={tag.sortOrder === 0 ? 'red' : 'orange'} className="team-tag">
		#{tag.shortName || tag.name}
	</Label>
);

export default Tag;
