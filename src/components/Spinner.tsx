// Display a reusable loading indicator.
interface SpinnerProps {
    message?: string;
}

export default function Spinner({
    message = "Loading...",
}: SpinnerProps) {
    return (
        <div className="spinner-container" role="status">
            <div className="spinner" aria-hidden="true" />
            <p>{message}</p>
        </div>
    );
}
