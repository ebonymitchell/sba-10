# Recipe Discovery App

A responsive recipe discovery application built with React, TypeScript, and TheMealDB API.

Users can browse recipes by category, search for meals, view ingredients and cooking instructions, and save their favorite recipes for later.

## Features

- Browse recipes by category
- Search for recipes by name
- View recipe details, including ingredients, measurements, and cooking instructions
- Access cooking videos and original recipe sources when available
- Add and remove favorite recipes
- Save favorites between browser sessions using localStorage
- Navigate between pages using React Router
- Display loading indicators, error messages, and empty states
- Responsive layouts for desktop, tablet, and mobile devices

## Technologies Used

- **React** – Builds the user interface using reusable components
- **TypeScript** – Provides type checking for components, hooks, and API data
- **Vite** – Development server and build tool
- **React Router** – Handles navigation and dynamic routes
- **Context API** – Manages shared favorites state
- **React Hooks** – Manages component state, side effects, and reusable logic
- **CSS** – Styles the application and supports responsive layouts
- **TheMealDB API** – Provides recipe categories, meal information, and search results
- **Git and GitHub** – Version control and repository hosting

## API

Recipe data is provided by [TheMealDB](https://www.themealdb.com/api.php).

The application uses the API to retrieve recipe categories, recipes within a selected category, individual recipe details, and search results.

## Custom Hooks

The application uses two custom React hooks to manage API requests and persistent browser storage. Both hooks use TypeScript generics to support different data types.

### useFetch

The `useFetch` hook handles API requests and manages the returned data, loading state, and errors.

It uses React's `useState` and `useEffect` hooks to manage asynchronous requests. It also uses `AbortController` to cancel unfinished API requests during effect cleanup, such as when a component unmounts or the request URL changes.

Using this hook across multiple pages reduces repeated fetching logic and keeps page components focused on displaying recipe information.

### useLocalStorage

The `useLocalStorage` hook manages React state that is saved in the browser's localStorage.

It initializes state from previously saved data when available and updates localStorage when the state changes.

The application uses this hook to preserve favorite recipe IDs between browser sessions.

## Context API

The application uses `FavoritesContext` to manage favorite recipes across multiple components.

The context provides four values and functions:

- `favoriteIds` – Stores the IDs of saved recipes
- `addFavorite` – Adds a recipe to favorites
- `removeFavorite` – Removes a recipe from favorites
- `isFavorite` – Checks whether a recipe has been saved

Using Context API allows components to access shared favorites state without passing props through multiple levels of the component tree.

## Application Routes

| Route | Description |
|---|---|
| `/` | Browse recipe categories |
| `/category/:categoryName` | View recipes in a selected category |
| `/recipe/:recipeId` | View individual recipe details |
| `/favorites` | View saved favorite recipes |
| `/search?query=...` | View recipe search results |

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/ebonymitchell/sba-10.git
```

**2. Navigate into the project**

```bash
cd sba-10
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in the terminal to view the application.

## Production Build

To create a production build, run:

```bash
npm run build
```

## Reflection

### Biggest Challenge

One of the biggest challenges was coordinating API requests, routing, and shared application state.

Different pages needed different API endpoints, and each request required handling loading states, errors, and missing results. I also needed to make sure the correct recipe information appeared when navigating between categories, individual recipes, and search results.

Creating the `useFetch` hook helped organize the fetching logic and reduced the amount of repeated code across components.

### Design Decision

I chose to use React Context and a custom `useLocalStorage` hook to manage favorite recipes.

Context allows different components to access the same favorites state, while localStorage keeps saved recipes available after the browser is refreshed or reopened.

Separating favorites management from browser storage also makes the code easier to maintain and reuse.

## Future Improvements

- Add filtering by cuisine
- Add recipe sorting options
- Allow users to organize saved recipes
- Improve recipe search suggestions
- Add automated tests for components and custom hooks

## Author

[Ebony Mitchell](https://github.com/ebonymitchell)