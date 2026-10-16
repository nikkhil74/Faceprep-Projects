import { useState } from "react";

const emptyForm = {
  title: "", category: "Dinner", time: "20", servings: "2",
  difficulty: "Easy", image: "", description: "", ingredients: "", instructions: ""
};

export default function RecipeForm({ onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const ingredients = form.ingredients.split("\n").map((item) => item.trim()).filter(Boolean);
    const instructions = form.instructions.split("\n").map((item) => item.trim()).filter(Boolean);
    if (!form.title.trim() || !form.description.trim() || ingredients.length === 0 || instructions.length === 0) {
      setError("Please add a title, description, ingredients, and instructions.");
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
}
}