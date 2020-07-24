var map;

const colors = ["#00755E", "#0095B7", "#FBE7B2", "#FF91A4", "#1560BD", "#FE4C40", "#FC80A5", "#00CC99", "#FD0E35", "#FFAE42", "#DEA681", "#B5B35C", "#ECEBBD", "#803790", "#E77200", "#8D90A1", "#FEBAAD", "#FF3399", "#01786F", "#FBE870", "#29AB87", "#EED9C4", "#8359A3", "#00CCCC", "#C88A65", "#AF593E", "#6B3FA0", "#837050", "#F7A38E", "#F7468A", "#CA3435", "#E30B5C", "#5FA777", "#4F69C6", "#DA3287", "#93CCEA", "#E97451", "#C62D42", "#7BA05B", "#DB5079", "#33CC99", "#926F5B", "#FF9980", "#BB3385", "#8E3179", "#C3CDE6", "#1AB385", "#C32148", "#93DFB8", "#6CDAE7", "#DA8A67", "#652DC1", "#E29CD2", "#FFA6C9", "#F091A9", "#FFFF99", "#FF681F", "#FE6F5E", "#63B76C", "#A50B5E", "#EDC9AF", "#B94E48", "#009DC4", "#9DE093", "#C9A0DC", "#FFB7D5", "#FF8833", "#FCD667", "#C5E17A", "#FDD7E4", "#FBAED2", "#AFE313", "#D27D46", "#76D7EA", "#ED0A3F", "#9E5B40", "#614051", "#FFB97B", "#02A4D3", "#6456B7", "#D6AEDD", "#0066CC", "#9999CC", "#FFCBA4", "#F653A6", "#0066FF", "#7A89B8", "#A9B2C3", "#87421F", "#F1E788", "#C154C1", "#FF7034"]

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
    const list = document.getElementById('trailList');

    map.data.loadGeoJson('TDCR.json', '', function(features) {
        features.forEach(function(feature, index) {
            map.data.overrideStyle(feature, { strokeColor: colors[index]});
            const liElement = document.createElement('li');
            const dotElement = document.createElement('div');
            const spanName = document.createElement('span');
            dotElement.classList.add('dot');
            dotElement.style.backgroundColor = colors[index];
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
