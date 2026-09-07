import { useEffect, useState, type ComponentType } from "react";
import { Overlays } from "./ui/Overlays";
import { useGame } from "./store";
import { input } from "./input";
import { audio } from "./audio";

export function Game() {
  const screen = useGame((s) => s.screen);
  const decay = useGame((s) => s.decay);
  const cap = useGame((s) => s.a11y.distortion);
  const [world, setWorld] = useState<ComponentType | null>(null);
  const amount = Math.min(decay, cap);

  useEffect(() => {
    input.bind();
    const unlock = () => audio.unlock();
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      input.unbind();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  useEffect(() => {
    if (screen !== "play" && screen !== "pause") return;
    let alive = true;
    void import("./world/World").then((m) => {
      if (alive) setWorld(() => m.World);
    });
    return () => {
      alive = false;
    };
  }, [screen]);

  const World = world;
  const showWorld = screen === "play" || screen === "pause";

  return (
    <div
      className="game-root"
      data-screen={screen}
      tabIndex={0}
      onPointerDown={(e) => {
        (e.currentTarget as HTMLDivElement).focus({ preventScroll: true });
      }}
      style={{
        ["--con" as string]: String(1.16 + amount * 0.18),
        ["--bright" as string]: String(1.1 - amount * 0.08),
      }}
    >
      {showWorld && World ? <World /> : <div className="world-placeholder" />}
      <Overlays />
    </div>
  );
}
