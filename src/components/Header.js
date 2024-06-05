// modules

import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Icon, IconGroup } from 'semantic-ui-react';
// components
import MainSearch from '@/components/forms/MainSearch';
// hooks
import ShowdownIconHoverable from '@/components/actions/ShowdownIconHoverable';
import MenuNavBar from '@/components/MenuNavBar';
import MenuUser from '@/components/MenuUser';
import CopyMail from '@/components/actions/CopyMail';
import useCtrlF from '@/hooks/useCtrlF';
// import Image from 'next/image';

function Header() {
	const user = useSelector(state => state.user);
	const notifs = useSelector(state => state.notifs);
	const darkMode = useSelector(state => state.darkMode);
	const ref = useCtrlF();

	return (
		<header>
			<div className="header-top">
				<div className="container-fluid">
					<Link href="/" className="brand">
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
							<div className="d-flex flex-wrap justify-content-center">
								<MainSearch
									innerRef={ref}
									size="mini"
									styleClass="header-search"
									isHeader
								/>
								<MainSearch
									pageResultUrl="/search/user/"
									placeholder="Recherche utilisateur"
									isUserSearch
									size="mini"
									styleClass="header-search"
								/>
							</div>
							<div className="d-flex pl-3 pr-4 justify-content-between">
								{!!user.id && (
									<Link href="/notifications" className="nav-link mr-2">
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
							<a
								className="btn btn-outline-dark btn-padding-reduce mb-2 ml-2"
								href="https://fr.tipeee.com/redemption/"
								target="_blank"
								rel="nofollow noreferrer"
							>
								Soutenir
							</a>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
