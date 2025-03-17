export interface Player {
  id: number;
  playerName: string;
  position: string;
  games: number;
  atBat: number;
  runs: number;
  hits: number;
  double: number;
  thirdBaseman: number;
  homeRun: number;
  runBattedIn: number;
  walk: number;
  strikeouts: number;
  stolenBase: number;
  caughtStealing: number;
  avg: number;
  onBasePercentage: number;
  sluggingPercentage: number;
  onBasePlusSlugging: number;
}

// export interface Player {
//     id: string
//     name: string
//     position: string
//     games: number
//     atBats: number
//     runs: number
//     hits: number
//     doubles: number
//     triples: number
//     homeRuns: number
//     rbi: number
//     walks: number
//     strikeouts: number
//     stolenBases: number
//     caughtStealing: number
//     avg: number
//     obp: number
//     slg: number
//     ops: number
// }

// export const initialPlayers: Player[] = [
//   {
//     id: "1",
//     name: "G Sheffield",
//     position: "RF",
//     games: 2576,
//     atBats: 9217,
//     runs: 1636,
//     hits: 2689,
//     doubles: 467,
//     triples: 27,
//     homeRuns: 509,
//     rbi: 1676,
//     walks: 1475,
//     strikeouts: 1171,
//     stolenBases: 253,
//     caughtStealing: 104,
//     avg: 0.292,
//     obp: 0.393,
//     slg: 0.514,
//     ops: 0.907,
//   },
//   {
//     id: "2",
//     name: "D Jeter",
//     position: "SS",
//     games: 2747,
//     atBats: 11195,
//     runs: 1923,
//     hits: 3465,
//     doubles: 544,
//     triples: 66,
//     homeRuns: 260,
//     rbi: 1311,
//     walks: 1082,
//     strikeouts: 1840,
//     stolenBases: 358,
//     caughtStealing: 97,
//     avg: 0.31,
//     obp: 0.377,
//     slg: 0.44,
//     ops: 0.817,
//   },
//   {
//     id: "3",
//     name: "K Griffey Jr",
//     position: "CF",
//     games: 2671,
//     atBats: 9801,
//     runs: 1662,
//     hits: 2781,
//     doubles: 524,
//     triples: 38,
//     homeRuns: 630,
//     rbi: 1836,
//     walks: 1312,
//     strikeouts: 1779,
//     stolenBases: 184,
//     caughtStealing: 69,
//     avg: 0.284,
//     obp: 0.37,
//     slg: 0.538,
//     ops: 0.907,
//   },
//   {
//     id: "4",
//     name: "A Rodriguez",
//     position: "SS/3B",
//     games: 2784,
//     atBats: 10566,
//     runs: 2021,
//     hits: 3115,
//     doubles: 548,
//     triples: 31,
//     homeRuns: 696,
//     rbi: 2086,
//     walks: 1338,
//     strikeouts: 2287,
//     stolenBases: 329,
//     caughtStealing: 76,
//     avg: 0.295,
//     obp: 0.38,
//     slg: 0.55,
//     ops: 0.93,
//   },
//   {
//     id: "5",
//     name: "M Cabrera",
//     position: "1B/3B",
//     games: 2699,
//     atBats: 10093,
//     runs: 1530,
//     hits: 3174,
//     doubles: 636,
//     triples: 17,
//     homeRuns: 511,
//     rbi: 1881,
//     walks: 1199,
//     strikeouts: 1762,
//     stolenBases: 40,
//     caughtStealing: 21,
//     avg: 0.314,
//     obp: 0.392,
//     slg: 0.532,
//     ops: 0.924,
//   },
// ];
