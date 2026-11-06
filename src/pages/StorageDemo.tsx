import { useLocalStorage } from "../hooks/useLocalStorage";

// Temporary page for verifying persistent React state.
export default function StorageDemo() {
    const [count, setCount] = useLocalStorage<number>(
        "recipeDemoCount",
        0
    );

    return (
        <section>
            <h1>Local Storage Demo</h1>

            <p>
                This counter should remember its value after
                refreshing the browser.
            </p>

            <h2>Count: {count}</h2>

            <div className="storage-demo-actions">
                <button
                    type="button"
                    onClick={() => setCount((previous) => previous + 1)}
                >
                    Increment
                </button>

                <button
                    type="button"
                    onClick={() => setCount(0)}
                >
                    Reset
                </button>
            </div>
        </section>
    );
}
