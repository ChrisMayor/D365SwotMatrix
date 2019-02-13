import { Component, OnInit,Input  } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { swotCategory } from '../model/swotCategory';
import { swotItem } from '../model/swotItem';

@Component({
  selector: 'app-matrix-tile',
  templateUrl: './matrix-tile.component.html',
  styleUrls: ['./matrix-tile.component.scss']
})
export class MatrixTileComponent implements OnInit {

  @Input() name: string;

  chance : swotItem[] = [
    {text:'Next version', isEditing:false},
    {text:'Connections to customer', isEditing:false}
  ];

  constructor() { }

  ngOnInit() {
  }

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
}

}
