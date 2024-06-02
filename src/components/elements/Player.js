const Player = ({ player }) => {
	return (
		<div className="text-center">
			<img
				src={`/images/uploads/players/${player.showdown_name}.png`}
				alt={player.showdown_name}
				height={80}
				width={80}
			/>
			<h5>{player.showdown_name}</h5>
			<p>{player.points}&nbsp;pts</p>
		</div>
	);
};

export default Player;
