import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MealsResponse } from '../models/mealPlanModel';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class MealPlanResolver implements Resolve<MealsResponse> {
  constructor(private http: HttpClient) { }

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
    return this.http.get<MealsResponse>(
      'https://api.spoonacular.com/mealplanner/generate',
      { params }).pipe(
    map((response) => {
      return this.transformResponse(response,form['timeFrame']);
    })
  );
  }
 
  private transformResponse(apiResponse: any, timeFrame: string): MealsResponse {
    if (timeFrame === 'week') {
      const week: any[] = Object.keys(apiResponse.week).map((dayKey: string) => {
        const day = apiResponse.week[dayKey]; 
        if (!day.meals || day.meals.length === 0) {
          console.error(`Aucun repas trouvé pour ${dayKey}`);
        } else {
          day.meals = [...new Set(day.meals.map((meal: any) => meal.id))].map(
            (id: any) => day.meals.find((meal: any) => meal.id === id)
          );
        }
        return {
          day: dayKey,
          meals: day.meals,
          nutrients: day.nutrients,
        };
      });
      return {
        type: 'week',
        data: { week },
      }
    }
      else {
      return {
        type: 'day',
        data: {
          meals: apiResponse.meals,
          nutrients: apiResponse.nutrients,
        }
      };
      }
  }
}


