// modules

import Image from 'next/image';
import { useMemo, useState } from 'react';

const VideoEmbed = ({ youtube_id, cookie = false }) => {
	const [clicked, setClicked] = useState(false);

	let trueUrl = useMemo(() => {
		if (cookie) {
			return `https://www.youtube.com/embed/${youtube_id}`;
		}
		return `https://www.youtube-nocookie.com/embed/${youtube_id}`;
	}, [youtube_id, cookie]);

	return clicked ? (
		<div className="video-wrapper">
			<iframe
				height="304"
				width="540"
				src={`${trueUrl}?rel=0&autoplay=1`}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	) : (
		<div className="pre-video-wrapper" onClick={() => setClicked(true)}>
			<Image
				src={`https://img.youtube.com/vi/${youtube_id}/sddefault.jpg`}
				alt="YouTube video player"
				height="405"
				width="540"
			/>
		</div>
	);
};
export default VideoEmbed;
