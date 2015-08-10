// When the window has finished loading create our google map below
            google.maps.event.addDomListener(window, 'load', init);
        
            function init() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 15,
					scrollwheel: false ,
                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(
34.691993, 135.493279
), // New York

                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"lightness":"1"},{"gamma":"1.67"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.icon","stylers":[{"visibility":"simplified"},{"color":"#9acf59"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"simplified"},{"saturation":"-3"},{"gamma":"1.60"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"gamma":"0.94"},{"weight":"0.87"},{"lightness":"-4"},{"saturation":"21"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"-17"},{"lightness":"15"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"},{"saturation":"-82"},{"lightness":"47"},{"weight":"1.40"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"simplified"},{"weight":"1.0"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"color":"#5d4627"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"saturation":"-29"},{"lightness":"32"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"},{"weight":"1.01"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"lightness":"-7"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"lightness":"27"},{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"saturation":"-16"},{"lightness":"33"},{"gamma":"1"},{"weight":"1.0"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#84afa3"},{"lightness":52}]}]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('gmap');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);

                // Let's also add a marker while we're at it
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(
34.691993, 135.493279
),
                    map: map,
                    title: 'Snazzy!'
                });
            }
			
			