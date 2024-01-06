// modules
import { useSearchParams } from 'next/navigation';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntity from '@/hooks/useGetEntity';
import { useGetParam } from '@/hooks/useGetParams';

const PokemonContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [result, loading] = useGetEntity(id, 'pokemon', 'pokemons');

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (result) {
		return <Component result={result} {...props} />;
	} else {
		return null;
	}
};

export default PokemonContainer;
