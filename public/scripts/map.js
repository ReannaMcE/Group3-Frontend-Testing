async function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 26.5, lng: -38.0 }
    });

    var locations = {
        'Belfast': {
            address: '4-6 Upper Cres, Belfast BT7 1NT',
            url: 'https://www.kainos.com/contact-us/uk-and-ireland/belfast'
        },
        'Birmingham': {
            address: 'Victoria Square, Birmingham B1 1BD',
            url: 'https://www.kainos.com/contact-us/uk-and-ireland/Birmingham'
        },
        'Derry': {
            address: '10 Clarendon St, Derry BT48 7ER',
            url: 'https://www.kainos.com/contact-us/uk-and-ireland/Derry'
        },
        'Dublin': {
            address: '1 Harcourt Street, Dublin 2',
            url: 'https://www.kainos.com/contact-us/uk-and-ireland/Dublin'
        },
        'London': {
            address: '2nd Floor, 21 Farringdon Rd, London EC1M 3HA',
            url: 'https://www.kainos.com/contact-us/uk-and-ireland/London'
        },
        'Copenhagen': {
            address: 'H.C. Andersens Boulevard 8, Copenhagen',
            url: 'https://www.kainos.com/contact-us/europe/Copenhagen'
        },
        'Gdansk': {
            address: '3 Grunwaldzka Street, Gdansk',
            url: 'https://www.kainos.com/contact-us/europe/Gdansk'
        },
        'Helsinki': {
            address: '1 Aleksanterinkatu, Helsinki',
            url: 'https://www.kainos.com/contact-us/europe/helsinki'
        },
        'Paris': {
            address: '10 Rue de la Paix, Paris',
            url: 'https://www.kainos.com/contact-us/europe/Paris'
        },
        'Wommelgem': {
            address: '10 Wommelgem Street, Wommelgem',
            url: 'https://www.kainos.com/contact-us/europe/Wommelgem'
        },
        'Buenos Aires': {
            address: 'Av. Leandro N. Alem 50, Buenos Aires',
            url: 'https://www.kainos.com/contact-us/americas/Buenos'
        },
        'Indianapolis': {
            address: '300 E Market St, Indianapolis',
            url: 'https://www.kainos.com/contact-us/americas/Indianapolis'
        },
        'Toronto': {
            address: '123 King St W, Toronto',
            url: 'https://www.kainos.com/contact-us/americas/Toronto'
        }
    };

    var currentInfoWindow = null;

    function geocodeAddress(address) {
        return new Promise((resolve, reject) => {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status === 'OK') {
                    resolve(results[0].geometry.location);
                } else {
                    reject('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
    }

    function createMarker(location, address, url) {
        geocodeAddress(address).then(position => {
            var marker = new google.maps.Marker({
                position: position,
                map: map,
                title: location // Location name appears on hover
            });

            var infoWindowContent = `
                <div class="custom-info-window">
                    <h3>${location}</h3>
                    <p>${address}</p>
                    <a href="${url}" target="_blank">Contact Us</a>
                </div>
            `;

            var infoWindow = new google.maps.InfoWindow({
                content: infoWindowContent
            });

            marker.addListener('click', function () {
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }
                infoWindow.open(map, marker);
                currentInfoWindow = infoWindow;
            });

        }).catch(error => {
            console.error('Error geocoding address:', error);
        });
    }

    // Add markers for all locations
    Object.keys(locations).forEach(location => {
        createMarker(location, locations[location].address, locations[location].url);
    });
}

window.onload = initMap;