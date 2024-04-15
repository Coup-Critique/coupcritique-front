// modules

import { useSelector } from 'react-redux';
import ActiveLink from '@/components/ActiveLink';
import { Dropdown, Icon } from 'semantic-ui-react';
import PokemonSVG from '@/svg/PokemonSVG';
import TeamSVG from '@/svg/TeamSVG';
import StratSVG from '@/svg/StratSVG';
import MoveSVG from '@/svg/MoveSVG';
import ItemSVG from '@/svg/ItemSVG';
import AbilitySVG from '@/svg/AbilitySVG';
import TypeSVG from '@/svg/TypeSVG';
import ResourceSVG from '@/svg/ResourceSVG';
import ActualitySVG from '@/svg/ActualitySVG';
import GuideSVG from '@/svg/GuideSVG';
// import TournamentSVG from '@/svg/TournamentSVG';
import LinkSVG from '@/svg/LinkSVG';
import TierSVG from '@/svg/TierSVG';

function MenuNavBar({ iconized = false }) {
	const user = useSelector(state => state.user);
	return (
		<ul className="navbar-nav">
			<li className="nav-item">
				<ActiveLink href="/entity/teams" className="nav-link">
					{iconized && <TeamSVG />} Équipes
				</ActiveLink>
			</li>
			<li className="nav-item">
				<Dropdown
					icon={iconized ? null : undefined}
					trigger={
						iconized ? (
							<span>
								<StratSVG /> Stratégie <Icon name="caret up" />
							</span>
						) : (
							<span>Stratégie</span>
						)
					}
					className="nav-link"
				>
					<Dropdown.Menu>
						<Dropdown.Item
							content={
								iconized ? (
									<>
										<PokemonSVG /> Pokémon
									</>
								) : (
									'Pokémon'
								)
							}
							as={ActiveLink}
							href="/entity/pokemons"
						/>
						<Dropdown.Item
							content={
								iconized ? (
									<>
										<TierSVG /> Tiers
									</>
								) : (
									'Tiers'
								)
							}
							as={ActiveLink}
							href="/entity/tiers"
						/>
						<Dropdown.Item
							content={
								iconized ? (
									<>
										<MoveSVG /> Capacités
									</>
								) : (
									'Capacités'
								)
							}
							as={ActiveLink}
							href="/entity/moves"
						/>
						<Dropdown.Item
							content={
								iconized ? (
									<>
										<TypeSVG /> Types
									</>
								) : (
									'Types'
								)
							}
							as={ActiveLink}
							href="/entity/types"
						/>
						<Dropdown.Item
							content={
								iconized ? (
									<>
										<AbilitySVG /> Talents
									</>
								) : (
									'Talents'
								)
							}
							as={ActiveLink}
							href="/entity/abilities"
						/>
						<Dropdown.Item
							content={
								iconized ? (
									<>
										<ItemSVG /> Objets
									</>
								) : (
									'Objets'
								)
							}
							as={ActiveLink}
							href="/entity/items"
						/>
					</Dropdown.Menu>
				</Dropdown>
			</li>
			<li className="nav-item">
				<Dropdown
					icon={iconized ? null : undefined}
					trigger={
						iconized ? (
							<span>
								<ResourceSVG /> Ressources <Icon name="caret up" />
							</span>
						) : (
							<span>Ressources</span>
						)
					}
					className="nav-link"
				>
					<Dropdown.Menu>
						<Dropdown.Item
							className="d-lg-none"
							content={
								iconized ? (
									<>
										<ActualitySVG /> Actualités
									</>
								) : (
									'Actualités'
								)
							}
							as={ActiveLink}
							href="/entity/actualities"
						/>
						<Dropdown.Item
							content={
								iconized ? (
									<>
										<GuideSVG /> Guides
									</>
								) : (
									'Guides'
								)
							}
							as={ActiveLink}
							href="/entity/guides"
						/>
						<Dropdown.Item
							className="d-lg-none"
							content={
								iconized ? (
									<>
										<Icon name="sitemap" /> Tournois
									</>
								) : (
									'Tournois'
								)
							}
							as={ActiveLink}
							href="/entity/tournaments"
						/>
						<Dropdown.Item
							content={
								iconized ? (
									<>
										<LinkSVG /> Liens
									</>
								) : (
									'Liens utiles'
								)
							}
							as={ActiveLink}
							href="/resources"
						/>
						<Dropdown.Item
							content={
								iconized ? (
									<>
										<Icon name="youtube" /> Vidéos
									</>
								) : (
									'Vidéos'
								)
							}
							as={ActiveLink}
							href="/videos"
						/>
					</Dropdown.Menu>
				</Dropdown>
			</li>
			<li className="nav-item d-none d-lg-block">
				<ActiveLink href="/entity/actualities" className="nav-link">
					{iconized && <ActualitySVG />} Actualités
				</ActiveLink>
			</li>
			{/* <li className="nav-item d-none d-lg-block">
				<ActiveLink href="/entity/tournaments" className="nav-link">
					{iconized && <Icon name="sitemap" />} Tournois
				</ActiveLink>
			</li> */}
			<li className="nav-item d-none d-lg-block">
				<ActiveLink href="/entity/circuit-tours" className="nav-link">
					{iconized && <Icon name="sitemap" />} Circuit
				</ActiveLink>
			</li>
			{user.is_modo === true && (
				<li className="nav-item">
					<Dropdown
						trigger={
							iconized ? (
								<span>
									<Icon name="gem" /> Admin <Icon name="caret up" />
								</span>
							) : (
								<span>Admin</span>
							)
						}
						icon={iconized ? null : undefined}
						className="nav-link"
					>
						<Dropdown.Menu>
							<Dropdown.Item
								content={
									iconized ? (
										<>
											<TeamSVG /> Équipes
										</>
									) : (
										'Équipes'
									)
								}
								as={ActiveLink}
								href="/admin/teams"
							/>
							<Dropdown.Item
								content={
									iconized ? (
										<>
											<Icon name="users" /> Utilisateurs
										</>
									) : (
										'Utilisateurs'
									)
								}
								as={ActiveLink}
								href="/admin/users"
							/>
							<Dropdown.Item
								content={
									iconized ? (
										<>
											<Icon name="google drive" /> Drive
										</>
									) : (
										'Drive'
									)
								}
								as={ActiveLink}
								href="/admin/drive"
							/>
						</Dropdown.Menu>
					</Dropdown>
				</li>
			)}
		</ul>
	);
}

export default MenuNavBar;
