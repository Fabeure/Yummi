import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meal-card',
  imports: [],
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.css'
})
export class MealCardComponent {
  @Input() title!: string;
  @Input() username!: string;
  @Input() image!: string;
  @Input() userImage!: string;
  @Input() date!: string;
  @Input() comments!: string;
}
