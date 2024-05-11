"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  HistoryEventRecord,
  HistoryRecord,
  Player,
  useGameStore,
} from "@/stores/useGameStore";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Check, CheckIcon, Pencil, Trash } from "lucide-react";
import React, { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function Home() {
  const players = useGameStore((state) => state.players);
  const hasGameStarted = useGameStore((state) => state.hasGameStarted);
  const start = useGameStore((state) => state.start);
  const addPlayer = useGameStore((state) => state.addPlayer);

  const canStart = players.length >= 4;

  return (
    <div className="flex flex-wrap">
      <div className="h-dvh lg:w-[24rem] w-full sm:border-r p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>Players</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <InfoCircledIcon className="w-5 h-(" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>You need to add the player clockwise</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ul className="divide-y w-full">
            {players.map((player, id) => (
              <PlayerItem key={id} player={player} id={id} />
            ))}
          </ul>
          {hasGameStarted ? (
            <></>
          ) : (
            <Button
              onClick={() => {
                addPlayer({
                  name: "Player " + (players.length + 1),
                  score: 0,
                });
              }}
              className="w-full"
            >
              Add Player
            </Button>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>Round</div>
          </div>
          {hasGameStarted ? (
            <div className="flex flex-col items-center py-4 text-2xl font-semibold">
              3
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-1">
              {canStart ? (
                <></>
              ) : (
                <div>
                  <span className="font-bold">
                    {4 - players.length} more players
                  </span>{" "}
                  Missing
                </div>
              )}
              <Button
                disabled={!canStart}
                onClick={() => {
                  start();
                }}
              >
                Start Game
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="lg:grow lg:w-auto w-full overflow-y-auto h-dvh">
        {hasGameStarted ? (
          <GameHistory />
        ) : (
          <div className="min-h-dvh flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div>
                {canStart ? (
                  <>You can now add more player or start a game !</>
                ) : (
                  <>
                    Add{" "}
                    <span className="font-bold px-1">
                      {4 - players.length} more players
                    </span>{" "}
                    to be able to start the game
                  </>
                )}
              </div>
              <Button
                disabled={!canStart}
                onClick={() => {
                  start();
                }}
              >
                Start Game
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HistoryEventStart() {
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const players = useGameStore((state) => state.players);
  const updateHistory = useGameStore((state) => state.updateHistory);

  return (
    <Card size="compact" className="text-sm">
      <CardHeader size="compact">
        <CardTitle size="compact">Round #0</CardTitle>
      </CardHeader>
      <CardContent size="compact" className="flex gap-2">
        <Select
          onValueChange={(e) => {
            setSelectedPlayer(parseInt(e));
          }}
        >
          <SelectTrigger className="w-[20rem]">
            <SelectValue placeholder="Starting player" />
          </SelectTrigger>
          <SelectContent>
            {players.map((player, id) => (
              <SelectItem key={id} value={`${id}`}>
                {player.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="icon">
          <Check
            onClick={() => {
              updateHistory(0, {
                title: "Round #0",
                content: `${
                  players[selectedPlayer].name
                } start the first round followed by ${
                  players[(selectedPlayer + 1) % players.length].name
                }`,
              });
            }}
            size={16}
          />
        </Button>
      </CardContent>
    </Card>
  );
}

function HistoryItem({ record }: { record: HistoryRecord }) {
  if (typeof record == "object" && "title" in record) {
    return (
      <Card size="compact" className="text-sm">
        <CardHeader size="compact">
          <CardTitle size="compact">{record.title}</CardTitle>
        </CardHeader>
        <CardContent size="compact" className="flex gap-2">
          {record.content}
        </CardContent>
      </Card>
    );
  }

  if (record == HistoryEventRecord.START) return <HistoryEventStart />;
}

function GameHistory() {
  const history = useGameStore((state) => state.history);

  return (
    <div className="divider-y p-4">
      {history.map((record, key) => (
        <HistoryItem key={key} record={record} />
      ))}
    </div>
  );
}

function PlayerItem({ player, id }: { player: Player; id: number }) {
  const [newName, setNewName] = useState<string>(player.name);
  const [editMode, setEditMode] = useState(false);

  const removePlayer = useGameStore((state) => state.removePlayer);
  const updatePlayer = useGameStore((state) => state.updatePlayer);
  const hasGameStarted = useGameStore((state) => state.hasGameStarted);

  return (
    <li className="p-2 gap-2 flex justify-between">
      <Input
        disabled={!editMode}
        className={cn("text-md", {
          "disabled:opacity-100": !editMode,
          "border-background": !editMode,
          "shadow-none": !editMode,
          "disabled:cursor-default": !editMode,
        })}
        value={newName}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />
      {hasGameStarted ? (
        <div className="w-1/2 flex justify-end items-center">
          {player.score} points
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (editMode) {
                updatePlayer(id, { name: newName, score: player.score });
              }
              setEditMode(!editMode);
            }}
            variant="outline"
            size="icon"
          >
            {editMode ? <Check size={16} /> : <Pencil size={16} />}
          </Button>
          <Button
            onClick={() => {
              removePlayer(id);
            }}
            variant="outline"
            size="icon"
          >
            <Trash size={16} />
          </Button>
        </div>
      )}
    </li>
  );
}
