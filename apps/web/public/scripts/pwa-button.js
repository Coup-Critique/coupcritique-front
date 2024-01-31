// add btn to download PWA
(function () {
	var deferredPrompt;
	var mobilesRegex = new RegExp(
		/^.*(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone).*$/
	);

	if (typeof window === 'undefined') return;

	window.addEventListener('beforeinstallprompt', function (e) {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;

		var storage = localStorage.getItem('pwa-download');
		if (storage) return;

		if (!mobilesRegex.test(navigator.userAgent)) return;

		// Update UI to notify the user they can add to home screen
		var pwaPopup = document.getElementById('pwa-popup');
		var pwaButton = document.getElementById('pwa-button');
		var pwaClose = document.getElementById('pwa-close');
		pwaPopup.style.display = 'block';

		pwaButton.addEventListener('click', function () {
			// Show the prompt
			deferredPrompt.prompt();
			// Wait for the user to respond to the prompt
			deferredPrompt.userChoice.then(function ({ outcome }) {
				deferredPrompt = null;
				if (outcome === 'accepted') {
					localStorage.setItem('pwa-download', 'true');
					// hide our user interface that shows our A2HS button
					pwaPopup.style.display = 'none';
				}
			});
		});

		pwaClose.addEventListener('click', function () {
			// hide our user interface that shows our A2HS button
			pwaPopup.style.display = 'none';
			deferredPrompt = null;
			localStorage.setItem('pwa-download', 'false');
		});
	});
})();
