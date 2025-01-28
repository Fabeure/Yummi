import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) { }
  @Input() category!: Category;
  onClick(name: string) {
    this.router.navigate(['/search'], { queryParams: { type: name } });
  }
}
