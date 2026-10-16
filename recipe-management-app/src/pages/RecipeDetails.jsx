import { useNavigate, useParams, Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, toggleFavorite, isFavorite, deleteRecipe } = useRecipes();

  const recipe = recipes.find((r) => r.id === id);
  const favorite = isFavorite(id);

  if (!recipe) {
    return (
      <div className="details-page">
        <div className="empty-state" style={{ paddingTop: 80 }}>
          <div className="empty-state-icon">🍽️</div>
          <h3>Recipe not found</h3>
          <p>This recipe may have been deleted or doesn't exist.</p>
          <Link to="/" className="button button-primary">Back to recipes</Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Delete "${recipe.title}"? This cannot be undone.`)) {
      deleteRecipe(id);
      navigate("/");
    }
  };

  return (
    <div className="details-page">
      <Link to="/" className="back-link">← Back to recipes</Link>

      <div className="details-hero">
        <div className="details-image">
          <img
            src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"}
            alt={recipe.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
            }}
          />
        </div>

        <div className="details-info">
          <span className="eyebrow">{recipe.category}</span>
          <h1>{recipe.title}</h1>

          <div className="details-badges">
            <span className="badge">⏱️ {recipe.time} min</span>
            <span className="badge">🍽️ {recipe.servings} servings</span>
            <span className="badge">📊 {recipe.difficulty}</span>
          </div>

          <p className="details-description">{recipe.description}</p>

          <div className="details-actions">
            <button
              className={`fav-button ${favorite ? "is-fav" : ""}`}
              onClick={() => toggleFavorite(id)}
            >
              {favorite ? "❤️ Remove from favorites" : "🤍 Add to favorites"}
            </button>
            <button className="delete-button" onClick={handleDelete}>
              🗑️ Delete recipe
            </button>
          </div>
        </div>
      </div>

      <div className="details-body">
        {/* Ingredients */}
        <div>
          <h2 className="section-title">Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((item, i) => (
              <li key={i}>
                <span className="ingredient-dot" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="section-title">Instructions</h2>
          <ol className="instructions-list">
            {recipe.instructions.map((step, i) => (
              <li key={i}>
                <span className="step-number">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
