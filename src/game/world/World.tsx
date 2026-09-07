import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { LOCATION } from "../content";
import { useGame } from "../store";
import { audio } from "../audio";
import type { Interactable } from "../types";
import { Player } from "./Player";
import { LocationSet } from "./Sets";

/** Silver-nitrate grey — never black. Fog is atmosphere, not a mask. */
function filmFog(hex: string) {
  const c = new THREE.Color(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  c.getHSL(hsl);
  const l = Math.min(0.58, Math.max(0.48, hsl.l * 1.35 + 0.38));
  return new THREE.Color().setHSL(0.08, 0.015, l);
}

function FogRig({ color, near, far }: { color: string; near: number; far: number }) {
  const grey = filmFog(color);
  useFrame(({ scene, gl }) => {
    scene.fog = scene.fog ?? new THREE.Fog(grey, near, far);
    const f = scene.fog as THREE.Fog;
    f.color.copy(grey);
    f.near = Math.max(near, 28);
    f.far = Math.max(far, 96);
    scene.background = grey;
    gl.setClearColor(grey, 1);
    gl.toneMapping = THREE.NoToneMapping;
  });
  return null;
}

function SkyDome({ color }: { color: THREE.Color }) {
  return (
    <mesh>
      <sphereGeometry args={[70, 16, 12]} />
      <meshBasicMaterial color={color} side={THREE.BackSide} fog={false} depthWrite={false} />
    </mesh>
  );
}

function Threat() {
  const loc = useGame((s) => s.locationId);
  const flags = useGame((s) => s.flags);
  const ammo = useGame((s) => s.ammo);
  const timer = useRef(0);
  const staggered = useRef(0);
  useFrame((_, dt) => {
    if (loc !== "tunnel" && loc !== "cavern" && loc !== "maw") return;
    const st = useGame.getState();
    const p = window.__controlsTest?.getPosition?.();
    if (!p) return;
    if (staggered.current > 0) staggered.current -= dt;
    const cult = loc === "tunnel" ? ([1.0, -8] as const) : loc === "maw" ? ([0, -10] as const) : ([0, -12] as const);
    const d = Math.hypot(p[0] - cult[0], p[2] - cult[1]);
    if (flags.cultistSeen || loc !== "tunnel") {
      if (d < 3.2 && staggered.current <= 0) {
        timer.current += dt;
        if (Math.random() < dt * 0.4) audio.cough(0.7);
        if (timer.current > 2.8) {
          timer.current = 0;
          st.die();
        }
      } else timer.current = Math.max(0, timer.current - dt);
    }
    const sailor = Math.hypot(p[0] + 1.1, p[2] + 2);
    if (loc === "tunnel" && sailor < 1.6 && staggered.current <= 0 && flags.cultistSeen) {
      if (Math.random() < dt * 0.25) audio.groan();
    }
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "KeyR" && e.code !== "Space") return;
      const st = useGame.getState();
      if (st.overlay || st.screen !== "play") return;
      if (e.code === "KeyR" || e.code === "Space") {
        if (st.ammo > 0) {
          st.fire();
          staggered.current = 1.1 + st.strength * 0.12;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ammo, flags]);
  return null;
}

function CoughBed() {
  useFrame(() => {
    const st = useGame.getState();
    if (st.screen !== "play") return;
    if (Math.random() < 0.003 + st.decay * 0.01) audio.cough(0.25 + st.decay * 0.5);
    st.tickDecay(1 / 60);
  });
  return null;
}

function GreyFallback() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[80, 80]} />
      <meshBasicMaterial color="#9a9a96" />
    </mesh>
  );
}

function Scene() {
  const id = useGame((s) => s.locationId);
  const loc = LOCATION[id];
  const setPrompt = useGame((s) => s.setPrompt);
  const [focus, setFocus] = useState<Interactable | null>(null);

  useEffect(() => {
    setPrompt(focus ? `${focus.label}` : null);
  }, [focus, setPrompt]);

  if (!loc) return null;

  const onUse = (it: Interactable) => {
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
  };

  const fog = filmFog(loc.fog);

  return (
    <>
      <color attach="background" args={[`#${fog.getHexString()}`]} />
      <FogRig color={loc.fog} near={loc.fogNear} far={loc.fogFar} />
      <SkyDome color={fog} />
      <Suspense fallback={<GreyFallback />}>
        <LocationSet loc={loc} />
      </Suspense>
      <Player location={loc} onFocus={setFocus} onUse={onUse} />
      <Threat />
      <CoughBed />
    </>
  );
}

export function World() {
  return (
    <Canvas
      className="game-canvas"
      flat
      linear={false}
      dpr={[1, 1.5]}
      shadows={false}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance", toneMapping: THREE.NoToneMapping }}
      camera={{ fov: 64, near: 0.08, far: 90, position: [0, 1.7, 16] }}
      onCreated={({ gl }) => {
        gl.setClearColor("#b8b8b4", 1);
        gl.toneMapping = THREE.NoToneMapping;
        gl.toneMappingExposure = 1;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <Suspense fallback={<GreyFallback />}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
