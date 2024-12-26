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
    { name: 'Pizza', image: 'categories/pizza.jpg' },
    { name: 'Pasta', image: 'categories/pasta.jpg' },
    { name: 'Smoothie', image: 'categories/smoothie.webp' },
    { name: 'Vegan', image: 'categories/vegan.jpg' },
    { name: 'Dessert', image: 'categories/dessert.jpg' },
    { name: 'Pizza', image: 'categories/pizza.jpg' },
    { name: 'Pasta', image: 'categories/pasta.jpg' },
    { name: 'Smoothie', image: 'categories/smoothie.webp' },
    { name: 'Vegan', image: 'categories/vegan.jpg' },
    { name: 'Dessert', image: 'categories/dessert.jpg' },
    { name: 'Pizza', image: 'categories/pizza.jpg' },
    { name: 'Pasta', image: 'categories/pasta.jpg' },
    { name: 'Smoothie', image: 'categories/smoothie.webp' },
    { name: 'Vegan', image: 'categories/vegan.jpg' },
    { name: 'Dessert', image: 'categories/dessert.jpg' }


  ];

}
