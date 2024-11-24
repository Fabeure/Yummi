import { Component, signal } from '@angular/core';
import { MealPlanCardComponent } from "../../components/meal-plan-card/meal-plan-card.component";

@Component({
  selector: 'app-home',
  imports: [ MealPlanCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent {
  MealPlans = signal([
    {
      title: 'How can i manage my weight with balanced meals',
      recipes: '156 recipes',
      image: 'mealplans1.jpg',
    },
    {
      title: 'Nutrient Ninja: Sneaking Superfoods into Every Bite',
      recipes: '156 recipes',
      image: 'mealplans2.jpg',
    },
    {
      title: 'Prep Like a Pro: Saving Time, One Meal at a Time',
      recipes: '156 recipes',
      image: 'mealplans3.jpg',
    },
    {
      title: "Budget Bites: Delicious Meals that Won't Break the Bank",
      recipes: '156 recipes',
      image: 'mealplans4.jpg',
    },
    {
      title: 'Protein Power-Up: Fueling Gainswith Flavor',
      recipes: '156 recipes',
      image: 'mealplans5.jpg',
    },
    {
      title: 'Family Feast Frenzy: Meals to Keep Everyone Smiling',
      recipes: '156 recipes',
      image: 'mealplans6.png',
    },
  ]);
}
