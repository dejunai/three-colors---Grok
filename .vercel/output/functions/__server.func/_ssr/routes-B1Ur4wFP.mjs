import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@react-three/drei+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B1Ur4wFP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var TITLE = "Three Colors of Madness";
var SPINE = [
	"no-exit",
	"six-club",
	"maternal",
	"ophion-name",
	"insurance"
];
var CLUES = {
	"no-exit": {
		id: "no-exit",
		title: "No exit wound",
		fact: "Each clubman bears a single hole above the bridge of the nose. Nothing answers it at the back of the skull. No powder. No pool.",
		unstable: "Each of them asked a bullet to arrive, and it obliged, and troubled itself with nothing else.",
		boardColumn: "club",
		required: true
	},
	wexford: {
		id: "wexford",
		title: "Judge Absalom Wexford",
		fact: "Forty years on the county bench. Sent Walter's father to the workhouse once for public drunkenness.",
		boardColumn: "club"
	},
	fenn: {
		id: "fenn",
		title: "Dr. Aldous Fenn",
		fact: "Signed Constance Corwin's death certificate not eleven months prior. A private library with a book left unlocked.",
		unstable: "Fenn did not fear death. He feared being left behind.",
		boardColumn: "club"
	},
	corliss: {
		id: "corliss",
		title: "District Attorney Miles Corliss",
		fact: "Shook Walter's hand at the Policemen's Benevolent dinner and called him a credit to the badge.",
		boardColumn: "club"
	},
	kessler: {
		id: "kessler",
		title: "Otto Kessler, butcher",
		fact: "Shop on Pickman Street. His boning knife, wiped too clean, tucked under a hedge root.",
		boardColumn: "club"
	},
	pruitt: {
		id: "pruitt",
		title: "Josiah Pruitt",
		fact: "Land and mills and deeds. The kind of fortune that spends half its life proving it owns the other half.",
		boardColumn: "club"
	},
	unknown: {
		id: "unknown",
		title: "Unknown male, club dress",
		fact: "Approx. 50–60. No calling card, no monogram, watch stopped at 3:17, maker's plate filed smooth. The club's rolls do not contain a sixth name.",
		boardColumn: "club",
		required: true
	},
	"six-club": {
		id: "six-club",
		title: "Six members",
		fact: "The club numbers six. The garden holds six men in evening dress. Five named. One never is.",
		boardColumn: "club",
		required: true
	},
	birches: {
		id: "birches",
		title: "Woman and boy, beyond the birches",
		fact: "Clothes poor but not destitute. Not a single clean motion. Officially: transients. Walter wrote the word in under a minute.",
		boardColumn: "victims",
		required: true
	},
	eight: {
		id: "eight",
		title: "Eight people are dead",
		fact: "Odell: six members are dead. The other two are a filing matter. Walter wrote EIGHT in a hand larger than usual.",
		boardColumn: "town"
	},
	naomi: {
		id: "naomi",
		title: "Naomi Freeman",
		fact: "Came north looking for a cousin, then for documentation of wages owed a whaling ancestor. A lay, unpaid. An older boy who did not come north: Ekon.",
		boardColumn: "victims"
	},
	"ophion-name": {
		id: "ophion-name",
		title: "They named the club after the ship",
		fact: "Father Behan: they came to believe the ship had been chosen. It wasn't. Men inherit money and then invent a reason they deserved it.",
		boardColumn: "club",
		required: true
	},
	insurance: {
		id: "insurance",
		title: "Ordinary, well-documented fraud",
		fact: "A Wexford estate purchased within eighteen months of a fleet's loss. A Corliss mill the same season. Pruitt land before the underwriters' ink had dried. Crew lists: Freeman, then again, then not at all.",
		boardColumn: "town",
		required: true
	},
	maternal: {
		id: "maternal",
		title: "They started speaking, tenderly, of her",
		fact: "Kessler, more than once: she'll have us home. She's no different from any mother.",
		unstable: "They stopped speaking of power, toward the end.",
		boardColumn: "club",
		required: true
	},
	knife: {
		id: "knife",
		title: "Kessler's knife",
		fact: "Wiped too clean. Tucked under a hedge root. Never in its life used on a hog.",
		boardColumn: "club"
	},
	tunnel: {
		id: "tunnel",
		title: "A stair that appears on no floor plan",
		fact: "Worked stone, then rock. Two kinds of remains. Force delays one. May end the other.",
		boardColumn: "below"
	},
	book: {
		id: "book",
		title: "A passage copied, not stolen",
		fact: "A minor, largely discredited figure from old cosmogony. A serpent who ruled before being cast down, not destroyed. Walter left the book on Fenn's shelf.",
		boardColumn: "below"
	},
	maid: {
		id: "maid",
		title: "A kitchen maid, previously vanished",
		fact: "Pruitt employed her despite his own signed denial. Walter had given the landowner's word the benefit he withheld from hers.",
		boardColumn: "town"
	}
};
var PROLOGUE = [
	{
		kicker: "Widow's Bight Historical Society  ·  A Civic Reel",
		title: "A fleet went out",
		body: "Roughly a century ago a whaling fleet left this harbor and did not fully come home. The survivors who returned could never tell the same account of what happened twice. The town recorded the loss as weather, and closed the book.",
		img: "/game/harbor-civic.jpg"
	},
	{
		kicker: "From the underwriters' own abstracts",
		title: "Money found its way",
		body: "A great deal of insurance money nonetheless found its way into a small number of hands. Those hands became the town's ruling families. The town has never had to examine any of this.",
		img: "/game/town-dusk.jpg"
	},
	{
		kicker: "The Ophion Club, est. in memory of the fleet",
		title: "An honorific",
		body: "Decades after the wreck, a private society was founded and named for the lost flagship. The club is exclusive on the premise that everyone in it paid a price with their lives — a claim that was true only of the crew, never of the club.",
		img: "/game/club-night.jpg"
	}
];
var LOCATION = Object.fromEntries([
	{
		id: "drive",
		chapter: 1,
		name: "The drive",
		set: "drive",
		spawn: [
			0,
			1.7,
			16
		],
		yaw: 0,
		fog: "#14110e",
		fogNear: 6,
		fogFar: 38,
		ambient: "#2a241c",
		iris: "square",
		floor: "gravel",
		bounds: {
			minX: -8,
			maxX: 8,
			minZ: -22,
			maxZ: 20
		},
		walls: [
			{
				minX: -9,
				maxX: -7.4,
				minZ: -22,
				maxZ: 20
			},
			{
				minX: 7.4,
				maxX: 9,
				minZ: -22,
				maxZ: 20
			},
			{
				minX: -8,
				maxX: 8,
				minZ: -23.5,
				maxZ: -21.2
			}
		],
		interactables: [
			{
				id: "boy",
				pos: [
					3.2,
					1.2,
					8
				],
				label: "Gatehouse boy",
				kind: "person",
				radius: 2.4,
				options: [{
					id: "ask",
					label: "Wait",
					result: {
						lines: [{ text: "THEY'RE IN THE ROSE GARDEN, OFFICER. WHAT'S LEFT OF THEM." }],
						flag: "gardenOpen",
						unlock: "gardenOpen"
					}
				}]
			},
			{
				id: "to-garden",
				pos: [
					0,
					1,
					-18
				],
				label: "The rose garden",
				kind: "exit",
				exitTo: "garden",
				requireFlag: "gardenOpen",
				radius: 2.8
			},
			{
				id: "lantern-post",
				pos: [
					-2.2,
					1,
					4
				],
				label: "Lantern",
				kind: "examine",
				title: "A club lantern",
				body: "The flame is trimmed low, as if whoever last passed here did not intend to be seen coming back.",
				radius: 1.6
			}
		]
	},
	{
		id: "garden",
		chapter: 1,
		name: "The rose garden",
		set: "garden",
		spawn: [
			0,
			1.7,
			12
		],
		fog: "#0b0a09",
		fogNear: 6,
		fogFar: 32,
		ambient: "#181410",
		iris: "open",
		floor: "grass",
		bounds: {
			minX: -16,
			maxX: 16,
			minZ: -16,
			maxZ: 16
		},
		interactables: [
			{
				id: "wexford",
				pos: [
					-4.2,
					.4,
					-1.2
				],
				label: "Judge Wexford",
				kind: "examine",
				title: "Judge Absalom Wexford",
				body: "A single black hole above the bridge of the nose, precise as a coin pressed into wax. No powder scorched the collar. When the head is turned, there is no wound at the back of the skull to answer the one in front.",
				clueId: "wexford",
				perception: 8,
				radius: 1.8
			},
			{
				id: "fenn-body",
				pos: [
					-1.6,
					.4,
					-2.4
				],
				label: "Dr. Fenn",
				kind: "examine",
				title: "Dr. Aldous Fenn",
				body: "He signed your mother's death certificate not eleven months prior. The same hole. The same absence of an exit. Evening dress, as if the meeting had only just been called to order.",
				clueId: "fenn",
				perception: 6,
				radius: 1.8
			},
			{
				id: "corliss-body",
				pos: [
					1.2,
					.4,
					-2.6
				],
				label: "D.A. Corliss",
				kind: "examine",
				title: "District Attorney Miles Corliss",
				body: "He shook your hand at the Policemen's Benevolent dinner. A credit to the badge, he said. The bullet, if that is the word, arrived without asking the rest of the skull for an opinion.",
				clueId: "corliss",
				perception: 5,
				radius: 1.8
			},
			{
				id: "kessler-body",
				pos: [
					3.8,
					.4,
					-1.6
				],
				label: "Otto Kessler",
				kind: "examine",
				title: "Otto Kessler",
				body: "The butcher. More trade than any three shops combined. His good coat is on him. His good knife is not.",
				clueId: "kessler",
				perception: 5,
				radius: 1.8
			},
			{
				id: "pruitt-body",
				pos: [
					5.2,
					.4,
					.6
				],
				label: "Josiah Pruitt",
				kind: "examine",
				title: "Josiah Pruitt",
				body: "Land and mills and deeds. You place the face by reputation before you place it by name. Same hole. Same empty back of the head.",
				clueId: "pruitt",
				perception: 5,
				radius: 1.8
			},
			{
				id: "sixth",
				pos: [
					-5.4,
					.4,
					.8
				],
				label: "Unknown man",
				kind: "examine",
				title: "Unknown male, approx. 50–60, club dress",
				body: "Nothing that wants to be found: no calling card, no monogrammed cuff, no wallet. A watch, stopped at seventeen past three, its maker's plate filed smooth. Some blanks in a case file are not oversights.",
				clueId: "unknown",
				perception: 8,
				radius: 1.8
			},
			{
				id: "knife",
				pos: [
					4.6,
					.2,
					2.4
				],
				label: "Something under the hedge",
				kind: "pickup",
				title: "A boning knife",
				body: "Wiped too clean. Tucked under a hedge root. You bag it. You tag it. You do not yet understand that some blanks are load-bearing.",
				clueId: "knife",
				item: "knife",
				perception: 5,
				hideIfExamined: true,
				radius: 1.5
			},
			{
				id: "birches",
				pos: [
					-11,
					.4,
					-8
				],
				label: "Past the birches",
				kind: "examine",
				title: "A woman and a boy",
				body: "Clothes poor but not destitute — the coat too light for the season, the boy's shoes resoled twice. Whatever was done was not done with a single clean motion. You look once. You write unidentified, and you do not look again.",
				clueId: "birches",
				perception: 8,
				radius: 2.2
			},
			{
				id: "no-exit-note",
				pos: [
					0,
					.3,
					-.2
				],
				label: "The half-circle",
				kind: "examine",
				title: "Six men in evening dress",
				body: "They lie in a half-circle behind the clipped hedges. No blood ran anywhere it should have pooled. As if the bullet had simply been asked to arrive there, and had obliged.",
				clueId: "no-exit",
				perception: 6,
				radius: 2.4
			},
			{
				id: "odell",
				pos: [
					2.4,
					1.1,
					8.5
				],
				label: "Captain Odell",
				kind: "person",
				radius: 2.2,
				options: [{
					id: "report",
					label: "Show him the notes",
					result: {
						lines: [
							{
								speaker: "Odell",
								text: "GAS-MAIN TRAGEDY."
							},
							{
								speaker: "You write",
								text: "NO BURNS."
							},
							{
								speaker: "You write",
								text: "NO EXIT WOUNDS."
							},
							{
								speaker: "Odell",
								text: "Six. Not eight."
							}
						],
						clueId: "six-club",
						perception: 6,
						flag: "odell"
					}
				}, {
					id: "eight",
					label: "Eight people are dead",
					result: {
						lines: [{
							speaker: "You",
							text: "Eight people are dead."
						}, {
							speaker: "Odell",
							text: "Six members are dead. The other two are a filing matter. You understand the difference."
						}],
						clueId: "eight",
						perception: 6,
						flag: "eightOffered"
					}
				}]
			},
			{
				id: "to-street",
				pos: [
					0,
					1,
					14.5
				],
				label: "Leave for town",
				kind: "exit",
				exitTo: "street",
				radius: 2.2
			}
		]
	},
	{
		id: "street",
		chapter: 1,
		name: "Pickman Street",
		set: "street",
		spawn: [
			0,
			1.7,
			6
		],
		fog: "#0d0c0b",
		fogNear: 5,
		fogFar: 30,
		ambient: "#161310",
		iris: "open",
		floor: "gravel",
		bounds: {
			minX: -18,
			maxX: 18,
			minZ: -10,
			maxZ: 12
		},
		interactables: [
			{
				id: "door-morgue",
				pos: [
					-12,
					1,
					-6
				],
				label: "County morgue",
				kind: "exit",
				exitTo: "morgue",
				radius: 2
			},
			{
				id: "door-precinct",
				pos: [
					-6,
					1,
					-6
				],
				label: "Precinct",
				kind: "exit",
				exitTo: "precinct",
				radius: 2
			},
			{
				id: "door-almy",
				pos: [
					0,
					1,
					-6
				],
				label: "Mrs. Almy's boardinghouse",
				kind: "exit",
				exitTo: "almy",
				radius: 2
			},
			{
				id: "door-archive",
				pos: [
					6,
					1,
					-6
				],
				label: "Town archive",
				kind: "exit",
				exitTo: "archive",
				radius: 2
			},
			{
				id: "door-rectory",
				pos: [
					12,
					1,
					-6
				],
				label: "The rectory",
				kind: "exit",
				exitTo: "rectory",
				radius: 2
			},
			{
				id: "door-bar",
				pos: [
					-8,
					1,
					8
				],
				label: "Ophion Club service entrance",
				kind: "exit",
				exitTo: "bar",
				radius: 2
			},
			{
				id: "door-room",
				pos: [
					4,
					1,
					8
				],
				label: "Your room above the cobbler",
				kind: "exit",
				exitTo: "room",
				radius: 2
			},
			{
				id: "door-fenn",
				pos: [
					10,
					1,
					8
				],
				label: "Fenn's house",
				kind: "exit",
				exitTo: "library",
				radius: 2
			},
			{
				id: "widow",
				pos: [
					-4,
					1.1,
					2
				],
				label: "Kessler's widow",
				kind: "person",
				radius: 2,
				options: [{
					id: "badge",
					label: "Speak as the badge",
					requireCoat: "uniform",
					result: {
						lines: [{ text: "SHE WANTS TO KNOW HOW SHOP MONEY BOUGHT A CHAIR AMONG MEN WHO CALLED HIM TRADESMAN TO HIS FACE." }, { text: "Odell is already steering her toward the door." }],
						perception: 3
					}
				}, {
					id: "plain",
					label: "Come back without the badge",
					requireCoat: "plain",
					result: {
						lines: [{ text: "SHE CRIES. SHE TELLS YOU THINGS SHE WOULD NEVER HAVE TOLD A BADGE." }, { text: "HE WORE HIS GOOD COAT TO A CLUB THAT USED HIM AND DESPISED HIM IN THE SAME EVENING." }],
						perception: 6,
						flag: "widowPlain"
					}
				}]
			},
			{
				id: "observer",
				pos: [
					14,
					1.1,
					1
				],
				label: "A quarryman",
				kind: "person",
				radius: 2,
				options: [{
					id: "look",
					label: "He will not meet the frame",
					result: {
						lines: [{ text: "HIS FIRE IS THE COLOR OF ASH. A RING ON HIS HAND CATCHES A COLOR THE REST OF THE STREET DOES NOT HAVE." }, { text: "HE DOES NOT LOOK AT YOU FOR LONG. HE DOES NOT LOOK AT THE CLUB AT ALL." }],
						perception: 4,
						flag: "observer1"
					}
				}]
			}
		]
	},
	{
		id: "morgue",
		chapter: 1,
		name: "County morgue",
		set: "interior",
		spawn: [
			0,
			1.7,
			4
		],
		fog: "#0a0908",
		fogNear: 8,
		fogFar: 22,
		ambient: "#12100e",
		iris: "open",
		floor: "stone",
		bounds: {
			minX: -6,
			maxX: 6,
			minZ: -6,
			maxZ: 6
		},
		walls: [
			{
				minX: -6.2,
				maxX: -5.6,
				minZ: -6,
				maxZ: 6
			},
			{
				minX: 5.6,
				maxX: 6.2,
				minZ: -6,
				maxZ: 6
			},
			{
				minX: -6,
				maxX: 6,
				minZ: -6.2,
				maxZ: -5.6
			}
		],
		interactables: [
			{
				id: "coroner",
				pos: [
					0,
					1.1,
					-2
				],
				label: "The coroner",
				kind: "person",
				radius: 2.2,
				options: [{
					id: "why",
					label: "Why is there no exit wound",
					result: {
						lines: [
							{
								speaker: "You write",
								text: "WHY IS THERE NO EXIT WOUND, DOCTOR."
							},
							{ text: "He opens Wexford's skull a second time as though a different answer might be hiding. Nothing changes. He writes nothing on the sheet." },
							{ text: "This is not a man withholding a diagnosis. This is a man who has simply run out of profession before he ran out of body." }
						],
						clueId: "no-exit",
						perception: 8,
						flag: "coroner"
					}
				}]
			},
			{
				id: "sheets",
				pos: [
					-3,
					.8,
					-1
				],
				label: "Sheeted tables",
				kind: "examine",
				title: "Six tables. Two empty.",
				body: "The row is already the shape Odell wants. The birches will not appear in it. They will simply not be in it, the way a fact that has never been recorded is not technically a lie.",
				clueId: "six-club",
				perception: 4,
				radius: 1.8
			},
			{
				id: "leave-morgue",
				pos: [
					0,
					1,
					5.4
				],
				label: "Street",
				kind: "exit",
				exitTo: "street",
				radius: 1.8
			}
		]
	},
	{
		id: "precinct",
		chapter: 1,
		name: "The precinct",
		set: "interior",
		spawn: [
			0,
			1.7,
			4
		],
		fog: "#0c0b0a",
		fogNear: 10,
		fogFar: 24,
		ambient: "#141210",
		iris: "open",
		floor: "wood",
		bounds: {
			minX: -6,
			maxX: 6,
			minZ: -6,
			maxZ: 6
		},
		interactables: [
			{
				id: "desk",
				pos: [
					0,
					1,
					-2
				],
				label: "Your desk",
				kind: "examine",
				title: "Preliminary notes",
				body: "You can write EIGHT in a hand deliberately larger than usual. Nobody official will ever be obliged to honor it. The file, however it ends, will say eight.",
				radius: 1.8
			},
			{
				id: "file-eight",
				pos: [
					2.2,
					1,
					-1.4
				],
				label: "File the number",
				kind: "use",
				title: "EIGHT",
				body: "Whatever Odell's report eventually says, your own file will say eight. You do not yet know how much that single stubborn digit will matter to a man not yet born.",
				clueId: "eight",
				perception: 5,
				flag: "eight",
				radius: 1.6
			},
			{
				id: "triplicate",
				pos: [
					-2.2,
					1,
					-1.4
				],
				label: "File in triplicate",
				kind: "use",
				title: "In triplicate",
				body: "The clerk stamps without looking. Three copies of a number the town has already decided not to count. One of them, someday, may travel farther than you will.",
				perception: 4,
				flag: "triplicate",
				radius: 1.6
			},
			{
				id: "coat-hook",
				pos: [
					4.4,
					1.2,
					2
				],
				label: "A plain wool coat",
				kind: "pickup",
				title: "A plain wool coat",
				body: "No badge. Purchased for no better reason than that a dead man's boots looked absurd beneath a police-issue trouser and somehow correct beneath the plain wool. You tell yourself this is procedure.",
				item: "coat-plain",
				perception: 2,
				hideIfExamined: true,
				radius: 1.6
			},
			{
				id: "leave-precinct",
				pos: [
					0,
					1,
					5.4
				],
				label: "Street",
				kind: "exit",
				exitTo: "street",
				radius: 1.8
			}
		]
	},
	{
		id: "almy",
		chapter: 1,
		name: "Mrs. Almy's",
		set: "interior",
		spawn: [
			0,
			1.7,
			4
		],
		fog: "#100e0c",
		fogNear: 8,
		fogFar: 20,
		ambient: "#1a1612",
		iris: "open",
		floor: "wood",
		bounds: {
			minX: -5,
			maxX: 5,
			minZ: -5,
			maxZ: 5
		},
		interactables: [{
			id: "almy",
			pos: [
				0,
				1.1,
				-1.6
			],
			label: "Mrs. Almy",
			kind: "person",
			radius: 2.2,
			options: [{
				id: "badge",
				label: "Ask as the badge",
				requireCoat: "uniform",
				result: {
					lines: [{ text: "SHE LOOKS AT THE BADGE AND NOT AT YOU. THE DOOR DOES NOT OPEN ANY WIDER THAN COURTESY REQUIRES. YOU ARE GIVEN NOTHING AT ALL." }],
					perception: 1
				}
			}, {
				id: "plain",
				label: "Ask in the wool coat",
				requireCoat: "plain",
				result: {
					lines: [
						{ text: "SHE LOOKS AT THE COAT RATHER THAN THE MAN WEARING IT, AND STEPS ASIDE." },
						{ text: "A NAME, AT LAST — NAOMI FREEMAN. SHE HAD COME NORTH LOOKING FIRST FOR A COUSIN, THEN FOR DOCUMENTATION OF WAGES OWED A WHALING ANCESTOR." },
						{ text: "A LAY, UNPAID. A SHIP'S NAME SHE REPEATS TWICE BECAUSE SHE CAN SEE YOU DIDN'T CATCH IT THE FIRST TIME." },
						{ text: "OPHION." },
						{ text: "SHE HAD AN OLDER BOY. DIDN'T COME NORTH WITH HER. EKON. EKON FREEMAN." },
						{ text: "YOU WEAR THAT LIKE IT BELONGS TO SOMEBODY ELSE, OFFICER." }
					],
					clueId: "naomi",
					perception: 10,
					flag: "almy"
				}
			}]
		}, {
			id: "leave-almy",
			pos: [
				0,
				1,
				4.6
			],
			label: "Street",
			kind: "exit",
			exitTo: "street",
			radius: 1.6
		}]
	},
	{
		id: "archive",
		chapter: 1,
		name: "Town archive",
		set: "interior",
		spawn: [
			0,
			1.7,
			4
		],
		fog: "#0c0b0a",
		fogNear: 7,
		fogFar: 18,
		ambient: "#12100e",
		iris: "open",
		floor: "wood",
		bounds: {
			minX: -6,
			maxX: 6,
			minZ: -6,
			maxZ: 6
		},
		interactables: [
			{
				id: "ledgers",
				pos: [
					-2,
					1,
					-2
				],
				label: "Insurance abstracts",
				kind: "examine",
				title: "Ordinary, well-documented fraud",
				body: "A Wexford estate purchased within eighteen months of a fleet's loss. A Corliss mill acquired the same season. Land bought up by a Pruitt ancestor before the ink on the underwriters' settlement had properly dried.",
				clueId: "insurance",
				perception: 10,
				radius: 1.8
			},
			{
				id: "crew",
				pos: [
					2,
					1,
					-2
				],
				label: "Crew lists",
				kind: "examine",
				title: "Names half-erased by salt",
				body: "Freeman appears once. Then again. Then not at all, the way a name disappears from a ledger not because a man stopped existing but because nobody left cared enough to keep spelling it correctly.",
				perception: 6,
				flag: "crewlist",
				radius: 1.8
			},
			{
				id: "clerk",
				pos: [
					0,
					1.1,
					1
				],
				label: "Town clerk",
				kind: "person",
				radius: 2,
				options: [{
					id: "badge",
					label: "Ask in uniform",
					requireCoat: "uniform",
					result: {
						lines: [{ text: "PROPERTY RECORDS WITHOUT COMPLAINT. TEA WITHOUT BEING ASKED." }],
						perception: 2
					}
				}, {
					id: "plain",
					label: "Ask without the badge",
					requireCoat: "plain",
					result: {
						lines: [{ text: "FORTY MINUTES. THE SAME RECORDS. NO TEA." }],
						perception: 2
					}
				}]
			},
			{
				id: "leave-archive",
				pos: [
					0,
					1,
					5.4
				],
				label: "Street",
				kind: "exit",
				exitTo: "street",
				radius: 1.6
			}
		]
	},
	{
		id: "rectory",
		chapter: 1,
		name: "Behind the rectory",
		set: "interior",
		spawn: [
			0,
			1.7,
			4
		],
		fog: "#0e0c0a",
		fogNear: 6,
		fogFar: 18,
		ambient: "#15120f",
		iris: "open",
		floor: "stone",
		bounds: {
			minX: -5,
			maxX: 5,
			minZ: -5,
			maxZ: 5
		},
		interactables: [{
			id: "behan",
			pos: [
				0,
				1.1,
				-1.5
			],
			label: "Father Behan",
			kind: "person",
			radius: 2.2,
			options: [{
				id: "club",
				label: "Ask about the club",
				result: {
					lines: [{ text: "HE WILL DISCUSS WEXFORD'S TEMPER, FENN'S VANITY, KESSLER'S GRUDGES. HE WILL NOT DISCUSS WHY HE TWICE DECLINED AN INVITATION." }],
					perception: 4
				}
			}, {
				id: "name",
				label: "Ask what the name means",
				result: {
					lines: [
						{ text: "THEY NAMED THE CLUB AFTER THE SHIP." },
						{
							speaker: "You",
							text: "Known."
						},
						{ text: "THEY CAME TO BELIEVE THE SHIP HAD BEEN CHOSEN." },
						{ text: "IT WASN'T. MEN INHERIT MONEY AND THEN INVENT A REASON THEY DESERVED IT." }
					],
					clueId: "ophion-name",
					perception: 8,
					flag: "behan"
				}
			}]
		}, {
			id: "leave-rectory",
			pos: [
				0,
				1,
				4.6
			],
			label: "Street",
			kind: "exit",
			exitTo: "street",
			radius: 1.6
		}]
	},
	{
		id: "bar",
		chapter: 1,
		name: "The club bar",
		set: "interior",
		spawn: [
			0,
			1.7,
			4
		],
		fog: "#100c08",
		fogNear: 5,
		fogFar: 16,
		ambient: "#1c1610",
		iris: "open",
		floor: "wood",
		bounds: {
			minX: -6,
			maxX: 6,
			minZ: -6,
			maxZ: 6
		},
		interactables: [
			{
				id: "barman",
				pos: [
					0,
					1.1,
					-2.2
				],
				label: "The barman",
				kind: "person",
				radius: 2.2,
				options: [
					{
						id: "badge",
						label: "Drink as Officer Corwin",
						requireCoat: "uniform",
						result: {
							lines: [{ text: "HE CALLS YOU OFFICER CORWIN AND POURS YOU NOTHING YOU HAVEN'T ORDERED." }],
							perception: 1
						}
					},
					{
						id: "sit",
						label: "Sit still, at the far end",
						requireCoat: "plain",
						result: {
							lines: [
								{ text: "HE BEGINS TO TALK NEAR YOU, IF NOT QUITE TO YOU." },
								{ text: "SIX MEN MET ON THE LAST THURSDAY OF EVERY MONTH FOR OVER TWO YEARS. FATHER BEHAN WAS INVITED TWICE AND DECLINED BOTH TIMES. KESSLER ONCE CARRIED A PARCEL WRAPPED IN BUTCHER PAPER INTO A PRIVATE ROOM AND LEFT WITHOUT IT." },
								{ text: "THE SIXTH MAN NEVER SIGNED A BILL, NEVER ARRIVED BY THE FRONT DOOR, AND WAS NEVER ONCE ASKED TO." }
							],
							clueId: "six-club",
							perception: 7,
							flag: "barSit"
						}
					},
					{
						id: "her",
						label: "Wait for the refill you didn't ask for",
						requireCoat: "plain",
						requireClue: "six-club",
						result: {
							lines: [{ text: "THEY STOPPED SPEAKING OF POWER, TOWARD THE END. THEY STARTED SPEAKING, TENDERLY, OF HER." }, { text: "SHE'LL HAVE US HOME, KESSLER SAID, MORE THAN ONCE. SHE'S NO DIFFERENT FROM ANY MOTHER." }],
							clueId: "maternal",
							perception: 10,
							flag: "barHer"
						}
					},
					{
						id: "pantry",
						label: "Ask after hospitality withdrawn",
						requireFlag: "barHer",
						result: {
							lines: [{ text: "THERE'S GIN LEFT FROM BEFORE THE WAR. BEHIND THE OLD PANTRY DOOR. THEY BOARDED IT UP DURING A RENOVATION AND NEVER FINISHED UNBOARDING IT." }, { text: "NOBODY GOES BACK THERE. NOBODY'S GONE BACK THERE IN YEARS." }],
							flag: "pantry",
							unlock: "pantry",
							perception: 4
						}
					}
				]
			},
			{
				id: "to-pantry",
				pos: [
					5,
					1,
					-1
				],
				label: "The old pantry door",
				kind: "exit",
				exitTo: "pantry",
				requireFlag: "pantry",
				radius: 1.8
			},
			{
				id: "leave-bar",
				pos: [
					0,
					1,
					5.4
				],
				label: "Street",
				kind: "exit",
				exitTo: "street",
				radius: 1.6
			}
		]
	},
	{
		id: "library",
		chapter: 1,
		name: "Fenn's library",
		set: "interior",
		spawn: [
			0,
			1.7,
			4
		],
		fog: "#0c0a08",
		fogNear: 6,
		fogFar: 16,
		ambient: "#16120e",
		iris: "open",
		floor: "wood",
		bounds: {
			minX: -5,
			maxX: 5,
			minZ: -5,
			maxZ: 5
		},
		interactables: [{
			id: "ophion-book",
			pos: [
				0,
				1.2,
				-2
			],
			label: "An unlocked book",
			kind: "examine",
			title: "A scholarly account",
			body: "A minor and largely discredited figure from old cosmogony: a serpent who ruled, once, before something larger cast him down — not destroyed. Fenn has underlined the passage in a hand that flatters itself. You copy it. You leave the book. Too heavy. Too easily missed.",
			clueId: "book",
			perception: 8,
			radius: 1.8
		}, {
			id: "leave-lib",
			pos: [
				0,
				1,
				4.6
			],
			label: "Street",
			kind: "exit",
			exitTo: "street",
			radius: 1.6
		}]
	},
	{
		id: "room",
		chapter: 1,
		name: "A room above the cobbler",
		set: "interior",
		spawn: [
			0,
			1.7,
			3.5
		],
		fog: "#100e0c",
		fogNear: 4,
		fogFar: 14,
		ambient: "#1a1612",
		iris: "open",
		floor: "wood",
		bounds: {
			minX: -4.5,
			maxX: 4.5,
			minZ: -4.5,
			maxZ: 4.5
		},
		interactables: [
			{
				id: "board",
				pos: [
					0,
					1.4,
					-3.4
				],
				label: "The corkboard",
				kind: "use",
				title: "The board",
				body: "It rewards exactly the kind of man you already are. Patient. Methodical. Willing to sit with a fact until it agrees to sit next to another fact. Nothing about the process ever punishes you for using it well.",
				flag: "boardOpened",
				radius: 2.2
			},
			{
				id: "file-table",
				pos: [
					2.4,
					.9,
					-1.2
				],
				label: "The case file",
				kind: "use",
				title: "The file",
				body: "Statements shift tense. A street number drifts one digit and drifts back. Twice you find a full sentence in your own hand you have no memory of composing. The shape of the report might shift. The report's bones never do.",
				radius: 1.8
			},
			{
				id: "window",
				pos: [
					-3.6,
					1.4,
					0
				],
				label: "The window",
				kind: "examine",
				title: "Pickman Street",
				body: "A doorway that had always simply existed once your hand found the latch now seems, once or twice, to exist a half-second before your hand arrives.",
				perception: 2,
				radius: 1.6
			},
			{
				id: "leave-room",
				pos: [
					0,
					1,
					4.1
				],
				label: "Street",
				kind: "exit",
				exitTo: "street",
				radius: 1.6
			}
		]
	},
	{
		id: "pantry",
		chapter: 1,
		name: "The boarded pantry",
		set: "interior",
		spawn: [
			0,
			1.7,
			3
		],
		fog: "#090807",
		fogNear: 3,
		fogFar: 12,
		ambient: "#100e0c",
		iris: "open",
		floor: "stone",
		bounds: {
			minX: -4,
			maxX: 4,
			minZ: -4,
			maxZ: 4
		},
		interactables: [
			{
				id: "gin",
				pos: [
					-1.6,
					.8,
					-1.2
				],
				label: "A case of gin",
				kind: "examine",
				title: "Gin from before the war",
				body: "Gone amber with age. You fill the flask here. Your hands are not quite steady. You tell yourself this will be the last time you need luck at all.",
				flag: "refilled",
				radius: 1.6
			},
			{
				id: "stair",
				pos: [
					0,
					1,
					-3.2
				],
				label: "A narrow door, open two inches",
				kind: "exit",
				exitTo: "tunnel",
				radius: 1.8
			},
			{
				id: "leave-pantry",
				pos: [
					0,
					1,
					3.6
				],
				label: "Back to the bar",
				kind: "exit",
				exitTo: "bar",
				radius: 1.6
			}
		]
	},
	{
		id: "tunnel",
		chapter: 1,
		name: "Beneath the estate",
		set: "tunnel",
		spawn: [
			0,
			1.7,
			18
		],
		yaw: Math.PI,
		fog: "#050403",
		fogNear: 2,
		fogFar: 14,
		ambient: "#0a0806",
		iris: "open",
		floor: "stone",
		bounds: {
			minX: -2.4,
			maxX: 2.4,
			minZ: -22,
			maxZ: 20
		},
		walls: [{
			minX: -2.7,
			maxX: -2.15,
			minZ: -22,
			maxZ: 20
		}, {
			minX: 2.15,
			maxX: 2.7,
			minZ: -22,
			maxZ: 20
		}],
		interactables: [
			{
				id: "spill",
				pos: [
					0,
					.4,
					10
				],
				label: "A spur of rock",
				kind: "examine",
				title: "The flask goes first",
				body: "Torn loose by a spur of rock you never saw coming, gone into the dark below with two soft strikes and then nothing. Finite things run out. The ground has no particular obligation to wait for you to be ready.",
				flag: "spilled",
				perception: 2,
				radius: 1.8
			},
			{
				id: "sailor",
				pos: [
					-1.1,
					.5,
					-2
				],
				label: "A drowned sailor",
				kind: "examine",
				title: "Wool fused to the shape beneath",
				body: "Bloated the way any drowned thing bloats. They do not look punished. Whatever happened to them happened without moral interest of any kind, the way driftwood is not judged for having drowned, only carried.",
				clueId: "tunnel",
				perception: 6,
				radius: 1.8
			},
			{
				id: "cultist",
				pos: [
					1,
					.6,
					-8
				],
				label: "Something in a dinner jacket",
				kind: "examine",
				title: "A cufflink on a wrist gone the wrong shape",
				body: "These had not simply drowned. Something had gone on happening to them long after drowning should have been the end of the matter. When the lantern touches the face, the eyes open. The cough that comes out is close enough to your mother's that the body decides what it means a half-second before the mind objects.",
				perception: 8,
				flag: "cultistSeen",
				radius: 2
			},
			{
				id: "up-stair",
				pos: [
					0,
					1,
					19.2
				],
				label: "Back up",
				kind: "exit",
				exitTo: "pantry",
				radius: 1.8
			}
		],
		note: "Revolver staggers. Knife staggers longer. Sailors can be finished. Cultists cannot."
	},
	{
		id: "shore",
		chapter: 2,
		name: "The drowned island",
		set: "island",
		spawn: [
			0,
			1.7,
			10
		],
		fog: "#121416",
		fogNear: 6,
		fogFar: 36,
		ambient: "#1a1c1e",
		iris: "open",
		floor: "stone",
		bounds: {
			minX: -16,
			maxX: 16,
			minZ: -18,
			maxZ: 14
		},
		interactables: [
			{
				id: "first-find",
				pos: [
					3,
					.4,
					2
				],
				label: "A scrap of scrimshaw",
				kind: "pickup",
				title: "Scrimshaw, salt-eaten",
				body: "A find described and left where the ground kept it proves more than a find carried into a private cabinet. Total recovery. You wrote it in the front of every notebook.",
				perception: 4,
				radius: 1.6
			},
			{
				id: "observer2",
				pos: [
					-6,
					1.1,
					-2
				],
				label: "An Observer, teaching",
				kind: "person",
				radius: 2.2,
				options: [{
					id: "watch",
					label: "Do not look directly",
					result: {
						lines: [{ text: "GRAYSCALE, EXCEPT THE JEWELRY. EXCEPT THE WATER'S REFLECTION." }, { text: "HE SHOWS SOMEONE YOUNGER WHERE NOT TO PUT A HAND. HE DOES NOT EXPLAIN WHY." }],
						perception: 5,
						flag: "observer2"
					}
				}]
			},
			{
				id: "to-galleries",
				pos: [
					0,
					1,
					-14
				],
				label: "Down into the galleries",
				kind: "exit",
				exitTo: "galleries",
				radius: 2.2
			}
		]
	},
	{
		id: "galleries",
		chapter: 2,
		name: "The galleries",
		set: "island",
		spawn: [
			0,
			1.7,
			8
		],
		fog: "#101214",
		fogNear: 4,
		fogFar: 22,
		ambient: "#15181a",
		iris: "open",
		floor: "stone",
		bounds: {
			minX: -10,
			maxX: 10,
			minZ: -16,
			maxZ: 10
		},
		interactables: [
			{
				id: "art1",
				pos: [
					-4,
					.4,
					0
				],
				label: "Ship's hardware",
				kind: "pickup",
				title: "A brass fitting",
				body: "Worth cataloguing. Heavy enough that carrying it means leaving something else.",
				item: "artifact",
				perception: 3,
				radius: 1.5
			},
			{
				id: "art2",
				pos: [
					4,
					.4,
					-4
				],
				label: "A personal effect",
				kind: "pickup",
				title: "A sailor's comb",
				body: "You can log it and leave it, or take it and spend a slot. The Codex will hold either choice.",
				perception: 3,
				radius: 1.5
			},
			{
				id: "flask-trace",
				pos: [
					1,
					.3,
					-8
				],
				label: "Something in the silt",
				kind: "examine",
				title: "A corroded flask. A police whistle.",
				body: "Scuff marks that read as a struggle to someone who'd know what a struggle looks like, which you don't. You record that the geometry of the passage should not be possible, and is.",
				perception: 6,
				flag: "walterTrace",
				radius: 1.6
			},
			{
				id: "to-maw",
				pos: [
					0,
					1,
					-14
				],
				label: "Deeper",
				kind: "exit",
				exitTo: "maw",
				radius: 2
			},
			{
				id: "back-shore",
				pos: [
					0,
					1,
					9.2
				],
				label: "Back toward the shore",
				kind: "exit",
				exitTo: "shore",
				radius: 1.8
			}
		]
	},
	{
		id: "maw",
		chapter: 2,
		name: "The maw",
		set: "tunnel",
		spawn: [
			0,
			1.7,
			10
		],
		fog: "#08090a",
		fogNear: 1.5,
		fogFar: 12,
		ambient: "#0c0e10",
		iris: "wide",
		floor: "stone",
		bounds: {
			minX: -2.2,
			maxX: 2.2,
			minZ: -18,
			maxZ: 12
		},
		interactables: [{
			id: "wrong-stone",
			pos: [
				0,
				.4,
				0
			],
			label: "Stone that feels wrong",
			kind: "examine",
			title: "A passage under open ocean",
			body: "You can only record, in your own hand, that it should not be possible and is. You do not know whose cellar waits at the other end.",
			perception: 8,
			flag: "wrongGeometry",
			radius: 2
		}, {
			id: "dead-ahead",
			pos: [
				0,
				.6,
				-10
			],
			label: "Light ahead that is not yours",
			kind: "examine",
			title: "They are correct",
			body: "The Observers are not primitive. Curiosity is not rewarded here. To know the horror is to succumb to it. You dug because you wanted meaning. You understand because you can no longer stop yourself.",
			perception: 12,
			flag: "mawSeen",
			radius: 2.2
		}]
	},
	{
		id: "voss",
		chapter: 3,
		name: "Adrian Voss, attorney",
		set: "office",
		spawn: [
			0,
			1.7,
			4
		],
		fog: "#12100e",
		fogNear: 8,
		fogFar: 18,
		ambient: "#1a1612",
		iris: "open",
		floor: "wood",
		bounds: {
			minX: -5,
			maxX: 5,
			minZ: -5,
			maxZ: 5
		},
		interactables: [{
			id: "voss-man",
			pos: [
				0,
				1.1,
				-2
			],
			label: "Voss",
			kind: "person",
			radius: 2.2,
			options: [{
				id: "lay",
				label: "Ask for the book he's still holding",
				result: {
					lines: [{
						speaker: "Voss",
						text: "The lay. Wages owed a dead whaler off a ship that hasn't existed in a hundred-odd years. You understand there's no court in this county that opens that book again."
					}, {
						speaker: "You",
						text: "I understand you're still holding the book. That's the part I came about."
					}],
					clueId: "insurance",
					perception: 4,
					flag: "vossTalk",
					item: "wage-claim"
				}
			}]
		}, {
			id: "to-town3",
			pos: [
				0,
				1,
				4.6
			],
			label: "Out",
			kind: "exit",
			exitTo: "town3",
			radius: 1.6
		}]
	},
	{
		id: "town3",
		chapter: 3,
		name: "Widow's Bight, 1940s",
		set: "street",
		spawn: [
			0,
			1.7,
			4
		],
		fog: "#121416",
		fogNear: 6,
		fogFar: 28,
		ambient: "#181a1c",
		iris: "open",
		floor: "gravel",
		bounds: {
			minX: -14,
			maxX: 14,
			minZ: -8,
			maxZ: 10
		},
		interactables: [
			{
				id: "file-found",
				pos: [
					3,
					1,
					-4
				],
				label: "A case file that should not be here",
				kind: "examine",
				title: "Officer Corwin's original file",
				body: "Unreliable in its presentation. True in its substance. How it reached you is not recorded. It says eight.",
				item: "walter-file",
				perception: 6,
				radius: 1.8
			},
			{
				id: "book3",
				pos: [
					-4,
					1,
					-4
				],
				label: "A book from a dead archaeologist's effects",
				kind: "examine",
				title: "Ophion",
				body: "A primordial serpent who ruled before being overthrown and cast down, not destroyed. Two hands in the margin: one flattering a delusion, one chasing the question honestly. No one tells you which is which. No one tells you what the club was named for.",
				item: "ophion-book",
				perception: 8,
				flag: "ophionRead",
				radius: 1.8
			},
			{
				id: "to-cavern",
				pos: [
					0,
					1,
					8
				],
				label: "The island path",
				kind: "exit",
				exitTo: "cavern",
				radius: 2
			}
		]
	},
	{
		id: "cavern",
		chapter: 3,
		name: "The caverns",
		set: "cavern",
		spawn: [
			0,
			1.7,
			14
		],
		fog: "#070605",
		fogNear: 2,
		fogFar: 16,
		ambient: "#0b0a08",
		iris: "open",
		floor: "stone",
		bounds: {
			minX: -3,
			maxX: 3,
			minZ: -24,
			maxZ: 16
		},
		interactables: [
			{
				id: "ward-remains",
				pos: [
					1.2,
					.4,
					2
				],
				label: "Remains, and a Codex",
				kind: "examine",
				title: "Ward Kohistani",
				body: "You are the only person who will ever validate that he existed and reached as far as he did. The moment is private. Neither of you gets to share it.",
				item: "codex",
				perception: 6,
				flag: "foundWard",
				radius: 1.8
			},
			{
				id: "charges",
				pos: [
					-1,
					.4,
					-6
				],
				label: "Charges",
				kind: "pickup",
				title: "Demolition charges",
				body: "Rubble and walls are a delay, not protection. Nothing built to stop a man can stop what is down here. Still: you came trained, and training wants a job.",
				item: "charges",
				radius: 1.6
			},
			{
				id: "abyss",
				pos: [
					0,
					1,
					-20
				],
				label: "The abyss",
				kind: "exit",
				exitTo: "abyss",
				radius: 2.2
			}
		]
	},
	{
		id: "abyss",
		chapter: 3,
		name: "No further",
		set: "cavern",
		spawn: [
			0,
			1.7,
			6
		],
		fog: "#030201",
		fogNear: 1,
		fogFar: 10,
		ambient: "#080604",
		iris: "burn",
		floor: "stone",
		bounds: {
			minX: -4,
			maxX: 4,
			minZ: -8,
			maxZ: 8
		},
		interactables: [{
			id: "final",
			pos: [
				0,
				1,
				-3
			],
			label: "One action, while you are still yourself",
			kind: "use",
			title: "Still yourself",
			body: "Sealing something. Placing the ledger where it might someday surface. Choosing what evidence burns. It cannot save you. It will define you.",
			flag: "finalReady",
			radius: 2.4
		}]
	}
].map((l) => [l.id, l]));
var CHAPTER_META = [
	{
		id: 1,
		year: "1923",
		title: "No Exit Wound",
		name: "Walter Corwin",
		role: "Beat cop",
		verb: "Investigate",
		coping: "A flask. It does what it claims."
	},
	{
		id: 2,
		year: "193_",
		title: "The Maw",
		name: "Ward Kohistani",
		role: "Archaeologist",
		verb: "Recover",
		coping: "Field-grade opium. Honest, finite."
	},
	{
		id: 3,
		year: "1940s",
		title: "Ophion",
		name: "Ekon Freeman",
		role: "Veteran",
		verb: "Demand",
		coping: "Cigarettes never run out. Matches do."
	}
];
var ACHIEVEMENTS = {
	died: {
		title: "Died",
		desc: "Corwin, Walter. Disappeared under personal strain following an unresolved accident at the Ophion Club. Replacement file records six names."
	},
	diedAgain: {
		title: "Died Again",
		desc: "Kohistani, Ward. Lost in the depths of the drowned island. Society correspondence lists the posting as unproductive. Remains unclaimed by the Society."
	},
	diedKnowing: {
		title: "Died Knowing",
		desc: "Freeman, Ekon. Reached the abyss and understood it. Comprehension preceded collapse. Collapse killed him. No exception is recorded."
	}
};
var KEY = "tcom.save.v1";
var BACKUP = "tcom.save.v1.bak";
var defaultA11y = () => ({
	flickerReduce: false,
	distortion: .7,
	highContrast: false,
	protectClues: true,
	subtitleScale: 1,
	reducedMotion: false
});
function writeSave(data) {
	try {
		const prev = localStorage.getItem(KEY);
		if (prev) localStorage.setItem(BACKUP, prev);
		localStorage.setItem(KEY, JSON.stringify(data));
	} catch {}
}
function readSave() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed || parsed.version !== 1) return null;
		parsed.a11y = {
			...defaultA11y(),
			...parsed.a11y
		};
		return parsed;
	} catch {
		return null;
	}
}
var GameAudio = class {
	ctx = null;
	master;
	sfx;
	music;
	unlocked = false;
	muted = false;
	lastCough = 0;
	unlock() {
		if (this.unlocked && this.ctx) {
			if (this.ctx.state === "suspended") this.ctx.resume();
			return;
		}
		const AC = window.AudioContext || window.webkitAudioContext;
		this.ctx = new AC({ latencyHint: "interactive" });
		this.master = this.ctx.createGain();
		this.sfx = this.ctx.createGain();
		this.music = this.ctx.createGain();
		this.sfx.gain.value = .7;
		this.music.gain.value = .35;
		this.master.gain.value = .85;
		this.sfx.connect(this.master);
		this.music.connect(this.master);
		this.master.connect(this.ctx.destination);
		this.ctx.resume();
		this.unlocked = true;
		document.addEventListener("visibilitychange", () => {
			if (!document.hidden) this.ctx?.resume();
		});
	}
	setMuted(m) {
		this.muted = m;
		if (this.master) this.master.gain.setTargetAtTime(m ? 0 : .85, this.ctx.currentTime, .02);
	}
	noise(duration, color = 1) {
		if (!this.ctx) return null;
		const n = this.ctx.sampleRate * duration;
		const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
		const d = buf.getChannelData(0);
		let last = 0;
		for (let i = 0; i < n; i++) {
			const w = Math.random() * 2 - 1;
			last = last * (1 - color) + w * color;
			d[i] = last;
		}
		const src = this.ctx.createBufferSource();
		src.buffer = buf;
		return src;
	}
	cough(intensity = .4) {
		if (!this.ctx || this.muted) return;
		const now = this.ctx.currentTime;
		if (now - this.lastCough < 2.4) return;
		this.lastCough = now;
		const src = this.noise(.28, .35);
		if (!src) return;
		const g = this.ctx.createGain();
		const f = this.ctx.createBiquadFilter();
		f.type = "bandpass";
		f.frequency.value = 1400 + Math.random() * 400;
		f.Q.value = 1.6;
		g.gain.setValueAtTime(1e-4, now);
		g.gain.exponentialRampToValueAtTime(.18 * intensity, now + .04);
		g.gain.exponentialRampToValueAtTime(1e-4, now + .26);
		src.playbackRate.value = .9 + Math.random() * .25;
		src.connect(f);
		f.connect(g);
		g.connect(this.sfx);
		src.start(now);
		src.stop(now + .3);
	}
	groan() {
		if (!this.ctx || this.muted) return;
		const now = this.ctx.currentTime;
		const o = this.ctx.createOscillator();
		const g = this.ctx.createGain();
		o.type = "sawtooth";
		o.frequency.setValueAtTime(70, now);
		o.frequency.exponentialRampToValueAtTime(42, now + .8);
		g.gain.setValueAtTime(1e-4, now);
		g.gain.exponentialRampToValueAtTime(.12, now + .08);
		g.gain.exponentialRampToValueAtTime(1e-4, now + 1.1);
		o.connect(g);
		g.connect(this.sfx);
		o.start(now);
		o.stop(now + 1.2);
	}
	shatter() {
		if (!this.ctx || this.muted) return;
		const now = this.ctx.currentTime;
		const src = this.noise(.7, 1);
		if (!src) return;
		const g = this.ctx.createGain();
		const f = this.ctx.createBiquadFilter();
		f.type = "highpass";
		f.frequency.value = 1800;
		g.gain.setValueAtTime(1e-4, now);
		g.gain.exponentialRampToValueAtTime(.55, now + .01);
		g.gain.exponentialRampToValueAtTime(1e-4, now + .65);
		src.connect(f);
		f.connect(g);
		g.connect(this.sfx);
		src.start(now);
		src.stop(now + .7);
	}
	foot(rate = 1) {
		if (!this.ctx || this.muted) return;
		const now = this.ctx.currentTime;
		const src = this.noise(.08, .8);
		if (!src) return;
		const g = this.ctx.createGain();
		const f = this.ctx.createBiquadFilter();
		f.type = "lowpass";
		f.frequency.value = 500;
		g.gain.setValueAtTime(.07 * rate, now);
		g.gain.exponentialRampToValueAtTime(1e-4, now + .07);
		src.playbackRate.value = .8 + Math.random() * .4;
		src.connect(f);
		f.connect(g);
		g.connect(this.sfx);
		src.start(now);
		src.stop(now + .09);
	}
	gun() {
		if (!this.ctx || this.muted) return;
		const now = this.ctx.currentTime;
		const src = this.noise(.22, 1);
		if (!src) return;
		const g = this.ctx.createGain();
		g.gain.setValueAtTime(.5, now);
		g.gain.exponentialRampToValueAtTime(1e-4, now + .2);
		src.connect(g);
		g.connect(this.sfx);
		src.start(now);
		src.stop(now + .22);
	}
	drone(on) {
		if (!this.ctx) return;
		if (!on) return;
		const o = this.ctx.createOscillator();
		const g = this.ctx.createGain();
		o.type = "sine";
		o.frequency.value = 48;
		g.gain.value = .03;
		o.connect(g);
		g.connect(this.music);
		o.start();
		setTimeout(() => {
			try {
				o.stop();
			} catch {}
		}, 4e3);
	}
};
var audio = new GameAudio();
var startInv = (ch) => {
	if (ch === 1) return [
		"flask",
		"notebook",
		"lantern",
		"revolver"
	];
	if (ch === 2) return [
		"opaline",
		"notebook",
		"lantern"
	];
	return [
		"cigarettes",
		"matches",
		"walter-file",
		"lantern"
	];
};
function snapshot(s) {
	return {
		version: 1,
		screen: s.screen === "play" || s.screen === "pause" ? "play" : s.screen,
		chapter: s.chapter,
		locationId: s.locationId,
		coat: s.coat,
		flask: s.flask,
		flaskSpilled: s.flaskSpilled,
		ammo: s.ammo,
		spare: s.spare,
		matches: s.matches,
		opium: s.opium,
		strength: s.strength,
		fuel: s.fuel,
		combat: s.combat,
		examined: Object.keys(s.examined),
		clues: Object.keys(s.clues),
		inventory: s.inventory,
		flags: Object.keys(s.flags),
		pack: s.pack,
		codex: s.codex,
		filedEight: s.filedEight,
		triplicate: s.triplicate,
		spine: s.spine,
		heardShatter: s.heardShatter,
		finalAct: s.finalAct,
		wageClaim: s.wageClaim,
		chaptersDone: s.chaptersDone,
		achievements: Object.keys(s.achievements),
		a11y: s.a11y
	};
}
function applySave(s, d) {
	s.screen = d.screen;
	s.chapter = d.chapter;
	s.locationId = d.locationId;
	s.coat = d.coat;
	s.flask = d.flask;
	s.flaskSpilled = d.flaskSpilled;
	s.ammo = d.ammo;
	s.spare = d.spare;
	s.matches = d.matches;
	s.opium = d.opium;
	s.strength = d.strength;
	s.fuel = d.fuel;
	s.combat = d.combat;
	s.examined = Object.fromEntries(d.examined.map((k) => [k, true]));
	s.clues = Object.fromEntries(d.clues.map((k) => [k, true]));
	s.inventory = d.inventory;
	s.flags = Object.fromEntries(d.flags.map((k) => [k, true]));
	s.pack = d.pack;
	s.codex = d.codex;
	s.filedEight = d.filedEight;
	s.triplicate = d.triplicate;
	s.spine = d.spine;
	s.heardShatter = d.heardShatter;
	s.finalAct = d.finalAct;
	s.wageClaim = d.wageClaim;
	s.chaptersDone = d.chaptersDone;
	s.achievements = Object.fromEntries(d.achievements.map((k) => [k, true]));
	s.a11y = {
		...defaultA11y(),
		...d.a11y
	};
}
function maybeSpine(get, set) {
	const s = get();
	if (s.spine || s.chapter !== 1) return;
	const has = (id) => Boolean(s.clues[id]);
	if (SPINE.every((id) => has(id)) || s.fuel >= 72) set({ spine: true });
}
var persistTimer = null;
var useGame = create((set, get) => ({
	screen: "title",
	chapter: 1,
	locationId: "drive",
	overlay: null,
	prompt: null,
	coat: "uniform",
	flask: 5,
	flaskSpilled: false,
	ammo: 6,
	spare: 6,
	matches: 12,
	opium: 4,
	strength: 3,
	fuel: 8,
	combat: 6,
	decay: .05,
	iris: .38,
	examined: {},
	clues: {},
	inventory: startInv(1),
	flags: {},
	pack: [],
	codex: [],
	filedEight: false,
	triplicate: false,
	spine: false,
	heardShatter: false,
	finalAct: null,
	wageClaim: false,
	chaptersDone: [],
	achievements: {},
	a11y: defaultA11y(),
	muted: false,
	locked: false,
	glitch: 0,
	lookHint: true,
	hydrate: () => {
		const d = readSave();
		if (!d) return;
		set((s) => {
			const next = { ...s };
			applySave(next, d);
			return next;
		});
	},
	persist: () => {
		if (persistTimer) clearTimeout(persistTimer);
		persistTimer = setTimeout(() => writeSave(snapshot(get())), 400);
	},
	setScreen: (screen) => {
		set({
			screen,
			overlay: screen === "play" ? get().overlay : null
		});
		get().persist();
	},
	setA11y: (p) => {
		set({ a11y: {
			...get().a11y,
			...p
		} });
		get().persist();
	},
	setMuted: (m) => {
		set({ muted: m });
		audio.setMuted(m);
	},
	newGame: (chapter) => {
		set({
			screen: chapter === 1 ? "prologue" : "play",
			chapter,
			locationId: chapter === 1 ? "drive" : chapter === 2 ? "shore" : "voss",
			overlay: null,
			coat: "uniform",
			flask: 5,
			flaskSpilled: false,
			ammo: chapter === 3 ? 18 : 6,
			spare: chapter === 3 ? 18 : 6,
			matches: 12,
			opium: 4,
			strength: chapter === 3 ? 6 : 3,
			fuel: chapter === 1 ? 8 : 10,
			combat: chapter === 3 ? 7 : 2,
			decay: .04,
			iris: chapter === 1 ? .38 : .92,
			examined: {},
			clues: {},
			inventory: startInv(chapter),
			flags: {},
			pack: [],
			codex: [],
			filedEight: false,
			triplicate: false,
			spine: false,
			heardShatter: false,
			finalAct: null,
			wageClaim: false,
			locked: false
		});
		get().persist();
	},
	continueGame: () => {
		const d = readSave();
		if (!d) {
			get().newGame(1);
			return;
		}
		set((s) => {
			const next = { ...s };
			applySave(next, d);
			next.screen = d.screen === "title" ? "play" : d.screen;
			return next;
		});
	},
	setLocation: (id) => {
		set({
			locationId: id,
			overlay: null,
			prompt: null
		});
		if (id === "garden" && get().iris < .8) set({ iris: .86 });
		if (id === "room" && get().spine) set({ iris: 1.15 });
		get().persist();
	},
	examine: (id, title, body, opts) => {
		const s = get();
		const examined = {
			...s.examined,
			[id]: true
		};
		let fuel = s.fuel;
		let clues = s.clues;
		let inventory = s.inventory;
		let flags = s.flags;
		if (opts?.perception) fuel = Math.min(100, fuel + opts.perception);
		if (opts?.clueId) clues = {
			...clues,
			[opts.clueId]: true
		};
		if (opts?.item && !inventory.includes(opts.item)) inventory = [...inventory, opts.item];
		if (opts?.flag) flags = {
			...flags,
			[opts.flag]: true
		};
		const protect = s.a11y.protectClues;
		const unstable = opts?.clueId ? CLUES[opts.clueId]?.unstable : void 0;
		const shown = !protect && unstable && s.decay > .45 && Math.random() < s.decay * .5 ? unstable : body;
		set({
			examined,
			fuel,
			clues,
			inventory,
			flags,
			overlay: {
				kind: "examine",
				title,
				body: shown,
				clueId: opts?.clueId
			},
			decay: Math.min(1, s.decay + .015)
		});
		maybeSpine(get, set);
		get().persist();
	},
	closeOverlay: () => set({ overlay: null }),
	advanceCard: () => {
		const o = get().overlay;
		if (!o || o.kind !== "card") return;
		if (o.index + 1 >= o.lines.length) set({ overlay: null });
		else set({ overlay: {
			...o,
			index: o.index + 1
		} });
	},
	openFile: () => set({ overlay: { kind: "file" } }),
	openBoard: () => set({ overlay: { kind: "board" } }),
	openInventory: () => set({ overlay: { kind: "inventory" } }),
	drinkFlask: () => {
		const s = get();
		if (s.chapter !== 1 || s.flask <= 0 || s.flaskSpilled) return;
		set({
			flask: s.flask - 1,
			decay: Math.max(.02, s.decay * .45)
		});
		get().persist();
	},
	drinkOpium: () => {
		const s = get();
		if (s.chapter !== 2 || s.opium <= 0) return;
		set({
			opium: s.opium - 1,
			decay: Math.max(.02, s.decay * .5)
		});
		get().persist();
	},
	strikeMatch: () => {
		const s = get();
		if (s.chapter !== 3 || s.matches <= 0) return;
		set({
			matches: s.matches - 1,
			flags: {
				...s.flags,
				lit: true
			}
		});
		get().persist();
	},
	toggleCoat: () => {
		if (get().chapter !== 1) return;
		const s = get();
		if (s.coat === "uniform" && !s.inventory.includes("coat-plain")) return;
		set({ coat: s.coat === "uniform" ? "plain" : "uniform" });
	},
	addClue: (id, perception = 4) => {
		const s = get();
		if (s.clues[id]) return;
		set({
			clues: {
				...s.clues,
				[id]: true
			},
			fuel: Math.min(100, s.fuel + perception)
		});
		maybeSpine(get, set);
		get().persist();
	},
	setFlag: (id) => set({ flags: {
		...get().flags,
		[id]: true
	} }),
	addItem: (id) => {
		if (get().inventory.includes(id)) return;
		set({ inventory: [...get().inventory, id] });
	},
	consult: (lines, opts) => {
		const s = get();
		let fuel = s.fuel;
		let clues = s.clues;
		let flags = s.flags;
		let inventory = s.inventory;
		if (opts?.perception) fuel = Math.min(100, fuel + opts.perception);
		if (opts?.clueId) clues = {
			...clues,
			[opts.clueId]: true
		};
		if (opts?.flag) flags = {
			...flags,
			[opts.flag]: true
		};
		if (opts?.item && !inventory.includes(opts.item)) inventory = [...inventory, opts.item];
		if (opts?.unlock) flags = {
			...flags,
			[opts.unlock]: true
		};
		set({
			fuel,
			clues,
			flags,
			inventory,
			overlay: {
				kind: "card",
				lines,
				index: 0
			},
			decay: Math.min(1, s.decay + .02)
		});
		maybeSpine(get, set);
		get().persist();
	},
	fire: () => {
		const s = get();
		if (s.ammo <= 0) return false;
		set({ ammo: s.ammo - 1 });
		audio.gun();
		return true;
	},
	spillFlask: () => {
		if (get().flaskSpilled) return;
		set({
			flaskSpilled: true,
			flask: 0,
			flags: {
				...get().flags,
				flaskLost: true
			}
		});
		get().persist();
	},
	shatter: () => {
		if (get().heardShatter) return;
		set({
			heardShatter: true,
			decay: Math.min(1, get().decay + .12)
		});
		audio.shatter();
	},
	bumpDecay: (n) => set({ decay: Math.min(1, get().decay + n) }),
	tickDecay: (dt) => {
		const s = get();
		const add = dt * .004 * (.4 + s.fuel / 140);
		set({ decay: Math.min(1, s.decay + add) });
	},
	setIris: (v) => set({ iris: v }),
	die: () => {
		const s = get();
		const chaptersDone = s.chaptersDone.includes(s.chapter) ? s.chaptersDone : [...s.chaptersDone, s.chapter];
		const achievements = { ...s.achievements };
		if (s.chapter === 1) achievements.died = true;
		if (s.chapter === 2) achievements.diedAgain = true;
		if (s.chapter === 3) achievements.diedKnowing = true;
		set({
			screen: "ending",
			chaptersDone,
			achievements,
			overlay: null
		});
		get().persist();
	},
	chooseFinal: (act) => {
		set({ finalAct: act });
		get().die();
	},
	fileEight: () => set({
		filedEight: true,
		flags: {
			...get().flags,
			eight: true
		}
	}),
	fileTriplicate: () => set({
		triplicate: true,
		flags: {
			...get().flags,
			triplicate: true
		}
	}),
	collectPack: (id, documentOnly, note) => {
		const s = get();
		set({
			pack: documentOnly ? s.pack : s.pack.length < 10 ? [...s.pack, id] : s.pack,
			codex: s.codex.includes(note) ? s.codex : [...s.codex, note],
			fuel: Math.min(100, s.fuel + 3)
		});
		get().persist();
	},
	difficultyGlitch: () => {
		set({ glitch: Date.now() });
		setTimeout(() => {
			if (get().glitch) set({ glitch: 0 });
		}, 280);
	},
	setPrompt: (t) => set({ prompt: t }),
	setLocked: (v) => set({ locked: v }),
	openChoices: (title, options) => set({ overlay: {
		kind: "choices",
		title,
		options
	} }),
	pickChoice: (id) => {
		const o = get().overlay;
		if (!o || o.kind !== "choices") return;
		const pick = o.options.find((x) => x.id === id);
		if (!pick) return;
		const r = pick.result;
		get().consult(r.lines, {
			clueId: r.clueId,
			perception: r.perception,
			flag: r.flag,
			item: r.item,
			unlock: r.unlock
		});
	}
}));
function hasSave() {
	return Boolean(readSave());
}
var empty = () => ({
	moveX: 0,
	moveY: 0,
	lookX: 0,
	lookY: 0,
	interact: false,
	flask: false,
	file: false,
	inventory: false,
	coat: false,
	fire: false,
	jump: false,
	crouch: false,
	pause: false
});
var GAME_KEYS = /* @__PURE__ */ new Set([
	"KeyW",
	"KeyA",
	"KeyS",
	"KeyD",
	"ArrowUp",
	"ArrowLeft",
	"ArrowDown",
	"ArrowRight",
	"Space",
	"KeyE",
	"KeyF",
	"KeyQ",
	"KeyC",
	"KeyI",
	"Tab",
	"KeyR",
	"ShiftLeft",
	"ControlLeft",
	"Escape"
]);
var Input = class {
	keys = /* @__PURE__ */ new Set();
	injected = /* @__PURE__ */ new Set();
	lookX = 0;
	lookY = 0;
	stickX = 0;
	stickY = 0;
	lookStickX = 0;
	lookStickY = 0;
	prev = empty();
	edges = empty();
	bound = false;
	pointerDown = false;
	bind() {
		if (this.bound) return;
		this.bound = true;
		window.addEventListener("keydown", this.onKeyDown);
		window.addEventListener("keyup", this.onKeyUp);
		window.addEventListener("blur", this.clear);
		document.addEventListener("visibilitychange", this.onVis);
		window.addEventListener("pointermove", this.onMove);
		window.addEventListener("pointerup", this.onUp);
		window.addEventListener("pointercancel", this.onUp);
		window.addEventListener("contextmenu", this.onMenu);
	}
	unbind() {
		if (!this.bound) return;
		this.bound = false;
		window.removeEventListener("keydown", this.onKeyDown);
		window.removeEventListener("keyup", this.onKeyUp);
		window.removeEventListener("blur", this.clear);
		document.removeEventListener("visibilitychange", this.onVis);
		window.removeEventListener("pointermove", this.onMove);
		window.removeEventListener("pointerup", this.onUp);
		window.removeEventListener("pointercancel", this.onUp);
		window.removeEventListener("contextmenu", this.onMenu);
		this.clear();
	}
	onMenu = (e) => e.preventDefault();
	onKeyDown = (e) => {
		if (e.repeat) return;
		if (GAME_KEYS.has(e.code)) e.preventDefault();
		this.keys.add(e.code);
	};
	onKeyUp = (e) => {
		this.keys.delete(e.code);
	};
	onVis = () => {
		if (document.hidden) this.clear();
	};
	onMove = (e) => {
		if (!this.pointerDown) return;
		this.lookX += e.movementX;
		this.lookY += e.movementY;
	};
	onUp = () => {
		this.pointerDown = false;
	};
	clear = () => {
		this.keys.clear();
		this.pointerDown = false;
		this.stickX = 0;
		this.stickY = 0;
	};
	setKeys(codes) {
		this.injected = new Set(codes);
	}
	has(code) {
		return this.keys.has(code) || this.injected.has(code);
	}
	pollGamepad() {
		const pads = navigator.getGamepads?.() ?? [];
		for (const p of pads) {
			if (!p || p.mapping !== "standard") continue;
			const lx = p.axes[0] ?? 0;
			const ly = p.axes[1] ?? 0;
			const mag = Math.hypot(lx, ly);
			const dz = .15;
			if (mag > dz) {
				const s = (mag - dz) / .85 / mag;
				this.stickX = lx * s;
				this.stickY = -ly * s;
			}
			const rx = p.axes[2] ?? 0;
			const ry = p.axes[3] ?? 0;
			const rm = Math.hypot(rx, ry);
			if (rm > dz) {
				const s = (rm - dz) / .85 / rm;
				this.lookX += rx * s * 18;
				this.lookY += ry * s * 14;
			}
			if (p.buttons[0]?.pressed) this.keys.add("Space");
			if (p.buttons[1]?.pressed) this.keys.add("KeyF");
			if (p.buttons[2]?.pressed) this.keys.add("KeyE");
			if (p.buttons[9]?.pressed) this.keys.add("Escape");
			if (p.buttons[7]?.value && p.buttons[7].value > .5) this.keys.add("Mouse0");
		}
	}
	sample() {
		this.pollGamepad();
		const now = empty();
		let x = 0;
		let y = 0;
		if (this.has("KeyA") || this.has("ArrowLeft")) x -= 1;
		if (this.has("KeyD") || this.has("ArrowRight")) x += 1;
		if (this.has("KeyW") || this.has("ArrowUp")) y += 1;
		if (this.has("KeyS") || this.has("ArrowDown")) y -= 1;
		x += this.stickX;
		y += this.stickY;
		const m = Math.hypot(x, y);
		if (m > 1) {
			x /= m;
			y /= m;
		}
		now.moveX = x;
		now.moveY = y;
		now.lookX = this.lookX + this.lookStickX * 12;
		now.lookY = this.lookY + this.lookStickY * 12;
		this.lookX = 0;
		this.lookY = 0;
		now.interact = this.has("KeyE") || this.has("Mouse0");
		now.flask = this.has("KeyF");
		now.file = this.has("Tab");
		now.inventory = this.has("KeyI");
		now.coat = this.has("KeyC") || this.has("KeyQ");
		now.fire = this.has("Mouse0") && this.has("ControlLeft");
		now.jump = this.has("Space");
		now.crouch = this.has("ControlLeft") || this.has("ShiftLeft");
		now.pause = this.has("Escape");
		const just = empty();
		Object.keys(now).forEach((k) => {
			if (typeof now[k] === "boolean") just[k] = Boolean(now[k]) && !this.prev[k];
		});
		this.prev = now;
		this.edges = just;
		return {
			now,
			just
		};
	}
};
var input = new Input();
function FilmGrain({ reduce }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: reduce ? "grain grain-still" : "grain",
		"aria-hidden": true
	});
}
function Iris() {
	const iris = useGame((s) => s.iris);
	const screen = useGame((s) => s.screen);
	const kind = LOCATION[useGame((s) => s.locationId)]?.iris ?? "square";
	if (screen !== "play") return null;
	const size = Math.min(140, Math.max(28, iris * 118));
	const round = kind === "square" ? 0 : kind === "burn" ? 50 : 8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "iris-layer",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "iris-hole",
			style: {
				width: `${size}vmin`,
				height: `${size}vmin`,
				borderRadius: round
			}
		})
	});
}
function Distortion() {
	const decay = useGame((s) => s.decay);
	const cap = useGame((s) => s.a11y.distortion);
	const high = useGame((s) => s.a11y.highContrast);
	const amount = Math.min(decay, cap);
	const sat = .22 + amount * .7;
	const contrast = high ? 1.18 : 1.05 + amount * .08;
	const wobble = amount > .55 ? (amount - .55) * 1.4 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "distort-layer",
		style: {
			["--sat"]: String(sat),
			["--con"]: String(contrast),
			["--wob"]: `${wobble}px`
		},
		"aria-hidden": true
	});
}
function TitleScreen() {
	const setScreen = useGame((s) => s.setScreen);
	const saved = hasSave();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel title-panel",
		"data-pf": "title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/game/club-night.jpg",
				alt: "",
				className: "bg-still"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scrim" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "title-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Widow's Bight"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "display",
						children: TITLE
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lede",
						children: "Competence delays the end. It never prevents it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stack",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-primary",
							onClick: () => setScreen("accessibility"),
							children: "New investigation"
						}), saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-ghost",
							onClick: () => useGame.getState().continueGame(),
							children: "Continue"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "fine",
						children: "A man does not interrogate the shape of his own eye."
					})
				]
			})
		]
	});
}
function AccessibilityScreen() {
	const a = useGame((s) => s.a11y);
	const setA11y = useGame((s) => s.setA11y);
	const setScreen = useGame((s) => s.setScreen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "panel paper-panel",
		"data-pf": "accessibility",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker ink",
					children: "Before difficulty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display ink",
					children: "Access"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "body-copy",
					children: "The style that makes this distinctive cannot be the setting you are forced to turn off. Clue text remains recoverable under any decay."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Flicker reduction" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: a.flickerReduce,
						onChange: (e) => setA11y({ flickerReduce: e.target.checked })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Distortion intensity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 1,
						step: .05,
						value: a.distortion,
						onChange: (e) => setA11y({ distortion: Number(e.target.value) })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "High contrast" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: a.highContrast,
						onChange: (e) => setA11y({ highContrast: e.target.checked })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Protect clue wording" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: a.protectClues,
						onChange: (e) => setA11y({ protectClues: e.target.checked })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Card size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: .85,
						max: 1.4,
						step: .05,
						value: a.subtitleScale,
						onChange: (e) => setA11y({ subtitleScale: Number(e.target.value) })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reduce motion" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: a.reducedMotion,
						onChange: (e) => setA11y({ reducedMotion: e.target.checked })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-primary ink-btn",
					onClick: () => setScreen("difficulty"),
					children: "Continue"
				})
			]
		})
	});
}
function DifficultyScreen() {
	const glitch = useGame((s) => s.glitch);
	const setScreen = useGame((s) => s.setScreen);
	const bump = useGame((s) => s.difficultyGlitch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "panel dark-panel" + (glitch ? " is-glitch" : ""),
		"data-pf": "difficulty",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet dark",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Select difficulty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display",
					children: "The work"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stack",
					children: [[
						"Easy",
						"Normal",
						"Hard"
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-disabled",
						onClick: bump,
						"aria-disabled": "true",
						children: n
					}, n)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-primary",
						onClick: () => setScreen("chapters"),
						children: "Impossible"
					})]
				})
			]
		})
	});
}
function ChaptersScreen() {
	const done = useGame((s) => s.chaptersDone);
	const newGame = useGame((s) => s.newGame);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "panel dark-panel",
		"data-pf": "chapters",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "chapter-grid",
			children: CHAPTER_META.map((c) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "chapter-card",
					disabled: false,
					onClick: () => newGame(c.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: c.year
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "display",
							children: c.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "name",
							children: [c.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" · ", c.role] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "fine",
							children: done.includes(c.id) ? "Closed on the record." : c.verb
						})
					]
				}, c.id);
			})
		})
	});
}
function PrologueScreen() {
	const setScreen = useGame((s) => s.setScreen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrologueInner, { onDone: () => setScreen("play") });
}
function PrologueInner({ onDone }) {
	const [i, setI] = (0, import_react.useState)(0);
	const slide = PROLOGUE[i];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel title-panel",
		"data-pf": "prologue",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: slide.img,
				alt: "",
				className: "bg-still"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scrim" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "title-copy prologue-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: slide.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display",
						children: slide.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lede",
						children: slide.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-primary",
						onClick: () => {
							if (i + 1 >= PROLOGUE.length) onDone();
							else setI(i + 1);
						},
						children: i + 1 >= PROLOGUE.length ? "1923" : "Continue"
					})
				]
			})
		]
	});
}
function PlayHud() {
	const prompt = useGame((s) => s.prompt);
	const overlay = useGame((s) => s.overlay);
	const chapter = useGame((s) => s.chapter);
	const loc = useGame((s) => LOCATION[s.locationId]);
	const coat = useGame((s) => s.coat);
	const scale = useGame((s) => s.a11y.subtitleScale);
	const hint = useGame((s) => s.lookHint);
	if (overlay) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hud",
		style: { fontSize: `${scale}rem` },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hud-top",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "kicker",
					children: [loc?.name, chapter === 1 ? ` · ${coat === "uniform" ? "Badge" : "Plain coat"}` : ""]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "crosshair",
				"aria-hidden": true
			}),
			prompt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prompt",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "E" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: prompt })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "hud-hint",
				children: [
					hint ? "Click and drag to look. " : "",
					"WASD move · E examine · Tab file · I kit · ",
					chapter === 1 ? "F flask · C coat" : chapter === 2 ? "F opium · Space jump" : "F match · R fire"
				]
			})
		]
	});
}
function ExamineModal() {
	const overlay = useGame((s) => s.overlay);
	const close = useGame((s) => s.closeOverlay);
	const scale = useGame((s) => s.a11y.subtitleScale);
	if (!overlay || overlay.kind !== "examine") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-back",
		onClick: close,
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "card-sheet",
			style: { fontSize: `${scale}em` },
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker ink",
					children: "Note"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "display ink",
					children: overlay.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "body-copy",
					children: overlay.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-primary ink-btn",
					onClick: close,
					children: "Close"
				})
			]
		})
	});
}
function CardModal() {
	const overlay = useGame((s) => s.overlay);
	const advance = useGame((s) => s.advanceCard);
	const scale = useGame((s) => s.a11y.subtitleScale);
	if (!overlay || overlay.kind !== "card") return null;
	const line = overlay.lines[overlay.index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "intertitle",
		onClick: advance,
		style: { fontSize: `${scale}em` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "card-text",
			children: line?.text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "fine",
			children: [
				overlay.index + 1,
				" / ",
				overlay.lines.length
			]
		})]
	});
}
function ChoiceModal() {
	const overlay = useGame((s) => s.overlay);
	const pick = useGame((s) => s.pickChoice);
	if (!overlay || overlay.kind !== "choices") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-back",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "card-sheet",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker ink",
				children: overlay.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stack",
				children: overlay.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-ghost ink",
					onClick: () => pick(o.id),
					children: o.label
				}, o.id))
			})]
		})
	});
}
function FileModal() {
	const overlay = useGame((s) => s.overlay);
	const close = useGame((s) => s.closeOverlay);
	const clues = useGame((s) => s.clues);
	const decay = useGame((s) => s.decay);
	const protect = useGame((s) => s.a11y.protectClues);
	const eight = useGame((s) => s.filedEight);
	if (!overlay || overlay.kind !== "file") return null;
	const rows = Object.keys(clues).map((id) => CLUES[id]).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-back",
		onClick: close,
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "file-sheet",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker ink",
					children: "Case file · Corwin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "display ink",
					children: "No Exit Wound"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "body-copy",
					children: [eight ? "Eight people are dead." : "Six members are dead.", " Presentation may drift. Facts do not."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "file-list",
					children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Nothing entered yet." }), rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: !protect && c.unstable && decay > .5 ? c.unstable : c.fact })] }, c.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-primary ink-btn",
					onClick: close,
					children: "Close"
				})
			]
		})
	});
}
function BoardModal() {
	const overlay = useGame((s) => s.overlay);
	const close = useGame((s) => s.closeOverlay);
	const clues = useGame((s) => s.clues);
	const spine = useGame((s) => s.spine);
	const die = useGame((s) => s.die);
	if (!overlay || overlay.kind !== "board") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-back",
		onClick: close,
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "board-sheet",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker ink",
					children: "Corkboard · not a gate"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "board-cols",
					children: [
						"club",
						"victims",
						"town",
						"below"
					].map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "board-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker ink",
							children: col
						}), Object.values(CLUES).filter((c) => c.boardColumn === col && clues[c.id]).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pin-card",
							children: c.title
						}, c.id))]
					}, col))
				}),
				spine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "body-copy",
					children: "They did not summon a mother. They summoned something and called it one."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-primary ink-btn",
						onClick: close,
						children: "Step back"
					}), spine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-ghost ink",
						onClick: () => die(),
						children: "The frame widens"
					})]
				})
			]
		})
	});
}
function InventoryModal() {
	const overlay = useGame((s) => s.overlay);
	const close = useGame((s) => s.closeOverlay);
	const inv = useGame((s) => s.inventory);
	const pack = useGame((s) => s.pack);
	const flask = useGame((s) => s.flask);
	const spilled = useGame((s) => s.flaskSpilled);
	const ammo = useGame((s) => s.ammo);
	const matches = useGame((s) => s.matches);
	const opium = useGame((s) => s.opium);
	const fuel = useGame((s) => s.fuel);
	const strength = useGame((s) => s.strength);
	const chapter = useGame((s) => s.chapter);
	const flags = useGame((s) => s.flags);
	const choose = useGame((s) => s.chooseFinal);
	if (!overlay || overlay.kind !== "inventory") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-back",
		onClick: close,
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "card-sheet kit-sheet",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker ink",
					children: "Kit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "paperdoll",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "doll" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: inv.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: i.replace("-", " ") }, i)) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "fine",
					children: [
						"Strength ",
						strength,
						" · ",
						chapter === 1 ? "Perception" : chapter === 2 ? "Agility" : "Combat",
						" ",
						Math.round(fuel)
					]
				}),
				chapter === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "body-copy",
					children: [
						"Flask ",
						spilled ? "lost on the stair" : `${flask} remaining`,
						". Revolver ",
						ammo,
						" in the cylinder."
					]
				}),
				chapter === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "body-copy",
					children: [
						"Opium ",
						opium,
						". Pack ",
						pack.length,
						" / 10. Codex pages ",
						useGame.getState().codex.length,
						"."
					]
				}),
				chapter === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "body-copy",
					children: [
						"Matches remaining: inspect the box. Count them. ",
						matches,
						"."
					]
				}),
				flags.finalReady && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stack",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "body-copy",
							children: "One action, while you are still yourself."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-ghost ink",
							onClick: () => choose("seal"),
							children: "Seal the aperture"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-ghost ink",
							onClick: () => choose("place"),
							children: "Place the ledger where it might surface"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-ghost ink",
							onClick: () => choose("burn"),
							children: "Burn the evidence"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-primary ink-btn",
					onClick: close,
					children: "Close"
				})
			]
		})
	});
}
function EndingScreen() {
	const chapter = useGame((s) => s.chapter);
	const setScreen = useGame((s) => s.setScreen);
	const copy = chapter === 1 ? {
		kicker: "No body was recovered",
		title: "The frame went on without him",
		body: "His last coherent thought was not of the rose garden, nor the tunnel, nor even his mother. It was the small, stupid, entirely ordinary fact that his whole life had once fit neatly inside a square, and that he had never once thought, while it still did, to be grateful for the mercy of an edge."
	} : chapter === 2 ? {
		kicker: "Lost in the depths",
		title: "The Observers were correct",
		body: "He dug because he wanted meaning, found because he wanted glory, persisted because he wanted significance, and understood because he could no longer stop himself. Understanding is the moment he dies."
	} : {
		kicker: "The stock burns",
		title: "The camera abandons him",
		body: "It pulls back through the caverns, through the earth, and settles on the estate's manicured, oblivious lawn. He dies knowing. The lawn does not."
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel title-panel",
		"data-pf": "ending",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: chapter === 2 ? "/game/island.jpg" : chapter === 3 ? "/game/cellar-stair.jpg" : "/game/garden-night.jpg",
				alt: "",
				className: "bg-still"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scrim deep" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "title-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: copy.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display",
						children: copy.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lede",
						children: copy.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stack",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-primary",
							onClick: () => setScreen("archive"),
							children: "The archive"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-ghost",
							onClick: () => setScreen("chapters"),
							children: "Chapters"
						})]
					})
				]
			})
		]
	});
}
function ArchiveScreen() {
	useGame((s) => s.clues);
	const eight = useGame((s) => s.filedEight);
	const trip = useGame((s) => s.triplicate);
	const pack = useGame((s) => s.pack);
	const codex = useGame((s) => s.codex);
	const wage = useGame((s) => s.wageClaim || s.inventory.includes("wage-claim"));
	const act = useGame((s) => s.finalAct);
	const ach = useGame((s) => s.achievements);
	const setScreen = useGame((s) => s.setScreen);
	const rows = [
		{
			title: "Corwin's original file",
			body: eight ? "Says eight. Unreliable in presentation, true in substance." : "Says six, or does not argue the number. The birches may be missing."
		},
		{
			title: "Copies",
			body: trip ? "Filed in triplicate. One copy traveled. The others did not wait for anyone's ending." : "A single copy. Absence of the others is itself a record."
		},
		{
			title: "Kohistani's Codex",
			body: codex.length ? `${codex.length} pages. Pack ${pack.length} of ten.` : "Unfilled, or never reached."
		},
		{
			title: "The wage claim",
			body: wage ? "Recovered. It proves the claim. It does not collect it." : "Unfiled. Missing from the belongings inventory, still."
		},
		{
			title: "Ekon's last act",
			body: act === "seal" ? "An aperture sealed. A delay." : act === "place" ? "A ledger placed where it might someday surface." : act === "burn" ? "Evidence burned. The lawn remains." : "No act recorded — he never arrived, or did not choose."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "panel paper-panel",
		"data-pf": "archive",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet archive-sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker ink",
					children: "Post-finish archive"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display ink",
					children: "What actually happened"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "file-list",
					children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.body })] }, r.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ach-row",
					children: Object.entries(ACHIEVEMENTS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ach" + (ach[k] ? " on" : ""),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: v.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ach[k] ? v.desc : "—" })]
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-primary ink-btn",
					onClick: () => setScreen("title"),
					children: "Title"
				})
			]
		})
	});
}
function PauseScreen() {
	const setScreen = useGame((s) => s.setScreen);
	const persist = useGame((s) => s.persist);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "panel dark-panel",
		"data-pf": "pause",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet dark",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display",
				children: "Paused"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-primary",
						onClick: () => {
							persist();
							setScreen("play");
						},
						children: "Resume"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-ghost",
						onClick: () => setScreen("accessibility"),
						children: "Access"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-ghost",
						onClick: () => setScreen("title"),
						children: "Title"
					})
				]
			})]
		})
	});
}
function TouchStick() {
	const screen = useGame((s) => s.screen);
	const overlay = useGame((s) => s.overlay);
	if (screen !== "play" || overlay) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "touch-layer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "stick",
			onPointerDown: (e) => {
				e.currentTarget.setPointerCapture(e.pointerId);
			},
			onPointerMove: (e) => {
				const r = e.currentTarget.getBoundingClientRect();
				const x = (e.clientX - r.left) / r.width * 2 - 1;
				const y = -((e.clientY - r.top) / r.height * 2 - 1);
				input.stickX = Math.max(-1, Math.min(1, x));
				input.stickY = Math.max(-1, Math.min(1, y));
			},
			onPointerUp: () => {
				input.stickX = 0;
				input.stickY = 0;
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "touch-act",
			onPointerDown: (e) => {
				e.preventDefault();
				input.keys.add("KeyE");
			},
			onPointerUp: () => input.keys.delete("KeyE"),
			children: "E"
		})]
	});
}
function Overlays() {
	const screen = useGame((s) => s.screen);
	const reduce = useGame((s) => s.a11y.flickerReduce);
	(0, import_react.useEffect)(() => {
		const onVis = () => {
			if (document.hidden) useGame.getState().persist();
		};
		const onKey = (e) => {
			const st = useGame.getState();
			if (e.code === "Escape" && st.overlay) {
				e.preventDefault();
				st.closeOverlay();
				return;
			}
			if (!st.overlay) return;
			if (e.code !== "Space" && e.code !== "KeyE" && e.code !== "Enter") return;
			e.preventDefault();
			if (st.overlay.kind === "card") st.advanceCard();
			else if (st.overlay.kind === "examine" || st.overlay.kind === "file" || st.overlay.kind === "inventory" || st.overlay.kind === "board") st.closeOverlay();
		};
		document.addEventListener("visibilitychange", onVis);
		window.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("visibilitychange", onVis);
			window.removeEventListener("keydown", onKey);
		};
	}, []);
	const body = (0, import_react.useMemo)(() => {
		if (screen === "title") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, {});
		if (screen === "accessibility") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessibilityScreen, {});
		if (screen === "difficulty") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DifficultyScreen, {});
		if (screen === "chapters") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChaptersScreen, {});
		if (screen === "prologue") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrologueScreen, {});
		if (screen === "ending") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndingScreen, {});
		if (screen === "archive") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveScreen, {});
		if (screen === "pause") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseScreen, {});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayHud, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExamineModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventoryModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchStick, {})
		] });
	}, [screen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmGrain, { reduce }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Iris, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Distortion, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ui-root",
			children: body
		})
	] });
}
function Game() {
	const screen = useGame((s) => s.screen);
	const decay = useGame((s) => s.decay);
	const cap = useGame((s) => s.a11y.distortion);
	const [world, setWorld] = (0, import_react.useState)(null);
	const amount = Math.min(decay, cap);
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		if (screen !== "play" && screen !== "pause") return;
		let alive = true;
		import("./World-CIMkSLBM.mjs").then((m) => {
			if (alive) setWorld(() => m.World);
		});
		return () => {
			alive = false;
		};
	}, [screen]);
	const World = world;
	const showWorld = screen === "play" || screen === "pause";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "game-root",
		"data-screen": screen,
		style: {
			["--sat"]: String(.22 + amount * .75),
			["--con"]: String(1.05 + amount * .08)
		},
		children: [showWorld && World ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "world-placeholder" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlays, {})]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Game, {});
}
//#endregion
export { LOCATION as a, audio as i, input as n, useGame as r, routes_exports as t };
