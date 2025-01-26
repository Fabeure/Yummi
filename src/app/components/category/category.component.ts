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

  @Input() category!: Category;
}
