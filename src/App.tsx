import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import { useFetch } from "./hooks/useFetch";
import type { CategoriesResponse } from "./types/meal";
import "./App.css";

// API endpoint for all available recipe categories.
const CATEGORIES_URL =
  "https://www.themealdb.com/api/json/v1/1/categories.php";

// Test our reusable fetching hook on the home page.
function HomePage() {
  const { data, loading, error } =
    useFetch<CategoriesResponse>(CATEGORIES_URL);

  return (
    <section>
      <h1>Discover Recipes</h1>
      <p>Explore delicious meals from around the world.</p>

      {/* Show feedback while the request is in progress. */}
      {loading && <p role="status">Loading categories...</p>}

      {/* Display errors if the request fails. */}
      {error && <p role="alert">Error: {error}</p>}

      {/* Display the returned category names. */}
      {data && (
        <>
          <h2>Recipe Categories</h2>

          <ul>
            {data.categories.map((category) => (
              <li key={category.idCategory}>
                {category.strCategory}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

// Temporary category page.
function CategoryPage() {
  return (
    <section>
      <h1>Recipe Category</h1>
      <p>Recipes from the selected category will appear here.</p>
    </section>
  );
}

// Temporary recipe detail page.
function RecipePage() {
  return (
    <section>
      <h1>Recipe Details</h1>
      <p>Ingredients and cooking instructions will appear here.</p>
    </section>
  );
}

// Temporary favorites page.
function FavoritesPage() {
  return (
    <section>
      <h1>My Favorites</h1>
      <p>Your saved recipes will appear here.</p>
    </section>
  );
}

// Temporary search results page.
function SearchPage() {
  return (
    <section>
      <h1>Search Results</h1>
      <p>Matching recipes will appear here.</p>
    </section>
  );
}

// Display a helpful message for unknown URLs.
function NotFoundPage() {
  return (
    <section>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Return Home</Link>
    </section>
  );
}

// Shared navigation.
function Navbar() {
  return (
    <nav aria-label="Main navigation">
      <Link to="/" className="brand">
        Recipe Discovery
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/favorites">
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}

// Configure the application's routes.
function AppContent() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryPage />}
          />
          <Route
            path="/recipe/:recipeId"
            element={<RecipePage />}
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

// Provide routing throughout the application.
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
