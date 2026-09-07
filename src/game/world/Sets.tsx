import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import type { LocationDef } from "../types";
import { useGame } from "../store";

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
      ctx.filter = "grayscale(1) contrast(1.14) brightness(1.12)";
      ctx.drawImage(img, 0, 0, w, h);
      map = new THREE.CanvasTexture(canvas);
    }
  } else {
    map = tex.clone();
  }
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeat[0], repeat[1]);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  map.needsUpdate = true;
  return map;
}

function useMat(url: string, repeat: [number, number], tint = "#e8e8e6") {
  const tex = useTexture(url);
  const map = useMemo(() => greyscaleTex(tex, repeat), [tex, repeat[0], repeat[1]]);
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map,
        color: tint,
        roughness: 0.76,
        metalness: 0,
      }),
    [map, tint],
  );
}

function Ground({ loc }: { loc: LocationDef }) {
  const grass = useMat("/game/grass.jpg", [18, 18], "#e6e6e4");
  const wood = useMat("/game/wood.jpg", [8, 8], "#ecece8");
  const stone = useMat("/game/stone.jpg", [10, 10], "#dcdcd8");
  const mat = loc.floor === "wood" ? wood : loc.floor === "stone" ? stone : grass;
  const w = loc.bounds.maxX - loc.bounds.minX + 8;
  const d = loc.bounds.maxZ - loc.bounds.minZ + 8;
  const cx = (loc.bounds.minX + loc.bounds.maxX) / 2;
  const cz = (loc.bounds.minZ + loc.bounds.maxZ) / 2;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, 0, cz]} receiveShadow material={mat}>
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
  const wood = useMat("/game/wood.jpg", [2, 2], color ?? "#e4e4e0");
  const stone = useMat("/game/stone.jpg", [2, 2], color ?? "#d0d0cc");
  const mat = map === "wood" ? wood : map === "stone" ? stone : undefined;
  return (
    <mesh position={pos} castShadow receiveShadow material={mat}>
      <boxGeometry args={size} />
      {!mat && <meshLambertMaterial color={color ?? "#6a6a66"} />}
    </mesh>
  );
}

function Hedge({ pos, size }: { pos: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={pos} castShadow>
      <boxGeometry args={size} />
      <meshLambertMaterial color="#5c5c58" />
    </mesh>
  );
}

function Lamp({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 2.2, 8]} />
        <meshLambertMaterial color="#4a4a46" />
      </mesh>
      <mesh position={[0, 2.25, 0]}>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshStandardMaterial color="#f2f0e8" emissive="#f0ead8" emissiveIntensity={3.2} />
      </mesh>
      <pointLight position={[0, 2.2, 0]} color="#f4f1e8" intensity={140} distance={20} decay={2} />
    </group>
  );
}

function Body({ pos, rot = 0, unknown = false }: { pos: [number, number, number]; rot?: number; unknown?: boolean }) {
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2.2, 0, 0]}>
        <capsuleGeometry args={[0.22, 0.9, 4, 8]} />
        <meshLambertMaterial color={unknown ? "#6a6a66" : "#4e4e4a"} />
      </mesh>
      <mesh position={[0, 0.28, 0.58]}>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshLambertMaterial color="#c8c8c4" />
      </mesh>
      <mesh position={[0.02, 0.34, 0.7]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshLambertMaterial color="#2a2a28" />
      </mesh>
    </group>
  );
}

function Figure({ pos, gray = false, color = "#6a6a66" }: { pos: [number, number, number]; gray?: boolean; color?: string }) {
  const c = gray ? "#8a8a88" : color;
  return (
    <group position={pos}>
      <mesh position={[0, 0.95, 0]} castShadow>
        <capsuleGeometry args={[0.22, 1.15, 4, 8]} />
        <meshLambertMaterial color={c} />
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshLambertMaterial color={gray ? "#b0b0ae" : "#d0d0cc"} />
      </mesh>
      {gray && (
        <mesh position={[0.12, 1.35, 0.16]}>
          <torusGeometry args={[0.04, 0.012, 6, 10]} />
          <meshStandardMaterial color="#7a7a78" emissive="#5a5a58" emissiveIntensity={0.8} />
        </mesh>
      )}
    </group>
  );
}

function Building({ pos, w = 5, d = 4, h = 4.2, label }: { pos: [number, number, number]; w?: number; d?: number; h?: number; label?: string }) {
  return (
    <group position={pos}>
      <Box pos={[0, h / 2, 0]} size={[w, h, d]} map="wood" color="#d8d8d4" />
      <mesh position={[0, h + 0.7, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[w * 0.72, 1.6, 4]} />
        <meshLambertMaterial color="#5a5a56" />
      </mesh>
      <mesh position={[0, 1.5, d / 2 + 0.02]}>
        <planeGeometry args={[0.9, 1.8]} />
        <meshLambertMaterial color="#3a3a38" />
      </mesh>
      <mesh position={[-w * 0.22, 2.4, d / 2 + 0.03]}>
        <planeGeometry args={[0.7, 0.9]} />
        <meshStandardMaterial color="#e8e8e4" emissive="#d8d8d4" emissiveIntensity={1.1} />
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
      <Figure pos={[3.2, 0, 8]} color="#7a7a76" />
      <Box pos={[5.5, 1.2, 9]} size={[2.2, 2.4, 2.2]} map="stone" />
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 40]} />
        <meshLambertMaterial color="#8a8a86" />
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
            <meshLambertMaterial color="#c8c8c4" />
          </mesh>
          <mesh position={[0, 4.4, 0]}>
            <sphereGeometry args={[1.1, 8, 8]} />
            <meshLambertMaterial color="#5a5a56" />
          </mesh>
        </group>
      ))}
      <mesh position={[-11, 0.15, -8]}>
        <capsuleGeometry args={[0.18, 0.7, 4, 8]} />
        <meshLambertMaterial color="#5a5a56" />
      </mesh>
      <mesh position={[-10.4, 0.1, -7.5]} rotation={[1.2, 0.2, 0.4]}>
        <capsuleGeometry args={[0.12, 0.4, 4, 6]} />
        <meshLambertMaterial color="#585854" />
      </mesh>
      <Figure pos={[2.4, 0, 8.5]} color="#6a6a68" />
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[-6 + i * 2.4, 1.15, -6]}>
          <sphereGeometry args={[0.08, 6, 6]} />
          <meshStandardMaterial color="#8a8a88" emissive="#6a6a68" emissiveIntensity={0.35} />
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
      <Figure pos={[-4, 0, 2]} color="#7a7a76" />
      <Figure pos={[14, 0, 1]} gray />
      <mesh position={[0, 0.02, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[36, 6]} />
        <meshLambertMaterial color="#7a7a76" />
      </mesh>
    </>
  );
}

function InteriorSet({ loc }: { loc: LocationDef }) {
  const w = loc.bounds.maxX - loc.bounds.minX;
  const d = loc.bounds.maxZ - loc.bounds.minZ;
  return (
    <>
      <Box pos={[0, 1.7, -d / 2]} size={[w, 3.4, 0.2]} map="wood" color="#d4d4d0" />
      <Box pos={[0, 1.7, d / 2]} size={[w, 3.4, 0.2]} map="wood" color="#d4d4d0" />
      <Box pos={[-w / 2, 1.7, 0]} size={[0.2, 3.4, d]} map="wood" color="#c8c8c4" />
      <Box pos={[w / 2, 1.7, 0]} size={[0.2, 3.4, d]} map="wood" color="#c8c8c4" />
      <mesh position={[0, 3.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshLambertMaterial color="#4a4a48" />
      </mesh>
      <Box pos={[0, 0.7, -1.6]} size={[2.4, 0.12, 1.1]} map="wood" />
      <pointLight position={[0, 2.6, 0]} color="#f2f0e8" intensity={90} distance={12} decay={2} />
      {loc.id === "room" && (
        <mesh position={[0, 1.6, -3.35]}>
          <planeGeometry args={[2.6, 1.8]} />
          <meshLambertMaterial color="#d8d8d4" />
        </mesh>
      )}
      {loc.id === "morgue" && (
        <>
          {[-2.4, 0, 2.4].map((x) => (
            <Box key={x} pos={[x, 0.5, -2]} size={[1.6, 0.7, 2.4]} map="stone" color="#d0d0cc" />
          ))}
          <Figure pos={[0, 0, -0.2]} color="#7a7a76" />
        </>
      )}
      {(loc.id === "almy" || loc.id === "bar" || loc.id === "rectory" || loc.id === "precinct" || loc.id === "voss") && (
        <Figure pos={[0, 0, -1.6]} color="#6e6e6a" />
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
        <meshLambertMaterial color="#4a4a48" />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.4, 48]} />
        <meshLambertMaterial color="#5a5a56" />
      </mesh>
      <pointLight position={[0, 1.4, 8]} color="#e8e8e4" intensity={70} distance={12} decay={2} />
      <mesh position={[-1.1, 0.35, -2]} rotation={[1.4, 0.2, 0.3]}>
        <capsuleGeometry args={[0.28, 1.1, 4, 8]} />
        <meshLambertMaterial color="#8a8a86" />
      </mesh>
      <group position={[1.0, 0.2, -8]}>
        <mesh rotation={[0.4, 0.8, 1.4]}>
          <capsuleGeometry args={[0.22, 1.3, 4, 8]} />
          <meshLambertMaterial color="#5a5a56" />
        </mesh>
        <mesh position={[0.3, 0.7, 0.1]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshLambertMaterial color="#b0b0ac" />
        </mesh>
        {threat && <pointLight color="#9a9a98" intensity={30} distance={6} />}
      </group>
      {loc.chapter === 2 && (
        <mesh position={[0, 1.2, -14]}>
          <torusGeometry args={[1.6, 0.2, 8, 16]} />
          <meshStandardMaterial color="#3a3a38" emissive="#4a4a48" emissiveIntensity={0.5} />
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
        <meshLambertMaterial color="#6a6e72" />
      </mesh>
    </>
  );
}

function CavernSet() {
  return (
    <>
      <Box pos={[-3.2, 2, -4]} size={[0.6, 5, 40]} map="stone" />
      <Box pos={[3.2, 2, -4]} size={[0.6, 5, 40]} map="stone" />
      <pointLight position={[0, 1.2, 8]} color="#e8e8e4" intensity={50} distance={10} decay={2} />
      <mesh position={[1.2, 0.2, 2]} rotation={[1.2, 0, 0.4]}>
        <capsuleGeometry args={[0.2, 0.9, 4, 6]} />
        <meshLambertMaterial color="#8a8a86" />
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
