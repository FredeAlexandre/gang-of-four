"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Player, useGameStore } from "@/stores/useGameStore";
import { Check, Pencil, Trash } from "lucide-react";
import React, { useState } from "react";

export default function Home() {
  const players = useGameStore((state) => state.players);
  const hasGameStarted = useGameStore((state) => state.hasGameStarted);
  const setGameState = useGameStore((state) => state.setGameState);
  const addPlayer = useGameStore((state) => state.addPlayer);

  const canStart = players.length >= 4;

  return (
    <div className="flex">
      <div className="h-dvh w-full sm:w-[30rem] sm:border-r sm:p-4 p-2">
        <div className="flex justify-between items-center">
          <div>Players</div>
        </div>
        <ul className="divide-y w-full pt-2">
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
      <div className="w-full overflow-y-auto">
        <div className="sm:h-dvh flex items-center justify-center">
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
                  to be
                </>
              )}
              able to start the game
            </div>
            <Button
              disabled={!canStart}
              onClick={() => {
                setGameState(true);
              }}
            >
              Start Game
            </Button>
          </div>
        </div>
      </div>
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
