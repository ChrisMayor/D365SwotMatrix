import { Component, OnInit,Input,Output, EventEmitter   } from '@angular/core';
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
  @Input() itemList: swotItem[];
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

 
  constructor() { }

  ngOnInit() {
  }

  remove(item:swotItem,list: swotItem[])
  {
    let index = list.findIndex(x => x.text == item.text);
    list.splice(index,1);
    this.change.emit(item.text);
  }

   
  edit(item:swotItem,list: swotItem[])
  {
    item.isEditing = true;
  }

  unedit(item:swotItem,list: swotItem[])
  {
    item.isEditing = false;
    this.change.emit(item.text);
  }

  add(list: swotItem[])
  {
    list.push({ text : "new", isEditing:false});
    this.change.emit("new");
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
