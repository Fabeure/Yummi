import { Component, Input
 } from '@angular/core';

@Component({
  selector: 'app-meal-plan-card',
  imports: [],
  templateUrl: './meal-plan-card.component.html',
  styleUrl: './meal-plan-card.component.css'
})
export class MealPlanCardComponent {
  @Input() title!: string;
  @Input() recipes!: string;
  @Input() image!: string;

}
