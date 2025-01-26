import { Component, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe.service.service';
import { Recipe } from '../../models/recipe.model';
import { RANDOM } from '../../../config/routes.config';

@Component({
  selector: 'app-recipe-suggestions',
  imports: [],
  templateUrl: './recipe-suggestions.component.html',
  styleUrl: './recipe-suggestions.component.css',
})
export class RecipeSuggestionsComponent {
  recipeService = inject(RecipeService);
  recipes: Recipe[] | null = [];
  constructor() {
    
    this.recipeService.getRandomRecipe(RANDOM).subscribe((data) => {
      this.recipes = data;
    });
  }
}
