import { HeaderComponent } from '../../shared/header/header.component';
import { Component, signal } from '@angular/core';
import { MealPlanCardComponent } from '../../components/meal-plan-card/meal-plan-card.component';
import { MealCardComponent } from "../../components/meal-card/meal-card.component";
import { SliderComponent } from '../../components/slider/slider.component';
import { SliderImages } from '../../components/slider/slider.component';
import { CategoryComponent } from '../../components/category/category.component';

@Component({
  selector: 'app-home',
  imports: [MealPlanCardComponent, MealCardComponent, SliderComponent, CategoryComponent],
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
      imageSrc: '/slider/cake.jpg',
      title: 'Birthday Cakes',
      link: '#',
    },
    {
      imageSrc: '/slider/macron.jpg',
      title: 'macaron',
      link: '#',
    },
    {
      imageSrc: '/slider/cookies.jpg',
      title: 'cookies',
      link: '#',
    }, 
    {
      imageSrc: '/slider/healthy_salad.jpg',
      title: 'healthy salad',
      link: '#',
    },
    {
      imageSrc: '/slider/healthy.jpg',
      title: 'Healthy Bowl',
      link: '#',
    },
    {
      imageSrc: '/slider/dessert.jpg',
      title: 'Appetizer Board',
      link: '#',
    },
  ];
  categories = [
    { name: 'Pizza', image: 'categories/pizza.jpg' },
    { name: 'Pasta', image: 'categories/pasta.jpg' },
    { name: 'Smoothie', image: 'categories/smoothie.webp' },
    { name: 'Vegan', image: 'categories/vegan.jpg' },
    { name: 'Dessert', image: 'categories/dessert.jpg' }
  ];
}
