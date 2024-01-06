// modules
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
// hooks
import useFetch from '@/hooks/useFetch';
// components
import PageWrapper from '@/components/PageWrapper';
import TableItem from '@/components/table/TableItem';
import GenSelector from '@/components/GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';

const ItemsList = () => {
	const gen = useSelector(state => state.gen);
	const [result, load, loading] = useFetch();
	const [items, setItems] = useState([]);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	useEffect(() => {
		load({ url: `items?gen=${gen}` });
	}, [gen]);

	useEffect(() => {
		if (result?.items) {
			setItems(result.items);
		}
	}, [result]);

	return (
		<PageWrapper
			title="Liste des Objets"
			more
			metatitle="Objets tenus par les Pokémons | Coup Critique Stratégie Pokémon"
			metadescription="Liste des objet portable en combat par les Pokémon. Accédez la liste des Pokémon  utilisant chaque objet avec son taux d'utilisation."
		>
			<GenSelector />
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active inline="centered" />
				) : items && items.length ? (
					<TableItem
						items={items}
						setItems={setItems}
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				) : (
					<p>Aucun objet trouvé.</p>
				)}
			</div>
		</PageWrapper>
	);
};
export default ItemsList;
