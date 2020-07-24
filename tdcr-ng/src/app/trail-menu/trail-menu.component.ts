import { Component, OnInit } from '@angular/core';
import {LayoutDataService} from "../common/layout-data.service";
import colors from "../common/colors";

@Component({
  selector: 'app-trail-menu',
  templateUrl: './trail-menu.component.html',
  styleUrls: ['./trail-menu.component.scss']
})
export class TrailMenuComponent implements OnInit {

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
