import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Recipe, SpoonacularSearchResponse } from '../models/recipe.model';
import { MEAL_TYPES } from '../../constants/meal-types.constants';
import { MealsResponse } from '../models/mealPlanModel';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) { }

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
      vegan: response.vegan,
      readyInMinutes: response.readyInMinutes,
      title: response.title,
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
  getMealPlan(params: HttpParams,timeFrame: string): Observable<MealsResponse>
  {
    return this.http.get<MealsResponse>(
      'https://api.spoonacular.com/mealplanner/generate',
      { params }).pipe(
        map((response) => {
          return this.transformMealPlanResponse(response, timeFrame);
        })
      );
  }

/**
   * Get recipes from Spoonacular's complexSearch.
   * @param offset The offset for pagination
   * @param pageSize The number of items to fetch
   * @param extraParams A dictionary of optional search params (query, diet, etc.)
   */
getRecipes(
  offset: number,
  pageSize: number,
  extraParams: Record<string, string | number | boolean> = {}
): Observable<SpoonacularSearchResponse> {
  // Build base HttpParams
  let params = new HttpParams()
    .set('apiKey', environment.apiKey)
    .set('offset', offset)
    .set('number', pageSize)
    .set('addRecipeInformation', 'true'); 

  // Merge in optional search params
  // e.g. { query: 'pasta', diet: 'vegetarian', cuisine: 'italian', ... }
  for (const [key, value] of Object.entries(extraParams)) {
    if (value !== null && value !== undefined) {
      params = params.set(key, String(value));
    }
  }

  return this.http.get<SpoonacularSearchResponse>('https://api.spoonacular.com/recipes/complexSearch', { params });
}

  private mapRandomRecipes(response: any): Recipe[] {
    return response.recipes.map((recipe: any) => this.mapToRecipe(recipe));
  }
  getRecipesByCategory(category: MEAL_TYPES, offset: number, pageSize: number): Observable<SpoonacularSearchResponse> {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${environment.apiKey}&offset=${offset}&number=${pageSize}&type=${category}`;
    return this.http.get<SpoonacularSearchResponse>(url); 
  }
  private transformMealPlanResponse(apiResponse: any, timeFrame: string): MealsResponse {
    if (timeFrame === 'week') {
      const week = Object.entries(apiResponse.week).map(([dayKey, day]: [string, any]) => {
        return {
          day: dayKey,
          meals: day.meals || [],
          nutrients: day.nutrients || {},
        };
      });
      return {
        type: 'week',
        data: { week },
      };
    }
    return {
      type: 'day',
      data: {
        meals: apiResponse.meals || [],
        nutrients: apiResponse.nutrients || {},
      },
    };
  }

}



