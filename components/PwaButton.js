'use client';
import { Button, Icon } from 'semantic-ui-react';

const PwaButton = () => (
	<div id="pwa-popup" className="d-none">
		<div className="inner-pwa-popup">
			<div className="logo-zone">
				<div className="app-icon">
					<img
						className="img-fluid"
						alt="CoupCritique"
						src="/images/coupcritique-72.png"
					/>
				</div>
				<span className="brand-text">CoupCritique</span>
			</div>
			<Button
				id="pwa-button"
				type="button"
				color="orange"
				icon="home"
				content="Ajouter à l'écran d'accueil"
				className="ui button icon orange text-uppercase"
			/>
			<div className="blank-block">
				{/*  only for justify content space between  */}
			</div>
			<Icon id="pwa-close" name="x" link color="grey" />
		</div>
	</div>
);
export default PwaButton;
