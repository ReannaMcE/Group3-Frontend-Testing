function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 26.5, lng: -38.0 }
    });

    // Get job roles data from the script tag
    var jobRolesScript = document.getElementById('job-roles-data');
    var jobRolesData = jobRolesScript ? jobRolesScript.textContent : '[]';
    
    let jobRoles = [];
    try {
        jobRoles = JSON.parse(jobRolesData);
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }

    var locations = {
        'Belfast': '4-6 Upper Cres, Belfast BT7 1NT',
        'Birmingham': 'Victoria Square, Birmingham B1 1BD',
        'Derry': '10 Clarendon St, Derry BT48 7ER',
        'Dublin': '1 Harcourt Street, Dublin 2',
        'London': '2nd Floor, 21 Farringdon Rd, London EC1M 3HA',
        'Copenhagen': 'H.C. Andersens Boulevard 8, Copenhagen',
        'Gdansk': '3 Grunwaldzka Street, Gdansk',
        'Helsinki': '1 Aleksanterinkatu, Helsinki',
        'Paris': '10 Rue de la Paix, Paris',
        'Wommelgem': '10 Wommelgem Street, Wommelgem',
        'Buenos Aires': 'Av. Leandro N. Alem 50, Buenos Aires',
        'Indianapolis': '300 E Market St, Indianapolis',
        'Toronto': '123 King St W, Toronto'
    };

    var currentInfoWindow = null;

    function geocodeAddress(address, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                callback(results[0].geometry.location);
            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    var locationJobRoles = {};
    var locationsToProcess = [];

    jobRoles.forEach(function (jobRole) {
        var address = locations[jobRole.location];
        if (address) {
            locationsToProcess.push({ address: address, jobRole: jobRole });
        }
    });

    locationsToProcess.forEach(function (item) {
        geocodeAddress(item.address, function (position) {
            var latLng = position.toString();
            if (!locationJobRoles[latLng]) {
                locationJobRoles[latLng] = [];
            }
            locationJobRoles[latLng].push(item.jobRole);

            var marker = new google.maps.Marker({
                position: position,
                map: map,
                title: `Job roles available: ${locationJobRoles[latLng].map(role => role.title).join(', ')}`
            });

            var jobRoleList = locationJobRoles[latLng];
            var contentString = `
                <div role="dialog" aria-labelledby="info-window-title" style="max-width: 250px; max-height: 300px; overflow-y: auto; padding: 10px; font-size: 14px; line-height: 1.5; background: white; border-radius: 4px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
                    <h3 id="info-window-title">Available Job Roles:</h3>
                    <ul style="list-style-type: none; padding-left: 0;">
                        ${jobRoleList.map(jobRole => `
                            <li>
                                <a href="${jobRole.url}" target="_blank" style="text-decoration: none; color: #252d4f; transition: text-decoration 0.3s;">
                                    ${jobRole.title}
                                </a>
                            </li>`).join('')}
                    </ul>
                </div>
            `;

            var infoWindow = new google.maps.InfoWindow({
                content: contentString
            });

            marker.addListener('click', function () {
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }
                infoWindow.open(map, marker);
                currentInfoWindow = infoWindow;
            });

            google.maps.event.addListener(infoWindow, 'domready', function () {
                var iwOuter = document.querySelector('.gm-style-iw');
                if (iwOuter) {
                    iwOuter.addEventListener('mouseleave', function () {
                        infoWindow.close();
                    });
                }
            });
        });
    });
}

window.onload = initMap;
