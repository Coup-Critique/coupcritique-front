// modules
import { getMetaName, getName } from '@/functions';
// hooks
import Description from '@/components/elements/Description';
import GenSelector from '@/components/GenSelector';
// components
import PageWrapper from '@/components/PageWrapper';
import TablePokemonWithUsages from '@/components/table/TablePokemonWithUsages';
import useStoreQuery from '@/hooks/useStoreQuery';
import useStateProps from '@/hooks/useStateProps';
import useStateWithGen from '@/hooks/useStateWithGen';

const defaultArray = [];
const AbilityArticle = props => {
	const [ability, setAbility] = useStateWithGen(props.ability || null);
	const [pokemons, setPokemons] = useStateProps(props.pokemons || defaultArray);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery();

	if (!ability || !ability.id) return null;
	const name = getName(ability);
	const metaName = getMetaName(ability);
	return (
		<PageWrapper
			title={name}
			metatitle={'Le talent Pokémon : ' + metaName}
			metadescription={
				`Visualiser l'utilisation du talent ${metaName}. ` + ability.description
			}
			goingBack="/entity/abilities/"
			action={
				<GenSelector
					availableGens={props.availableGens}
					redirectOnChange="/entity/abilities/"
				/>
			}
		>
			<Description
				entity={ability}
				keyResult="ability"
				putUrl={`abilities/${ability.id}`}
				handleUpdate={setAbility}
			/>
			<div id="pagination-scroll-ref">
				{pokemons.length > 0 && (
					<TablePokemonWithUsages
						pokemons={pokemons}
						setPokemons={setPokemons}
						usageKey="usageAbility"
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				)}
			</div>
		</PageWrapper>
	);
};
export default AbilityArticle;
