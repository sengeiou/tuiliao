import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FankuiPage } from './fankui.page';

describe('FankuiPage', () => {
  let component: FankuiPage;
  let fixture: ComponentFixture<FankuiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FankuiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FankuiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
