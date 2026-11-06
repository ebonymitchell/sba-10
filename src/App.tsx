import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";

// Temporary home page.
// Later, this will display recipe categories from TheMealDB.
function HomePage() {
  return (
    <section>
      <h1>Discover Recipes</h1>
      <p>Explore delicious meals from around the world.</p>
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

// Shared navigation appears on every page.
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

// Configure the application's routes and shared layout.
function AppContent() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Dynamic category route */}
          <Route
            path="/category/:categoryName"
            element={<CategoryPage />}
          />

          {/* Dynamic recipe detail route */}
          <Route
            path="/recipe/:recipeId"
            element={<RecipePage />}
          />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />

          {/* Handle unknown routes */}
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
