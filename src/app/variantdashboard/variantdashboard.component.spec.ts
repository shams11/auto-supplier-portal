import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantDashboardComponent } from './variantdashboard.component';

describe('VariantdashboardComponent', () => {
  let component: VariantDashboardComponent;
  let fixture: ComponentFixture<VariantDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
