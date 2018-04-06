import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavFooterComponent } from './admin-nav-footer.component';

describe('AdminNavFooterComponent', () => {
  let component: AdminNavFooterComponent;
  let fixture: ComponentFixture<AdminNavFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNavFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
