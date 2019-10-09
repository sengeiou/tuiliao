import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChongzhiPage } from './chongzhi.page';

describe('ChongzhiPage', () => {
  let component: ChongzhiPage;
  let fixture: ComponentFixture<ChongzhiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChongzhiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChongzhiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
