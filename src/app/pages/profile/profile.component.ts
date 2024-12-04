import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule


 @Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true,
})
export class ProfileComponent  {

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
  
  }
  
