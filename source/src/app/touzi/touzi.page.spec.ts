import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouziPage } from './touzi.page';

describe('TouziPage', () => {
  let component: TouziPage;
  let fixture: ComponentFixture<TouziPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouziPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouziPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
