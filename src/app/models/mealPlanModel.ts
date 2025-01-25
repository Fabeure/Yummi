export interface Meal {
    id: number;
    imageType: string;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
}

export interface Nutrients {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
}
export interface DayMeals {
    meals: Meal[];
    nutrients: Nutrients;
}
export interface weekDayMeal {
    day: string;
    meals: Meal[];
    nutrients: Nutrients;
}
export interface WeekMeals {
    week: weekDayMeal[];
}
export type MealsResponse =
    | { type: 'day'; data: DayMeals } 
    | { type: 'week'; data: WeekMeals };  