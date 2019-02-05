import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToMatrixComponent } from './add-to-matrix.component';

describe('AddToMatrixComponent', () => {
  let component: AddToMatrixComponent;
  let fixture: ComponentFixture<AddToMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
