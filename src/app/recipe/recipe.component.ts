import { Component } from '@angular/core';
import { RecipeHeaderComponent } from "./recipe-header/recipe-header.component";
import { RecipeContentComponent } from "./recipe-content/recipe-content.component";
import { RecipeFooterComponent } from "./recipe-footer/recipe-footer.component";
import { RecipeCommentsComponent } from "./recipe-comments/recipe-comments.component";
import { RecipeSuggestionsComponent } from "./recipe-suggestions/recipe-suggestions.component";

@Component({
  selector: 'app-recipe',
  imports: [ RecipeContentComponent, RecipeFooterComponent, RecipeCommentsComponent, RecipeSuggestionsComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {

}
