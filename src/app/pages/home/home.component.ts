import { Component, signal } from '@angular/core';
import { MealPlanCardComponent } from '../../components/meal-plan-card/meal-plan-card.component';
import { MealCardComponent } from "../../components/meal-card/meal-card.component";
import { SliderComponent } from '../../components/slider/slider.component';
import { SliderImages } from '../../components/slider/slider.component';
import { CategoryComponent } from '../../components/category/category.component';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';
import { HttpClient, provideHttpClient} from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { DIET_IMAGES } from './diet.const';
import { RecipeService } from '../../services/recipe.service.service';
import { Recipe } from '../../models/recipe.model';
//import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [MealPlanCardComponent, MealCardComponent, SliderComponent, CategoryComponent,LazyLoadDirective,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent {
  private readonly apiKey = "environment.apiKey";
  MealPlans = signal<{ title: string; recipes: string; image: string }[]>([]);
  Meals= signal<Recipe[]>([]);
  
  constructor(private http: HttpClient, private router: Router,private recipesService: RecipeService) {}
  
  lazyLoadRandomRecipes(num: number): void {
    this.recipesService.getRandomRecipesWithCookTime(num).subscribe(response => {
      this.Meals.set(response);
    });
  }
  async lazyLoadMealPlans() {
    const diets = Object.keys(DIET_IMAGES);
    const randomDiets = this.getRandomDiets(diets, 6); //6 random diets
    const newMealPlans: any[] = [];

    for (const diet of randomDiets) {
      try {
        const response: any = await this.http
          .get('https://api.spoonacular.com/mealplanner/generate', {
            params: {
              apiKey: this.apiKey,
              diet,
              timeFrame: 'week',
            },
          });
          console.log(response);
        newMealPlans.push({
          title: `${diet.charAt(0).toUpperCase() + diet.slice(1)} Diet Plan`,
          recipes: `${response.week ? response.week.length : '21'} recipes`,
          image: DIET_IMAGES[diet],
        });
      } catch (error) {
        console.error(`Error loading meal plan for diet: ${diet}`, error);
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

  loadMealPlans() {
    console.log('Lazy loading meal plans...');

  }
  
  images: SliderImages[] = [
    {
      imageSrc: '/slider/macron.jpg',
      title: 'French Macarons',
      link: '#',
    },
    {
      imageSrc: '/slider/cookies.jpg',
      title: 'Chocolate Chip Cookies',
      link: '#',
    }, 
    {
      imageSrc: '/slider/healthy_salad.jpg',
      title: 'Healthy Salad',
      link: '#',
    },
    {
      imageSrc: '/slider/healthy.jpg',
      title: 'Healthy Bowl',
      link: '#',
    },
    {
      imageSrc: '/slider/dessert.jpg',
      title: 'Appetizer Board',
      link: '#',
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
