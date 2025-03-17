"use client"

import { useEffect, useState } from "react"
import { client } from "@/lib/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PlayerList from "./player-list"
import PlayerDetail from "./player-detail"
import PlayerEdit from "./player-edit"
import { type Player } from "@/lib/data"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function PlayerDashboard() {
    const [players, setPlayers] = useState<Player[]>([])
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
    const [activeTab, setActiveTab] = useState<string>("list")
    const [playerName, setPlayerName] = useState<string>("")
    const queryClient = useQueryClient()

    const { data: baseballPlayers, isPending: isLoadingPlayers } = useQuery({
        queryKey: ["get-baseball-players"],
        queryFn: async () => {
            const res = await client.player.recent.$get()
            return await res.json()
        }
    })

    const { mutate: refreshPlayers, isPending: isRefreshing } = useMutation({
        mutationFn: async () => {
            const res = await client.player.refresh.$post()
            return await res.json()
        },
        onSuccess: (data) => {
            setPlayers(data)
            queryClient.invalidateQueries({ queryKey: ["get-baseball-players"] })
        }
    })

    useEffect(() => {
        if (baseballPlayers) {
            setPlayers(baseballPlayers)
        }
    }, [baseballPlayers])

    useEffect(() => {
        // refresh data from db
        queryClient.invalidateQueries({ queryKey: ["get-baseball-players"] })
        refreshPlayersFromDb()
    }, [activeTab])
    
    const refreshPlayersFromDb = async () => {
        
        if (baseballPlayers) {
            setPlayers(baseballPlayers)
        }
        // setPlayers(baseballPlayers)
        // const res = await client.player.recent.$get()
        // setPlayers(await res.json())
        
    }


    const handleSelectPlayer = (player: Player) => {
        setSelectedPlayer(player)
        setActiveTab("detail")
        queryClient.setQueryData(["get-baseball-players"], (oldData: Player[] | undefined) => {
            if (!oldData) return [player]
            return [...oldData, player]
        })
    }

    const handleEditPlayer = (player: Player) => {
        setSelectedPlayer(player)
        setActiveTab("edit")
    }

    const handleUpdatePlayer = (updatedPlayer: Player) => {
        setPlayers(players.map((player) => (player.id === updatedPlayer.id ? updatedPlayer : player)))
        console.log(updatedPlayer)
        setSelectedPlayer(updatedPlayer)
        setActiveTab("detail")
        console.log("updated!")
    }

    const handleBackToList = () => {
        setActiveTab("list")
        setSelectedPlayer(null)
    }

    const handleRefresh = () => {
        refreshPlayers()
    }

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="list">Player List</TabsTrigger>
                    <TabsTrigger value="detail" disabled={!selectedPlayer}>
                        Player Details
                    </TabsTrigger>
                    <TabsTrigger value="edit" disabled={!selectedPlayer}>
                        Edit Player
                    </TabsTrigger>
                </TabsList>
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleRefresh} 
                    disabled={isRefreshing || isLoadingPlayers}
                    className="ml-2"
                >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
            </div>

            <TabsContent value="list" className="mt-0">
                <PlayerList 
                    players={players} 
                    onSelectPlayer={handleSelectPlayer} 
                    onEditPlayer={handleEditPlayer}
                    isLoading={isLoadingPlayers || isRefreshing}
                />
            </TabsContent>

            <TabsContent value="detail" className="mt-0">
                {selectedPlayer && (
                    <PlayerDetail player={selectedPlayer} onEdit={() => setActiveTab("edit")} onBack={handleBackToList} />
                )}
            </TabsContent>

            <TabsContent value="edit" className="mt-0">
                {selectedPlayer && (
                    <PlayerEdit player={selectedPlayer} onSave={handleUpdatePlayer} onCancel={() => setActiveTab("detail")} />
                )}
            </TabsContent>
        </Tabs>
    )
}

