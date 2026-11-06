import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../context/FavoritesContext";
import type { Meal, MealsResponse } from "../types/meal";

// Display the recipes saved in FavoritesContext.
export default function FavoritesPage() {
    const { favoriteIds } = useFavorites();

    const [recipes, setRecipes] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Clear previous results when no favorites are saved.
        if (favoriteIds.length === 0) {
            return;
        }

        // Cancel outstanding requests if favorites change.
        const controller = new AbortController();

        async function loadFavorites() {
            setLoading(true);
            setError(null);

            try {
                // Request all saved recipes concurrently.
                const results = await Promise.all(
                    favoriteIds.map(async (id) => {
                        const response = await fetch(
                            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`,
                            { signal: controller.signal }
                        );

                        if (!response.ok) {
                            throw new Error(
                                `Unable to load recipe ${id}: ${response.status}`
                            );
                        }

                        const result: MealsResponse = await response.json();

                        return result.meals?.[0] ?? null;
                    })
                );

                // Remove missing recipes from the displayed results.
                const validRecipes = results.filter(
                    (meal): meal is Meal => meal !== null
                );

                if (!controller.signal.aborted) {
                    setRecipes(validRecipes);
                }
            } catch (err) {
                if (controller.signal.aborted) {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "Unable to load favorite recipes."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadFavorites();

        return () => {
            controller.abort();
        };
    }, [favoriteIds]);

    // Derive the visible recipes from the currently saved IDs.
    // This immediately hides a removed recipe, even before refetching.
    const visibleRecipes = recipes.filter((meal) =>
        favoriteIds.includes(meal.idMeal)
    );

    return (
        <section className="favorites-page">
            <header className="page-header">
                <h1>My Favorites</h1>
                <p>
                    Your personal collection of recipes worth making again.
                </p>
            </header>

            {/* Display a helpful message when no favorites exist. */}
            {favoriteIds.length === 0 ? (
                <div className="empty-state">
                    <h2>No Favorites Yet</h2>

                    <p>
                        You haven't saved any recipes.
                        Explore categories to discover something delicious.
                    </p>

                    <Link to="/">Browse Recipes</Link>
                </div>
            ) : (
                <>
                    {/* Display feedback while favorite recipes load. */}
                    {loading && (
                        <p role="status">Loading your favorite recipes...</p>
                    )}

                    {/* Display API errors. */}
                    {error && (
                        <p role="alert">
                            Unable to load favorites: {error}
                        </p>
                    )}

                    {/* Display successfully loaded favorite recipes. */}
                    {!loading && !error && (
                        <>
                            <p className="results-count">
                                {visibleRecipes.length} saved recipes
                            </p>

                            {visibleRecipes.length > 0 ? (
                                <div className="recipe-grid">
                                    {visibleRecipes.map((meal) => (
                                        <RecipeCard
                                            key={meal.idMeal}
                                            meal={meal}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <h2>No Recipes Available</h2>
                                    <p>
                                        Your saved recipes couldn't be found in the database.
                                    </p>
                                    <Link to="/">Browse Recipes</Link>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </section>
    );
}
