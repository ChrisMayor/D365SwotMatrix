///<reference path="../../../node_modules/@types/xrm/index.d.ts"/>

import { Injectable } from '@angular/core';
import { swotItemCollection } from '../model/swotItemCollection';
import { DynamicsService } from './dynamics.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { XrmRestDataService } from './XrmRestDataService';
import {
  map,
  flatMap,
  mergeMap,
  switchMap,
  merge
} from "rxjs/operators";
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class XrmRestDynamicsService implements DynamicsService {

  constructor(private http: HttpClient, private xrmRestSvc:XrmRestDataService) { 

  }


  public writeSwotToDynamics(sowtItems: swotItemCollection[]): void {
    let map1$ = this.xrmRestSvc.getEntitySetName();
    let currentEntityId = this.xrmRestSvc.getCurrentEntityId();
    let currentEntityName = this.xrmRestSvc.getCurrentEntityName();
    map1$.pipe(
      flatMap((entityset) => this.xrmRestSvc.setSwotMatrix(entityset, currentEntityName, currentEntityId, sowtItems))
    ).subscribe();
  }

  public readSwotFromDynamics(): Observable<swotItemCollection[]> {
    let map1$ = this.xrmRestSvc.getEntitySetName();
    let currentEntityId = this.xrmRestSvc.getCurrentEntityId();
    let currentEntityName = this.xrmRestSvc.getCurrentEntityName();
    let map2$ =  map1$.pipe(
      flatMap((entityset) => this.xrmRestSvc.getSwotMatrix(entityset, currentEntityName, currentEntityId))
    );
    return map2$;
  }

  public isFormInCreate() : Observable<boolean>
  {
    return of(this.xrmRestSvc.getCurrentEntityId() == null || this.xrmRestSvc.getCurrentEntityId() == "");
  }
}
