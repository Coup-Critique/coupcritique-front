// modules
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { formateName } from '@/functions';
// components
import GoBackButton from '../../GoBackButton';
import PageWrapper from '../../PageWrapper';
import useFetch from '@/hooks/useFetch';
import Description from '@/components/elements/Description';
import Type from '@/components/elements/Type';
import Category from '@/components/elements/Category';
import TablePokemonWithUsages from '@/components/table/TablePokemonWithUsages';
import GenSelector from '../../GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';

// TODO corriger le problem d'importarion des learns
const MoveArticle = ({ result }) => {
	const { id } = useParams();
	const [resultPokemons, load, loading] = useFetch();
	const [move, setMove] = useState((result && result.move) || null);
	const [pokemons, setPokemons] = useState((result && result.pokemons) || []);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery();

	useEffect(() => {
		if (!result.pokemons) {
			load({ url: `pokemons/move/${id}` });
		}
	}, [id]);

	useEffect(() => {
		if (result && result.success) {
			setMove(result.move);
		}
	}, [result]);

	useEffect(() => {
		if (resultPokemons && resultPokemons.success) {
			setPokemons(resultPokemons.pokemons);
		}
	}, [resultPokemons]);

	if (!move || !move.id) return null;
	return (
		<PageWrapper
			title={move.nom || formateName(move.name)}
			className="article"
			metatitle={'La capacité Pokémon : ' + (move.nom || formateName(move.name))}
			metadescription={move.description}
		>
			<GoBackButton />
			<GenSelector
				availableGens={result.availableGens}
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
				{loading ? (
					<Loader active inline="centered" />
				) : (
					pokemons.length > 0 && (
						<TablePokemonWithUsages
							pokemons={pokemons}
							setPokemons={setPokemons}
							usageKey="usageMove"
							query={query}
							updateQuery={updateQuery}
							setQueryParam={setQueryParam}
						/>
					)
				)}
			</div>
		</PageWrapper>
	);
};
export default MoveArticle;
