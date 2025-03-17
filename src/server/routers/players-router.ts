import { baseBallPlayers } from "@/server/db/schema";
import { desc, sql } from "drizzle-orm";
import { z } from "zod";
import { j, publicProcedure } from "../jstack";
import { Player } from "@/lib/data";
 // Make API call to Llama 3.3 API
 async function run(model: string, input: any) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/4caa082265ef55ca9cd3f450d5f6450b/ai/run/${model}`,
    {
      headers: { Authorization: "Bearer BkOa4gy2y3k-LK6jb6NbIZl0bBSxaEVHvb3ye3fi" },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  return result;
}

interface ApiResponse {
  result: {
    response: string;
  };
  success: boolean;
  errors: any[];
  messages: any[];
}

// Function to generate a player summary using Llama 3.3
async function generatePlayerSummary(player: Player): Promise<string> {
  try {
    const prompt_system = "You are a baseball analyst and sports commentator.";

    const prompt_story = `
Write a brief, engaging one-paragraph summary of this baseball player's career and stats:

Player Name: ${player.playerName}
Position: ${player.position}
Games Played: ${player.games}
At Bats: ${player.atBat}
Batting Average: ${player.avg.toFixed(3)}
Home Runs: ${player.homeRun}
RBIs: ${player.runBattedIn}
Walks: ${player.walk}
Strikeouts: ${player.strikeouts}
Stolen Bases: ${player.stolenBase}
On-Base Percentage: ${player.onBasePercentage.toFixed(3)}
Slugging Percentage: ${player.sluggingPercentage.toFixed(3)}
OPS: ${player.onBasePlusSlugging.toFixed(3)}

Focus on their notable strengths or weaknesses as a player based on these statistics. The summary should be insightful but concise (approximately 100 words).
`;


console.log(prompt_story)


    const response = await run("@cf/meta/llama-3-8b-instruct", {
      messages: [
        {
          role: "system",
          content: prompt_system,
        },
        {
          role: "user",
          content:
            prompt_story,
        },
      ],
    }) as ApiResponse
    // const response = await fetch("https://api.hirefraction.com/api/llama/generate", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     prompt,
    //     max_tokens: 250,
    //     temperature: 0.7
    //   })
    // });

    // if (!response.ok) {
    //   throw new Error(`API request failed with status ${response.status}`);
    // }

    console.log(response)
    /*
    {
  result: {
    response: "Barry Bonds' illustrious career is marked by unprecedented power and plate discipline. The seven-time MVP's impressive .298 batting average and .444 on-base percentage demonstrate his ability to consistently reach base and frustrate opposing pitchers. His 762 home runs are a testament to his incredible raw power, while his 514 stolen bases showcase his speed and aggressiveness on the basepaths. However, his 1539 strikeouts also highlight his tendency to swing and miss, particularly in key situations. Despite this, Bonds' remarkable ability to draw walks (2558) and maintain a high slugging percentage (.607) made him a dominant force in the game, earning him a spot among the all-time greats.",
    usage: { prompt_tokens: 165, completion_tokens: 142, total_tokens: 307 }
  },
  success: true,
  errors: [],
  messages: []
}
    */

    if (!response.success) {
      throw new Error("Failed to generate player summary");
    }
    const data = response.result.response
    return data

  } catch (error) {
    console.error("Error generating player summary:", error);
    return `${player.playerName} is a ${player.position} who has played ${player.games} games in their career with a batting average of ${player.avg.toFixed(3)}, ${player.homeRun} home runs, and ${player.runBattedIn} RBIs.`;
  }
}



export const playerRouter = j.router({
  recent: publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;
    const playersData = await db.select().from(baseBallPlayers);
    const players: Player[] = playersData.map((player) => ({
      ...player,
      avg: parseFloat(player.avg),
      onBasePercentage: parseFloat(player.onBasePercentage),
      sluggingPercentage: parseFloat(player.sluggingPercentage),
      onBasePlusSlugging: parseFloat(player.onBasePlusSlugging),
    }));

    return c.superjson(players);
  }),


  refresh: publicProcedure.mutation(async ({ c, ctx }) => {
    const { db } = ctx;
    
    // Truncate the table to delete all records
    await db.execute(sql`TRUNCATE TABLE "baseBallPlayers" RESTART IDENTITY`);
    
    // Fetch new data from the API
    const response = await fetch("https://api.hirefraction.com/api/test/baseball");
    if (!response.ok) {
      throw new Error("Failed to fetch baseball players data");
    }
    
    const data: Player[] = await response.json();
    
    // Insert new data
    const insertPromises = data.map((player: any) => 
      db.insert(baseBallPlayers).values({
        
        // playerName: player["Player name"],
        // position: player["position"],
        // games: player["Games"],
        // atBat: player["At-bat"],
        // runs: player["Runs"],
        // hits: player["Hits"],
        // double: player["Double (2B)"],
        // thirdBaseman: player["third baseman"],
        // homeRun: player["home run"],
        // runBattedIn: player["run batted in"],
        // walk: player["a walk"],
        // strikeouts: player["Strikeouts"],
        // stolenBase: player["stolen base"],
        // caughtStealing: player["Caught stealing"],
        // avg: player["AVG"],
        // onBasePercentage: player["On-base Percentage"],
        // sluggingPercentage: player["Slugging Percentage"],
        // onBasePlusSlugging: player["On-base Plus Slugging"],


        
        playerName: player["Player name"],
        position: player["position"],
        games: safeConvertToNumber(player["Games"]),
        atBat: safeConvertToNumber(player["At-bat"]),
        runs: safeConvertToNumber(player["Runs"]),
        hits: safeConvertToNumber(player["Hits"]),
        double: safeConvertToNumber(player["Double (2B)"]),
        thirdBaseman: safeConvertToNumber(player["third baseman"]),
        homeRun: safeConvertToNumber(player["home run"]),
        runBattedIn: safeConvertToNumber(player["run batted in"]),
        walk: safeConvertToNumber(player["a walk"]),
        strikeouts: safeConvertToNumber(player["Strikeouts"]),
        stolenBase: safeConvertToNumber(player["stolen base"]),
        caughtStealing: safeConvertToNumber(player["Caught stealing"]),
        avg: player["AVG"],
        onBasePercentage: player["On-base Percentage"],
        sluggingPercentage: player["Slugging Percentage"],
        onBasePlusSlugging: player["On-base Plus Slugging"],

      })
    );
    
    await Promise.all(insertPromises);
    
    // Return newly inserted data
    const playersData = await db.select().from(baseBallPlayers);
    const players: Player[] = playersData.map((player) => ({
      ...player,
      avg: parseFloat(player.avg),
      onBasePercentage: parseFloat(player.onBasePercentage),
      sluggingPercentage: parseFloat(player.sluggingPercentage),
      onBasePlusSlugging: parseFloat(player.onBasePlusSlugging),
    }));

    return c.superjson(players);
  }),

  generateSummary: publicProcedure
    .input(z.object({
      playerId: z.number()
    }))
    .query(async ({ input, ctx, c }) => {
      const { db } = ctx;
      const [playerData] = await db
        .select()
        .from(baseBallPlayers)
        .where(sql`id = ${input.playerId}`);
      
      if (!playerData) {
        throw new Error("Player not found");
      }
      
      const player: Player = {
        ...playerData,
        avg: parseFloat(playerData.avg),
        onBasePercentage: parseFloat(playerData.onBasePercentage),
        sluggingPercentage: parseFloat(playerData.sluggingPercentage),
        onBasePlusSlugging: parseFloat(playerData.onBasePlusSlugging),
      };
      
      const summary = await generatePlayerSummary(player);
      return c.superjson({ summary: summary });
    }),

  updateBaseBallPlayer: publicProcedure
    .input(z.object({
      id: z.number(),
      playerName: z.string().min(2),
      position: z.string().min(1),
      games: z.number().int().positive(),
      atBat: z.number().int().positive(),
      runs: z.number().int().nonnegative(),
      hits: z.number().int().nonnegative(),
      double: z.number().int().nonnegative(),
      thirdBaseman: z.number().int().nonnegative(),
      homeRun: z.number().int().nonnegative(),
      runBattedIn: z.number().int().nonnegative(),
      walk: z.number().int().nonnegative(),
      strikeouts: z.number().int().nonnegative(),
      stolenBase: z.number().int().nonnegative(),
      caughtStealing: z.number().int().nonnegative(),
      avg: z.number().min(0).max(1),
      onBasePercentage: z.number().min(0).max(1),
      sluggingPercentage: z.number().min(0).max(5),
      onBasePlusSlugging: z.number().min(0).max(5),
    }))
    .mutation(async ({ input, ctx, c }) => {
      const { db } = ctx;
      await db
        .update(baseBallPlayers)
        .set({
          playerName: input.playerName,
          position: input.position,
          games: input.games,
          atBat: input.atBat,
          runs: input.runs,
          hits: input.hits,
          double: input.double,
          thirdBaseman: input.thirdBaseman,
          homeRun: input.homeRun,
          runBattedIn: input.runBattedIn,
          walk: input.walk,
          strikeouts: input.strikeouts,
          stolenBase: input.stolenBase,
          caughtStealing: input.caughtStealing,
          avg: input.avg.toString(),
          onBasePercentage: input.onBasePercentage.toString(),
          sluggingPercentage: input.sluggingPercentage.toString(),
          onBasePlusSlugging: input.onBasePlusSlugging.toString(),
        })
        .where(sql`id = ${input.id}`);
      return c.superjson({ success: true });
    }),
});
function safeConvertToNumber(value: string | number): number {
  if (typeof value === "number") {
    return value;
  }
  if (value === "--") {
    return 0; // Default value for missing data
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed; // Ensure valid number
}