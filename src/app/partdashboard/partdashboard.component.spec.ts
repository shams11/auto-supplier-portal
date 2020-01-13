import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartDashboardComponent } from './partDashboard.component';

describe('PartDashboardComponent', () => {
  let component: PartDashboardComponent;
  let fixture: ComponentFixture<PartDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
