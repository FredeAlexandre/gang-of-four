import { create } from "zustand";

export interface Player {
  name: string;
  score: number;
}

export enum HistoryEventRecord {
  START,
}

export type HistoryRecord =
  | HistoryEventRecord
  | { title: string; content: string };

export interface GameStore {
  players: Player[];
  history: HistoryRecord[];
  hasGameStarted: boolean;
  start: () => void;
  addPlayer: (player: Player) => void;
  removePlayer: (id: number) => void;
  updatePlayer: (id: number, player: Player) => void;
  addHistoryRecord: (record: HistoryEventRecord) => void;
  updateHistory: (id: number, record: HistoryRecord) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  players: [],
  history: [],
  hasGameStarted: false,
  start: () =>
    set((state) => ({
      hasGameStarted: true,
      history: [HistoryEventRecord.START],
    })),
  addHistoryRecord: (record: HistoryRecord) =>
    set((state) => ({ history: [...state.history, record] })),
  updateHistory: (id: number, record: HistoryRecord) =>
    set((state) => ({
      history: state.history.map((_record, _id) => {
        if (_id === id) {
          return record;
        } else {
          return _record;
        }
      }),
    })),
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
