import { Link, useParams } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";
import { getIngredients } from "../types/meal";
import type { MealsResponse } from "../types/meal";

// Display the complete details of the recipe selected in the URL.
export default function RecipePage() {
    // Read the dynamic recipe ID from /recipe/:recipeId.
    const { recipeId } = useParams<{ recipeId: string }>();

    // Build the API URL for the selected recipe.
    const url = recipeId
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
            recipeId
        )}`
        : null;

    // Fetch the recipe using our reusable custom hook.
    const { data, loading, error } = useFetch<MealsResponse>(url);

    // The lookup endpoint returns an array, even for one recipe.
    const meal = data?.meals?.[0];

    // Convert numbered ingredient fields into a usable array.
    const ingredients = meal ? getIngredients(meal) : [];

    return (
        <section className="recipe-page">
            <Link to="/" className="back-link">
                Back to Categories
            </Link>

            {/* Display feedback while the request is loading. */}
            {loading && <p role="status">Loading recipe details...</p>}

            {/* Display errors without crashing the page. */}
            {error && (
                <p role="alert">
                    Unable to load recipe details: {error}
                </p>
            )}

            {/* Handle recipes that do not exist. */}
            {!loading && !error && data && !meal && (
                <div className="empty-state">
                    <h1>Recipe Not Found</h1>
                    <p>We couldn't find the recipe you're looking for.</p>
                    <Link to="/">Browse Categories</Link>
                </div>
            )}

            {/* Display the complete recipe when available. */}
            {!loading && !error && meal && (
                <article className="recipe-details">
                    <header className="recipe-header">
                        <h1>{meal.strMeal}</h1>

                        <div className="recipe-meta">
                            {meal.strCategory && (
                                <span>Category: {meal.strCategory}</span>
                            )}

                            {meal.strArea && (
                                <span>Cuisine: {meal.strArea}</span>
                            )}
                        </div>
                    </header>

                    <img
                        className="recipe-hero-image"
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                    />

                    <div className="recipe-details-grid">
                        {/* Display each ingredient with its measurement. */}
                        <section className="ingredients-section">
                            <h2>Ingredients</h2>

                            {ingredients.length > 0 ? (
                                <ul className="ingredients-list">
                                    {ingredients.map((ingredient, index) => (
                                        <li key={`${ingredient.name}-${index}`}>
                                            <span>{ingredient.name}</span>
                                            <span>{ingredient.measure}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No ingredients are available.</p>
                            )}
                        </section>

                        {/* Display the recipe's cooking instructions. */}
                        <section className="instructions-section">
                            <h2>Instructions</h2>

                            {meal.strInstructions ? (
                                <div className="recipe-instructions">
                                    {meal.strInstructions
                                        .split(/\r?\n/)
                                        .filter((paragraph) => paragraph.trim())
                                        .map((paragraph, index) => (
                                            <p key={index}>{paragraph.trim()}</p>
                                        ))}
                                </div>
                            ) : (
                                <p>No cooking instructions are available.</p>
                            )}
                        </section>
                    </div>

                    {/* Display optional external recipe resources. */}
                    {(meal.strYoutube || meal.strSource) && (
                        <section className="recipe-resources">
                            <h2>Additional Resources</h2>

                            <div className="resource-links">
                                {meal.strYoutube && (
                                    <a
                                        href={meal.strYoutube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Watch Cooking Video
                                    </a>
                                )}

                                {meal.strSource && (
                                    <a
                                        href={meal.strSource}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Original Recipe
                                    </a>
                                )}
                            </div>
                        </section>
                    )}
                </article>
            )}
        </section>
    );
}
