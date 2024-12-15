import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { sign } from 'crypto';
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
    private formBuilder: FormBuilder,private dialogSignUp: MatDialog) {
    this.form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });}


  onSubmit() {
    // Logique de connexion ici (ex. API call)
    console.log(this.form.value);
    this.dialogRef.close();
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

  