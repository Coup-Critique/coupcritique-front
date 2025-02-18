// modules
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Loader, Tab } from 'semantic-ui-react';
// custom
import PokemonInstanceSet from '@/components/elements/PokemonInstanceSet';
import useFetch from '@/hooks/useFetch';
import { setTiers } from '@/reducers/tiers';
import dynamic from 'next/dynamic';

const FormPokemonSet = dynamic(() => import('@/components/forms/FormPokemonSet'), {
	loading: () => <Loader active inline="centered" />,
	ssr: false,
});

const defaultArray = [];
const PokemonSetManager = props => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const tiers = useSelector(state => state.tiers);
	const gen = useSelector(state => state.gen);
	const [result, load, loading] = useFetch(false);
	const [displayForm, setDisplayForm] = useState(false);
	const [pokemonSets, setPokemonSets] = useState(props.pokemonSets || defaultArray);
	const { pokemon } = props;

	useEffect(() => {
		if (!pokemonSets.length) {
			load({ url: `pokemon_set/${props.redirectedId || pokemon.id}` });
		}
		if (!Object.keys(tiers).length && props.tiers) {
			dispatch(setTiers(props.tiers));
		}
	}, [pokemon.id, props.redirectedId]);

	useEffect(() => {
		if (result?.success) {
			setPokemonSets(result.pokemonSets);
		}
	}, [result]);

	const handleAddForm = e => setDisplayForm(!displayForm);

	const handleAddSet = pokemonSet => {
		const nextSets = pokemonSets.slice();
		nextSets.push(pokemonSet);
		setPokemonSets(nextSets);
		setDisplayForm(false);
	};

	const handleUpdateSet = (i, pokemonSet) => {
		const nextSets = pokemonSets.slice();
		nextSets[i] = pokemonSet;
		setPokemonSets(nextSets);
	};

	const handleRemoveSet = i => {
		const nextSets = pokemonSets.slice();
		nextSets.splice(i, 1);
		setPokemonSets(nextSets);
	};

	const handleTopTabChange = e => {
		// Reset child active on top tab change
		const firstItem = document.querySelector(
			'.top-tab .ui.tab .ui.menu .item:first-child'
		);
		if (firstItem) firstItem.click();
	};

	const panes = useMemo(() => {
		if (!Object.keys(tiers).length) return [];

		const tabsByTiers = pokemonSets.reduce((tabs, pokemonSet, i) => {
			const tierName = pokemonSet.tier.shortName || pokemonSet.tier.name;
			if (!tabs[tierName]) tabs[tierName] = [];
			tabs[tierName].push({
				menuItem: pokemonSet.name || `Set ${tabs[tierName].length + 1}`,
				render: () => (
					<Tab.Pane>
						<PokemonInstanceSet
							gen={gen}
							pokemonSet={pokemonSet}
							tiers={tiers}
							handleUpdate={pS => handleUpdateSet(i, pS)}
							handleRemove={() => handleRemoveSet(i)}
						/>
					</Tab.Pane>
				),
			});
			return tabs;
		}, {});

		return Object.entries(tabsByTiers).map(([tierName, underPanes], i) => {
			return {
				menuItem: tierName || i + '',
				render: () => (
					<Tab.Pane>
						<Tab panes={underPanes} />
					</Tab.Pane>
				),
			};
		});
	}, [pokemonSets, tiers]);

	return (
		<>
			{displayForm ? (
				<FormPokemonSet
					callback={handleAddSet}
					tiers={tiers}
					pokemonId={pokemon.id}
					handleCancel={handleAddForm}
				/>
			) : (
				user.is_modo === true && (
					<Button color="blue" onClick={handleAddForm} className="mb-4">
						<Icon name="plus" />
						Ajouter un set
					</Button>
				)
			)}
			{loading ? (
				<Loader active inline="centered" />
			) : pokemonSets.length > 0 ? (
				<Tab
					panes={panes}
					className="top-tab"
					menu={{
						color: 'orange',
						inverted: true,
						attached: true,
					}}
					onTabChange={handleTopTabChange}
				/>
			) : (
				<p>Aucun set n'a été créé pour ce Pokémon.</p>
			)}
		</>
	);
};
export default PokemonSetManager;
