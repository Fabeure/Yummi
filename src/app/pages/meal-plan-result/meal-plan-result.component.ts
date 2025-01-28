import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealPlanCardComponent } from '../../components/meal-plan-card/meal-plan-card.component';
import { MealsResponse } from '../../models/mealPlanModel';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authentication.service';
import { MealCardComponent } from "../../components/meal-card/meal-card.component";

@Component({
  selector: 'app-meal-plan-result',
  imports: [MealPlanCardComponent, CommonModule, MealCardComponent],
  templateUrl: './meal-plan-result.component.html',
  styleUrl: './meal-plan-result.component.css',
  standalone: true,
})
export class MealPlanResultComponent {
  constructor(private route: ActivatedRoute) { }
  meals!:MealsResponse;
  type!:string;
  ngOnInit() {
    this.meals = this.route.snapshot.data['mealPlan'];
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
