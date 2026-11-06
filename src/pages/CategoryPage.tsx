import { Link, useParams } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import { useFetch } from "../hooks/useFetch";
import type { MealSummariesResponse } from "../types/meal";

// Display recipes belonging to the selected category.
export default function CategoryPage() {
    // Read the category name from the dynamic route.
    const { categoryName } = useParams<{ categoryName: string }>();

    // Construct the API URL for the selected category.
    const url = categoryName
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
            categoryName
        )}`
        : null;

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

            {/* Reusable loading indicator. */}
            {loading && <Spinner message="Loading recipes..." />}

            {/* Reusable error display. */}
            {error && (
                <ErrorMessage message={`Unable to load recipes: ${error}`} />
            )}

            {/* Display the returned recipes. */}
            {!loading && !error && data && (
                <>
                    {data.meals && data.meals.length > 0 ? (
                        <>
                            <p className="results-count">
                                {data.meals.length} recipes found
                            </p>

                            <div className="recipe-grid">
                                {data.meals.map((meal) => (
                                    <RecipeCard key={meal.idMeal} meal={meal} />
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
