import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCodesComponent } from './list-of-codes.component';

describe('ListOfCodesComponent', () => {
  let component: ListOfCodesComponent;
  let fixture: ComponentFixture<ListOfCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
