import { Component, Input, OnInit } from '@angular/core';
export interface SliderImages {
  imageSrc: string;
  title: string;
  link: string;
}
@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  standalone: true
})
export class SliderComponent implements OnInit {
  // constructor() { }
  @Input() images: SliderImages[]=[];
  currentIndex = 0;
  intervalId: any;
  ngOnInit() { }
  prevSlide() {

    this.currentIndex= this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }
  nextSlide() {

    this.currentIndex= this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
  }
  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 2000);
  }
  stopAutoSlide() {
    clearInterval(this.intervalId);
  }
}
