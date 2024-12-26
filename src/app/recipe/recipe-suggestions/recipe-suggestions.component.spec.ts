import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSuggestionsComponent } from './recipe-suggestions.component';

describe('RecipeSuggestionsComponent', () => {
  let component: RecipeSuggestionsComponent;
  let fixture: ComponentFixture<RecipeSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeSuggestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
