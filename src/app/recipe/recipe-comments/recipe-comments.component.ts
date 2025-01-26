import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommentComponent } from '../../components/comment/comment.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { response } from 'express';
import { AuthorizationService } from '../../services/authorisation.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authentication.service';
import { async, map } from 'rxjs';

@Component({
  selector: 'app-recipe-comments',
  imports: [CommentComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-comments.component.html',
  styleUrl: './recipe-comments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCommentsComponent {
  authService = inject(AuthService);
  authorisationService = inject(AuthorizationService);
  user$ = this.authService.user$;
  loggedIn = this.authorisationService.isLoggedIn();

  comments = [
    {
      id: 1,
      name: 'Kawther',
      profileurl: '/profiles/1.jpg',
      date: 'Feb. 8, 2024',
      content: 'I really love this recipe . It is so delicious',
      likes: 4,
      responses: [],
    },
    {
      id: 2,
      name: 'Samir ',
      profileurl: '/profiles/2.jpg',
      date: 'Feb. 19, 2024',
      content:
        'I made this for my wife and she liked it so much . THANKK YOUU GUYS !',
      likes: 8,
      responses: [],
    },
    {
      id: 3,
      name: 'Kitty',
      profileurl: '/profiles/6.jpg',
      date: 'Sep. 8, 2024',
      content: 'I didnt like it honestly :( . ',
      likes: 0,
      responses: [],
    },
    {
      id: 4,
      name: 'Salma ABD',
      profileurl: '/profiles/3.jpg',
      date: 'Oct. 17, 2024',
      content: 'AMAIZINGGGGGGG i love itt ! what about you guys ?',
      likes: 5,
      responses: [
        {
          id: 1,
          name: 'Salem Hammadi',
          profileurl: '/profiles/4.jpg',
          date: 'Dec. 31, 2024',
          content: 'love it tooo honestly ',
          likes: 2,
          responses: [],
        },
        {
          id: 2,
          name: 'Harry Smith',
          profileurl: '/profiles/7.jpg',
          date: 'Jan. 2, 2025',
          content: 'I didnt like it that much .',
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
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    this.user$.subscribe((user) => {
      console.log(this.form.value);
      this.comments.push({
        id: this.comments.length + 1,
        name: user?.name!,
        profileurl: '/profiles/4.jpg', // replace with user profile pic
        date: formattedDate,
        content: this.form.value.comment!,
        likes: 0,
        responses: [],
      });
      this.form.reset();
    });
  }
}
