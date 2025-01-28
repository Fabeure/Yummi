import { Component, Input
 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../config/routes.config';
@Component({
  selector: 'app-meal-plan-card',
  imports: [RouterModule],
  templateUrl: './meal-plan-card.component.html',
  styleUrl: './meal-plan-card.component.css',
  standalone: true
})
export class MealPlanCardComponent {
  @Input() title!: string;
  @Input() recipes!: string;
  @Input() image!: string;
  @Input() diet!: string;
  routes=APP_ROUTES;
}
