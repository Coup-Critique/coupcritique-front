import { defaultSrc } from './ArtPokemon';
import ImageLoader from './ImageLoader';

const Player = ({ showdown_name, ...props }) => {
	return (
		<ImageLoader
			src={`/images/uploads/players/${showdown_name}.png`}
			defaultSrc={defaultSrc}
			alt={showdown_name}
			height={48}
			width={48}
			{...props}
		/>
	);
};

export default Player;
