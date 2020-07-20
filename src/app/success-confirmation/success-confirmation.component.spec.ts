import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessConfirmationComponent } from './success-confirmation.component';

describe('SuccessConfirmationComponent', () => {
  let component: SuccessConfirmationComponent;
  let fixture: ComponentFixture<SuccessConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
