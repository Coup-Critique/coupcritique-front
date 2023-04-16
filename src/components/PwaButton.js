import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const PwaButton = () => (
	<div id="pwa-popup" style="display: none;">
		<div class="inner-pwa-popup">
			<div class="logo-zone">
				<div class="app-icon">
					<img
						class="img-fluid"
						alt="CoupCritique"
						src="/images/coupcritique-72.png"
					/>
				</div>
				<span class="brand-text">CoupCritique</span>
			</div>
			<Button
				id="pwa-button"
				type="button"
				color="orange"
				icon="home"
				content="Ajouter à l'écran d'accueil"
				class="ui button icon orange text-uppercase"
			/>
			<div class="blank-block">
				{/*  only for justify content space between  */}
			</div>
			<Icon id="pwa-close" name="x" link color="grey" />
		</div>
	</div>
);
export default PwaButton;
