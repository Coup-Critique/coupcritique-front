// modules
import React from 'react';
import { Icon } from 'semantic-ui-react';
import Profile from '@/components/elements/Profile';
import PageWrapper from '@/components/PageWrapper';
// components

const Thanks = () => {
	return (
		<PageWrapper
			title="Remerciements"
			metadescription="Remerciements aux personnes ayant participé à la construction du site coupcritique.fr."
		>
			<div className="mb-5">
				<h4>
					Merci à Redemption <Icon name="rocket" color="orange" />
				</h4>
				<p>
					D'avoir créé, pensé, soutenu et financé le projet.
					<br />
					Merci à lui de continuer à faire vivre le projet et de fédérer la
					communauté autour.
				</p>
				<ul>
					{/* <li>
                <Profile user={}/>
			</li> */}
					<li>
						<a
							href="https://www.youtube.com/c/RedEmptionBj"
							target="_blank"
							rel="nofollow noreferrer"
						>
							<Icon color="red" name="youtube" /> Youtube&nbsp;: RedEmption
						</a>
					</li>
					<li>
						<a
							href="https://www.twitch.tv/redemption"
							target="_blank"
							rel="nofollow noreferrer"
						>
							<Icon color="purple" name="twitch" /> Twitch&nbsp;: Redemption
						</a>
					</li>
					<li>
						<a
							href="https://twitter.com/RedemptionBj"
							target="_blank"
							rel="nofollow noreferrer"
						>
							<Icon color="blue" name="twitter" /> Twitter&nbsp;:
							@RedemptionBj
						</a>
					</li>
				</ul>
			</div>
			<div className="mb-5">
				<h4>
					Merci à Azeralt (alias Geoffrey Dazelle){' '}
					<Icon name="code" color="orange" />
				</h4>
				<p>
					D'avoir programmé et conçu le site. Merci à lui de continuer à
					maintenir le site.
				</p>
				<ul>
					{/* <li>
                <Profile user={}/>
			</li> */}
					<li>
						<a
							href="https://github.com/GeoDaz"
							target="_blank"
							rel="nofollow noreferrer"
						>
							<Icon name="github" /> Github&nbsp;: GeoDaz
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/geoffrey-dazelle-ab2295157"
							target="_blank"
							rel="nofollow noreferrer"
						>
							<Icon name="linkedin" color="blue" /> Linkedin&nbsp;: Geoffrey
							Dazelle
						</a>
					</li>
				</ul>
			</div>
			<div className="mb-5">
				<h4>
					Merci à Zélie Héry <Icon name="paint brush" color="orange" />
				</h4>
				<p> D'avoir designé le site ainsi que sa charte graphique et son logo.</p>
				<ul>
					{/* <li>
                <Profile user={}/>
			</li> */}
					<li>
						<a
							href="https://www.auralyz.fr/"
							target="_blank"
							// rel="nofollow noreferrer"
						>
							<Icon name="world" /> Site internet&nbsp;: www.auralyz.fr
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/company/auralyz/"
							target="_blank"
							rel="nofollow noreferrer"
						>
							<Icon name="linkedin" color="blue" /> Linkedin&nbsp;: Auralyz
						</a>
					</li>
					<li>
						<a
							href="https://www.instagram.com/auralyz.design/"
							target="_blank"
							rel="nofollow noreferrer"
						>
							<Icon name="instagram" color="pink" /> Instagram&nbsp;: @auralyz.design
						</a>
					</li>
				</ul>
			</div>
			<div className="mb-5">
				<h4>
					Merci à Muhammad Bilaal Yadallee <Icon name="code" color="orange" />
				</h4>
				<p>
					D'avoir participé au développement, sans son support technique la
					maintenance du site aurait été infaisable.
				</p>
				<ul>
					{/* <li>
                <Profile user={}/>
			</li> */}
					<li>
						<a
							href="https://github.com/ii02735"
							target="_blank"
							rel="nofollow noreferrer"
						>
							<Icon name="github" /> Github&nbsp;: ii02735
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/muhammad-bilaal-yadallee-b06572153"
							target="_blank"
							rel="nofollow noreferrer"
						>
							<Icon name="linkedin" color="blue" /> Linkedin&nbsp;: Muhammad
							Bilaal Yadallee
						</a>
					</li>
				</ul>
			</div>
			<div className="mb-5">
				<h4>
					Merci à{' '}
					<a
						href="https://www.linkedin.com/in/robert-khayat-4037aa184"
						target="_blank"
						rel="nofollow noreferrer"
					>
						Robert Khayat
					</a>
					, @adrienmu, @etosan et @illusion <Icon name="code" color="orange" />
				</h4>
				<p>D'avoir participé au développement du site.</p>
			</div>
			<div className="mb-5">
				<h4>
					Merci à la Team Strat <Icon name="gem" color="orange" />
				</h4>
				<p>
					D'être là pour remplir les sets des Pokémon, les actualités et les
					guides. Ainsi que bien évidemment trier les équipes.
					<br />
					Vous faites un super travail&nbsp;!{' '}
					<Icon name="star" color="orange" />
				</p>
			</div>
			<div>
				<h4>
					Merci à la communauté <Icon name="world" color="orange" />
				</h4>
				<p>
					De participer au projet, de le soutenir et d'être active sur le site.
				</p>
			</div>
		</PageWrapper>
	);
};
export default Thanks;
