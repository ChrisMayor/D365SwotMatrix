///<reference path="../../../node_modules/@types/xrm/index.d.ts"/>
import { swotItemCollection } from '../model/swotItemCollection';

import { Injectable } from '@angular/core';
import { HttpParams,HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, Subscriber, Subscription } from 'rxjs';
import {
  map
} from "rxjs/operators";
import { swotItem } from '../model/swotItem';
import { swotCategory } from '../model/swotCategory';


@Injectable({
  providedIn: 'root'
})
export class XrmRestDataService {

 

  constructor(private http: HttpClient) { }

  public GetDynamicsApiUrl(): string {
    let url = window.parent.Xrm.Page.context.getClientUrl();
    let apiversion = window.parent.Xrm.Page.context.getVersion().substring(0,3);
    return `${url}/api/data/v${apiversion}`
  }

  public GetCurrentEntityName(): string {
    return this.getParamValueQueryString("typename");
  }

  public GetEntitySetName() : Observable<string>
  {
      let apiURL = `${this.GetDynamicsApiUrl()}/EntityDefinitions(LogicalName='${this.GetCurrentEntityName()}')?$select=EntitySetName`;
      let subscription =  this.http.get(apiURL).pipe<Object, string>(
        map<object, any> (result => result as any),
        map<any,string>(a => { return a.EntitySetName }
      ));
      return subscription;
  }

  public GetSwotMatrix(entitySetName : string, entityname:string, id:string) : Observable<swotItemCollection[]>
  {
      let apiURL = `${this.GetDynamicsApiUrl()}/${entitySetName}?$select=mey_swot_strengths,mey_swot_weaknesses,mey_swot_opportunities,mey_swot_threats&$filter=${entityname}id%20eq%20%27${id}%27`;
      let subscription =  this.http.get(apiURL).pipe<Object, swotItemCollection[]>(
        map<object, any> (result => result as any),
        map<any,swotItemCollection[]>(a => { 
          return this.MapSwotItem(a);
        }
      ));
      return subscription;
  }

  private convertToItems(text: string): swotItem[] {

    let returnValue: swotItem[] = [];
    if (text != null) {
      let itemsArray: string[] = text.split(";;");
      itemsArray.forEach(x => returnValue.push({ text: x, isEditing: false }));
    }
    return returnValue;
  }

  private MapSwotItem(a:any) : swotItemCollection[]
  {
    console.log("map");
    console.log(a);
    let stregthItems = this.convertToItems(a.value[0].mey_swot_strengths);
    let weaknessesItems = this.convertToItems(a.value[0].mey_swot_weaknesses);
    let opportunitiesItems = this.convertToItems(a.value[0].mey_swot_opportunities);
    let threatsItems = this.convertToItems(a.value[0].mey_swot_threats);

    let returnValue: swotItemCollection[] = [];

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

      return returnValue;
  }

  public SetSwotMatrix(entitySetName : string, entityname:string, id:string, sowtItems : swotItemCollection[]) : Observable<object>
  {
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

      let apiURL = `${this.GetDynamicsApiUrl()}/${entitySetName}(${id.replace("{","").replace("}","")})`;
      
      let body = {  
        "mey_swot_strengths": strengths.join(";;"),  
        "mey_swot_weaknesses": weaknesses.join(";;"),  
        "mey_swot_opportunities":opportunities.join(";;"),  
        "mey_swot_threats": threats.join(";;"),  
      };

      let subscription =  this.http.patch(apiURL,body);
      return subscription;

    
  }

  public GetCurrentEntityId(): string {
    return this.getParamValueQueryString("id");
  }

  getParamValueQueryString( paramName ) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

}