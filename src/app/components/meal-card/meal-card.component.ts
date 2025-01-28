import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../config/routes.config';

@Component({
  selector: 'app-meal-card',
  imports: [CommonModule,RouterModule],
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.css',
  standalone: true
})
export class MealCardComponent {
  @Input() id!: number;
  @Input() title!: string;
  @Input() username!: string;
  @Input() image!: string;
  @Input() time!: number;
  rating: number = 0;

  @Input() vegan: boolean = false;

  routes=APP_ROUTES;
  ngOnInit(): void {
    this.rating = Math.floor(Math.random() * 4) + 2; // Generate a random rating between 1 and 5
  }
}
