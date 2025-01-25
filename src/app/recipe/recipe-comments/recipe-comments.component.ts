import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommentComponent } from '../../components/comment/comment.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-recipe-comments',
  imports: [CommentComponent, ReactiveFormsModule],
  templateUrl: './recipe-comments.component.html',
  styleUrl: './recipe-comments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCommentsComponent {
  
  comments = [
    {
      id: 1,
      name: 'sobsob',
      profileurl: 'profile.jpg',
      date: 'Feb. 8, 2022',
      content: 'This is a comment1',
      likes: 0,
      responses: [],
    },
    {
      id: 2,
      name: 'sobsob',
      profileurl: 'profile.jpg',
      date: 'Feb. 8, 2022',
      content: 'This is a comment2',
      likes: 0,
      responses: [],
    },
    {
      id: 3,
      name: 'sobsob',
      profileurl: 'profile.jpg',
      date: 'Feb. 8, 2022',
      content: 'This is a comment3',
      likes: 1,
      responses: [],
    },
    {
      id: 4,
      name: 'sobsob',
      profileurl: 'profile.jpg',
      date: 'Feb. 8, 2022',
      content: 'This is a comment4',
      likes: 11,
      responses: [
        {
          id: 1,
          name: 'sobsob',
          profileurl: 'profile.jpg',
          date: 'Feb. 8, 2022',
          content: 'This is a response1',
          likes: 0,
          responses: [],
        },
        {
          id: 2,
          name: 'sobsob',
          profileurl: 'profile.jpg',
          date: 'Feb. 8, 2022',
          content: 'This is a response2',
          likes: 0,
          responses: [],
        },
      ],
    },
  ];
  form = new FormGroup({
    comment: new FormControl(''),
  });

  submit() {
    console.log(this.form.value);
    this.comments.push({
      id: this.comments.length + 1,
      name: 'sobsob',
      profileurl: 'profile.jpg',
      date: 'Feb. 8, 2022',
      content: this.form.value.comment!,
      likes: 0,
      responses: [],
    });
    this.form.reset();
  }
}
