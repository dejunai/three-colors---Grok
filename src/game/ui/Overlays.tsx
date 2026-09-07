import { useEffect, useMemo, useState } from "react";
import { ACHIEVEMENTS, CHAPTER_META, CLUES, LOCATION, PROLOGUE, TITLE } from "../content";
import { caseWhisper } from "../hints";
import { hasSave, useGame } from "../store";
import { input, resolveKeyCode } from "../input";

function FilmGrain({ reduce }: { reduce: boolean }) {
  return <div className={reduce ? "grain grain-still" : "grain"} aria-hidden />;
}

function Iris() {
  return null;
}

function Distortion() {
  const decay = useGame((s) => s.decay);
  const cap = useGame((s) => s.a11y.distortion);
  const high = useGame((s) => s.a11y.highContrast);
  const amount = Math.min(decay, cap);
  const sat = 0.22 + amount * 0.7;
  const contrast = high ? 1.18 : 1.05 + amount * 0.08;
  const wobble = amount > 0.55 ? (amount - 0.55) * 1.4 : 0;
  return (
    <div
      className="distort-layer"
      style={{
        ["--sat" as string]: String(sat),
        ["--con" as string]: String(contrast),
        ["--wob" as string]: `${wobble}px`,
      }}
      aria-hidden
    />
  );
}

function TitleScreen() {
  const setScreen = useGame((s) => s.setScreen);
  const wipeSave = useGame((s) => s.wipeSave);
  const saved = hasSave();
  const [confirmWipe, setConfirmWipe] = useState(false);
  return (
    <section className="panel title-panel" data-pf="title">
      <img src="/game/club-night.jpg" alt="" className="bg-still" />
      <div className="scrim" />
      <div className="title-copy">
        <p className="kicker">Widow's Bight</p>
        <h1 className="display">{TITLE}</h1>
        <p className="lede">
          Competence delays the end. It never prevents it.
        </p>
        <div className="stack">
          <button type="button" className="btn-primary" onClick={() => setScreen("accessibility")}>
            New investigation
          </button>
          {saved && (
            <button type="button" className="btn-ghost" onClick={() => useGame.getState().continueGame()}>
              Continue
            </button>
          )}
          {saved && (
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                if (!confirmWipe) {
                  setConfirmWipe(true);
                  return;
                }
                wipeSave();
                setConfirmWipe(false);
              }}
            >
              {confirmWipe ? "Confirm — wipe the file" : "Abandon the file"}
            </button>
          )}
        </div>
        <p className="fine">A man does not interrogate the shape of his own eye.</p>
      </div>
    </section>
  );
}

function AccessibilityScreen() {
  const a = useGame((s) => s.a11y);
  const setA11y = useGame((s) => s.setA11y);
  const setScreen = useGame((s) => s.setScreen);
  return (
    <section className="panel paper-panel" data-pf="accessibility">
      <div className="sheet">
        <p className="kicker ink">Before difficulty</p>
        <h2 className="display ink">Access</h2>
        <p className="body-copy">
          The style that makes this distinctive cannot be the setting you are forced to turn off.
          Clue text remains recoverable under any decay.
        </p>
        <label className="row">
          <span>Flicker reduction</span>
          <input
            type="checkbox"
            checked={a.flickerReduce}
            onChange={(e) => setA11y({ flickerReduce: e.target.checked })}
          />
        </label>
        <label className="row">
          <span>Distortion intensity</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={a.distortion}
            onChange={(e) => setA11y({ distortion: Number(e.target.value) })}
          />
        </label>
        <label className="row">
          <span>High contrast</span>
          <input
            type="checkbox"
            checked={a.highContrast}
            onChange={(e) => setA11y({ highContrast: e.target.checked })}
          />
        </label>
        <label className="row">
          <span>Protect clue wording</span>
          <input
            type="checkbox"
            checked={a.protectClues}
            onChange={(e) => setA11y({ protectClues: e.target.checked })}
          />
        </label>
        <label className="row">
          <span>Card size</span>
          <input
            type="range"
            min={0.85}
            max={1.4}
            step={0.05}
            value={a.subtitleScale}
            onChange={(e) => setA11y({ subtitleScale: Number(e.target.value) })}
          />
        </label>
        <label className="row">
          <span>Reduce motion</span>
          <input
            type="checkbox"
            checked={a.reducedMotion}
            onChange={(e) => setA11y({ reducedMotion: e.target.checked })}
          />
        </label>
        <button type="button" className="btn-primary ink-btn" onClick={() => setScreen("difficulty")}>
          Continue
        </button>
      </div>
    </section>
  );
}

function DifficultyScreen() {
  const glitch = useGame((s) => s.glitch);
  const setScreen = useGame((s) => s.setScreen);
  const bump = useGame((s) => s.difficultyGlitch);
  return (
    <section className={"panel dark-panel" + (glitch ? " is-glitch" : "")} data-pf="difficulty">
      <div className="sheet dark">
        <p className="kicker">Select difficulty</p>
        <h2 className="display">The work</h2>
        <div className="stack">
          {(["Easy", "Normal", "Hard"] as const).map((n) => (
            <button key={n} type="button" className="btn-disabled" onClick={bump} aria-disabled="true">
              {n}
            </button>
          ))}
          <button type="button" className="btn-primary" onClick={() => setScreen("chapters")}>
            Impossible
          </button>
        </div>
      </div>
    </section>
  );
}

function ChaptersScreen() {
  const done = useGame((s) => s.chaptersDone);
  const newGame = useGame((s) => s.newGame);
  return (
    <section className="panel dark-panel" data-pf="chapters">
      <div className="chapter-grid">
        {CHAPTER_META.map((c) => {
          const locked = false;
          return (
            <button
              key={c.id}
              type="button"
              className="chapter-card"
              disabled={locked}
              onClick={() => newGame(c.id)}
            >
              <p className="kicker">{c.year}</p>
              <h3 className="display">{c.title}</h3>
              <p className="name">
                {c.name}
                <span> · {c.role}</span>
              </p>
              <p className="fine">{done.includes(c.id) ? "Closed on the record." : c.verb}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function PrologueScreen() {
  const setScreen = useGame((s) => s.setScreen);
  return <PrologueInner onDone={() => setScreen("play")} />;
}

function PrologueInner({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const slide = PROLOGUE[i];
  return (
    <section className="panel title-panel" data-pf="prologue">
      <img src={slide.img} alt="" className="bg-still" />
      <div className="scrim" />
      <div className="title-copy prologue-copy">
        <p className="kicker">{slide.kicker}</p>
        <h2 className="display">{slide.title}</h2>
        <p className="lede">{slide.body}</p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            if (i + 1 >= PROLOGUE.length) onDone();
            else setI(i + 1);
          }}
        >
          {i + 1 >= PROLOGUE.length ? "1923" : "Continue"}
        </button>
      </div>
    </section>
  );
}

function PlayHud() {
  const prompt = useGame((s) => s.prompt);
  const overlay = useGame((s) => s.overlay);
  const chapter = useGame((s) => s.chapter);
  const loc = useGame((s) => LOCATION[s.locationId]);
  const coat = useGame((s) => s.coat);
  const scale = useGame((s) => s.a11y.subtitleScale);
  const hint = useGame((s) => s.lookHint);
  const flags = useGame((s) => s.flags);
  const clues = useGame((s) => s.clues);
  const inventory = useGame((s) => s.inventory);
  const spine = useGame((s) => s.spine);
  const filedEight = useGame((s) => s.filedEight);
  const locationId = useGame((s) => s.locationId);
  const whisper = caseWhisper({
    chapter,
    locationId,
    flags,
    clues,
    coat,
    inventory,
    spine,
    filedEight,
  });
  const nearby = useGame((s) => s.nearby);
  const focusId = useGame((s) => s.focusId);
  if (overlay) return null;
  return (
    <div className="hud" style={{ fontSize: `${scale}rem` }}>
      <div className="hud-top">
        <div className="hud-meta">
          <p className="kicker">
            {loc?.name}
            {chapter === 1 ? ` · ${coat === "uniform" ? "Badge" : "Plain coat"}` : ""}
          </p>
          <p className="whisper">{whisper}</p>
          {nearby.length > 0 && (
            <nav className="subjects" aria-label="Nearby">
              {nearby.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className={n.id === focusId ? "subject is-focus" : "subject"}
                  onClick={() => input.use(n.id)}
                >
                  {n.label}
                </button>
              ))}
            </nav>
          )}
        </div>
        <button
          type="button"
          className="hud-pause"
          onClick={() => useGame.getState().setScreen("pause")}
        >
          Menu
        </button>
      </div>
      <div className="crosshair" aria-hidden />
      {prompt && (
        <button type="button" className="prompt" onClick={() => input.use()}>
          <span>Examine</span>
          <strong>{prompt}</strong>
        </button>
      )}
      <p className="hud-hint">
        {hint ? "Click and drag to look. " : ""}
        WASD move · E examine · Esc menu · Tab file · I kit · {chapter === 1 ? "F flask · C coat" : chapter === 2 ? "F opium · Space jump" : "F match · R fire"}
      </p>
    </div>
  );
}

function ExamineModal() {
  const overlay = useGame((s) => s.overlay);
  const close = useGame((s) => s.closeOverlay);
  const scale = useGame((s) => s.a11y.subtitleScale);
  if (!overlay || overlay.kind !== "examine") return null;
  return (
    <div className="modal-back" onClick={close} role="presentation">
      <article className="card-sheet" style={{ fontSize: `${scale}em` }} onClick={(e) => e.stopPropagation()}>
        <p className="kicker ink">Note</p>
        <h3 className="display ink">{overlay.title}</h3>
        <p className="body-copy">{overlay.body}</p>
        <button type="button" className="btn-primary ink-btn" onClick={close}>
          Close
        </button>
      </article>
    </div>
  );
}

function CardModal() {
  const overlay = useGame((s) => s.overlay);
  const advance = useGame((s) => s.advanceCard);
  const scale = useGame((s) => s.a11y.subtitleScale);
  if (!overlay || overlay.kind !== "card") return null;
  const line = overlay.lines[overlay.index];
  return (
    <button type="button" className="intertitle" onClick={advance} style={{ fontSize: `${scale}em` }}>
      <p className="card-text">{line?.text}</p>
      <span className="fine">Continue · {overlay.index + 1} / {overlay.lines.length}</span>
    </button>
  );
}

function ChoiceModal() {
  const overlay = useGame((s) => s.overlay);
  const pick = useGame((s) => s.pickChoice);
  if (!overlay || overlay.kind !== "choices") return null;
  return (
    <div className="modal-back">
      <article className="card-sheet">
        <p className="kicker ink">{overlay.title}</p>
        <div className="stack">
          {overlay.options.map((o) => (
            <button key={o.id} type="button" className="btn-ghost ink" onClick={() => pick(o.id)}>
              {o.label}
            </button>
          ))}
        </div>
      </article>
    </div>
  );
}

function FileModal() {
  const overlay = useGame((s) => s.overlay);
  const close = useGame((s) => s.closeOverlay);
  const clues = useGame((s) => s.clues);
  const decay = useGame((s) => s.decay);
  const protect = useGame((s) => s.a11y.protectClues);
  const eight = useGame((s) => s.filedEight);
  const chapter = useGame((s) => s.chapter);
  if (!overlay || overlay.kind !== "file") return null;
  const rows = Object.keys(clues)
    .map((id) => CLUES[id])
    .filter(Boolean);
  return (
    <div className="modal-back" onClick={close} role="presentation">
      <article className="file-sheet" onClick={(e) => e.stopPropagation()}>
        <p className="kicker ink">{chapter === 1 ? "Case file · Corwin" : chapter === 2 ? "Field Codex · Kohistani" : "File · Freeman"}</p>
        <h3 className="display ink">{chapter === 1 ? "No Exit Wound" : chapter === 2 ? "Total Recovery" : "Scorched Earth"}</h3>
        <p className="body-copy">
          {eight ? "Eight people are dead." : "Six members are dead."} Presentation may drift. Facts do not.
        </p>
        <ul className="file-list">
          {rows.length === 0 && <li>Nothing entered yet.</li>}
          {rows.map((c) => (
            <li key={c.id}>
              <strong>{c.title}</strong>
              <span>
                {!protect && c.unstable && decay > 0.5 ? c.unstable : c.fact}
              </span>
            </li>
          ))}
        </ul>
        <button type="button" className="btn-primary ink-btn" onClick={close}>
          Close
        </button>
      </article>
    </div>
  );
}

function BoardModal() {
  const overlay = useGame((s) => s.overlay);
  const close = useGame((s) => s.closeOverlay);
  const clues = useGame((s) => s.clues);
  const spine = useGame((s) => s.spine);
  const die = useGame((s) => s.die);
  if (!overlay || overlay.kind !== "board") return null;
  const cols = ["club", "victims", "town", "below"] as const;
  return (
    <div className="modal-back" onClick={close} role="presentation">
      <article className="board-sheet" onClick={(e) => e.stopPropagation()}>
        <p className="kicker ink">Corkboard · not a gate</p>
        <div className="board-cols">
          {cols.map((col) => (
            <div key={col} className="board-col">
              <p className="kicker ink">{col}</p>
              {Object.values(CLUES)
                .filter((c) => c.boardColumn === col && clues[c.id])
                .map((c) => (
                  <div key={c.id} className="pin-card">
                    {c.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
        {spine && (
          <p className="body-copy">
            They did not summon a mother. They summoned something and called it one.
          </p>
        )}
        <div className="row-actions">
          <button type="button" className="btn-primary ink-btn" onClick={close}>
            Step back
          </button>
          {spine && (
            <button type="button" className="btn-ghost ink" onClick={() => die()}>
              The frame widens
            </button>
          )}
        </div>
      </article>
    </div>
  );
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
  return (
    <div className="modal-back" onClick={close} role="presentation">
      <article className="card-sheet kit-sheet" onClick={(e) => e.stopPropagation()}>
        <p className="kicker ink">Kit</p>
        <div className="paperdoll">
          <div className="doll" />
          <ul>
            {inv.map((i) => (
              <li key={i}>{i.replace("-", " ")}</li>
            ))}
          </ul>
        </div>
        <p className="fine">
          Strength {strength} · {chapter === 1 ? "Perception" : chapter === 2 ? "Agility" : "Combat"} {Math.round(fuel)}
        </p>
        {chapter === 1 && (
          <p className="body-copy">
            Flask {spilled ? "lost on the stair" : `${flask} remaining`}. Revolver {ammo} in the cylinder.
          </p>
        )}
        {chapter === 2 && <p className="body-copy">Opium {opium}. Pack {pack.length} / 10. Codex pages {useGame.getState().codex.length}.</p>}
        {chapter === 3 && <p className="body-copy">Matches remaining: inspect the box. Count them. {matches}.</p>}
        {flags.finalReady && (
          <div className="stack">
            <p className="body-copy">One action, while you are still yourself.</p>
            <button type="button" className="btn-ghost ink" onClick={() => choose("seal")}>
              Seal the aperture
            </button>
            <button type="button" className="btn-ghost ink" onClick={() => choose("place")}>
              Place the ledger where it might surface
            </button>
            <button type="button" className="btn-ghost ink" onClick={() => choose("burn")}>
              Burn the evidence
            </button>
          </div>
        )}
        <button type="button" className="btn-primary ink-btn" onClick={close}>
          Close
        </button>
      </article>
    </div>
  );
}

function EndingScreen() {
  const chapter = useGame((s) => s.chapter);
  const setScreen = useGame((s) => s.setScreen);
  const copy =
    chapter === 1
      ? {
          kicker: "No body was recovered",
          title: "The frame went on without him",
          body: "His last coherent thought was not of the rose garden, nor the tunnel, nor even his mother. It was the small, stupid, entirely ordinary fact that his whole life had once fit neatly inside a square, and that he had never once thought, while it still did, to be grateful for the mercy of an edge.",
        }
      : chapter === 2
        ? {
            kicker: "Lost in the depths",
            title: "The Observers were correct",
            body: "He dug because he wanted meaning, found because he wanted glory, persisted because he wanted significance, and understood because he could no longer stop himself. Understanding is the moment he dies.",
          }
        : {
            kicker: "The stock burns",
            title: "The camera abandons him",
            body: "It pulls back through the caverns, through the earth, and settles on the estate's manicured, oblivious lawn. He dies knowing. The lawn does not.",
          };
  return (
    <section className="panel title-panel" data-pf="ending">
      <img src={chapter === 2 ? "/game/island.jpg" : chapter === 3 ? "/game/cellar-stair.jpg" : "/game/garden-night.jpg"} alt="" className="bg-still" />
      <div className="scrim deep" />
      <div className="title-copy">
        <p className="kicker">{copy.kicker}</p>
        <h2 className="display">{copy.title}</h2>
        <p className="lede">{copy.body}</p>
        <div className="stack">
          <button type="button" className="btn-primary" onClick={() => setScreen("chapters")}>
            Begin again
          </button>
          <button type="button" className="btn-ghost" onClick={() => setScreen("archive")}>
            The archive
          </button>
        </div>
      </div>
    </section>
  );
}

function ArchiveScreen() {
  const clues = useGame((s) => s.clues);
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
      body: eight
        ? "Says eight. Unreliable in presentation, true in substance."
        : "Says six, or does not argue the number. The birches may be missing.",
    },
    {
      title: "Copies",
      body: trip ? "Filed in triplicate. One copy traveled. The others did not wait for anyone's ending." : "A single copy. Absence of the others is itself a record.",
    },
    {
      title: "Kohistani's Codex",
      body: codex.length ? `${codex.length} pages. Pack ${pack.length} of ten.` : "Unfilled, or never reached.",
    },
    {
      title: "The wage claim",
      body: wage ? "Recovered. It proves the claim. It does not collect it." : "Unfiled. Missing from the belongings inventory, still.",
    },
    {
      title: "Ekon's last act",
      body: act === "seal" ? "An aperture sealed. A delay." : act === "place" ? "A ledger placed where it might someday surface." : act === "burn" ? "Evidence burned. The lawn remains." : "No act recorded — he never arrived, or did not choose.",
    },
  ];
  return (
    <section className="panel paper-panel" data-pf="archive">
      <div className="sheet archive-sheet">
        <p className="kicker ink">Post-finish archive</p>
        <h2 className="display ink">What actually happened</h2>
        <ul className="file-list">
          {rows.map((r) => (
            <li key={r.title}>
              <strong>{r.title}</strong>
              <span>{r.body}</span>
            </li>
          ))}
        </ul>
        <div className="ach-row">
          {Object.entries(ACHIEVEMENTS).map(([k, v]) => (
            <div key={k} className={"ach" + (ach[k] ? " on" : "")}>
              <strong>{v.title}</strong>
              <span>{ach[k] ? v.desc : "—"}</span>
            </div>
          ))}
        </div>
        <button type="button" className="btn-primary ink-btn" onClick={() => setScreen("title")}>
          Title
        </button>
      </div>
    </section>
  );
}

function PauseScreen() {
  const setScreen = useGame((s) => s.setScreen);
  const persist = useGame((s) => s.persist);
  const chapter = useGame((s) => s.chapter);
  const newGame = useGame((s) => s.newGame);
  const wipeSave = useGame((s) => s.wipeSave);
  const [confirmWipe, setConfirmWipe] = useState(false);
  return (
    <section className="panel dark-panel" data-pf="pause">
      <div className="sheet dark">
        <h2 className="display">Paused</h2>
        <div className="stack">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              persist();
              setScreen("play");
            }}
          >
            Resume
          </button>
          <button type="button" className="btn-ghost" onClick={() => newGame(chapter)}>
            Restart this chapter
          </button>
          <button type="button" className="btn-ghost" onClick={() => setScreen("chapters")}>
            New investigation
          </button>
          <button type="button" className="btn-ghost" onClick={() => setScreen("title")}>
            Title
          </button>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              if (!confirmWipe) {
                setConfirmWipe(true);
                return;
              }
              wipeSave();
            }}
          >
            {confirmWipe ? "Confirm — wipe the file" : "Abandon the file"}
          </button>
        </div>
      </div>
    </section>
  );
}

function TouchStick() {
  const screen = useGame((s) => s.screen);
  const overlay = useGame((s) => s.overlay);
  if (screen !== "play" || overlay) return null;
  return (
    <div className="touch-layer">
      <div
        className="stick"
        onPointerDown={(e) => {
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width * 2 - 1;
          const y = -((e.clientY - r.top) / r.height * 2 - 1);
          input.stickX = Math.max(-1, Math.min(1, x));
          input.stickY = Math.max(-1, Math.min(1, y));
        }}
        onPointerUp={() => {
          input.stickX = 0;
          input.stickY = 0;
        }}
      />
      <button
        type="button"
        className="touch-act"
        onPointerDown={(e) => {
          e.preventDefault();
          input.keys.add("KeyE");
        }}
        onPointerUp={() => input.keys.delete("KeyE")}
      >
        E
      </button>
    </div>
  );
}

export function Overlays() {
  const screen = useGame((s) => s.screen);
  const reduce = useGame((s) => s.a11y.flickerReduce);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) useGame.getState().persist();
    };
    const onKey = (e: KeyboardEvent) => {
      const st = useGame.getState();
      const code = resolveKeyCode(e);
      if (code === "Escape" && st.overlay) {
        e.preventDefault();
        st.closeOverlay();
        return;
      }
      if (code === "Escape" && st.screen === "pause") {
        e.preventDefault();
        st.setScreen("play");
        return;
      }
      if (!st.overlay) return;
      if (code !== "Space" && code !== "KeyE" && code !== "Enter") return;
      e.preventDefault();
      if (st.overlay.kind === "card") st.advanceCard();
      else if (st.overlay.kind === "examine" || st.overlay.kind === "file" || st.overlay.kind === "inventory" || st.overlay.kind === "board") {
        st.closeOverlay();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const body = useMemo(() => {
    if (screen === "title") return <TitleScreen />;
    if (screen === "accessibility") return <AccessibilityScreen />;
    if (screen === "difficulty") return <DifficultyScreen />;
    if (screen === "chapters") return <ChaptersScreen />;
    if (screen === "prologue") return <PrologueScreen />;
    if (screen === "ending") return <EndingScreen />;
    if (screen === "archive") return <ArchiveScreen />;
    if (screen === "pause") return <PauseScreen />;
    return (
      <>
        <PlayHud />
        <ExamineModal />
        <CardModal />
        <ChoiceModal />
        <FileModal />
        <BoardModal />
        <InventoryModal />
        <TouchStick />
      </>
    );
  }, [screen]);

  return (
    <>
      <FilmGrain reduce={reduce} />
      <Iris />
      <Distortion />
      <div className="ui-root">{body}</div>
    </>
  );
}

