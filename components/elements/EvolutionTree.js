// modules

import SpritePokemon from '@/components/elements/SpritePokemon';

const EvolutionTree = ({ pokemon }) =>
	(!!pokemon.preEvo || pokemon.evolutions.length > 0) && (
		<div className="mb-3-not-last">
			<div className="font-weight-medium">Arbre d'évolution&nbsp;:</div>
			<div className="row mx-0">
				{!!pokemon.preEvo && (
					<>
						{!!pokemon.preEvo.preEvo && (
							<div className="col col-sprite">
								<SpritePokemon pokemon={pokemon.preEvo.preEvo} />
							</div>
						)}
						<div className="col col-sprite">
							<SpritePokemon pokemon={pokemon.preEvo} />
						</div>
					</>
				)}
				<div className="col col-sprite">
					<SpritePokemon pokemon={pokemon} />
				</div>
				{pokemon.evolutions.length > 0 && (
					<>
						<div className="col col-sprite">
							{pokemon.evolutions.map((evo, i) =>
								evo ? (
									<div
										key={evo.id}
										className={i > 0 ? 'mt-2' : undefined}
									>
										<SpritePokemon pokemon={evo} />
									</div>
								) : null
							)}
						</div>
						<div className="col col-sprite">
							{pokemon.evolutions.map((evo, i) =>
								evo && evo.evolutions.length > 0
									? evo.evolutions.map((evo2, j) =>
											evo2 ? (
												<div
													key={evo2.id}
													className={
														i > 0 || j > 0
															? 'mt-2'
															: undefined
													}
												>
													<SpritePokemon pokemon={evo2} />
												</div>
											) : null
									  )
									: null
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
export default EvolutionTree;
