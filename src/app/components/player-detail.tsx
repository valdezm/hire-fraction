"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit } from "lucide-react"
import type { Player } from "@/lib/data"
import PlayerSummary from "./player-summary"

interface PlayerDetailProps {
    player: Player
    onEdit: () => void
    onBack: () => void
}

export default function PlayerDetail({ player, onEdit, onBack }: PlayerDetailProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-2xl font-bold">{player.playerName}</h2>
                <div className="ml-auto">
                    <Button onClick={onEdit} className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Player
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Player Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">Name:</div>
                            <div>{player.playerName}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">Position:</div>
                            <div>{player.position}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">Games:</div>
                            <div>{player.games}</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Batting Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">At Bats:</div>
                            <div>{player.atBat}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">Hits:</div>
                            <div>{player.hits}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">Doubles:</div>
                            <div>{player.double}</div>
                        </div>
                        {/* <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">Triples:</div>
                            <div>{player.triples}</div>
                        </div> */}
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">Home Runs:</div>
                            <div>{player.homeRun}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">RBI:</div>
                            <div>{player.runBattedIn}</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Advanced Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">AVG:</div>
                            <div>{player.avg.toFixed(3)}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">OBP:</div>
                            <div>{player.onBasePercentage.toFixed(3)}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">SLG:</div>
                            <div>{player.sluggingPercentage.toFixed(3)}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">OPS:</div>
                            <div>{player.onBasePlusSlugging.toFixed(3)}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">Walks:</div>
                            <div>{player.walk}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">Strikeouts:</div>
                            <div>{player.strikeouts}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="all-stats">All Statistics</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="mt-6">
                    <PlayerSummary player={player} />
                </TabsContent>
                <TabsContent value="all-stats" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Complete Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(player).map(([key, value]) => {
                                    // Skip id and non-display fields
                                    if (key === "id") return null

                                    return (
                                        <div key={key} className="space-y-1">
                                            <div className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</div>
                                            <div>{typeof value === "number" && !Number.isInteger(value) ? value.toFixed(3) : value}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

