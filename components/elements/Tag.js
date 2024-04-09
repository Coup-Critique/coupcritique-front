// modules

import { Label } from 'semantic-ui-react';

const Tag = ({ tag }) => <Label className="team-tag">#{tag.shortName || tag.name}</Label>;

export default Tag;
