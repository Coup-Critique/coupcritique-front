// modules
import { useState } from 'react';
import { formateName, getMetaName, getName } from '@/functions';
// components
import GoBackButton from '@/components/GoBackButton';
import PageWrapper from '@/components/PageWrapper';
import Description from '@/components/elements/Description';
import Type from '@/components/elements/Type';
import Category from '@/components/elements/Category';
import TablePokemonWithUsages from '@/components/table/TablePokemonWithUsages';
import GenSelector from '@/components/GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';
import useStateProps from '@/hooks/useStateProps';
import useStateWithGen from '@/hooks/useStateWithGen';

const defaultArray = [];
const MoveArticle = props => {
	const [move, setMove] = useStateWithGen(props.move || null);
	const [pokemons, setPokemons] = useStateProps(props.pokemons || defaultArray);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery();

	if (!move || !move.id) return null;
	const name = getName(move);
	const metaName = getMetaName(move);
	return (
		<PageWrapper
			title={name}
			className="article"
			metatitle={'La capacité Pokémon : ' + metaName}
			metadescription={
				`Visualiser l'utilisation de la capacité ${metaName}. ` + move.description
			}
		>
			<GoBackButton />
			<GenSelector
				availableGens={props.availableGens}
				redirectOnChange={'/entity/moves/'}
			/>
			<div className="d-flex flex-wrap mb-4 justify-content-center">
				<div className="pl-4 pr-4">
					<div className="mb-2">
						<span className="d-inline-block font-weight-medium mr-2">
							Type&nbsp;:
						</span>
						<Type type={move.type} />
					</div>
					<div>
						<span className="d-inline-block font-weight-medium mr-2">
							Catégorie&nbsp;:
						</span>
						<Category category={move.category} />
					</div>
				</div>
				<div className="pl-4 pr-4">
					<div>
						<span className="d-inline-block font-weight-medium mr-2">
							Puissance&nbsp;:
						</span>
						{!move.power || move.power == 1 ? '-' : move.power}
					</div>
					<div>
						<span className="d-inline-block font-weight-medium mr-2">
							Précision&nbsp;:
						</span>
						{!move.accuracy || move.accuracy == 1 ? '-' : move.accuracy}
					</div>
					<div>
						<span className="d-inline-block font-weight-medium mr-2">
							PP&nbsp;:
						</span>
						{move.pp ? Math.floor((move.pp * 8) / 5) : '-'}
					</div>
				</div>
			</div>
			<Description
				entity={move}
				keyResult="move"
				putUrl={`moves/${move.id}`}
				handleUpdate={setMove}
			/>
			<div id="pagination-scroll-ref">
				{pokemons.length > 0 && (
					<TablePokemonWithUsages
						pokemons={pokemons}
						setPokemons={setPokemons}
						usageKey="usageMove"
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				)}
			</div>
		</PageWrapper>
	);
};
export default MoveArticle;
