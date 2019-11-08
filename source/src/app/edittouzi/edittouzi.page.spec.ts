import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittouziPage } from './edittouzi.page';

describe('EdittouziPage', () => {
  let component: EdittouziPage;
  let fixture: ComponentFixture<EdittouziPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittouziPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittouziPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
