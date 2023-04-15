// modules
import React from 'react';

const VideoEmbed = ({ url, cookie = false }) => {
	let trueUrl = url;
	if (!cookie) {
		trueUrl = trueUrl.replace(/youtube.com/, 'youtube-nocookie.com');
	}

	return (
		<div className="video-wrapper">
			<iframe
				width="100%"
				height="567"
				src={`${trueUrl}?rel=0`}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	);
};
export default VideoEmbed;
