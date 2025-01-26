import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecipeService } from '../services/recipe.service.service';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolver implements Resolve<Recipe | null> {
  constructor(private recipeService: RecipeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe | null> {
    const id = route.params['id'];
    if (id) {
      return this.recipeService.getRecipe(+id);
    } else {
      return of(null);
    }
  }
}