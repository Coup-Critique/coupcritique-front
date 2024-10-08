var _paq = (window._paq = window._paq || []);
// CODE CNIL OBLIGATOIRE
_paq.push([
	function () {
		var self = this;
		function getOriginalVisitorCookieTimeout() {
			var now = new Date(),
				nowTs = Math.round(now.getTime() / 1000),
				visitorInfo = self.getVisitorInfo();
			var createTs = parseInt(visitorInfo[2]);
			var cookieTimeout = 33696000; // 13 mois en secondes
			var originalTimeout = createTs + cookieTimeout - nowTs;
			return originalTimeout;
		}
		this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
	},
]);
// FIN DU CODE CNIL
//  Matomo
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
_paq.push(['HeatmapSessionRecording::disable']);
(function () {
	var u = '//matomo.coupcritique.fr/';
	_paq.push(['setTrackerUrl', u + 'matomo.php']);
	_paq.push(['setSiteId', '1']);
	var d = document,
		g = d.createElement('script'),
		s = d.getElementsByTagName('script')[0];
	g.async = true;
	g.src = u + 'matomo.js';
	s.parentNode.insertBefore(g, s);
})();
// End Matomo Code
