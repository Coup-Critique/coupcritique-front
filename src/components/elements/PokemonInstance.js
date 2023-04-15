// modules
import React from 'react';
// components
import ArtPokemon from './ArtPokemon';
import SpriteItem from './SpriteItem';
import Type from './Type';
import Ability from './Ability';
import TableInstanceStat from '../table/TableInstanceStat';
import Move from './Move';
import Pokemon from './Pokemon';
import Item from './Item';
import IconType from './IconType';

const PokemonInstance = ({ instance, gen, tier, noDescription = false }) => (
	<div className="pokemon-instance flex-grow-1">
		<div className="grid">
			<div className="grid-col-1 vertically-centered">
				<ArtPokemon pokemon={instance.pokemon} linked animation={false} />
			</div>
			<div className="grid-col-2">
				<div className="pokemon-name h2">
					<Pokemon pokemon={instance.pokemon} />
				</div>
			</div>
			<div className="grid-col-3">
				<div className="type-wrapper">
					<Type type={instance.pokemon.type_1} />
					{!!instance.pokemon.type_2 && <Type type={instance.pokemon.type_2} />}
				</div>
				{gen == 9 && tier?.name !== 'Monotype' && (
					<div>
						<span className="attribute">Téracristal&nbsp;:</span>{' '}
						{instance.tera ? (
							<IconType type={instance.tera} tera />
						) : (
							<IconType type={instance.pokemon.type_1} tera />
						)}
					</div>
				)}
				{gen > 1 && (
					<div>
						<span className="attribute">Objet&nbsp;:</span>{' '}
						{instance.item ? (
							<>
								<SpriteItem item={instance.item} noPopup />{' '}
								<Item item={instance.item} />
							</>
						) : (
							"Pas d'objet"
						)}
					</div>
				)}
				{gen > 2 && (
					<div>
						<span className="attribute">Talent&nbsp;:</span>{' '}
						<Ability ability={instance.ability} />
					</div>
				)}
				{gen > 2 && (
					<div>
						<span className="attribute">Nature&nbsp;:</span>{' '}
						{instance.nature
							? instance.nature.nom || instance.nature.name
							: 'Sérieux'}
					</div>
				)}
				{!!instance.move_1 && (
					<div>
						<span className="attribute">Capacités&nbsp;:</span>
						<ul className="moves">
							<li>
								<Move move={instance.move_1} />
							</li>
							{!!instance.move_2 && (
								<li>
									<Move move={instance.move_2} />
								</li>
							)}
							{!!instance.move_3 && (
								<li>
									<Move move={instance.move_3} />
								</li>
							)}
							{!!instance.move_4 && (
								<li>
									<Move move={instance.move_4} />
								</li>
							)}
						</ul>
					</div>
				)}
			</div>
			<div className="grid-col-4">
				<TableInstanceStat instance={instance} gen={gen} />
			</div>
		</div>
		{!noDescription && !!instance.description && (
			<p className="description">{instance.description}</p>
		)}
	</div>
);
export default PokemonInstance;
