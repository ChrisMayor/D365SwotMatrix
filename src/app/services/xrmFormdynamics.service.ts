///<reference path="../../../node_modules/@types/xrm/index.d.ts"/>

import { Injectable} from '@angular/core';
import { swotCategory } from '../model/swotCategory';
import { swotItem } from '../model/swotItem';
import { swotItemCollection } from '../model/swotItemCollection';
import { DynamicsService } from './dynamics.service';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class XrmFormDynamicsService implements DynamicsService {



  constructor() { }

  private convertToText(item: swotItem): string {
    let returnValue: string = "";
    returnValue = returnValue + item.text + "\r\n";
    return returnValue;
  }



  public writeSwotToDynamics(sowtItems: swotItemCollection[]): void {
    if (window.parent != null && window.parent.Xrm != null) {
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
      window.parent.Xrm.Page.getAttribute("mey_swot_strengths").setValue(strengths.join(";;"));
      window.parent.Xrm.Page.getAttribute("mey_swot_weaknesses").setValue(weaknesses.join(";;"));
      window.parent.Xrm.Page.getAttribute("mey_swot_opportunities").setValue(opportunities.join(";;"));
      window.parent.Xrm.Page.getAttribute("mey_swot_threats").setValue(threats.join(";;"));
    }
  }

  private convertToItems(text: string): swotItem[] {

    let returnValue: swotItem[] = [];
    if (text != null) {
      let itemsArray: string[] = text.split(";;");
      itemsArray.forEach(x => returnValue.push({ text: x, isEditing: false }));
    }
    return returnValue;
  }

  public readSwotFromDynamics(): Observable<swotItemCollection[]> {
    let returnValue: swotItemCollection[] = [];
    if (window.parent != null && window.parent.Xrm != null) {
      let strengths = window.parent.Xrm.Page.getAttribute("mey_swot_strengths").getValue();
      let weaknesses = window.parent.Xrm.Page.getAttribute("mey_swot_weaknesses").getValue();
      let opportunities = window.parent.Xrm.Page.getAttribute("mey_swot_opportunities").getValue();
      let threats = window.parent.Xrm.Page.getAttribute("mey_swot_threats").getValue();



      let stregthItems = this.convertToItems(strengths);
      let weaknessesItems = this.convertToItems(weaknesses);
      let opportunitiesItems = this.convertToItems(opportunities);
      let threatsItems = this.convertToItems(threats);

      stregthItems.forEach(i => {
        returnValue.push({ item: i, category: swotCategory.Strength });
      })

      weaknessesItems.forEach(i => {
        returnValue.push({ item: i, category: swotCategory.Weakness });
      })

      opportunitiesItems.forEach(i => {
        returnValue.push({ item: i, category: swotCategory.Opportunity });
      })

      threatsItems.forEach(i => {
        returnValue.push({ item: i, category: swotCategory.Threats });
      })
    }

    return of(returnValue);
  }

  public isFormInCreate() : Observable<boolean>
  {
    return of(false);
  }

}
