import {Component, OnDestroy, OnInit} from '@angular/core';
import colors from "../common/colors";
import {LayoutDataService} from "../common/layout-data.service";
import {LatLngBounds} from "@agm/core/services/google-maps-types";

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  lat = 46.067344;
  lng = -73.723038;
  fitBoundsItem = false;

  options = {
    streetViewControl: false,
    zoom: 13,
    mapTypeId: 'terrain',
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: 2,
      position: 3
    }
  }

  features: any;
  trailChangingSubscription;
  map;

  constructor(private layoutDataService: LayoutDataService) {
    this.trailChangingSubscription = this.layoutDataService.selectedTrailMenuChanging().subscribe(feature => this.trackSelectedFromMenu(feature));
  }

  ngOnInit() {

  }

  styleFunc(feature) {
     return ({
       clickable: true,
       strokeColor: feature.getProperty('color'),
       strokeWeight: 3
     });
   }

  clicked(event) {
    const feature = this.features.features.find(feature => feature.properties.id === event.feature.getProperty('id'));
    this.layoutDataService.selectedTrailMapChanged(feature);
    const bounds = new google.maps.LatLngBounds();
    event.feature.getGeometry().forEachLatLng(latLng => bounds.extend(latLng))
    this.map.fitBounds(bounds);
  }

  trackSelectedFromMenu(feature) {
    console.log(feature)
    const featureId = feature.properties.id;
    const bounds = new google.maps.LatLngBounds();
    console.log(this.map.data)
    this.map.data.forEach(dataFeature => {
      if (dataFeature.getProperty('id') === featureId) {
        dataFeature.getGeometry().forEachLatLng(latLng => bounds.extend(latLng))
        this.fitBoundsItem = bounds;
      }
    })
  }

  mapReady(map) {
    this.map = map;
    this.layoutDataService.getLayoutData().subscribe(data => {
      data.features.forEach((feature, index) => feature.properties.color = colors[index]);
      this.features = data

      this.map.data.addGeoJson(this.features);
      this.map.data.setStyle(this.styleFunc);
      this.map.data.addListener('click', event => this.clicked(event))
    });
  }

  ngOnDestroy() {
    this.trailChangingSubscription.unsubscribe();
  }
}
