import { Link } from "react-router-dom";

import type { MealSummary } from "../types/meal";

// Define the data required to display a recipe card.
interface RecipeCardProps {
    meal: MealSummary;
}

// Display a reusable recipe preview with a link to its detail page.
export default function RecipeCard({ meal }: RecipeCardProps) {
    return (
        <article className="recipe-card">
            <Link
                to={`/recipe/${encodeURIComponent(meal.idMeal)}`}
                className="recipe-card-link"
            >
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    loading="lazy"
                />

                <div className="recipe-card-content">
                    <h3>{meal.strMeal}</h3>

                    <span className="recipe-card-action">
                        View Recipe
                    </span>
                </div>
            </Link>
        </article>
    );
}
