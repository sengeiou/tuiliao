import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoucangPage } from './shoucang.page';

describe('ShoucangPage', () => {
  let component: ShoucangPage;
  let fixture: ComponentFixture<ShoucangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoucangPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoucangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
