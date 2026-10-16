import { useState } from "react";

const emptyForm = {
  title: "",
  category: "Dinner",
  time: "20",
  servings: "2",
  difficulty: "Easy",
  image: "",
  description: "",
  ingredients: "",
  instructions: "",
};

export default function RecipeForm({ onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const update = (e) =>
    setForm((curr) => ({ ...curr, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredients = form.ingredients
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean);
    const instructions = form.instructions
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean);

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      ingredients.length === 0 ||
      instructions.length === 0
    ) {
      setError("Please fill in title, description, ingredients, and instructions.");
      return;
    }

    setError("");
    onSubmit({
      ...form,
      title: form.title.trim(),
      time: Math.max(1, Number(form.time) || 1),
      servings: Math.max(1, Number(form.servings) || 1),
      ingredients,
      instructions,
    });
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="title">Recipe Title *</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Creamy Garlic Pasta"
          value={form.title}
          onChange={update}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={update}>
            {["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Drinks"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" name="difficulty" value={form.difficulty} onChange={update}>
            {["Easy", "Medium", "Hard"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="time">Cook Time (minutes)</label>
          <input id="time" name="time" type="number" min="1" value={form.time} onChange={update} />
        </div>
        <div className="form-group">
          <label htmlFor="servings">Servings</label>
          <input id="servings" name="servings" type="number" min="1" value={form.servings} onChange={update} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL (optional)</label>
        <input
          id="image"
          name="image"
          type="url"
          placeholder="https://..."
          value={form.image}
          onChange={update}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          placeholder="A short description of the dish..."
          rows={3}
          value={form.description}
          onChange={update}
        />
      </div>

      <div className="form-group">
        <label htmlFor="ingredients">Ingredients *</label>
        <textarea
          id="ingredients"
          name="ingredients"
          placeholder={"200g pasta\n3 garlic cloves\n1/2 cup cream"}
          rows={5}
          value={form.ingredients}
          onChange={update}
        />
        <span className="form-hint">One ingredient per line</span>
      </div>

      <div className="form-group">
        <label htmlFor="instructions">Instructions *</label>
        <textarea
          id="instructions"
          name="instructions"
          placeholder={"Boil water and cook pasta.\nSauté garlic in butter.\nCombine and serve."}
          rows={6}
          value={form.instructions}
          onChange={update}
        />
        <span className="form-hint">One step per line</span>
      </div>

      <button type="submit" className="submit-button">
        🍳 Save Recipe
      </button>
    </form>
  );
}
