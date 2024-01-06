// modules
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
// hooks
// components
import PageWrapper from '@/components/PageWrapper';
import TableAbility from '@/components/table/TableAbility';
import GenSelector from '@/components/GenSelector';
import useFetch from '@/hooks/useFetch';
import useStoreQuery from '@/hooks/useStoreQuery';

const AbilitiesList = () => {
	const gen = useSelector(state => state.gen);
	const [result, load, loading] = useFetch();
	const [abilities, setAbilities] = useState([]);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	useEffect(() => {
		load({ url: `abilities?gen=${gen}` });
	}, [gen]);

	useEffect(() => {
		if (result?.abilities) {
			setAbilities(result.abilities);
		}
	}, [result]);

	return (
		<PageWrapper
			title="Liste des Talents"
			more
			metatitle="Talents des Pokémons | Coup Critique Stratégie Pokémon"
			metadescription="Liste des talents dans Pokémon. Accédez la liste des Pokémon possédant chaque capacité spéciale avec son taux d'utilisation."
		>
			<GenSelector />
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active inline="centered" />
				) : abilities && abilities.length ? (
					<TableAbility
						abilities={abilities}
						setAbilities={setAbilities}
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				) : (
					<p>Aucun talent trouvé.</p>
				)}
			</div>
		</PageWrapper>
	);
};
export default AbilitiesList;
