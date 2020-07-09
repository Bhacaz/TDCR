import React from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css'
import colors from '../colors';

function mapOptions(maps) {
    return {
        streetViewControl: false,
        mapTypeId: 'terrain',
        fullscreenControl: false,
        mapTypeControl: true,
        zoomControlOptions: {
            position: maps.ControlPosition.RIGHT_BOTTOM
        },
        mapTypeControlOptions: {
            position: maps.ControlPosition.TOP_RIGHT,
            style: maps.MapTypeControlStyle.DROPDOWN_MENU
        },
    }
}

function selectedLine(feature) {

}

const handleApiLoaded = (map, maps) => {
    map.data.loadGeoJson('layout/TDCR.json', '', function(features) {
        features.forEach(function(feature, index) {
            map.data.overrideStyle(feature, { strokeColor: colors[index]});

            map.data.addListener('click', function(event) {
                features.forEach(function(feature) {
                    map.data.overrideStyle(feature, { strokeWeight: 2 });
                });
                map.data.overrideStyle(event.feature, { strokeWeight: 6 });
            });
        })
    });

    var myloc = new maps.Marker({
        clickable: false,
        icon: new maps.MarkerImage('current_location.png',
            new maps.Size(48,48),
            new maps.Point(0,0),
            new maps.Point(24,24),
            new maps.Size(48,48)),
        shadow: null,
        zIndex: 999,
        map: map
    });

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(pos) {
            var me = new maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            myloc.setPosition(me);
        }, function(error) {
            console.log(error);
            alert(JSON.stringify(error));
        });
    }
};

class Map extends React.Component {
    static defaultProps = {
        center: { lat: 46.067344, lng: -73.698438 },
        zoom: 14
    };

    render() {
        return (
            <div id='map' >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyC24WVTUS6lPMaFXwozCjSl3Eik9gMJ7Ik' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    options={mapOptions}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;
