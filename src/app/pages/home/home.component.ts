import { Component, signal } from '@angular/core';
import { MealPlanCardComponent } from '../../components/meal-plan-card/meal-plan-card.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { SliderImages } from '../../components/slider/slider.component';
import { CategoryComponent } from '../../components/category/category.component';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { DIET_IMAGES } from '../../../constants/diet.const';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeGridComponent } from '../../components/recipe-grid/RecipeGrid.component';
import { environment } from '../../../environments/environment';
import { APP_ROUTES } from '../../../config/routes.config';
import { DIETS } from '../../../constants/diet.const';

@Component({
  selector: 'app-home',
  imports: [MealPlanCardComponent, SliderComponent, CategoryComponent,LazyLoadDirective,RouterModule , RecipeGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent {
  private readonly apiKey = environment.apiKey;
  routes=APP_ROUTES;
  MealPlans = signal<{ title: string; recipes: string; image: string;diet:string  }[]>([]);
  Meals= signal<Recipe[]>([]);
  
  constructor(private http: HttpClient, private router: Router,private recipesService: RecipeService) {}
  
  lazyLoadRandomRecipes(num: number): void {
    this.recipesService.getRandomRecipesWithCookTime(num).subscribe(response => {
      this.Meals.set(response);
    });
  }
  async lazyLoadMealPlans() {
    //const diets = Object.keys(DIET_IMAGES);
    const diets=DIETS.map(diet => diet.key);
    const randomDiets = this.getRandomDiets(diets, 6); //6 random diets
    const newMealPlans: any[] = [];

    for (const dietKey of randomDiets) {
      try {
        // const response: any = await this.http
        //   .get('https://api.spoonacular.com/mealplanner/generate', {
        //     params: {
        //       apiKey: this.apiKey,
        //       diet,
        //       timeFrame: 'week',
        //     },
        //   });
        //   console.log(response);
        const diet = DIETS.find(d => d.key === dietKey);
        if (diet) {
          // newMealPlans.push({
          //   name: diet.name,
          //   icon: diet.icon,
          //   image: diet.image,
          // });
        newMealPlans.push({
          title: `${diet.name} Diet Plan`,
          recipes: `21 recipes`,
          image: diet.image,
          diet: diet.name,
        });}
      } catch (error) {
        console.error(`Error loading meal plan for diet: ${dietKey}`, error);
      }
    }

    this.MealPlans.set(newMealPlans); // Update the signal
  }
  getRandomDiets(diets: string[], count: number): string[] {
    const shuffled = diets.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  viewAllMealPlans() {
    this.router.navigate(['/mealplans']); // Redirect to the "View All" page
  }
  
  images: SliderImages[] = [
    {
      imageSrc: '/slider/macron.jpg',
      title: 'French Macarons',
      link: this.routes.test,
    },
    {
      imageSrc: '/slider/cookies.jpg',
      title: 'Chocolate Chip Cookies',
      link: this.routes.test,
    }, 
    {
      imageSrc: '/slider/healthy_salad.jpg',
      title: 'Healthy Salad',
      link: this.routes.test,
    },
    {
      imageSrc: '/slider/healthy.jpg',
      title: 'Healthy Bowl',
      link: this.routes.test,
    },
    {
      imageSrc: '/slider/dessert.jpg',
      title: 'Appetizer Board',
      link: this.routes.test,
    },
  ];
  categories = [
    { name: 'Main Course', image: 'categories/pasta.jpg' },
    { name: 'Side Dish', image: 'categories/side-dish.jpg' },
    { name: 'Dessert', image: 'categories/dessert.jpg' },
    { name: 'Appetizer', image: 'categories/Appetizer.jpg' },
    { name: 'Salad', image: 'categories/vegan.jpg' },
    { name: 'Bread', image: 'categories/bread.webp' },
    { name: 'Breakfast', image: 'categories/breakfast.jpg' },
    { name: 'Soup', image: 'categories/soup.jpg' },
    { name: 'Beverage', image: 'categories/beverage.jpg' },
    { name: 'Sauce', image: 'categories/sauce.avif' },
    { name: 'Marinade', image: 'categories/marinade.jpg' },
    { name: 'Finger Food', image: 'categories/finger-food.jpeg' },
    { name: 'Snack', image: 'categories/snack.jpg' },
    { name: 'Drink', image: 'categories/smoothie.webp' }
  ];
  visibleCategories = this.categories.slice(0, 5);
  rotateCategories() {
    // Remove the first category and add it to the end
    const firstCategory = this.categories.shift();
    if (firstCategory) {
      this.categories.push(firstCategory);
    }

    // Update the visible categories
    this.visibleCategories = this.categories.slice(0, 5);
  }
}
