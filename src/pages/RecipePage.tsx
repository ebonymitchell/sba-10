import { Link, useParams } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import { useFavorites } from "../context/FavoritesContext";
import { useFetch } from "../hooks/useFetch";
import { getIngredients } from "../types/meal";
import type { MealsResponse } from "../types/meal";

// Display the complete details of the selected recipe.
export default function RecipePage() {
    // Read the recipe ID from the current URL.
    const { recipeId } = useParams<{ recipeId: string }>();

    // Access shared favorites state and actions.
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    // Build the API request URL using the selected recipe ID.
    const url = recipeId
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
            recipeId
        )}`
        : null;

    // Retrieve the selected recipe.
    const { data, loading, error } = useFetch<MealsResponse>(url);

    // The lookup endpoint returns an array containing one recipe.
    const meal = data?.meals?.[0];

    // Convert numbered ingredient fields into an array.
    const ingredients = meal ? getIngredients(meal) : [];

    // Check whether the current recipe is already a favorite.
    const saved = meal ? isFavorite(meal.idMeal) : false;

    // Add or remove the recipe depending on its current status.
    function handleFavoriteToggle() {
        if (!meal) {
            return;
        }

        if (saved) {
            removeFavorite(meal.idMeal);
        } else {
            addFavorite(meal.idMeal);
        }
    }

    return (
        <section className="recipe-page">
            <Link to="/" className="back-link">
                Back to Categories
            </Link>

            {/* Display the reusable loading indicator. */}
            {loading && (
                <Spinner message="Loading recipe details..." />
            )}

            {/* Display an error if the API request fails. */}
            {error && (
                <ErrorMessage
                    message={`Unable to load recipe details: ${error}`}
                />
            )}

            {/* Handle a recipe ID that does not exist. */}
            {!loading && !error && data && !meal && (
                <div className="empty-state">
                    <h1>Recipe Not Found</h1>
                    <p>We couldn't find the recipe you're looking for.</p>
                    <Link to="/">Browse Categories</Link>
                </div>
            )}

            {/* Display recipe information when available. */}
            {!loading && !error && meal && (
                <article className="recipe-details">
                    <header className="recipe-header">
                        <div className="recipe-title-row">
                            <h1>{meal.strMeal}</h1>

                            {/* Toggle this recipe's favorite status. */}
                            <button
                                type="button"
                                className={`favorite-button ${saved ? "is-favorite" : ""
                                    }`}
                                onClick={handleFavoriteToggle}
                                aria-pressed={saved}
                            >
                                {saved
                                    ? "Remove from Favorites"
                                    : "Add to Favorites"}
                            </button>
                        </div>

                        <div className="recipe-meta">
                            {meal.strCategory && (
                                <span>Category: {meal.strCategory}</span>
                            )}

                            {meal.strArea && (
                                <span>Cuisine: {meal.strArea}</span>
                            )}
                        </div>
                    </header>

                    {/* Display the recipe's main image. */}
                    <img
                        className="recipe-hero-image"
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                    />

                    <div className="recipe-details-grid">
                        {/* Display ingredients and measurements. */}
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

                        {/* Display cooking instructions. */}
                        <section className="instructions-section">
                            <h2>Instructions</h2>

                            {meal.strInstructions ? (
                                <div className="recipe-instructions">
                                    {meal.strInstructions
                                        .split(/\r?\n/)
                                        .filter((paragraph) => paragraph.trim())
                                        .map((paragraph, index) => (
                                            <p key={index}>
                                                {paragraph.trim()}
                                            </p>
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
