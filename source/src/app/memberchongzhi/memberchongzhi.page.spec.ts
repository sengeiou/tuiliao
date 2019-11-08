import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberchongzhiPage } from './memberchongzhi.page';

describe('MemberchongzhiPage', () => {
  let component: MemberchongzhiPage;
  let fixture: ComponentFixture<MemberchongzhiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberchongzhiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberchongzhiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
