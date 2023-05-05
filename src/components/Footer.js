// modules
import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from '@/components/fields/DarkModeToggle';
import MenuNavBar from '@/components/MenuNavBar';

const Footer = () => (
	<footer>
		<div className="footer-responsive">
			<MenuNavBar iconized />
		</div>
		<div className="container">
			<Link to="/" className="brand">
				<img
					src="/images/coupcritique-big-white.svg"
					alt="Logo de coup critique"
					width="250"
					height="170"
				/>
				<span className="sr-only">Coup Critique</span>
			</Link>
			<div className="footer-content">
				<div className="dark-mode-toggle-wrapper">
					<div className="position-relative d-inline-block">
						<DarkModeToggle />
					</div>
				</div>
				<nav className="navbar menu">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="/entity/teams/top" className="nav-link">
								Équipe de la semaine
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/entity/teams" className="nav-link">
								Trouver une équipe
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/entity/teams/create" className="nav-link">
								Proposer une équipe
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/entity/guides" className="nav-link">
								Guides stratégiques
							</Link>
						</li>
						{
							<li className="nav-item">
								<Link to="/entity/tournaments" className="nav-link">
									Tournois
								</Link>
							</li>
						}
						<li className="nav-item">
							<Link to="/entity/actualities" className="nav-link">
								Actualités
							</Link>
						</li>
					</ul>
				</nav>
				<div className="footer-bottom">
					<Link to="/remerciements">Remerciements</Link> -{' '}
					<Link to="/mentions-legales">Mentions légales</Link> -{' '}
					<Link to="/cgu">CGU</Link> - Tous droits réservés - Coup Critique 2020
				</div>
			</div>
		</div>
	</footer>
);
export default Footer;
