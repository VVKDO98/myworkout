import Database from "better-sqlite3";

const db = Database("workout.db");

console.log(
  db
    .prepare(
      `
    SELECT * FROM workout
    `
    )
    .all()
);
