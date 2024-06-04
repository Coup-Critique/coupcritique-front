// modules
import { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Form, Button, Message } from 'semantic-ui-react';
import { Koffing } from 'koffing';
//
import TiersField from '@/components/fields/TiersField';
import usePrevious from '@/hooks/usePrevious';
import useLocalStorage from '@/hooks/useLocalStorage';
import useFetch from '@/hooks/useFetch';
import { buildFieldsMessage, parseKoffingInstance } from '@/functions';
import { POST, PUT } from '@/constants/methods';
import { getDefaultTier } from '@/components/forms/FormTeam';

const joinEntities = (list, key) =>
	list.reduce((str, el) => (str ? `${str} / ${el[key].name}` : el[key].name), '');

const flatDoctrineCollection = list => {
	if (Array.isArray(list)) {
		return list;
	}
	return Object.values(list);
};

const initSet = ({ ...pokemonSet }, tiers, gen) => {
	if (!pokemonSet.tier) {
		if (
			pokemonSet.instance.pokemon.tier &&
			pokemonSet.instance.pokemon.tier.playable
		) {
			pokemonSet.tier = pokemonSet.instance.pokemon.tier;
		} else {
			pokemonSet.tier = getDefaultTier(tiers, gen);
		}
	}
	if (!pokemonSet.gen) {
		pokemonSet.gen = gen;
	}

	pokemonSet.str_teras_set =
		pokemonSet.teras_set && pokemonSet.teras_set.length > 0
			? joinEntities(pokemonSet.teras_set, 'tera')
			: pokemonSet.instance.tera
			? pokemonSet.instance.tera.name
			: undefined;

	pokemonSet.str_items_set =
		pokemonSet.items_set && pokemonSet.items_set.length > 0
			? joinEntities(pokemonSet.items_set, 'item')
			: pokemonSet.instance.item
			? pokemonSet.instance.item.name
			: undefined;

	pokemonSet.str_abilities_set =
		pokemonSet.abilities_set && pokemonSet.abilities_set.length > 0
			? joinEntities(pokemonSet.abilities_set, 'ability')
			: pokemonSet.instance.ability
			? pokemonSet.instance.ability.name
			: undefined;

	pokemonSet.str_natures_set =
		pokemonSet.natures_set && pokemonSet.natures_set.length
			? joinEntities(pokemonSet.natures_set, 'nature')
			: pokemonSet.instance.nature
			? pokemonSet.instance.nature.name
			: undefined;

	pokemonSet.str_moves_set_1 =
		pokemonSet.moves_set_1 && pokemonSet.moves_set_1.length > 0
			? joinEntities(pokemonSet.moves_set_1, 'move')
			: pokemonSet.instance.move_1
			? pokemonSet.instance.move_1.name
			: '';

	pokemonSet.str_moves_set_2 =
		pokemonSet.moves_set_2 && pokemonSet.moves_set_2.length > 0
			? joinEntities(pokemonSet.moves_set_2, 'move')
			: pokemonSet.instance.move_2
			? pokemonSet.instance.move_2.name
			: '';

	pokemonSet.str_moves_set_3 =
		pokemonSet.moves_set_3 && pokemonSet.moves_set_3.length > 0
			? joinEntities(pokemonSet.moves_set_3, 'move')
			: pokemonSet.instance.move_3
			? pokemonSet.instance.move_3.name
			: '';

	pokemonSet.str_moves_set_4 =
		pokemonSet.moves_set_4 && pokemonSet.moves_set_4.length > 0
			? joinEntities(pokemonSet.moves_set_4, 'move')
			: pokemonSet.instance.move_4
			? pokemonSet.instance.move_4.name
			: '';

	return pokemonSet;
};

const FormPokemonSet = ({
	tiers = {},
	loadingTiers = false,
	pokemonId,
	defaultValue = { instance: { pokemon: pokemonId } },
	callback,
	handleCancel,
}) => {
	const { pathname } = useRouter();
	const { getStoredItem, setItemToStorage } = useLocalStorage();
	const gen = useSelector(state => state.gen);
	const [resultExport, loadExport, loadingExport] = useFetch();
	const [resultSet, loadSet, loadingSet] = useFetch();
	const [pokemonSet, updateSet] = useReducer(
		(state, nextState) => ({ ...state, ...nextState }),
		initSet(defaultValue, tiers, gen)
	);
	const [exportChecked, setExportChecked] = useState(!!defaultValue.export);
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState({});
	const [prevTier, prevExport] = usePrevious(pokemonSet.tier, pokemonSet.export);
	const storageKey = useMemo(
		'form_' + (pathname + (defaultValue.id ? `/${defaultValue.id}` : '')),
		[defaultValue.id, pathname]
	);

	useEffect(() => {
		const pokemonSet = getStoredItem(storageKey);
		if (pokemonSet) {
			updateSet(initSet(pokemonSet, tiers, gen));
		}
	}, []);

	useEffect(() => {
		if (pokemonSet) {
			setItemToStorage(pokemonSet, storageKey);
		}
	}, [pokemonSet]);

	useEffect(() => {
		if (Object.keys(tiers).length && !pokemonSet.tier) {
			updateSet({ tier: getDefaultTier(tiers, gen) });
		}
	}, [tiers]);

	useEffect(() => {
		if (pokemonSet.gen != gen) {
			updateSet({ gen });
		}
	}, [gen]);

	useEffect(() => {
		if (resultExport) {
			setSuccess(resultExport.success);
			if (resultExport.errors) {
				setMessage({ export: resultExport.errors.map(e => e.message) });
			} else if (resultExport.message) {
				setMessage({ form: resultExport.message });
			}
			if (resultExport.success) {
				if (!exportChecked) setExportChecked(true);
				updateSet(instanceToSet(resultExport.instance));
			}
		}
	}, [resultExport]);

	useEffect(() => {
		if (resultSet) {
			setSuccess(resultSet.success);
			if (resultSet.success) {
				setItemToStorage(null, storageKey);
				// flat collections :
				resultSet.pokemonSet.teras_set = flatDoctrineCollection(
					resultSet.pokemonSet.teras_set
				);
				resultSet.pokemonSet.items_set = flatDoctrineCollection(
					resultSet.pokemonSet.items_set
				);
				resultSet.pokemonSet.abilities_set = flatDoctrineCollection(
					resultSet.pokemonSet.abilities_set
				);
				resultSet.pokemonSet.natures_set = flatDoctrineCollection(
					resultSet.pokemonSet.natures_set
				);
				resultSet.pokemonSet.moves_set_1 = flatDoctrineCollection(
					resultSet.pokemonSet.moves_set_1
				);
				resultSet.pokemonSet.moves_set_2 = flatDoctrineCollection(
					resultSet.pokemonSet.moves_set_2
				);
				resultSet.pokemonSet.moves_set_3 = flatDoctrineCollection(
					resultSet.pokemonSet.moves_set_3
				);
				resultSet.pokemonSet.moves_set_4 = flatDoctrineCollection(
					resultSet.pokemonSet.moves_set_4
				);
				callback(resultSet.pokemonSet);
			} else if (resultSet.errors) {
				setMessage(buildFieldsMessage(resultSet.errors));
			} else if (resultSet.message) {
				setMessage({ form: resultSet.message });
			}
		}
	}, [resultSet]);

	useEffect(() => {
		if (exportChecked && pokemonSet.tier && pokemonSet.tier.id !== prevTier.id) {
			setExportChecked(false);
		}
	}, [pokemonSet.tier]);

	useEffect(() => {
		if (exportChecked && pokemonSet.export && pokemonSet.export !== prevExport) {
			setExportChecked(false);
		}
	}, [pokemonSet.export]);

	const instanceToSet = instance => ({
		instance,
		str_teras_set: instance.tera ? instance.tera.name : '',
		str_items_set: instance.item ? instance.item.name : '',
		str_abilities_set: instance.ability ? instance.ability.name : '',
		str_natures_set: instance.nature ? instance.nature.name : '',
		str_moves_set_1: instance.move_1 ? instance.move_1.name : '',
		str_moves_set_2: instance.move_2 ? instance.move_2.name : '',
		str_moves_set_3: instance.move_3 ? instance.move_3.name : '',
		str_moves_set_4: instance.move_4 ? instance.move_4.name : '',
	});

	const setValue = (name, value) => updateSet({ [name]: value });

	const handleChange = (e, { name, value }) => setValue(name, value);

	const handleTier = useCallback(
		e => setValue(e.target.name, { id: e.target.value }),
		[setValue]
	);

	// only when export is submitting
	const onCheckExport = e => {
		if (!loadingExport) {
			if (!pokemonSet.export) {
				setMessage({ export: "L'export est requis" });
				return;
			}
			const parsedExport = Koffing.parse(pokemonSet.export);
			e.preventDefault();
			if (
				parsedExport.teams &&
				parsedExport.teams[0] &&
				parsedExport.teams[0].pokemon
			) {
				if (parsedExport.teams[0].pokemon > 1) {
					setMessage({
						export: "L'export ne doit contenir qu'un seul Pokémon",
					});
					return;
				}
				loadExport({
					url: `pokemon_set/export/${pokemonId}?gen=${pokemonSet.gen}`,
					method: POST,
					body: {
						gen: pokemonSet.gen,
						tier: pokemonSet.tier,
						instance: parseKoffingInstance(parsedExport.teams[0].pokemon[0]),
					},
				});
			}
		}
	};

	const onSubmit = e => {
		e.preventDefault();
		if (defaultValue.id) {
			loadSet({
				url: `pokemon_set/${defaultValue.id}?gen=${pokemonSet.gen}`,
				method: PUT,
				body: pokemonSet,
			});
		} else {
			loadSet({
				url: `pokemon_set/${pokemonId}?gen=${pokemonSet.gen}`,
				method: POST,
				body: pokemonSet,
			});
		}
	};

	return (
		<Form
			error={!success}
			success={success}
			onSubmit={onSubmit}
			loading={loadingExport || loadingSet || loadingTiers}
			className="form-propose-team"
		>
			<Form.Input
				name="name"
				label="Nom"
				placeholder="Entrez le nom du set"
				value={pokemonSet.name || ''}
				onChange={handleChange}
				maxLength={50}
				error={message.name}
			/>
			<TiersField
				label="Tier du set"
				fixedGen={gen}
				tiers={tiers}
				value={pokemonSet.tier ? pokemonSet.tier.id : 0}
				onChange={handleTier}
				required
				message={message.tier}
			/>
			{!exportChecked && (
				<p className="font-medium font-italic">
					&gt; Vous pourrez mettre des options secondaires avec des "/" après la
					validation de l'export, dans les champs qui apparaîtront en dessous.
				</p>
			)}
			<Form.TextArea
				name="export"
				label="Export d'un Pokémon depuis Showdown"
				placeholder="Le contenu textuel et pas une url de PokePaste"
				onChange={handleChange}
				value={pokemonSet.export || ''}
				error={typeof message.export === 'string' && message.export}
				rows="9"
				required
			/>
			{message.export &&
				Array.isArray(message.export) &&
				message.export.map((e, i) => <Message key={i} error content={e} />)}
			{exportChecked && (
				<>
					<p className="font-medium font-italic">
						&gt; Séparer les alternatives par des "/" et utiliser les noms
						anglais, dans les champs suivants&nbsp;:
					</p>
					<Form.Group widths={3}>
						{gen == 9 && (
							<Form.Input
								name="str_teras_set"
								label="Teracristal"
								value={pokemonSet.str_teras_set || ''}
								onChange={handleChange}
								error={message.teras}
							/>
						)}
						{gen > 1 && (
							<Form.Input
								name="str_items_set"
								label="Objets"
								value={pokemonSet.str_items_set || ''}
								onChange={handleChange}
								error={message.items}
							/>
						)}
						{gen > 2 && (
							<Form.Input
								name="str_abilities_set"
								label="Talents"
								value={pokemonSet.str_abilities_set || ''}
								onChange={handleChange}
								error={message.abilities}
							/>
						)}
						{gen > 2 && (
							<Form.Input
								name="str_natures_set"
								label="Natures"
								value={pokemonSet.str_natures_set || ''}
								onChange={handleChange}
								error={message.natures}
							/>
						)}
					</Form.Group>
					<Form.Group widths={4}>
						<Form.Input
							name="str_moves_set_1"
							label="Capacités"
							value={pokemonSet.str_moves_set_1 || ''}
							onChange={handleChange}
							error={message.moves_1}
						/>
						<Form.Input
							name="str_moves_set_2"
							label="Capacités"
							value={pokemonSet.str_moves_set_2 || ''}
							onChange={handleChange}
							error={message.moves_2}
						/>
						<Form.Input
							name="str_moves_set_3"
							label="Capacités"
							value={pokemonSet.str_moves_set_3 || ''}
							onChange={handleChange}
							error={message.moves_3}
						/>
						<Form.Input
							name="str_moves_set_4"
							label="Capacités"
							value={pokemonSet.str_moves_set_4 || ''}
							onChange={handleChange}
							error={message.moves_4}
						/>
					</Form.Group>
					<Form.TextArea
						name="content"
						label="Explications"
						placeholder="Capacités, répartition, forces et faiblesses, synergie, tips, ..."
						onChange={handleChange}
						value={pokemonSet.content || ''}
						error={message.content}
						rows="9"
						minLength="3"
						maxLength={10000}
					/>
					<p className="font-medium font-italic">
						&gt; Vous pouvez insérer des liens ou des miniatures d'entités de
						la façon suivante (en anglais) : [EntityName:Element Name] (un
						tiret au lieu de l'espace pour les Pokémon).
						<br />
						Exemples&nbsp;: [Pokemon:Landorus-Therian], [Item:Choice Band],
						[Move:Close Combat], [Ability:Huge Power], [Type:Normal].
					</p>
				</>
			)}
			<Message success content={message.form} />
			<Message error content={message.form} />
			<div className="text-center">
				{exportChecked ? (
					<Button color="blue" type="submit" disabled={loadingSet}>
						Publier
					</Button>
				) : (
					<Button
						color="green"
						onClick={onCheckExport}
						disabled={loadingExport}
					>
						Vérifier l'export
					</Button>
				)}
				<Button content="Annuler" icon="x" onClick={handleCancel} color="grey" />
			</div>
		</Form>
	);
};

export default FormPokemonSet;
