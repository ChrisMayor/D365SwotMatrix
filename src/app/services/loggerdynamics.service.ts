

import { Injectable } from '@angular/core';
import { swotCategory } from '../model/swotCategory';
import { swotItem } from '../model/swotItem';
import { swotItemCollection } from '../model/swotItemCollection';
import { DynamicsService } from './dynamics.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerDynamicsService implements DynamicsService {

  sowtItems: swotItemCollection[] = [];

  constructor() { }

  private convertToText(item: swotItem): string {
    let returnValue: string = "";
    returnValue = returnValue + item.text + "\r\n";
    return returnValue;
  }

  private convertToItems(text: string): swotItem[] {
    let returnValue: swotItem[] = [];
    if (text != null) {
      let itemsArray: string[] = text.split(";;");
      itemsArray.forEach(x => returnValue.push({ text: x, isEditing: false }));
    }
    return returnValue;
  }

  public writeSwotToDynamics(sowtItems: swotItemCollection[]): void {
    this.sowtItems = sowtItems  
    let strengths: string[] = [];
      let weaknesses: string[] = [];
      let opportunities: string[] = [];
      let threats: string[] = [];
      

      sowtItems.forEach(x => {
        switch (x.category) {
          case swotCategory.Strength:
            strengths.push(x.item.text);
            break;
          case swotCategory.Opportunity:
            opportunities.push(x.item.text);
            break;
          case swotCategory.Threats:
            threats.push(x.item.text);
            break;
          case swotCategory.Weakness:
            weaknesses.push(x.item.text);
            break;
        }
      });
      console.log("strengths :" + strengths.join(";;"));
      console.log("weaknesses :" + weaknesses.join(";;"));
      console.log("opportunities :" + opportunities.join(";;"));
      console.log("threats :" + threats.join(";;"));
  }

  public readSwotFromDynamics(): Observable<swotItemCollection[]> {
    return of(this.sowtItems);
  }

  public isFormInCreate() : Observable<boolean>
  {
    return of(false);
  }
}