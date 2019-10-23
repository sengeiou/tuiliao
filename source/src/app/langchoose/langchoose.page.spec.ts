import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangchoosePage } from './langchoose.page';

describe('LangchoosePage', () => {
  let component: LangchoosePage;
  let fixture: ComponentFixture<LangchoosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangchoosePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangchoosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
