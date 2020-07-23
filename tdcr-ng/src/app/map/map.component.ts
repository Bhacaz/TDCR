import { Component, OnInit } from '@angular/core';
import colors from "../common/colors";
import {LayoutDataService} from "../common/layout-data.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 46.067344;
  lng = -73.723038;

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

  constructor(private layoutDataServer: LayoutDataService) {
  }

  ngOnInit() {
    this.layoutDataServer.getLayoutData().subscribe(data => {
      data.features.forEach((feature, index) => feature.properties.color = colors[index]);
      this.features = data
    });
  }

  styleFunc(feature) {
     return ({
       clickable: true,
       strokeColor: feature.getProperty('color'),
       strokeWeight: 3
     });
   }

  clicked(event) {
    console.log(event.feature.getProperty('name'));
  }
}
