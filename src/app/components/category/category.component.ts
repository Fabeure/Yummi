import { Component, Input } from '@angular/core';
export interface Category {
  name: string;
  image: string;
}
@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  standalone: true
})
export class CategoryComponent {
  // categories = [
  //   { name: 'Pizza', image: 'categories/pizza.jpg' },
  //   { name: 'Pasta', image: 'categories/pasta.jpg' },
  //   { name: 'Smoothie', image: 'categories/smoothie.webp' },
  //   { name: 'Vegan', image: 'categories/vegan.jpg' },
  //   { name: 'Dessert', image: 'categories/dessert.jpg' }
  // ];
  @Input() category!: Category;
}
