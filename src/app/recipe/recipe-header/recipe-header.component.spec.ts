import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeHeaderComponent } from './recipe-header.component';

describe('RecipeHeaderComponent', () => {
  let component: RecipeHeaderComponent;
  let fixture: ComponentFixture<RecipeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
