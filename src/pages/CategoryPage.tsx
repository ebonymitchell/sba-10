import { Link, useParams } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import { useFetch } from "../hooks/useFetch";
import type { MealSummariesResponse } from "../types/meal";

// Display recipes belonging to the category in the URL.
export default function CategoryPage() {
    // Read the dynamic :categoryName route parameter.
    const { categoryName } = useParams<{ categoryName: string }>();

    // Build the API URL using the selected category.
    // Passing null prevents requests when the parameter is missing.
    const url = categoryName
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
            categoryName
        )}`
        : null;

    // Fetch recipes using our reusable generic hook.
    const { data, loading, error } =
        useFetch<MealSummariesResponse>(url);

    return (
        <section className="category-page">
            <header className="page-header">
                <Link to="/" className="back-link">
                    Back to Categories
                </Link>

                <h1>{categoryName ?? "Unknown Category"} Recipes</h1>

                <p>
                    Explore recipes in this category and discover
                    something delicious to make.
                </p>
            </header>

            {/* Inform users while the request is loading. */}
            {loading && (
                <p role="status">Loading recipes...</p>
            )}

            {/* Display an error if the API request fails. */}
            {error && (
                <p role="alert">
                    Unable to load recipes: {error}
                </p>
            )}

            {/* Display recipes after the request completes. */}
            {!loading && !error && data && (
                <>
                    {data.meals && data.meals.length > 0 ? (
                        <>
                            <p className="results-count">
                                {data.meals.length} recipes found
                            </p>

                            <div className="recipe-grid">
                                {data.meals.map((meal) => (
                                    <RecipeCard
                                        key={meal.idMeal}
                                        meal={meal}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            <h2>No Recipes Found</h2>

                            <p>
                                We couldn't find any recipes in this category.
                            </p>

                            <Link to="/">Browse Other Categories</Link>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
