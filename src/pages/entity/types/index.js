import PageWrapper from '@/components/PageWrapper';
import SectionAds from '@/components/sections/SectionAds';
import GenSelector from '@/components/GenSelector';
import Type from '@/components/elements/Type';
import { manageFetch } from '@/hooks/useFetch';
import { getMetaName } from '@/functions';

const TypeList = ({ types }) => (
	<PageWrapper
		title="Liste des Types"
		more
		metatitle="Types des Pokémon | Coup Critique Stratégie Pokémon"
		description={`Liste des types des Pokémon : ${types.reduce(
			(acc, type) => (acc ? `${acc}, ` : '') + getMetaName(type),
			''
		)}. Filtrer les Pokémons par leur type.`}
	>
		<GenSelector />
		<div id="pagination-scroll-ref">
			{types && types.length ? (
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

export const getStaticProps = async () => {
	try {
		const response = await manageFetch(`types`);
		const types = response.types || [];
		return { props: { types } };
	} catch (e) {
		console.error(e);
		return { props: { types: [] } };
	}
};

export default TypeList;
