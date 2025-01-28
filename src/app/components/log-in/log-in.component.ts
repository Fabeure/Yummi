import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  standalone: true,
})
export class LogInComponent {
 form: any;
  constructor(private dialogRef: MatDialogRef<LogInComponent>, 
    private formBuilder: FormBuilder,private dialogSignUp: MatDialog,
    private authService: AuthService,
  ) {
    this.form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });}

  onSubmit() {
    if (this.form.invalid) return;
  
    const { email, password } = this.form.value;
  
    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (response?.success) {
          console.log('Login initiated successfully:', response);
          
          this.authService.user$.subscribe({
            next: (user) => {
              if (user) {
                console.log('User authenticated:', user);
              }
            },
            error: (err) => {
              console.error('Error in user subscription:', err);
              alert('An error occurred while processing your login.');
            },
          });
        } else {
          console.log('Login failed:', response?.message);
          alert(response?.message || 'Login failed. Please try again.');
        }
        this.onClose();
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed. Please check your credentials and try again.');
      },
    });
  }
  
  onClose()
  {
    this.dialogRef.close();
  }
  openSignUpDialog()
  {
    this.dialogRef.close();
    this.dialogSignUp.open(SignUpComponent, {
      width: '500px',
      disableClose: true,
    });
  }
  
}

  