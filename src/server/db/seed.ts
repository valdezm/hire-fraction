import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import fs from "fs";
import path from "path";
import { baseBallPlayers } from "./schema";

const pool = new Pool({
  user: "postgres",
  host: "10.0.0.218",
  database: "jstack",
  password: "password",
  port: 5432,
});

const db = drizzle(pool);

async function seed() {
  const dataPath = path.join(__dirname, "data.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  for (const player of data) {
    await db.insert(baseBallPlayers).values({
      playerName: player["Player name"],
      position: player["position"],
      games: player["Games"],
      atBat: player["At-bat"],
      runs: player["Runs"],
      hits: player["Hits"],
      double: player["Double (2B)"],
      thirdBaseman: player["third baseman"],
      homeRun: player["home run"],
      runBattedIn: player["run batted in"],
      walk: player["a walk"],
      strikeouts: player["Strikeouts"],
      stolenBase: player["stolen base"],
      caughtStealing: player["Caught stealing"],
      avg: player["AVG"],
      onBasePercentage: player["On-base Percentage"],
      sluggingPercentage: player["Slugging Percentage"],
      onBasePlusSlugging: player["On-base Plus Slugging"],
    });
  }

  console.log("Database seeded successfully");
  pool.end();
}

seed().catch((err) => {
  console.error("Error seeding database:", err);
  pool.end();
});
