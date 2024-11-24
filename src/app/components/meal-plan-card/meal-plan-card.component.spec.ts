import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanCardComponent } from './meal-plan-card.component';

describe('MealPlanCardComponent', () => {
  let component: MealPlanCardComponent;
  let fixture: ComponentFixture<MealPlanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlanCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealPlanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
