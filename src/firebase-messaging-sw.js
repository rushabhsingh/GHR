importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '350776899024'
});
const messaging = firebase.messaging();
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  navigator.geolocation.getCurrentPosition((position) => {
			var currentLatitude = position.coords.latitude;
			var currentLongitude = position.coords.longitude;
			var radlat1 = Math.PI * currentLatitude/180;
			var radlat2 = Math.PI * event.data.lat/180;
			var theta = currentLongitude-event.data.lon;
			var radtheta = Math.PI * theta/180
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			dist = Math.acos(dist);
			dist = dist * 180/Math.PI;
			dist = dist * 60 * 1.1515;
			dist = dist * 1.609344;
			const options = {
				body: dist,
				};
			if(dist < event.data.radius){
			  event.waitUntil(self.registration.showNotification(event.notification.title, event.notification));
			}
		});
	

});