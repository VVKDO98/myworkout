import { json } from "@sveltejs/kit";
import Database from "better-sqlite3";

export async function PUT({ request }) {
  try {
    const db = Database("workout.db");
    const { id, name, category, selected, series, reps, weights } =
      await request.json();

    // Vérifier si l'ID est valide
    if (!id) {
      return json({ success: false, message: "ID manquant" }, { status: 400 });
    }

    // Mettre à jour l'exercice
    const stmt = db.prepare(`
            UPDATE workout 
            SET name = ?, category = ?, selected = ?, series = ?, reps = ?, weights = ? 
            WHERE id = ?
        `);
    const result = stmt.run(
      name,
      category,
      selected ? 1 : 0,
      series,
      reps,
      weights,
      id
    );

    if (result.changes === 0) {
      return json(
        { success: false, message: "Exercice non trouvé" },
        { status: 404 }
      );
    }

    return json({ success: true, message: "Exercice mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur API:", error);
    return json({ success: false, message: "Erreur serveur" }, { status: 500 });
  }
}
