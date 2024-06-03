import { defaultSrc } from './ArtPokemon';
import ImageLoader from './ImageLoader';

const Player = ({ player }) => {
	return (
		<div className="text-center">
			<ImageLoader
				src={`/images/uploads/players/${player.showdown_name}.png`}
				defaultSrc={defaultSrc}
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
