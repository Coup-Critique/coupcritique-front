// modules
import { useState, useCallback, useEffect, useReducer, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Message } from 'semantic-ui-react';
import { Koffing } from 'koffing/dist/koffing';
// components
import TagsField from '@/components/fields/TagsField';
import InstanceField from '@/components/fields/InstanceField';
import ReplaysField from '@/components/fields/ReplaysField';
import TiersField from '@/components/fields/TiersField';
// reducer
import formTeamReducer, {
	removeTeamInstancesAction,
	setTeamAction,
	setTeamInstancesAction,
	setTeamValueAction,
} from '@/reducers/state/formTeamReducer';
// hooks
import useFetch from '@/hooks/useFetch';
import useActions from '@/hooks/useActions';
// functions
import {
	buildFieldsMessage,
	parseKoffingInstance,
	scrollToTopAnimate,
} from '@/functions';
// constants
import { POST, PUT } from '@/constants/methods';
import { INSTANCES_KEYS } from '@/constants/team';
import gens from '@/constants/gens.json';
import useSaveToStorage from '@/hooks/useSaveToStorage';

const lastGen = gens.length && gens[0] ? gens[0].value : 1;

export const getDefaultTier = (tiers, gen) => {
	if (!tiers || !tiers[gen]) return null;
	return tiers[gen].find(tier => tier.shortName === 'OU');
};

const initTeam = (defaultValue, tiers) => {
	let team = { ...defaultValue };
	if (!team.tier) {
		team.tier = getDefaultTier(tiers, lastGen);
	}
	if (!team.gen) {
		team.gen = lastGen;
	}
	if (!team.replays || !team.replays.length) {
		team.replays = [null];
	}
	return team;
};

const FormTeam = ({ tiers = {}, tags = [], loadingTiers = false, defaultValue }) => {
	const history = useHistory();
	const [resultExport, loadExport, loadingExport] = useFetch();
	const [resultTeam, loadTeam, loadingTeam] = useFetch();
	const [team, dispatchTeam] = useReducer(
		formTeamReducer,
		initTeam(defaultValue || {}, tiers)
	);
	const [setTeam, setValue, setInstances, removeInstances] = useActions(dispatchTeam, [
		setTeamAction,
		setTeamValueAction,
		setTeamInstancesAction,
		removeTeamInstancesAction,
	]);
	const [pokemons, setPokemons] = useState({});
	const [exportChecked, setExportChecked] = useState(!!defaultValue);
	const [success, setSuccess] = useState(true);
	const [message, setMessage] = useState({});
	// const [fromStorage, setFromStorage] = useState(false);
	const saveStorage = stored => {
		// setFromStorage(true);
		setTeam(initTeam(stored, tiers));
	};
	const [voidStorage] = useSaveToStorage(team, saveStorage);

	const tier = useMemo(
		() =>
			tiers[team.gen]
				? tiers[team.gen].find(tier => tier.id == team.tier.id)
				: null,
		[team.tier]
	);

	useEffect(() => {
		if (tiers && Object.keys(tiers).length && !team.tier) {
			setValue('tier', getDefaultTier(tiers, lastGen));
			setValue('gen', lastGen);
		}
	}, [tiers]);

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
				setInstances(resultExport.team);
			}
		}
	}, [resultExport]);

	useEffect(() => {
		if (resultTeam) {
			setSuccess(resultTeam.success);
			if (resultTeam.errors) {
				setMessage(buildFieldsMessage(resultTeam.errors));
			} else if (resultTeam.message) {
				setMessage({ form: resultTeam.message });
			}
			if (resultTeam.success) {
				dispatch(removeSsrDataAction('team'));
				voidStorage();
				if (defaultValue && defaultValue.id) {
					history.replace('/entity/teams/' + resultTeam.team.id);
				} else {
					history.push('/entity/teams/' + resultTeam.team.id);
				}
			}
		}
	}, [resultTeam]);

	const testDVExport = () => {
		return (
			!defaultValue ||
			(!defaultValue.certified &&
				(defaultValue.tier.id !== team.tier.id ||
					defaultValue.export !== team.export))
		);
	};
	useEffect(() => {
		if (team.tier && exportChecked && testDVExport()) {
			setExportChecked(false);
		}
	}, [team.tier]);
	useEffect(() => {
		if (team.export && exportChecked && testDVExport()) {
			setExportChecked(false);
		}
	}, [team.export]);

	const mergeTeamPokemons = () => {
		const nextTeams = { ...team };
		INSTANCES_KEYS.forEach(key => {
			if (pokemons[key]) {
				nextTeams[key] = { ...team[key], ...pokemons[key] };
			} else {
				nextTeams[key] = null;
			}
		});
		return nextTeams;
	};

	useEffect(() => {
		if (Object.keys(pokemons).length) {
			if (!!team.gen && !!team.tier) {
				loadExport({
					url:
						'teams/export' +
						(team.id ? `/${team.id}` : '') +
						`?gen=${team.gen}`,
					method: team.id ? PUT : POST,
					body: mergeTeamPokemons(),
				});
			} else {
				scrollToTopAnimate();
				setSuccess(false);
				setMessage({ tier: 'Le tier est requis.' });
			}
		}
	}, [pokemons]);

	const getSelectedTags = () =>
		tags.map(tag => {
			let result = team.tags.find(teamTag => teamTag.id === tag.id);
			if (result) {
				return { ...tag, selected: true };
			}
			return tag;
		});

	const handleChange = (e, { name, value }) => setValue(name, value);

	// TODO move it to reducer
	const handleChangeObject = (e, { name, value }, attrName) => {
		setValue(attrName, {
			...team[attrName],
			[name]: value,
		});
	};

	const handleTier = useCallback(
		(tierId, gen) => {
			setValue('tier', { id: tierId });
			setValue('gen', parseInt(gen));
		},
		[setValue]
	);

	const handleTeamId = (e, { name, value }) => {
		if (!value) {
			setValue(name, null);
			return;
		}
		let nextValue = value.replace(/(\w{4})/g, '$1 ').replace(/(\s+)/g, ' ');
		if (nextValue.charAt(nextValue.length - 1) === ' ') {
			nextValue = nextValue.slice(0, -1);
		}
		setValue(name, nextValue);
	};

	const handleExport = (e, input) => {
		setExportChecked(false);
		handleChange(e, input);
		if (team.pkm_inst_1) {
			removeInstances();
		}
	};

	const onSubmit = e => {
		e.preventDefault();
		// remove null replays
		team.replays = team.replays.filter(replay => replay && replay.uri);
		loadTeam({
			url: 'teams' + (defaultValue ? `/${team.id}` : '') + '?gen=' + team.gen,
			method: defaultValue ? PUT : POST,
			body: team,
		});
	};

	// only when export is submitting
	const onCheckExport = useCallback(
		e => {
			if (!loadingExport) {
				if (!team.export) {
					setMessage({ export: "L'export est requis" });
					return;
				}
				const parsedExport = Koffing.parse(team.export);
				e.preventDefault();
				if (
					parsedExport.teams &&
					parsedExport.teams[0] &&
					parsedExport.teams[0].pokemon
				) {
					setPokemons(
						parsedExport.teams[0].pokemon.reduce((pokemons, pokemon, i) => {
							pokemons['pkm_inst_' + (i + 1)] =
								parseKoffingInstance(pokemon);
							return pokemons;
						}, {})
					);
				}
			}
		},
		[team.export]
	);

	return (
		<Form
			error={!success}
			success={success}
			onSubmit={onSubmit}
			loading={loadingExport || loadingTeam || loadingTiers}
			className="form-propose-team"
		>
			<Form.Input
				name="name"
				label="Nom de l'équipe"
				placeholder="Entrez le nom de l'équipe"
				onChange={handleChange}
				value={team.name || ''}
				error={message.name}
				required
				maxLength="50"
			/>
			<Form.Input
				name="team_id"
				label="Code d'emprunt"
				placeholder="_ _ _ _ _ _"
				value={team.team_id || ''}
				onChange={handleTeamId}
				error={message.team_id}
				maxLength="17"
				minLength="6"
			/>
			<TiersField
				label="Tier de l'équipe"
				tiers={tiers}
				currentTier={team.tier ? team.tier.id : undefined}
				currentGen={team.gen}
				handleChange={handleTier}
				required
				disabled={!!defaultValue && defaultValue.certified}
				message={message.tier}
				lockOldOfficial
			/>
			{tags.length > 0 && (
				<TagsField
					tags={defaultValue || team.tags ? getSelectedTags() : tags}
					handleChange={setValue}
					message={message.tags}
				/>
			)}
			<ReplaysField
				value={team.replays}
				message={message.replays}
				handleChange={setValue}
			/>
			<Form.TextArea
				name="description"
				label="Description de l'équipe"
				placeholder="Synergie, menaces, problèmes rencontrés"
				onChange={handleChange}
				value={team.description || ''}
				error={message.description}
				minLength="3"
				maxLength="5000"
				required
			/>
			{/* TODO make ExportField */}
			<Form.TextArea
				name="export"
				label="Export de Pokémon Showdown"
				onChange={handleExport}
				value={team.export || ''}
				placeholder="Le contenu textuel et pas une url de PokePaste"
				error={typeof message.export === 'string' && message.export}
				rows="6"
				required
				disabled={!!defaultValue && defaultValue.certified}
			/>
			{message.export &&
				Array.isArray(message.export) &&
				message.export.map((e, i) => <Message key={i} error content={e} />)}
			{
				// prettier-ignore
				exportChecked && INSTANCES_KEYS.map( key => !!team[key] && (
					<InstanceField
						key={key}
						instance={team[key]}
						tier={tier}
						onChange={(e, input) => handleChangeObject(e, input, key)}
						gen={team.gen}
						required
						message={message[key]}
					/>
				))
			}
			<Message success content={message.form} />
			<Message error content={message.form} />
			<div className="text-center">
				{exportChecked ? (
					<Button
						color="blue"
						type="submit"
						disabled={loadingTeam}
						icon={defaultValue ? 'save' : undefined}
						content={defaultValue ? 'Valider' : 'Publier'}
					/>
				) : (
					<Button
						color="green"
						onClick={onCheckExport}
						disabled={loadingExport}
					>
						Vérifier l'export
					</Button>
				)}
			</div>
		</Form>
	);
};

export default FormTeam;
