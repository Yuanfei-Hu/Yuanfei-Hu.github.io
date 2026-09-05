# Design system

## Brand concept

The site presents Yuanfei first as a researcher rather than as a personal brand. Its tone is direct, first-person, and specific: current position, research questions, completed work, and interpretive limits. The opening retains the neural-map visual identity, but the language is closer to an academic introduction than to campaign or product copy.

Research, Work, About, and Life are separate pages. This prevents the homepage from becoming an exhaustive scrolling CV and lets faculty or recruiters move directly to the material they need. The Life page remains visually distinct without competing with the research identity.

## Color tokens

| Token | Value | Primary use |
| --- | --- | --- |
| Primary blue | `#123F7A` | Research identity, diagrams, links, major sections |
| Deep neural blue | `#081D38` | Hero, simulations, trajectory, contact |
| Orange | `#EF6C2F` | Interaction, active signals, evidence, focus |
| Academic red | `#A51C30` | Restrained Life-gallery and secondary-network accents |
| Warm paper | `#F5F3ED` | Editorial reading surfaces |
| Ink | `#0D1726` | Main typography |
| Deep garnet | `#35131B` | Life-gallery mode |
| Warm amber | `#E4A24C` | Life-gallery interaction and metadata |

Blue carries the scientific identity. Orange is the only primary interaction color. Red never competes with orange on research surfaces.

## Typography

- **Newsreader** — large ideas, research questions, project titles, and editorial moments.
- **DM Sans** — body copy and navigation prose.
- **DM Mono** — methods, years, evidence, status, and interface labels.

Body text starts at 16px. Reading widths stay near 55–70 characters. Major headings use tight editorial line-height and scale fluidly with `clamp()`.

## Spacing

- Global horizontal gutter: `clamp(1.25rem, 4vw, 5rem)`
- Major section spacing: approximately 80–144px desktop, 80px mobile
- Component rhythm: 8 / 12 / 16 / 24 / 32 / 48 / 80px
- Thin rules and alignment replace unnecessary card containers

## Core components

- Fixed page-based navigation with clear current-page state and mobile menu
- Conceptual neural-map canvas with region focus card and list alternative
- Research page organized around three connected areas and four current questions
- Interactive continuous-attractor field with pause/reset controls
- Project case studies with distinct scientific visualizations
- Native accessible project-detail dialog
- Work page with project narratives, evidence, and only real output links
- About page with academic trajectory, methods, understated distinctions, and contact
- Life-gallery collections with honest empty states
- Data-driven photograph grid and native lightbox
- Collaboration/contact close

## Brain-region navigation map

These are explicitly thematic mappings, not neuroscientific localization claims.

| Conceptual system | Theme | Destination |
| --- | --- | --- |
| Prefrontal systems | Research vision, NeuroAI, adaptive intelligence | Research lens |
| Hippocampal systems | Memory, replay, consolidation, attractors | Sleep-replay project |
| Distributed geometric network | Symmetry, invariance, dynamics, SE(2) | Robotics project |
| Motor systems | Dance, sport, embodied learning | Life / Movement |
| Visual systems | Photography and observation | Life / Photography |
| Whole-brain interaction | About, collaboration, contact | Contact |

The canvas rotates axially at a very low speed. Pointer movement, keyboard focus on the adjacent list, and touch select themes. The conventional navigation always remains available.

## Interaction principles

- Motion explains continuity, recurrence, transformation, or transition.
- The brain moves slowly; users can drag it, but it never behaves like a toy.
- The neural field accepts pointer/touch perturbations and recovers toward a coherent activity bump.
- Project visualizations are conceptual and labeled as such; reported values appear only in text/evidence components.
- Scroll reveals are subtle and never gate information.
- Hover and focus states use orange, rules, and small changes in position—not glow-heavy effects.

## Accessibility and fallbacks

- Conventional navigation duplicates every conceptual brain destination.
- The brain canvas is decorative to screen readers; the adjacent semantic button list provides the interaction.
- Canvas scientific visualizations include descriptive accessible labels.
- All controls are keyboard accessible, have visible focus, and use comfortable touch sizes.
- At `prefers-reduced-motion: reduce`, automated rotation, simulation drift, animated arm motion, and scroll reveals stop or become static.
- If canvas APIs are unavailable, the semantic copy, brain navigation list, project evidence, and all links remain intact.
- Layout supports 200% zoom, high contrast, phone widths, tablets, and large desktops without horizontal scrolling.
- The portrait has descriptive alt text; user photographs require authored alt text in the data file.

## Content guardrails

- “Manuscript submitted” is the only publication-status language used for the robotics paper.
- Reported numbers are framed as inspectable evidence, not proof of scientific importance.
- Physiological interpretation is separated from behaviorally supported inference.
- Empty outputs, Google Scholar, and gallery buttons stay hidden until real URLs or photographs exist.
- GPA, phone number, home address, student ID, birth data, private email, and secrets are excluded.
