import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreememberPage } from './agreemember.page';

describe('AgreememberPage', () => {
  let component: AgreememberPage;
  let fixture: ComponentFixture<AgreememberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreememberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreememberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
