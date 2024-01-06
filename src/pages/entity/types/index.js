import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
//
import PageWrapper from '@/components/PageWrapper';
import SectionAds from '@/components/sections/SectionAds';
import GenSelector from '@/components/GenSelector';
import Type from '@/components/elements/Type';

const TypeList = () => {
	const gen = useSelector(state => state.gen);
	const [result, load, loading] = useFetch();
	const [types, setTypes] = useState([]);

	useEffect(() => {
		load({ url: `types?gen=${gen}` });
	}, [gen]);

	useEffect(() => {
		if (result?.types) {
			setTypes(result.types);
		}
	}, [result]);

	return (
		<PageWrapper
			title="Liste des Types"
			more
			metatitle="Types des Pokémon | Coup Critique Stratégie Pokémon"
			description="Liste des types des Pokémon. Filtrer les Pokémons par leur type."
		>
			<GenSelector />
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active inline="centered" />
				) : types && types.length ? (
					<div className="list-type">
						{types.map(type => (
							<Type key={type.id} type={type} className="mr-3 mb-2" />
						))}
					</div>
				) : (
					<p>Aucun type trouvé.</p>
				)}
				<SectionAds className="mt-4" />
			</div>
		</PageWrapper>
	);
};
export default TypeList;
