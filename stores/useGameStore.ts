import { create } from "zustand";

export interface Player {
  name: string;
  score: number;
}

export interface GameStore {
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (id: number) => void;
  updatePlayer: (id: number, player: Player) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  players: [],
  addPlayer: (player: Player) =>
    set((state) => ({ players: [...state.players, player] })),
  removePlayer: (id: number) =>
    set((state) => ({
      players: state.players.filter((player, _id) => _id !== id),
    })),
  updatePlayer: (id: number, player: Player) =>
    set((state) => ({
      players: state.players.map((_player, _id) => {
        if (id === _id) {
          return player;
        } else {
          return _player;
        }
      }),
    })),
}));
