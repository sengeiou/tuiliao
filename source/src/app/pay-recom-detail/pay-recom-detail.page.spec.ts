import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRecomDetailPage } from './pay-recom-detail.page';

describe('PayRecomDetailPage', () => {
  let component: PayRecomDetailPage;
  let fixture: ComponentFixture<PayRecomDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayRecomDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayRecomDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
