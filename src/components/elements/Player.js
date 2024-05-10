const Player = ({ player }) => {
	return (
		<div>
			<h4>{player.showdown_name}</h4>
			<p>{player.rank}</p>
		</div>
	);
};

export default Player;
