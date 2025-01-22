import { Directive, ElementRef, EventEmitter, Output, OnDestroy, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements AfterViewInit, OnDestroy {
  @Output() lazyLoad = new EventEmitter<void>();

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.lazyLoad.emit();
            this.observer?.disconnect(); // Disconnect after emitting
          }
        });
      });
      this.observer.observe(this.el.nativeElement);
    } else {
      // console.warn('IntersectionObserver is not supported in this environment.');
      // // Emit immediately as a fallback
      // this.lazyLoad.emit();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null; // Cleanup
    }
  }
}
