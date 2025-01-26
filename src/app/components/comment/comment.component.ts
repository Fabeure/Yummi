import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Comment } from '../../models/model';
import { FormsModule } from '@angular/forms';
import { ResponseComponent } from '../response/response.component';
import { AuthService } from '../../services/authentication.service';
import { AuthorizationService } from '../../services/authorisation.service';

@Component({
  selector: 'app-comment',
  imports: [CommonModule, FormsModule, ResponseComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  liked: boolean = false;
  showReplyForm: boolean = false;
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
  toggleReplayForm() {
    if (this.authService.isLoggedIn()) {
      this.showReplyForm = !this.showReplyForm;
    }
  }

  submitReply() {
    // add teh reponse do the comment with this id and reset the form
    if (this.replyContent) {
      const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      this.comment.responses.push({
        id: this.comment.responses.length + 1,
        name: this.comment.name,
        profileurl: this.comment.profileurl,
        date: formattedDate,
        content: this.replyContent,
        likes: 0,
        responses: [],
      });
      this.replyContent = '';
      this.showReplyForm = false;
    }
  }
}
