import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChongzhisuccessPage } from './chongzhisuccess.page';

describe('ChongzhisuccessPage', () => {
  let component: ChongzhisuccessPage;
  let fixture: ComponentFixture<ChongzhisuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChongzhisuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChongzhisuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
