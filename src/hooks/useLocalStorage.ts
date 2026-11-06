import { useEffect, useState } from "react";

// Keep React state synchronized with browser localStorage.
export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    // Read the saved value when initializing state.
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const savedValue = window.localStorage.getItem(key);

            // Restore saved JSON or use the supplied initial value.
            return savedValue !== null
                ? (JSON.parse(savedValue) as T)
                : initialValue;
        } catch (error) {
            // Invalid JSON or unavailable storage should not crash the app.
            console.error("Unable to read localStorage:", error);
            return initialValue;
        }
    });

    // Save the current value whenever it changes.
    useEffect(() => {
        try {
            window.localStorage.setItem(
                key,
                JSON.stringify(storedValue)
            );
        } catch (error) {
            console.error("Unable to save localStorage:", error);
        }
    }, [key, storedValue]);

    // Return the state value and its setter, just like useState.
    return [storedValue, setStoredValue];
}
