var map;

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
    map.data.loadGeoJson('TDCR.json');
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
            console.log(error)
            alert(JSON.stringify(error));
        });
    }
}
