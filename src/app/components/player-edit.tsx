"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import type { Player } from "@/lib/data"
import { client } from "@/lib/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

interface PlayerEditProps {
    player: Player
    onSave: (player: Player) => void
    onCancel: () => void
}

const playerFormSchema = z.object({
    playerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    position: z.string().min(1, { message: "Position is required." }),
    games: z.coerce.number().int().positive(),
    atBat: z.coerce.number().int().positive(),
    runs: z.coerce.number().int().nonnegative(),
    hits: z.coerce.number().int().nonnegative(),
    double: z.coerce.number().int().nonnegative(),
    thirdBaseman: z.coerce.number().int().nonnegative(),
    homeRun: z.coerce.number().int().nonnegative(),
    runBattedIn: z.coerce.number().int().nonnegative(),
    walk: z.coerce.number().int().nonnegative(),
    strikeouts: z.coerce.number().int().nonnegative(),
    stolenBase: z.coerce.number().int().nonnegative(),
    caughtStealing: z.coerce.number().int().nonnegative(),
    avg: z.coerce.number().min(0).max(1),
    onBasePercentage: z.coerce.number().min(0).max(1),
    sluggingPercentage: z.coerce.number().min(0).max(5),
    onBasePlusSlugging: z.coerce.number().min(0).max(5),
})

export default function PlayerEdit({ player, onSave, onCancel }: PlayerEditProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof playerFormSchema>>({
        resolver: zodResolver(playerFormSchema),
        defaultValues: {
            playerName: player.playerName,
            position: player.position,
            games: player.games,
            atBat: player.atBat,
            runs: player.runs,
            hits: player.hits,
            double: player.double,
            thirdBaseman: player.thirdBaseman,
            homeRun: player.homeRun,
            runBattedIn: player.runBattedIn,
            walk: player.walk,
            strikeouts: player.strikeouts,
            stolenBase: player.stolenBase,
            caughtStealing: player.caughtStealing,
            avg: player.avg,
            onBasePercentage: player.onBasePercentage,
            sluggingPercentage: player.sluggingPercentage,
            onBasePlusSlugging: player.onBasePlusSlugging,
        },
    })

    const queryClient = useQueryClient();

    const { mutate: updatePlayer, isPending } = useMutation({
        mutationFn: async ({ values }: { values: z.infer<typeof playerFormSchema> }) => {
            const newPlayer =
                {
                    id: player.id,
                    ...values
                }
            const res = await client.player.updateBaseBallPlayer.$post(newPlayer)
            onSave(newPlayer)
            return await res.json()
        },
        onSuccess: async () => {
            console.log("Player updated successfully")
            await queryClient.invalidateQueries({ queryKey: ["get-recent-players"] })
            onCancel()
        },
    })

    function onSubmit(values: z.infer<typeof playerFormSchema>) {
        updatePlayer({ values })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onCancel}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-2xl font-bold">Edit Player: {player.playerName}</h2>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Player Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="playerName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Player Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="position"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Position</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="games"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Games</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Batting Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="atBat"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>At Bats</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="runs"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Runs</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="hits"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Hits</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="double"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Doubles (2B)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="thirdBaseman"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Triples (3B)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="homeRun"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Home Runs</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="runBattedIn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>RBI</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="walk"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Walks</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="strikeouts"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Strikeouts</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Base Running & Advanced Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="stolenBase"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stolen Bases</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="caughtStealing"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Caught Stealing</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="avg"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Batting Average</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.001" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="onBasePercentage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>On Base Percentage</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.001" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sluggingPercentage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slugging Percentage</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.001" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="onBasePlusSlugging"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>On Base Plus Slugging</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.001" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" className="gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
