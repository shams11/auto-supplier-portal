import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDataFormComponent } from './production-data-form.component';

describe('ProductionDataFormComponent', () => {
  let component: ProductionDataFormComponent;
  let fixture: ComponentFixture<ProductionDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
