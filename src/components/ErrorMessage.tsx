// Display a consistent error message throughout the application.
interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({
    message,
}: ErrorMessageProps) {
    return (
        <div className="error-message" role="alert">
            <h2>Something Went Wrong</h2>
            <p>{message}</p>
        </div>
    );
}
