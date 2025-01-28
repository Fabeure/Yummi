import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MealsResponse } from '../models/mealPlanModel';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../services/recipe.service';


@Injectable({
  providedIn: 'root',
})
export class MealPlanResolver implements Resolve<MealsResponse> {
  constructor(private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<MealsResponse> {
    const form = route.queryParams;
    let params = new HttpParams()
      .append('apiKey', environment.apiKey)
      .append('timeFrame', form['timeFrame'] || 'day') 
    if(form['targetCalories']){
      params = params.append('targetCalories', form['targetCalories']);
    }
    if (form['diet']) {
      params = params.append('diet', form['diet']);
      console.log("diettt",form['diet']);
    }
    if (form['exclude']) {
      params = params.append('exclude', form['exclude']);
    }
    return this.recipeService.getMealPlan(params, (form['timeFrame'] || 'day'))
  }
}