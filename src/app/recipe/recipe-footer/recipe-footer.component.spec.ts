import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFooterComponent } from './recipe-footer.component';

describe('RecipeFooterComponent', () => {
  let component: RecipeFooterComponent;
  let fixture: ComponentFixture<RecipeFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
