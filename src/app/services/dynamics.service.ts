import { Injectable } from '@angular/core';
import { swotItem } from '../model/swotItem';
import { swotItemCollection } from '../model/swotItemCollection';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DynamicsService {

  constructor() { }

  private convertToText(items: swotItem[]): string {
    let returnValue: string = "";
    items.forEach(x => returnValue = returnValue + x.text + "\r\n");
    return returnValue;
  }

  private convertToItems(text: string): swotItem[] {
    let itemsArray: string[] = text.split("\r\n");
    let returnValue: swotItem[] = [];
    itemsArray.forEach(x => returnValue.push({ text: x, isEditing: false }));
    return returnValue;
  }

  public writeSwotToDynamics(sowtItems: swotItemCollection[]): void {
    if (Xrm != null) {

    }
  }

  public readSwotFromDynamics() : swotItemCollection[]{
    let returnValue: swotItemCollection[] = [];
    if (Xrm != null) {

    }
    return returnValue;;

  }
}
