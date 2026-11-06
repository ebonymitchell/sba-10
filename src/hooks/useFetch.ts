import { useEffect, useState } from "react";

// Define the values returned by our custom hook.
interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

// Fetch data from an API and manage request state.
export function useFetch<T>(url: string | null): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Do not fetch when no URL is provided.
        if (!url) {
            return;
        }

        // Abort requests when the component unmounts or URL changes.
        const controller = new AbortController();

        async function fetchData() {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                const response = await fetch(url as string, {
                    signal: controller.signal,
                });

                // Handle unsuccessful HTTP responses.
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }

                // Parse the JSON response into our expected data type.
                const result: T = await response.json();

                if (!controller.signal.aborted) {
                    setData(result);
                }
            } catch (err) {
                // Ignore errors caused by intentionally canceled requests.
                if (controller.signal.aborted) {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "An unexpected error occurred."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        // Cancel outdated requests during cleanup.
        return () => {
            controller.abort();
        };
    }, [url]);

    return { data, loading, error };
}
