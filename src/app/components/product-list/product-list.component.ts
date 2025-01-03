import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealCardComponent } from '../meal-card/meal-card.component';
import { ProductItem } from '../../shared/mock-data/mockData';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule , MealCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {

  @Input() items: ProductItem[] = [];
  @Input() showLoadMore = false;
  @Output() loadMore = new EventEmitter<void>();

  trackByIndex(index: number, _: ProductItem): number {
    return index;
  }

  onLoadMoreClick(): void {
    this.loadMore.emit();
  }


}
