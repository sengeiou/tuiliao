import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuanzhudetailPage } from './guanzhudetail.page';

describe('GuanzhudetailPage', () => {
  let component: GuanzhudetailPage;
  let fixture: ComponentFixture<GuanzhudetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuanzhudetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuanzhudetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
