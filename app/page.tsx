"use client";

import { Popup } from "@/components/popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Player, useGameStore } from "@/stores/useGameStore";
import { Pencil, Trash } from "lucide-react";
import React, { useState } from "react";

export default function Home() {
  const players = useGameStore((state) => state.players);
  const addPlayer = useGameStore((state) => state.addPlayer);

  const [name, setName] = useState<string>("");

  return (
    <div className="h-dvh max-w-[640px] sm:border-r flex flex-col items-center">
      <h1 className="text-3xl font-bold pt-20">Gang Of Four</h1>
      <div className="flex flex-col items-start mt-32 space-y-2">
        <Label htmlFor="player-name-input">Add Player Name</Label>
        <div className="flex gap-2 w-[26rem]">
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="player-name-input"
            className="flex-grow"
            placeholder="Nicolas..."
          />
          <Button
            onClick={() => {
              addPlayer({
                name,
                score: 0,
              });
            }}
          >
            Add
          </Button>
        </div>
        <ul className="divide-y w-full pt-6">
          {players.map((player, id) => (
            <PlayerItem key={id} player={player} id={id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function PlayerItem({ player, id }: { player: Player; id: number }) {
  const [newName, setNewName] = useState<string>("");

  const removePlayer = useGameStore((state) => state.removePlayer);
  const updatePlayer = useGameStore((state) => state.updatePlayer);

  return (
    <li className="py-4 px-2 flex justify-between">
      <div>{player.name}</div>
      <div className="flex gap-2">
        <Popup
          title="Rename Player"
          description="Update the name of the player"
          trigger={
            <Button variant="outline" size="icon">
              <Pencil size={16} />
            </Button>
          }
        >
          <form className="grid items-start gap-4">
            <div className="grid gap-2">
              <Label htmlFor={"username-" + id}>New Name</Label>
              <Input
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
                id={"username-" + id}
                defaultValue={player.name}
              />
            </div>
            <Button
              type="submit"
              onClick={(e) => {
                updatePlayer(id, {
                  name: newName,
                  score: 0,
                });
                e.preventDefault();
              }}
            >
              Save changes
            </Button>
          </form>
        </Popup>
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
    </li>
  );
}
