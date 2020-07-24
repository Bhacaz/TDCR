import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LayoutDataService {

  constructor(private httpClient: HttpClient) { }

  getLayoutData(): Observable<any> {
    return this.httpClient.get('assets/layout/TDCR.json')
  }

  private subject$ = new Subject<any>();

  selectedTrailMapChanged(trail: object) {
    this.subject$.next(trail);
  }

  selectedTrailMapChanging(): Observable<any> {
    return this.subject$.asObservable();
  }

  selectedTrailMenuChanged(trail: object) {
    this.subject$.next(trail);
  }

  selectedTrailMenuChanging(): Observable<any> {
    return this.subject$.asObservable();
  }
}
