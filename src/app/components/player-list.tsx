"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2 } from "lucide-react"
import type { Player } from "@/lib/data"

interface PlayerListProps {
    players: Player[]
    onSelectPlayer: (player: Player) => void
    onEditPlayer: (player: Player) => void
    isLoading?: boolean
}

export default function PlayerList({ players, onSelectPlayer, onEditPlayer, isLoading = false }: PlayerListProps) {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredPlayers = players.filter((player) => player.playerName.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search players..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Player Name</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead className="text-right">Games</TableHead>
                            <TableHead className="text-right">AVG</TableHead>
                            <TableHead className="text-right">HR</TableHead>
                            <TableHead className="text-right">RBI</TableHead>
                            <TableHead className="text-right">OPS</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center h-24">
                                    <div className="flex justify-center items-center">
                                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                        <span>Loading players...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredPlayers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center h-24">
                                    No players found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredPlayers.map((player) => (
                                <TableRow key={player.id}>
                                    <TableCell className="font-medium">{player.playerName}</TableCell>
                                    <TableCell>{player.position}</TableCell>
                                    <TableCell className="text-right">{player.games}</TableCell>
                                    <TableCell className="text-right">{player.avg.toFixed(3)}</TableCell>
                                    <TableCell className="text-right">{player.homeRun}</TableCell>
                                    <TableCell className="text-right">{player.runBattedIn}</TableCell>
                                    <TableCell className="text-right">{player.onBasePlusSlugging.toFixed(3)}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm" onClick={() => onSelectPlayer(player)}>
                                            View 
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => onEditPlayer(player)}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

