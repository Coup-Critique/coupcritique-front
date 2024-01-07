// modules

import { REPLAY_URL } from '@/constants';

const Replay = ({ uri }) => (
	<div>
		-{' '}
		<a href={REPLAY_URL + uri} target="_blank" rel="nofollow noreferrer">
			{REPLAY_URL}
			{uri}
		</a>
	</div>
);

export default Replay;
