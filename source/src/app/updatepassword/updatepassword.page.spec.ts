import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepasswordPage } from './updatepassword.page';

describe('UpdatepasswordPage', () => {
  let component: UpdatepasswordPage;
  let fixture: ComponentFixture<UpdatepasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
