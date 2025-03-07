import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { APP_ROUTES } from '../config/routes.config';
import { RecipeResolver } from './resolvers/recipe.resolver';
import { MealPlanComponent } from './pages/meal-plan/meal-plan.component';
import { MealPlanResultComponent } from './pages/meal-plan-result/meal-plan-result.component';
import { MealPlanResolver } from './resolvers/mealplan.resolver';
import { LoginGuard } from './guards/route.guard';
import { ProfileResolver } from './resolvers/profile/profile.resolver';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
export const routes: Routes = [
  {
    path: APP_ROUTES.home,
    component: HomeComponent,
  },
  {
    path : APP_ROUTES.search,
    component : SearchResultsComponent
  },
  {
    path: APP_ROUTES.profile,
    loadComponent: () =>
      import('./pages/profile/profile/profile.component').then((m) => m.ProfileComponent),
    resolve: {
      userData: ProfileResolver
    },
    canActivate: [LoginGuard],
  },
  {
    path: APP_ROUTES.recipe,
    component: RecipeComponent,
    resolve: {
      recipe: RecipeResolver,
    },
  },
  {
    path: APP_ROUTES.categories,
    component: CategoriesComponent,
  },
  {
    path: APP_ROUTES.mealplan,
    component: MealPlanComponent,
  },
  {
    path: APP_ROUTES.mealresult,
    component: MealPlanResultComponent,
    resolve :{
      mealPlan: MealPlanResolver
    }
  }
];
