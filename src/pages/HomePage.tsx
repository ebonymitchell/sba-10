import { Link } from "react-router-dom";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFetch } from "../hooks/useFetch";
import type { CategoriesResponse } from "../types/meal";

// TheMealDB endpoint for all recipe categories.
const CATEGORIES_URL =
    "https://www.themealdb.com/api/json/v1/1/categories.php";

// Display recipe categories fetched from the API.
export default function HomePage() {
    const { data, loading, error } =
        useFetch<CategoriesResponse>(CATEGORIES_URL);

    return (
        <section className="home-page">
            <header className="page-header">
                <h1>Discover Recipes</h1>
                <p>
                    Explore delicious meals from around the world.
                    Choose a category to find your next favorite dish.
                </p>
            </header>

            {/* Display our reusable loading indicator. */}
            {loading && (
                <Spinner message="Loading recipe categories..." />
            )}

            {/* Display our reusable error component. */}
            {error && (
                <ErrorMessage
                    message={`Unable to load recipe categories: ${error}`}
                />
            )}

            {/* Display the categories when data is available. */}
            {!loading && !error && data && (
                <>
                    <h2>Browse by Category</h2>

                    {data.categories.length === 0 ? (
                        <p>No recipe categories are available.</p>
                    ) : (
                        <div className="category-grid">
                            {data.categories.map((category) => (
                                <Link
                                    key={category.idCategory}
                                    to={`/category/${encodeURIComponent(
                                        category.strCategory
                                    )}`}
                                    className="category-card"
                                >
                                    <img
                                        src={category.strCategoryThumb}
                                        alt={category.strCategory}
                                        loading="lazy"
                                    />

                                    <div className="category-content">
                                        <h3>{category.strCategory}</h3>

                                        <p>
                                            {category.strCategoryDescription.length > 120
                                                ? `${category.strCategoryDescription
                                                    .slice(0, 120)
                                                    .trimEnd()}...`
                                                : category.strCategoryDescription}
                                        </p>

                                        <span className="category-link">
                                            Explore Recipes
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
