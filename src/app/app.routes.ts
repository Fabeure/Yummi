import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TestSearchComponent } from './pages/test-search/test-search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecipeComponent } from './recipe/recipe.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { APP_ROUTES } from '../config/routes.config';

export const routes: Routes = [
  {
    path: APP_ROUTES.home,
    component: HomeComponent,
  },
  {
    path: APP_ROUTES.test,
    component: TestSearchComponent,
  },
  {
    path: APP_ROUTES.profile,
    component: ProfileComponent,
  },
  {
    path: APP_ROUTES.recipe,
    component: RecipeComponent,
  },
  {
    path: APP_ROUTES.categories,
    component: CategoriesComponent,
  }
];
