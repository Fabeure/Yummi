import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LogInComponent } from '../log-in/log-in.component';
import { AuthService } from '../../services/authentication.service';
@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
form: any;
  constructor(private dialogRef: MatDialogRef<SignUpComponent>, private dialogSignUp: MatDialog, 
    private formBuilder: FormBuilder,
      private authService: AuthService) {
    this.form = this.formBuilder.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });}


  onSubmit() {
    if (this.form.invalid) return;
  
    const { userName, email, password } = this.form.value;
    console.log(userName, email, password);
  
    // Call the login method, subscribe to the result, and handle success and error
    this.authService.register(userName, email, password);
    this.onClose();  // Close the form
  }
  onClose()
  {
    this.dialogRef.close();
  }
  openLogInDialog()
  {
    this.dialogRef.close();
    this.dialogSignUp.open(LogInComponent, {
      width: '500px',
      disableClose: true, // Empêche la fermeture en cliquant à l'extérieur
    });
  }

}
