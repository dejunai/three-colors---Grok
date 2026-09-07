import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import type { LocationDef } from "../types";
import { useGame } from "../store";

/** Tiny procedural silver-nitrate maps — no network, never suspends, never black. */
function nitrateTex(seed: number, repeat: [number, number], lift = 168) {
  const s = 64;
  const data = new Uint8Array(s * s * 4);
  for (let i = 0; i < s * s; i++) {
    const x = i % s;
    const y = (i / s) | 0;
    const n = ((x * 13 + y * 31 + seed * 17) ^ (x * y + seed)) & 255;
    const v = Math.min(255, Math.max(70, lift + ((n % 53) - 24)));
    data[i * 4] = v;
    data[i * 4 + 1] = v;
    data[i * 4 + 2] = Math.max(0, v - 2);
    data[i * 4 + 3] = 255;
  }
  const map = new THREE.DataTexture(data, s, s);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeat[0], repeat[1]);
  map.magFilter = THREE.NearestFilter;
  map.minFilter = THREE.LinearFilter;
  map.colorSpace = THREE.SRGBColorSpace;
  map.needsUpdate = true;
  return map;
}

function greyscaleTex(tex: THREE.Texture, repeat: [number, number]) {
  const img = tex.image as CanvasImageSource | undefined;
  const w =
    (img as HTMLImageElement | undefined)?.naturalWidth ||
    (img as HTMLImageElement | undefined)?.width ||
    (img as ImageBitmap | undefined)?.width ||
    0;
  const h =
    (img as HTMLImageElement | undefined)?.naturalHeight ||
    (img as HTMLImageElement | undefined)?.height ||
    (img as ImageBitmap | undefined)?.height ||
    0;
  let map: THREE.Texture = tex;
  if (img && w && h && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.filter = "grayscale(1) contrast(1.1) brightness(1.35)";
      ctx.drawImage(img, 0, 0, w, h);
      map = new THREE.CanvasTexture(canvas);
    }
  }
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeat[0], repeat[1]);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  map.needsUpdate = true;
  return map;
}

function useMat(url: string, kind: "grass" | "wood" | "stone", repeat: [number, number], tint = "#e8e8e6") {
  const fallback = useMemo(() => {
    const seed = kind === "grass" ? 3 : kind === "wood" ? 11 : 23;
    const lift = kind === "grass" ? 160 : kind === "wood" ? 178 : 150;
    return new THREE.MeshBasicMaterial({
      map: nitrateTex(seed, repeat, lift),
      color: tint,
      fog: true,
    });
  }, [kind, repeat[0], repeat[1], tint]);
  const [mat, setMat] = useState(fallback);
  useEffect(() => {
    let dead = false;
    const loader = new THREE.TextureLoader();
    loader.load(url, (tex) => {
      if (dead) return;
      setMat(
        new THREE.MeshBasicMaterial({
          map: greyscaleTex(tex, repeat),
          color: tint,
          fog: true,
        }),
      );
    });
    return () => {
      dead = true;
    };
  }, [url, repeat[0], repeat[1], tint]);
  return mat;
}

function Ground({ loc }: { loc: LocationDef }) {
  const grass = useMat("/game/grass.jpg", "grass", [18, 18], "#f0f0ec");
  const wood = useMat("/game/wood.jpg", "wood", [8, 8], "#ecece8");
  const stone = useMat("/game/stone.jpg", "stone", [10, 10], "#e4e4e0");
  const mat = loc.floor === "wood" ? wood : loc.floor === "stone" ? stone : grass;
  const w = loc.bounds.maxX - loc.bounds.minX + 8;
  const d = loc.bounds.maxZ - loc.bounds.minZ + 8;
  const cx = (loc.bounds.minX + loc.bounds.maxX) / 2;
  const cz = (loc.bounds.minZ + loc.bounds.maxZ) / 2;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, 0, cz]} material={mat}>
      <planeGeometry args={[w, d]} />
    </mesh>
  );
}

function Box({
  pos,
  size,
  color,
  map,
}: {
  pos: [number, number, number];
  size: [number, number, number];
  color?: string;
  map?: "wood" | "stone";
}) {
  const wood = useMat("/game/wood.jpg", "wood", [2, 2], color ?? "#e8e8e4");
  const stone = useMat("/game/stone.jpg", "stone", [2, 2], color ?? "#d8d8d4");
  const mat = map === "wood" ? wood : map === "stone" ? stone : undefined;
  return (
    <mesh position={pos} material={mat}>
      <boxGeometry args={size} />
      {!mat && <meshBasicMaterial color={color ?? "#8a8a86"} />}
    </mesh>
  );
}

function Hedge({ pos, size }: { pos: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={size} />
      <meshBasicMaterial color="#6e6e6a" />
    </mesh>
  );
}

function Lamp({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 2.2, 8]} />
        <meshBasicMaterial color="#5a5a56" />
      </mesh>
      <mesh position={[0, 2.25, 0]}>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshBasicMaterial color="#f2f0e8" />
      </mesh>
    </group>
  );
}

function Body({ pos, rot = 0, unknown = false }: { pos: [number, number, number]; rot?: number; unknown?: boolean }) {
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2.2, 0, 0]}>
        <capsuleGeometry args={[0.22, 0.9, 4, 8]} />
        <meshBasicMaterial color={unknown ? "#8a8a86" : "#6e6e6a"} />
      </mesh>
      <mesh position={[0, 0.28, 0.58]}>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshBasicMaterial color="#d0d0cc" />
      </mesh>
      <mesh position={[0.02, 0.34, 0.7]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color="#3a3a38" />
      </mesh>
    </group>
  );
}

function Figure({ pos, gray = false, color = "#8a8a86" }: { pos: [number, number, number]; gray?: boolean; color?: string }) {
  const c = gray ? "#9a9a96" : color;
  return (
    <group position={pos}>
      <mesh position={[0, 0.95, 0]}>
        <capsuleGeometry args={[0.22, 1.15, 4, 8]} />
        <meshBasicMaterial color={c} />
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshBasicMaterial color={gray ? "#c4c4c0" : "#d8d8d4"} />
      </mesh>
      {gray && (
        <mesh position={[0.12, 1.35, 0.16]}>
          <torusGeometry args={[0.04, 0.012, 6, 10]} />
          <meshBasicMaterial color="#9a9a96" />
        </mesh>
      )}
    </group>
  );
}

function Building({ pos, w = 5, d = 4, h = 4.2, label }: { pos: [number, number, number]; w?: number; d?: number; h?: number; label?: string }) {
  return (
    <group position={pos}>
      <Box pos={[0, h / 2, 0]} size={[w, h, d]} map="wood" color="#e0e0dc" />
      <mesh position={[0, h + 0.7, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[w * 0.72, 1.6, 4]} />
        <meshBasicMaterial color="#6e6e6a" />
      </mesh>
      <mesh position={[0, 1.5, d / 2 + 0.02]}>
        <planeGeometry args={[0.9, 1.8]} />
        <meshBasicMaterial color="#4a4a48" />
      </mesh>
      <mesh position={[-w * 0.22, 2.4, d / 2 + 0.03]}>
        <planeGeometry args={[0.7, 0.9]} />
        <meshBasicMaterial color="#ecece8" />
      </mesh>
      {label ? null : null}
    </group>
  );
}

function DriveSet() {
  return (
    <>
      <Lamp pos={[-2.4, 0, 6]} />
      <Lamp pos={[2.4, 0, 6]} />
      <Lamp pos={[-2.4, 0, -4]} />
      <Lamp pos={[2.4, 0, -4]} />
      <Building pos={[0, 0, -20]} w={10} d={6} h={6} />
      <Hedge pos={[-6.2, 0.7, 0]} size={[0.8, 1.4, 36]} />
      <Hedge pos={[6.2, 0.7, 0]} size={[0.8, 1.4, 36]} />
      <Figure pos={[3.2, 0, 8]} color="#8a8a86" />
      <Box pos={[5.5, 1.2, 9]} size={[2.2, 2.4, 2.2]} map="stone" />
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 40]} />
        <meshBasicMaterial color="#9a9a96" />
      </mesh>
    </>
  );
}

function GardenSet() {
  const bodies: [number, number, number, number, boolean][] = [
    [-4.2, 0, -1.2, 0.4, false],
    [-1.6, 0, -2.4, 0.1, false],
    [1.2, 0, -2.6, -0.2, false],
    [3.8, 0, -1.6, -0.6, false],
    [5.2, 0, 0.6, -1.1, false],
    [-5.4, 0, 0.8, 0.9, true],
  ];
  return (
    <>
      <Building pos={[0, 0, -18]} w={12} d={5} h={5.5} />
      <Lamp pos={[6, 0, 6]} />
      <Lamp pos={[-8, 0, 4]} />
      {[-8, -4, 0, 4, 8].map((x) => (
        <Hedge key={x} pos={[x, 0.7, -6]} size={[3.2, 1.5, 0.7]} />
      ))}
      <Hedge pos={[-10, 0.8, -1]} size={[0.7, 1.6, 10]} />
      <Hedge pos={[10, 0.8, -1]} size={[0.7, 1.6, 10]} />
      {bodies.map((b, i) => (
        <Body key={i} pos={[b[0], b[1], b[2]]} rot={b[3]} unknown={b[4]} />
      ))}
      {[-12, -10.5, -13].map((x, i) => (
        <group key={x} position={[x, 0, -8 - i * 0.4]}>
          <mesh position={[0, 2.2, 0]}>
            <cylinderGeometry args={[0.12, 0.16, 4.4, 6]} />
            <meshBasicMaterial color="#d0d0cc" />
          </mesh>
          <mesh position={[0, 4.4, 0]}>
            <sphereGeometry args={[1.1, 8, 8]} />
            <meshBasicMaterial color="#7a7a76" />
          </mesh>
        </group>
      ))}
      <mesh position={[-11, 0.15, -8]}>
        <capsuleGeometry args={[0.18, 0.7, 4, 8]} />
        <meshBasicMaterial color="#7a7a76" />
      </mesh>
      <mesh position={[-10.4, 0.1, -7.5]} rotation={[1.2, 0.2, 0.4]}>
        <capsuleGeometry args={[0.12, 0.4, 4, 6]} />
        <meshBasicMaterial color="#767672" />
      </mesh>
      <Figure pos={[2.4, 0, 8.5]} color="#8a8a86" />
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[-6 + i * 2.4, 1.15, -6]}>
          <sphereGeometry args={[0.08, 6, 6]} />
          <meshBasicMaterial color="#b0b0ac" />
        </mesh>
      ))}
    </>
  );
}

function StreetSet() {
  const doors: [number, number][] = [
    [-12, -6],
    [-6, -6],
    [0, -6],
    [6, -6],
    [12, -6],
    [-8, 8],
    [4, 8],
    [10, 8],
  ];
  return (
    <>
      {doors.map(([x, z], i) => (
        <Building key={i} pos={[x, 0, z < 0 ? z - 2.2 : z + 2.2]} w={5.2} d={4.2} h={3.8 + (i % 3) * 0.4} />
      ))}
      <Lamp pos={[-3, 0, 1]} />
      <Lamp pos={[5, 0, 1]} />
      <Lamp pos={[-10, 0, 1]} />
      <Figure pos={[-4, 0, 2]} color="#8a8a86" />
      <Figure pos={[14, 0, 1]} gray />
      <mesh position={[0, 0.02, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[36, 6]} />
        <meshBasicMaterial color="#8e8e8a" />
      </mesh>
    </>
  );
}

function InteriorSet({ loc }: { loc: LocationDef }) {
  const w = loc.bounds.maxX - loc.bounds.minX;
  const d = loc.bounds.maxZ - loc.bounds.minZ;
  return (
    <>
      <Box pos={[0, 1.7, -d / 2]} size={[w, 3.4, 0.2]} map="wood" color="#dcdcd8" />
      <Box pos={[0, 1.7, d / 2]} size={[w, 3.4, 0.2]} map="wood" color="#dcdcd8" />
      <Box pos={[-w / 2, 1.7, 0]} size={[0.2, 3.4, d]} map="wood" color="#d4d4d0" />
      <Box pos={[w / 2, 1.7, 0]} size={[0.2, 3.4, d]} map="wood" color="#d4d4d0" />
      <mesh position={[0, 3.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshBasicMaterial color="#6e6e6a" />
      </mesh>
      <Box pos={[0, 0.7, -1.6]} size={[2.4, 0.12, 1.1]} map="wood" />
      {loc.id === "room" && (
        <mesh position={[0, 1.6, -3.35]}>
          <planeGeometry args={[2.6, 1.8]} />
          <meshBasicMaterial color="#e0e0dc" />
        </mesh>
      )}
      {loc.id === "morgue" && (
        <>
          {[-2.4, 0, 2.4].map((x) => (
            <Box key={x} pos={[x, 0.5, -2]} size={[1.6, 0.7, 2.4]} map="stone" color="#d8d8d4" />
          ))}
          <Figure pos={[0, 0, -0.2]} color="#8a8a86" />
        </>
      )}
      {(loc.id === "almy" || loc.id === "bar" || loc.id === "rectory" || loc.id === "precinct" || loc.id === "voss") && (
        <Figure pos={[0, 0, -1.6]} color="#8a8a86" />
      )}
      {loc.id === "bar" && <Box pos={[0, 0.9, -2.6]} size={[4.4, 1.1, 0.7]} map="wood" />}
    </>
  );
}

function TunnelSet({ loc }: { loc: LocationDef }) {
  const threat = useGame((s) => s.flags.cultistSeen);
  return (
    <>
      <Box pos={[-2.4, 1.6, 0]} size={[0.4, 3.2, 48]} map="stone" />
      <Box pos={[2.4, 1.6, 0]} size={[0.4, 3.2, 48]} map="stone" />
      <mesh position={[0, 3.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 48]} />
        <meshBasicMaterial color="#6a6a66" />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.4, 48]} />
        <meshBasicMaterial color="#7a7a76" />
      </mesh>
      <mesh position={[-1.1, 0.35, -2]} rotation={[1.4, 0.2, 0.3]}>
        <capsuleGeometry args={[0.28, 1.1, 4, 8]} />
        <meshBasicMaterial color="#9a9a96" />
      </mesh>
      <group position={[1.0, 0.2, -8]}>
        <mesh rotation={[0.4, 0.8, 1.4]}>
          <capsuleGeometry args={[0.22, 1.3, 4, 8]} />
          <meshBasicMaterial color="#7a7a76" />
        </mesh>
        <mesh position={[0.3, 0.7, 0.1]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshBasicMaterial color="#c4c4c0" />
        </mesh>
        {threat && <pointLight color="#c8c8c4" intensity={8} distance={6} />}
      </group>
      {loc.chapter === 2 && (
        <mesh position={[0, 1.2, -14]}>
          <torusGeometry args={[1.6, 0.2, 8, 16]} />
          <meshBasicMaterial color="#5a5a56" />
        </mesh>
      )}
    </>
  );
}

function IslandSet() {
  return (
    <>
      <Lamp pos={[4, 0, 6]} />
      <Box pos={[-5, 1.2, -6]} size={[4, 2.4, 3]} map="stone" />
      <Box pos={[6, 0.8, -8]} size={[3, 1.6, 5]} map="stone" />
      <Box pos={[0, 0.4, -12]} size={[8, 0.8, 3]} map="stone" />
      <Figure pos={[-6, 0, -2]} gray />
      <Figure pos={[-5.2, 0, -2.6]} gray />
      <mesh position={[0, -0.4, 12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 12]} />
        <meshBasicMaterial color="#7a7e82" />
      </mesh>
    </>
  );
}

function CavernSet() {
  return (
    <>
      <Box pos={[-3.2, 2, -4]} size={[0.6, 5, 40]} map="stone" />
      <Box pos={[3.2, 2, -4]} size={[0.6, 5, 40]} map="stone" />
      <mesh position={[1.2, 0.2, 2]} rotation={[1.2, 0, 0.4]}>
        <capsuleGeometry args={[0.2, 0.9, 4, 6]} />
        <meshBasicMaterial color="#9a9a96" />
      </mesh>
    </>
  );
}

export function LocationSet({ loc }: { loc: LocationDef }) {
  return (
    <>
      <Ground loc={loc} />
      {loc.set === "drive" && <DriveSet />}
      {loc.set === "garden" && <GardenSet />}
      {loc.set === "street" && <StreetSet />}
      {(loc.set === "interior" || loc.set === "office") && <InteriorSet loc={loc} />}
      {loc.set === "tunnel" && <TunnelSet loc={loc} />}
      {loc.set === "island" && <IslandSet />}
      {loc.set === "cavern" && <CavernSet />}
    </>
  );
}
