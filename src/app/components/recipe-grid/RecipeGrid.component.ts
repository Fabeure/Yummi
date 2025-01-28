import { Component, Input, ChangeDetectionStrategy, computed, signal, OnInit, SimpleChanges } from '@angular/core';
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
 
   /**
    * Optional search params for the Spoonacular API
    * e.g. { query: 'pasta', diet: 'vegan', cuisine: 'italian' } etc.
    */
   @Input() searchParams?: Record<string, string | number | boolean> = {};
 
   readonly pageSize = 8; // We fetch 8 recipes per request
 
   private offsetSignal = signal<number>(0);
   private pageSignal = signal<number>(1);
   private totalResultsSignal = signal<number>(0);
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
     this.initializeRecipes();
   }
 
   /**
    * Detect changes to @Input properties and handle them dynamically.
    */
   ngOnChanges(changes: SimpleChanges): void {
     if (changes['searchParams'] || changes['recipesInput']) {
       this.initializeRecipes();
     }
   }
 
   /**
    * Initialize recipes based on `recipesInput` or fetch from the API.
    */
   private initializeRecipes(): void {
     if (this.recipesInput && this.recipesInput.length > 0) {
       this.recipesSignal.set(this.recipesInput);
       this.totalResultsSignal.set(this.recipesInput.length);
     } else {
       this.fetchRecipes();
     }
   }
 
   /**
    * Fetch recipes from the Spoonacular API,
    * applying optional searchParams (query, diet, etc.).
    */
   private fetchRecipes(): void {
     const offset = this.getCurrentOffsetBasedOnDisplayMode();
 
     this.recipeService
       .getRecipes(offset, this.pageSize, this.searchParams || {})
       .pipe(take(1))
       .subscribe({
         next: (res: SpoonacularSearchResponse) => {
           this.totalResultsSignal.set(res.totalResults || 0);
 
           if (this.displayMode === 'showMore' && offset > 0) {
             this.recipesSignal.set([
               ...this.recipesSignal(),
               ...res.results,
             ]);
           } else {
             this.recipesSignal.set(res.results);
           }
         },
         error: (err) => {
           console.error('Error fetching recipes:', err);
         },
       });
   }
 
   private getCurrentOffsetBasedOnDisplayMode(): number {
     if (this.displayMode === 'pagination') {
       return (this.pageSignal() - 1) * this.pageSize;
     } else {
       return this.offsetSignal();
     }
   }
 
   showMore() {
     this.offsetSignal.update((oldOffset) => oldOffset + this.pageSize);
     this.fetchRecipes();
   }
 
   nextPage() {
     this.pageSignal.update((oldPage) => oldPage + 1);
     this.fetchRecipes();
   }
 
   previousPage() {
     if (this.pageSignal() > 1) {
       this.pageSignal.update((oldPage) => oldPage - 1);
       this.fetchRecipes();
     }
   }
 
   hasMorePages(): boolean {
     const loadedCount = this.recipesSignal().length;
 
     if (this.displayMode === 'pagination') {
       return this.currentPage() * this.pageSize < this.totalResults();
     }
 
     return loadedCount < this.totalResults();
   }
 
   trackByRecipeId(index: number, recipe: Recipe) {
     return recipe.id;
   }


}
