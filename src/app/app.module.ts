import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule,MatGridListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatrixComponent } from './matrix/matrix.component';
import { AddToMatrixComponent } from './add-to-matrix/add-to-matrix.component';
import {MatNativeDateModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatrixTileComponent } from './matrix-tile/matrix-tile.component';


@NgModule({
  declarations: [
    AppComponent,
    MatrixComponent,
    AddToMatrixComponent,
    MatrixTileComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent
  ],
})
export class AppModule { }
