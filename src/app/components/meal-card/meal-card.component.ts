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
  @Input() time!: number;
  rating: number = 0;

  ngOnInit(): void {
    this.rating = Math.floor(Math.random() * 4) + 2; // Generate a random rating between 1 and 5
  }
}
