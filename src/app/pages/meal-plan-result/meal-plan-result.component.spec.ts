import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanResultComponent } from './meal-plan-result.component';

describe('MealPlanResultComponent', () => {
  let component: MealPlanResultComponent;
  let fixture: ComponentFixture<MealPlanResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlanResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealPlanResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
