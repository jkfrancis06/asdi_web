import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerFarmComponent } from './manager-farm.component';
import {beforeEach, describe, it} from "selenium-webdriver/testing";

describe('ManagerFarmComponent', () => {
  let component: ManagerFarmComponent;
  let fixture: ComponentFixture<ManagerFarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerFarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
