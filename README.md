# Three Colors of Madness

A three-chapter silver-nitrate investigation. Widow's Bight, 1923–1940s.

WASD to walk, click-drag to look, **E** to examine. The badge opens doors. The wool opens mouths.

Pointer lock is not used. Walking is applied from WASD relative to the current look direction. Click the world once so the game can receive keys, then WASD.

## Controls

| Key | Action |
| --- | --- |
| WASD / arrows | Move |
| Click-drag | Look |
| E | Examine / speak / use |
| F | Flask (ch.1) · opium (ch.2) · match (ch.3) |
| C | Change coats (once you have the wool) |
| Tab | Case file |
| I | Kit |
| Esc | Pause / close |
| Space | Jump (ch.2) |
| R | Fire (ch.3) |

## Automation

Browser tools often dispatch keyboard events with `event.key` set (`"w"`) and `event.code` empty. The input layer prefers `event.code`, then falls back to a `key → code` map, so those events still move and examine.

For a path that never depends on DOM keyboard events, drive the same internal action state:

```js
window.__gameInput.move(0, 1, 800)   // forward 800ms; x = strafe, y = forward (−1…1)
window.__gameInput.look(40, 0)       // look delta, same units as pointer movement
window.__gameInput.interact()        // examine whatever is focused
window.__gameInput.use("boy")        // walk to a subject if needed, then examine
window.__gameInput.walkTo("boy")     // same; pass { use: false } to only arrive
window.__gameInput.lookAt("boy")     // face a subject
window.__gameInput.getWorld()        // location, pose, overlay, nearby subjects
window.__gameInput.openFile()        // Tab
window.__gameInput.openInventory()   // I
window.__gameInput.flask()           // F
window.__gameInput.coat()            // C
window.__gameInput.pause()           // Esc
window.__gameInput.jump()            // Space
window.__gameInput.fire()            // hold-to-fire chord
window.__gameInput.tap("KeyE")       // one-frame KeyboardEvent.code
window.__gameInput.setKeys(["KeyW"]) // hold until the next setKeys / clear
window.__gameInput.clear()
```

`__gameInput` is installed as soon as the game module loads (`window.__game` is the same object). Movement and look apply while the world is on screen (`play`). `use(id)` / `walkTo(id)` drive the player through the 3D set and fire the same examine path as **E**.

Once the 3D world is up, nearby names also appear as real buttons (and the centered prompt is a button). Click a name to walk over and examine it — no pointer lock required. A click on the canvas that is not a drag also examines whatever is focused.

One-shot methods (`openFile`, `flask`, …) pulse the same flags the real keys set, so they fire on the next animation frame.

The existing pose probe remains for control QA:

```js
window.__controlsTest.getPosition()
window.__controlsTest.getYaw()
window.__controlsTest.getSpeed()
window.__controlsTest.setKeys(["KeyW"])
window.__controlsTest.setPosition(0, 1.7, 16)
window.__controlsTest.setYaw(0)
```
