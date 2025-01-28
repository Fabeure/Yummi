import { Component } from '@angular/core';
import { CategoryComponent } from '../../components/category/category.component';
@Component({
  selector: 'app-categories',
  imports: [CategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  standalone: true,
})
export class CategoriesComponent {
  categories = [
    { name: 'Main Course', image: 'categories/pasta.jpg' },
    { name: 'Side Dish', image: 'categories/side-dish.jpg' },
    { name: 'Dessert', image: 'categories/dessert.jpg' },
    { name: 'Appetizer', image: 'categories/Appetizer.jpg' },
    { name: 'Salad', image: 'categories/vegan.jpg' },
    { name: 'Bread', image: 'categories/bread.webp' },
    { name: 'Breakfast', image: 'categories/breakfast.jpg' },
    { name: 'Soup', image: 'categories/soup.jpg' },
    { name: 'Beverage', image: 'categories/beverage.jpg' },
    { name: 'Sauce', image: 'categories/sauce.avif' },
    { name: 'Marinade', image: 'categories/marinade.jpg' },
    { name: 'Finger Food', image: 'categories/finger-food.jpeg' },
    { name: 'Snack', image: 'categories/snack.jpg' },
    { name: 'Drink', image: 'categories/smoothie.webp' }
  ];
  onClick(name: string)
  {
     
  }
}
