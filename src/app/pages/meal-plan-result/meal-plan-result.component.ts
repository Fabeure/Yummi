import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealPlanCardComponent } from '../../components/meal-plan-card/meal-plan-card.component';
import { MealsResponse } from '../../models/mealPlanModel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-plan-result',
  imports: [MealPlanCardComponent,CommonModule],
  templateUrl: './meal-plan-result.component.html',
  styleUrl: './meal-plan-result.component.css',
  standalone: true,
})
export class MealPlanResultComponent {
  constructor(private route: ActivatedRoute,private router: Router) { }
  meals!:MealsResponse;
  type!:string;
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.meals = data['mealPlan'];
    });
  }
  onClick (id: number)
  {
    this.router.navigate(['/recipe', id]);
  }
  get totalNutrients() {
    if (this.meals.type === 'week') {
      return this.meals.data.week.reduce(
        (totals, day) => {
          return {
            calories: totals.calories + day.nutrients.calories,
            protein: totals.protein + day.nutrients.protein,
            fat: totals.fat + day.nutrients.fat,
            carbohydrates: totals.carbohydrates + day.nutrients.carbohydrates
          };
        },
        { calories: 0, protein: 0, fat: 0, carbohydrates: 0 }
      );
    } else if (this.meals.type === 'day') {
      return this.meals.data.nutrients;
    }
    return { calories: 0, protein: 0, fat: 0, carbohydrates: 0 };
  }
}
