import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule
import { fetchItemsFromApi, ProductItem } from '../../../shared/mock-data/mockData';
import { categories } from '../../../shared/mock-data/mockData';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeGridComponent } from '../../../components/recipe-grid/RecipeGrid.component';
import { AuthService } from '../../../services/authentication.service';
import { User } from '../../../models/user.model';

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
  profileForm!: FormGroup;
  profilePictureUrl: string | null = null;  // URL for the profile picture
  userId: string = '';  
  user: User = {
    name: '',
    surname: '',
    email: '',
    profilePictureBase64: '',
    userId: '',
    favorites: [],
  }; // Store the user data
favorites: string[] = [];
  constructor(private fb: FormBuilder, private route: ActivatedRoute
    , private cdr: ChangeDetectorRef, private profileService: ProfileService, private authService: AuthService) {
    this.profileForm = this.fb.group({
      name: ['', []],
      surname: ['', []],
      email: ['', []],
      password: ['', []],
      profilePicture: ['', []], // Form control for the base64 image
    });
  }
  resolvedData: any;
  async ngOnInit() {

    this.resolvedData = this.route.snapshot.data['userData'];

    if (this.resolvedData) {
      this.userId = this.resolvedData.userId;
      this.updateForm(this.resolvedData);
    }
    // this.profileForm = this.fb.group({
    //   fullName: [resolvedData.fullName || null, [Validators.required, Validators.minLength(3)]],
    //   username: [resolvedData.username || '', [Validators.required, Validators.minLength(3)]],
    //   email: [resolvedData.email || '', [Validators.required, Validators.email]],
    //   password: [resolvedData.password || '', [Validators.required, Validators.minLength(6)]],
    // });

    // await this.loadPage(this.page);

    // this.fetchUserData();
  }

  onFileSelected(event: any) {
    console.log(event);
    console.log('in onFilejSelected');

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // Once file is loaded, set the profile picture URL
      reader.onload = () => {
        this.profilePictureUrl = reader.result as string;
        this.profileForm.patchValue({
          profilePicture: this.profilePictureUrl, // Assuming you have a 'profilePicture' form control
        });

        console.log('Profile picture URL:', this.profilePictureUrl);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
  }


  updateForm(userData: any): void {
    console.log('Updating form with user data:', userData);
    this.profileForm = this.fb.group({
      name: [userData.name, []],
      surname: [userData.name, []],
      email: [userData.name, []],
      password: [userData.name, []],
      profilePicture: [userData.name, []], // Form control for the base64 image
    });
  }

  // console.log(this.profileForm.value);


saveProfile() {
  console.log(this.profileForm.value);
  if (this.profileForm.valid && typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')|| '';
    this.profileService.saveProfile(this.profileForm.value, this.userId,token,this.favorites);
  }
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
ngOnDestroy(): void {
  // Unsubscribe from the user observable to prevent memory leaks
  this.profileService.unsubscribeUser();
}

}

