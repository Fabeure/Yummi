import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TestSearchComponent } from './pages/test-search/test-search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecipeComponent } from './recipe/recipe.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'test',
    component: TestSearchComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'recipe',
    component: RecipeComponent,
  }
];
