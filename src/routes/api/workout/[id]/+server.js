import { json } from "@sveltejs/kit";
import Database from "better-sqlite3";

export function GET({ params }) {
  try {
    const db = Database("workout.db");
    const { id } = params;

    const exercise = db.prepare("SELECT * FROM workout WHERE id = ?").get(id);

    if (!exercise) {
      return json(
        { success: false, message: "Exercice non trouvé" },
        { status: 404 }
      );
    }

    return json(exercise);
  } catch (error) {
    console.error("Erreur API:", error);
    return json({ success: false, message: "Erreur serveur" }, { status: 500 });
  }
}
