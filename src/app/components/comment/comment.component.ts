import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment } from '../../models/model';
import { FormsModule } from '@angular/forms';
import { ResponseComponent } from "../response/response.component";

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

  constructor() {}
  likeComment() {
    if (!this.liked) {
      this.liked = true;
      this.comment.likes++;
    }
  }
  toggleReplayForm() {
    this.showReplyForm = !this.showReplyForm;
  }
  submitReply() {
    // add teh reponse do the comment with this id and reset the form
    if (this.replyContent) {
      this.comment.responses.push({
        id: this.comment.responses.length + 1,
        name: 'sobsob',
        profileurl: 'profile.jpg',
        date: 'Feb. 8, 2022',
        content: this.replyContent,
        likes: 0,
        responses: [],
      });
      this.replyContent = '';
      this.showReplyForm = false;
    }
  }
}
