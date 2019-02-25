import { Component, OnInit, Inject } from '@angular/core';
import { DynamicsService } from "../services/dynamics.service"
import { swotItem } from '../model/swotItem';
import { swotCategory } from '../model/swotCategory';
import { swotItemCollection } from '../model/swotItemCollection';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})

export class MatrixComponent implements OnInit {

  InCreate: boolean = false;
  strengthArray: swotItem[] = [];
  weaknessArray: swotItem[] = [];
  opportunityArray: swotItem[] = [];
  treathArray: swotItem[] = [];
  /**
   *
   */
  constructor(@Inject('MyDynamicsService') private dynamicsService: DynamicsService) {


  }



  persist(event) {
    let itemcollection: swotItemCollection[] = [];

    this.strengthArray.forEach(i => {
      itemcollection.push({ item: i, category: swotCategory.Strength });
    })

    this.weaknessArray.forEach(i => {
      itemcollection.push({ item: i, category: swotCategory.Weakness });
    })

    this.opportunityArray.forEach(i => {
      itemcollection.push({ item: i, category: swotCategory.Opportunity });
    })

    this.treathArray.forEach(i => {
      itemcollection.push({ item: i, category: swotCategory.Threats });
    })

    this.dynamicsService.writeSwotToDynamics(itemcollection);
  }


  ngOnInit() {

    this.dynamicsService.isFormInCreate().subscribe((notinCreate) => this.InCreate = !notinCreate);

    this.dynamicsService.readSwotFromDynamics()
      .subscribe(dynamicsData =>
        {


        dynamicsData.forEach(i => {
          switch (i.category) {
            case swotCategory.Strength:
              this.strengthArray.push(i.item);
              break;
            case swotCategory.Weakness:
              this.weaknessArray.push(i.item);
              break;
            case swotCategory.Opportunity:
              this.opportunityArray.push(i.item);
              break;
            case swotCategory.Threats:
              this.treathArray.push(i.item);
              break;
          }

        })
      });





  }

}
