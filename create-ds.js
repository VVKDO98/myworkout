import Database from "better-sqlite3";

const db = Database("workout.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS workout (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        selected INTEGER DEFAULT 0,
        series INTEGER,
        reps TEXT,
        weights INTEGER
    )
    `);
