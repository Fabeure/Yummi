import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';

@Component({
  selector: 'app-meal-plan',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './meal-plan.component.html',
  styleUrl: './meal-plan.component.css',
  standalone: true,
})
export class MealPlanComponent {
  constructor(private router: Router, private authService: AuthService) { }
  diets = [
    { name: 'Whole30', icon: 'icon/meal.png' },
    { name: 'Low FODMAP', icon: 'icon/diet1.png' },
    { name: 'Primal', icon: 'icon/diet.png' },
    { name: 'Paleo', icon: 'icon/paleo-diet.png' },
    { name: 'Pescetarian', icon: 'icon/nutrition-plan.png' },
    { name: 'Vegan', icon: 'icon/diet-food.png' },
    { name: 'Ovo-Vegetarian', icon: 'icon/healthy-food.png' },
    { name: 'Lacto-Vegetarian', icon: 'icon/salad.png' },
    { name: 'Vegetarian', icon: 'icon/salad.png' },
    { name: 'Ketogenic', icon: 'icon/keto.png' },
    { name: 'Gluten Free', icon: 'icon/gluten-free.png' },
  ];

  form = new FormGroup({
    diet: new FormControl(null),
    timeFrame: new FormControl('', Validators.required),
    targetCalories: new FormControl(null),
    exclude: new FormControl(null),
  });
  ngOnInit() {
    this.authService.user$.subscribe({
      next: (user) => console.log('User:', user),
      error: (err) => console.error('Error in user observable:', err),
    });
  }
  selectDiet(diet: any) {
    this.form.get('diet')?.setValue(diet.name);
  }
  submitForm() {
      this.router.navigate(['/result'],{ queryParams: this.form.value } );
}
}