// modules
import { Loader } from 'semantic-ui-react';
// components
import PageWrapper from '@/components/PageWrapper';
import TableAbility from '@/components/table/TableAbility';
import GenSelector from '@/components/GenSelector';
import { manageFetch } from '@/hooks/useFetch';
import useFetchListByGen from '@/hooks/useFetchListByGen';
import useStoreQuery from '@/hooks/useStoreQuery';

const AbilitiesList = props => {
	const [abilities, setAbilities, loading] = useFetchListByGen(
		'abilities',
		props.abilities
	);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery({
		saveQueryToStore: true,
	});

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

export const getStaticProps = async () => {
	try {
		const response = await manageFetch(`abilities`);
		const abilities = response.abilities || [];
		return { props: { abilities } };
	} catch (e) {
		console.error(e);
		return { props: { abilities: [] } };
	}
};

export default AbilitiesList;
