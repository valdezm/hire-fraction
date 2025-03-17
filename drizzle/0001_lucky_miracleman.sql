CREATE TABLE "baseBallPlayers" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_name" text NOT NULL,
	"position" text NOT NULL,
	"games" integer NOT NULL,
	"at_bat" integer NOT NULL,
	"runs" integer NOT NULL,
	"hits" integer NOT NULL,
	"double_2b" integer NOT NULL,
	"third_baseman" integer NOT NULL,
	"home_run" integer NOT NULL,
	"run_batted_in" integer NOT NULL,
	"a_walk" integer NOT NULL,
	"strikeouts" integer NOT NULL,
	"stolen_base" integer NOT NULL,
	"caught_stealing" integer NOT NULL,
	"avg" numeric NOT NULL,
	"on_base_percentage" numeric NOT NULL,
	"slugging_percentage" numeric NOT NULL,
	"on_base_plus_slugging" numeric NOT NULL
);
--> statement-breakpoint
CREATE INDEX "BaseBallPlayer_name_idx" ON "baseBallPlayers" USING btree ("player_name");