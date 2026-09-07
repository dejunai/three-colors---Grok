# Three Colors of Madness

A three-chapter silver-nitrate investigation. Widow's Bight, 1923–1940s.

WASD to walk, click-drag to look, **E** to examine. The badge opens doors. The wool opens mouths.

Pointer lock is cosmetic (it hides the cursor). Walking is applied from WASD relative to the current look direction whether or not the lock request succeeds — the live preview often cannot lock the pointer, and movement still works.

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
window.__gameInput.interact()        // E
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

`__gameInput` is installed as soon as the game module loads. Movement and look apply while the world is on screen (`play`). One-shot methods (`interact`, `openFile`, …) pulse the same flags the real keys set, so they fire on the next animation frame.

The existing pose probe remains for control QA:

```js
window.__controlsTest.getPosition()
window.__controlsTest.getYaw()
window.__controlsTest.getSpeed()
window.__controlsTest.setKeys(["KeyW"])
window.__controlsTest.setPosition(0, 1.7, 16)
window.__controlsTest.setYaw(0)
```
