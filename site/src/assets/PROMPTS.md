# Illustration prompts

Prompts for the images in `site/src/assets/images/`. Every image shares the same style block so the series stays consistent; only the slot paragraph differs. Rejected candidates are not committed.

## Hero

- Slot: hero
- File: `images/hero.png`
- Chosen candidate: 1 of 4
- Generated: 2026-10-02, Codex CLI 0.160.0 image generation tool
- Post-processing: none (1536×1024)

Full prompt:

```text
Use your image generation tool to generate FOUR separate candidate images (four distinct generations, vary composition details between them while following the brief). Use the largest size matching the requested aspect ratio. Do not add any text to the images. Brief:

Visual style (shared across a series of seven images, keep it consistent): editorial illustration with a flat-to-lightly-textured gouache and risograph feel, fine paper grain. Palette: warm off-white paper (#F4F1EA), deep ink navy (#1F2A37), graphite gray (#6B7280), and a single sparing accent of muted oxblood sealing-wax red (#9E2F2A). Calm, restrained, generous negative space, precise geometric linework, soft flat shadows. Recurring motif: warrants, wax seals, and signed approval documents set against abstract terminal windows and source code.
Strict constraints: absolutely no text, no letters, no numbers, no characters of any script, no logos, no signatures that resemble writing. Every line of code or document content must be drawn as abstract horizontal bars and dashes, never legible glyphs. No neon, no glow, no glossy gradients, no 3D render look, no photorealism, no human faces.

Slot: hero. Landscape 3:2 composition. An open approval document lies at a slight angle, a red wax seal pressed at its foot; its ruled lines extend rightward and transform seamlessly into the lines of an abstract terminal window, which ends in a small solid check-mark shape. Place the subject in the right two-thirds; keep the left third as quiet empty paper for a headline overlay.
```

## Problem

- Slot: problem
- File: `images/problem.png`
- Chosen candidate: 1 of 4
- Generated: 2026-10-02, Codex CLI 0.160.0 image generation tool
- Post-processing: none (1536×1024)

Full prompt:

```text
Use your image generation tool to generate FOUR separate candidate images (four distinct generations, vary composition details between them while following the brief). Use the largest size matching the requested aspect ratio. Do not add any text to the images. Brief:

Visual style (shared across a series of seven images, keep it consistent): editorial illustration with a flat-to-lightly-textured gouache and risograph feel, fine paper grain. Palette: warm off-white paper (#F4F1EA), deep ink navy (#1F2A37), graphite gray (#6B7280), and a single sparing accent of muted oxblood sealing-wax red (#9E2F2A). Calm, restrained, generous negative space, precise geometric linework, soft flat shadows. Recurring motif: warrants, wax seals, and signed approval documents set against abstract terminal windows and source code.
Strict constraints: absolutely no text, no letters, no numbers, no characters of any script, no logos, no signatures that resemble writing. Every line of code or document content must be drawn as abstract horizontal bars and dashes, never legible glyphs. No neon, no glow, no glossy gradients, no 3D render look, no photorealism, no human faces.

Slot: problem. Landscape 3:2 composition. A sleek abstract robotic hand confidently stamps its own document, but the seal impression it leaves is hollow and cracked. Around it, sheets of paper drift past a dashed boundary line on the floor, and one test sheet has its lines scribbled over. Mood: quiet unease, not chaos.
```

## Rule 1: intent

- Slot: rules, card 1
- File: `images/rule-intent.png`
- Chosen candidate: 1 of 4
- Generated: 2026-10-02, Codex CLI 0.160.0 image generation tool
- Post-processing: a small cursor-like mark in the terminal window (around x 265–305, y 370–392) cloned over with adjacent background texture via ImageMagick, so it cannot read as the letter I (1254×1254)

Full prompt:

```text
Use your image generation tool to generate FOUR separate candidate images (four distinct generations, vary composition details between them while following the brief). Use the largest size matching the requested aspect ratio. Do not add any text to the images. Brief:

Visual style (shared across a series of seven images, keep it consistent): editorial illustration with a flat-to-lightly-textured gouache and risograph feel, fine paper grain. Palette: warm off-white paper (#F4F1EA), deep ink navy (#1F2A37), graphite gray (#6B7280), and a single sparing accent of muted oxblood sealing-wax red (#9E2F2A). Calm, restrained, generous negative space, precise geometric linework, soft flat shadows. Recurring motif: warrants, wax seals, and signed approval documents set against abstract terminal windows and source code.
Strict constraints: absolutely no text, no letters, no numbers, no characters of any script, no logos, no signatures that resemble writing. Every line of code or document content must be drawn as abstract horizontal bars and dashes, never legible glyphs. No neon, no glow, no glossy gradients, no 3D render look, no photorealism, no human faces.

Slot: rule 1, "intent is approved by a human". Square 1:1 composition. A human hand (no face visible) presses a red wax seal onto a single page that is clearly divided into exactly three ruled sections. Centered, lots of margin.
```

## Rule 2: evidence

- Slot: rules, card 2
- File: `images/rule-evidence.png`
- Chosen candidate: 1 of 4
- Generated: 2026-10-02, Codex CLI 0.160.0 image generation tool
- Post-processing: none (1254×1254)

Full prompt:

```text
Use your image generation tool to generate FOUR separate candidate images (four distinct generations, vary composition details between them while following the brief). Use the largest size matching the requested aspect ratio. Do not add any text to the images. Brief:

Visual style (shared across a series of seven images, keep it consistent): editorial illustration with a flat-to-lightly-textured gouache and risograph feel, fine paper grain. Palette: warm off-white paper (#F4F1EA), deep ink navy (#1F2A37), graphite gray (#6B7280), and a single sparing accent of muted oxblood sealing-wax red (#9E2F2A). Calm, restrained, generous negative space, precise geometric linework, soft flat shadows. Recurring motif: warrants, wax seals, and signed approval documents set against abstract terminal windows and source code.
Strict constraints: absolutely no text, no letters, no numbers, no characters of any script, no logos, no signatures that resemble writing. Every line of code or document content must be drawn as abstract horizontal bars and dashes, never legible glyphs. No neon, no glow, no glossy gradients, no 3D render look, no photorealism, no human faces.

Slot: rule 2, "completion is proven by evidence". Square 1:1 composition. A ledger page on the left whose lines are each connected by thin taut threads to matching small receipt stubs on the right, which emerge from an abstract terminal window; a magnifying glass rests over one connection. Centered, lots of margin.
```

## Rule 3: standard

- Slot: rules, card 3
- File: `images/rule-standard.png`
- Chosen candidate: 1 of 4
- Generated: 2026-10-02, Codex CLI 0.160.0 image generation tool
- Post-processing: none (1254×1254)

Full prompt:

```text
Use your image generation tool to generate FOUR separate candidate images (four distinct generations, vary composition details between them while following the brief). Use the largest size matching the requested aspect ratio. Do not add any text to the images. Brief:

Visual style (shared across a series of seven images, keep it consistent): editorial illustration with a flat-to-lightly-textured gouache and risograph feel, fine paper grain. Palette: warm off-white paper (#F4F1EA), deep ink navy (#1F2A37), graphite gray (#6B7280), and a single sparing accent of muted oxblood sealing-wax red (#9E2F2A). Calm, restrained, generous negative space, precise geometric linework, soft flat shadows. Recurring motif: warrants, wax seals, and signed approval documents set against abstract terminal windows and source code.
Strict constraints: absolutely no text, no letters, no numbers, no characters of any script, no logos, no signatures that resemble writing. Every line of code or document content must be drawn as abstract horizontal bars and dashes, never legible glyphs. No neon, no glow, no glossy gradients, no 3D render look, no photorealism, no human faces.

Slot: rule 3, "the standard is not yours to change". Square 1:1 composition. A sealed document and a measuring ruler sit under a glass bell jar; an abstract robotic hand holding a pencil hovers just outside the glass, unable to reach. Centered, lots of margin.
```

## Why

- Slot: why
- File: `images/why.png`
- Chosen candidate: 3 of 4
- Generated: 2026-10-02, Codex CLI 0.160.0 image generation tool
- Post-processing: none (1536×1024)

Full prompt:

```text
Use your image generation tool to generate FOUR separate candidate images (four distinct generations, vary composition details between them while following the brief). Use the largest size matching the requested aspect ratio. Do not add any text to the images. Brief:

Visual style (shared across a series of seven images, keep it consistent): editorial illustration with a flat-to-lightly-textured gouache and risograph feel, fine paper grain. Palette: warm off-white paper (#F4F1EA), deep ink navy (#1F2A37), graphite gray (#6B7280), and a single sparing accent of muted oxblood sealing-wax red (#9E2F2A). Calm, restrained, generous negative space, precise geometric linework, soft flat shadows. Recurring motif: warrants, wax seals, and signed approval documents set against abstract terminal windows and source code.
Strict constraints: absolutely no text, no letters, no numbers, no characters of any script, no logos, no signatures that resemble writing. Every line of code or document content must be drawn as abstract horizontal bars and dashes, never legible glyphs. No neon, no glow, no glossy gradients, no 3D render look, no photorealism, no human faces.

Slot: "rules, not tools". Landscape 3:2 composition. A slim bound rulebook closed with a red wax seal rests in the foreground; behind it, a horizontal pipeline of simple gate-like checkpoints runs left to right, and at the final gate a human silhouette seen from behind reviews a document. Conveys that enforcement lives in the pipeline and human review, not in the book.
```

## Open Graph card

- Slot: og
- File: `images/og.png`
- Chosen candidate: 1 of 4
- Generated: 2026-10-02, Codex CLI 0.160.0 image generation tool
- Post-processing: resized from 1733×907 and center-cropped to 1200×630 with ImageMagick

Full prompt:

```text
Use your image generation tool to generate FOUR separate candidate images (four distinct generations, vary composition details between them while following the brief). Use the largest size matching the requested aspect ratio. Do not add any text to the images. Brief:

Visual style (shared across a series of seven images, keep it consistent): editorial illustration with a flat-to-lightly-textured gouache and risograph feel, fine paper grain. Palette: warm off-white paper (#F4F1EA), deep ink navy (#1F2A37), graphite gray (#6B7280), and a single sparing accent of muted oxblood sealing-wax red (#9E2F2A). Calm, restrained, generous negative space, precise geometric linework, soft flat shadows. Recurring motif: warrants, wax seals, and signed approval documents set against abstract terminal windows and source code.
Strict constraints: absolutely no text, no letters, no numbers, no characters of any script, no logos, no signatures that resemble writing. Every line of code or document content must be drawn as abstract horizontal bars and dashes, never legible glyphs. No neon, no glow, no glossy gradients, no 3D render look, no photorealism, no human faces.

Slot: social share card. Very wide landscape composition (it will be cropped to 1200x630, so keep everything important inside a centered horizontal band occupying the middle 60% of the height). A single red wax seal in the center presses onto a horizontal band where the ruled lines of a document on the left transition into the lines of an abstract terminal window on the right. Wide calm margins.
```
