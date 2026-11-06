import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    type ReactNode,
} from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

// Define the values available to components using FavoritesContext.
interface FavoritesContextValue {
    favoriteIds: string[];
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

// The context starts undefined until a provider supplies its value.
const FavoritesContext = createContext<
    FavoritesContextValue | undefined
>(undefined);

// Define the children accepted by our provider.
interface FavoritesProviderProps {
    children: ReactNode;
}

// Make favorite recipes available throughout the application.
export function FavoritesProvider({
    children,
}: FavoritesProviderProps) {
    // Store favorite recipe IDs persistently in the browser.
    const [favoriteIds, setFavoriteIds] = useLocalStorage<string[]>(
        "favoriteRecipes",
        []
    );

    // Add an ID only when it is not already saved.
    const addFavorite = useCallback(
        (id: string) => {
            setFavoriteIds((previous) =>
                previous.includes(id) ? previous : [...previous, id]
            );
        },
        [setFavoriteIds]
    );

    // Remove an ID from the saved favorites.
    const removeFavorite = useCallback(
        (id: string) => {
            setFavoriteIds((previous) =>
                previous.filter((favoriteId) => favoriteId !== id)
            );
        },
        [setFavoriteIds]
    );

    // Check whether a recipe ID is already saved.
    const isFavorite = useCallback(
        (id: string) => favoriteIds.includes(id),
        [favoriteIds]
    );

    // Group the context values into one reusable object.
    const value = useMemo(
        () => ({
            favoriteIds,
            addFavorite,
            removeFavorite,
            isFavorite,
        }),
        [favoriteIds, addFavorite, removeFavorite, isFavorite]
    );

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

// Provide a convenient, type-safe way to access FavoritesContext.
export function useFavorites(): FavoritesContextValue {
    const context = useContext(FavoritesContext);

    // Catch components accidentally rendered outside the provider.
    if (!context) {
        throw new Error(
            "useFavorites must be used within a FavoritesProvider"
        );
    }

    return context;
}
