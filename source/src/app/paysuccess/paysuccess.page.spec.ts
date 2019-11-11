import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysuccessPage } from './paysuccess.page';

describe('PaysuccessPage', () => {
  let component: PaysuccessPage;
  let fixture: ComponentFixture<PaysuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaysuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaysuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
