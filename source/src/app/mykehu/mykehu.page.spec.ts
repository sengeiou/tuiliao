import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MykehuPage } from './mykehu.page';

describe('MykehuPage', () => {
  let component: MykehuPage;
  let fixture: ComponentFixture<MykehuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MykehuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MykehuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
