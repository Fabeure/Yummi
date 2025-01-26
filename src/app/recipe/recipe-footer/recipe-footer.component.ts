import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommentComponent } from '../../components/comment/comment.component';
import { AuthorizationService } from '../../services/authorisation.service';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from '../../components/log-in/log-in.component';

@Component({
  selector: 'app-recipe-footer',
  imports: [],
  templateUrl: './recipe-footer.component.html',
  styleUrl: './recipe-footer.component.css',
})
export class RecipeFooterComponent {
  authorizationService = inject(AuthorizationService);
  dialog = inject(MatDialog);

  shareFeedback() {
    if (!this.authorizationService.isLoggedIn()) {
      const dialogRef = this.dialog.open(LogInComponent, {
        width: '500px',
        disableClose: true,
      });
    }
  }
}
