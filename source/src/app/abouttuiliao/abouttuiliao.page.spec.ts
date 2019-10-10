import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbouttuiliaoPage } from './abouttuiliao.page';

describe('AbouttuiliaoPage', () => {
  let component: AbouttuiliaoPage;
  let fixture: ComponentFixture<AbouttuiliaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbouttuiliaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbouttuiliaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
