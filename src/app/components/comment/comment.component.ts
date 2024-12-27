import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  response : Boolean = false;
  @Input() comment!: Comment;
  constructor() {
    this.comment = {
      name: 'sobsob',
      profileurl: 'profile.jpg',
      date: 'Feb. 8, 2022',
      content: 'This is a comment',
      likes :44,
    }
  }

}

interface Comment {
  name: string;
  profileurl : string;
  date : string;
  content : string;
  likes :Number;
}