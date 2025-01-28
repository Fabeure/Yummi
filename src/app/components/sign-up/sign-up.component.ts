import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LogInComponent } from '../log-in/log-in.component';
import { AuthService } from '../../services/authentication.service';
import { PasswordStrengthValidator } from '../../validators/password.validator';
@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {
StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
form: any;
constructor(
  private dialogRef: MatDialogRef<SignUpComponent>,
  private dialogSignUp: MatDialog,
  private formBuilder: FormBuilder,
  private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(this.StrongPasswordRegx),
          Validators.minLength(8),
        ],
      ],
    });
  }


  onSubmit() {
    if (this.form.invalid) return;
  
    const { userName, email, password } = this.form.value;
  
    this.authService.register(userName, email, password).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.onClose();
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
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
      disableClose: true,
    });
  }

}
