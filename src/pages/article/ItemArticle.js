// modules
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
// components
import PageWrapper from '@/components/PageWrapper';
import ArtItem from '@/components/elements/ArtItem';
import GoBackButton from '../../GoBackButton';
import useFetch from '@/hooks/useFetch';
import { formateName, formatFileName } from '@/functions';
import Description from '@/components/elements/Description';
import TablePokemonWithUsages from '@/components/table/TablePokemonWithUsages';
import GenSelector from '../../GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';

const ItemArticle = ({ result }) => {
	const { id } = useParams();
	const [resultPokemons, load, loading] = useFetch();
	const [item, setItem] = useState((result && result.item) || null);
	const [pokemons, setPokemons] = useState((result && result.pokemons) || []);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery();

	useEffect(() => {
		if (!result.pokemons) {
			load({ url: `pokemons/item/${id}` });
		}
	}, [id]);

	useEffect(() => {
		if (result && result.success) {
			setItem(result.item);
		}
	}, [result]);

	useEffect(() => {
		if (resultPokemons && resultPokemons.success) {
			setPokemons(resultPokemons.pokemons);
		}
	}, [resultPokemons]);

	if (!item || !item.id) return null;
	return (
		<PageWrapper
			title={item.nom || formateName(item.name)}
			className="article"
			metatitle={"L'objet Pokémon : " + (item.nom || formateName(item.name))}
			metadescription={item.description}
			metaimage={`items/${formatFileName(item.name)}.png`}
		>
			<div className="mb-4">
				<GoBackButton />
				<GenSelector
					availableGens={result.availableGens}
					redirectOnChange={'/entity/items/'}
				/>
				<ArtItem item={item} />
			</div>
			<Description
				entity={item}
				keyResult="item"
				putUrl={`items/${item.id}`}
				handleUpdate={setItem}
			/>
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active inline="centered" />
				) : (
					pokemons.length > 0 && (
						<TablePokemonWithUsages
							pokemons={pokemons}
							setPokemons={setPokemons}
							usageKey="usageItem"
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
export default ItemArticle;
