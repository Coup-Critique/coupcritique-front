// modules
import React, { useEffect, useState } from 'react';
import { Link } from 'next/link';
import { useGetParam } from '@/hooks/useGetParams';
import { Button, Loader, Segment } from 'semantic-ui-react';
// components
import PageWrapper from '@/components/PageWrapper';
import GoBackButton from '@/components/GoBackButton';
import TablePokemon from '@/components/table/TablePokemon';
// hooks
import useFetch from '@/hooks/useFetch';
import Description from '@/components/elements/Description';
import GenSelector from '@/components/GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';
import { formatFileName } from '@/functions';
import WeaknessesPopup from '@/components/elements/WeaknessesPopup';
import EfficienciesPopup from '@/components/elements/EfficienciesPopup';

const TypeArticle = ({ result }) => {
	const id = useGetParam('id');
	const [resultPokemons, load, loading] = useFetch();
	const [type, setType] = useState((result?.type) || null);
	const [weaknesses, setWeaknesses] = useState((result?.weaknesses) || null);
	const [efficiencies, setEfficiencies] = useState(
		(result?.efficiencies) || null
	);
	const [pokemons, setPokemons] = useState((result?.pokemons) || []);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	useEffect(() => {
		if (!result.pokemons) {
			load({ url: `pokemons/type/${id}` });
		}
	}, [id]);

	useEffect(() => {
		if (result?.success) {
			setType(result.type);
			setWeaknesses(result.weaknesses);
			setEfficiencies(result.efficiencies);
		}
	}, [result]);

	useEffect(() => {
		if (resultPokemons && resultPokemons.success) {
			setPokemons(resultPokemons.pokemons);
		}
	}, [resultPokemons]);

	if (!type || !type.id) return null;
	return (
		<PageWrapper
			title={type.nom || type.name}
			className="article type"
			more
			metatitle={'Le type ' + (type.nom || type.name)}
			metaimage={`types/${formatFileName(type.name)}.png`}
		>
			<GoBackButton />
			<GenSelector
				availableGens={result.availableGens}
				redirectOnChange={'/entity/types/'}
			/>
			<Button
				color="blue"
				content="Voir les capacités du Type"
				className="mb-4"
				as={Link}
				href={`/entity/moves/type/${type.id}`}
				icon="search"
			/>
			<div className="row">
				<div className="col-12 col-lg-6 mb-3 d-flex flex-column">
					<Segment className="flex-grow-1">
						<h3>Efficacité défensive</h3>
						<WeaknessesPopup weaknesses={weaknesses} />
					</Segment>
				</div>
				<div className="col-12 col-lg-6 mb-3 d-flex flex-column">
					<Segment className="flex-grow-1">
						<h3>Efficacité offensive</h3>
						<EfficienciesPopup efficiencies={efficiencies} />
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
				{loading ? (
					<Loader active inline="centered" />
				) : (
					pokemons.length > 0 && (
						<TablePokemon
							pokemons={pokemons}
							setPokemons={setPokemons}
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
export default TypeArticle;
