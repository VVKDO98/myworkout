import Database from "better-sqlite3";

const db = Database("workout.db");

db.exec(`
    INSERT INTO workout (name) VALUES ('Développé couché avec barre');
    `);
