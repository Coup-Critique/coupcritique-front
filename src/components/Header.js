// modules
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Button, IconGroup } from 'semantic-ui-react';
// components
import MainSearch from './forms/MainSearch';
// hooks
import useDarkMode from '../hooks/useDarkMode';
import ShowdownIconHoverable from './actions/ShowdownIconHoverable';
import MenuNavBar from './MenuNavBar';
import MenuUser from './MenuUser';
import CopyMail from './actions/CopyMail';

function Header() {
	const { user, notifs } = useSelector(state => state);
	const [darkMode] = useDarkMode();

	return (
		<header>
			<div className="header-top">
				<div className="container-fluid">
					<Link to="/" className="brand">
						<img
							src={`/images/coupcritique${darkMode ? '-white' : ''}.svg`}
							alt="Logo de Coup Critique"
							// className="d-none d-sm-block"
							width="350"
							height="82"
						/>
						{/* <img
							src={`/images/coupcritique-picto${
								darkMode ? '-white' : ''
							}.svg`}
							alt="Logo de Coup Critique"
							className="d-sm-none"
						/> */}
						<span className="sr-only">Coup Critique</span>
					</Link>
					<div className="navbar-wrapper">
						<nav className="navbar menu">
							<MenuNavBar />
							<MenuUser />
						</nav>
					</div>
				</div>
				<div className="header-bottom">
					<div className="container-fluid">
						<div className="inner-header-bottom">
							<MainSearch size="mini" styleClass="header-search" isHeader />
							<MainSearch
								pageResultUrl="/search/user/"
								placeholder="Recherche utilisateur"
								isUserSearch
								size="mini"
								styleClass="header-search"
							/>
							<div className="d-flex pl-3 pr-4">
								{!!user.id && (
									<Link to="/notifications" className="nav-link mr-2">
										<IconGroup>
											<Icon name="bell" className="m-0" />
											{!!notifs && (
												<Icon
													color="orange"
													name="circle"
													size="tiny"
													style={{ top: '5px', left: '14px' }}
												/>
											)}
										</IconGroup>
										<span className="sr-only">Notifications</span>
									</Link>
								)}
								<CopyMail
									className="nav-link mr-2"
									popupClassName="over-header"
								/>
								<a
									href="https://twitter.com/CoupCritiqueFR"
									target="_blank"
									rel="noreferrer nofollow"
									className="nav-link mr-2"
								>
									<Icon name="twitter" className="m-0" />
									<span className="sr-only">Twitter</span>
								</a>
								<a
									href="https://discord.gg/UNn4Se3ZKM"
									target="_blank"
									rel="noreferrer nofollow"
									className="nav-link mr-2"
								>
									<Icon name="discord" className="m-0" />
									<span className="sr-only">Discord</span>
								</a>
								<ShowdownIconHoverable
									linkProps={{
										href: 'https://play.pokemonshowdown.com/salty',
										target: '_blank',
										rel: 'noreferrer nofollow',
										className: 'nav-link',
										title: 'La Salty Room sur Pokémon Showdown',
									}}
									className="m-0"
								/>
							</div>
							<Button
								color="orange"
								className="iconned btn-padding-reduce mb-2 ml-2"
								as="a"
								href="https://fr.tipeee.com/redemption/"
								target="_blank"
								rel="nofollow noreferrer"
								icon="heart outline"
								content="Soutenir"
							/>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
