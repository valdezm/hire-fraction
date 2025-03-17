"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Loader2 } from "lucide-react"
import type { Player } from "@/lib/data"
import { client } from "@/lib/client"

interface PlayerSummaryProps {
    player: Player
}

export default function PlayerSummary({ player }: PlayerSummaryProps) {
    const [aiSummary, setAiSummary] = useState<string>("")
    const [isLoading, setIsLoading] = useState(true)

    // Calculate career averages per season
    const seasons = player.games / 162 // Approximate number of seasons
    const avgHomeRunsPerSeason = Math.round(player.homeRun / seasons)
    const avgRbiPerSeason = Math.round(player.runBattedIn / seasons)
    const avgHitsPerSeason = Math.round(player.hits / seasons)

    // Prepare data for charts
    const battingData = [
        { name: "AVG", value: player.avg, fill: "hsl(var(--chart-1))" },
        { name: "OBP", value: player.onBasePercentage, fill: "hsl(var(--chart-2))" },
        { name: "SLG", value: player.sluggingPercentage, fill: "hsl(var(--chart-3))" },
        { name: "OPS", value: player.onBasePlusSlugging / 2, fill: "hsl(var(--chart-4))" }, // Scaled for visualization
    ]

    const productionData = [
        { name: "HR/Season", value: avgHomeRunsPerSeason, fill: "hsl(var(--chart-1))" },
        { name: "RBI/Season", value: avgRbiPerSeason / 10, fill: "hsl(var(--chart-2))" }, // Scaled for visualization
        { name: "Hits/Season", value: avgHitsPerSeason / 10, fill: "hsl(var(--chart-3))" }, // Scaled for visualization
    ]

    useEffect(() => {
        async function fetchPlayerSummary() {
            try {
                setIsLoading(true)
                const response = await client.player.generateSummary.$get({ playerId: player.id })
                const data = await response.json()
                console.log(data)
                
                setAiSummary(data.summary)
            } catch (error) {
                console.error("Failed to fetch player summary:", error)
                setAiSummary(`${player.playerName} is a ${player.position} who has played ${player.games} games in their career with a batting average of ${player.avg.toFixed(3)}, ${player.homeRun} home runs, and ${player.runBattedIn} RBIs.`)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPlayerSummary()
    }, [player.id])

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Career Summary</CardTitle>
                    <CardDescription>
                        {player.playerName} | {player.position} | {player.games} Games
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-4">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            <span>Generating AI summary with Llama 3.3...</span>
                        </div>
                    ) : (
                        <div className="text-lg">
                            {aiSummary}
                        </div>
                    )}

                    <div className="mt-4 grid grid-cols-4 gap-4 text-center">
                        <div className="space-y-1">
                            <div className="text-3xl font-bold">{player.homeRun}</div>
                            <div className="text-sm font-medium">Home Runs</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-bold">{player.runBattedIn}</div>
                            <div className="text-sm font-medium">RBIs</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-bold">{player.avg.toFixed(3)}</div>
                            <div className="text-sm font-medium">Batting Avg</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-bold">{player.onBasePlusSlugging.toFixed(3)}</div>
                            <div className="text-sm font-medium">OPS</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Batting Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={battingData}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} />
                                    <Tooltip formatter={(value: number) => [value.toFixed(3)]} labelFormatter={(label) => `${label}`} />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Production Per Season</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={productionData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value: number, name) => {
                                            if (name === "RBI/Season") return [avgRbiPerSeason]
                                            if (name === "Hits/Season") return [avgHitsPerSeason]
                                            return [value]
                                        }}
                                        labelFormatter={(label) => `${label}`}
                                    />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

