import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YigouPage } from './yigou.page';

describe('YigouPage', () => {
  let component: YigouPage;
  let fixture: ComponentFixture<YigouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YigouPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YigouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
