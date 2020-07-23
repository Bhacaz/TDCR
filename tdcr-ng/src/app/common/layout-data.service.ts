import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LayoutDataService {

  constructor(private httpClient: HttpClient) { }

  getLayoutData(): Observable<any> {
    return this.httpClient.get('assets/layout/TDCR.json')
  }
}
