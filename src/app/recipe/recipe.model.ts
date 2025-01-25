export interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
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
