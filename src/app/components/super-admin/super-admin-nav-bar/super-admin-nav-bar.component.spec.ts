import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminNavBarComponent } from './super-admin-nav-bar.component';

describe('SuperAdminNavBarComponent', () => {
  let component: SuperAdminNavBarComponent;
  let fixture: ComponentFixture<SuperAdminNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
