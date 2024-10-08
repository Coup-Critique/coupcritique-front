// modules
import Link from 'next/link';
import { IMG_VERSION, SPRITE_PKM } from '@/constants/img';
import { formatFileName, makeClassName } from '@/functions';
// import Image from 'next/image';

const SpritePokemonImg = ({
	pokemon,
	className,
	ownPath = false,
	noLink = false,
	...props
}) => (
	<img
		key={pokemon.id}
		src={
			ownPath
				? `/images/pokemons/sprites/${formatFileName(
						pokemon.name
				  )}.png?ver=${IMG_VERSION}`
				: `/images/transparent.png`
		}
		alt={`Pokémon ${pokemon.nom || pokemon.name}`}
		width={SPRITE_PKM}
		height={SPRITE_PKM}
		className={makeClassName(
			className,
			!ownPath && `pokemon-sprite pokemon-${formatFileName(pokemon.name)}`,
			!noLink && 'link'
		)}
		{...props}
	/>
);

const SpritePokemon = ({ pokemon, noLink = false, className, style, ...props }) =>
	noLink ? (
		<SpritePokemonImg
			pokemon={pokemon}
			className={makeClassName('sprite', className)}
			style={style}
			noLink={noLink}
			{...props}
		/>
	) : (
		<Link
			href={`/entity/pokemons/${pokemon.id}`}
			className={makeClassName('sprite', className)}
			title={pokemon.nom || pokemon.name}
			style={style}
		>
			<SpritePokemonImg pokemon={pokemon} className="link" {...props} />
			<span className="sr-only">{pokemon.nom || pokemon.name}</span>
		</Link>
	);
export default SpritePokemon;
