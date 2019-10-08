import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuanzhuPage } from './guanzhu.page';

describe('GuanzhuPage', () => {
  let component: GuanzhuPage;
  let fixture: ComponentFixture<GuanzhuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuanzhuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuanzhuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
