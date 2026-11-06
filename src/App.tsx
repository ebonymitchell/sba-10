import { useState, type SubmitEvent } from "react";

import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import {
  FavoritesProvider,
  useFavorites,
} from "./context/FavoritesContext";

import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import RecipePage from "./pages/RecipePage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";

import "./App.css";

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

// Shared navigation with search and favorites count.
function Navbar() {
  const { favoriteIds } = useFavorites();
  const navigate = useNavigate();

  // Store the search field's current value.
  const [searchTerm, setSearchTerm] = useState("");

  // Navigate to the search results page when the form is submitted.
  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchTerm.trim();

    // Ignore empty search submissions.
    if (!query) {
      return;
    }

    navigate(`/search?query=${encodeURIComponent(query)}`);
  }

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
          Favorites ({favoriteIds.length})
        </NavLink>
      </div>

      {/* Search is available from every page. */}
      <form
        className="search-form"
        role="search"
        onSubmit={handleSearch}
      >
        <label htmlFor="recipe-search" className="visually-hidden">
          Search recipes
        </label>

        <input
          id="recipe-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search recipes..."
        />

        <button type="submit">
          Search
        </button>
      </form>
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

          <Route
            path="/favorites"
            element={<FavoritesPage />}
          />

          <Route
            path="/search"
            element={<SearchPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

// Provide routing and shared favorites state.
export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </BrowserRouter>
  );
}
