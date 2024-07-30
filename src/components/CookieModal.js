import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { makeClassName } from '@/functions';
import { getCookie, setCookie } from '@/functions/cookie';
import useActions from '@/hooks/useActions';
import { setCookieAction } from '@/reducers/cookie';

const CookieModal = () => {
	const dispatch = useDispatch();
	const [storeCookie] = useActions(dispatch, [setCookieAction]);
	const cookie = useSelector(state => state.cookie);
	const [open, setOpen] = useState(false);
	const [openBand, setOpenBand] = useState(false);
	const [checkedYtb, setCheckedYtb] = useState(cookie.youtube);
	const [checkedGAds, setCheckedGAds] = useState(cookie.googleAds);

	const handleOpen = e => setOpen(true);
	const handleClose = e => setOpen(false);

	const acceptAll = e => {
		setOpen(false);
		setOpenBand(false);
		setCookie('accept-youtube-cookie', 'true');
		setCookie('accept-google-ads-cookie', 'true');
		storeCookie({ youtube: true });
		storeCookie({ youtube: true, googleAds: true });
	};

	const rejectAll = e => {
		setOpen(false);
		setOpenBand(false);
		setCookie('accept-youtube-cookie', 'false');
		setCookie('accept-google-ads-cookie', 'false');
		storeCookie({ youtube: false });
		storeCookie({ youtube: false, googleAds: false });
	};

	const acceptSome = e => {
		setOpen(false);
		setOpenBand(false);
		setCookie('accept-youtube-cookie', `${checkedYtb}`);
		setCookie('accept-google-ads-cookie', `${checkedGAds}`);
		storeCookie({ youtube: checkedYtb });
		storeCookie({ youtube: checkedYtb, googleAds: checkedGAds });
	};

	const handleChangeYtb = e => setCheckedYtb(!checkedYtb);
	const handleChangeGAds = e => setCheckedGAds(!checkedGAds);

	useEffect(() => {
		const youtube = getCookie('accept-youtube-cookie');
		const googleAds = getCookie('accept-google-ads-cookie');
		setCheckedYtb(youtube);
		setCheckedGAds(googleAds);
		storeCookie({ youtube });
		storeCookie({ youtube, googleAds });
		if (youtube === undefined || googleAds === undefined) {
			setOpenBand(true);
		}
	}, []);

	return (
		<>
			<div id="cookie-band" className={openBand ? 'd-block' : 'd-none'}>
				<div className="container-fluid">
					<div className="row">
						<div className="col-xl-6 d-flex align-items-center justify-content-center justify-content-xl-start">
							<p className="mb-3 mb-xl-0 text-grey">
								Bonjour, pour le bon fonctionnement du site et le lecteur
								youtube nous utilisons des cookies.{' '}
								<Link
									href="/mentions-legales#privacy-policy"
									className="half-font-size"
								>
									Voir notre politique de confidentialité
								</Link>
							</p>
						</div>
						<div className="col-xl-6 text-center text-xl-right">
							<button
								type="button"
								role="button"
								aria-label="Accepter tous les cookies"
								id="accept-all"
								className="btn btn-orange btn-cookie-consent mr-1"
								onClick={acceptAll}
							>
								<i className="icon check"></i> Tout accepter
							</button>
							<button
								type="button"
								role="button"
								aria-label="Voir les cookies en détail"
								id="display-cookie-modal"
								className="btn btn-secondary mr-1"
								onClick={handleOpen}
							>
								Voir en détail
							</button>
							<button
								type="button"
								role="button"
								aria-label="Refuser tous les cookies"
								id="reject-all"
								className="btn btn-secondary btn-cookie-consent"
								onClick={rejectAll}
							>
								<i className="icon x"></i> Tout refuser *
							</button>
							<div className="half-font-size mt-3 mt-lg-2">
								* sauf le nécessaire au bon fonctionnement du site
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				id="cookie-modal"
				className={makeClassName('modal fade', open && 'show')}
				tabIndex="-1"
				role="dialog"
			>
				<div className="modal-content">
					<div className="modal-header">
						<h4>Gestion de vos préférences pour tous les services</h4>
						<button
							type="button"
							role="button"
							id="close-cookie-modal"
							className="close"
							data-dismiss="modal"
							aria-label="Fermer la fenêtre"
							onClick={handleClose}
						>
							<span aria-hidden="true" className="text-white">
								×
							</span>
						</button>
					</div>
					<div className="modal-body text-grey">
						<p>
							Un cookie est un petit fichier déposé et lu lors de votre
							consultation sur coupcritique.fr.
							<br />
							<br />
							<Link href="/mentions-legales#privacy-policy">
								Consultez nos conditions générales d'utilisation pour en
								savoir plus sur notre politique de confidentialité et de
								données personnelles.
							</Link>
							<br />
							En autorisant ces services tiers, vous acceptez le dépôt et la
							lecture de cookies et l'utilisation de technologies de suivi
							nécessaires à leur bon fonctionnement.
						</p>
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-10 mb-4">
									<h5>Nécessaire au bon fonctionnement du site</h5>
									<p>
										Le site coupcritique.fr utilise des cookies
										purement nécessaires au bon fonctionnement de ses
										services. Ils ne peuvent être désactivés (cookies
										facilitant votre connexion, sauvegardant vos
										préférences, etc.)
										<br />
										En continuant à naviguer sur ce site, vous
										acceptez leur utilisation.
									</p>
								</div>
								<div className="col-md-2 pt-md-4 pb-4">
									<div className="custom-control custom-switch">
										<input
											type="checkbox"
											checked
											disabled
											className="custom-control-input"
											id="consent-necessary"
										/>
										<label
											className="custom-control-label"
											htmlFor="consent-necessary"
										></label>
									</div>
								</div>
								<div className="col-md-10">
									<h5>Cookies Youtube</h5>
									<p>
										Vous permez d'être connecté sur les intégrations
										des vidéos youtubes.
									</p>
								</div>
								<div className="col-md-2 pt-md-4 pb-4">
									<div className="custom-control custom-switch">
										<input
											type="checkbox"
											className="custom-control-input"
											id="consent-youtube"
											checked={checkedYtb || false}
											onChange={handleChangeYtb}
										/>
										<label
											className="custom-control-label"
											htmlFor="consent-youtube"
										></label>
									</div>
								</div>
								<div className="col-md-10">
									<h5>Cookies Google Ads</h5>
									<p>
										Ils nous permettent d'être rémunéré lorsque vous
										visionnez ou cliquez sur des annonces affichées
										sur le site.
										<br />
										Cette aide est précieuse et nous permet de
										continuer à rendre le site disponible pour un tel
										trafic.
										<br />
										Si vous ne voulez pas voir de publicité et donc
										que vous refusez ce type de cookies, n'hésitez pas
										à nous soutenir directement en faisant un dont sur
										le{' '}
										<a
											href="https://fr.tipeee.com/redemption/"
											target="_blank"
											rel="nofollow noreferrer"
											className="text-orange"
										>
											Tipeee
										</a>
										.
									</p>
								</div>
								<div className="col-md-2 pt-md-4 pb-4">
									<div className="custom-control custom-switch">
										<input
											type="checkbox"
											className="custom-control-input"
											id="consent-ads"
											checked={checkedGAds || false}
											onChange={handleChangeGAds}
										/>
										<label
											className="custom-control-label"
											htmlFor="consent-ads"
										></label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="modal-footer flex-column">
						<div className="d-flex">
							<button
								type="button"
								role="button"
								aria-label="Accepter tous les cookies"
								id="accept-all-modal"
								className="btn btn-orange btn-cookie-consent"
								onClick={acceptAll}
							>
								<i className="icon check"></i> Tout accepter
							</button>
							<button
								type="button"
								role="button"
								aria-label="Accepter les cookies pré-sélectionnés et nécessaire au bon fonctionnement du site"
								id="accept-some-modal"
								className="btn btn-secondary btn-cookie-consent"
								onClick={acceptSome}
							>
								Accepter la séléction
							</button>
							<button
								type="button"
								role="button"
								aria-label="Refuser tous les cookies"
								id="reject-all-modal"
								className="btn btn-secondary btn-cookie-consent"
								onClick={rejectAll}
							>
								<i className="icon x"></i> Tout refuser *
							</button>
						</div>
						<div className="half-font-size  mt-3 mt-lg-2">
							* sauf le nécessaire au bon fonctionnement du site
						</div>
					</div>
				</div>
			</div>
			<div
				id="cookie-modal-overlay"
				className={makeClassName('modal-backdrop fade', open && 'show')}
				onClick={handleClose}
			></div>
		</>
	);
};
export default CookieModal;
