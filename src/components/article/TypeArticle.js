// modules
import { getMetaName, getName } from '@/functions';
import { Button, Segment } from 'semantic-ui-react';
import Link from 'next/link';
// hooks
import Description from '@/components/elements/Description';
import GenSelector from '@/components/GenSelector';
// components
import PageWrapper from '@/components/PageWrapper';
import useStoreQuery from '@/hooks/useStoreQuery';
import useStateProps from '@/hooks/useStateProps';
import useStateWithGen from '@/hooks/useStateWithGen';
import WeaknessesPopup from '@/components/elements/WeaknessesPopup';
import EfficienciesPopup from '@/components/elements/EfficienciesPopup';
import TablePokemon from '@/components/table/TablePokemon';

const defaultArray = [];
const TypeArticle = props => {
	const [type, setType] = useStateWithGen(props.type || null);
	const [pokemons, setPokemons] = useStateProps(props.pokemons || defaultArray);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery();

	if (!type || !type.id) return null;
	const name = getName(type);
	const metaName = getMetaName(type);
	return (
		<PageWrapper
			title={name}
			metatitle={'Le type ' + metaName}
			metadescription={
				`Visualiser la liste des Pokémon du type ${metaName}. Ainsi que ces faiblesses et résistences. ` +
				type.description
			}
			goingBack="/entity/types/"
			action={
				<GenSelector
					availableGens={props.availableGens}
					redirectOnChange="/entity/types/"
				/>
			}
		>
			<Button
				color="blue"
				content="Voir les capacités du Type"
				aria-label="Voir les capacités du Type"
				className="mb-4"
				as={Link}
				href={`/entity/moves/type/${type.id}`}
				icon="search"
			/>
			<div className="row">
				<div className="col-12 col-lg-6 mb-3 d-flex flex-column">
					<Segment className="flex-grow-1">
						<h3>Efficacité défensive</h3>
						<WeaknessesPopup weaknesses={props.weaknesses} />
					</Segment>
				</div>
				<div className="col-12 col-lg-6 mb-3 d-flex flex-column">
					<Segment className="flex-grow-1">
						<h3>Efficacité offensive</h3>
						<EfficienciesPopup efficiencies={props.efficiencies} />
					</Segment>
				</div>
			</div>
			<Description
				entity={type}
				keyResult="type"
				putUrl={`types/${type.id}`}
				handleUpdate={setType}
			/>
			<div id="pagination-scroll-ref">
				{pokemons.length > 0 && (
					<TablePokemon
						pokemons={pokemons}
						setPokemons={setPokemons}
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				)}
			</div>
		</PageWrapper>
	);
};
export default TypeArticle;
