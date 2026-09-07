import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { input } from "../input";
import { LOCATION } from "../content";
import type { Interactable, LocationDef, Wall } from "../types";
import { useGame } from "../store";
import { audio } from "../audio";

type Props = {
  location: LocationDef;
  onFocus: (it: Interactable | null) => void;
  onUse: (it: Interactable) => void;
};

const tmp = new THREE.Vector3();
const fwd = new THREE.Vector3();

function blocked(x: number, z: number, walls: Wall[] | undefined, b: LocationDef["bounds"]) {
  if (x < b.minX + 0.4 || x > b.maxX - 0.4 || z < b.minZ + 0.4 || z > b.maxZ - 0.4) return true;
  if (!walls) return false;
  for (const w of walls) {
    if (x > w.minX && x < w.maxX && z > w.minZ && z < w.maxZ) return true;
  }
  return false;
}

function embeddedFrame() {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function Player({ location, onFocus, onUse }: Props) {
  const { camera, gl } = useThree();
  const yaw = useRef(location.yaw ?? 0);
  const pitch = useRef(0);
  const pos = useRef(new THREE.Vector3(...location.spawn));
  const speedRef = useRef(0);
  const bob = useRef(0);
  const stepAcc = useRef(0);
  const jumpV = useRef(0);
  const grounded = useRef(true);
  const locId = useRef(location.id);
  const lockDenied = useRef(embeddedFrame());

  const heard = useGame((s) => s.heardShatter);
  const chapter = useGame((s) => s.chapter);

  useEffect(() => {
    locId.current = location.id;
    pos.current.set(location.spawn[0], location.spawn[1], location.spawn[2]);
    yaw.current = location.yaw ?? 0;
    pitch.current = 0;
    jumpV.current = 0;
    camera.position.copy(pos.current);
  }, [location.id, location.spawn, location.yaw, camera]);

  useEffect(() => {
    const el = gl.domElement;
    el.tabIndex = 0;
    el.style.outline = "none";

    const deny = () => {
      lockDenied.current = true;
    };
    document.addEventListener("pointerlockerror", deny);

    const down = (e: PointerEvent) => {
      if (useGame.getState().overlay) return;
      if (e.button !== 0) return;
      input.pointerDown = true;
      useGame.setState({ lookHint: false });
      el.focus({ preventScroll: true });
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* capture is optional */
      }
      // Pointer lock only hides the cursor. WASD / drag-look never depend on it.
      if (lockDenied.current || document.pointerLockElement === el) return;
      input.ignoreNextBlur();
      try {
        const req = el.requestPointerLock?.();
        if (req && typeof (req as Promise<void>).then === "function") {
          void (req as Promise<void>).catch(deny);
        }
      } catch {
        deny();
      }
    };
    el.addEventListener("pointerdown", down);
    return () => {
      el.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerlockerror", deny);
    };
  }, [gl]);

  useEffect(() => {
    window.__controlsTest = {
      getYaw: () => yaw.current,
      getSpeed: () => speedRef.current,
      setKeys: (codes: string[]) => input.setKeys(codes),
      getPosition: () => [pos.current.x, pos.current.y, pos.current.z] as [number, number, number],
      setYaw: (v: number) => {
        yaw.current = v;
      },
      setPosition: (x: number, y: number, z: number) => {
        pos.current.set(x, y, z);
      },
    };
    return () => {
      delete window.__controlsTest;
    };
  }, []);

  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.1);
    const { now, just } = input.sample();
    const st = useGame.getState();
    const freeze = Boolean(st.overlay) || st.screen !== "play";

    if (!freeze) {
      yaw.current -= now.lookX * 0.0024;
      pitch.current = Math.max(-1.25, Math.min(1.2, pitch.current - now.lookY * 0.002));

      // Walk relative to current look (drag or lock — lock is never a gate).
      const heading = yaw.current;
      const fx = -Math.sin(heading);
      const fz = -Math.cos(heading);
      const rx = Math.cos(heading);
      const rz = -Math.sin(heading);

      const wishX = fx * now.moveY + rx * now.moveX;
      const wishZ = fz * now.moveY + rz * now.moveX;
      const sprint = now.crouch ? 1.45 : 3.15;
      const mag = Math.hypot(wishX, wishZ);
      speedRef.current = mag * sprint;

      if (chapter === 2 && just.jump && grounded.current) {
        jumpV.current = 5.2;
        grounded.current = false;
      }

      let nx = pos.current.x + wishX * sprint * dt;
      let nz = pos.current.z + wishZ * sprint * dt;
      const walls = LOCATION[locId.current]?.walls;
      const bounds = LOCATION[locId.current]?.bounds ?? location.bounds;
      if (blocked(nx, pos.current.z, walls, bounds)) nx = pos.current.x;
      if (blocked(pos.current.x, nz, walls, bounds)) nz = pos.current.z;
      if (blocked(nx, nz, walls, bounds)) {
        nx = pos.current.x;
        nz = pos.current.z;
      }
      pos.current.x = nx;
      pos.current.z = nz;

      if (!grounded.current || chapter === 2) {
        jumpV.current -= 14 * dt;
        pos.current.y += jumpV.current * dt;
        const floor = location.spawn[1];
        if (pos.current.y <= floor) {
          pos.current.y = floor;
          jumpV.current = 0;
          grounded.current = true;
        }
      } else {
        pos.current.y = location.spawn[1];
      }

      if (mag > 0.15) {
        bob.current += dt * (7 + mag * 4);
        stepAcc.current += dt;
        if (stepAcc.current > 0.48 && heard) {
          stepAcc.current = 0;
          audio.foot(0.8 + Math.random() * 0.3);
        }
      } else {
        bob.current *= 1 - dt * 6;
      }
    }

    const eye = pos.current.y + Math.sin(bob.current) * 0.035;
    camera.position.set(pos.current.x, eye, pos.current.z);
    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw.current;
    camera.rotation.x = pitch.current;

    camera.getWorldDirection(fwd);
    let nearest: Interactable | null = null;
    let nearestDist = Infinity;
    let looked: Interactable | null = null;
    let lookedDot = 0.22;
    for (const it of location.interactables) {
      if (it.hideIfExamined && st.examined[it.id]) continue;
      if (it.requireFlag && !st.flags[it.requireFlag]) continue;
      tmp.set(it.pos[0], it.pos[1], it.pos[2]).sub(pos.current);
      const dist = tmp.length();
      const reach = (it.radius ?? 2.2) + 1.15;
      if (dist > reach) continue;
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = it;
      }
      tmp.normalize();
      const dot = fwd.dot(tmp);
      if (dot > lookedDot) {
        lookedDot = dot;
        looked = it;
      }
    }
    const best = looked ?? nearest;
    onFocus(best);
    if (!freeze && just.interact && best) onUse(best);
    if (!freeze && just.flask) {
      if (st.chapter === 1) st.drinkFlask();
      if (st.chapter === 2) st.drinkOpium();
      if (st.chapter === 3) st.strikeMatch();
    }
    if (!freeze && just.file) st.openFile();
    if (!freeze && just.inventory) st.openInventory();
    if (!freeze && just.coat) st.toggleCoat();
    if (!freeze && just.pause) st.setScreen("pause");
  });

  return null;
}

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      setKeys: (codes: string[]) => void;
      getPosition: () => [number, number, number];
      setYaw?: (v: number) => void;
      setPosition?: (x: number, y: number, z: number) => void;
    };
  }
}
