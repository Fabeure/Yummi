import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { mealplanResolver } from './mealplan.resolver';

describe('mealplanResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => mealplanResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
