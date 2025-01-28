import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { RecipeGridComponent } from '../../components/recipe-grid/RecipeGrid.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, RecipeGridComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
 // Signal to store the current search parameters
 private searchParamsSignal = signal<Record<string, string>>({});
 searchParams = computed(() => this.searchParamsSignal());

 constructor(private route: ActivatedRoute) {}

 ngOnInit(): void {
   // Listen for changes in query parameters
   this.route.queryParams.subscribe(params => {
     const newSearchParams: Record<string, string> = {};

     // Map query params to the Spoonacular API-compatible format
     if (params['title']) {
       newSearchParams['query'] = params['title']; // Spoonacular uses "query"
     }
     if (params['cuisine']) {
       newSearchParams['cuisine'] = params['cuisine'];
     }
     if (params['diet']) {
       newSearchParams['diet'] = params['diet'];
     }
     if (params['type']) {
        newSearchParams['type'] = params['type'];
      }
     // Update the signal to trigger a refresh
     this.searchParamsSignal.set(newSearchParams);
   });
 }

}
