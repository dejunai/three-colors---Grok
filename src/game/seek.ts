/** Walk-to target for Player. Automation and HUD buttons set this; the loop consumes it. */
export type Seek = {
  x: number;
  z: number;
  id?: string;
  use?: boolean;
} | null;

let current: Seek = null;

export const seek = {
  get: () => current,
  set: (next: Seek) => {
    current = next;
  },
  clear: () => {
    current = null;
  },
};
