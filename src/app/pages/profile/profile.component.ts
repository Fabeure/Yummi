import { ChangeDetectorRef, Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { fetchItemsFromApi, ProductItem } from '../../shared/mock-data/mockData';
import { RecipeGridComponent } from "../../components/recipe-grid/RecipeGrid.component";
import { categories } from '../../shared/mock-data/mockData';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [FormsModule,  CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true,
})
export class ProfileComponent implements OnInit, OnDestroy {

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
  user: any; // Store the user data
  userSubscription: Subscription = new Subscription();

  constructor(private cdr: ChangeDetectorRef, private authService: AuthService) { }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      console.log('User data updated:', user);
    });
    this.loadPage(this.page);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the user observable to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
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
