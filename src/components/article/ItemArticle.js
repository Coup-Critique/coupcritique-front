// modules
import PageWrapper from '@/components/PageWrapper';
import ArtItem from '@/components/elements/ArtItem';
import { formatFileName, getMetaName, getName } from '@/functions';
import Description from '@/components/elements/Description';
import TablePokemonWithUsages from '@/components/table/TablePokemonWithUsages';
import GenSelector from '@/components/GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';
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
			goingBack="/entity/items/"
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
						ogTable={props.pokemons}
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
