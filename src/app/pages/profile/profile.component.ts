import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule
import { fetchItemsFromApi, ProductItem } from '../../shared/mock-data/mockData';
import { ProductListComponent } from "../../components/product-list/product-list.component";
import { categories } from '../../shared/mock-data/mockData';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, ProductListComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  categories = categories;
  isDropdownOpen = false;
  products: ProductItem[] = [];
  page = 1;
  pageSize = 8;
  total = 0;
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  async ngOnInit(): Promise<void> {
    this.profileForm = this.fb.group({
      fullName: ['Saboua Abd', [Validators.required, Validators.minLength(3)]],
      username: ['Miller', [Validators.required, Validators.minLength(3)]],
      email: ['sousou@gmail.com', [Validators.required, Validators.email]],
      password: ['********', [Validators.required, Validators.minLength(6)]],
    });
    await this.loadPage(this.page);
  }

  saveProfile() {
    console.log(this.profileForm.value);
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
    // Prevent the event from propagating to the document and instantly closing the dropdown again
    event.stopPropagation();
  }

  get showLoadMore(): boolean {
    return this.products.length < this.total;
  }

  private async loadPage(page: number) {
    const { total, items } = await fetchItemsFromApi(page, this.pageSize);
    this.total = total;
    if (page === 1) {
      this.products = items;
    } else {
      this.products = [...this.products, ...items];
    }
    this.cdr.detectChanges();
  }

  handleLoadMore() {
    this.page++;
    this.loadPage(this.page);
  }

}

