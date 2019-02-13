import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixTileComponent } from './matrix-tile.component';

describe('MatrixTileComponent', () => {
  let component: MatrixTileComponent;
  let fixture: ComponentFixture<MatrixTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
