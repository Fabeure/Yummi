import { HeaderComponent } from '../../shared/header/header.component';
import { Component, signal } from '@angular/core';
import { MealPlanCardComponent } from '../../components/meal-plan-card/meal-plan-card.component';
import { MealCardComponent } from "../../components/meal-card/meal-card.component";
import { SliderComponent } from '../../components/slider/slider.component';
import { SliderImages } from '../../components/slider/slider.component';

@Component({
  selector: 'app-home',
  imports: [MealPlanCardComponent, MealCardComponent, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent {
  MealPlans = signal([
    {
      title: 'How can i manage my weight with balanced meals',
      recipes: '156 recipes',
      image: 'mealplans1.jpg',
    },
    {
      title: 'Nutrient Ninja: Sneaking Superfoods into Every Bite',
      recipes: '156 recipes',
      image: 'mealplans2.jpg',
    },
    {
      title: 'Prep Like a Pro: Saving Time, One Meal at a Time',
      recipes: '156 recipes',
      image: 'mealplans3.jpg',
    },
    {
      title: "Budget Bites: Delicious Meals that Won't Break the Bank",
      recipes: '156 recipes',
      image: 'mealplans4.jpg',
    },
    {
      title: 'Protein Power-Up: Fueling Gainswith Flavor',
      recipes: '156 recipes',
      image: 'mealplans5.jpg',
    },
    {
      title: 'Family Feast Frenzy: Meals to Keep Everyone Smiling',
      recipes: '156 recipes',
      image: 'mealplans6.png',
    },
  ]);
  Meals = signal([
    {
      title: 'Delicious Fancy Glazed Bleuberry',
      username: 'Sobsob',
      image: 'mealplans1.jpg',
      userImage: 'profile.jpg',
      date: 'yesterday',
      comments: '12',
    },
    {
      title: 'Delicious Fancy Glazed Bleuberry',
      username: 'Sobsob',
      image: 'mealplans1.jpg',
      userImage: 'profile.jpg',
      date: 'yesterday',
      comments: '12',
    },
    {
      title: 'Delicious Fancy Glazed Bleuberry',
      username: 'Sobsob',
      image: 'mealplans1.jpg',
      userImage: 'profile.jpg',
      date: 'yesterday',
      comments: '12',
    },
    {
      title: 'Delicious Fancy Glazed Bleuberry',
      username: 'Sobsob',
      image: 'mealplans1.jpg',
      userImage: 'profile.jpg',
      date: 'yesterday',
      comments: '12',
    },
    {
      title: 'Delicious Fancy Glazed Bleuberry',
      username: 'Sobsob',
      image: 'mealplans1.jpg',
      userImage: 'profile.jpg',
      date: 'yesterday',
      comments: '12',
    },
    {
      title: 'Delicious Fancy Glazed Bleuberry',
      username: 'Sobsob',
      image: 'mealplans1.jpg',
      userImage: 'profile.jpg',
      date: 'yesterday',
      comments: '12',
    },
  ]);
  images: SliderImages[] = [
    {
      imageSrc: 'slider/applepie.jpg',
      title: 'Cinnamon Apple Loaded Tart',
      link: '#',
    },
    {
      imageSrc: '/slider/breakfast.jpeg',
      title: 'Cinnamon Apple Loaded Tart',
      link: '#',
    },
    {
      imageSrc: '/slider/cheesecake.webp',
      title: 'Cinnamon Apple Loaded Tart',
      link: '#',
    },
  ];
}
