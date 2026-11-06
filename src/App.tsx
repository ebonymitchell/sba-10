import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import RecipePage from "./pages/RecipePage";

import "./App.css";

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

// Provide routing throughout the application.
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
