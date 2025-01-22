import { Component, Input } from '@angular/core';
import { Comment } from '../../models/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor() {}
  likeComment() {
    if (!this.liked) {
      this.liked = true;
      this.comment.likes++;
    }
  }
}
