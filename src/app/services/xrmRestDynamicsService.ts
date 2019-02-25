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
    let map1$ = this.xrmRestSvc.GetEntitySetName();
    let currentEntityId = this.xrmRestSvc.GetCurrentEntityId();
    let currentEntityName = this.xrmRestSvc.GetCurrentEntityName();
    map1$.pipe(
      flatMap((entityset) => this.xrmRestSvc.SetSwotMatrix(entityset, currentEntityName, currentEntityId, sowtItems))
    ).subscribe();
  }

  public readSwotFromDynamics(): Observable<swotItemCollection[]> {
    let map1$ = this.xrmRestSvc.GetEntitySetName();
    let currentEntityId = this.xrmRestSvc.GetCurrentEntityId();
    let currentEntityName = this.xrmRestSvc.GetCurrentEntityName();
    let map2$ =  map1$.pipe(
      flatMap((entityset) => this.xrmRestSvc.GetSwotMatrix(entityset, currentEntityName, currentEntityId))
    );
    return map2$;
  }

  public isFormInCreate() : Observable<boolean>
  {
    return of(this.xrmRestSvc.GetCurrentEntityId() != "");
  }
}
