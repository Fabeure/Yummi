import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule
import { fetchItemsFromApi, ProductItem } from '../../../shared/mock-data/mockData';
import { categories } from '../../../shared/mock-data/mockData';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { ProfileService } from './profile.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeGridComponent } from '../../../components/recipe-grid/RecipeGrid.component';
import { AuthService } from '../../../services/authentication.service';
import { User } from '../../../models/user.model';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { applicationUser } from '../../../models/applicationUser.model';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RecipeGridComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  categories = categories;
  isDropdownOpen = false;
  products: ProductItem[] = [];
  page = 1;
  pageSize = 8;
  total = 0;
  profileForm = {
    name: '',
    surname: '',
    email: '',
    password: '',
    profilePicture: '',
  };
  profilePictureUrl: string | null = null;  // URL for the profile picture
  userId: string = '';
  user: User = {
    name: '',
    surname: '',
    email: '',
    profilePictureBase64: '',
    userId: '',
    favorites: [],
  };
  favouriteRecipies: Recipe[] = [];
  favorites: number[] = [];
  constructor(private fb: FormBuilder, private route: ActivatedRoute
    , private cdr: ChangeDetectorRef, private profileService: ProfileService, private authService: AuthService, private recipeService: RecipeService) {
  }
  resolvedData: any;
  async ngOnInit() {
    this.resolvedData = this.route.snapshot.data['userData'];
    if (this.resolvedData) {
      this.userId = this.resolvedData.userId;
      console.log('resolved data:', this.resolvedData)
      this.updateForm(this.resolvedData);
      this.favorites=this.resolvedData.favorites;
    }
    this.getFavoriteRecipeIds();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // Once file is loaded, set the profile picture URL
      reader.onload = () => {
        this.profilePictureUrl = reader.result as string;
        console.log('Profile picture URL:', this.profilePictureUrl);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
  }

  updateForm(userData: any): void {
    this.profileForm = {
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      password: '',
      profilePicture: userData.profilePictureBase64
    };
  }

  saveProfile() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken') || '';

      const user: applicationUser = {
        Name: this.profileForm.name as string,
        Surname: this.profileForm.surname as string,
        Email: this.profileForm.email as string,
        ProfilePictureBase64: this.profileForm.profilePicture as string,
        Favorites: this.favorites
      }

      this.profileService.saveProfile(this.userId, user, token).subscribe({
        next: () => {
          console.log('Profile saved!');
        },
        error: (err: any) => {
          console.error('Failed to save profile:', err);
        },
      });
    }
  }

  deleteAccount() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken') || '';
      this.profileService.deleteAccount(this.userId, token).subscribe({
        next: () => {
          this.authService.logout();
        },
        error: (err) => {
          console.error('Failed to delete account:', err);
        },
      });
    }
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
  ngOnDestroy(): void {
    // Unsubscribe from the user observable to prevent memory leaks
    this.profileService.unsubscribeUser();
  }
  getFavoriteRecipeIds(): void {
    this.profileService.getFavorites(this.userId).subscribe(
      (favorites: any) => {
        this.favorites = favorites;
        this.getFavoriteRecipes();
      },
      (error: any) => {
        console.error('Failed to fetch favorites:', error);
      }
    );
  }

  getFavoriteRecipes(): void {
    this.favorites.forEach((recipeId: number) => {
      this.recipeService.getRecipe(recipeId).subscribe(
        (recipe: any) => {
          this.favouriteRecipies.push(recipe);
        },
        (error: any) => {
          console.error('Failed to fetch recipe:', error);
        }
      );
    });
  }

  changePassword() {
  }

}

