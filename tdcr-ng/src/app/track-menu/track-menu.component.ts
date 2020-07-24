import { Component, OnInit } from '@angular/core';
import {LayoutDataService} from "../common/layout-data.service";
import colors from "../common/colors";

@Component({
  selector: 'app-track-menu',
  templateUrl: './track-menu.component.html',
  styleUrls: ['./track-menu.component.scss']
})
export class TrackMenuComponent implements OnInit {

  selectedItemName = 'Tournée des Cantons de Rawdon ▽';
  features;

  constructor(private layoutDataService: LayoutDataService) { }

  ngOnInit() {
    this.layoutDataService.getLayoutData().subscribe(data => {
      data.features.forEach((feature, index) => feature.properties.color = colors[index]);
      this.features = data.features
    });
  }

  trackSelected(feature) {
    this.selectedItemName = feature.properties.name + ' ▽';
  }
}
