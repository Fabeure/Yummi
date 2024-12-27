import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { fetchItemsFromApi, ProductItem } from '../../shared/mock-data/mockData';
import { ProductListComponent } from "../../components/product-list/product-list.component";
import { categories } from '../../shared/mock-data/mockData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, ProductListComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true,
})
export class ProfileComponent implements OnInit {

  fullName = 'Saboua Abd';
  username = 'Miller';
  email = 'sousou@gmail.com';
  password = '********';
  categories = categories;
  isDropdownOpen = false;
  products: ProductItem[] = [];
  page = 1;
  pageSize = 8;
  total = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  async ngOnInit(): Promise<void> {
    await this.loadPage(this.page);
  }

  saveProfile() {
    console.log('Profile saved:', {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password,
    });
  }

  deleteAccount() {
    console.log('Account deleted!');
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  toggleDropdown(event: MouseEvent): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    event.stopPropagation(); // Prevent the event from propagating to the document and instantly closing the dropdown again
  }

  get showLoadMore(): boolean {
    return this.products.length < this.total;
  }

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

