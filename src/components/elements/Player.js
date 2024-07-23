import { defaultSrc } from './ArtPokemon';
import ImageLoader from './ImageLoader';

const Player = ({ showdown_name, ...props }) => {
	return (
		<ImageLoader
			src={`/images/uploads/players/${showdown_name}.png`}
			defaultSrc={defaultSrc}
			alt={showdown_name}
			height={40}
			width={40}
			{...props}
		/>
	);
};

export default Player;
