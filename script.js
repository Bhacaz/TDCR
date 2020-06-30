var map;

function colorGenerator() {
    const baseColor = [0, 128, 255];
    let colors = [];

    for (let i = 0; i <  3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                const newColor = [baseColor[i], baseColor[j], baseColor[k]];
                if (newColor.toString() !== [0, 0, 0].toString() && newColor.toString() !== [255, 255, 255].toString() && newColor.toString() !== [128, 128, 128].toString()) {
                    colors.push([baseColor[i], baseColor[j], baseColor[k]])
                }
            }
        }
    }
    return colors;
}

function initMap() {
    // set up the map
    map = new google.maps.Map(document.getElementById('map'), {
        streetViewControl: false,
        center: new google.maps.LatLng(46.067344, -73.698438),
        zoom: 14,
        mapTypeId: 'terrain',
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
    });
    const colors = colorGenerator();

    const list = document.getElementById('trailList');

    map.data.loadGeoJson('TDCR.json', '', function(features) {
        console.log(features);
        features.forEach(function(feature, index) {
            map.data.overrideStyle(feature, { strokeColor: 'rgb(' + colors[index][0] + ', ' + colors[index][1] + ', ' + colors[index][2] + ')'})
            const liElement = document.createElement('li');
            const dotElement = document.createElement('div');
            const spanName = document.createElement('span');
            dotElement.classList.add('dot');
            dotElement.style.backgroundColor = 'rgb(' + colors[index][0] + ', ' + colors[index][1] + ', ' + colors[index][2] + ')';
            spanName.innerHTML = feature.j.name;
            liElement.appendChild(dotElement);
            liElement.appendChild(spanName);
            list.appendChild(liElement);
        })
    });

    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    var myloc = new google.maps.Marker({
        clickable: false,
        icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
            new google.maps.Size(22,22),
            new google.maps.Point(0,18),
            new google.maps.Point(11,11)),
        shadow: null,
        zIndex: 999,
        map: map
    });

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(pos) {
            var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            myloc.setPosition(me);
        }, function(error) {
            console.log(error);
            alert(JSON.stringify(error));
        });
    }
}
