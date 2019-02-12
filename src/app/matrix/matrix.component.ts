import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { swotCategory } from '../model/swotCategory';
import { swotItem } from '../model/swotItem';


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

export class MatrixComponent {
  strength : swotItem[] = [
    {text:'Market share', isEditing:false},
    {text:'People', isEditing:false},
    {text:'Technology', isEditing:false}
  ];

  weakness : swotItem[] = [
    {text:'Gaps in functionality', isEditing:false},
    {text:'Understanding of customer processes', isEditing:false}
  ];

  chance : swotItem[] = [
    {text:'Next version', isEditing:false},
    {text:'Connections to customer', isEditing:false}
  ];


  risk : swotItem[] = [
    {text:'Competitors', isEditing:false},
    {text:'Price too high', isEditing:false}
  ];

 
  remove(item:swotItem,list: swotItem[])
  {
    let index = list.findIndex(x => x.text == item.text);
    list.splice(index,1);
  }

   
  edit(item:swotItem,list: swotItem[])
  {
    item.isEditing = true;
  }

  unedit(item:swotItem,list: swotItem[])
  {
    item.isEditing = false;
  }

  add(list: swotItem[])
  {
    list.push({ text : "new", isEditing:false});
  }

  drop(event: CdkDragDrop<swotItem[]>) {

      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
}}
