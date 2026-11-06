import { Link, useSearchParams } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import { useFetch } from "../hooks/useFetch";
import type { MealsResponse } from "../types/meal";

// Display recipes matching the search query in the URL.
export default function SearchPage() {
    // Read the query parameter from /search?query=...
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query")?.trim() ?? "";

    // Only request recipes when the search term is not empty.
    const url = query
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
        : null;

    // Retrieve matching recipes using our existing custom hook.
    const { data, loading, error } = useFetch<MealsResponse>(url);

    const recipes = data?.meals ?? [];

    return (
        <section className="search-page">
            <header className="page-header">
                <h1>Search Recipes</h1>

                {query ? (
                    <p>
                        Showing recipes matching <strong>{query}</strong>.
                    </p>
                ) : (
                    <p>
                        Enter a recipe name in the search field above
                        to discover something delicious.
                    </p>
                )}
            </header>

            {/* Display loading feedback during the API request. */}
            {loading && (
                <p role="status">Searching for recipes...</p>
            )}

            {/* Display an error if the request fails. */}
            {error && (
                <p role="alert">
                    Unable to search recipes: {error}
                </p>
            )}

            {/* Display matching recipes or a helpful empty state. */}
            {query && !loading && !error && data && (
                <>
                    {recipes.length > 0 ? (
                        <>
                            <p className="results-count">
                                {recipes.length} recipes found
                            </p>

                            <div className="recipe-grid">
                                {recipes.map((meal) => (
                                    <RecipeCard
                                        key={meal.idMeal}
                                        meal={meal}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            <h2>No Matching Recipes</h2>

                            <p>
                                We couldn't find any recipes matching "{query}".
                                Try another search term.
                            </p>

                            <Link to="/">Browse Categories</Link>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
