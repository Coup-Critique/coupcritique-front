import { defaultSrc } from './ArtPokemon';
import ImageLoader from './ImageLoader';

const Player = ({ name, ...props }) => {
	if (!name) return null;
	return (
		<ImageLoader
			src={`/images/players/${name}.png`}
			defaultSrc={defaultSrc}
			alt={name}
			height={48}
			width={48}
			{...props}
		/>
	);
};

export default Player;
