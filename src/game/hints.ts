import type { Coat, ItemId } from "./types";

type WhisperState = {
  chapter: 1 | 2 | 3;
  locationId: string;
  flags: Record<string, true>;
  clues: Record<string, true>;
  coat: Coat;
  inventory: ItemId[];
  spine: boolean;
  filedEight: boolean;
};

export function caseWhisper(s: WhisperState): string {
  const has = (id: string) => Boolean(s.clues[id]);
  const flag = (id: string) => Boolean(s.flags[id]);

  if (s.chapter === 1) {
    if (s.locationId === "drive" && !flag("gardenOpen")) {
      return "The boy stays at the rim of the frame. Walk to him. E to hear him.";
    }
    if (s.locationId === "drive") return "The rose garden is at the end of the drive.";
    if (s.locationId === "garden") {
      if (!has("wexford") && !has("no-exit") && !has("unknown")) {
        return "Six men in evening dress. Kneel. Look at the hole that has no answer.";
      }
      if (!flag("odell") && !has("six-club")) return "Captain Odell is already inconvenienced. He is standing in the path.";
      if (!has("birches")) return "Thirty yards off, past the birches: a woman and a boy the town will not count.";
      return "Pickman Street will have names. Turn back the way you came.";
    }
    if (s.locationId === "street") {
      if (!s.inventory.includes("coat-plain")) return "The precinct keeps a plain wool coat by the door.";
      if (s.coat === "uniform" && !has("naomi")) return "The badge opens doors. The wool opens mouths. C to change coats.";
      if (!has("naomi")) return "Mrs. Almy will not speak to a badge.";
      if (!has("insurance")) return "The town archive keeps the underwriters' abstracts.";
      if (!has("ophion-name")) return "Father Behan declined twice. Ask him what the name means.";
      if (!has("maternal")) return "Sit still at the club bar, in the wool. Wait for the glass you did not ask for.";
      if (!flag("pantry")) return "The barman mentioned a pantry they boarded and never unboarded.";
      if (!s.spine) return "The corkboard is in the room above the cobbler. Sit with the facts until they sit together.";
      return "The board is full enough. Go home to it.";
    }
    if (s.locationId === "precinct") {
      if (!s.inventory.includes("coat-plain")) return "The wool coat is on the hook. Take it. C will change you.";
      if (!s.filedEight) return "Whatever Odell's report says, your file can still say eight.";
      return "The street is waiting.";
    }
    if (s.locationId === "almy") {
      return s.coat === "plain"
        ? "She looks at the coat rather than the man wearing it."
        : "In uniform the door opens no wider than courtesy. C, if you have the wool.";
    }
    if (s.locationId === "bar") {
      if (s.coat !== "plain") return "He will call you Officer and pour you nothing you have not ordered.";
      if (!has("six-club")) return "Sit at the far end. Stillness is a kind of question.";
      if (!has("maternal")) return "Wait for the refill you did not ask for.";
      if (!flag("pantry")) return "Ask after hospitality withdrawn.";
      return "The old pantry door is unboarded enough.";
    }
    if (s.locationId === "rectory") return "He will discuss tempers and grudges. Ask what the name means.";
    if (s.locationId === "archive") return "Ordinary, well-documented fraud. The crew lists forget a name on purpose.";
    if (s.locationId === "library") return "An unlocked book. Copy the passage. Leave the volume. Too easily missed.";
    if (s.locationId === "morgue") return "Six tables. Two empty. Ask why there is no exit wound.";
    if (s.locationId === "room") {
      return s.spine
        ? "The frame is widening. The board will not save you. It will only finish naming what you already know."
        : "Pin what you have. The board rewards patience. It has never once punished competence.";
    }
    if (s.locationId === "pantry") return "Gin from before the war. A narrow door, open two inches.";
    if (s.locationId === "tunnel") return "Finite things run out. The stair is behind you if you want it.";
    return "Walk. Look. E to take a note.";
  }

  if (s.chapter === 2) {
    if (s.locationId === "shore") return "Log what the ground kept. Total recovery is a kind of hunger.";
    if (s.locationId === "galleries") return "Carry only what the pack will take. The rest belongs to the Codex.";
    if (s.locationId === "maw") return "Curiosity is not rewarded here. The light ahead is not yours.";
    return "Record that the geometry should not be possible, and is.";
  }

  if (s.locationId === "voss") return "He is still holding the book. That is the part you came about.";
  if (s.locationId === "town3") return "A file that says eight. A book that says Ophion. Then the island path.";
  if (s.locationId === "cavern") return "Ward reached this far. Validate him. Then go on.";
  if (s.locationId === "abyss") return "One action, while you are still yourself. I to open the kit.";
  return "Demand what the town still owes.";
}
