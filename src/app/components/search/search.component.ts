import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule , FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  // Tracks if the popup is open or closed
  private isOpenSignal = signal<boolean>(false);
  isOpen = () => this.isOpenSignal();

  // Form fields
  title = '';
  selectedCuisine = '';
  selectedDiet = '';

  // Cuisine List
  cuisines: string[] = [
    'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese',
    'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian',
    'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American',
    'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern',
    'Spanish', 'Thai', 'Vietnamese'
  ];

  // Diet List
  diets: string[] = [
    'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian',
    'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal',
    'Low FODMAP', 'Whole30'
  ];

  constructor(private router: Router) {}

  togglePopup() {
    this.isOpenSignal.update(open => !open);
  }

  onSearch(): void {
    // Close popup
    this.isOpenSignal.set(false);

    // Build query params from user input
    const queryParams: any = {};
    if (this.title) {
      queryParams.title = this.title;
    }
    if (this.selectedCuisine) {
      // The Spoonacular param is "cuisine"
      // We'll pass it as "cuisine" in the query
      queryParams.cuisine = this.selectedCuisine;
    }
    if (this.selectedDiet) {
      // The Spoonacular param is "diet"
      queryParams.diet = this.selectedDiet;
    }

    // Navigate to /search with query params
    this.router.navigate(['/search'], { queryParams, replaceUrl: true });
  }

}
