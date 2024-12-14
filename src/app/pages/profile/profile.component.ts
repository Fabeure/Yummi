import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { fetchItemsFromApi, ProductItem } from '../../shared/mock-data/mockData';
import { ProductListComponent } from "../../components/product-list/product-list.component";


 @Component({
  selector: 'app-profile',
  imports: [FormsModule, ProductListComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true,
})
export class ProfileComponent   implements OnInit {

    fullName = 'Saboua Abd';
    username = 'Miller';
    email = 'sousou@gmail.com';
    password = '********';
  
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

    @ViewChild('dropdownMenu') dropdownMenu: ElementRef | undefined;

    
    toggleDropdown(): void {
      if (this.dropdownMenu) {
        const menu = this.dropdownMenu.nativeElement;
        menu.classList.toggle('hidden'); // Toggle the 'hidden' class
      }
    }
  
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
  
