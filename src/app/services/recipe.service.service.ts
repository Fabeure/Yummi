import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipe(id: number): Observable<Recipe> {
    const URL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${environment.apiKey}`;
    return this.http.get<any>(URL).pipe(
      map(response => this.mapToRecipe(response))
    );
  }
  getRandomRecipesWithCookTime(num: number): Observable<Recipe[]> {
    const URL = `https://api.spoonacular.com/recipes/random?number=${num}&apiKey=${environment.apiKey}`;
    return this.http.get<any>(URL).pipe(
      map(response => this.mapRandomRecipes(response)),
      map(recipes => {
        return recipes.map(recipe => {
          if (recipe.cookTime === null) {
            recipe.cookTime = 30; 
          }
          return recipe;
        });
      })
    );
  }
  getRandomRecipe(num: number): Observable<Recipe[]> {
    const URL = `https://api.spoonacular.com/recipes/random?number=${num}&apiKey=${environment.apiKey}`;
    return this.http.get<any>(URL).pipe(
      map(response => this.mapRandomRecipes(response))
    );
  }

  private mapToRecipe(response: any): Recipe {
    return {
      id: response.id,
      name: response.title,
      image: response.image,
      description: response.summary,
      prepTime: response.preparationMinutes,
      cookTime: response.cookingMinutes,
      servings: response.servings,
      ingredients: response.extendedIngredients.map((i: any) => i.original),
      instructions: response.analyzedInstructions[0]?.steps.map((s: any) => s.step) || [],
      nutritionFacts: {
        calories: response.nutrition?.nutrients.find((n: any) => n.name === 'Calories')?.amount || 0,
        fat: response.nutrition?.nutrients.find((n: any) => n.name === 'Fat')?.amount || 0,
        saturatedFat: response.nutrition?.nutrients.find((n: any) => n.name === 'Saturated Fat')?.amount || 0,
        carbohydrates: response.nutrition?.nutrients.find((n: any) => n.name === 'Carbohydrates')?.amount || 0,
        sugar: response.nutrition?.nutrients.find((n: any) => n.name === 'Sugar')?.amount || 0,
        cholesterol: response.nutrition?.nutrients.find((n: any) => n.name === 'Cholesterol')?.amount || 0,
        protein: response.nutrition?.nutrients.find((n: any) => n.name === 'Protein')?.amount || 0,
      },
    };
  }

  private mapRandomRecipes(response: any): Recipe[] {
    return response.recipes.map((recipe: any) => this.mapToRecipe(recipe));
  }
}