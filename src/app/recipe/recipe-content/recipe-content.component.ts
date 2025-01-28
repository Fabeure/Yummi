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
import { AuthService } from '../../services/authentication.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-recipe-content',
  imports: [CommonModule],
  templateUrl: './recipe-content.component.html',
  styleUrl: './recipe-content.component.css',
})
export class RecipeContentComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  router = inject(Router);
  http = inject(HttpClient);
  recipeService = inject(RecipeService);
  authService = inject(AuthService);
  profileService = inject(ProfileService);
  recipe: Recipe | null = null;
  randomRecipes: Recipe[] = [];
  liked = false;
  private destroy$ = new Subject<void>();
  user$: User | null = null;
  dialog = inject(MatDialog);
  authorisationService = inject(AuthorizationService);

  ngOnInit() {
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
    this.liked = this.recipe?.id
      ? this.user$?.favorites.includes(this.recipe.id) ?? false
      : false;
  }

  ngOnDestroy() {
    // Emit a value to trigger all takeUntil operators
    this.destroy$.next();
    // Complete the subject
    this.destroy$.complete();
  }

  async likeRecipe() {
    // If user is not logged in, show login dialog
    if (!this.authorisationService.isLoggedIn()) {
      const dialogRef = this.dialog.open(LogInComponent, {
        width: '500px',
        disableClose: true,
      });
      return;
    }
    // Guard clauses for required data
    if (!this.user$?.userId || !this.recipe?.id) {
      console.error('Missing user or recipe data');
      return;
    }

    const recipeId = this.recipe.id;
    const userFavorites = [...(this.user$.favorites || [])]; // Create a copy of the array

    try {
      if (!this.liked) {
        // Add to favorites
        if (!userFavorites.includes(recipeId)) {
          userFavorites.push(recipeId);
        }
      } else {
        // Remove from favorites
        const index = userFavorites.indexOf(recipeId);
        if (index > -1) {
          userFavorites.splice(index, 1);
        }
      }

      const updatedProfile = {
        Name: this.user$.name,
        Surname: this.user$.surname,
        Email: this.user$.email,
        ProfilePictureBase64: this.user$.profilePictureBase64,
        Favorites: userFavorites,
      };

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      this.profileService
        .saveProfile(this.user$.userId, updatedProfile, accessToken)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.liked = !this.liked; // Toggle like status
            // Update the user's favorites in the auth service
            if (this.user$) {
              this.user$.favorites = userFavorites;
            }
            // Optional: Show success message
            console.log(
              `Recipe ${this.liked ? 'liked' : 'unliked'} successfully`
            );
          },
          error: (err) => {
            console.error('Error updating favorites:', err);
            // Optional: Show error message to user
          },
        });
    } catch (error) {
      console.error('Error processing like/unlike:', error);
      // Optional: Show error message to user
    }
  }
}
