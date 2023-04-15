// modules
import React from 'react';
import PageWrapper from '../PageWrapper';
// components

// TODO utiliser du css pour split l'email et la cacher aux robots
const LegalNotices = () => (
	<PageWrapper
		title="Mentions Légales"
		metadescription="Mentions légales du site coupcritique.fr"
	>
		<h2>I - Identification</h2>
		<p>
			Conformément à l’article 6 de la loi n°2004-575 pour la confiance dans
			l’économie du numérique en date du 21 juin 2004, il est porté aux utilisateurs
			du site coupcritique.fr les informations suivantes :
		</p>
		<p>
			<strong>Éditeur :</strong> Le présent site est édité par l’entreprise
			individuelle <b>Thomas Axel Benoît Fred</b>, située au{' '}
			<b>5 bis Place de l’Eperon, 72000 LE MANS, numéro SIREN : 848 625 802</b>
			<br />
			<strong>
				Contact :{' '}
				<span
					className="cryptedmail"
					data-name="redemptionbj"
					data-domain="gmail"
					data-tld="com"
				/>
			</strong>
		</p>
		<p>
			<strong>Hébergeur : OVHcloud</strong>
			<br />
			<br /> SAS au capital de 10 174 560 €
			<br /> RCS Lille Métropole 424 761 419 00045
			<br /> Code APE 2620Z
			<br /> N° TVA : FR 22 424 761 419
			<br /> Siège social : 2 rue Kellermann - 59100 Roubaix – France
		</p>
		<h2 id="privacy-policy">II - Politique de protection des données personnelles</h2>
		<h3>A - Données personnelles</h3>
		<p>
			Une donnée personnelle est une information permettant d’identifier directement
			ou indirectement une personne physique (nom, prénom, adresse mail, adresse IP,
			etc.)
			<br />
			<br />
			Un traitement de données personnelles est toute opération s’y rapportant :
			collecte, enregistrement, consultation, etc.
		</p>
		<h3>B - Données collectées sur le site coupcritique.fr</h3>
		<p>
			Nous pouvons être amenés à traiter ces catégories de données personnelle :
			<br />
			Données de « contact » (adresse mail, pseudonyme)
			<br />
			Données techniques (données de connexions telles que vos logins et mots de
			passe)
			<br />
			<br />
			Ces données sont dépendantes de vos interactions avec le site coupcritique.fr
			: création d’un compte, post de messages publics, acceptation de cookies, etc.
			La finalité et le caractère obligatoire ou non de ces données vous seront
			indiqués au moment de leur collecte.
			<br />
			<br />
			Vos données peuvent aussi être utilisées afin de respecter des obligations
			légales et/ou réglementaires.
		</p>
		<h3>C - Durée de conservation de vos données</h3>
		<p>
			Vos données personnelles sont conservées uniquement la durée nécessaire au
			regard de leur finalité.
			<br />
			Les données relatives à votre compte seront supprimées au bout de 4 ans suite
			à votre dernière connexion
		</p>
		<h3>D - Le stockage de vos données</h3>
		<p>
			Vos données sont stockées sur le territoire de l’Union Européenne.
			<br />
			Les données peuvent également être transmises aux autorités publiques
			compétentes, à leur demande, ou afin de nous conformer à d’autres obligations
			légales.
		</p>
		<h3>E – Les cookies présents sur le site coupcritique.fr</h3>
		<p>
			Un cookie est un petit fichier déposé et lu lors de votre consultation sur
			coupcritique.fr.
			<br />
			Le site coupcritique.fr utilise des cookies purement nécessaires au bon
			fonctionnement de ses services. Ils ne peuvent être désactivés (cookies
			facilitant votre connexion, sauvegardant vos préférences, etc.)
			<br />
			<br />
			Également, le site coupcritique.fr met en place des fonctionnalités de YouTube
			(lecteur de vidéo) qui peuvent lire ou émettre des cookies. Vous pouvez
			consulter la politique vie privée de YouTube ici :{' '}
			<a
				href="https://policies.google.com/privacy?hl=fr"
				target="_blank"
				rel="nofollow noreferrer"
			>
				https://policies.google.com/privacy?hl=fr
			</a>
			.
		</p>
		<h3>F - Vos droits sur vos données</h3>
		<p>
			Conformément à la réglementation applicable en vigueur (règlement UE 2016/679
			du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection
			des personnes physiques à l'égard du traitement des données à caractère
			personnel dit « RGPD » et loi du 6 janvier 1978 dite « Informatique et
			libertés »), vous disposez de différents droits sur vos données, que vous
			pouvez choisir d’exercer à tout moment :
		</p>
		<ul>
			<li>Droit d’accès</li>
			<li>Droit de rectification</li>
			<li>Droit à l’effacement</li>
			<li>Droit d’opposition</li>
			<li>Droit de portabilité</li>
		</ul>
		<p>
			Pour exercer vos droits, vous pouvez nous contacter à{' '}
			<span
				className="cryptedmail"
				data-name="redemptionbj"
				data-domain="gmail"
				data-tld="com"
			/>
			<br />
			Date de mise à jour : 18/05/2022
		</p>
		<h2>III - Propriété intellectuelle</h2>
		<p>
			Le site coupcritique.fr tient à rappeler qu’il n’est en aucun cas titulaire de
			droits de propriété intellectuels relatifs à Pokémon ou des droits sur les
			créations artistiques (apparence des Pokémon, nom des attaques, etc.) s’y
			rapportant.
			<br />
			<br />
			Le site coupcritique.fr est un site purement communautaire à but non-lucratif
			regroupant des passionnés ayant pour but de promouvoir la licence Pokémon sans
			se l’approprier.
		</p>
	</PageWrapper>
);
export default LegalNotices;
