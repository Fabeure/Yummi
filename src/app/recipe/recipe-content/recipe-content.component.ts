import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const APIKEY = 'b4483ec767c94699b208330d5c074dd8';
@Component({
  selector: 'app-recipe-content',
  imports: [],
  templateUrl: './recipe-content.component.html',
  styleUrl: './recipe-content.component.css',
})
export class RecipeContentComponent {
  recipe: Recipe | null = null;
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  ngOnInit() {
    //const id = this.route.snapshot.paramMap.get('id');
    const id = 324694	;
    const URL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${APIKEY}`;
    this.http.get<Recipe>(URL).subscribe({
      next: (response) => {
        console.log(response);
        this.recipe = this.maptoRecipe(response);
        console.log(this.maptoRecipe(response));
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('data transfer complete');
      },
    });
  }
  maptoRecipe(response: any): Recipe {
    return {
      id: response.id,
      name: response.title,
      image: response.image,
      description: response.summary,
      prepTime: response.preparationMinutes,
      cookTime: response.cookingMinutes,
      servings: response.servings,
      ingredients: response.extendedIngredients.map((i: any) => i.original),
      instructions: response.analyzedInstructions[0]?.steps.map(
        (s: any) => s.step
      ),
      nutritionFacts: {
        calories: response.nutrition.nutrients.find(
          (n: any) => n.name === 'Calories'
        )?.amount,
        fat: response.nutrition.nutrients.find((n: any) => n.name === 'Fat')
          ?.amount,
        saturatedFat: response.nutrition.nutrients.find(
          (n: any) => n.name === 'Saturated Fat'
        )?.amount,
        carbohydrates: response.nutrition.nutrients.find(
          (n: any) => n.name === 'Carbohydrates'
        )?.amount,
        sugar: response.nutrition.nutrients.find((n: any) => n.name === 'Sugar')
          ?.amount,
        cholesterol: response.nutrition.nutrients.find(
          (n: any) => n.name === 'Cholesterol'
        )?.amount,
        protein: response.nutrition.nutrients.find(
          (n: any) => n.name === 'Protein'
        )?.amount,
      },
    };
  }/*
  constructor() {
    this.recipe = {
      id: 324694,
      name: 'Silver Dollar Buttermilk-Pecan Pancakes with Bourbon Molasses Butter and Maple Syrup',
      image: 'https://img.spoonacular.com/recipes/324694-556x370.jpeg',
      description:
        'Silver Dollar Buttermilk-Pecan Pancakes with Bourbon Molasses Butter and Maple Syrup is a breakfast that serves 6. One portion of this dish contains approximately <b>8g of protein</b>, <b>47g of fat</b>, and a total of <b>762 calories</b>. For <b>$2.76 per serving</b>, this recipe <b>covers 15%</b> of your daily requirements of vitamins and minerals. From preparation to the plate, this recipe takes roughly <b>55 minutes</b>. A mixture of baking powder, flour, plus 3 tablespoons buttermilk, and a handful of other ingredients are all it takes to make this recipe so yummy. This recipe from Foodnetwork has 1 fans. It is a good option if you\'re following a <b>lacto ovo vegetarian</b> diet. Overall, this recipe earns a <b>not so amazing spoonacular score of 37%</b>. Similar recipes include <a href="https://spoonacular.com/recipes/ham-with-bourbon-molasses-and-pecan-glaze-646216">Ham With Bourbon, Molasses, and Pecan Glaze</a>, <a href="https://spoonacular.com/recipes/roasted-butternut-squash-pecan-bacon-mix-green-baby-spinach-salad-with-maple-syrup-vinaigrette-658529">Roasted Butternut Squash, Pecan, Bacon, Mix Green & Baby Spinach Salad With Maple Syrup Vinaigrette</a>, and <a href="https://spoonacular.com/recipes/tostone-stuffed-pancakes-with-a-chocolate-peanut-butter-syrup-663732">Tostone Stuffed Pancakes with a Chocolate Peanut Butter Syrup</a>.',
      prepTime: 20,
      cookTime: 35,
      servings: 6,
      ingredients: [
        '1 teaspoon baking powder',
        '1/2 teaspoon baking soda',
        '1/2 cup good quality bourbon, or more to taste',
        '1 1/2 cups, plus 3 tablespoons buttermilk',
        "Confectioners' sugar, for garnish",
        '2 large eggs',
        '1 1/2 cups all-purpose flour',
        '2 tablespoons granulated sugar',
        'Kosher salt, to taste',
        '1 tablespoon light brown sugar',
        'Pure maple syrup, warmed',
        '3 tablespoons molasses',
        '1/2 cup finely chopped toasted pecans',
        'Coarsely chopped toasted pecans, for garnish, optional',
        '3/4 teaspoon fine sea salt',
        '1 tablespoon sugar',
        '1 cup (2 sticks) unsalted butter, slightly softened',
        '3 tablespoons unsalted butter, melted and cooled, plus more for griddle',
        '1/2 vanilla bean, split lengthwise and seeds scraped',
        '1 teaspoon pure vanilla extract',
      ],
      instructions: [
        'Preheat the oven to 200 degrees F.',
        'Whisk together the flour, pecans, granulated sugar, light brown sugar, baking powder, baking soda, and salt in a medium bowl.',
        'Whisk together the eggs, buttermilk, butter and vanilla extract and vanilla bean in a small bowl.',
        'Add the egg mixture to the dry mixture and gently mix to combine. Do not overmix.',
        'Let the batter sit at room temperature for at least 15 minutes and up to 30 minutes before using.',
        'Heat a cast iron or nonstick griddle pan over medium heat and brush with melted butter. Once the butter begins to sizzle, use 2 tablespoons of the batter for each pancake and cook until the bubbles appear on the surface and the bottom is golden brown, about 2 minutes, flip over and cook until the bottom is golden brown, 1 to 2 minutes longer.',
        'Transfer the pancakes to a platter and keep warm in a 200 degree F oven.',
        'Serve 6 pancakes per person, top each with some of the bourbon butter.',
        "Drizzle with warm maple syrup and dust with confectioners' sugar.",
        'Garnish with fresh mint sprigs and more toasted pecans, if desired.',
      ],
      nutritionFacts: {
        calories: 754.43,
        fat: 46.99,
        saturatedFat: 25.31,
        carbohydrates: 65.45,
        sugar: 38.76,
        cholesterol: 164.99,
        protein: 8.49,
      },
    };
  }*/
}

interface Recipe {
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
