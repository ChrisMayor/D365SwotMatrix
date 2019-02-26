import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatCard } from '@angular/material';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule,MatGridListModule,MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatrixComponent } from './matrix/matrix.component';
import { MatNativeDateModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatrixTileComponent } from './matrix-tile/matrix-tile.component';
import { MatIconModule } from "@angular/material/icon";
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [
    AppComponent,
    MatrixComponent,
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
    DragDropModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [
    {provide: 'MyDynamicsService', useClass: environment.dynamicsServiceType} /* => Dynamic injection depending on the environment. */
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent
  ],
})
export class AppModule { }
