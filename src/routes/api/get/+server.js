import { json } from "@sveltejs/kit";
import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL, // Définie dans Vercel ou .env
  authToken: process.env.TURSO_AUTH_TOKEN, // Si nécessaire
});

export async function GET() {
  try {
    const { rows } = await db.execute("SELECT * FROM workout");
    return json(rows);
  } catch (error) {
    console.error("Erreur API:", error);
    return json({ success: false, message: "Erreur serveur" }, { status: 500 });
  }
}
