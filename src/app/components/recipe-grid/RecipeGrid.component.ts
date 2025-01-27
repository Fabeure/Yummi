import { Component, Input, ChangeDetectionStrategy, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealCardComponent } from '../meal-card/meal-card.component';
import { take } from 'rxjs';
import { Recipe, SpoonacularSearchResponse } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';




@Component({
  selector: 'app-recipe-grid',
  imports: [CommonModule , MealCardComponent],
  templateUrl: './RecipeGrid.component.html',
  styleUrl: './RecipeGrid.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeGridComponent implements OnInit {

  /**
   * Switch between "showMore" or "pagination" display modes.
   */
  @Input() displayMode: 'showMore' | 'pagination' = 'showMore';


  /**
   * Optional: if provided, the component will display these recipes 
   * directly and skip API fetching altogether.
   */
  @Input() recipesInput?: Recipe[] = [];


  readonly pageSize = 8; // We fetch 8 recipes per request

  /**
   * If using "showMore" mode, we will keep incrementing offset by pageSize.
   * If using "pagination" mode, offset = (currentPage - 1) * pageSize.
   */
  
  private offsetSignal = signal<number>(0);

  // For pagination mode, track the current page number (starting from 1).
  private pageSignal = signal<number>(1);

  // We store the total number of recipes, so we can check if more pages exist
  private totalResultsSignal = signal<number>(0);

  // We store our loaded recipes in a signal
  private recipesSignal = signal<Recipe[]>([]);


  recipes = computed(() => this.recipesSignal());
  currentOffset = computed(() => this.offsetSignal());
  currentPage = computed(() => this.pageSignal());
  totalResults = computed(() => this.totalResultsSignal());
  totalPages = computed(() =>
    this.totalResults() > 0
      ? Math.ceil(this.totalResults() / this.pageSize)
      : 0
  );

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    if (this.recipesInput && this.recipesInput.length > 0) {
      this.recipesSignal.set(this.recipesInput);
      this.totalResultsSignal.set(this.recipesInput.length);
    } else {
      // 2) Otherwise, fetch from the API as before
      this.fetchRecipes();
    }
  }

  private fetchRecipes(): void {
    const offset = this.getCurrentOffsetBasedOnDisplayMode();

    // We call the service method, which returns an Observable
    this.recipeService.getRecipes(offset, this.pageSize)
      .pipe(take(1))
      .subscribe({
        next: (res: SpoonacularSearchResponse) => {
          this.totalResultsSignal.set(res.totalResults || 0);

          // If "showMore" mode and offset > 0, we append
          if (this.displayMode === 'showMore' && offset > 0) {
            this.recipesSignal.set([...this.recipesSignal(), ...res.results]);
          } else {
            // Otherwise, replace
            this.recipesSignal.set(res.results);
          }
        },
        error: (err) => {
          console.error('Error fetching recipes:', err);
        }
      });
  }


  /**
   * If "showMore" => offset is incremented each time
   * If "pagination" => offset is based on (page - 1) * pageSize
   */


  private getCurrentOffsetBasedOnDisplayMode(): number {
    if (this.displayMode === 'pagination') {
      // (page - 1) * pageSize
      return (this.pageSignal() - 1) * this.pageSize;
    } else {
      // showMore => just read offsetSignal
      return this.offsetSignal();
    }
  }

  // Show More mode: increase offset by pageSize
  showMore() {
    this.offsetSignal.update((oldOffset) => oldOffset + this.pageSize);
    this.fetchRecipes();
  }

  // Pagination mode: next page
  nextPage() {
    this.pageSignal.update((oldPage) => oldPage + 1);
    this.fetchRecipes();
  }

  // Pagination mode: previous page
  previousPage() {
    if (this.pageSignal() > 1) {
      this.pageSignal.update((oldPage) => oldPage - 1);
      this.fetchRecipes();
    }
  }

  /**
   * Determine if we have more recipes to show:
   * totalResults tells us how many total recipes can be fetched,
   * if we've loaded less than that, we can still fetch more.
   */
  hasMorePages(): boolean {
    // total loaded so far
    let loadedCount = this.recipesSignal().length;

    // In pagination mode, if (page * pageSize < totalResults), we have more pages
    if (this.displayMode === 'pagination') {
      return this.currentPage() * this.pageSize < this.totalResults();
    }

    // In showMore mode, loadedCount < totalResults means there is more to fetch
    return loadedCount < this.totalResults();
  }

  /**
   * trackBy function for *ngFor to optimize rendering
   */
  trackByRecipeId(index: number, recipe: Recipe) {
    return recipe.id;
  }


}
