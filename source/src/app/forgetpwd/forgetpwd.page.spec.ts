import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpwdPage } from './forgetpwd.page';

describe('ForgetpwdPage', () => {
  let component: ForgetpwdPage;
  let fixture: ComponentFixture<ForgetpwdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetpwdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetpwdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
