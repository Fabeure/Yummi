import { Component } from '@angular/core';
import { CommentComponent } from "../../components/comment/comment.component";

@Component({
  selector: 'app-recipe-comments',
  imports: [CommentComponent],
  templateUrl: './recipe-comments.component.html',
  styleUrl: './recipe-comments.component.css'
})
export class RecipeCommentsComponent {
  comments= [{
    name: 'sobsob',
    profileurl: 'profile.jpg',
    date: 'Feb. 8, 2022',
    content: 'This is a comment1',
    likes:0
  },
  {
    name: 'sobsob',
    profileurl: 'profile.jpg',
    date: 'Feb. 8, 2022',
    content: 'This is a comment2',
    likes:0
  },
  {
    name: 'sobsob',
    profileurl: 'profile.jpg',
    date: 'Feb. 8, 2022',
    content: 'This is a comment3',
    likes : 1
  },
  {
    name: 'sobsob',
    profileurl: 'profile.jpg',
    date: 'Feb. 8, 2022',
    content: 'This is a comment4',
    likes : 11
  }]
}
