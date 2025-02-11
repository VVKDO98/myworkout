import { json } from "@sveltejs/kit";
import Database from "better-sqlite3";

export async function POST({ request }) {
  try {
    const db = Database("workout.db");
    const { name, category, selected, series, reps, weights } =
      await request.json();

    // Insérer dans la base de données
    const stmt = db.prepare(`
            INSERT INTO workout (name, category, selected, series, reps, weights) 
            VALUES (?, ?, ?, ?, ?, ?)
        `);
    stmt.run(name, category, selected ? 1 : 0, series, reps, weights);

    return json({ success: true, message: "Exercice ajouté avec succès" });
  } catch (error) {
    console.error("Erreur API:", error);
    return json({ success: false, message: "Erreur serveur" }, { status: 500 });
  }
}
