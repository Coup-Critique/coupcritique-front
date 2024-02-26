// modules

import Link from 'next/link';
import DarkModeToggle from '@/components/fields/DarkModeToggle';
import MenuNavBar from '@/components/MenuNavBar';
// // import Image from 'next/image';

const Footer = () => (
	<footer>
		<div className="footer-responsive">
			<MenuNavBar iconized />
		</div>
		<div className="container">
			<a href="/" className="brand">
				<img
					src="/images/coupcritique-big-white.svg"
					alt="Logo de coup critique"
					width="250"
					height="170"
				/>
				<span className="sr-only">Coup Critique</span>
			</a>
			<div className="footer-content">
				<div className="dark-mode-toggle-wrapper">
					<div className="position-relative d-inline-block">
						<DarkModeToggle />
					</div>
				</div>
				<nav className="navbar menu">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a href="/entity/teams/top" className="nav-link">
								Équipe de la semaine
							</a>
						</li>
						<li className="nav-item">
							<a href="/entity/teams" className="nav-link">
								Trouver une équipe
							</a>
						</li>
						<li className="nav-item">
							<Link href="/entity/teams/create" className="nav-link">
								Proposer une équipe
							</Link>
						</li>
						<li className="nav-item">
							<a href="/entity/guides" className="nav-link">
								Guides stratégiques
							</a>
						</li>

						<li className="nav-item">
							<a href="/entity/tournaments" className="nav-link">
								Tournois
							</a>
						</li>
						<li className="nav-item">
							<a href="/entity/actualities" className="nav-link">
								Actualités
							</a>
						</li>
					</ul>
				</nav>
				<div className="footer-bottom">
					<Link href="/remerciements">Remerciements</Link> -{' '}
					<Link href="/mentions-legales">Mentions légales</Link> -{' '}
					<Link href="/cgu">CGU</Link> - Tous droits réservés - Coup Critique
					2020
				</div>
			</div>
		</div>
	</footer>
);
export default Footer;
