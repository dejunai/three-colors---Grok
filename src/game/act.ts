import { LOCATION } from "./content";
import { useGame } from "./store";
import type { Interactable } from "./types";

/** Shared examine / talk / exit path used by E, HUD buttons, and automation. */
export function actOn(it: Interactable) {
  const st = useGame.getState();
  if (it.requireFlag && !st.flags[it.requireFlag]) return;
  if (it.kind === "exit" && it.exitTo) {
    st.setLocation(it.exitTo);
    return;
  }
  if (it.kind === "person" && it.options) {
    const avail = it.options.filter((o) => {
      if (o.requireCoat && st.coat !== o.requireCoat) return false;
      if (o.requireClue && !st.clues[o.requireClue]) return false;
      if (o.requireFlag && !st.flags[o.requireFlag]) return false;
      if (o.hideIf && st.clues[o.hideIf]) return false;
      return true;
    });
    if (!avail.length) {
      st.consult([{ text: "NOTHING FURTHER." }]);
      return;
    }
    if (avail.length === 1) {
      const r = avail[0].result;
      st.consult(r.lines, {
        clueId: r.clueId,
        perception: r.perception,
        flag: r.flag,
        item: r.item,
        unlock: r.unlock,
      });
      return;
    }
    st.openChoices(it.label, avail);
    return;
  }
  if (it.id === "spill") {
    st.spillFlask();
    st.shatter();
  }
  if (it.id === "file-eight") st.fileEight();
  if (it.id === "triplicate") st.fileTriplicate();
  if (it.id === "board") {
    st.openBoard();
    if (st.spine) {
      setTimeout(() => st.die(), 1600);
    }
    return;
  }
  if (it.id === "file-table") {
    st.openFile();
    return;
  }
  if (it.id === "dead-ahead") {
    st.examine(it.id, it.title ?? it.label, it.body ?? "", {
      clueId: it.clueId,
      perception: it.perception,
      item: it.item,
      flag: it.flag,
    });
    setTimeout(() => st.die(), 2200);
    return;
  }
  if (it.id === "final") {
    st.setFlag("finalReady");
    st.openInventory();
    return;
  }
  if (it.kind === "pickup" && it.item && st.chapter === 2) {
    st.collectPack(it.item, false, it.body ?? it.title ?? it.label);
    st.examine(it.id, it.title ?? it.label, (it.body ?? "") + " Logged in the Codex. Carried, if the pack would take it.", {
      clueId: it.clueId,
      perception: it.perception,
      item: it.item,
      flag: it.flag,
    });
    return;
  }
  st.examine(it.id, it.title ?? it.label, it.body ?? "", {
    clueId: it.clueId,
    perception: it.perception,
    item: it.item,
    flag: it.flag,
  });
}

export function findSubject(id: string): Interactable | null {
  const st = useGame.getState();
  const loc = LOCATION[st.locationId];
  return loc?.interactables.find((it) => it.id === id) ?? null;
}

export function visibleSubjects() {
  const st = useGame.getState();
  const loc = LOCATION[st.locationId];
  if (!loc) return [];
  return loc.interactables.filter((it) => {
    if (it.hideIfExamined && st.examined[it.id]) return false;
    if (it.requireFlag && !st.flags[it.requireFlag]) return false;
    return true;
  });
}
