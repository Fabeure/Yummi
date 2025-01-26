import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RecipeGridComponent } from '../../components/recipe-grid/RecipeGrid.component';
import { fetchItemsFromApi, ProductItem } from '../../shared/mock-data/mockData';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-test-search',
  imports: [RecipeGridComponent],
  templateUrl: './test-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestSearchComponent implements OnInit {
  products: ProductItem[] = [];
  page = 1;
  pageSize = 8;
  total = 0;

  get showLoadMore(): boolean {
    return this.products.length < this.total;
  }
  async ngOnInit(): Promise<void> {
    await this.loadPage(this.page);
  }

  constructor(private cdr: ChangeDetectorRef) {}
  
  
  private async loadPage(page: number) {
    const { total, items } = await fetchItemsFromApi(page, this.pageSize);
    this.total = total;

    

    if (page === 1) {
      // Initial load, replace items
      this.products = items;
    } else {
      // Append to existing list
      this.products = [...this.products, ...items];
    }
    this.cdr.detectChanges(); // Trigger change detection to update view
  }

  handleLoadMore() {
    this.page++;
    this.loadPage(this.page);
  }
}