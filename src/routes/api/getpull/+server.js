import { json } from "@sveltejs/kit";
import Database from "better-sqlite3";

export function GET() {
  const db = Database("workout.db");

  return json(
    db
      .prepare(
        `
    SELECT * FROM workout WHERE category LIKE 'Pull'
    `
      )
      .all()
  );
}
