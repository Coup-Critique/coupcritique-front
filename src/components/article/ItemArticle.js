// modules
import { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
// components
import PageWrapper from '@/components/PageWrapper';
import ArtItem from '@/components/elements/ArtItem';
import GoBackButton from '@/components/GoBackButton';
import useFetch from '@/hooks/useFetch';
import { formateName, formatFileName, getMetaName, getName } from '@/functions';
import Description from '@/components/elements/Description';
import TablePokemonWithUsages from '@/components/table/TablePokemonWithUsages';
import GenSelector from '@/components/GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';
import { useGetParam } from '@/hooks/useGetParams';
import useStateProps from '@/hooks/useStateProps';
import useStateWithGen from '@/hooks/useStateWithGen';

const defaultArray = [];
const ItemArticle = props => {
	const [item, setItem] = useStateWithGen(props.item || null);
	const [pokemons, setPokemons] = useStateProps(props.pokemons || defaultArray);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery();

	if (!item || !item.id) return null;
	const name = getName(item);
	const metaName = getMetaName(item);
	return (
		<PageWrapper
			title={name}
			className="article"
			metatitle={"L'objet Pokémon : " + metaName}
			metadescription={
				`Visualiser l'utilisation de l'objet ${metaName}. ` + item.description
			}
			metaimage={`items/${formatFileName(item.name)}.png`}
			goingBack
			action={
				<GenSelector
					availableGens={props.availableGens}
					redirectOnChange="/entity/items/"
				/>
			}
		>
			<div className="mb-4">
				<ArtItem item={item} />
			</div>
			<Description
				entity={item}
				keyResult="item"
				putUrl={`items/${item.id}`}
				handleUpdate={setItem}
			/>
			<div id="pagination-scroll-ref">
				{pokemons.length > 0 && (
					<TablePokemonWithUsages
						pokemons={pokemons}
						setPokemons={setPokemons}
						usageKey="usageItem"
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				)}
			</div>
		</PageWrapper>
	);
};
export default ItemArticle;
