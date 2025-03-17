import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const baseBallPlayers = pgTable(
  "baseBallPlayers",
  {
    id: serial("id").primaryKey(),
    playerName: text("player_name").notNull(),
    position: text("position").notNull(),
    games: integer("games").notNull(),
    atBat: integer("at_bat").notNull(),
    runs: integer("runs").notNull(),
    hits: integer("hits").notNull(),
    double: integer("double_2b").notNull(),
    thirdBaseman: integer("third_baseman").notNull(),
    homeRun: integer("home_run").notNull(),
    runBattedIn: integer("run_batted_in").notNull(),
    walk: integer("a_walk").notNull(),
    strikeouts: integer("strikeouts").notNull(),
    stolenBase: integer("stolen_base").notNull(),
    caughtStealing: integer("caught_stealing").notNull(),
    avg: numeric("avg").notNull(),
    onBasePercentage: numeric("on_base_percentage").notNull(),
    sluggingPercentage: numeric("slugging_percentage").notNull(),
    onBasePlusSlugging: numeric("on_base_plus_slugging").notNull(),
  },
  (table) => [index("BaseBallPlayer_name_idx").on(table.playerName)]
);

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [index("Post_name_idx").on(table.name)]
);
