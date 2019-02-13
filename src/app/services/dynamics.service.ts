import { Injectable } from '@angular/core';
import { swotItem } from '../model/swotItem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DynamicsService {

  constructor() { }

  public convertToText(items: swotItem[]): string {
    let returnValue: string = "";
    items.forEach(x => returnValue = returnValue + x.text + "\r\n");
    return returnValue;
  }

  public writeSwotToDynamics(): void {
    if (Xrm != null) {

    }
  }

  public readSwotFromDynamics() {
    if (Xrm != null) {

    }

  }
}
