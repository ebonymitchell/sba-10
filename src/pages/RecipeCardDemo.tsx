import RecipeCard from "../components/RecipeCard";
import type { MealSummary } from "../types/meal";

// Temporary recipe data for testing our reusable component.
const sampleMeal: MealSummary = {
    idMeal: "52772",
    strMeal: "Teriyaki Chicken Casserole",
    strMealThumb:
        "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
};

// Verify the RecipeCard component renders correctly.
export default function RecipeCardDemo() {
    return (
        <section>
            <h1>Recipe Card Preview</h1>
            <p>This page demonstrates our reusable recipe card.</p>

            <div className="recipe-grid">
                <RecipeCard meal={sampleMeal} />
            </div>
        </section>
    );
}
