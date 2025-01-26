export interface Recipe {
  id: number;
  name: string;
  title: string;
  image: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  vegan: boolean;
  readyInMinutes: number;
  ingredients: string[];
  instructions: string[];
  nutritionFacts: {
    calories: number;
    fat: number;
    saturatedFat: number;
    carbohydrates: number;
    sugar: number;
    cholesterol: number;
    protein: number;
  };
}

export interface SpoonacularSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}
