import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LogInComponent } from '../log-in/log-in.component';
@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
form: any;
  constructor(private dialogRef: MatDialogRef<SignUpComponent>, private dialogSignUp: MatDialog, 
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });}


  onSubmit() {
    console.log(this.form.value);
    this.dialogRef.close();
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
