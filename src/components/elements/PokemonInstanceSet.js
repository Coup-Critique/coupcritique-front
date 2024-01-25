// modules
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
// components
import SpriteItem from '@/components/elements/SpriteItem';
import Ability from '@/components/elements/Ability';
import Move from '@/components/elements/Move';
import Item from '@/components/elements/Item';
import Author from '@/components/elements/Author';
import Export from '@/components/actions/Export';
import FormPokemonSet from '@/components/forms/FormPokemonSet';
import DescriptionJsoned from '@/components/elements/DescriptionJsoned';
import IconType from '@/components/elements/IconType';
import useFetch from '@/hooks/useFetch';
import { DELETE } from '@/constants/methods';
import { capitalize } from '@/functions';

const natureKeys = ['atk', 'def', 'spa', 'spd', 'spe'];

const PokemonInstanceSet = ({ pokemonSet, tiers, handleUpdate, handleRemove, gen }) => {
	const user = useSelector(state => state.user);
	const [displayForm, setDisplayForm] = useState(false);
	const [resultDelete, loadDelete, loadingDelete] = useFetch();
	const { instance } = pokemonSet;

	useEffect(() => {
		if (displayForm) {
			setDisplayForm(false);
		}
	}, [pokemonSet]);

	useEffect(() => {
		if (resultDelete?.success) {
			handleRemove();
		}
	}, [resultDelete]);

	const handleModify = e => setDisplayForm(!displayForm);

	const handleDelete = e => {
		loadDelete({ url: `pokemon_set/${pokemonSet.id}`, method: DELETE });
	};

	const handleUpdateBuffer = pokemonSet => {
		setDisplayForm(false);
		handleUpdate(pokemonSet);
	};

	const buildEvs = useMemo(() => {
		let evs = '';

		const addEv = ev => {
			if (evs) evs += ' / ';
			evs += ev;
		};

		if (instance.hp_ev) {
			addEv(instance.hp_ev + ' Hp');
		}
		if (instance.atk_ev) {
			addEv(instance.atk_ev + ' Atk');
		}
		if (instance.def_ev) {
			addEv(instance.def_ev + ' Def');
		}
		if (instance.spa_ev) {
			addEv(instance.spa_ev + ' Spa');
		}
		if (instance.spd_ev) {
			addEv(instance.spd_ev + ' Spd');
		}
		if (instance.spe_ev) {
			addEv(instance.spe_ev + ' Spe');
		}
		return evs;
	}, [instance]);

	const buildIvs = useMemo(() => {
		let ivs = '';

		const addIv = iv => {
			if (ivs) ivs += ' / ';
			ivs += iv;
		};

		if (instance.hp_iv && instance.hp_iv != 31) {
			addIv(instance.hp_iv + ' Hp');
		}
		if (instance.atk_iv && instance.atk_iv != 31) {
			addIv(instance.atk_iv + ' Atk');
		}
		if (instance.def_iv && instance.def_iv != 31) {
			addIv(instance.def_iv + ' Def');
		}
		if (instance.spa_iv && instance.spa_iv != 31) {
			addIv(instance.spa_iv + ' Spa');
		}
		if (instance.spd_iv && instance.spd_iv != 31) {
			addIv(instance.spd_iv + ' Spd');
		}
		if (instance.spe_iv && instance.spe_iv != 31) {
			addIv(instance.spe_iv + ' Spe');
		}
		return ivs;
	}, [instance]);

	const natureStat = nature => {
		return (
			natureKeys.reduce((str, key) => {
				if (!nature[key]) return str;
				if (str && str !== '(') {
					str += '/';
				}
				str += `${nature[key] == 1 ? '+' : nature[key] == -1 ? '-' : ''}${
					capitalize(key) || ''
				}`;
				return str;
			}, '(') + ')'
		);
	};

	return (
		<div className="set">
			{displayForm ? (
				<FormPokemonSet
					callback={handleUpdateBuffer}
					gen={gen}
					tiers={tiers}
					defaultValue={pokemonSet}
					handleCancel={handleModify}
					pokemonId={pokemonSet.instance.pokemon.id}
				/>
			) : (
				<>
					<div className="row mb-3">
						{gen > 1 && (
							<div className="col-12 col-sm-6 col-lg-4">
								{gen == 9 && pokemonSet.tier?.name !== 'Monotype' && (
									<div>
										<span className="attribute">
											Teracristal&nbsp;:
										</span>{' '}
										{pokemonSet.teras_set.length > 0 ? (
											pokemonSet.teras_set.map(({ tera }, i) => (
												<span key={i}>
													<Slash i={i} mr="0" />{' '}
													<IconType
														type={tera}
														tera
														className="mr-0"
													/>
												</span>
											))
										) : (
											<IconType
												type={instance.pokemon.type_1}
												tera
											/>
										)}
									</div>
								)}
								<div>
									<span className="attribute">Objets&nbsp;:</span>{' '}
									{pokemonSet.items_set.length > 0 ? (
										pokemonSet.items_set.map(({ item }, i) => (
											<span key={i}>
												<Slash i={i} mr="0" />{' '}
												<SpriteItem item={item} noPopup />{' '}
												<Item item={item} />
											</span>
										))
									) : (
										<span>Pas d'objet</span>
									)}
								</div>
								{gen > 2 && (
									<div>
										<span className="attribute">Talent&nbsp;:</span>{' '}
										{pokemonSet.abilities_set.map(
											({ ability }, i) => (
												<span key={i}>
													<Slash i={i} />{' '}
													<Ability ability={ability} />
												</span>
											)
										)}
									</div>
								)}
								{gen > 2 && (
									<div>
										<span className="attribute">Nature&nbsp;:</span>{' '}
										{pokemonSet.natures_set.length > 0
											? pokemonSet.natures_set.map(
													({ nature }, i) => (
														<span key={i}>
															<Slash i={i} />{' '}
															<span>
																{nature.nom ||
																	nature.name}{' '}
																{natureStat(nature)}
															</span>
														</span>
													)
											  )
											: 'Sérieux'}
									</div>
								)}
								{gen > 2 && (
									<div>
										<span className="attribute">EVs&nbsp;:</span>{' '}
										{buildEvs}
									</div>
								)}
								{!!buildIvs && (
									<div>
										<span className="attribute">IVs&nbsp;:</span>{' '}
										{buildIvs}
									</div>
								)}
							</div>
						)}
						{pokemonSet.moves_set_1.length > 0 && (
							<div
								className={
									gen > 1 ? 'col-12 col-sm-6' : 'col-12 col-lg-10'
								}
							>
								<span className="attribute">Capacités&nbsp;:</span>
								<ul className="moves">
									<li>
										{pokemonSet.moves_set_1.map(({ move }, i) => (
											<span key={i}>
												<Slash i={i} /> <Move move={move} />
											</span>
										))}
									</li>
									{pokemonSet.moves_set_2.length > 0 && (
										<li>
											{pokemonSet.moves_set_2.map(({ move }, i) => (
												<span key={i}>
													<Slash i={i} /> <Move move={move} />
												</span>
											))}
										</li>
									)}
									{pokemonSet.moves_set_3.length > 0 && (
										<li>
											{pokemonSet.moves_set_3.map(({ move }, i) => (
												<span key={i}>
													<Slash i={i} /> <Move move={move} />
												</span>
											))}
										</li>
									)}
									{pokemonSet.moves_set_4.length > 0 && (
										<li>
											{pokemonSet.moves_set_4.map(({ move }, i) => (
												<span key={i}>
													<Slash i={i} /> <Move move={move} />
												</span>
											))}
										</li>
									)}
								</ul>
							</div>
						)}
						<div className="col-12 col-lg-2">
							{!!pokemonSet.export && (
								<Export content={pokemonSet.export} />
							)}
						</div>
					</div>
					{!!pokemonSet.content && (
						<DescriptionJsoned
							description={pokemonSet.content}
							json={pokemonSet.contentJson}
						/>
					)}
					<Author entity={pokemonSet} />
				</>
			)}
			{user.is_modo && !!tiers && !displayForm && (
				<>
					<Button
						icon="pencil"
						content="Modifier"
						color="blue"
						onClick={handleModify}
					/>
					<Button
						icon="trash alternate"
						content="Supprimer"
						color="red"
						onClick={handleDelete}
						loading={loadingDelete}
					/>
				</>
			)}
		</div>
	);
};

const Slash = ({ i, ml = 1, mr = 1 }) =>
	i > 0 && <span className={`d-inline-block ml-${ml} mr-${mr}`}>/</span>;

export default PokemonInstanceSet;
