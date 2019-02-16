///<reference path="../../../node_modules/@types/xrm/index.d.ts"/>

import { Injectable } from '@angular/core';
import { swotCategory } from '../model/swotCategory';
import { swotItem } from '../model/swotItem';
import { swotItemCollection } from '../model/swotItemCollection';


@Injectable({
  providedIn: 'root'
})
export class DynamicsService {

  constructor() { }

  private convertToText(item: swotItem): string {
    let returnValue: string = "";
    returnValue = returnValue + item.text + "\r\n";
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
      let strengths: string = "";
      let weaknesses: string = "";
      let opportunities: string = "";
      let threats: string = "";

      sowtItems.forEach(x => {
        switch (x.category) {
          case swotCategory.Strength:
            strengths = strengths + this.convertToText(x.item);
            break;
          case swotCategory.Opportunity:
            opportunities = opportunities + this.convertToText(x.item);
            break;
          case swotCategory.Threats:
            threats = threats + this.convertToText(x.item);
            break;
          case swotCategory.Weakness:
            weaknesses = weaknesses + this.convertToText(x.item);
            break;
        }
      });
      Xrm.Page.getAttribute("mey_swot_strengths").setValue(strengths);
      Xrm.Page.getAttribute("mey_swot_weaknesses").setValue(weaknesses);
      Xrm.Page.getAttribute("mey_swot_opportunities").setValue(opportunities);
      Xrm.Page.getAttribute("mey_swot_threats").setValue(threats);
    }
  }

  public readSwotFromDynamics(): swotItemCollection[] {
    let returnValue: swotItemCollection[] = [];
    if (Xrm != null) {
      let strengths = Xrm.Page.getAttribute("mey_swot_strengths").getValue();
      let weaknesses = Xrm.Page.getAttribute("mey_swot_weaknesses").getValue();
      let opportunities = Xrm.Page.getAttribute("mey_swot_opportunities").getValue();
      let threats = Xrm.Page.getAttribute("mey_swot_threats").getValue();



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
    return returnValue;
  }
}
