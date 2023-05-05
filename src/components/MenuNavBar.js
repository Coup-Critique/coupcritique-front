// modules
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
	const { user } = useSelector(state => state);
	return (
		<ul className="navbar-nav">
			<li className="nav-item">
				<NavLink to="/entity/teams" className="nav-link">
					{iconized && <TeamSVG />} Équipes
				</NavLink>
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
							as={NavLink}
							to="/entity/pokemons"
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
							as={NavLink}
							to="/entity/tiers"
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
							as={NavLink}
							to="/entity/moves"
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
							as={NavLink}
							to="/entity/types"
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
							as={NavLink}
							to="/entity/abilities"
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
							as={NavLink}
							to="/entity/items"
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
							as={NavLink}
							to="/entity/actualities"
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
							as={NavLink}
							to="/entity/guides"
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
							as={NavLink}
							to="/entity/tournaments"
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
							as={NavLink}
							to="/resources"
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
							as={NavLink}
							to="/videos"
						/>
					</Dropdown.Menu>
				</Dropdown>
			</li>
			<li className="nav-item d-none d-lg-block">
				<NavLink to="/entity/actualities" className="nav-link">
					{iconized && <ActualitySVG />} Actualités
				</NavLink>
			</li>
			<li className="nav-item d-none d-lg-block">
				<NavLink to="/entity/tournaments" className="nav-link">
					{iconized && <Icon name="sitemap" />} Tournois
				</NavLink>
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
								as={NavLink}
								to="/admin/teams"
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
								as={NavLink}
								to="/admin/users"
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
								as={NavLink}
								to="/admin/drive"
							/>
						</Dropdown.Menu>
					</Dropdown>
				</li>
			)}
		</ul>
	);
}

export default MenuNavBar;
