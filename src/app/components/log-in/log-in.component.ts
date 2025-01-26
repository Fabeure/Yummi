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
    private router: Router // To navigate after login
  ) {
    this.form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });}

  onSubmit() {
    if (this.form.invalid) return;
  
    const { email, password } = this.form.value;
    console.log(email, password);
  
    // Call the login method, subscribe to the result, and handle success and error
    this.authService.login(email, password);
  
    // On successful login, close the form and navigate
    this.authService.user$.subscribe({
      next: () => {
        this.onClose();  // Close the form
        //this.router.navigate(['/']);  // Redirect to home or another page
      },
      error: (err) => {
        alert('Check console');
        console.error(err); // Log error details for debugging
      }
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
      disableClose: true, // Empêche la fermeture en cliquant à l'extérieur
    });
  }
  
}

  