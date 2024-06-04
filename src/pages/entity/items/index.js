// modules

import { Loader } from 'semantic-ui-react';
// hooks
import { manageFetch } from '@/hooks/useFetch';
// components
import PageWrapper from '@/components/PageWrapper';
import TableItem from '@/components/table/TableItem';
import GenSelector from '@/components/GenSelector';
import useFetchListByGen from '@/hooks/useFetchListByGen';
import useStoreQuery from '@/hooks/useStoreQuery';

const ItemsList = props => {
	const [items, setItems, loading] = useFetchListByGen('items', props.items);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery({
		saveQueryToStore: true,
	});

	return (
		<PageWrapper
			title="Liste des Objets"
			more
			metatitle="Objets tenus par les Pokémons | Coup Critique Stratégie Pokémon"
			metadescription="Liste des objet portable en combat par les Pokémon. Accédez la liste des Pokémon  utilisant chaque objet avec son taux d'utilisation."
			action={<GenSelector />}
			goingBack
		>
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

export const getStaticProps = async () => {
	try {
		const response = await manageFetch(`items`);
		const items = response.items || [];
		return { props: { items } };
	} catch (e) {
		console.error(e);
		return { props: { items: [] } };
	}
};

export default ItemsList;
