import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalPage } from './universal.page';

describe('UniversalPage', () => {
  let component: UniversalPage;
  let fixture: ComponentFixture<UniversalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
