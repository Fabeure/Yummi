import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { LogInComponent } from '../../components/log-in/log-in.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from '../../services/authorisation.service';
import { AuthService, User } from '../../services/authentication.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recipe-content',
  imports: [CommonModule],
  templateUrl: './recipe-content.component.html',
  styleUrl: './recipe-content.component.css',
})
export class RecipeContentComponent implements OnInit, OnDestroy {
  recipe: Recipe | null = null;
  randomRecipes: Recipe[] = [];
  route = inject(ActivatedRoute);
  router = inject(Router);
  http = inject(HttpClient);
  recipeService = inject(RecipeService);
  authService = inject(AuthService);
  liked = false;
  user$: User | null = null;
  private apiUrl = environment.apiUrl;
  private destroy$ = new Subject<void>();

  dialog = inject(MatDialog);
  authorisationService = inject(AuthorizationService);

  ngOnInit() {
    // Using takeUntil to automatically unsubscribe when destroy$ emits
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.recipe = data['recipe'];
    });

    this.recipeService
      .getRandomRecipe(4)
      .pipe(takeUntil(this.destroy$))
      .subscribe((recipes) => {
        this.randomRecipes = recipes;
        console.log('this is recipes ', recipes);
      });

    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this.user$ = user;
      }
    });
  }

  ngOnDestroy() {
    // Emit a value to trigger all takeUntil operators
    this.destroy$.next();
    // Complete the subject
    this.destroy$.complete();
  }

  likeRecipe() {
    console.log('authenticated', this.authorisationService.isLoggedIn());
    if (!this.liked) {
      if (!this.authorisationService.isLoggedIn()) {
        const dialogRef = this.dialog.open(LogInComponent, {
          width: '500px',
          disableClose: true,
        });
      } else {
        this.liked = true;
      }
    }
  }
}
