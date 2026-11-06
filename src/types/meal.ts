/*
 * TypeScript models for TheMealDB API.
 * These interfaces describe the data returned by API requests.
 */

// A recipe category displayed on the home page.
export interface MealCategory {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

// A simplified recipe returned when filtering by category.
export interface MealSummary {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

// A complete recipe returned by the lookup and search endpoints.
export interface Meal extends MealSummary {
    strCategory: string | null;
    strArea: string | null;
    strInstructions: string | null;
    strTags: string | null;
    strYoutube: string | null;
    strSource: string | null;

    // TheMealDB stores ingredients and measurements
    // in numbered properties rather than an array.
    [key: `strIngredient${number}`]: string | null;
    [key: `strMeasure${number}`]: string | null;
}

// API response containing recipe categories.
export interface CategoriesResponse {
    categories: MealCategory[];
}

// API response containing filtered recipe summaries.
export interface MealSummariesResponse {
    meals: MealSummary[] | null;
}

// API response containing complete recipe details.
export interface MealsResponse {
    meals: Meal[] | null;
}

// A normalized ingredient and its corresponding measurement.
export interface Ingredient {
    name: string;
    measure: string;
}

/*
 * Convert TheMealDB's numbered ingredient properties
 * into an array that is easier to display in React.
 */
export function getIngredients(meal: Meal): Ingredient[] {
    const ingredients: Ingredient[] = [];

    // TheMealDB supports up to 20 ingredient fields.
    for (let index = 1; index <= 20; index++) {
        const name = meal[`strIngredient${index}`]?.trim();
        const measure = meal[`strMeasure${index}`]?.trim() ?? "";

        // Ignore empty ingredient fields.
        if (name) {
            ingredients.push({
                name,
                measure,
            });
        }
    }

    return ingredients;
}
