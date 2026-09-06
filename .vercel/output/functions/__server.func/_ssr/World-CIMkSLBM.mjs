import { i as __toESM } from "../_runtime.mjs";
import { c as RepeatWrapping, f as require_jsx_runtime, i as useThree, l as SRGBColorSpace, n as Canvas, o as Fog, p as require_react, r as useFrame, s as MeshStandardMaterial, t as useTexture, u as Vector3 } from "../_libs/@react-three/drei+[...].mjs";
import { a as LOCATION, i as audio, n as input, r as useGame } from "./routes-B1Ur4wFP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/World-CIMkSLBM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tmp = new Vector3();
var fwd = new Vector3();
function blocked(x, z, walls, b) {
	if (x < b.minX + .4 || x > b.maxX - .4 || z < b.minZ + .4 || z > b.maxZ - .4) return true;
	if (!walls) return false;
	for (const w of walls) if (x > w.minX && x < w.maxX && z > w.minZ && z < w.maxZ) return true;
	return false;
}
function Player({ location, onFocus, onUse }) {
	const { camera, gl } = useThree();
	const yaw = (0, import_react.useRef)(location.yaw ?? 0);
	const pitch = (0, import_react.useRef)(0);
	const pos = (0, import_react.useRef)(new Vector3(...location.spawn));
	const speedRef = (0, import_react.useRef)(0);
	const bob = (0, import_react.useRef)(0);
	const stepAcc = (0, import_react.useRef)(0);
	const jumpV = (0, import_react.useRef)(0);
	const grounded = (0, import_react.useRef)(true);
	const locId = (0, import_react.useRef)(location.id);
	const heard = useGame((s) => s.heardShatter);
	const chapter = useGame((s) => s.chapter);
	(0, import_react.useEffect)(() => {
		locId.current = location.id;
		pos.current.set(location.spawn[0], location.spawn[1], location.spawn[2]);
		yaw.current = location.yaw ?? 0;
		pitch.current = 0;
		jumpV.current = 0;
		camera.position.copy(pos.current);
	}, [
		location.id,
		location.spawn,
		location.yaw,
		camera
	]);
	(0, import_react.useEffect)(() => {
		const el = gl.domElement;
		const down = (e) => {
			if (useGame.getState().overlay) return;
			if (e.button !== 0) return;
			input.pointerDown = true;
			useGame.setState({ lookHint: false });
			el.setPointerCapture(e.pointerId);
			try {
				el.requestPointerLock?.();
			} catch {}
		};
		el.addEventListener("pointerdown", down);
		return () => el.removeEventListener("pointerdown", down);
	}, [gl]);
	(0, import_react.useEffect)(() => {
		window.__controlsTest = {
			getYaw: () => yaw.current,
			getSpeed: () => speedRef.current,
			setKeys: (codes) => input.setKeys(codes),
			getPosition: () => [
				pos.current.x,
				pos.current.y,
				pos.current.z
			],
			setYaw: (v) => {
				yaw.current = v;
			},
			setPosition: (x, y, z) => {
				pos.current.set(x, y, z);
			}
		};
		return () => {
			delete window.__controlsTest;
		};
	}, []);
	useFrame((_, raw) => {
		const dt = Math.min(raw, .1);
		const { now, just } = input.sample();
		const st = useGame.getState();
		const freeze = Boolean(st.overlay) || st.screen !== "play";
		if (!freeze) {
			yaw.current -= now.lookX * .0024;
			pitch.current = Math.max(-1.25, Math.min(1.2, pitch.current - now.lookY * .002));
			const fx = -Math.sin(yaw.current);
			const fz = -Math.cos(yaw.current);
			const rx = Math.cos(yaw.current);
			const rz = -Math.sin(yaw.current);
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
			} else pos.current.y = location.spawn[1];
			if (mag > .15) {
				bob.current += dt * (7 + mag * 4);
				stepAcc.current += dt;
				if (stepAcc.current > .48 && heard) {
					stepAcc.current = 0;
					audio.foot(.8 + Math.random() * .3);
				}
			} else bob.current *= 1 - dt * 6;
		}
		const eye = pos.current.y + Math.sin(bob.current) * .035;
		camera.position.set(pos.current.x, eye, pos.current.z);
		camera.rotation.order = "YXZ";
		camera.rotation.y = yaw.current;
		camera.rotation.x = pitch.current;
		camera.getWorldDirection(fwd);
		let best = null;
		let bestScore = .62;
		for (const it of location.interactables) {
			if (it.hideIfExamined && st.examined[it.id]) continue;
			if (it.requireFlag && !st.flags[it.requireFlag]) continue;
			tmp.set(it.pos[0], it.pos[1], it.pos[2]).sub(pos.current);
			if (tmp.length() > (it.radius ?? 1.8) + .7) continue;
			tmp.normalize();
			const dot = fwd.dot(tmp);
			if (dot > bestScore) {
				bestScore = dot;
				best = it;
			}
		}
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
function useMat(url, repeat, tint = "#ffffff") {
	const tex = useTexture(url);
	tex.wrapS = tex.wrapT = RepeatWrapping;
	tex.repeat.set(repeat[0], repeat[1]);
	tex.colorSpace = SRGBColorSpace;
	return (0, import_react.useMemo)(() => new MeshStandardMaterial({
		map: tex,
		color: tint,
		roughness: .92,
		metalness: .02
	}), [tex, tint]);
}
function Ground({ loc }) {
	const grass = useMat("/game/grass.jpg", [18, 18], "#9aa08c");
	const wood = useMat("/game/wood.jpg", [8, 8], "#c4b49a");
	const stone = useMat("/game/stone.jpg", [10, 10], "#8a8680");
	const mat = loc.floor === "wood" ? wood : loc.floor === "stone" ? stone : grass;
	const w = loc.bounds.maxX - loc.bounds.minX + 8;
	const d = loc.bounds.maxZ - loc.bounds.minZ + 8;
	const cx = (loc.bounds.minX + loc.bounds.maxX) / 2;
	const cz = (loc.bounds.minZ + loc.bounds.maxZ) / 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		position: [
			cx,
			0,
			cz
		],
		receiveShadow: true,
		material: mat,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [w, d] })
	});
}
function Box({ pos, size, color, map }) {
	const wood = useMat("/game/wood.jpg", [2, 2], color ?? "#bba890");
	const stone = useMat("/game/stone.jpg", [2, 2], color ?? "#7a7670");
	const mat = map === "wood" ? wood : map === "stone" ? stone : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: pos,
		castShadow: true,
		receiveShadow: true,
		material: mat,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: size }), !mat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: color ?? "#3a342c",
			roughness: .9
		})]
	});
}
function Hedge({ pos, size }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: pos,
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: size }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#1c2418",
			roughness: 1
		})]
	});
}
function Lamp({ pos }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: pos,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.1,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.05,
					.07,
					2.2,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a241c" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					2.25,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.16,
					10,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e8c98a",
					emissive: "#c4a06a",
					emissiveIntensity: 2.4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					0,
					2.2,
					0
				],
				color: "#e6c48a",
				intensity: 4.2,
				distance: 14,
				decay: 2
			})
		]
	});
}
function Body({ pos, rot = 0, unknown = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: pos,
		rotation: [
			0,
			rot,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.18,
					0
				],
				rotation: [
					Math.PI / 2.2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.22,
					.9,
					4,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: unknown ? "#2a2824" : "#1a1814",
					roughness: .85
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.28,
					.58
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.16,
					10,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#c4b8a4" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.02,
					.34,
					.7
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.028,
					8,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0a0908" })]
			})
		]
	});
}
function Figure({ pos, gray = false, color = "#2a2620" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: pos,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.95,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.22,
					1.15,
					4,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: gray ? "#6a6a6a" : color,
					roughness: .9
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.72,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.16,
					10,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: gray ? "#8a8a8a" : "#c4b49a" })]
			}),
			gray && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.12,
					1.35,
					.16
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.04,
					.012,
					6,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#6b2a2a",
					emissive: "#6b2a2a",
					emissiveIntensity: 1.4
				})]
			})
		]
	});
}
function Building({ pos, w = 5, d = 4, h = 4.2, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: pos,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				pos: [
					0,
					h / 2,
					0
				],
				size: [
					w,
					h,
					d
				],
				map: "wood",
				color: "#6a5a48"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					h + .7,
					0
				],
				rotation: [
					0,
					Math.PI / 4,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					w * .72,
					1.6,
					4
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2c241c" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.5,
					d / 2 + .02
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.9, 1.8] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1a1410" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-w * .22,
					2.4,
					d / 2 + .03
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.7, .9] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e0b56a",
					emissive: "#c4a06a",
					emissiveIntensity: .8
				})]
			}),
			label ? null : null
		]
	});
}
function DriveSet() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { pos: [
			-2.4,
			0,
			6
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { pos: [
			2.4,
			0,
			6
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { pos: [
			-2.4,
			0,
			-4
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { pos: [
			2.4,
			0,
			-4
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
			pos: [
				0,
				0,
				-20
			],
			w: 10,
			d: 6,
			h: 6
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hedge, {
			pos: [
				-6.2,
				.7,
				0
			],
			size: [
				.8,
				1.4,
				36
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hedge, {
			pos: [
				6.2,
				.7,
				0
			],
			size: [
				.8,
				1.4,
				36
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			pos: [
				3.2,
				0,
				8
			],
			color: "#3a342c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				5.5,
				1.2,
				9
			],
			size: [
				2.2,
				2.4,
				2.2
			],
			map: "stone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.02,
				0
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [4.2, 40] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4a453c",
				roughness: 1
			})]
		})
	] });
}
function GardenSet() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
			pos: [
				0,
				0,
				-18
			],
			w: 12,
			d: 5,
			h: 5.5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { pos: [
			6,
			0,
			6
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { pos: [
			-8,
			0,
			4
		] }),
		[
			-8,
			-4,
			0,
			4,
			8
		].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hedge, {
			pos: [
				x,
				.7,
				-6
			],
			size: [
				3.2,
				1.5,
				.7
			]
		}, x)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hedge, {
			pos: [
				-10,
				.8,
				-1
			],
			size: [
				.7,
				1.6,
				10
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hedge, {
			pos: [
				10,
				.8,
				-1
			],
			size: [
				.7,
				1.6,
				10
			]
		}),
		[
			[
				-4.2,
				0,
				-1.2,
				.4,
				false
			],
			[
				-1.6,
				0,
				-2.4,
				.1,
				false
			],
			[
				1.2,
				0,
				-2.6,
				-.2,
				false
			],
			[
				3.8,
				0,
				-1.6,
				-.6,
				false
			],
			[
				5.2,
				0,
				.6,
				-1.1,
				false
			],
			[
				-5.4,
				0,
				.8,
				.9,
				true
			]
		].map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {
			pos: [
				b[0],
				b[1],
				b[2]
			],
			rot: b[3],
			unknown: b[4]
		}, i)),
		[
			-12,
			-10.5,
			-13
		].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				x,
				0,
				-8 - i * .4
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					2.2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.12,
					.16,
					4.4,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#d8d0c4" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					4.4,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					1.1,
					8,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1e2418" })]
			})]
		}, x)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-11,
				.15,
				-8
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
				.18,
				.7,
				4,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2c2418" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-10.4,
				.1,
				-7.5
			],
			rotation: [
				1.2,
				.2,
				.4
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
				.12,
				.4,
				4,
				6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a2218" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			pos: [
				2.4,
				0,
				8.5
			],
			color: "#1c1c22"
		}),
		[
			0,
			1,
			2,
			3,
			4
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-6 + i * 2.4,
				1.15,
				-6
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.08,
				6,
				6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#6b2a2a",
				emissive: "#3a1010",
				emissiveIntensity: .4
			})]
		}, i))
	] });
}
function StreetSet() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		[
			[-12, -6],
			[-6, -6],
			[0, -6],
			[6, -6],
			[12, -6],
			[-8, 8],
			[4, 8],
			[10, 8]
		].map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
			pos: [
				x,
				0,
				z < 0 ? z - 2.2 : z + 2.2
			],
			w: 5.2,
			d: 4.2,
			h: 3.8 + i % 3 * .4
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { pos: [
			-3,
			0,
			1
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { pos: [
			5,
			0,
			1
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { pos: [
			-10,
			0,
			1
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			pos: [
				-4,
				0,
				2
			],
			color: "#3a3028"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			pos: [
				14,
				0,
				1
			],
			gray: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.02,
				1
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [36, 6] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3e3a34",
				roughness: 1
			})]
		})
	] });
}
function InteriorSet({ loc }) {
	const w = loc.bounds.maxX - loc.bounds.minX;
	const d = loc.bounds.maxZ - loc.bounds.minZ;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				0,
				1.7,
				-d / 2
			],
			size: [
				w,
				3.4,
				.2
			],
			map: "wood",
			color: "#5a4c3c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				0,
				1.7,
				d / 2
			],
			size: [
				w,
				3.4,
				.2
			],
			map: "wood",
			color: "#5a4c3c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				-w / 2,
				1.7,
				0
			],
			size: [
				.2,
				3.4,
				d
			],
			map: "wood",
			color: "#4a4034"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				w / 2,
				1.7,
				0
			],
			size: [
				.2,
				3.4,
				d
			],
			map: "wood",
			color: "#4a4034"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				3.35,
				0
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [w, d] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1a1612" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				0,
				.7,
				-1.6
			],
			size: [
				2.4,
				.12,
				1.1
			],
			map: "wood"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				2.6,
				0
			],
			color: "#e6c48a",
			intensity: 2.4,
			distance: 9
		}),
		loc.id === "room" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.6,
				-3.35
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.6, 1.8] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#c4b090" })]
		}),
		loc.id === "morgue" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [[
			-2.4,
			0,
			2.4
		].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				x,
				.5,
				-2
			],
			size: [
				1.6,
				.7,
				2.4
			],
			map: "stone",
			color: "#8a8680"
		}, x)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			pos: [
				0,
				0,
				-.2
			],
			color: "#3a3a38"
		})] }),
		(loc.id === "almy" || loc.id === "bar" || loc.id === "rectory" || loc.id === "precinct" || loc.id === "voss") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			pos: [
				0,
				0,
				-1.6
			],
			color: "#2e2a24"
		}),
		loc.id === "bar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				0,
				.9,
				-2.6
			],
			size: [
				4.4,
				1.1,
				.7
			],
			map: "wood"
		})
	] });
}
function TunnelSet({ loc }) {
	const threat = useGame((s) => s.flags.cultistSeen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				-2.4,
				1.6,
				0
			],
			size: [
				.4,
				3.2,
				48
			],
			map: "stone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				2.4,
				1.6,
				0
			],
			size: [
				.4,
				3.2,
				48
			],
			map: "stone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				3.1,
				0
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [5, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1a1612" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.02,
				0
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [4.4, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1c1814",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				1.4,
				8
			],
			color: "#c4a06a",
			intensity: 1.6,
			distance: 8
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-1.1,
				.35,
				-2
			],
			rotation: [
				1.4,
				.2,
				.3
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
				.28,
				1.1,
				4,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#6a7a6a",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				1,
				.2,
				-8
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						.4,
						.8,
						1.4
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
						.22,
						1.3,
						4,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a2420" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.3,
						.7,
						.1
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.18,
						8,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#8a7a6a" })]
				}),
				threat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					color: "#6b2a2a",
					intensity: .8,
					distance: 5
				})
			]
		}),
		loc.chapter === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.2,
				-14
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				1.6,
				.2,
				8,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#0a0a0c",
				emissive: "#1a1010",
				emissiveIntensity: .6
			})]
		})
	] });
}
function IslandSet() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { pos: [
			4,
			0,
			6
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				-5,
				1.2,
				-6
			],
			size: [
				4,
				2.4,
				3
			],
			map: "stone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				6,
				.8,
				-8
			],
			size: [
				3,
				1.6,
				5
			],
			map: "stone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				0,
				.4,
				-12
			],
			size: [
				8,
				.8,
				3
			],
			map: "stone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			pos: [
				-6,
				0,
				-2
			],
			gray: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			pos: [
				-5.2,
				0,
				-2.6
			],
			gray: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-.4,
				12
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [40, 12] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2a3238",
				roughness: .3,
				metalness: .15
			})]
		})
	] });
}
function CavernSet() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				-3.2,
				2,
				-4
			],
			size: [
				.6,
				5,
				40
			],
			map: "stone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			pos: [
				3.2,
				2,
				-4
			],
			size: [
				.6,
				5,
				40
			],
			map: "stone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				1.2,
				8
			],
			color: "#c4a06a",
			intensity: .9,
			distance: 7
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1.2,
				.2,
				2
			],
			rotation: [
				1.2,
				0,
				.4
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
				.2,
				.9,
				4,
				6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#6a6058" })]
		})
	] });
}
function LocationSet({ loc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ground, { loc }),
		loc.set === "drive" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriveSet, {}),
		loc.set === "garden" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GardenSet, {}),
		loc.set === "street" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreetSet, {}),
		(loc.set === "interior" || loc.set === "office") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteriorSet, { loc }),
		loc.set === "tunnel" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TunnelSet, { loc }),
		loc.set === "island" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IslandSet, {}),
		loc.set === "cavern" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CavernSet, {})
	] });
}
function FogRig({ color, near, far }) {
	useFrame(({ scene }) => {
		scene.fog = scene.fog ?? new Fog(color, near, far);
		const f = scene.fog;
		f.color.set(color);
		f.near = near;
		f.far = far;
	});
	return null;
}
function Threat() {
	const loc = useGame((s) => s.locationId);
	const flags = useGame((s) => s.flags);
	const ammo = useGame((s) => s.ammo);
	const timer = (0, import_react.useRef)(0);
	const staggered = (0, import_react.useRef)(0);
	useFrame((_, dt) => {
		if (loc !== "tunnel" && loc !== "cavern" && loc !== "maw") return;
		const st = useGame.getState();
		const p = window.__controlsTest?.getPosition?.();
		if (!p) return;
		if (staggered.current > 0) staggered.current -= dt;
		const cult = loc === "tunnel" ? [1, -8] : loc === "maw" ? [0, -10] : [0, -12];
		const d = Math.hypot(p[0] - cult[0], p[2] - cult[1]);
		if (flags.cultistSeen || loc !== "tunnel") {
			if (d < 3.2 && staggered.current <= 0) {
				timer.current += dt;
				if (Math.random() < dt * .4) audio.cough(.7);
				if (timer.current > 2.8) {
					timer.current = 0;
					st.die();
				}
			} else timer.current = Math.max(0, timer.current - dt);
		}
		const sailor = Math.hypot(p[0] + 1.1, p[2] + 2);
		if (loc === "tunnel" && sailor < 1.6 && staggered.current <= 0 && flags.cultistSeen) {
			if (Math.random() < dt * .25) audio.groan();
		}
	});
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.code !== "KeyR" && e.code !== "Space") return;
			const st = useGame.getState();
			if (st.overlay || st.screen !== "play") return;
			if (e.code === "KeyR" || e.code === "Space") {
				if (st.ammo > 0) {
					st.fire();
					staggered.current = 1.1 + st.strength * .12;
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
		if (Math.random() < .003 + st.decay * .01) audio.cough(.25 + st.decay * .5);
		st.tickDecay(1 / 60);
	});
	return null;
}
function Scene() {
	const id = useGame((s) => s.locationId);
	const loc = LOCATION[id];
	const setPrompt = useGame((s) => s.setPrompt);
	const [focus, setFocus] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setPrompt(focus ? `${focus.label}` : null);
	}, [focus, setPrompt]);
	if (!loc) return null;
	const onUse = (it) => {
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
					unlock: r.unlock
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
			if (st.spine) setTimeout(() => st.die(), 1600);
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
				flag: it.flag
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
				flag: it.flag
			});
			return;
		}
		st.examine(it.id, it.title ?? it.label, it.body ?? "", {
			clueId: it.clueId,
			perception: it.perception,
			item: it.item,
			flag: it.flag
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: [loc.fog]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FogRig, {
			color: loc.fog,
			near: loc.fogNear,
			far: loc.fogFar
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			intensity: .18,
			color: loc.ambient
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#3a342c",
			"#0a0908",
			.35
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationSet, { loc }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Player, {
			location: loc,
			onFocus: setFocus,
			onUse
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Threat, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoughBed, {})
	] });
}
function World() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		className: "game-canvas",
		dpr: [1, 1.6],
		shadows: false,
		gl: {
			antialias: true,
			alpha: false,
			powerPreference: "high-performance"
		},
		camera: {
			fov: 64,
			near: .08,
			far: 90,
			position: [
				0,
				1.7,
				16
			]
		},
		onCreated: ({ gl }) => {
			gl.setClearColor("#0a0908");
			gl.toneMapping = 4;
			gl.toneMappingExposure = .92;
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
		})
	});
}
//#endregion
export { World };
