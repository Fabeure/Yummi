import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecipeService } from '../services/recipe.service';
import { Recipe, SpoonacularSearchResponse } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryRecipeResolver implements Resolve<SpoonacularSearchResponse | null> {
  constructor(private recipeService: RecipeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<SpoonacularSearchResponse | null> {
    const category = route.params['category'];
    if (category) {
      return this.recipeService.getRecipesByCategory(category, 10,0);
    } else {
      return of(null);
    }
  }
}