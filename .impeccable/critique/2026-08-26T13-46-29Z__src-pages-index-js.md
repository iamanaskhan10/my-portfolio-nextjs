---
target: my portfolio
total_score: 16
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-26T13-46-29Z
slug: src-pages-index-js
---
## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 2/4 | Active-section state exists; contact submission has no pending state and uses alerts. |
| 2 | Match between system and real world | 3/4 | Clear recruiter-oriented labels, but one project title is misspelled and career claims lack outcome detail. |
| 3 | User control and freedom | 2/4 | Anchors are direct; the mobile drawer has no Escape/focus management and the form has no clear/cancel affordance. |
| 4 | Consistency and standards | 3/4 | Repeated spacing, navy/pink palette, and CTA treatment are coherent; hover-only project content is inconsistent. |
| 5 | Error prevention | 1/4 | Native required/email constraints only; placeholder-only fields and no inline guidance. |
| 6 | Recognition rather than recall | 2/4 | Project identity and value are hover-only; mobile social icons lack accessible names. |
| 7 | Flexibility and efficiency | n/a | Not essential for an experience/portfolio surface. |
| 8 | Aesthetic and minimalist design | 2/4 | The palette is strong, but video, glitch, role carousel, pulsing halos, and other ambient motion compete for attention. |
| 9 | Error recognition and recovery | 1/4 | Generic alerts give no field-level recovery, and the contact API imports a package absent from dependencies. |
| 10 | Help and documentation | n/a | Not essential for an experience/portfolio surface. |
| **Total** | | **16/32** | **Acceptable (50%)** |

## Design Specificity Verdict

The content is specific to Anas Khan, FAST, and the named projects, but the design is only partially authored. The dark navy, neon-pink/cyan, glitch type, robot visual, and infinite ambient motion are familiar developer-portfolio conventions. They establish a generic cyber-developer mood before a recruiter sees evidence of what Anas built and the outcomes he achieved.

The deterministic scan found no static anti-patterns in `src/pages/index.js` (0 findings). It does not catch the most consequential issues here because the weak points live in child components and runtime behavior: hidden project metadata, a generic/no-recovery contact state, the missing `resend` dependency for the API route, and nonresponsive interaction patterns. Browser screenshot/overlay verification was unavailable: native mutable browser automation is not exposed, and local headless Edge failed before creating images because of GPU-process failures. A supplied portfolio screenshot and source inspection were used as fallback visual evidence.

## Overall Impression

The page has a coherent foundation and a confident first-frame aesthetic, but it is treating visual effects as proof. The largest opportunity is to make every major section answer a hiring manager's real question: what did Anas ship, what was his contribution, and what changed as a result?

## What's Working

- The page sequence is recruiter-friendly: introduction, background, experience, projects, achievements, then contact.
- The consistent navy/pink system, active-section rail behavior, and repeated section rhythm give the long page orientation.
- The responsive intent is real: desktop rail, text-labeled mobile drawer, and stacked mobile layout have all been accounted for in source.

## Priority Issues

### [P1] Project proof is inaccessible at the decision point

**Why it matters:** In `Projects.jsx`, title, description, and value appear only on hover. Touch users may open an external link before they have learned what the card represents. The section that should earn trust therefore withholds the proof.

**Fix:** Keep project title, role/contribution, stack, and outcome visible below each image. Add explicit `Case study`, `Repo`, and `Demo` controls where available, and use outcome-led copy rather than generic category labels.

**Suggested command:** `$impeccable layout`

### [P0] The contact action is likely nonfunctional in production

**Why it matters:** `src/pages/api/nodemailer.js` imports `Resend`, but `resend` is absent from `package.json` and `node_modules`. The form can invite a high-intent message and then fail server-side. The current UI converts all failures into generic alerts, so visitors have no reliable fallback.

**Fix:** Add and configure the required mail provider dependency, validate the API route, and show an inline, announced failure state with a direct email/LinkedIn fallback. Do not expose the form as a working CTA until the send path is verified.

**Suggested command:** `$impeccable harden`

### [P1] The hero sells a trope before it sells Anas

**Why it matters:** The robot visual, glitch effect, rotating roles, pulsing aura, and two equal CTAs have more visual weight than a specific capability or result. A recruiter gets mood, not differentiation.

**Fix:** Lead with one concrete value proposition and two or three proof points. Make `View selected work` the primary action, retain just one restrained motion treatment, and use the imagery as support rather than the focal message.

**Suggested command:** `$impeccable clarify`

### [P2] Navigation, form semantics, and motion exclude some visitors

**Why it matters:** The mobile drawer lacks Escape/focus management; mobile social links lack accessible names; form fields use placeholders instead of labels; focus feedback is only a color-border change; and infinite motion has no `prefers-reduced-motion` alternative.

**Fix:** Add visible labels, robust focus styles, accessible names, focus trapping/return and Escape handling, `aria-live` status messages, and a reduced-motion stylesheet.

**Suggested command:** `$impeccable audit`

### [P2] Content and links dilute professional credibility

**Why it matters:** `Seige Of Nations` is misspelled, the portfolio project points to a placeholder GitHub URL, and experience entries do not communicate dates or measurable outcomes with enough precision.

**Fix:** Correct the copy and every outbound link; replace responsibility-only bullets with concise outcome/impact statements and real date ranges.

**Suggested command:** `$impeccable clarify`

## Persona Red Flags

**Jordan, first-timer:** The opening offers effects, changing roles, and two equal CTAs rather than a five-second answer to what Anas has shipped. The strongest project information is hidden until hover.

**Sam, accessibility-dependent:** Contact fields lack persistent labels; submit feedback is not announced inline; drawer escape/focus behavior is incomplete; icons may be unlabeled; and constant animation has no reduced-motion route.

**Casey, distracted mobile user:** `flex-col-reverse` prioritizes the 400px robot visual ahead of the headline/CTA. A tap on a project card takes the visitor away before card information can be read, and contact recovery has no quick fallback after a failed send.

## Minor Observations

- Resume and Contact are competing hero actions; a portfolio-first CTA is missing.
- The About paragraph uses highlighted technologies as a catalogue rather than anchoring claims in proof.
- Achievements can be shorter and move behind or below better project evidence.
- Footer social links use placeholder destinations, unlike the working sidebar links.

## Questions to Consider

1. What single delivered result should a hiring manager remember after 20 seconds?
2. Which two projects can show enough outcome, role, and evidence to carry the portfolio?
3. Should the visual system communicate a cyber-creative coder, or an engineer who reliably ships production systems?
