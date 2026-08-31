# Ask Rosie — Classroom Edition

A prototype rethinking of the Crystal Bridges Museum's [Ask Rosie](https://askrosie.crystalbridges.org/en)
companion app, built around one problem: **Rosie talks to everyone the same way.**

A 2nd-grade class and an AP US History class standing in front of *Rosie the Riveter* need
different vocabulary, different depth, and different framing. A teacher who just spent three weeks
on WWII home-front labor has no way to tell Rosie about it. This demo shows what it looks like if
they could.

---

## Run it

**The quick way** — open `askrosie-standalone.html` in any browser. That's it. One file, no
install, no server, works offline.

**From source** — the modular version needs a server, because browsers block ES modules over
`file://`:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

After editing anything in `js/` or `data/`, rebuild the standalone file:

```bash
node build.js
```

---

## The demo path

1. **I'm a teacher** → any name → **The WWII Home Front** preset.
   Watch the detected focus topics appear, and the artwork scope narrow to the works that fit.
2. **Set the reading level** in step 2 of the dashboard. Compare the sample answer at K-2
   against the one at 9-12 — they are barely the same paragraph. This is the whole point.
3. **Explore** → ask *"Why is she stepping on a book?"*
4. **Quiz me on this work** → questions are drawn at the class's reading level and weighted
   toward the teacher's focus topics.

Students can also sign in with class code `DEMO` to land straight in a configured classroom.
They are asked for a reading level on the way in, and it is remembered from then on.

### Why the chat has no chrome

The conversation runs on a bare surface: no top bar, no context strip, nothing above it.
Everything a student would otherwise reach for up there has been moved out of the way:

- **The reading level is settled before the gallery opens**, on a step of its own, and saved
  (`state.bandChosen`). Teachers settle it on their dashboard instead; either counts.
  The chat only *reports* the level, in a quiet line at the foot of the gallery menu, with one
  link back. Because the level can now change while a conversation is closed, `renderChat()`
  compares `chat.gradeBand` against `state.gradeBand` and re-levels the whole thread in place
  when they differ — the student retypes nothing.
- **The gallery is a menu, not a column.** It used to be a permanent 330px sidebar; it is now
  a trigger carrying the current work's title, and a panel that opens under it. Choosing a work
  closes it, as does a click anywhere outside, as does Escape — which puts focus back on the
  trigger rather than dropping it at the top of the page. `navigate()` shuts it too, so it can
  never be found hanging open behind a view switch.
- **Leaving** is a single arrow left of the trigger — back to the dashboard for a teacher,
  back to the start for a student.
- **The quiz** is reachable from the composer, where it was already.
- **Finish Rosie's sentence** is the one other thing there. Tap it and Rosie posts a sentence
  with a mad-lib blank in it — *"When I look at Rosie the Riveter, the first thing I see is
  ______."* — and the blank is a field the student types straight into. On Enter their words
  settle into the sentence and Rosie keeps writing right after them, in the same bubble: a
  short pick-up, then the talking point the sentence was fishing for. One bubble, three
  states; nothing goes through the composer and nothing new appears on screen. Starters are
  written per topic and per grade band (`STARTERS` in `js/rosie.js`, Spanish in
  `ROSIE.es.starters`), cycle through the six topics on repeated taps, and both halves of the
  bubble re-level with the rest of the thread while the student's words stay as typed.

Every other view keeps the full chrome. Only chat is bare, and `navigate()` is the one place
that decides so (`BARE_VIEWS`).

---

## How it works

```
index.html            all views as sections; one page, no framework
styles.css            design system — tokens, light/dark, responsive
build.js              inlines everything into askrosie-standalone.html

data/artworks.js      8 works. Each carries talking points written FOUR times,
                      once per grade band — 192 in total. This redundancy is the
                      product, not an implementation detail.
data/curriculum.js    keyword lexicon, unit presets, and the parser that turns
                      a pasted unit into focus topics

js/rosie.js           getRosieReply() — the response engine
js/state.js           single state object, persisted to localStorage
js/chat.js            student chat (the centerpiece)
js/teacher.js         curriculum upload, reading level, artwork scope
js/quiz.js            grade-filtered, curriculum-weighted quizzes
js/artframe.js        abstract SVG stand-ins for the artworks
js/{app,auth,history}.js  router, mock sign-in, saved conversations
```

**Every answer is composed from three inputs:**

1. **Intent** — keyword matching on the question (who painted it, why, what's happening, how was
   it made, when, how does it feel).
2. **Grade band** — selects which of four written variants of that talking point to use.
3. **Curriculum focus** — if a unit is loaded, adds a bridge sentence connecting the answer back
   to it, and reorders the suggested-question chips to lead with relevant ones.

---

## Design

The visual language is editorial: high-contrast, minimalist, printed rather than glassy.

| Token | Value | Role |
|---|---|---|
| cream | `#FDFBF7` | the page ground |
| cream-2 | `#F4F0E6` | the single deeper paper tone, for insets |
| charcoal | `#1A1A1A` | text and every border |
| forest | `#1B4332` | accent — fills, rules, active states |
| ink-3 | `#6B6660` | secondary text |
| hair | `rgba(26,26,26,.18)` | the light rule, where a 2px one would shout |

Typography is a serif/sans pair: **Playfair Display** for every heading, tracked open (`.012em`
and up) so the high-contrast face reads editorial rather than decorative, and **Inter** for body
copy, labels, and controls. Both fall back to named local stacks, so the standalone build still
reads correctly with no network.

The rules the stylesheet obeys throughout:

- **Cards carry a 2px rule** (`--bd`), but a warm low-contrast one (`--edge`), not a hard black
  outline. Charcoal at full strength (`--line`) is reserved for emphasis. Dividers *inside* a
  card are hairlines (`--hair`), never rules.
- **Corners are rounded** on a three-step scale — `--r-sm` 6px, `--r` 10px, `--r-lg` 16px.
  Nothing is a hard 90° box and nothing is a pill.
- **One shadow, barely there.** `--shadow` takes the last of the hardness off an edge; there is
  no second, heavier one except the hover lift on the landing doors.
- **Buttons are sentence case.** Tracked-out capitals read as hard, so they are kept for small
  labels — eyebrows, spec keys, credits — and nothing you click.
- **Sections breathe at a 4rem floor.** `--sec` is `clamp(4rem, 9vw, 7rem)` and separates every
  major band; app views under the context strip open at the 4rem floor exactly.
- **Grids are asymmetrical.** The landing masthead is 7fr of headline against 5fr of apparatus;
  the teacher dashboard is 7fr/5fr. The chat is the exception and deliberately so: a single
  880px column, because nothing should compete with the conversation.
- **Gradients are reserved for the artwork stand-ins**, which stand in for paintings. No UI
  surface uses one — the stylesheet contains zero `gradient` declarations.

Three deliberate departures:

- **`user-select: none` is scoped to chrome, not the whole body.** Students need to be able to
  copy what Rosie says.
- **Cream is the default art direction regardless of the OS setting.** Dark is offered as a
  preference and is the same three colours inverted — charcoal ground, cream text, and the green
  lifted to `#74C69D` so it carries on a dark field.
- **Forest green is used at full strength for fills, not tints.** `#1B4332` on cream is 10.6:1;
  cream on `#1B4332` is the same pair inverted. Every text/background combination in both themes
  passes WCAG AA.

---

## Language

A toggle in the top bar switches the whole app between English and Spanish. It shows the
language you would switch *to*, the way a bilingual sign does. The choice is saved.

What actually changes:

| Layer | Where it lives |
|---|---|
| Interface chrome — 129 strings | `data/i18n.js` (`UI`), applied to `[data-i18n]` markup by `applyLang()` |
| Artwork content — titles, blurbs, facts, suggestions, and all 196 grade-banded talking points | `data/artworks.es.js` |
| Rosie's connective tissue — openers, closers, unit bridges, greetings, fallbacks | `data/i18n.js` (`ROSIE`) |
| Focus-topic labels and the four preset unit plans | `data/i18n.js` (`TOPIC_LABELS`, `UNITS`) |
| Intent detection | `INTENT_RULES_ES` in `js/rosie.js` |
| Curriculum keyword matching | Spanish terms appended to `TOPIC_LEXICON` in `data/curriculum.js` |

The design rule is that **only `js/i18n.js` knows a second language exists.** `localizeArt()`
returns an artwork with its Spanish fields merged over the English ones, so `getRosieReply()`
generates Spanish without a single language check — the data it reads is already Spanish. The
same trick covers the quiz, the teacher dashboard, and the history list.

Three things this gets right that a UI-only translation would not:

- **Switching mid-conversation re-levels the thread.** `relevelChat()` regenerates every answer
  from its stored question, so a conversation held in English becomes the same conversation in
  Spanish rather than a bilingual mess.
- **Students can type in Spanish.** `INTENT_RULES_ES` mirrors the English rules in the same
  priority order, and every pattern makes accents optional — students type "quien pinto esto"
  as often as "¿quién pintó esto?", and a router that only understands the accented form fails
  the people it was added for. Routing was checked against 31 cases in both languages, and the
  two rule sets are verified to produce identical topic assignments across all 96 suggestion
  questions.
- **Teachers can paste a Spanish unit plan.** `TOPIC_LEXICON` carries 237 Spanish terms
  alongside the English ones, so the parser detects the same focus topics either way.

Missing Spanish falls back to English rather than rendering a key name — a half-translated
build degrades instead of breaking.

---

## Artwork images

Each work carries a `mediaId` pointing at Crystal Bridges' own collection photography, served
from their eMuseum media dispatcher:

```
https://crystalbridges.emuseum.com/objects/585/rosie-the-riveter
-> https://crystalbridges.emuseum.com/internal/media/dispatcher/1379/preview
```

`artMedia()` renders **two layers**: the abstract SVG stand-in underneath, and the photograph
over it, faded in only once it has actually loaded. `onerror` removes the img outright rather
than hiding it, so a failed load leaves no broken-image box — just the stand-in.

That fallback is the point. `askrosie-standalone.html` is meant to open by double-click on any
machine, and that promise cannot depend on someone else's CDN being reachable.

**Three caveats worth knowing before this ships anywhere real:**

1. **The images are hotlinked**, not mirrored. That uses Crystal Bridges' bandwidth without
   asking. For anything beyond a local prototype, get permission or host copies.
2. **Rights vary by work.** Several of these are public domain by age, but *Rosie the Riveter*
   (1943) is not, and the museum's photography of any work carries its own rights. The SVG
   stand-ins exist precisely so the demo has a defensible fallback.
3. **The URLs are unverified from this machine.** Both the shell and headless Chrome here are
   behind a proxy that blocks outbound image fetches, so the media ids were read off the
   museum's own object pages but never render-tested. Open the app once on a networked machine
   to confirm; if one is wrong, that work silently shows its stand-in.

---

## Swapping in a real model

Responses are scripted, not generated. That's deliberate for a demo — it costs nothing, needs no
API key, works offline, and behaves identically every time you present it.

All language generation funnels through one function, `getRosieReply()` in `js/rosie.js`. To move
to a live model, replace that function's body with a call to a backend proxy and pass
`buildSystemPrompt(ctx)` — already written, in the same file — as the system prompt. It encodes
the grade-band voice guide, the verified facts for the current work, and the teacher's focus
topics. Every call site already awaits the result, so nothing else changes.

---

## Honest limitations

- **No accounts, no server.** Sign-in is a name in `localStorage`. Everything is per-browser, and
  the UI says so rather than implying otherwise.
- **Curriculum parsing is keyword matching, not comprehension.** The teacher view shows which
  words triggered each detected topic and lets you delete wrong ones.
- **Written quiz answers are not graded.** They don't count toward the score — nothing here can
  judge a written response, so the score covers multiple-choice only and says so.
- **Artwork images are abstract SVG stand-ins**, not reproductions. Titles, artists, dates,
  and descriptions are real and were verified against museum and reference sources.
- **English only.** The real Ask Rosie has Spanish; that's a follow-up, not built here.

Not affiliated with or endorsed by the Crystal Bridges Museum of American Art.
