import { Component, inject, Input } from '@angular/core';
import { Comment } from '../../models/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorizationService } from '../../services/authorisation.service';
@Component({
  selector: 'app-response',
  imports: [CommonModule, FormsModule],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css',
})
export class ResponseComponent {
  liked: boolean = false;
  replyContent: string = '';
  @Input() comment!: Comment;
  authService = inject(AuthorizationService);

  constructor() {}
  likeComment() {
    if (this.authService.isLoggedIn()) {
      if (!this.liked) {
        this.liked = true;
        this.comment.likes++;
      } else {
        this.liked = false;
        this.comment.likes--;
      }
    }
  }
}
